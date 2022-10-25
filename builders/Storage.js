const Box = require("./Box");
const fs = require("node:fs");
const path = require("path");

const storage = new Map();
class Storage {

    constructor(id, options) {
        if (storage.has(id)) throw new Error("ID already in use");

        this.id = id;
        this.autosave = options ? options.autosave ? options.autosave : true : true;
        this.autoload = options ? options.autoload ? options.autoload : true : true;
        this.prettify = options ? options.prettify ? options.prettify : false : false;
        this.path = options ? options.path ? options.path : path.join(".", ".data", this.id) : path.join(".", ".data", this.id);
        this.suffix = options ? options.suffix ? options.suffix : ".json" : ".json";
        this._data = new Map();

        storage.set(this.id, this);

        if (this.autoload) this.load();
    };

    setup(id) {
        const boxes = this._data.values();

        for (const box of boxes) {
            if (box.has(id)) continue;
            box.set(id, box.options);
        };
    };

    box(id, options={}) {
        if (this._data.has(id)) return this._data.get(id);

        const box = new Box(id, options, this);
        this._data.set(id, box);

        return box;
    };

    get(id) {
        if (!this._data.has(id)) throw new Error("ID not in use");

        return this._data.get(id);
    };

    async load() {
        if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);

        const rawBoxes = fs.readdirSync(this.path);
        for (const rawBox of rawBoxes) {
            const id = rawBox.replace(this.suffix, "");
            const rawData = fs.readFileSync(path.join(this.path, rawBox), "utf-8");
            const Data = JSON.parse(rawData);
            const box = new Box(id, Data["default"] ?? {}, this);

            for (const key in Data) {
                box.set(key, Data[key]);
            };

            this._data.set(id, box);
        };
    };

    async save() {
         if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);

        const boxes = this._data.values();
        for (const box of boxes) {
            const data = {};

            for (const key of box.keys()) {
                data[key] = box.get(key);
            };

            const raw = this.prettify ? JSON.stringify(data, null, "\t") : JSON.stringify(data);
            fs.writeFileSync(path.join(this.path, `${box.id}${this.suffix.startsWith(".") ? this.suffix : `.${this.suffix}`}`), raw);
        };
    };

};

module.exports = Storage;