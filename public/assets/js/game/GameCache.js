class GameCache {

    constructor() {
        this.frames = [];
    }

    saveHero(hero, frameId) {
        if (!this.frames[frameId]) {
            this.initFrame(frameId);
        }
        this.frames[frameId].hero = JSON.stringify(hero);
    }

    saveEnemy(enemy, frameId) {
        if (!this.frames[frameId]) {
            this.initFrame(frameId);
        }
        this.frames[frameId].enemies.push(JSON.stringify(enemy));
    }

    saveBackGroundImage(imgSrc, frameId) {
        if (!this.frames[frameId]) {
            this.initFrame(frameId);
        }
        this.frames[frameId].imageSource = imgSrc;
    }

    savePersonRadiusesShowOption(frameId, showRadiuses){
        if (!this.frames[frameId]) {
            this.initFrame(frameId);
        }
        this.frames[frameId].showRadiuses = showRadiuses;
    }

    initFrame(frameId) {
        if (this.frames.length === 0) {
            this.frames.push({
                hero: {},
                enemies: []
            });
            this.frames.push({
                hero: {},
                enemies: []
            });
        } else {
            this.frames[frameId] = {
                hero: {},
                enemies: []
            };
        }

    }
}

export default GameCache;
