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

const form = document.getElementById('cv-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch('/api/cvs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            // The response should contain the newly created CV data
            console.log('New CV created:', data);

            // Update the frontend dashboard with the newly created CV
            const cvCardsContainer = document.getElementById('cv-cards-container');
            const cvCard = document.createElement('div');
            cvCard.classList.add('cv-card');
            cvCard.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.description}</p>
    <div class="cv-actions">
        <button class="preview-btn">Preview</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    </div>
`;
            cvCardsContainer.appendChild(cvCard);
        })
        .catch(error => {
            console.error('Error creating CV:', error);
        });
});

