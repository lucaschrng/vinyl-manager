<script>
  import {fade} from "svelte/transition";
  import {isLogin} from "../store.js";
  import LoginForm from "../components/Auth/LoginForm.svelte";
  import RegisterForm from "../components/Auth/RegisterForm.svelte";

  isLogin.set(true);
</script>

<div class="h-screen flex justify-center items-center" in:fade={{delay: 200, duration: 200}} out:fade={{duration: 200}}>
  <div class="max-w-sm w-full p-4 pt-12 bg-white/50 border border-black/5 drop-shadow-sm rounded-md">
    {#if $isLogin}
      <LoginForm/>
    {:else}
      <RegisterForm/>
    {/if}
  </div>
</div>
