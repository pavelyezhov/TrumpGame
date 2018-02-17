class DAO {
    constructor() {

    }

    init() {
        console.log('INIT: ');

        this.database = firebase.database();
        //this.storage = firebase.storage();

        // Reference to the /messages/ database path.
        this.framesRef = this.database.ref('frame');
        // Make sure we remove all previous listeners.
        this.framesRef.off();
    }

    loadItems(items) {
        console.log('Data: ');

        // Reference to the /messages/ database path.
        this.framesRef = this.database.ref('frame');
        // Make sure we remove all previous listeners.
        this.framesRef.off();

        // select *
        /*this.framesRef.once("value", function(dataSnapshot){
            console.log(dataSnapshot.val());
        });*/
        return this.framesRef;
    }

    loadGame(id) {

        this.gameRef = this.database.ref('games/' + id);
        // Make sure we remove all previous listeners.
        this.gameRef.off();

        return this.gameRef;
    }

    loadGames() {
        // TODO remove this check after refactoring to the ES 6
        if (!this.database) {
            this.database = firebase.database();
        }

        // Reference to the /messages/ database path.
        this.gamesRef = this.database.ref('games');
        // Make sure we remove all previous listeners.
        this.gamesRef.off();

        return this.gamesRef;
    }

    saveFrame(stepId, objType, item) {

        // Reference to the /messages/ database path.
        this.framesRef = this.database.ref('frames');
        // Make sure we remove all previous listeners.
        this.framesRef.off();

        this.database.ref('frame/' + stepId + objType).set({
            "content": JSON.stringify(item)
        });
    }

    saveGame(item, score, player) {

        // Reference to the /messages/ database path.
        this.gamesRef = this.database.ref('games');
        // Make sure we remove all previous listeners.
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
        // Reference to the /messages/ database path.
        this.framesRef = this.database.ref('frame');
        // Make sure we remove all previous listeners.
        this.framesRef.off();

        var foundElem = this.framesRef.child(stepId + objType);
        return foundElem;
    }
}

export default DAO;