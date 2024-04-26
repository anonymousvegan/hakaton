<template>
    <div class="login-page">
        <div class="forma">
            <form action="" class="register-form" method="POST" enctype="multipart/form-data">
                <h2>DOBRODOŠLI</h2>
                <div>
                    <input 
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value=""
                    >
                </div>

                <div class="password-container">
                    <input 
                        type="password"
                        placeholder="Lozinka"
                        name="password"
                        autocomplete="on"
                        class="password-input"
                        id="password-input"
                    >
                    <span class="toggle-password" onclick="togglePasswordVisibility()">
                        <i class="fas fa-eye-slash" id="eye-icon"></i>
                    </span>
                </div>

                <button class="btn" type="submit">Prijavite se</button>       
            </form>
        </div>
    </div>
</template>
<script setup>
        function togglePasswordVisibility() {
            var passwordInput = document.getElementById('password-input');
            var eyeIcon = document.getElementById('eye-icon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            }
        }
</script>