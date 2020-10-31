<script>
    import {tokenInfo} from "../tokenStorage";
    import { goto } from "@sapper/app";
    import { emailValidator, requiredValidator } from '../validation/validators';
    import { createFieldValidator } from '../validation/validation';

    const [ validity, validate ] = createFieldValidator(requiredValidator(), emailValidator())

    let username;
    let password;
    let repeatpassword;
    let email;
    let error;


    const userRegister = (e) => {
        if (repeatpassword === password){
            e.preventDefault();
            tryRegister();

        }else {
            error = " password does not match with repeat password "
        }
    }

    const tryRegister = async () =>{
        const response = await fetch('https://localhost:3000/user/sign-up' , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',

            },body: JSON.stringify({password: password,username: username,email:email
                }),

        });
        // if (response.status >=200 && response.status <300){
            const {token} = await response.json();
            console.log(token)
            $tokenInfo = token;
            goto ("/");
        // }else {
        //     const {message} = await response.json();
        //     error = message;
        //
        // }


    }

</script>

    <style>
        .register_form{
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

        :global(body) {
        display: flex;
        flex-direction: column;
    }

    input {
        margin-bottom: 10px;
        height: 35px;
        border-width: 2px;
        border-radius: 10px;
        outline: none;
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

    .field-danger {
        border-color: red;
    }

    .field-success {
        border-color: green;
        }
        .validation-hint {
            color: red;
            padding: 6px 0;
        }
    </style>


<form class="register_form">
    <h1 class="auction_title">Register</h1>
    <input id="userName" type="text" placeholder="Username" name="username"
           bind:value = {username}
           />
    <input id="email" type="text" placeholder="Email" name="email"
           bind:value={email}
           class:field-danger={!$validity.valid}
           class:field-success={$validity.valid}
           use:validate={email}/>

    <input id="pass1" type="password" placeholder="Password" name="password" bind:value={password}/>
    <input id="pass2" type="password" placeholder="Password repeat" name="password_repeat" bind:value={repeatpassword}/>
    <input type="submit" value="Register"  disabled="{!$validity.valid}"
           on:click = {userRegister}/>

        </form>
<!--{#if $validity.dirty && !$validity.valid}-->
<!--        <span class="validation-hint" >-->
<!--            INVALID - {$validity.message} {$validity.dirty}-->
<!--        </span>-->
<!--    {/if}-->

{#if error}
    <span class="error">{error}</span>
{/if}