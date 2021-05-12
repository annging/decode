<template>
    <div class="login-container">
        <form class="login-form">
            <h2>Hi👋，这里是Decode的后台管理系统</h2>
            <div class="form-item">
                <label for="username">用户名 </label>
                <input type="text" name="username" v-model="loginform.username" required>
            </div>
            <div class="form-item">
                <label for="password">密码</label>
                <input type="password" name="password" v-model="loginform.password" required>
            </div>
            <div class="form-item">
                <input type="button" value="登  录" @click="submit">
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    data() {
        return {
            loginform: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        submit() {
            let loginform = this.loginform;
            axios({
                method: 'post',
                url: 'http://localhost:3000/log/in',
                data: loginform,
                headers: {
                'Content-Type': 'application/json'
                },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>
    .login-container {
      max-width: 730px;
      margin: 0 auto; 
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h2 {
        text-align: center;
    }
    .login-form {
        width: 100%;
        max-width: 420px;
        margin: 30px auto;
        padding-bottom: 80px;
    }
    .form-item {
        margin-bottom: 10px;
    }
    label {
        display: block;
        font-size: 12px;
        color: #808080;
    }
    input {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        border-width: 1px;
        padding: 0 10px;
        box-sizing: border-box;
    }
    input[type='button'] {
        width: 100%;
        min-height: 36px;
        font-size: 16px;
        margin-top: 20px;
    }
</style>
