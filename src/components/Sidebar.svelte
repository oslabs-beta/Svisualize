<script>
  import { onMount, tick } from 'svelte';
  import Tree from './Tree.svelte';
  import TreeWrapper from './TreeWrapper.svelte';
  

  let componentStructure = [];
  let fileNamesArray = [];
  let selectedFile = '';
  let foldersURI = '';


  function handleFiles(array){
    fileNamesArray = array;
  }

  onMount(() => {
    window.addEventListener('message', (event) => {
      const structure = event.data;
      switch (structure.type) {
        case 'structure':
          componentStructure = [structure.value, ...componentStructure];
          // handleFiles(structure.value);
          // isRootFound
          break;
        case 'files':
          handleFiles(structure.value);
          break;
        case 'uri':
          foldersURI = structure.value;
          break;
      }
    });

  });

  function getTreeStructure(root, parent = 'App.svelte'){

  }
</script>

<main>
  <div class="header">
    <h1>Render your component Tree!</h1>
    <div class="chooseRoot">
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
    </div>

    <button
      type="submit"
      on:click={() => {
        tsvscode.postMessage({ type: 'render', value: 'render' })
      }}>Render</button
    >
  </div>

  <div id="tree-wrapper">
    {#if componentStructure.length > 0}
      <Tree {componentStructure} />
    {/if}
  </div>
</main>

<style>
  h1 {
    color: #e3ae52;
    text-align: center;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 15em;
    height: 2em;
    background-color: #2a2a2a;
    color: #e3ae52;
    border-radius: 5px;
    border: 1px solid #434343;
    box-shadow: 3px 3px 2px #2b2b2b;
    font-size: 16px;
    font-weight: 600;
    margin: 10px;
  }

  button:hover {
    background-color: #a3711a;
    color: #2a2a2a;
  }

  .chooseRoot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
<!-- <script>
  import { onMount, tick } from "svelte";
  import Tree from "./Tree.svelte";
  import TreeWrapper from "./TreeWrapper.svelte";
  import ChooseRoot from "./ChooseRoot.svelte";

    let componentStructure = [];
    onMount(() => {

      window.addEventListener("message", (event) => {
        const structure = event.data;
        switch(structure.type){
          case "structure":
            componentStructure = [structure.value, ...componentStructure];
            // isRootFound
            break;
        }
      })
    })
  
  </script>

  <main>
    <div class="header">
      <h1>Render your component tree!</h1>
      <ChooseRoot/>

      <button type="submit" on:click={(() => {
        tsvscode.postMessage({ type: 'render', value: 'render' });
      })}>Render</button>
    </div>


    <div id="tree-wrapper">
    {#if componentStructure.length > 0}
      <Tree {componentStructure} />
    {/if}
    </div>
    
  </main>

  <style>
    h1 {
      color: #dd9e46;
      text-align: center;
    }
    
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    button {
      width: 15em;
      height: 2em;
      background-color: #2a2a2a;
      color: #e3ae52;
      border-radius: 5px;
      border: 1px solid #434343;
      box-shadow: 3px 3px 2px #2b2b2b;
      font-size: 16px;
      font-weight: 600;
      margin: 10px;
    }

    button:hover {
      background-color: #dd9e46;
      color: #2a2a2a;
    }
  </style> -->