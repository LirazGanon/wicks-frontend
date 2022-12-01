import { wapService } from '../../services/wap.service.local'

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
        getWapById({ wapInEdit }) { return wapInEdit },
        // async getWapById({ state }) {
        //     try {
        //         const wap = await wapService.getById(id)
        //         this.wapInEdit = wap
        //         return this.wapInEdit
        //     } catch {
        //         console.log('could not get wap to edit')
        //     }
        // },
    },
    mutations: {
        setWaps(state, { waps }) {
            state.waps = waps
        },
        addWap(state, { wap }) {
            state.waps.push(wap)
        },
        updateWap(state, { wap }) {
            const idx = state.waps.findIndex(c => c.id === wap._id)
            state.waps.splice(idx, 1, wap)
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
        setWapToEdit(state, { wap }) {
            state.wapInEdit = wap
            console.log(wap)
        }

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
        async updateWap(context, { wap }) {
            try {
                wap = await wapService.save(wap)
                context.commit(getActionUpdateWap(wap))
                return wap
            } catch (err) {
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
                console.log(id)
                const wapToEdit = await wapService.getById(id)
                context.commit({ type: 'setWapToEdit', wapToEdit })
            } catch (err) {
                console.log('could not get wap')
            }
        }

    }
}