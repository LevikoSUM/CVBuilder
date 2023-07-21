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
                <html>
                <head>
                <style>
                .cv-card{
                    background-image: linear-gradient(-45deg, #FFD1C7 25%, #FFE3C6 50%, #FFF7C7 75%, #D4F6D6 100%);
                    border-radius: 30px;
                }
  .cv-card h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .delete-cv-btn,
  .edit-cv-btn {
    background: #f38b65; 
    line-height: 1.4;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    border-radius: 30px;
    text-transform: uppercase;
    transition: all .55s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .delete-cv-btn:hover,
  .edit-cv-btn:hover{
  background: #d97d57;
    transform: translateY(2px);

  }

  .delete-cv-btn {
    margin-right: 8px;
  }

  .edit-cv-btn {
    margin-right: 8px;
  }

  .edit-form label {
    display: block;
    margin-top: 8px;
    margin-bottom: 4px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .edit-form input[type="text"],
  .edit-form input[type="number"],
  .edit-form input[type="date"] {
    width: 100%;
    padding: 8px;
    border: 2px solid white;
    border-radius: 30px;
    background-color: transparent;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: all .55s ease;
  }

  .edit-form input[type="text"]:hover,
  .edit-form input[type="number"]:hover,
  .edit-form input[type="date"]:hover{
  border: 2px solid #f38b65;
  transform: translateY(-4px);
  }

  .edit-form button {
    background: #f38b65; 
    line-height: 1.4;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    border-radius: 30px;
    text-transform: uppercase;
    transition: all .55s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    margin-top: 16px;
  }
  .edit-form button:hover {
     border: 2px solid #f38b65;
  transform: translateY(2px);
  }
</style>
                </head>
                <body>
                    <h2>${cv.name}</h2>
                    <button class="delete-cv-btn" data-cv-id="${cv.cvId}">Delete CV</button>
                    <button class="edit-cv-btn" data-cv-id="${cv.cvId}">Edit CV</button>
                    <div class="edit-cv-form" style="display: none;">
                        <h3>Edit CV</h3>
                        <form class="edit-form">
                            <label for="fullname">Full Name</label>
                            <input type="text" name="edit-cv-name" value="${cv.name}" required>
                            <label for="email">Email</label>
                            <input type="text" name="edit-fullname" value="${cv.fullName || ''}" >
                            <label for="gender">Gender</label>
                            <input type="text" name="edit-email" value="${cv.email || ''}">
                            <label for="age">Age</label>
                            <input type="text" name="edit-gender" value="${cv.gender || ''}">
                            <label for="phone">Phone</label>
                            <input type="number" name="edit-age" value="${cv.age || ''}">
                            <label for="address">Address</label>
                            <input type="text" name="edit-phone" value="${cv.phone || ''}">
                            <label for="job-title">Job Title</label>
                            <input type="text" name="edit-job-title" value="${cv.jobtitle || ''}">
                            <label for="company">Company</label>
                            <input type="text" name="edit-company" value="${cv.company || ''}">
                            <label for="start-date">Start Date</label>
                            <input type="date" name="edit-start-date" value="${cv.startDate ? cv.startDate.split('T')[0] : ''}">
                            <label for="end-date">End Date</label>
                            <input type="date" name="edit-end-date" value="${cv.endDate ? cv.endDate.split('T')[0] : ''}">
                            <label for="degree">Degree</label>
                            <input type="text" name="edit-degree" value="${cv.degree || ''}">
                            <label for="university">University</label>
                            <input type="text" name="edit-university" value="${cv.university || ''}">
                            <label for="graduation-year">Graduation Year</label>
                            <input type="number" name="edit-graduation-year" value="${cv.graduationYear || ''}">

                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                    </body>
                    </html>
                `;

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
