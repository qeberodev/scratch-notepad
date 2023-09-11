import lf from "localforage"

export class DB {
    VERSION = 1
    DB_NAME = "react-animations"
    private db: LocalForage

    get storage() {
        return this.db;
    }

    constructor() {
        this.db = lf.createInstance({
            driver: lf.INDEXEDDB,
            name: this.DB_NAME,
            version: this.VERSION,
        })

        indexedDB.open(this.DB_NAME, this.VERSION)
        this.db.ready(() => {
            console.log("db ready")
        })
    }

    deleteData() {
        this.db.dropInstance()
    }
}
