import PersonImgSettings from './PersonImgSettings';

class Person {
    constructor(ctx, width = 30, height = 50, color = 'green', x = 900, y = 50, imgWidth = 100, imgHeight = 100, moveDirection = 'up', pictureNumber = 0) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.color = color;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;

        this.sprites = [].slice.call(document.querySelectorAll('.person-img'));
        this.spriteNum = 0;
        this.moveDirection = moveDirection;
        this.i = pictureNumber;
    }

    getSprite() {
        this.spriteNum = (this.spriteNum + 1) % this.sprites.length;
        return this.sprites[this.spriteNum];
    }

    getBackGround(){
        return [].slice.call(document.getElementsByTagName('img'))[3];
    }

    update(ctx) {
        ctx.save();
        /*ctx.translate(this.x, this.y);
        //ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.imgWidth / -2, this.imgHeight / -2, this.imgWidth, this.imgHeight);
        ctx.restore();*/


        ctx.save();
        ctx.translate(this.x, this.y);

        var personImgProperties = this.getPersonImg();
        ctx.drawImage(this.getSprite(), personImgProperties.sx, personImgProperties.sy, personImgProperties.sWidth,
            personImgProperties.sHeight, this.imgWidth / -2, this.imgHeight / -2, this.imgWidth, this.imgHeight);

        /*this.img = new Image();  // Создание нового объекта изображения
        this.img.src = 'img/grass.png';
        ctx.drawImage(this.img, 0, 0);*/

        ctx.restore();

        this.i += 1;
        if (this.i % 6 === 0) {
            this.i = 0;
        }

        return this;
    }

    newPos(options) {
        this.moveAngle = 0;
        this.speed = 0;

        this.deltaX = 0;
        this.deltaY = 0;

        var a = options.left && (this.deltaX = -10) && (this.moveDirection = 'left');
        var b = options.right && (this.deltaX = 10) && (this.moveDirection = 'right');
        var c = options.up && (this.deltaY = 10) && (this.moveDirection = 'up');
        var d = options.down && (this.deltaY = -10) && (this.moveDirection = 'down');

        //this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.deltaX;
        this.y -= this.deltaY;


        xPerson = this.x;
        yPerson = this.y;

        if (this.x > FIELD_WIDTH) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = FIELD_WIDTH;
        }
        if (this.y > FIELD_HEIGHT) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = FIELD_HEIGHT;
        }
        return this;
    }

    getPersonImg() {
        if (this.moveDirection === 'up') {
            return PersonImgSettings.getUpSettings()[this.i];
        }
        if (this.moveDirection === 'down') {
            return PersonImgSettings.getDownSettings()[this.i];
        }
        if (this.moveDirection === 'left') {
            return PersonImgSettings.getLeftSettings()[this.i];
        }
        if (this.moveDirection === 'right') {
            return PersonImgSettings.getRightSettings()[this.i];
        }

        // default direction
        return PersonImgSettings.getDownSettings()[this.i];
    }

}

export default Person;