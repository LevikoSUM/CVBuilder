const toggleModalLogin = (event) => {
    event.stopPropagation();
    const bodyClassList = document.body.classList;

    if (bodyClassList.contains('open-login')) {
        bodyClassList.remove('open-login');
        bodyClassList.add('closed');
    } else if (bodyClassList.contains('open-register')) {
        bodyClassList.remove('open-register');
        bodyClassList.add('closed');
        bodyClassList.add('open-login');
    } else {
        bodyClassList.remove('closed');
        bodyClassList.add('open-login');
    }
};

const toggleModalRegister = (event) => {
    event.stopPropagation();
    const bodyClassList = document.body.classList;

    if (bodyClassList.contains('open-register')) {
        bodyClassList.remove('open-register');
        bodyClassList.add('closed');
    } else if (bodyClassList.contains('open-login')) {
        bodyClassList.remove('open-login');
        bodyClassList.add('closed');
        bodyClassList.add('open-register');
    } else {
        bodyClassList.remove('closed');
        bodyClassList.add('open-register');
    }
};

const closeModalLogin = (event) => {
    event.stopPropagation();
    const bodyClassList = document.body.classList;
    bodyClassList.remove('open-login');
    bodyClassList.add('closed');
};

const closeModalRegister = (event) => {
    event.stopPropagation();
    const bodyClassList = document.body.classList;
    bodyClassList.remove('open-register');
    bodyClassList.add('closed');
};


document.addEventListener('click', (event) => {
    const target = event.target;
    const modal1 = document.querySelector('.modal1');
    const modal2 = document.querySelector('.modal2');

    if (
        !target.closest('.modal1') &&
        !target.closest('.modal2') &&
        !target.closest('.bx-menu') &&
        !modal1.classList.contains('open-login') &&
        !modal2.classList.contains('open-register') &&
        !target.classList.contains('login-form-input')
    ) {
        const bodyClassList = document.body.classList;

        if (bodyClassList.contains('open-login')) {
            bodyClassList.remove('open-login');
        } else if (bodyClassList.contains('open-register')) {
            bodyClassList.remove('open-register');
        }
    }
});

const showHeaderAndMiddleSection = () => {
    const header = document.querySelector('header');
    const middleSection = document.querySelector('.middle');
    const blurOverlay = document.querySelector('.blur-overlay');
    header.style.visibility = 'visible';
    middleSection.style.zIndex = '1';
    blurOverlay.style.opacity = '0';
    blurOverlay.style.visibility = 'hidden';
};

const hideHeaderAndMiddleSection = () => {
    const header = document.querySelector('header');
    const middleSection = document.querySelector('.middle');
    const blurOverlay = document.querySelector('.blur-overlay');
    header.style.visibility = 'hidden';
    middleSection.style.zIndex = '-1';
    blurOverlay.style.opacity = '1';
    blurOverlay.style.visibility = 'visible';
};