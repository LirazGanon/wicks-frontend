
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service'
import { wapService } from './wap.service.js'

// import { userService } from './user.service.js'
// import defaultTemplates from './json/wap.json' assert{type: 'json'}
// import defaultWaps from './json/wap2.json' assert{type: 'json'}
// import { storageService } from './async-storage.service.js'


const STORAGE_KEY = 'wap/template'


export const templateService = {
    query,
    getTemplate,
    getTemplateToEdit,
    // getCustomWap
 
}
window.cs = templateService


async function query() {
    const templates = await httpService.get(`wap/template`)
    // console.log(templates)
    // var templates = await storageService.query(STORAGE_KEY)
    // if (!templates || !templates.length) {
    //     templates = defaultTemplates
    //     await storageService.postMany(STORAGE_KEY, waps)
    // }
    return  templates
}
async function getTemplate(id) {
    const template = await httpService.get(`wap/template/${id}`)

    return  template
}
async function getTemplateToEdit(id) {
    let template = await httpService.get(`wap/template/edit/${id}`)
    const user = userService.getLoggedinUser()
    if(!user)return  template
    template = wapService.updateOwner(template, user)
    return template
}



// async function getCustomWap(wapId) {
//     // const wapToEdit = await JSON.parse(JSON.stringify(getById(wapId)))
//     let wapToEdit = await getById(wapId)
//     wapToEdit = JSON.parse(JSON.stringify(wapToEdit))
//     delete wapToEdit._id
//     wapToEdit.user = 'user_' + utilService.makeId()
//     wapToEdit = save(wapToEdit, EDITABLE_STORAGE_KEY)
//     console.log(wapToEdit)
//     return wapToEdit
// }


// TEST DATA
// ;(async ()=>{
    // await storageService.post(STORAGE_KEY, {name: 'Bake Shop', desc: 'Cookies for all'})
//     await storageService.post(STORAGE_KEY, {name: 'My Blog', desc: 'Posts for all'})
// })()