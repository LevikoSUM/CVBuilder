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
//    const cvId = editCvForm.querySelector('input[name="cvId"]').value;
//    const cvName = editCvForm.querySelector('input[name="cvname"]').value;
//    const fullName = editCvForm.querySelector('input[name="fullname"]').value;
//    const email = editCvForm.querySelector('input[name="email"]').value;
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
//                // ... (add other fields)
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