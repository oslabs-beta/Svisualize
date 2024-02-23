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
    <h3>Choose your root</h3>
    <select bind:value={selectedFile} on:change={handleSelectChange}>
        <option value="">--Select your root file--</option>
        {#each fileNamesArray as file}
            <option value={file}>{file}</option>
        {/each}
    </select>
    
        <!-- <p>Selected File: {selectedFile}</p> -->
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

    h3 {
        font-size: 25px;
        font-weight: 400;
    }

    option{
        text-align: center;
    }

    select{
        /* color:#f3d9ae; */
        font-size: 21px;
    }

</style>