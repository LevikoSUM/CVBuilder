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

    const cvName = cvForm.querySelector('input[name="cvname"]').value;
    const fullName = cvForm.querySelector('input[name="fullname"]').value;
    const email = cvForm.querySelector('input[name="email"]').value;
    const gender = cvForm.querySelector('input[name="gender"]').value;
    const age = cvForm.querySelector('input[name="age"]').value;
    const phone = cvForm.querySelector('input[name="phone"]').value;
    const address = cvForm.querySelector('input[name="address"]').value;
    const jobTitle = cvForm.querySelector('input[name="job-title"]').value;
    const company = cvForm.querySelector('input[name="company"]').value;
    const startDate = cvForm.querySelector('input[name="start-date"]').value;
    const endDate = cvForm.querySelector('input[name="end-date"]').value;
    const degree = cvForm.querySelector('input[name="degree"]').value;
    const university = cvForm.querySelector('input[name="university"]').value;
    const graduationYear = cvForm.querySelector('input[name="graduation-year"]').value;
    const skills = cvForm.querySelector('textarea[name="skills"]').value;



    try {
        const response = await fetch('/api/cvs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                Name: cvName,
                FullName: fullName,
                Email: email,
                Gender: gender,
                Age: parseInt(age),
                Phone: phone,
                Jobtitle: jobTitle,
                Company: company,
                StartDate: startDate,
                EndDate: endDate,
                Degree: degree,
                University: university,
                GraduationYear: parseInt(graduationYear),
                Skills: skills
            }),
        });

        if (response.ok) {
            console.log('Successfully created CV');
            window.location.reload();


        } else {
            console.error('Failed to create CV:', response.status);
        }
    } catch (error) {
        console.error('Error creating CV:', error);
    }
});

window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/cvs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
        });

        if (response.ok) {
            const cvsData = await response.json();

            const cvListDiv = document.querySelector('.cv-list');

            cvListDiv.innerHTML = '';

            cvsData.forEach(cv => {
                const cvCard = document.createElement('div');
                cvCard.classList.add('cv-card');

                cvCard.innerHTML = `
                <h2>${cv.name}</h2>
                <button class="delete-cv-btn" data-cv-id="${cv.cvId}">Delete CV</button>
                `;

                const deleteBtn = cvCard.querySelector('.delete-cv-btn');
                deleteBtn.addEventListener('click', (event) => {
                    const cvId = event.target.dataset.cvId;
                    deleteCV(cvId);
                });

                cvListDiv.appendChild(cvCard);
            });

            console.log('Successfully fetched CVs');
        } else {
            console.error('Failed to fetch CVs:', response.status);
        }
    } catch (error) {
        console.error('Error fetching CVs:', error);
    }
});

async function deleteCV(cvId) {
  try {
    const response = await fetch(`/api/cvs/${cvId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
    });

    if (response.ok) {
        console.log('Successfully deleted CV');
        window.location.reload();
      
    } else {
      console.error('Failed to delete CV:', response.status);
    }
  } catch (error) {
    console.error('Error deleting CV:', error);
  }
}

//const cvForm = document.getElementById('cv-form');
//cvForm.addEventListener('submit', async (e) => {
//    e.preventDefault();

//    const formData = new FormData(cvForm);

//    try {
//        var currentToken = sessionStorage.getItem('token');

//        if (currentToken != null) {
//            const response = await fetch('/api/cvs', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/x-www-form-urlencoded',
//                    'Authorization': 'Bearer ' + currentToken
//                },
//                body: JSON.stringify({
//                    Name: formData.get('name'), // Assuming you have an input element with name="name"
//                    email: formData.get('email'), // Assuming you have an input element with name="email"
//                    password: formData.get('password') // Assuming you have an input element with name="password"
//                })
//            });

//            if (response.ok) {
//                window.location.href = "https://localhost:7247/Home/Dashboard";
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
