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
    <!-- <div class="background"> -->
      <h1>See your component structure below!</h1>
      <TreeWrapper>
        {#if componentStructure.length > 0}
          <Tree {componentStructure}/>
        {/if}
      </TreeWrapper>
    
    <!-- </div> -->
  </main>

  <style>
    h1 {
      color: #e3ae52;
      text-align: center;
    }
  </style>