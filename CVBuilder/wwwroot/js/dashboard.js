const sideLinks = document.querySelectorAll('.sidebar .side-menu li a');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
});

//FETCH

const cvForm = document.getElementById('cv-form');
cvForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(cvForm);
    const currentToken;

    try { /*call api/auth/login - POST, user cridentials {
    "Email" : "Test@gmail.com",
    "Password":"Parola"
}*/
        const loginauth = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Email": "Test@gmail.com",
                "Password": "Password"
                  }),
        });
        /*currentToken = loginauth.!!getthetoken!!;*/
        const response = await fetch('/api/cvs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Token ' + currentToken },
            body: new URLSearchParams(formData),
        });

        if (response.ok) {
            const data = await response.json();

            const cvCardsContainer = document.getElementById('cv-cards-container');
            const cvCard = document.createElement('div');
            cvCard.classList.add('cv-card');
            cvCard.innerHTML = `
        <h3>${data.fullname}</h3>
        <p>${data.email}</p>
        <p>${data.phone}</p>
        <p>${data.address}</p>
        <!-- Include other CV details as needed -->
      `;
            cvCardsContainer.appendChild(cvCard);
        } else {
            console.error('Failed to create CV:', response.status);
        }
    } catch (error) {
        console.error('Error creating CV:', error);
    }
});