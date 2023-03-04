<script>
    import {router} from '@inertiajs/svelte'

    export let records = [];
    console.log(records)
    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            router.get('/');
        } catch (e) {
            console.log(e);
        }
    }
</script>

<div class="w-fit m-auto mt-32">
    <div
        class="relative mb-8 pb-4 flex justify-between items-center after:content-[''] after:absolute after:bottom-0 after:w-full after:h-[1.5px] after:bg-black">
        <h1 class="text-2xl font-semibold">My Records</h1>
        <ul class="flex gap-4">
            <li class="flex items-center">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                    </svg>
                </button>
            </li>
            <li class="flex items-center">
                <button on:click={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                    </svg>
                </button>
            </li>
        </ul>
    </div>

    <div class="w-fit grid grid-cols-5 gap-6">
        {#each [...records, ...records] as record}
            <div>
                <img src="{record.cover_url}" alt="album cover" height="160" width="160" class="shadow-xl mb-2">
                <h2 class="font-semibold truncate max-w-[160px]">{record.title}</h2>
                <p class="leading-4">{record.artist}</p>
            </div>
        {/each}
    </div>
</div>
