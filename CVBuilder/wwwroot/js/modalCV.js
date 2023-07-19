document.addEventListener('DOMContentLoaded', () => {
    const createCvButton = document.querySelector('.create-cv');
    const cvModalContainer = document.getElementById('cv-modal-container');
    const closeCvModal = document.getElementById('close-cv-modal');
    const blurOverlay = document.querySelector('.blur-overlay');

    createCvButton.addEventListener('click', toggleModalCV);
    closeCvModal.addEventListener('click', closeModalCV);
    blurOverlay.addEventListener('click', closeModalCV);

    function toggleModalCV(event) {
        event.stopPropagation();
        cvModalContainer.style.display = 'block';
        setTimeout(() => {
            document.body.classList.toggle('open-cv-modal');
        }, 100);
    }

    function closeModalCV(event) {
        event.stopPropagation();
        cvModalContainer.style.display = 'none';
        document.body.classList.remove('open-cv-modal');
    }
});