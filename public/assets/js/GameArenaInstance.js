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
}

export default GameArenaInstance;