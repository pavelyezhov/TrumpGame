class GameArenaInstance {

    static getInstance() {
        return this.gameArena;
    }

    static setInstance(gameArena) {
        this.gameArena = gameArena;
    }
}

export default GameArenaInstance;