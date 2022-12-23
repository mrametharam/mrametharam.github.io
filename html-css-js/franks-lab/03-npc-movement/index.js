/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 600);
const MAX_ENEMIES = 10;

const enemies = [];

let gameFrame = 0;

class EnemyA {
    constructor() {
        this.enemyImage = new Image();
        this.enemyImage.src = '../assets/images/characters/enemy1.png';

        // this.speed = Math.random() * 5 - 2; // Random # between -2 and 2.
        this.spriteHeight = 155;
        this.spriteWidth = 293;
        this.height = this.spriteHeight / 2.5;
        this.width = this.spriteWidth / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    update() {
        // this.x += this.speed;
        // this.y += this.speed;
        // Hovering staggering
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;

        if (gameFrame % this.flapSpeed === 0) this.frame > 4 ? (this.frame = 0) : this.frame++;
    }

    draw() {
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.enemyImage,
            this.frame * this.spriteWidth,
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

class EnemyB {
    constructor() {
        this.enemyImage = new Image();
        this.enemyImage.src = '../assets/images/characters/enemy2.png';

        this.speed = Math.random() * 4 + 1;

        this.spriteHeight = 188;
        this.spriteWidth = 266;
        this.height = this.spriteHeight / 2;
        this.width = this.spriteWidth / 2;

        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);

        this.angle = 0; // Math.random() * 2;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    update() {
        // Right to left movement
        this.x -= this.speed;

        // Vertical bounce movement
        this.y += this.curve * Math.sin(this.angle);

        this.angle += this.angleSpeed;

        if (this.x + this.width < 0) this.x = CANVAS_WIDTH;

        if (gameFrame % this.flapSpeed === 0) this.frame > 4 ? (this.frame = 0) : this.frame++;
    }

    draw() {
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.enemyImage,
            this.frame * this.spriteWidth,
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

class EnemyC {
    constructor() {
        this.enemyImage = new Image();
        this.enemyImage.src = '../assets/images/characters/enemy3.png';

        this.speed = Math.random() * 4 + 1;

        this.spriteHeight = 177;
        this.spriteWidth = 218;
        this.height = this.spriteHeight / 2;
        this.width = this.spriteWidth / 2;

        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);

        this.angle = 0; // Math.random() * 2;
        this.angleSpeed = Math.random() * 2 + 0.5;
        this.curve = Math.random() * 200 + 50;

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    update() {
        //#region Circular movement
        // Horizontal bounce movement.
        this.x = (CANVAS_WIDTH / 2) * Math.sin((this.angle * Math.PI) / 95) + (CANVAS_WIDTH / 2 - this.width / 2);

        // Veritcal bounce movement
        this.y = (CANVAS_HEIGHT / 2) * Math.cos((this.angle * Math.PI) / 180) + (CANVAS_HEIGHT / 2 - this.height / 2);
        //#endregion

        this.angle += this.angleSpeed;

        if (this.x + this.width < 0) this.x = CANVAS_WIDTH;

        if (gameFrame % this.flapSpeed === 0) this.frame > 4 ? (this.frame = 0) : this.frame++;
    }

    draw() {
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.enemyImage,
            this.frame * this.spriteWidth,
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

class EnemyD {
    constructor() {
        this.enemyImage = new Image();
        this.enemyImage.src = '../assets/images/characters/enemy4.png';

        this.speed = Math.random() * 4 + 1;

        this.spriteHeight = 213;
        this.spriteWidth = 213;
        this.height = this.spriteHeight / 2;
        this.width = this.spriteWidth / 2;

        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.newX = Math.random() * (CANVAS_WIDTH - this.width);
        this.newY = Math.random() * (CANVAS_HEIGHT - this.height);

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }

    update() {
        // Every # frames, generate new target positions.
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (CANVAS_WIDTH - this.width);
            this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
        }

        // Calculate the distance between the current position and the new position
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        // Move towards the new position.
        this.x -= dx / 50;
        this.y -= dy / 50;

        if (gameFrame % this.flapSpeed === 0) this.frame > 7 ? (this.frame = 0) : this.frame++;
    }

    draw() {
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.enemyImage,
            this.frame * this.spriteWidth,
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

for (let index = 0; index < MAX_ENEMIES; index++) {
    enemies.push(new EnemyD());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });

    gameFrame++;

    requestAnimationFrame(animate);
}

animate();
