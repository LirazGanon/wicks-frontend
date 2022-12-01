
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import defaultWaps from './json/wap.json' assert{type: 'json'}


const STORAGE_KEY = 'wap'

export const wapService = {
    query,
    getById,
    save,
    remove,
    getCustomWap,
    addWapMsg
}
window.cs = wapService


async function query() {
    var waps = await storageService.query(STORAGE_KEY)
    if (!waps || !waps.length) {
        waps = defaultWaps
        await storageService.postMany(STORAGE_KEY, waps)
    }
    return await storageService.query(STORAGE_KEY)
}

function getById(wapId) {
    return storageService.get(STORAGE_KEY, wapId)
}

async function remove(wapId) {
    await storageService.remove(STORAGE_KEY, wapId)
}

async function save(wap) {
    var savedWap
    if (wap._id) {
        savedWap = await storageService.put(STORAGE_KEY, wap)
    } else {
        // Later, owner is set by the backend
        wap.owner = userService.getLoggedinUser()
        savedWap = await storageService.post(STORAGE_KEY, wap)
    }
    return savedWap
}

async function addWapMsg(wapId, txt) {
    // Later, this is all done by the backend
    const wap = await getById(wapId)
    if (!wap.msgs) wap.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    wap.msgs.push(msg)
    await storageService.put(STORAGE_KEY, wap)

    return msg
}

async function getCustomWap(wapId) {
    const wapToEdit = await getById(wapId)
    wapToEdit._id = utilService.makeId()
    wapToEdit.user = 'user_' + utilService.makeId()
    console.log(wapToEdit)
    return wapToEdit
}


// TEST DATA
// ;(async ()=>{
    // await storageService.post(STORAGE_KEY, {name: 'Bake Shop', desc: 'Cookies for all'})
//     await storageService.post(STORAGE_KEY, {name: 'My Blog', desc: 'Posts for all'})
// })()