<script>
import { onMount } from "svelte";

let fileNamesArray = [];
let selectedFile = null;

onMount(() => {
    window.addEventListener("message", (event) => {
        const files = event.data;
        switch(files.type){
            case "files":
                fileNamesArray = files.value;
                break;
            }
        })
    })

</script>

<main>
    <h1>Choose your root</h1>
    <select bind:value={selectedFile}>
        {#each fileNamesArray as file}
            <option value={file}>{file}</option>
        {/each}
    </select>
    
    {#if selectedFile}
        <p>Selected File: {selectedFile}</p>
        {tsvscode.postMessage({ type: 'selection', value: selectedFile })}
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
</style>