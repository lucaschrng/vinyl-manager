<script>
    import {fade} from "svelte/transition";
    import {selectedRecord} from "@/store.js";
    import Record from "@/components/Library/LibraryRecordCover.svelte";
    export let records = [];

    const handleAnimationEnd = (e) => {
        e.target.classList.remove('opacity-0');
        e.target.classList.add('opacity-1');
    }
</script>

<div class="w-fit grid grid-cols-5 gap-x-6 gap-y-12"
     in:fade={{delay: 100, duration: 200}} out:fade={{duration: 200}}>
    {#each [...records, ...records] as record, i}
        <a on:click={() => selectedRecord.set(record)} class="cursor-pointer group opacity-0 animate-appear"
           style="animation-delay: {i*20}ms" on:animationend={handleAnimationEnd}>
            <Record src="{record.cover_url}"/>
            <h2 class="font-semibold truncate max-w-[160px]">{record.title}</h2>
            <p class="text-left font-medium leading-4 opacity-90 truncate max-w-[160px]">{record.artist}</p>
        </a>
    {/each}
</div>
