import Person from './Person';
import CatImgSettings from '../settings/CatImgSettings';

class EnemyType2 extends Person {
    constructor(ctx, width = 32, height = 32, color = 'blue', x = 400, y = 400, pictureNumber = 0, moveDirection = 'right') {
        super();
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;

        this.imgWidth = 32;
        this.imgHeight = 32;

        this.sprites = [].slice.call(document.querySelectorAll('.cat-img'));
        this.spriteNum = 0;
        this.moveDirection = moveDirection;
        this.i = pictureNumber;
    }

    getSprite() {
        this.spriteNum = (this.spriteNum + 1) % this.sprites.length;
        return this.sprites[this.spriteNum];
    }

    newPos(fieldWidth, fieldHeight) {

        this.doStepDependingOnDirection();

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

    doStepDependingOnDirection(){
        if(this.moveDirection === 'right'){
            this.x += this.speed;
        } else if(this.moveDirection === 'left'){
            this.x -= this.speed;
        } else if(this.moveDirection === 'up'){
            this.y -= this.speed;
        } else if(this.moveDirection === 'down'){
            this.y += this.speed;
        }
    }

    update(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        /*ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);*/



        var personImgProperties = this.getCatImg();
        ctx.drawImage(this.getSprite(), personImgProperties.sx, personImgProperties.sy, personImgProperties.sWidth,
            personImgProperties.sHeight, this.imgWidth/ -2, this.imgHeight/ -2, this.imgWidth, this.imgHeight);

        this.i += 1;
        if (this.i % 4 === 0) {
            this.i = 0;
        }

        ctx.restore();
        return this;
    }

    getItemType() {
        return 'EnemyType2';
    }

    getCatImg() {
        if (this.moveDirection === 'up') {
            return CatImgSettings.getUpSettings()[this.i];
        }
        if (this.moveDirection === 'down') {
            return CatImgSettings.getDownSettings()[this.i];
        }
        if (this.moveDirection === 'left') {
            return CatImgSettings.getLeftSettings()[this.i];
        }
        if (this.moveDirection === 'right') {
            return CatImgSettings.getRightSettings()[this.i];
        }

        // default direction
        return CatImgSettings.getDownSettings()[this.i];
    }
}
export default EnemyType2;