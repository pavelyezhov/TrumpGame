import Person from './Person';

class EnemyType2 extends Person {
    constructor(ctx, width = 30, height = 30, color = 'blue', x = 400, y = 400) {
        super();
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 0;
        this.angle = 0;
        this.moveAngle = 0;
        this.x = x;
        this.y = y;
    }

    newPos(xPerson, yPerson, fieldWidth, fieldHeight) {
        this.x += 2;


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

    update(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
        return this;
    }

    getItemType() {
        return 'EnemyType2';
    }
}
export default EnemyType2;