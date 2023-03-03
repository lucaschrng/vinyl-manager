<script>
    import {router} from '@inertiajs/svelte'
    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            router.get('/');
        } catch (e) {
            console.log(e);
        }
    }
</script>

<h1>My Records</h1>
<button on:click={handleLogout}>Logout</button>
