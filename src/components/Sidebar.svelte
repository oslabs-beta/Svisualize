<script>
  import { onMount } from "svelte";
  import Tree from "./Tree.svelte";
  import ChooseRoot from "./ChooseRoot.svelte";

    let componentStructure = [];
    onMount(() => {

      window.addEventListener("message", (event) => {
        const structure = event.data;
        switch(structure.type){
          case "structure":
            componentStructure = [structure.value, ...componentStructure];
            break;
        }
      });
      window.addEventListener('resize', (event) => {
        tsvscode.postMessage({ type: 'resize', value: 'resize' });
      })
    })
  
  </script>

  <main>
    <div class="header">
      <!-- <h1>Render your component tree!</h1> -->
      <ChooseRoot/>
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
      margin-top: 5px;
    }
  </style>