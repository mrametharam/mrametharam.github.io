const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = '../assets/images/characters/shadow_dog.png';

const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;

const staggerFrames = 5;

let playerState = 'idle';
const dropdown = document.querySelector('#animations');

dropdown.addEventListener('change', function (e) {
    playerState = e.target.value;
});

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    }
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: []
    };

    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;

        frames.loc.push({ x: positionX, y: positionY });
    }

    let opt = new Option(state.name.toUpperCase(), state.name);
    dropdown.appendChild(opt);

    spriteAnimations[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //#region Beginner Method.
    // ctx.drawImage(
    //     playerImage,
    //     frameX * spriteWidth,
    //     frameY * spriteHeight,
    //     spriteWidth,
    //     spriteHeight,
    //     0,
    //     0,
    //     spriteWidth,
    //     spriteHeight
    // );

    // if (gameFrame % staggerFrames === 0) {
    //     if (frameX < 6) frameX++;
    //     else frameX = 0;
    // }
    //#endregion

    //#region Advanced Method
    let position = Math.floor(gameFrame / staggerFrames) % (spriteAnimations[playerState].loc.length - 1);
    // let frameX = spriteWidth * position;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    //#endregion

    gameFrame++;

    requestAnimationFrame(animate);
}

animate();
