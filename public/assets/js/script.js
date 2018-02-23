import DAO from './dao/FireBaseDao';
import LocalStorageDao from './dao/LocalStorageDao';
import DrawService from './service/DrawService';
import Router from './router/Router';
import Person from './game/Person';
import GameArena from './game/GameArena';
import GameArenaInstance from "./game/GameArenaInstance.js";


export function prepareElements(){
    var FIELD_WIDTH  = document.documentElement.clientWidth;
    var FIELD_HEIGHT = document.documentElement.clientHeight - document.getElementsByTagName('nav')[0].clientHeight;

   GameArenaInstance.setPersonPosition({
        xPerson: 0,
        yPerson: 0
    });

    var gameIdToReplay;
    var lsdao = new LocalStorageDao();
    var fbDao = new DAO();


    var canvas = document.querySelector('canvas');
    var drawService = new DrawService(lsdao);
    GameArenaInstance.setGameArenaInstance(new GameArena(canvas, FIELD_WIDTH, FIELD_HEIGHT, Person));
    var routes = [

        {
            name: 'game',
            match: /[/]game/,
            onBeforeEnter: () => {
                var gameArea = document.getElementById('gameArea');
                if(gameArea){
                    gameArea.className = 'gameArea active';
                    resetStartButtonToInitialState();
                    makeReplayAreaPassive();
                    makeControlsAreaActive();
                    setElementAndParentStyle('gameLink', 'active');
                }
            },
            onEnter: () => {},
            onLeave: () => {
                // Stop the game
                GameArenaInstance.getGameArenaInstance().stop();

                // Hide game area
                var gameArea = document.getElementById('gameArea');
                gameArea.className = 'gameArea passive';

                // Change action icon
                var controlsArea = document.getElementById('controlsArea');
                controlsArea.children[0].src = 'img/play.png';
                setElementAndParentStyle('gameLink', '');
                GameArenaInstance.getGameArenaInstance().stop();
            }
        },
        {
            name: 'showGame',
            match: /[/]showGame/,
            onBeforeEnter: () => {
                var gameArea = document.getElementById('gameArea');
                if(gameArea){
                    gameArea.className = 'gameArea active';
                }
            },
            onEnter: () => {},
            onLeave: () => {


                // Hide game area
                var gameArea = document.getElementById('gameArea');
                gameArea.className = 'gameArea passive';

                // Change action icon
                var controlsArea = document.getElementById('controlsArea');
                controlsArea.children[0].src = 'img/play.png';

                var replayArea = document.getElementById('replayArea');
                replayArea.className = 'replayArea passive';

                // Stop the game
                GameArenaInstance.getGameArenaInstance().stop();
            }
        },
        {
            name: 'records',
            match: /[/]records/,
            onBeforeEnter: () => {
                var recordsArea = document.getElementById('recordsArea');
                recordsArea.className = 'active';
                recordsArea.style.width = document.documentElement.clientWidth;
                recordsArea.style.height = document.documentElement.clientHeight;

                var tableArea = document.getElementById('recordTableId');
                tableArea.innerHTML = drawService.createRecordTableHTML();
                tableArea.className = 'table';

                setElementAndParentStyle('recordLink', 'active');

            },
            onEnter: () => {},
            onLeave: () => {
                var recordsArea = document.getElementById('recordsArea');
                recordsArea.className = 'recordsArea passive';

                var tableArea = document.getElementById('recordTableId');
                tableArea.className = 'tableArea passive';

                setElementAndParentStyle('recordLink', '');
            }
        },
        {
            name: 'replays',
            match: /[/]replays/,
            onBeforeEnter: () => {
                setElementAndParentStyle('replayLink', 'active');

                var replaysPage = document.getElementById('replaysPage');
                replaysPage.className = 'replaysPage active';
                replaysPage.style.width = document.documentElement.clientWidth;
                replaysPage.style.height = document.documentElement.clientHeight;

                var tableArea = document.getElementById('replaysTableId');

                fbDao.loadGames().once('value').then(element=>{

                    tableArea.innerHTML = drawService.createReplayTableHTML( Object.values(element.val()));
                    tableArea.className = 'table';
                });

            },
            onEnter: () => console.log(`onEnter replays`),
            onLeave: () => {
                setElementAndParentStyle('replayLink', '');

                var recordsArea = document.getElementById('replaysPage');
                recordsArea.className = 'replaysPage passive';

                var tableArea = document.getElementById('replaysTableId');
                tableArea.className = 'tableArea passive';
            }
        },
        {
            name: 'about',
            match: /[/]about/,
            onBeforeEnter: () => {
                setElementAndParentStyle('aboutLink', 'active');
                setElementAndParentStyle('aboutArea', 'aboutArea active');
                },
            onEnter: () => console.log(`onEnter about`),
            onLeave: () => {
                setElementAndParentStyle('aboutLink', '');
                setElementStyle('aboutArea', 'aboutArea passive');
            }
        },
        {
            name: 'options',
            match: /[/]options/,
            onBeforeEnter: () => {
                setElementAndParentStyle('optionsLink', 'active');
                setElementAndParentStyle('settingsArea', 'settingsArea active');
            },
            onEnter: () => console.log(`onEnter options`),
            onLeave: () => {
                setElementAndParentStyle('optionsLink', '');
                setElementStyle('settingsArea', 'settingsArea passive');
            }
        }
    ];

    location.hash = '/game';


    var options = {
        routes: routes
    };
    var router = new Router(options);




    var controlsArea = document.getElementById('controlsArea');
    controlsArea.addEventListener('click', function(){

        var activeImg = this.children[0].src;
        if(activeImg.includes('play')){
            GameArenaInstance.getGameArenaInstance().start();
            this.children[0].src = 'img/pause.png';
        } else{
            GameArenaInstance.getGameArenaInstance().stop();
            this.children[0].src = 'img/play.png';
        }
        GameArenaInstance.setInReplay(false);
    });

    var replayArea = document.getElementById('replayArea');
    replayArea.addEventListener('click', function(){
        if(!gameIdToReplay){
            GameArenaInstance.getGameArenaInstance().replayLastGame();
        }
        GameArenaInstance.setInReplay(true);
        GameArenaInstance.getGameArenaInstance().replaySelectedGame(gameIdToReplay);
    });

    var tableArea = document.getElementById('replaysTableId');
    tableArea.addEventListener('click', function(){
        if(event.target.tagName === 'A'){
            gameIdToReplay = Number(event.target.parentNode.parentNode.id); // TODO: make independent link
            drawService.makePlayLastGameButtonVisible();
        }
    });


    var showBackgroundCheckBox = document.getElementById('showBackgroundId');

    showBackgroundCheckBox.addEventListener( 'change', function(){
        var showBackground = GameArenaInstance.getShowBackground();

        if(showBackground != undefined){
            GameArenaInstance.setShowBackground(!showBackground);
        } else{
            GameArenaInstance.setShowBackground(this.checked);
        }
    });

    var showRadiusesCheckBox = document.getElementById('showRadiusesId');

    showRadiusesCheckBox.addEventListener( 'change', function(){
        var showRadiusesId = GameArenaInstance.getShowRadiuses();

        if(showRadiusesId != undefined){
            GameArenaInstance.setShowRadiuses(!showRadiusesId);
        } else{
            GameArenaInstance.setShowRadiuses(this.checked);
        }
    });


}

export function resetStartButtonToInitialState(){
    var controlsArea = document.getElementById('controlsArea');
    controlsArea.children[0].src = 'img/play.png';
}


function makeReplayAreaPassive(){

    var replayArea = document.getElementById('replayArea');
    replayArea.className = 'replayArea passive';
}

function makeControlsAreaActive(){
    var controlsArea = document.getElementById('controlsArea');
    controlsArea.className = '';
}

function setElementAndParentStyle(id, style){
    var element = document.getElementById(id);
    element.className = style;
    element.parentElement.className = style;
}

function setElementStyle(id, style){
    var element = document.getElementById(id);
    element.className = style;
}



