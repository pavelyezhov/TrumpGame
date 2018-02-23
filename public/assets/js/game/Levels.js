import EnemyType1 from './EnemyType1';
import EnemyType2 from './EnemyType2';

class Levels {

    static getLevels() {
        return [
            {
                winScoreLimit: 10,
                imgSource: undefined,
                enemies: [
                    // Jesuses
                    new EnemyType1(this.ctx, 15, 15, 'red',  600, 300, -3, 10, 200, 0),
                    new EnemyType1(this.ctx, 15, 15, 'red',  200, 300, -5, -5, 200, 0)
                ]
            },
            {
                winScoreLimit: 20,
                imgSource: undefined,
                enemies: [
                    //Cats
                    new EnemyType2(),
                    new EnemyType2(),

                    //Jesuses
                    new EnemyType1(this.ctx, 15, 15, 'red',  600, 300, -3, 10, 200, 0),
                    new EnemyType1(this.ctx, 15, 15, 'blue', 300, 600, -3)
                ]
            },
            {
                winScoreLimit: 30,
                imgSource: undefined,
                enemies: [
                    //Cats
                    new EnemyType2(this.ctx, 32, 32, 'blue', 400, 100,  0, 'up'),
                    new EnemyType2(this.ctx, 32, 32, 'blue', 400, 423,  0, 'right'),
                    new EnemyType2(this.ctx, 32, 32, 'blue', 234, 576,  0, 'left'),
                    new EnemyType2(this.ctx, 32, 32, 'blue', 123, 123,  0, 'down'),

                    //Jesuses
                    new EnemyType1(this.ctx, 20, 20, 'orange', 300, 800, -4),
                    new EnemyType1(this.ctx, 15, 15, 'red',  465, 234, -5, -5, 200, 0, 'left'),
                    new EnemyType1(),
                    new EnemyType1(this.ctx, 15, 15, 'blue', 300, 600, -3)
                ]
            }
        ];
    }
}

export default Levels;