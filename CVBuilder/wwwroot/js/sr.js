const srI = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
})


srI.reveal('.middle-text', { delay: 200, origin: 'top', easing: 'ease-in-out' });
srI.reveal('.middle-img', { delay: 450, origin: 'top' });
srI.reveal('.scroll-down', { delay: 500, origin: 'right' });
srI.reveal('.login-card', { delay: 200, origin: 'top' });
srI.reveal('.texts', { delay: 400, origin: 'bottom' });

const srD = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 250,
    reset: true
})

srD.reveal('.sidebar .side-menu .link-1', { delay: 50, origin: 'left' });
srD.reveal('.sidebar .side-menu .link-2', { delay: 250, origin: 'left' });
srD.reveal('.sidebar .side-menu .link-3', { delay: 450, origin: 'left' });
srD.reveal('.sidebar .side-menu .link-4', { delay: 650, origin: 'left' });
srD.reveal('.content main .cv-list', { delay: 300, origin: 'top' });