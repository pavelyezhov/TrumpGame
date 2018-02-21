class GameArenaInstance {

    static getGameArenaInstance() {
        return this.gameArena;
    }

    static setGameArenaInstance(gameArena) {
        this.gameArena = gameArena;
    }

    static getPersonPosition() {
        return this.personPosition;
    }

    static setPersonPosition(personPosition) {
        this.personPosition = personPosition;
    }

    static getShowBackground() {
        return this.showBackground;
    }

    static setShowBackground(showBackground) {
        this.showBackground = showBackground;
    }

    static getShowRadiuses() {
        return this.showRadiusesId;
    }

    static setShowRadiuses(showRadiusesId) {
        this.showRadiusesId = showRadiusesId;
    }

    static getInReplay() {
        return this.inReplay;
    }

    static setInReplay(inReplay) {
        this.inReplay = inReplay;
    }



}

export default GameArenaInstance;