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


const cvForm = document.getElementById('cv-form');
cvForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(cvForm);

    try {
        var currentToken = sessionStorage.getItem('token');

        if (currentToken != null) {
            const response = await fetch('/api/cvs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + currentToken
                },
                body: JSON.stringify({
                    Name: formData.get('name'), // Assuming you have an input element with name="name"
                    email: formData.get('email'), // Assuming you have an input element with name="email"
                    password: formData.get('password') // Assuming you have an input element with name="password"
                })
            });

            if (response.ok) {
                window.location.href = "https://localhost:7247/Home/Dashboard";
            } else {
                console.error('Failed to create CV:', response.status);
            }
        } else {
            console.error('Failed to login:', loginauth.status);
        }
    } catch (error) {
        console.error('Error creating CV:', error);
    }
});



//const cvForm = document.getElementById('cv-form');
//cvForm.addEventListener('submit', async (e) => {
//    e.preventDefault();

//    const formData = new FormData(cvForm);

//    try {
//        const loginauth = await fetch('/api/auth/login', {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify({
//                "Email": "Test@gmail.com",
//                "Password": "Password"
//            }),
//        });

//        if (loginauth.ok) {
//            const loginResponse = await loginauth.json();
//            const currentToken = loginResponse.token;

//            const response = await fetch('/api/cvs', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/x-www-form-urlencoded',
//                    'Authorization': 'Bearer ' + currentToken
//                },
//                body: new URLSearchParams(formData),
//            });

//            if (response.ok) {
//                const data = await response.json();

//                const cvCardsContainer = document.getElementById('cv-cards-container');
//                const cvCard = document.createElement('div');
//                cvCard.classList.add('cv-card');
//                cvCard.innerHTML = `
//                    <h3>${data.fullname}</h3>
//                    <p>${data.email}</p>
//                    <p>${data.phone}</p>
//                    <p>${data.address}</p>
//                    <!-- Include other CV details as needed -->
//                `;
//                cvCardsContainer.appendChild(cvCard);
//            } else {
//                console.error('Failed to create CV:', response.status);
//            }
//        } else {
//            console.error('Failed to login:', loginauth.status);
//        }
//    } catch (error) {
//        console.error('Error creating CV:', error);
//    }
//});
