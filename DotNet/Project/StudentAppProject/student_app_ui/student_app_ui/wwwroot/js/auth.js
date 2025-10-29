$(function () {
    $('#loginForm').on('submit', async function (e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        try {
            const res = await fetch('https://localhost:7030/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) {
                const txt = await res.text();
                showAlert('#loginAlert', 'Invalid credentials', 'danger');
                return;
            }

            const data = await res.json();
            // Expecting { token: "..."} or { Token: "..."} depending on API
            const token = data.token || data.Token || data?.tokenString || data?.TokenString;

            if (!token) {
                // some implementations return Token property
                const fallback = data.Token || data.token;
                if (!fallback) {
                    showAlert('#loginAlert', 'Login succeeded but token missing', 'warning');
                    return;
                }
            }

            // store token in localStorage
            localStorage.setItem('jwtToken', token);
            // redirect to students list
            window.location = '/Students/Index';
        } catch (err) {
            console.error(err);
            showAlert('#loginAlert', 'Server error during login', 'danger');
        }
    });

    function showAlert(selector, message, type) {
        const el = $(selector);
        el.removeClass('d-none alert-danger alert-success alert-warning').addClass(`alert-${type}`);
        el.text(message).removeClass('d-none');
    }
});
