<script>
    import { onMount } from "svelte";

    let fileNamesArray = [];
    let selectedFile = '--Select Your Root File--';

    onMount(() => {
        window.addEventListener("message", (event) => {
            const files = event.data;
            switch(files.type){
                case "files":
                fileNamesArray = files.value[0];
                selectedFile = files.value[1];
                break;
            }
        })
    })

    function handleSelectChange(event) {
        selectedFile = event.target.value;
        {tsvscode.postMessage({ type: 'selection', value: selectedFile })}
    }
</script>

<main>
    <div class="header">
        <h3>Choose your root file to see your </h3>
        <img width="64" height="64" src="https://img.icons8.com/external-konkapp-outline-color-konkapp/64/external-tree-tree-konkapp-outline-color-konkapp-8.png" alt="external-tree-tree-konkapp-outline-color-konkapp-8"/>
    </div>
    <select bind:value={selectedFile} on:change={handleSelectChange}>
        <option value="">--Select your root file--</option>
        {#each fileNamesArray as file}
            <option value={file}>{file}</option>
        {/each}
    </select>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        color: #EFD2A9;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    h3 {
        font-size: 30px;
        text-align: center;
        font-family: "Arial";  
        font-weight: 600;
    }

    option{
        text-align: center;
    }

    select{
        font-size: 20px;
        padding: 5px;
        border-radius: 5px;
    }
</style>