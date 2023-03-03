<script>
    import {router} from "@inertiajs/svelte";
    import {isLogin} from "@/store.js";

    const switchForm = () => {
        isLogin.update(value => !value);
    };

    let errors = {}

    let name = '';
    let email = '';
    let password = '';
    let password_confirmation = '';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const body = {
            name,
            email,
            password,
            password_confirmation,
        };

        try {
            await axios.post('/register', body);
            router.get('/my-records')
        } catch (e) {
            errors = (e.response.data.errors);
        }
    };
</script>

<h2 class="text-3xl font-semibold ml-2 mb-6">Register</h2>

<form on:submit={handleSubmit} class="auth-form flex flex-col gap-2">

    <input type="text" id="name" bind:value={name} placeholder="Name" required>
    {#if errors.name}
        <div class="ml-2 text-sm text-red-500">{errors.name}</div>
    {/if}

    <input type="email" id="email" bind:value={email} placeholder="Email" required>
    {#if errors.email}
        <div class="ml-2 text-sm text-red-500">{errors.email}</div>
    {/if}

    <input type="password" id="password" bind:value={password} placeholder="Password" required>
    {#if errors.password}
        <div class="ml-2 text-sm text-red-500">{errors.password}</div>
    {/if}

    <input type="password" id="password-confirmation" bind:value={password_confirmation} placeholder="Confirm password"
           required>

    <button type="submit">Register</button>
</form>

<p class="text-sm text-black/50 font-medium">Already have an account?
    <button on:click={switchForm} class="font-semibold hover:underline">Login</button>
</p>
