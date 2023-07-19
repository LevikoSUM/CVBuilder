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
                'Authorization': 'Token ' + 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJUZXN0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNjVjZTQ0MmMtNGEyNC00NWUxLThkZTQtNzAwY2JjY2JjMzQ3IiwiZXhwIjoxNjg5ODQ2NDk3fQ.gSO8863sb0_GThJ2DQnwd15kewCCQkFoUEKINsPAEkigeG8s9IbH6PaPHldcyLKMYakcrrM9Fj177sKPZ4pOrQ'
            },
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