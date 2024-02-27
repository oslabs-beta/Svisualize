<script>
  import { onMount, setContext } from "svelte";
  import Tree from "./Tree.svelte";
  import ChooseRoot from "./ChooseRoot.svelte";

  let componentStructure = [];

  onMount(() => {
    //listener for message containing component structure from ext
    window.addEventListener("message",  (event) => {
      const structure = event.data;
      switch(structure.type){
        case "structure":
          componentStructure = [structure.value];
          console.log(componentStructure);
          break;
      }
    });
    //listener for message containing resize request from ext
    window.addEventListener('resize', (event) => {
      tsvscode.postMessage({ type: 'resize', value: 'resize' });
    })
  })
  
  setContext('componentStructure', componentStructure);
  </script>

  <main>
    <div class="header">
    <ChooseRoot/>
    <button on:click={(() => {
      tsvscode.postMessage({ type: 'update', value: 'update' });
    })}>Update</button>
    </div>
    
    <div id="tree-wrapper">
    {#if componentStructure.length > 0}
      <Tree {componentStructure} />
    {/if}
    </div>
  </main>

  <style>
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    button {
      width: 5em;
      height: 2em;
      background-color: #232323;
      color: #EFD2A9;
      border-radius: 5px;
      border: 1px solid #434343;
      font-size: 16px;
      font-weight: 600;
      margin: 10px;
    }
    button:hover {
      background-color: #383838;
      color: #EFD2A9;
      transition: 500ms;
      cursor: pointer;
    }
  </style>