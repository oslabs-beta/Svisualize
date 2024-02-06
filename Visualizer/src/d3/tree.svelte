<script>
    import { onMount } from "svelte";
    import * as d3 from 'd3';
    export let componentStructure;

onMount(() => {
  const svg = d3.select('#tree-container').append('svg').attr('width', 500).attr('height', 500);
  const root = d3.hierarchy(componentStructure[0]);
  const treeLayout = d3.tree().size([500, 500]);
  const treeDataTransformed = treeLayout(root);

  // Example: Render links
  svg.selectAll('line')
    .data(treeDataTransformed.links())
    .enter().append('line')
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
    .attr('stroke', '#333');

  // Example: Render nodes
  svg.selectAll('circle')
    .data(treeDataTransformed.descendants())
    .enter().append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 5)
    .attr('fill', '#ff0000');
});
</script>

<div id="tree-container"></div>