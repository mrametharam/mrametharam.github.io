// CSS Variables
//
// References:
// - https://www.youtube.com/watch?v=oZPR_78wCnY

// This is how to access css variables.
// const docElement = window.getComputedStyle(document.documentElement);
// const bgColor = docElement.getPropertyValue('--div-background-color');

// console.log({ bgColor });

const docElement = document.documentElement.style;

const btnDrk = document.querySelector('#dark-theme-btn');
const btnLght = document.querySelector('#light-theme-btn');

btnDrk.addEventListener('click', () => {
    const bg = docElement.getPropertyValue('--background-color');
    console.log({ bg });

    // This is how to set the value of variables.
    document.documentElement.style.setProperty('--background-color', '#333333');
});

btnLght.addEventListener('click', () => {
    docElement.setProperty('--background-color', '#ffffff');
});
