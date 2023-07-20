document.addEventListener('DOMContentLoaded', () => {
    const createCvButton = document.querySelector('.create-cv');
    const cvModalContainer = document.getElementById('cv-modal-container');
    const closeCvModal = document.getElementById('close-cv-modal');
    const blurOverlay = document.querySelector('.blur-overlay');

    createCvButton.addEventListener('click', toggleModalCV);
    closeCvModal.addEventListener('click', closeModalCV);
    blurOverlay.addEventListener('click', closeModalCV);

    function toggleModalCV(event) {
        event.stopPropagation();
        cvModalContainer.style.display = 'block';
        setTimeout(() => {
            document.body.classList.toggle('open-cv-modal');
        }, 100);
    }

    function closeModalCV(event) {
        event.stopPropagation();
        cvModalContainer.style.display = 'none';
        document.body.classList.remove('open-cv-modal');
    }
});

//// Add this inside the window.onload event
//const editCvModalContainer = document.getElementById('edit-cv-modal-container');
//const editCvForm = document.getElementById('edit-cv-form');

//editCvForm.addEventListener('submit', async (e) => {
//    e.preventDefault();

//    // Get the values from the edit modal form
//            cvForm.querySelector('input[name="cvname"]').value = cvData.Name;
//            cvForm.querySelector('input[name="fullname"]').value = cvData.FullName;
//            cvForm.querySelector('input[name="email"]').value = cvData.Email;
//            cvForm.querySelector('input[name="gender"]').value = cvData.Gender;
///*            cvForm.querySelector('input[name="age"]').value = cvData.Age;*/
//            cvForm.querySelector('input[name="phone"]').value = cvData.Phone;
//            cvForm.querySelector('input[name="address"]').value = cvData.Address;
//            cvForm.querySelector('input[name="job-title"]').value = cvData.JobTitle;
//            cvForm.querySelector('input[name="company"]').value = cvData.Company;
//            //cvForm.querySelector('input[name="start-date"]').value = cvData.StartDate;
//            //cvForm.querySelector('input[name="end-date"]').value = cvData.EndDate;
//            cvForm.querySelector('input[name="degree"]').value = cvData.Degree;
//            cvForm.querySelector('input[name="university"]').value = cvData.University;
///*            cvForm.querySelector('input[name="graduation-year"]').value = cvData.GraduationYear;*/
//            cvForm.querySelector('textarea[name="skills"]').value = cvData.Skills;
//    // ... (get other input values)

//    try {
//        const response = await fetch(`/api/cvs/${cvId}`, {
//            method: 'PUT', // Assuming your API uses PUT for updating CVs
//            headers: {
//                'Content-Type': 'application/json',
//                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
//            },
//            body: JSON.stringify({
//                Name: cvName,
//                FullName: fullName,
//                Email: email,
//                Gender: gender,
//                /*                Age: parseInt(age),*/
//                Phone: phone,
//                Jobtitle: jobTitle,
//                Company: company,
//                //StartDate: startDate,
//                //EndDate: endDate,
//                Degree: degree,
//                University: university,
//                /*                GraduationYear: parseInt(graduationYear),*/
//                Skills: skills
//            }),
//        });

//        if (response.ok) {
//            console.log('Successfully updated CV');
//            // Hide the edit modal and reload the CV list
//            editCvModalContainer.style.display = 'none';
//            window.location.reload();
//        } else {
//            console.error('Failed to update CV:', response.status);
//        }
//    } catch (error) {
//        console.error('Error updating CV:', error);
//    }
//});

//const closeEditCvModal = document.getElementById('close-edit-cv-modal');
//closeEditCvModal.addEventListener('click', () => {
//    // Hide the edit modal if the close button is clicked
//    editCvModalContainer.style.display = 'none';
//});