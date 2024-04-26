<template>
    <div class="login-page">
        <div class="forma">
            <h2>DOBRODOŠLI</h2>
            <div>
                <input type="text" v-model="firstName" placeholder="Ime" />
            </div>

            <div>
                <input type="text" placeholder="Prezime" v-model="lastName" />
            </div>

            <div>
                <input type="email" placeholder="E-mail" v-model="email" />
            </div>

            <div class="password-container">
                <input
                    :type="passwordVisible ? 'password' : 'text'"
                    placeholder="Lozinka*"
                    name="password"
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

            <button @click="register" class="btn" type="submit">
                Registrujte se
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const passwordVisible = ref(false);

const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");

async function register() {
    let res = await axios.post(
        "http://hakaton-api.test/api/v1/auth/register",
        {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            password: password.value,
        }
    );

    console.log("res", res);
}
</script>

<style scoped>
body {
    height: 100%;
    background: linear-gradient(#afd198, #fff2e1);
}

.login-page {
    padding: 8%;
}
.forma {
    margin-top: 200px;
    z-index: 1;
    text-align: center;
    position: fixed;
    position: relative;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(127, 127, 127, 0.399);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 7px;
}

.forma input {
    width: 100%;
    padding: 10px 0;
    font-size: 13px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}
.forma input::placeholder {
    color: #ffffff;
}

label {
    color: #ffffff;
    display: inline-block;
}

.password-container {
    position: relative;
    display: flex;
    align-items: center;
}

.toggle-password {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-top: -15px;
}

#eye-icon {
    color: #ffffff;
    font-size: 13px;
}

h2 {
    color: #ffffff;
    font-weight: 400;
    margin-bottom: 35px;
}

button {
    background-color: #d1bb9e;
    border: 0;
}
.btn {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    text-decoration: none;
    overflow: hidden;
    margin-top: 15px;
    letter-spacing: 2px;
}

.btn:hover {
    transition: 0.5s;
    color: antiquewhite;
}

.btn span {
    position: absolute;
    display: block;
}

@media only screen and (max-width: 450px) {
    .forma {
        z-index: 1;
        text-align: center;
        position: fixed;
        position: relative;
        left: 50%;
        width: 300px;
        padding: 40px;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
        border-radius: 10px;
    }
}
</style>
