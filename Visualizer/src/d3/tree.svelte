<script>
  import { onMount } from "svelte";
  import * as d3 from 'd3';
  export let componentStructure;

onMount(() => {
let screenHeight = 2000
let screenWidth = 2000
// delacring a variable that selects html element tree container by id & appends the svg element to the html element 
const svg = d3.select('#tree-container').append('svg').attr('width', screenHeight).attr('height', screenWidth);
// declaring a root variable, hierarchy is what defines the structure aka setting the top of it - hierarchy is only used when the data is already in the correct format 
const root = d3.hierarchy(componentStructure[0]);
// slkeleton of tree - no data passed in / 500 width & 
const treeLayout = d3.tree().size([(screenHeight / 2), (screenWidth / 2)]);
// tree layout with the root (data) passed in 
const treeDataTransformed = treeLayout(root);

// Example: Render links
svg.selectAll('line') // the browser is told to find the svg element and see if it has any 'lines' // select all is more usuefull if there is existing data 
  .data(treeDataTransformed.links())   // binds data to the selection // links is called on the hierarchical layout, in this case treeDataTransformed - links put the data in an array format - an array containing objects representing the links between nodes in the tree.
  //console.log(treeDataTransformed.links())
  .enter().append('line') // the enter selection is for any data that does not have a corresponding line // a line is then appened for each item in the enter selection 
  // attr function takes in 2 parameters a label and the value 
  // attr sets or gets attributes of selected elements 
  .attr('x1', d => d.source.x)
  // d represents the node // d.source represenst the connection to the parent node // x & y represent the x & y coordinates of the node 
  .attr('y1', d => d.source.y + 30)
  // source refers to parent 
  // x1 & y1 represent the starting point of the line (connection to parent node)
  .attr('x2', d => d.target.x)
  // x2 & y2 represent the ending point of the line (connection to child node)
  .attr('y2', d => d.target.y + 30)
  // target refers to the child 
  .attr('stroke', '#333')
  .attr('stroke-width', 10);

// Example: Render nodes
svg.selectAll('circle')
  .data(treeDataTransformed.descendants())
  .enter().append('circle')
  .attr('cx', d => d.x)
  .attr('cy', d => d.y + 30)
  .attr('r', 20)
  .attr('fill', '#ff0000')
  .attr('padding', 10);

// selects all existing text elements within svg
svg.selectAll('text')
// binds the data to the selection
  .data(treeDataTransformed.descendants())
  .enter() // .append('text') <--- does not need this because we dont want to create text if it is not found
  .text(function(d) { return d.name;}) //.style("font-family", "Arial").style("font-size", 45)
  .attr('x', d => d.source.x)
  .attr('y', d => d.source.y)
  .attr("font-size", 12);


// approach - text should be attahced to each parent?

   
});
</script>

<div id="tree-container"></div>