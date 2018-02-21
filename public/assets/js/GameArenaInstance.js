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
        return this.showBackground = showBackground;
    }
}

export default GameArenaInstance;