<script>
  import { onMount, setContext } from "svelte";
  import Tree from "./Tree.svelte";
  import ChooseRoot from "./ChooseRoot.svelte";

    let componentStructure = [];
    onMount(() => {

      window.addEventListener("message",  (event) => {
        const structure = event.data;
        switch(structure.type){
          case "structure":
            componentStructure = [structure.value];
            console.log(componentStructure);
            break;
        }
      });
      window.addEventListener('update', (event) => {
        tsvscode.postMessage({ type: 'update', value: 'update' });
        //ensures there is only one tree rendered
        if (componentStructure.length >= 1) {
          componentStructure = componentStructure.slice(0, 1);
        }
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
      background-color: #2a2a2a;
      color: #EFD2A9;
      border-radius: 5px;
      border: 1px solid #434343;
      font-size: 16px;
      font-weight: 600;
      margin: 10px;
    }
  </style>