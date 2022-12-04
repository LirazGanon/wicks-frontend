import { wapService } from '../../services/wap.service.local'
import { wapToEditService } from '../../services/wap-to-edit.service'
import { utilService } from '../../services/util.service'

export function getActionRemoveWap(wapId) {
    return {
        type: 'removeWap',
        wapId
    }
}
export function getActionAddWap(wap) {
    return {
        type: 'addWap',
        wap
    }
}
export function getActionUpdateWap(wap) {
    return {
        type: 'updateWap',
        wap
    }
}

export function getActionAddWapMsg(wapId) {
    return {
        type: 'addWapMsg',
        wapId,
        txt: 'Stam txt'
    }
}

export const wapStore = {
    state: {
        waps: [],
        isLoading: false,
        isHeader: true,
        wapInEdit: null
    },
    getters: {
        waps({ waps }) { return waps },
        isLoading({ isLoading }) { return isLoading },
        getWapToEdit({ wapInEdit }) { return wapInEdit },

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
        },
        removeWapToEdit(state) {
            state.wapToEdit = null
            console.log(state.wapToEdit)
        },

    },
    actions: {
        async addWap(context, { wap }) {
            try {
                wap = await wapService.save(wap)
                context.commit(getActionAddWap(wap))
                return wap
            } catch (err) {
                console.log('wapStore: Error in addWap', err)
                throw err
            }
        },
        async updateWap(context, { cmp, path }) {
            try {
                let wap = utilService.copy(context.state.wapInEdit)
                if (path.idx !== undefined) {
                    wap.cmps[path.fatherIdx].cmps[path.idx] = cmp
                } else {
                    wap.cmps[path.fatherIdx] = cmp
                }
                wap = await wapToEditService.save(wap)
                context.commit(getActionUpdateWap(wap))
                return wap
            } catch (err) {
                // TODO:RETURN BACK - LAZY SOMETHING ?

                console.log('wapStore: Error in updateWap', err)
                throw err
            }
        },
        async updateWapFull(context, { wap }) {
            try {
                wap = await wapToEditService.save(wap)
                context.commit(getActionUpdateWap(wap))
            } catch {
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
                context.commit(getActionRemoveWap(wapId))
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
            }
        },
        async getCustomWap(context, { wapId }) {
            try {
                const wapToEdit = await wapToEditService.getCustomWap(wapId)
                console.log(wapToEdit)
                context.commit({ type: 'setWapToEdit', wapToEdit })
                // TODO: check what is the eror from the console
                return wapToEdit
            }
            catch {
                console.log('could not create wap')
            }
        }

    }
}