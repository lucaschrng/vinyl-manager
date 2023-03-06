<script>
  import {selectedRecord} from "../../store.js";
  import Header from "../../components/Layout/Header.svelte";
  import RecordDetails from "../../components/Library/RecordDetails.svelte";
  import Library from "../../components/Library/Library.svelte";

  export let records = [];

  const updateRecords = async () => {
    try {
      // fetch records
      // records = response.data;
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div class="w-fit m-auto mt-32">
  <Header/>

  <div class="relative min-w-[896px]">
    {#if $selectedRecord}
      <RecordDetails record={$selectedRecord} on:update={updateRecords}/>
    {:else}
      <Library records={records}/>
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
