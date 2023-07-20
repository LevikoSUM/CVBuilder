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
/*    const age = cvForm.querySelector('input[name="age"]').value;*/
    const phone = cvForm.querySelector('input[name="phone"]').value;
    const address = cvForm.querySelector('input[name="address"]').value;
    const jobTitle = cvForm.querySelector('input[name="job-title"]').value;
    const company = cvForm.querySelector('input[name="company"]').value;
    //const startDate = cvForm.querySelector('input[name="start-date"]').value;
    //const endDate = cvForm.querySelector('input[name="end-date"]').value;
    const degree = cvForm.querySelector('input[name="degree"]').value;
    const university = cvForm.querySelector('input[name="university"]').value;
/*    const graduationYear = cvForm.querySelector('input[name="graduation-year"]').value;*/
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
/*                Age: parseInt(age),*/
                Phone: phone,
                Jobtitle: jobTitle,
                Company: company,
                //StartDate: startDate,
                //EndDate: endDate,
                Degree: degree,
                University: university,
/*                GraduationYear: parseInt(graduationYear),*/
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
                <button class="edit-cv-btn" data-cv-id="${cv.cvId}">Edit CV</button>
                <button class="delete-cv-btn" data-cv-id="${cv.cvId}">Delete CV</button>
            `;

                const editButtons = document.querySelectorAll('.edit-cv-btn');
                editButtons.forEach(editButton => {
                    editButton.addEventListener('click', () => {
                        const cvId = editButton.getAttribute('data-cv-id');
                        openEditModal(cvId);
                    });
                });

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
function openEditModal(cvId) {
    const cvModalContainer = document.getElementById('cv-modal-container');
    const cvForm = document.getElementById('cv-form');

    // Fetch the CV data for the specified ID
    fetch(`/api/cvs/${cvId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch CV data');
            }
        })
        .then(cvData => {
            // Fill the form fields with the retrieved CV data
            cvForm.querySelector('input[name="cvname"]').value = cvData.Name;
            cvForm.querySelector('input[name="fullname"]').value = cvData.FullName;
            cvForm.querySelector('input[name="email"]').value = cvData.Email;
            cvForm.querySelector('input[name="gender"]').value = cvData.Gender;
            cvForm.querySelector('input[name="age"]').value = cvData.Age;
            cvForm.querySelector('input[name="phone"]').value = cvData.Phone;
            cvForm.querySelector('input[name="address"]').value = cvData.Address;
            cvForm.querySelector('input[name="job-title"]').value = cvData.JobTitle;
            cvForm.querySelector('input[name="company"]').value = cvData.Company;
            cvForm.querySelector('input[name="start-date"]').value = cvData.StartDate;
            cvForm.querySelector('input[name="end-date"]').value = cvData.EndDate;
            cvForm.querySelector('input[name="degree"]').value = cvData.Degree;
            cvForm.querySelector('input[name="university"]').value = cvData.University;
            cvForm.querySelector('input[name="graduation-year"]').value = cvData.GraduationYear;
            cvForm.querySelector('textarea[name="skills"]').value = cvData.Skills;

            // Show the modal
            cvModalContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching CV data:', error);
        });
}

// Add an event listener to the close button of the modal
const closeCvModal = document.getElementById('close-cv-modal');
closeCvModal.addEventListener('click', () => {
    const cvModalContainer = document.getElementById('cv-modal-container');
    cvModalContainer.style.display = 'none';
});

// Add an event listener to the Save button inside the modal
const saveCvBtn = document.getElementById('save-cv-btn');
saveCvBtn.addEventListener('click', async () => {
    const cvModalContainer = document.getElementById('cv-modal-container');
    const cvForm = document.getElementById('cv-form');

    // Retrieve the data from the form
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
        const response = await fetch(`/api/cvs/${cvId}`, {
            method: 'PUT',
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
                Address: address,
                JobTitle: jobTitle,
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
            console.log('Successfully updated CV');
            cvModalContainer.style.display = 'none'; // Close the modal after successful update
            // Optionally, you can reload the CV list to reflect the changes
            // window.location.reload();
        } else {
            console.error('Failed to update CV:', response.status);
        }
    } catch (error) {
        console.error('Error updating CV:', error);
    }
});

////Edit

//function fillEditModal(cvData) {
//    const cvNameInput = document.getElementById('edit-cvname');
//    const fullNameInput = document.getElementById('edit-fullname');
//    const emailInput = document.getElementById('edit-email');

//    cvNameInput.value = cvData.Name;
//    fullNameInput.value = cvData.FullName;
//    emailInput.value = cvData.Email;

