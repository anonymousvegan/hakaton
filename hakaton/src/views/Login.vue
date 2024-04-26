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
                        v-model = "email"
                    />
                </div>

                <div class="password-container">
                    <input
                        :type="passwordVisible ? 'password' : 'text'"
                        placeholder="Lozinka"
                        autocomplete="on"
                        class="password-input"
                        id="password-input"
                        v-model="password"
                    />
                    <span
                        class="toggle-password"
                        @click="passwordVisible = !passwordVisible"
                    >
                        <i class="fas fa-eye-slash" id="eye-icon"></i>
                    </span>
                </div>

                <button class="btn" @click="login" type="submit">Prijavite se</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";

async function login() {
    let res = await axios.post("http://hakaton-api.test/api/v1/auth/login", {
        email,
        password,
    });
    console.log(res);
}

const passwordVisible = ref(false);
</script>
