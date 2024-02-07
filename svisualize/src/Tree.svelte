<!-- Tree.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  onMount(() => {
    // D3 tree rendering logic
    const svg = d3.select('#tree-container')
      .append('svg')
      .attr('width', 600)
      .attr('height', 400);

    // D3 tree generation code here...
  });
</script>


<main>
  <div id="tree-container"></div>
  <h1>this hard</h1>
</main>
