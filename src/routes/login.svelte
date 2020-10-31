<script>
    import {tokenInfo} from "../tokenStorage.js";
    import { goto } from "@sapper/app";

    let username;
    let password;
    let error;

    const login = (e)=>{
        e.preventDefault();
        if(username !== undefined && password!==undefined){
            tyrLogin();
        }else{
            error= "Please fill both name and password fields!"
        }

    }

    const tyrLogin = async () => {
        const response = await fetch('http://localhost:3000/user/log-in', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username,
                password: password}),
        });
        if (response.status >= 200 && response.status <300) {
            const {token}= await response.json();
            console.log(token)
            $tokenInfo = token;
            goto("/");

        }else{
            const {message} = await response.json();
            error = message;
        }


    }

</script>

<style>
.login_form{
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 300px;
}

h1{
    margin-bottom: 50px;
    font-weight: bold;
    color: #010a5e;
    font-size: 40px;
    text-align: center;
}

input {
    margin-bottom: 10px;
    height: 35px;
    border: 1px #333333 solid;
    border-radius: 10px;
}
    input:focus{
        outline: none;
    }

    label{
        color: #555555;
    }

    input[type="submit"]{
        margin-top: 30px;
        background-color: #010a5e;
        color: white;
        font-size: 15px;
        height: 40px;
        transition: all 0.2s linear;
        cursor:pointer;
    }

input[type="submit"]:hover {
    background-color: #f3e7e5;
    color: #010a5e;
    font-weight: bold;
    border: solid 3px #f3e7e5;
}

    a{
        text-align: center;
        margin-top: 40px;
        text-decoration: none;
    }

    .error{
        display: block;
        text-align: center;
        color: red;
    }

    .bad{
        border: red 1px solid;
    }
</style>

<form class="login_form">
    <h1 class="auction_title">Login</h1>
    <label for="name">Name</label>
    <input id="name" type="text" placeholder="Username" bind:value = {username} class={username !== undefined && username.length < 3? "bad": ""}/>
    <label for="password">Password</label>
    <input id="password" type="password" placeholder="Password" bind:value = {password} class={password !== undefined && password.length < 3? "bad": ""}/>
    <input type="submit" value="Login" on:click = {login}/>
    <a href="register">Register</a>
</form>

{#if error}
<span class="error">{error}</span>
{/if}