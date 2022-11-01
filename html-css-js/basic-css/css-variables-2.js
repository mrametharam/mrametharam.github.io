const box = document.querySelector('.box');
const boxStyles = getComputedStyle(box);
// console.log(boxStyles);

const boxMainColor = boxStyles.getPropertyValue('--box-main-color');
console.log(boxMainColor);

const header = document.querySelector('#main-header');
header.style.setProperty('--header-bg-color', boxMainColor);
