class Box {

    constructor(id, options, storage) {
        this.id = id;
        this.options = options;
        this._data = new Map();
        this.storage = storage;

        this._data.set("default", options);
    };

    set(key, value) {
        this._data.set(key, value);
        if (this.storage.autosave) this.storage.save();
    };

    setup(key) {
        if (this._data.has(key)) return;
        this._data.set(key, this._data.get("default") ?? {});
        if (this.storage.autosave) this.storage.save();
    };

    get(key) {
        if (!this._data.has(key)) throw new Error("Key not in use");
        return this._data.get(key);
    };

    keys() {
        return this._data.keys();
    };

    values() {
        return this._data.values();
    };

    has(key) {
        return this._data.has(key);
    };

    delete(key) {
        if (!this._data.has(key)) throw new Error("Key not in use");
        this._data.delete(key);
        if (this.storage.autosave) this.storage.save();
    };

};

module.exports = Box;