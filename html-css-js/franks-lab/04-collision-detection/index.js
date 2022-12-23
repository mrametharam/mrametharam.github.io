/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 600);

const r1 = { x: 70, y: 70, width: 50, height: 100 };
const r2 = { x: 50, y: 105, width: 50, height: 100 };
const c1 = { x: 350, y: 105, raduis: 50 };
const c2 = { x: 249, y: 105, raduis: 50 };

//#region Box Checks
// Check #1
function boxCheck1() {
    if (r1.x <= r2.x + r2.width && r1.x + r1.width >= r2.x && r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y) {
        console.log('#1: Collision cetected');
        return true;
    } else {
        console.log('#1: NO collision detected');
        return false;
    }
}

// Check #2: This is more efficient because only 1 condition needs to be satisfied
function boxCheck2() {
    if (r1.x > r2.x + r2.width || r1.x + r1.width < r2.x || r1.y > r2.y + r2.height || r1.y + r1.height < r2.y) {
        console.log('#2: NO Collision cetected');
        return false;
    } else {
        console.log('#2: Collision detected');
        return true;
    }
}
//#endregion

//#region Circular Checks
function circularCheck() {
    let dx = c2.x - c1.x;
    let dy = c2.y - c1.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let sumOfRadii = c1.raduis + c2.raduis;

    if (distance <= sumOfRadii) {
        console.log('#3: Collision detected');
        return true;
    } else {
        console.log('#3: NO Collision detected');
        return false;
    }
}
//#endregion

(() => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //#region Box Collision
    if (boxCheck1() || boxCheck2()) {
        ctx.strokeRect(r1.x, r1.y, r1.width, r1.height);
        ctx.strokeRect(r2.x, r2.y, r2.width, r2.height);
    } else {
        ctx.fillRect(r1.x, r1.y, r1.width, r1.height);
        ctx.fillRect(r2.x, r2.y, r2.width, r2.height);
    }
    //#endregion

    //#region Circular Collisions
    // Circle #1
    ctx.beginPath();
    ctx.arc(c1.x, c1.y, c1.raduis, 2 * Math.PI, false);

    if (circularCheck()) ctx.fillStyle = 'red';
    else ctx.fillStyle = 'green';
    ctx.fill();

    // Circle #2
    ctx.beginPath();
    ctx.arc(c2.x, c2.y, c2.raduis, 2 * Math.PI, false);

    if (circularCheck()) ctx.fillStyle = 'red';
    else ctx.fillStyle = 'purple';
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.stroke()
    //#endregion
})();
