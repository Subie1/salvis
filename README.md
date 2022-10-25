### Salvis
A Node Module for saving and loading data.

### Installation
```
npm install salvis
```

### Storage
Storage is what is considered as the Data Base
it will be what you use to storage data inside.

```js
const Salvis = require("salvis");

const storage = new Salvis("player_data");

// const storage = new Salvis("player_data", { path: "./src/storage/players" /* Default ./.data/storage_id */, autosave: false /* Default true */, autoload: false /* Default true */, prettify: true /* Default false */ });

```

The storage variable is what is used to create
boxes inside that then you can store data with.

### Storage Options

- Path (Default "./.data/storage_id")
Changes the path at which the files are stored.

- Autosave (Default "true")
Saves to the files whenever a modification is
made to a box.

- Autoload (Default "true")
Runs `storage.load();` at the initiation of the
class Salvis.

- Prettify (Default "false")
Changes the way the files are stored from one
liner JSON to a pretty version of a more readable
JSON (Takes more storage space).

### Boxes
Boxes are the components that you use to save data
for example coins in a game.

```js
//...
const coins = storage.box("coins", 0 /* Default value */);
const stamina = storage.box("stamina", 100 /* Default value */);
const rank = storage.box("rank", "guest");
```

Boxes have alot of functionalities which are the
main data storage.

```js
//...
coins.setup("subie") // coins.set("subie", 0 /* Default value */);
const user = coins.get("subie");

if (coins.has("John")) console.log("We have John");

coins.delete("John"); // We don't like John

coins.set("hacker", 128390128390);

const users = coins.keys();
const moneys = coins.values();
```

### Saving/Loading
Saving and loading is as simple as modifying the data.

Autosave is saving to file on every edit to the data.
Autoload is loading the files at launch.

Both autosave and autoload are auto set to true so using `storage.load()`
and `storage.save()` is not needed.

```js
storage.save(); // Should be done after every modification if autosave is disabled
storage.load(); // Should be done after declaring the storage variable if autoload is disabled
```

### Setup
You can setup a key with the default box values with the
following two methods.

- Global Setup
This sets up the key to every box.
```js
//...
storage.setup("Newbie");
```

- Per Box Setup
This sets up the key to a single box.
```js
//...
rank.setup("Newbie");
```