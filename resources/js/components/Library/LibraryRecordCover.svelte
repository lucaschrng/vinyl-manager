<script>
    import {onMount} from 'svelte';
    import * as Vibrant from 'node-vibrant/dist/vibrant.worker';

    export let src;
    let style = '';

    onMount(async () => {
        const v = new Vibrant(src);
        const palette = await v.getPalette();
        const [r, g, b] = palette.Muted._rgb;
        style = `color: rgba(${r}, ${g}, ${b}, 0.7)`;
    });
</script>

<img src="{src}" alt="album cover" height="160" width="160"
     class="shadow-lg mb-2 group-hover:-translate-y-0.5 group-hover:shadow-current transition" style={style}>
