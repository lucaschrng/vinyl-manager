<script>
    import {isLogin} from "../../store.js";
    import {login, register} from "$lib/pocketbase.js";
    import {redirect} from "@sveltejs/kit";
    import {goto} from "$app/navigation";

    const switchForm = () => {
        isLogin.update(value => !value);
    };

    let errors = {}

    let name = '';
    let username = '';
    let email = '';
    let password = '';
    let passwordConfirm = '';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            name,
            username,
            email,
            password,
            passwordConfirm,
        };

        try {
            const userData = await register(user);
            await login(email, password);
            await goto('/my-library');
        } catch (e) {
            errors = e.data.data;
        }
    };
</script>

<h2 class="text-3xl font-semibold ml-2 mb-6">Register</h2>

<form on:submit={handleSubmit} class="auth-form flex flex-col gap-2">

    <input type="text" id="name" bind:value={name} placeholder="Name" required>
    {#if errors.name}
        <div class="ml-2 text-sm text-red-500">{errors.name.message}</div>
    {/if}

    <input type="text" id="username" bind:value={username} placeholder="Username" required>
    {#if errors.username}
        <div class="ml-2 text-sm text-red-500">{errors.username.message}</div>
    {/if}

    <input type="email" id="email" bind:value={email} placeholder="Email" required>
    {#if errors.email}
        <div class="ml-2 text-sm text-red-500">{errors.email.message}</div>
    {/if}

    <input type="password" id="password" bind:value={password} placeholder="Password" required>
    {#if errors.password}
        <div class="ml-2 text-sm text-red-500">{errors.password.message}</div>
    {/if}

    <input type="password" id="password-confirmation" bind:value={passwordConfirm} placeholder="Confirm password"
           required>
    {#if errors.passwordConfirm}
        <div class="ml-2 text-sm text-red-500">{errors.passwordConfirm.message}</div>
    {/if}

    <button type="submit">Register</button>
</form>

<p class="text-sm text-black/50 font-medium">Already have an account?
    <button on:click={switchForm} class="font-semibold hover:underline">Login</button>
</p>
