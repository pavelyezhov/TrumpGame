class DrawService {
    constructor(dao) {
        this.dao = dao;
    }

    createRecordTableEl() {

        var tableId = 'recordTableId';
        var newTbl = document.createElement('table');
        newTbl.className = 'recordTable';
        newTbl.innerHTML = this.createRecordTableHTML();
        newTbl.id = tableId;
        return newTbl;
    }

    createRecordTableHTML() {
        var tableHTML = '<table><tr><th>Player</th><th>Score</th></tr>';
        var records = this.dao.getStoredData('playerRecordsId');

        for (var key in records) {
            tableHTML += '<tr><td>' + key + '</td><td>' + records[key] + '</td></tr>';
        }
        tableHTML += '</table>';
        return tableHTML;
    }

    createReplayTableHTML(data) {
        var tableHTML = '<table><tr><th>Player</th><th>Score</th><th>Time</th></tr>';


        for (var i = 0; i < data.length; i++) {
            var player = data[i].player;
            var score = data[i].score;
            var time = data[i].time;
            tableHTML += '<tr id=' + (i + 1) + '>' +

                '<td>' + '<a href="#/game">' + player + '</a>' + '</td>' +
                '<td>' + score + '</td>' +
                '<td>' + new Date(time).toLocaleString() + '</td>' +
                '</tr>';
        }
        tableHTML += '</table>';
        return tableHTML;

    }

    makePlayLastGameButtonVisible() {

        var controlsArea = document.getElementById('controlsArea');
        controlsArea.className = 'passive';

        var replayArea = document.getElementById('replayArea');
        replayArea.className = 'replayArea active';

    }
}

export default DrawService;