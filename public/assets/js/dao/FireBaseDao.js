class DAO {
    constructor() {

    }

    init() {

        this.database = firebase.database();
        this.framesRef = this.database.ref('frame');
        this.framesRef.off();
    }

    loadItems(items) {
        console.log('Data: ');
        this.framesRef = this.database.ref('frame');
        this.framesRef.off();
        return this.framesRef;
    }

    loadGame(id) {

        this.gameRef = this.database.ref('games/' + id);
        this.gameRef.off();
        return this.gameRef;
    }

    loadGames() {

        if (!this.database) {
            this.database = firebase.database();
        }
        this.gamesRef = this.database.ref('games');
        this.gamesRef.off();
        return this.gamesRef;
    }

    saveFrame(stepId, objType, item) {

        this.framesRef = this.database.ref('frames');
        this.framesRef.off();
        this.database.ref('frame/' + stepId + objType).set({
            "content": JSON.stringify(item)
        });
    }

    saveGame(item, score, player) {

        this.gamesRef = this.database.ref('games');
        this.gamesRef.off();

        this.loadGames().once('value').then(element => {
            //console.log(element.child('content').key + ':' + element.child('content').val());
            var newGameId;
            if (element.val() && Object.values(element.val())) {
                newGameId = Object.values(element.val()).length + 1;
            } else {
                newGameId = 1;
            }

            this.database.ref('games/' + newGameId).set({
                "game": JSON.stringify(item),
                "player": player,
                "score": score,
                "time": Date.now()
            });
        });
    }

    getFrameObjectsByFrameIdAndType(stepId, objType) {

        this.framesRef = this.database.ref('frame');
        this.framesRef.off();

        var foundElem = this.framesRef.child(stepId + objType);
        return foundElem;
    }
}

export default DAO;