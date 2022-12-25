/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.querySelector('#collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let gameOver = false;

let score = 0;
ctx.font = '50px Impact';

let ravens = [];

class Raven {
    constructor() {
        this.image = new Image();
        this.image.src = '../assets/images/characters/raven.png';

        this.spriteWidth = 271;
        this.spriteHeight = 194;

        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);

        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;

        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;

        this.okToDelete = false;
        this.frame = 0;
        this.maxFrame = 4;
        this.hasTrail = Math.random() > 0.5;

        this.randomColor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColor[0] + ', ' + this.randomColor[1] + ', ' + this.randomColor[2] + ')';
    }

    update(deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height) this.directionY *= -1;

        this.y += this.directionY;
        this.x -= this.directionX;

        if (this.x < 0 - this.width) this.okToDelete = true;

        this.timeSinceFlap += deltaTime;

        if (this.timeSinceFlap > this.flapInterval) {
            this.timeSinceFlap = 0;

            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;

            if (this.hasTrail) {
                for (let index = 0; index < 5; index++) particles.push(new Particle(this.x, this.y, this.width, this.color));
            }
        }

        if (this.x < 0 - this.width) gameOver = true;
    }

    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        collisionCtx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frame,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let explosions = [];

class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = '../assets/images/effects/boom.png';
        this.spriteWdith = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = '../assets/sound-effects/Fire impact 1.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.okToDelete = false;
    }

    update(deltaTime) {
        if (this.frame === 0) this.sound.play();

        this.timeSinceLastFrame += deltaTime;

        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;

            if (this.frame > 5) this.okToDelete = true;
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.spriteWdith * this.frame,
            0,
            this.spriteWdith,
            this.spriteHeight,
            this.x,
            this.y - this.size / 4,
            this.size,
            this.size
        );
    }
}

let particles = [];

class Particle {
    constructor(x, y, size, color) {
        this.size = size;
        this.x = x + this.size / 2 + Math.random() * 50 - 25;
        this.y = y + this.size / 3 + Math.random() * 50 - 25;
        this.color = color;

        this.radius = (Math.random() * this.size) / 10;
        this.maxRadius = Math.random() * 20 + 35;
        this.okToDelete = false;
        this.speedX = Math.random() * 1 + 0.5;
    }

    update() {
        this.x += this.speedX;
        this.radius += 0.3;

        if (this.radius > this.maxRadius - 5) this.okToDelete = true;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 15, 80);
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER!!', canvas.width / 2 - 5, canvas.height / 2 - 5);
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER!!', canvas.width / 2, canvas.height / 2);
}

window.addEventListener('click', (e) => {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    console.log(detectPixelColor);

    const pc = detectPixelColor.data;
    ravens.forEach((raven) => {
        if (raven.randomColor[0] === pc[0] && raven.randomColor[1] === pc[1] && raven.randomColor[2] === pc[2]) {
            raven.okToDelete = true;
            score++;
            explosions.push(new Explosion(raven.x, raven.y, raven.width));
        }
    });
});

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;

    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;

        ravens.sort((a, b) => {
            return a.width - b.width;
        });
    }

    drawScore();

    particles.forEach((partcle) => {
        partcle.update(deltaTime);
        partcle.draw();
    });

    ravens.forEach((raven) => {
        raven.update(deltaTime);
        raven.draw();
    });

    explosions.forEach((explosion) => {
        explosion.update(deltaTime);
        explosion.draw();
    });

    ravens = ravens.filter((raven) => !raven.okToDelete);
    explosions = explosions.filter((explosion) => !explosion.okToDelete);
    particles = particles.filter((particle) => !particle.okToDelete);

    gameOver = false;

    if (!gameOver) requestAnimationFrame(animate);
    else drawGameOver();
}

animate(0);
