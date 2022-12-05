
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import defaultWaps from './json/wap.json' assert{type: 'json'}
import defaultWaps from './json/wap2.json' assert{type: 'json'}
import { templateService } from './template.service.js'


const STORAGE_KEY = 'editableWaps'


export const wapToEditService = {
    query,
    getById,
    save,
    remove,
    getCustomWap,
    addWapMsg
}
window.cs = wapToEditService


async function query() {
    // debugger
    var waps = await storageService.query(STORAGE_KEY)
    if (!waps || !waps.length) {
        waps = defaultWaps
        await storageService.postMany(STORAGE_KEY, waps)
    }
    return  waps
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
    // const wapToEdit = await JSON.parse(JSON.stringify(getById(wapId)))
    let wapToEdit = await wapService.getById(wapId)
    wapToEdit=JSON.parse(JSON.stringify(wapToEdit))
    delete wapToEdit._id
    wapToEdit.user = 'user_' + utilService.makeId()
    wapToEdit = await save(wapToEdit, STORAGE_KEY)
    return wapToEdit
}


// TEST DATA
// ;(async ()=>{
    // await storageService.post(STORAGE_KEY, {name: 'Bake Shop', desc: 'Cookies for all'})
//     await storageService.post(STORAGE_KEY, {name: 'My Blog', desc: 'Posts for all'})
// })()