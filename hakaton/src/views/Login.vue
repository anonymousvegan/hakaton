<template>
    <div class="login-page">
        <div class="forma">
            <form
                action=""
                class="register-form"
                method="POST"
                enctype="multipart/form-data"
            >
                <h2>DOBRODOŠLI</h2>
                <div>
                    <input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value=""
                    />
                </div>

                <div class="password-container">
                    <input
                        :type="passwordVisible ? 'password' : 'text'"
                        placeholder="Lozinka"
                        name="password"
                        autocomplete="on"
                        class="password-input"
                        id="password-input"
                    />
                    <span
                        class="toggle-password"
                        @click="passwordVisible = !passwordVisible"
                    >
                        <i class="fas fa-eye-slash" id="eye-icon"></i>
                    </span>
                </div>

                <button class="btn" type="submit">Prijavite se</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

const passwordVisible = ref(false);
</script>
