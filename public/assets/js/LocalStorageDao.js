class LocalStorageDao {

    constructor() {
        this.frameStoreId = 'frameStoreId';
        this.playerRecordsId = 'playerRecordsId';
        this.storage = localStorage;
    }

    getStoredData(id) {
        return JSON.parse(this.storage.getItem(id));
    }

    saveObject(item, stepId) {

        var frames = this.getStoredData(this.frameStoreId);


        // initialize if necessary
        if (frames === null) {
            frames = [];
        }
        if (!frames[stepId]) {
            frames[stepId] = {
                enemies1: [],
                enemies2: [],
                hero: {}
            };
        }
        this.addItemToStore(item, frames[stepId]);
        this.storage.setItem(this.frameStoreId, JSON.stringify(frames));
        return item;
    }

    addItemToStore(item, frameStore) {
        if (item instanceof EnemyType1) {
            frameStore.enemies1.push(item);
        } else if (item instanceof EnemyType2) {
            frameStore.enemies2.push(item);
        } else if (item instanceof Person) {
            frameStore.hero = item;
        }
    }

    getItemsByFrameId(frameId) {

        var frames = JSON.parse(this.storage.getItem(this.frameStoreId));
        return frames[frameId];
    }

    clearFrames() {
        var frames = this.getStoredData(this.frameStoreId);
        frames = null;
        this.storage.setItem(this.frameStoreId, JSON.stringify(frames));
    }

    saveRecord(score, playerName) {
        var records = this.getStoredData('playerRecordsId');
        if (records === null) {
            records = {};
        }

        var existingPlayerResult = records[playerName];
        if (!existingPlayerResult || existingPlayerResult < score) {
            records[playerName] = score;
        }

        this.storage.setItem(this.playerRecordsId, JSON.stringify(records));

    }

}