<script>
    import {router} from '@inertiajs/svelte';
    import {onMount} from "svelte";
    import {fade} from 'svelte/transition';
    import {tweened} from 'svelte/motion';
    import {cubicOut} from "svelte/easing";

    export let records = [];

    let selectedRecord = records[0];
    let selectedRecordCover;

    let bgPosX = 0;
    let bgPosY = 0;

    let cellSize = tweened(0, {
        duration: 500,
        easing: cubicOut
    });

    $: cellSize.set(selectedRecord ? 40 : 0);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            router.get('/');
        } catch (e) {
            console.log(e);
        }
    }

    window.addEventListener('mousemove', (e) => {
        if (selectedRecordCover) {
            bgPosX = e.clientX - selectedRecordCover.getBoundingClientRect().left - selectedRecordCover.getBoundingClientRect().width / 2;
            bgPosY = e.clientY - selectedRecordCover.getBoundingClientRect().top - selectedRecordCover.getBoundingClientRect().height / 2;
        }
    });
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

    <div class="relative min-w-[896px]">
        {#if selectedRecord}
            <div class="absolute top-0 w-full" in:fade={{delay: 100, duration: 200}} out:fade={{duration: 200}}>
                <button on:click={() => selectedRecord = null} class="my-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                    </svg>
                </button>

                <div class="relative">
                    <div class="relative w-fit overflow-hidden">
                        <img bind:this={selectedRecordCover} src="{selectedRecord.cover_url}" alt="album cover"
                             height="240" width="240"
                             class="drop-shadow-xl">
                        <div
                            class="absolute w-[240px] h-[240px] top-0 left-0 bg-[radial-gradient(rgba(255,255,255,0.5),transparent)] bg-no-repeat blur-3xl"
                            style="background-position: {bgPosX}px {bgPosY}px"
                            on:mouseenter={() => cellSize.set(130)}
                            on:mouseleave={() => cellSize.set(40)}></div>
                    </div>
                    <div class="absolute top-0 grid grid-flow-col scale-[0.99] -z-10 animate-slideIn"
                         style="grid-template-columns: repeat(auto-fill, {$cellSize}px); left: {7-(40-$cellSize)/50}rem">
                        {#each Array(selectedRecord.number_of_lps) as _, i}
                            <div
                                class="record h-[240px] w-[240px] flex justify-center items-center bg-neutral-900 border-2 border-white/5 rounded-full -rotate-90 {i < selectedRecord.number_of_lps - 1 ? 'drop-shadow-lg':''}"
                                style="z-index: {-i};">
                                <div class="h-20 w-20 bg-neutral-700 rounded-full"></div>
                            </div>
                        {/each}
                    </div>
                </div>

                <h2 class="mt-6 text-2xl font-semibold">{selectedRecord.title}</h2>
                <p class="text-2xl font-medium leading-6">{selectedRecord.artist}</p>
                <p class="mt-2 text-2xl font-medium opacity-70">{selectedRecord.year}</p>

                <h2 class="mt-9 text-xl font-semibold">Description</h2>
                <p class="mt-1.5 font-medium">{selectedRecord.description}</p>

                <h2 class="relative mt-9 mb-4 text-xl font-semibold pb-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-black">
                    Tracks</h2>
                <ol class="w-fit gap-x-20 font-medium grid grid-flow-col"
                    style="grid-template-rows: repeat({Math.floor(JSON.parse(selectedRecord.tracks).length/2)}, minmax(0, 1fr));">
                    {#each JSON.parse(selectedRecord.tracks) as track, index}
                        <li><span class="font-semibold">{index + 1}.</span> {track}</li>
                    {/each}
                </ol>
            </div>
        {:else}
            <div class="w-fit grid grid-cols-5 gap-6 {selectedRecord && 'opacity-0'}"
                 in:fade={{delay: 100, duration: 200}} out:fade={{duration: 200}}>
                {#each [...records, ...records] as record}
                    <a on:click={() => selectedRecord = record} class="cursor-pointer">
                        <img src="{record.cover_url}" alt="album cover" height="160" width="160" class="shadow-xl mb-2">
                        <h2 class="font-semibold truncate max-w-[160px]">{record.title}</h2>
                        <p class="text-left font-medium leading-4 opacity-90">{record.artist}</p>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>

<!--<div class="relative group">-->
<!--    <img src="{record.cover_url}" alt="album cover" height="160" width="160" class="shadow-xl mb-2">-->
<!--    <h2 class="font-semibold truncate max-w-[160px]">{record.title}</h2>-->
<!--    <p class="leading-4">{record.artist}</p>-->
<!--    <button class="absolute hidden group-hover:block top-1 right-1 bg-black/20 rounded-full p-2 border border-white/10 backdrop-blur-md">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
<!--             stroke="currentColor" class="w-4 h-4 text-white">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>-->
<!--        </svg>-->
<!--    </button>-->
<!--</div>-->
