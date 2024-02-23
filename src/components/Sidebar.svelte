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
    h1 {
      color: #EFD2A9;
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
  </style>