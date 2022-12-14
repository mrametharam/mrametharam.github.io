/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const CANVASS_WIDTH = (canvas.width = 500);
const CANVASS_HEIGHT = (canvas.height = 600);
const CANVASS_POSITION = canvas.getBoundingClientRect();

const explosions = [];

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;

        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = '../assets/images/effects/boom.png';

        this.sound = new Audio();
        this.sound.src = '../assets/sound-effects/Fire impact 1.wav';

        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }

    update() {
        if (this.frame === 0) this.sound.play();
        
        this.timer++;

        if (this.timer % 5 === 0) this.frame++;
    }

    draw() {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            0 - this.width / 2,
            0 - this.height / 2,
            this.width,
            this.height
        );

        ctx.restore();
    }
}

window.addEventListener('click', (e) => {
    createAnimation(e);
});

// window.addEventListener('mousemove', (e) => {
//     createAnimation(e);
// });

function createAnimation(e) {
    let positionX = e.x - CANVASS_POSITION.left;
    let positionY = e.y - CANVASS_POSITION.top;

    explosions.push(new Explosion(positionX, positionY));

    console.log(explosions);
}

function animate() {
    ctx.clearRect(0, 0, CANVASS_WIDTH, CANVASS_HEIGHT);

    explosions.forEach((explosion, idx) => {
        explosion.update();
        explosion.draw();

        if (explosion.frame > 5) explosions.splice(idx, 1);
    });

    requestAnimationFrame(animate);
}

animate();
