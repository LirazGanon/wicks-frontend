import { wapService } from '../../services/wap.service.local'
import { wapToEditService } from '../../services/wap-to-edit.service'
import { utilService } from '../../services/util.service'


export const wapStore = {
    state: {
        waps: [],
        isLoading: false,
        isHeader: true,
        wapInEdit: null,
        history: {
            currState: 0,
            waps: []
        }
    },
    getters: {
        waps({ waps }) { return waps },
        isLoading({ isLoading }) { return isLoading },
        getWapToEdit({ wapInEdit }) { return wapInEdit },
        getHistory({ history }) { return history }
    },
    mutations: {
        setWaps(state, { waps }) {
            state.waps = waps
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
                && history.currState) {
                history.waps = history.waps.slice(0, history.currState + 1)
                console.log('inside', history);
            }
            history.currState++
            history.waps.push(wap)
            console.log(history);
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
        }

    },
    actions: {
        async addWap(context, { wap }) {
            try {
                wap = await wapService.save(wap)
                context.commit({ type: 'addWap', wap })
                return wap
            } catch (err) {
                console.log('wapStore: Error in addWap', err)
                throw err
            }
        },
        async updateWap(context, { cmp, path }) {
            console.log(path);
            // TODO:send user msg
            try {
                let wap = utilService.copy(context.state.wapInEdit)
                if (path.idx !== undefined) {
                    wap.cmps[path.fatherIdx].cmps[path.idx] = cmp
                } else {
                    wap.cmps[path.fatherIdx] = cmp
                }
                context.commit({ type: 'saveHistory', wap })
                wap = await wapToEditService.save(wap)
                context.commit({ type: 'updateWap', wap })
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
                wap = await wapToEditService.save(wap)
                context.commit({ type: 'updateWap', wap })
            } catch {
                context.commit({ type: 'setLastHistoryState' })
                console.log('wapStore: Error in updateWap', err)
                throw err
            }
        },
        async loadWaps(context) {
            try {
                context.commit({ type: 'toggleLoading' })
                const waps = await wapService.query()
                context.commit({ type: 'setWaps', waps })
                context.commit({ type: 'toggleLoading' })
            } catch (err) {
                context.store.isLoading = false
                console.log('wapStore: Error in loadWaps', err)
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
        async setWapToEdit(context, { id }) {
            try {
                const wapToEdit = await wapToEditService.getById(id)
                context.commit({ type: 'setWapToEdit', wapToEdit })
            } catch (err) {
                console.log('could not get wap')
                throw err
            }
        },
        async getCustomWap(context, { wapId }) {
            try {
                const wapToEdit = await wapToEditService.getCustomWap(wapId)
                context.commit({ type: 'setWapToEdit', wapToEdit })
                // TODO: check what is the eror from the console
                return wapToEdit
            }
            catch {
                console.log('could not create wap')
            }
        },
        async duplicateCmp(context, { cmp, path }) {
            try {
                let wap = utilService.copy(context.state.wapInEdit)
                if (path.idx !== undefined) {
                    wap.cmps[path.fatherIdx].cmps.splice(path.idx, 0, cmp)
                } else {
                    wap.cmps.splice([path.fatherIdx], 0, cmp)
                    console.log(cmp)
                }

                wap = await wapToEditService.save(wap)
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
                if (path.idx !== undefined) {
                    wap.cmps[path.fatherIdx].cmps.splice(path.idx, 1)
                } else {
                    wap.cmps.splice([path.fatherIdx], 1)
                }
                wap = await wapToEditService.save(wap)
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

    }
}
