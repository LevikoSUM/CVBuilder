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
                    <button class="view-cv-btn" data-cv-id="${cv.cvId}">View CV</button>
                    <button class="delete-cv-btn" data-cv-id="${cv.cvId}">Delete CV</button>
                    <button class="edit-cv-btn" data-cv-id="${cv.cvId}">Edit CV</button>
                    <div class="edit-cv-form" style="display: none;">
                        <h3>Edit CV</h3>
                        <form class="edit-form">
                            <!-- Add input fields to show/edit CV details -->
                            <input type="text" name="edit-cv-name" value="${cv.name}" required>
                            <input type="text" name="edit-fullname" value="${cv.fullName || ''}" >
                            <input type="text" name="edit-email" value="${cv.email || ''}">
                            <input type="text" name="edit-gender" value="${cv.gender || ''}">
                            <input type="number" name="edit-age" value="${cv.age || ''}">
                            <input type="text" name="edit-phone" value="${cv.phone || ''}">
                            <input type="text" name="edit-job-title" value="${cv.jobtitle || ''}">
                            <input type="text" name="edit-company" value="${cv.company || ''}">
                            <input type="date" name="edit-start-date" value="${cv.startDate ? cv.startDate.split('T')[0] : ''}">
                            <input type="date" name="edit-end-date" value="${cv.endDate ? cv.endDate.split('T')[0] : ''}">
                            <input type="text" name="edit-degree" value="${cv.degree || ''}">
                            <input type="text" name="edit-university" value="${cv.university || ''}">
                            <input type="number" name="edit-graduation-year" value="${cv.graduationYear || ''}">
                            <!-- Add other input fields for other CV details -->
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                `;
                const viewBtn = cvCard.querySelector('.view-cv-btn');
                viewBtn.addEventListener('click', (event) => {
                    const cvId = event.target.dataset.cvId;
                    window.location.href = `https://localhost:7247/Home/CV?cvId=${cvId}`;
                });
                const deleteBtn = cvCard.querySelector('.delete-cv-btn');
                deleteBtn.addEventListener('click', (event) => {
                    const cvId = event.target.dataset.cvId;
                    deleteCV(cvId);
                });

                const editBtn = cvCard.querySelector('.edit-cv-btn');
                const editForm = cvCard.querySelector('.edit-cv-form');

                editBtn.addEventListener('click', () => {
                    editForm.style.display = 'block';
                });

                const editFormSubmit = editForm.querySelector('form.edit-form');

                editFormSubmit.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const cvId = editBtn.dataset.cvId;
                    const editedCvName = editFormSubmit.querySelector('input[name="edit-cv-name"]').value;
                    const editedFullName = editFormSubmit.querySelector('input[name="edit-fullname"]').value;
                    const editedEmail = editFormSubmit.querySelector('input[name="edit-email"]').value;
                    const editedGender = editFormSubmit.querySelector('input[name="edit-gender"]').value;
                    const editedAge = editFormSubmit.querySelector('input[name="edit-age"]').value;
                    const editedPhone = editFormSubmit.querySelector('input[name="edit-phone"]').value;
                    const editedJobTitle = editFormSubmit.querySelector('input[name="edit-job-title"]').value;
                    const editedCompany = editFormSubmit.querySelector('input[name="edit-company"]').value;
                    const editedStartDate = editFormSubmit.querySelector('input[name="edit-start-date"]').value;
                    const editedEndDate = editFormSubmit.querySelector('input[name="edit-end-date"]').value;
                    const editedDegree = editFormSubmit.querySelector('input[name="edit-degree"]').value;
                    const editedUniversity = editFormSubmit.querySelector('input[name="edit-university"]').value;
                    const editedGraduationYear = editFormSubmit.querySelector('input[name="edit-graduation-year"]').value;


                    try {
                        const response = await fetch(`/api/cvs/${cvId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                            },
                            body: JSON.stringify({
                                CVId: cvId,
                                Name: editedCvName,
                                FullName: editedFullName,
                                Email: editedEmail,
                                Gender: editedGender,
                                Age: parseInt(editedAge),
                                Phone: editedPhone,
                                Jobtitle: editedJobTitle,
                                Company: editedCompany,
                                StartDate: editedStartDate,
                                EndDate: editedEndDate,
                                Degree: editedDegree,
                                University: editedUniversity,
                                GraduationYear: parseInt(editedGraduationYear),
                            }),
                        });

                        if (response.ok) {
                            console.log('Successfully updated CV');
                            window.location.reload();

                        } else {
                            console.error('Failed to update CV:', response.status);
                        }
                    } catch (error) {
                        console.error('Error updating CV:', error);
                    }
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
