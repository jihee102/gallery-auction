<script>
  import { tokenInfo } from '../auctionStorage';
  import { goto } from '@sapper/app';

  let username;
  let password;
  let repeatpassword;
  let email;
  let error;
  let emailValidation;
  let passwordValidation;

  const userRegister = async (e) => {
    if (repeatpassword === password && emailValidation && passwordValidation) {
      e.preventDefault();
      const response = await fetch(
        'https://gallery-auction.herokuapp.com/user/sign-up',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            username: username,
            email: email,
          }),
        }
      );

      if (response.status >= 200 && response.status < 300) {
        goto('/');
      } else {
        const message = await response.json();
        error = message.message;
      }
    } else {
      error = ' password does not match with repeat password ';
    }
  };

  const tryRegister = async () => {};

  // email regex
  const checkEmailValidation = () => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
      emailValidation = true;
    } else {
      emailValidation = false;
    }
  };

  // Password should be more than 8 letters & less than 15 letters
  // Password should include at least one number and one special character.
  const checkPasswordValidation = () => {
    var decimal = /^(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(decimal)) {
      passwordValidation = true;
    } else {
      passwordValidation = false;
    }
  };
</script>

<form class="register_form">
  <h1 class="auction_title">Register</h1>
  <input
    type="text"
    placeholder="Username"
    class={username !== undefined && username.length > 3
      ? 'field-success'
      : 'field-danger'}
    bind:value={username}
  />
  <input
    id="email"
    type="text"
    placeholder="Email"
    name="email"
    on:input={checkEmailValidation}
    bind:value={email}
    class={emailValidation ? 'field-success' : 'field-danger'}
  />

  <input
    type="password"
    placeholder="Password"
    bind:value={password}
    on:input={checkPasswordValidation}
    class={passwordValidation ? 'field-success' : 'field-danger'}
  />
  <input
    type="password"
    placeholder="Password repeat"
    name="password_repeat"
    bind:value={repeatpassword}
    class={password === repeatpassword ? 'field-success' : 'field-danger'}
  />
  <input type="submit" on:click={userRegister} />
</form>

{#if error}
  <span class="error">{error}</span>
{/if}

<style>
  .register_form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 300px;
  }
  h1 {
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

  input:focus {
    outline: none;
  }

  input[type='submit'] {
    margin-top: 30px;
    background-color: #010a5e;
    color: white;
    font-size: 15px;
    height: 40px;
    transition: all 0.2s linear;
    cursor: pointer;
  }

  input[type='submit']:hover {
    background-color: #f3e7e5;
    color: #010a5e;
    font-weight: bold;
    border: solid 3px #f3e7e5;
  }

  .error {
    display: block;
    text-align: center;
    color: red;
  }

  .field-danger {
    border-color: red;
  }

  .field-success {
    border-color: green;
  }
</style>
