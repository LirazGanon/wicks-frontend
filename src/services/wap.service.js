
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'wap'

export const wapService = {
    query,
    getById,
    save,
    remove,
    // getCustomWap,
    updateOwner,
    getByUserId,
    addWapMsg,
    savePathName
}
window.cs = wapService


async function query(filterBy = { userId:'' ,txt: '', desc: '' }) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var waps = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     waps = waps.filter(wap => regex.test(wap.name) || regex.test(wap.description))
    // }
    // if (filterBy.desc) {
    //     waps = waps.filter(wap => wap.desc <= filterBy.desc)
    // }
    // return waps

}
function getById(url) {
    if (url.wapId) {
        return httpService.get(`wap/${url.wapId}`)
    } else if (url.pathName) {
        return httpService.get(`wap/name/${url.pathName}`)
    }else{
    const id = url
    return httpService.get(`wap/${id}`)
    }
}
function getByUserId(userId) {
    // return storageService.get(STORAGE_KEY, wapId)
    return httpService.get(`wap/user/${userId}`)
}

async function remove(wapId) {
    // await storageService.remove(STORAGE_KEY, wapId)
    return httpService.delete(`wap/${wapId}`)
}
async function save(wap) {
    var savedWap
    if (wap._id) {
        // savedWap = await storageService.put(STORAGE_KEY, wap)
        savedWap = await httpService.put(`wap/${wap._id}`, wap)

    } else {
        // Later, owner is set by the backend
        wap.owner = userService.getLoggedinUser()
        // savedWap = await storageService.post(STORAGE_KEY, wap)
        savedWap = await httpService.post('wap', wap)
    }
    return savedWap
}

async function savePathName(pathName) {
try{const name = {pathName}
return httpService.post(`wap/pathName`,name )
}catch(err){
console.log(err)
}
}

async function addWapMsg(wapId, txt) {
    const savedMsg = await httpService.post(`wap/${wapId}/msg`, {txt})
    return savedMsg
}

function updateOwner(wap, user){
    const {_id, fullname, imgUrl}= user
    const {createdBy} = wap
    createdBy._id = _id
    createdBy.fullname = fullname
    createdBy.src = imgUrl
    wap.createdBy = createdBy
    return wap
 }

// function getCustomWap() {
//     return {
//         name: 'Great Site -' + (Date.now() % 1000),
//         desc: 'Enjoy my site',
//     }
// }





