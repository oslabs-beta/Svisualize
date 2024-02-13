<script>
  import { onMount } from "svelte";
  import Tree from "./Tree.svelte";
  import TreeWrapper from "./TreeWrapper.svelte";

    let componentStructure = [];


    onMount(() => {
      let width = 2000;
      let height = 2000;
      window.addEventListener('resize', (e)=> {
        width = document.querySelector('.tree-wrapper').offsetWidth;
        height = document.querySelector('.tree-wrapper').offsetHeight;
        console.log('width: ',width);
        console.log('height: ', height);
      })

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
    <div class="header">
      <h1>See your component structure below!</h1>

      <button on:click={(() => {
        tsvscode.postMessage({ type: 'render', value: 'render' });
      })}>Render</button>
    </div>

      <TreeWrapper>
        {#if componentStructure.length > 0}
          <Tree {componentStructure}/>
        {/if}
      </TreeWrapper>
    
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
  </style>