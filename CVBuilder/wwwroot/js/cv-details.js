// cv-details.js
window.addEventListener('DOMContentLoaded', async () => {
    const cvDetailsDiv = document.getElementById('cv-details');
    const cvId = new URLSearchParams(window.location.search).get('cvId');

    if (cvId) {
        try {
            const response = await fetch(`/api/cvs/${cvId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
            });

            if (response.ok) {
                const cvData = await response.json();

                const cvDetailsHtml = `
                    <h2>${cvData.name}</h2>
                    <p>Full Name: ${cvData.fullName}</p>
                    <p>Email: ${cvData.email}</p>
                    <p>Gender: ${cvData.gender}</p>
                    <p>Age: ${cvData.age}</p>
                    <p>Phone: ${cvData.phone}</p>
                    <p>Job Title: ${cvData.jobtitle}</p>
                    <p>Company: ${cvData.company}</p>
                    <p>Start Date: ${cvData.startDate}</p>
                    <p>End Date: ${cvData.endDate}</p>
                    <p>Degree: ${cvData.degree}</p>
                    <p>University: ${cvData.university}</p>
                    <p>Graduation Year: ${cvData.graduationYear}</p>
                `;

                cvDetailsDiv.innerHTML = cvDetailsHtml;
            } else {
                console.error('Failed to fetch CV details:', response.status);
            }
        } catch (error) {
            console.error('Error fetching CV details:', error);
        }
    }
});