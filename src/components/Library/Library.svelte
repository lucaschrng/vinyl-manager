<script>
    import {fade} from "svelte/transition";
    import {selectedRecord} from "../../store.js";
    import Record from "../Library/LibraryRecordCover.svelte";

    export let records = [];

    let renderRecords = true;
    let currentSort = null;
    let currentOrder = null;

    const handleClick = async (sort) => {
        renderRecords = false;
        await setSort(sort);
        renderRecords = true;
    }

    const setSort = (sort) => {
        if (sort === currentSort && currentOrder === 'desc') {
            sort = 'created';
            currentSort = null;
            currentOrder = null;
        } else if (sort !== currentSort) {
            currentOrder = null;
        }

        records = records.sort((a, b) => {
            if (a[sort] > b[sort]) return 1;
            if (a[sort] < b[sort]) return -1;
            return 0;
        });

        if (currentOrder === 'asc') {
            records = records.reverse();
            currentOrder = 'desc';
        } else if (sort !== 'id') {
            currentOrder = 'asc';
        }

        currentSort = sort;
    }

    const handleAnimationEnd = (e) => {
        e.target.classList.remove('opacity-0');
        e.target.classList.add('opacity-1');
    }
</script>

<div in:fade={{delay: 100, duration: 200}} out:fade={{duration: 200}}>
    <div class="py-6 flex gap-2 text-lg font-medium">
        <span class="opacity-95 mr-4">Sort by:</span>
        <button class="flex items-center font-semibold {currentSort !== 'artist' && 'opacity-80 mr-4'} hover:opacity-100"
                on:click={() => handleClick('artist')}>
            Artist
            {#if currentSort === 'artist'}
                {#if currentOrder === 'asc'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"/>
                    </svg>
                {/if}
            {/if}
        </button>
        <button class="flex items-center font-semibold {currentSort !== 'title' && 'opacity-80 mr-4'} hover:opacity-100"
                on:click={() => handleClick('title')}>
            Title
            {#if currentSort === 'title'}
                {#if currentOrder === 'asc'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"/>
                    </svg>
                {/if}
            {/if}
        </button>
    </div>
    <div class="w-fit grid grid-cols-5 gap-x-6 gap-y-10">
        {#if renderRecords}
            {#each records as record, i}
                <button on:click={() => selectedRecord.set(record)} class="cursor-pointer group opacity-0 animate-appear"
                   style="animation-delay: {i*20}ms" on:animationend={handleAnimationEnd}>
                    <Record src="{record.cover_url}"/>
                    <h2 class="text-left font-semibold truncate max-w-[160px]">{record.title}</h2>
                    <p class="text-left font-medium -mt-1 opacity-90 truncate max-w-[160px]">{record.artist}</p>
                </button>
            {/each}
        {/if}
    </div>
</div>
