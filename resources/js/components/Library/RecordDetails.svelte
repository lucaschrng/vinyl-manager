<script>
    import {fade} from 'svelte/transition';
    import {tweened} from "svelte/motion";
    import {cubicOut} from "svelte/easing";
    import {selectedRecord} from "@/store.js";
    import {createEventDispatcher, onMount} from "svelte";
    import Picker from "vanilla-picker";

    export let record;
    if  (record.tracks.constructor.name === 'String') record.tracks = JSON.parse(record.tracks);
    if  (record.color.constructor.name === 'String') record.color = JSON.parse(record.color);
    let {id, created_at, updated_at, ...updatedRecord} = {...record};

    const dispatch = createEventDispatcher();

    let editMode = false;

    let cellSize = tweened(0, {
        duration: 500,
        easing: cubicOut
    });

    onMount(() => {
        cellSize.set(40);
    })

    const handleCoverClick = () => {
        cellSize.update((value) => value === 40 ? 130 : 40);
    }

    let recordCover;
    let bgPosX = 0;
    let bgPosY = 0;

    window.addEventListener('mousemove', (e) => {
        if (recordCover) {
            bgPosX = e.clientX - recordCover.getBoundingClientRect().left - recordCover.getBoundingClientRect().width / 2;
            bgPosY = e.clientY - recordCover.getBoundingClientRect().top - recordCover.getBoundingClientRect().height / 2;
        }
    });

    let colorPicker;

    onMount(() => {
        colorPicker = new Picker({
            parent: colorPicker,
            popup: false,
            template: `
                <div class="picker_wrapper layout_default no_cancel rounded-lg border border-black/10" tabindex="-1" style="box-shadow: none;">
                    <div class="picker_sl rounded" style="box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.05);">
                        <div class="picker_selector" style="border: 2px solid white; box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1); padding: 0.4rem"></div>
                    </div>
                    <div class="picker_arrow"></div>
                    <div class="picker_hue picker_slider rounded border border-black/10" style="box-shadow: none;">
                        <div class="picker_selector" style="border: 2px solid white; box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1); padding: 0.4rem; border-radius: 1000px;"></div>
                    </div>
                    <div class="picker_alpha picker_slider" style="background: linear-gradient(rgb(255, 69, 0), rgba(255, 69, 0, 0)), linear-gradient(45deg, lightgrey 25%, transparent 25%, transparent 75%, lightgrey 75%) 0px 0px / 2em 2em, linear-gradient(45deg, lightgrey 25%, white 25%, white 75%, lightgrey 75%) 1em 1em / 2em 2em; width: 100%;">
                        <div class="picker_selector" style=""></div>
                    </div>
                    <div class="picker_editor" style="width: 100%; box-shadow: none;">
                        <input class="uppercase rounded" aria-label="Type a color name or hex value" style="font-family: neue-haas-grotesk-display, sans-serif; padding: 0.5rem; box-shadow: none; border: 1px solid rgba(0, 0, 0, 0.1)">
                    </div>
                    <div class="picker_sample" style="display: none;"></div>
                    <div class="picker_done" style="display: none;"><button>Ok</button></div>
                    <div class="picker_cancel"><button>Cancel</button></div>
                </div>`,
            alpha: false,
            editor: true,
            color: record.color.color,
            onChange: (color) => {
                updatedRecord.color.color = color.rgbString;
            },
        });
    })

    const handleCancel = () => {
        editMode = false;
        updatedRecord = {...record};
    }

    const handleClick = (e) => {
        e.target.contentEditable = editMode;
        e.target.focus();
    }

    const handleBlur = (e) => {
        e.target.contentEditable = false;
    }

    const updateRecord = async () => {
        try {
            const response = await axios.put(`/records/${record.id}`, updatedRecord);
            record = response.data;
            editMode = false;
            dispatch('update');
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="absolute top-0 w-full" in:fade={{delay: 100, duration: 200}} out:fade={{duration: 200}}>
    <div class="my-6 flex gap-2">
        <button on:click={() => selectedRecord.set(null)}
                class="p-2 flex items-center gap-2 text-lg font-medium hover:bg-black/5 border border-transparent hover:border-black/5 rounded transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
            </svg>
            Back to library
        </button>

        {#if editMode}
            <button on:click={handleCancel}
                    class="p-2 flex items-center gap-2 text-lg font-medium hover:bg-red-500/20 border border-transparent hover:border-black/5 rounded transition"
                    in:fade={{duration: 50, delay: 50}} out:fade={{duration: 50}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Cancel
            </button>
            <button on:click={updateRecord}
                    class="p-2 flex items-center gap-2 text-lg font-medium underline hover:bg-green-500/20 border border-transparent hover:border-black/5 rounded transition"
                    in:fade={{duration: 50, delay: 50}} out:fade={{duration: 50}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                Save changes
            </button>
        {:else}
            <button on:click={() => editMode = true}
                    class="p-2 flex items-center gap-2 text-lg font-medium hover:bg-black/5 border border-transparent hover:border-black/5 rounded transition"
                    in:fade={{duration: 50, delay: 50}} out:fade={{duration: 50}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                </svg>
                Edit record
            </button>
        {/if}
    </div>

    <div class="relative">
        <div class="relative w-fit overflow-hidden">
            <img bind:this={recordCover} src="{record.cover_url}" alt="album cover"
                 on:click={handleCoverClick}
                 height="240" width="240"
                 class="drop-shadow-xl cursor-pointer">
            <div
                class="absolute w-[240px] h-[240px] top-0 left-0 bg-[radial-gradient(rgba(255,255,255,0.5),transparent)] bg-no-repeat blur-3xl pointer-events-none"
                style="background-position: {bgPosX}px {bgPosY}px"></div>
        </div>
        <div class="absolute top-0 grid scale-[0.99] -z-10 animate-slideIn"
             style="grid-template-columns: repeat({record.number_of_lps}, {$cellSize}px); left: {7-(40-$cellSize)/50}rem">
            {#each Array(record.number_of_lps) as _, i (i)}
                <div
                    class="record h-[240px] w-[240px] flex justify-center items-center bg-neutral-900 border-2 border-white/5 rounded-full -rotate-90 {i < record.number_of_lps - 1 ? 'shadow-lg':''}"
                    style="z-index: {-i}; background-color: {updatedRecord.color.color}">
                    <div class="h-20 w-20 bg-neutral-700 rounded-full"></div>
                </div>
            {/each}
        </div>
    </div>

    <div class="mt-6 {!editMode && 'hidden'}">
        <h2 class="text-2xl font-semibold mb-2">Record aspect</h2>
        <div bind:this={colorPicker}></div>
    </div>

    <div class="flex mt-6 items-center gap-3">
        <h2 class="w-fit text-2xl font-semibold outline-none {editMode ? 'select-all' : 'select-text'}"
            contenteditable="false" on:click={handleClick}
            on:blur={handleBlur}
            bind:innerHTML={updatedRecord.title}></h2>
        {#if editMode}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="w-5 h-5 opacity-50" transition:fade={{duration: 50}}>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
            </svg>
        {/if}
    </div>
    <div class="flex items-center gap-3">
        <p class="w-fit text-2xl font-medium leading-6 outline-none {editMode ? 'select-all' : 'select-text'}"
           contenteditable="false" on:click={handleClick}
           on:blur={handleBlur}
           bind:innerHTML={updatedRecord.artist}></p>
        {#if editMode}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="w-5 h-5 opacity-50" transition:fade={{duration: 50}}>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
            </svg>
        {/if}
    </div>
    <div class="flex mt-2 items-center gap-3">
        <p class="w-fit text-2xl font-medium opacity-70 outline-none {editMode ? 'select-all' : 'select-text'}"
           contenteditable="false" on:click={handleClick}
           on:blur={handleBlur} bind:innerHTML={updatedRecord.year}></p>
        {#if editMode}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="w-5 h-5 opacity-50" transition:fade={{duration: 50}}>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
            </svg>
        {/if}
    </div>

    <div class="flex mt-9 items-center gap-3">
        <h2 class="text-xl font-semibold">Description</h2>
        {#if editMode}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="w-5 h-5 opacity-50" transition:fade={{duration: 50}}>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
            </svg>
        {/if}
    </div>
    <p class="mt-1.5 font-medium outline-none" contenteditable="false" on:click={handleClick} on:blur={handleBlur}
       bind:innerHTML={updatedRecord.description}></p>

    <h2 class="relative mt-9 mb-4 text-xl font-semibold pb-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-black">
        Tracks</h2>
    <ol class="w-fit gap-x-20 font-medium grid grid-flow-col"
        style="grid-template-rows: repeat({Math.ceil(record.tracks.length/2)}, minmax(0, 1fr));">
        {#each record.tracks as track, index}
            <li class="flex items-center gap-2">
                <span class="font-semibold">{index + 1}.</span>
                <span class="outline-none" contenteditable="false" on:click={handleClick}
                      on:blur={handleBlur}
                      bind:innerHTML={updatedRecord.tracks[index]}>
                </span>
                {#if editMode}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor"
                         class="w-4 h-4 opacity-50" transition:fade={{duration: 50}}>
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                    </svg>
                {/if}
            </li>
        {/each}
    </ol>
</div>
