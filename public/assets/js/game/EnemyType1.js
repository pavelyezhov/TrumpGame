import Person from './Person';
import GameArenaInstance from "./GameArenaInstance.js";
import JesusImgSettings from '../settings/JesusImgSettings';

class EnemyType1 extends Person {
    constructor(ctx, width = 30, height = 30, color = 'red', x = 600, y = 300, speedV = 0, speedH = 5, radius = 200, pictureNumber = 0, moveDirection = 'right') {
        super();
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
        this.speedV = speedV;
        this.speedH = speedH;

        this.imgWidth = 32;
        this.imgHeight = 48;

        this.visionRadius = radius;
        this.moveDirection = moveDirection;

        this.sprites = [].slice.call(document.querySelectorAll('.Jesus-img'));
        this.spriteNum = 0;
        this.i = pictureNumber;
    }

    newPos(fieldWidth, fieldHeight) {
        var step = 3;
        var deltaX;
        var deltaY;

        if (this.heroInVision()) {
            deltaX = defineXStepSigh(this.x, step);
            deltaY = defineYStepSigh(this.y, step);
        } else {
            deltaX = this.speedH;
            deltaY = this.speedV;
        }

        this.defineMoveDirection(deltaX, deltaY);

        this.x += deltaX;
        this.y += deltaY;

        if (this.x > fieldWidth) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = fieldWidth;
        }

        if (this.y > fieldHeight) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = fieldHeight;
        }
        return this;
    }

    defineMoveDirection(deltaX, deltaY){

        if(deltaX > 0 ){
            this.moveDirection = 'right';
        }
        if(deltaX < 0){
            this.moveDirection = 'left';
        }
        if(deltaX === 0 ){
            if(deltaY >= 0){
                this.moveDirection = 'up';
            } else{
                this.moveDirection = 'down';
            }
        }
    }

    xPlusDelta(x, delta, fieldWidth) {
        if (x + delta < 0) {
            return 0;
        } else if (x + delta > fieldWidth) {
            return fieldWidth;
        }
        return x + delta;
    }


    yPlusDelta(y, delta, fieldHeight) {
        if (y + delta < 0) {
            return 0;
        } else if (y + delta > fieldHeight) {
            return fieldHeight;
        }
        return y + delta;
    }

    update(ctx, showRadiuses) {

        var centerX = this.x;
        var centerY = this.y;

        ctx.save();
        ctx.translate(this.x, this.y);

        /*ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);*/


        var enemyImgProperties = this.getJesusImg();
        ctx.drawImage(this.getSprite(), enemyImgProperties.sx, enemyImgProperties.sy, enemyImgProperties.sWidth,
            enemyImgProperties.sHeight, this.imgWidth/ -2, this.imgHeight/ -2, this.imgWidth, this.imgHeight);

        this.i += 1;
        if (this.i % 4 === 0) {
            this.i = 0;
        }

        ctx.restore();



        if(showRadiuses){
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.visionRadius, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        }
        return this;
    }

    getSprite() {
        this.spriteNum = (this.spriteNum + 1) % this.sprites.length;
        return this.sprites[this.spriteNum];
    }

    getJesusImg() {
        if (this.moveDirection === 'up') {
            return JesusImgSettings.getUpSettings()[this.i];
        }
        if (this.moveDirection === 'down') {
            return JesusImgSettings.getDownSettings()[this.i];
        }
        if (this.moveDirection === 'left') {
            return JesusImgSettings.getLeftSettings()[this.i];
        }
        if (this.moveDirection === 'right') {
            return JesusImgSettings.getRightSettings()[this.i];
        }

        // default direction
        return JesusImgSettings.getDownSettings()[this.i];
    }

    heroInVision() {
        var personPosition = GameArenaInstance.getPersonPosition();

        var deltaX = personPosition.xPerson - this.x;
        var deltaY = personPosition.yPerson - this.y;

        var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        return distance <= this.visionRadius;
    }

    getItemType() {
        return 'EnemyType1';
    }
}

function defineXStepSigh(x, step) {
    var personPosition = GameArenaInstance.getPersonPosition();

    var diff = personPosition.xPerson - x;
    var sign = diff === 0 ? 0 : (diff > 0 ? 1 : -1);

    return Math.abs(diff) < step ? sign : sign * step;
}

function defineYStepSigh(y, step) {
    var personPosition = GameArenaInstance.getPersonPosition();

    var diff = personPosition.yPerson - y;
    var sign = diff === 0 ? 0 : (diff > 0 ? 1 : -1);

    return Math.abs(diff) < step ? 0 : sign * step;
}
export default EnemyType1;
