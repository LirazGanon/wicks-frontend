
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

import defaultCmps from './json/cmps.json' assert{type: 'json'}
const STORAGE_KEY = 'cmp'

export const cmpService = {
    query,
    getById,
    save,
    remove,
    getEmptyCmp,
    addCmpMsg
}
window.cs = cmpService


async function query(filterBy = { txt: '', desc: '' }) {
    // return httpService.get(STORAGE_KEY, filterBy)

    var cmps = await storageService.query(STORAGE_KEY)
    if (!cmps || !cmps.length) {
        cmps = defaultCmps
        await storageService.post(STORAGE_KEY, cmps)
    }
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     cmps = cmps.filter(cmp => regex.test(cmp.name) || regex.test(cmp.description))
    // }
    // if (filterBy.desc) {
    //     cmps = cmps.filter(cmp => cmp.desc <= filterBy.desc)
    // }
    return cmps

}
function getById(cmpId) {
    return storageService.get(STORAGE_KEY, cmpId)
    // return httpService.get(`cmp/${cmpId}`)
}

async function remove(cmpId) {
    await storageService.remove(STORAGE_KEY, cmpId)
    // return httpService.delete(`cmp/${cmpId}`)
}
async function save(cmp) {
    var savedCmp
    if (cmp._id) {
        savedCmp = await storageService.put(STORAGE_KEY, cmp)
        // savedCmp = await httpService.put(`cmp/${cmp._id}`, cmp)

    } else {
        // Later, owner is set by the backend
        // cmp.owner = userService.getLoggedinUser()
        savedCmp = await storageService.post(STORAGE_KEY, cmp)
        // savedCmp = await httpService.post('cmp', cmp)
    }
    return savedCmp
}

async function addCmpMsg(cmpId, txt) {
    const savedMsg = await httpService.post(`cmp/${cmpId}/msg`, {txt})
    return savedMsg
}


function getEmptyCmp() {
    return {
        name: 'Great Site -' + (Date.now() % 1000),
        desc: 'Enjoy my site',
    }
}





