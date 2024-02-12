<script>
    import { onMount } from "svelte";
    import Tree from "./Tree.svelte";
  
    let componentStructure = [];

    onMount(() => {
      window.addEventListener("message", (event) => {
        const structure = event.data;
        switch(structure.type){
          case "structure":
            componentStructure = [structure.value, ...componentStructure];
            break;
        }
      })
    })
    
  </script>

  <main>

    <h1>See your component structure below!</h1>
    {#if componentStructure.length > 0}
      <Tree {componentStructure}/>
    {/if}
  </main>

  <style>
    h1 {
      color: red;
      text-align: center;
    }
  </style>