//    // Rest of the code to fill other input fields in the modal
//    const genderInput = document.getElementById('edit-gender');
///*    const ageInput = document.getElementById('edit-age');*/
//    const phoneInput = document.getElementById('edit-phone');
//    const addressInput = document.getElementById('edit-address');
//    const jobTitleInput = document.getElementById('edit-job-title');
//    const companyInput = document.getElementById('edit-company');
//    //const startDateInput = document.getElementById('edit-start-date');
//    //const endDateInput = document.getElementById('edit-end-date');
//    const degreeInput = document.getElementById('edit-degree');
//    const universityInput = document.getElementById('edit-university');
///*    const graduationYearInput = document.getElementById('edit-graduation-year');*/
//    const skillsInput = document.getElementById('edit-skills');

//    genderInput.value = cvData.Gender;
///*    ageInput.value = cvData.Age;*/
//    phoneInput.value = cvData.Phone;
//    addressInput.value = cvData.Address;
//    jobTitleInput.value = cvData.JobTitle;
//    companyInput.value = cvData.Company;
//    //startDateInput.value = cvData.StartDate;
//    //endDateInput.value = cvData.EndDate;
//    degreeInput.value = cvData.Degree;
//    universityInput.value = cvData.University;
///*    graduationYearInput.value = cvData.GraduationYear;*/
//    skillsInput.value = cvData.Skills;
//}
//async function openEditModal(cvId) {
//    try {
//        const response = await fetch(`/api/cvs/${cvId}`, {
//            method: 'GET',
//            headers: {
//                'Content-Type': 'application/json',
//                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
//            },
//        });

//        if (response.ok) {
//            const cvData = await response.json();
//            fillEditModal(cvData);
//            const editModalContainer = document.getElementById('edit-cv-modal-container');
//            editModalContainer.style.display = 'block';
//        } else {
//            console.error('Failed to fetch CV data for editing:', response.status);
//        }
//    } catch (error) {
//        console.error('Error opening Edit CV modal:', error);
//    }
//}

//const closeEditModalBtn = document.getElementById('close-edit-cv-modal');
//closeEditModalBtn.addEventListener('click', () => {
//    const editModalContainer = document.getElementById('edit-cv-modal-container');
//    editModalContainer.style.display = 'none';
//});

//const saveEditCvBtn = document.getElementById('save-edit-cv-btn');
//saveEditCvBtn.addEventListener('click', async (e) => {
//    e.preventDefault();

//    const cvIdInput = document.getElementById('edit-cv-id');
//    const cvId = cvIdInput.value;

//    const cvNameInput = document.getElementById('edit-cvname');
//    const fullNameInput = document.getElementById('edit-fullname');
//    const emailInput = document.getElementById('edit-email');

//    const genderInput = document.getElementById('end-gender');
// /*   const ageInput = document.getElementById('end-age');*/
//    const phoneInput = document.getElementById('end-phone');
//    const addressInput = document.getElementById('end-address');
//    const jobTitleInput = document.getElementById('end-job-title');
//    const companyInput = document.getElementById('end-company');
//    //const startDateInput = document.getElementById('end-start-date');
//    //const endDateInput = document.getElementById('end-date');
//    const degreeInput = document.getElementById('end-degree');
//    const universityInput = document.getElementById('end-university');
///*    const graduationYearInput = document.getElementById('end-graduation-year');*/
//    const skillsInput = document.getElementById('end-skills');

//    const editedCV = {
//        Name: cvNameInput.value,
//        FullName: fullNameInput.value,
//        Email: emailInput.value,
//        Gender: genderInput.value,
///*        Age: parseInt(ageInput.value),*/
//        Phone: phoneInput.value,
//        Address: addressInput.value,
//        JobTitle: jobTitleInput.value,
//        Company: companyInput.value,
//        //StartDate: startDateInput.value,
//        //EndDate: endDateInput.value,
//        Degree: degreeInput.value,
//        University: universityInput.value,
///*        GraduationYear: parseInt(graduationYearInput.value),*/
//        Skills: skillsInput.value
//    };

//    try {
//        const response = await fetch(`/api/cvs/${cvId}`, {
//            method: 'PUT',
//            headers: {
//                'Content-Type': 'application/json',
//                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
//            },
//            body: JSON.stringify(editedCV),
//        });

//        if (response.ok) {
//            console.log('Successfully updated CV');
//            window.location.reload();
//        } else {
//            console.error('Failed to update CV:', response.status);
//        }
//    } catch (error) {
//        console.error('Error updating CV:', error);
//    }
//});

//Delete
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
