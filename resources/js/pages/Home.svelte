<script>
    import {isLogin} from "@/store.js";
    import LoginForm from "@/components/Auth/LoginForm.svelte";
    import RegisterForm from "@/components/Auth/RegisterForm.svelte";

    isLogin.set(true);

    let showLoginForm;

    isLogin.subscribe(value => {
        showLoginForm = value;
    });
</script>

<div class="h-screen flex justify-center items-center">
    <div class="max-w-sm w-full p-4 pt-12 bg-white/50 border border-black/5 drop-shadow-sm rounded-md">
        <!-- Login form -->
        {#if showLoginForm}
            <LoginForm/>
        {:else}
            <RegisterForm/>
        {/if}
    </div>
</div>
