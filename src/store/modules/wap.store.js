import { templateService } from '../../services/template.service.js'
import { wapService } from '../../services/wap.service.js'
import { utilService } from '../../services/util.service.js'
import { socketService, SOCKET_EMIT_SEND_UPDATE_WAP } from '../../services/socket.service.js'
import { storageService } from '../../services/async-storage.service.js'
import { userService } from '../../services/user.service.js'



export const wapStore = {
    state: {
        templates: [],
        isLoading: false,
        isHeader: true,
        wapInEdit: null,
        history: {
            currState: 0,
            waps: []
        }
    },
    getters: {
        templates({ templates }) { return templates },
        isLoading({ isLoading }) { return isLoading },
        getWapToEdit({ wapInEdit }) { return wapInEdit },
        getHistory({ history }) { return history },
        getLastState({ history }) { return history.waps[history.waps.length - 1] },
    },
    mutations: {
        setTemplates(state, { templates }) {
            state.templates = templates
        },
        addWap(state, { wap }) {
            state.waps.push(wap)
        },
        updateWap(state, { wap }) {
            state.wapInEdit = wap
        },
        removeWap(state, { wapId }) {
            state.waps = state.waps.filter(wap => wap._id !== wapId)
        },
        addWapMsg(state, { wapId, msg }) {
            const wap = state.waps.find(wap => wap._id === wapId)
            if (!wap.msgs) wap.msgs = []
            wap.msgs.push(msg)
        },
        toggleLoading(state) {
            state.isLoading = !state.isLoading
        },
        setWapToEdit(state, { wapToEdit }) {
            state.wapInEdit = wapToEdit
            state.history = {
                currState: 0,
                waps: [wapToEdit]
            }
        },
        removeWapToEdit(state) {
            state.wapToEdit = null
            state.history.waps = []
            state.history.currState = 0
        },
        saveHistory({ history }, { wap }) {
            if (history.currState < history.waps.length - 1
                ) {
                history.waps = history.waps.slice(0, history.currState + 1)
            }
            if (history.waps.length - 1 > 30) {
                history.waps.shift()
            }
            history.currState++
            console.log(history);
            history.waps.push(wap)
        },
        goBack(state) {
            state.history.currState--
            state.wapInEdit = state.history.waps[state.history.currState]
        },
        goForwards(state) {
            state.history.currState++
            state.wapInEdit = state.history.waps[state.history.currState]
        },
        setLastHistoryState(state) {
            state.history.waps.pop()
            state.history.currState--
            state.wapInEdit = state.history.waps[state.history.waps.length - 1]
        },


    },
    actions: {
        // async addWap(context, { wap }) {
        //     try {
        //         wap = await wapService.save(wap)
        //         context.commit({ type: 'addWap', wap })
        //         return wap
        //     } catch (err) {
        //         console.log('wapStore: Error in addWap', err)
        //         throw err
        //     }
        // },
        async updateWap(context, { cmp, path }) {
            // TODO:send user msg
            try {
                let wap = utilService.copy(context.state.wapInEdit)
                const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === path.id)
                if (path.idx !== undefined) {
                    wap.cmps[cmpIdx].cmps[path.idx] = cmp
                } else {
                    wap.cmps[cmpIdx] = cmp
                }
                context.commit({ type: 'saveHistory', wap })
                context.commit({ type: 'updateWap', wap })
                wap = await wapService.save(wap)
                socketService.emit(SOCKET_EMIT_SEND_UPDATE_WAP, wap )

                return wap
            } catch (err) {
                context.commit({ type: 'setLastHistoryState' })
                console.log('wapStore: Error in updateWap', err)
                throw err
            }
        },
        async updateWapFull(context, { wap }) {
            try {
                context.commit({ type: 'saveHistory', wap })
                context.commit({ type: 'updateWap', wap })
                wap = await wapService.save(wap)
                socketService.emit(SOCKET_EMIT_SEND_UPDATE_WAP, wap )
            } catch(err) {
                context.commit({ type: 'setLastHistoryState' })
                console.log('wapStore: Error in updateWap', err)
                throw err
            }
        },
        async loadTemplates(context) {
            try {
                context.commit({ type: 'toggleLoading' })
                const templates = await templateService.query()
                console.log(templates)
                context.commit({ type: 'setTemplates', templates })
                context.commit({ type: 'toggleLoading' })
                // return templates
            } catch (err) {
                context.store.isLoading = false
                console.log('wapStore: Error in loadTemplates', err)
                throw err
            }
        },
        async removeWap(context, { wapId }) {
            try {
                await wapService.remove(wapId)
                context.commit({ type: 'removeWap', wapId })
            } catch (err) {
                console.log('wapStore: Error in removeWap', err)
                throw err
            }
        },
        async addWapMsg(context, { wapId, txt }) {
            try {
                const msg = await wapService.addWapMsg(wapId, txt)
                context.commit({ type: 'addWapMsg', wapId, msg })
            } catch (err) {
                console.log('wapStore: Error in addWapMsg', err)
                throw err
            }
        },
        async setWapToEdit(context, { wapId }) {
            if (context.state.wapInEdit) {
                let currWapId = context.state.wapInEdit._id
                if (wapId === currWapId) return
            }
            try {
                const user = userService.getLoggedinUser
                const wapToEdit = await templateService.getTemplateToEdit(wapId)
                context.commit({ type: 'setWapToEdit', wapToEdit })
                return wapToEdit
            } catch (err) {
                console.log('could not get wap')
                throw err
            }
        },
        async getUserWaps(context, {userId}){
            try{
                const waps = await wapService.getByUserId(userId)
                console.log(waps)
                this.$commit({type:'setUserWaps', waps})
            }catch(err){
            console.log('could not get user waps')
            throw err
            }
        },
        // async getCustomWap(context, { wapId }) {
        //     console.log('get custom')
        //     try {
        // const wapToEdit = await templateService.getCustomWap(wapId)
        //         context.commit({ type: 'setWapToEdit', wapToEdit })
        //         // TODO: check what is the eror from the console
        //         return wapToEdit
        //     }
        //     catch {
        //         console.log('could not create wap')
        //     }
        // },
        async duplicateCmp(context, { cmp, path }) {
            try {
                let wap = utilService.copy(context.state.wapInEdit)
                const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === path.id)
                if (path.idx !== undefined) {
                    wap.cmps[cmpIdx].cmps.splice(path.idx, 0, cmp)
                } else {
                    wap.cmps.splice([cmpIdx], 0, cmp)
                    console.log(cmp)
                }

                wap = await wapService.save(wap)
                context.commit({ type: 'updateWap', wap })
                return wap
            }
            catch {
                console.log('could not delete')
            }
        },
        async removeCmp(context, { cmp, path }) {
            try {
                let wap = utilService.copy(context.state.wapInEdit)
                const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === path.id)
                if (path.idx !== undefined) {
                    wap.cmps[cmpIdx].cmps.splice(path.idx, 1)
                } else {
                    wap.cmps.splice([cmpIdx], 1)
                }
                wap = await wapService.save(wap)
                context.commit({ type: 'updateWap', wap })
                return wap
            }
            catch {
                console.log('could not delete')
            }
        },
        async goBack({ commit }) {
            try {
                commit({ type: "goBack" })
            } catch {
                console.log('something went wrong');
                throw err
            }
        },
        async goForwards({ commit }) {
            try {
                commit({ type: "goForwards" })
            } catch {
                console.log('something went wrong');
                throw err
            }
        },
        getCurrWap(context, id) {
            console.log(context.state.templates)
            return context.state.templates.find(template => template._id === id)
        },
    
    }
}
