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

    try {
        const response = await fetch('/api/cvs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData),
        });

        if (response.ok) {
            // Request successful, handle the response
            const data = await response.json();

            // Update the frontend dashboard with the newly created CV
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
            // Request failed, handle the error
            console.error('Failed to create CV:', response.status);
        }
    } catch (error) {
        // Error occurred during the request, handle the error
        console.error('Error creating CV:', error);
    }
});


