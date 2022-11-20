//#region Basic Canvas Setup
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
//#endregion

let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = '../assets/images/environments/city/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '../assets/images/environments/city/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '../assets/images/environments/city/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '../assets/images/environments/city/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '../assets/images/environments/city/layer-5.png';

const slider = document.querySelector('#slider');
slider.value = gameSpeed;

const showGameSpeed = document.querySelector('#showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change', (e) => {
    showGameSpeed.innerHTML = gameSpeed = e.target.value;
});

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;

        if (this.x <= -this.width) {
            this.x = 0;
        }

        this.x = Math.floor(this.x - this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

    updateAndDraw() {
        this.update();
        this.draw();
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1.0);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameObjects.forEach((obj) => {
        obj.updateAndDraw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('load', () => animate());
