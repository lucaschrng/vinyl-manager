<script>
    import {router} from "@inertiajs/svelte";
    import {isLogin} from "@/store.js";

    const switchForm = () => {
        isLogin.update(value => !value);
    };

    let errors = {}

    let email = '';
    let password = '';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const body = {
            email,
            password,
        };

        try {
            await axios.post('/login', body);
            router.get('/my-records')
        } catch (e) {
            errors = (e.response.data.errors);
        }
    };
</script>

<h2 class="text-3xl font-semibold ml-2 mb-6">Login</h2>

<form on:submit={handleSubmit} class="auth-form flex flex-col gap-2">

    <input type="email" id="email" bind:value={email} placeholder="Email" required>
    {#if errors.email}
        <p>{errors.email}</p>
    {/if}

    <input type="password" id="password" bind:value={password} placeholder="Password" required>
    {#if errors.password}
        <p>{errors.password}</p>
    {/if}

    <button type="submit">Login</button>

</form>

<p class="text-sm text-black/50 font-medium">Don't have an account?
    <button on:click={switchForm} class="font-semibold hover:underline">Register</button>
</p>
