const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.querySelector('#overlay');
const background = document.querySelector('#background');

openModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);

        openModal(modal);
    });
});

closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get the closest parent that has a class of modal.
        const modal = button.closest('.modal');

        closeModal(modal);
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');

    modals.forEach((modal) => {
        closeModal(modal);
    });
});

function openModal(modal) {
    if (!modal) return;

    modal.classList.add('active');
    overlay.classList.add('active');
    background.classList.add('blur');
}

function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
    background.classList.remove('blur');
}
