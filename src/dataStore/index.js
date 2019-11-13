import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) {
        fs.mkdirpSync(STORE_PATH)
    }
}
console.log(STORE_PATH)
const adapter = new FileSync(path.join(STORE_PATH, '/daily-to-do.json'))

const db = Datastore(adapter)
db._.mixin(LodashId)


// 初始化数据
if (!db.has('user').value()) {
    console.log("初始化数据")
    db.set('user', [{ userName: 'coder-syl', password: '123456', autoStart: false }]).write()
}
if (!db.has('toDo').value()) {
    console.log("初始化数据")
    db.set('toDo', []).write()
}
if (!db.has('tags').value()) {
    console.log("初始化数据")
    db.set('tags', []).write()
}

export default db