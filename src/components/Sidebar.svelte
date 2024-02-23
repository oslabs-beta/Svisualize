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
    })
  
  </script>

  <main>
    <div class="header">
      <h1>Render your component tree!</h1>


      <button type="submit" on:click={(() => {
        tsvscode.postMessage({ type: 'resize', value: 'resize' });
      })}>Resize</button>
    </div>

    <ChooseRoot/>
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
      font-family: "Arial";      
    }
    
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 5px;
    }

    button {
      width: 10em;
      height: 2em;
      background-color: #2a2a2a;
      color: #e3ae52;
      border-radius: 5px;
      border: 1px solid #323232;
      box-shadow: 2px 2px 3px #323232;
      font-size: 16px;
      font-weight: 600;
      margin: 10px;
    }

    button:hover {
      background-color: #dd9e46;
      color: #2a2a2a;
    }
  </style>