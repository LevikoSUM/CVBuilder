const loginForm = document.querySelector('.modal1 .lrform.login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            sessionStorage.setItem('token', token);

            // Perform any additional actions after successful login
        } else {
            console.error('Failed to login:', response.status);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
});

const registerForm = document.querySelector('.modal2 .lrform.register-form');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[placeholder="Username"]').value;
    const email = registerForm.querySelector('input[placeholder="Email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    const confirmPassword = registerForm.querySelector('input[placeholder="Confirm Password"]').value;

    try {
        if (password !== confirmPassword) {
            console.error('Password mismatch');
            return;
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            sessionStorage.setItem('token', token);

            // Perform any additional actions after successful registration
        } else {
            console.error('Failed to register:', response.status);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
});
