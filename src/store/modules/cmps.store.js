import { cmpService } from '../../services/cmp.service'

export function getActionRemoveCmp(cmpId) {
    return {
        type: 'removeCmp',
        cmpId
    }
}
export function getActionAddCmp(cmp) {
    return {
        type: 'addCmp',
        cmp
    }
}
export function getActionUpdateCmp(cmp) {
    return {
        type: 'updateCmp',
        cmp
    }
}

export function getActionAddCmpMsg(cmpId) {
    return {
        type: 'addCmpMsg',
        cmpId,
        txt: 'Stam txt'
    }
}

export const cmpStore = {
    state: {
        cmps: [],

    },
    getters: {
        cmps({ cmps }) { return cmps },
    },
    mutations: {
        setCmps(state, { cmps }) {
            state.cmps = cmps
        },
        addCmp(state, { cmp }) {
            state.cmps.push(cmp)
        },
        updateCmp(state, { cmp }) {
            const idx = state.cmps.findIndex(c => c.id === cmp._id)
            state.cmps.splice(idx, 1, cmp)
        },
        addCmpMsg(state, { cmpId, msg }) {
            const cmp = state.cmps.find(cmp => cmp._id === cmpId)
            if (!cmp.msgs) cmp.msgs = []
            cmp.msgs.push(msg)
        },
    },
    actions: {
        async addCmp(context, { cmp }) {
            try {
                cmp = await cmpService.save(cmp)
                context.commit(getActionAddCmp(cmp))
                return cmp
            } catch (err) {
                console.log('cmpStore: Error in addCmp', err)
                throw err
            }
        },
        async updateCmp(context, { cmp }) {
            try {
                cmp = await cmpService.save(cmp)
                context.commit(getActionUpdateCmp(cmp))
                return cmp
            } catch (err) {
                console.log('cmpStore: Error in updateCmp', err)
                throw err
            }
        },
        async loadCmps(context) {
            try {
                const cmps = await cmpService.query()
                context.commit({ type: 'setCmps', cmps })
            } catch (err) {
                console.log('cmpStore: Error in loadCmps', err)
                throw err
            }
        },
        async addCmpMsg(context, { cmpId, txt }) {
            try {
                const msg = await cmpService.addCmpMsg(cmpId, txt)
                context.commit({ type: 'addCmpMsg', cmpId, msg })
            } catch (err) {
                console.log('cmpStore: Error in addCmpMsg', err)
                throw err
            }
        },

    }
}