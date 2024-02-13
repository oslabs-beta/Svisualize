<script>
  import { afterUpdate, onMount } from "svelte";
  import * as d3 from "d3";

  export let componentStructure;

  export let width;
  export let height;
  let svg;
  // export let height;
  // export let mounted;

  // function handleResize(event) {
  //   const { width: newWidth, height: newHeight } = event.detail;
  //   if (newWidth && newHeight) {
  //     width = newWidth;
  //     height = newHeight;
  //     updateTree();
  //   }
  // }


  onMount(() => {
  //  return renderTree();
      window.addEventListener('resize', handleResize);
  });

  afterUpdate(()=> renderTree());

  function handleResize(){
      width = document.querySelector('.tree-wrapper').offsetWidth;
      height = document.querySelector('.tree-wrapper').offsetHeight;
      // renderTree();
  }

  function renderTree(){
    let containerWidth = 2000;
    let containerHeight = 500; // let width;
    if(width > 0) containerWidth = width;
    if(height > 0) containerHeight = height;

    console.log(width, height)

     svg = d3
      .select("#tree-container")
      .append("svg")
      .attr("height", containerHeight)
      .attr("width", containerWidth)
      .append("g")
      .attr("transform", "translate(50,50)");

    const root = d3.hierarchy(componentStructure[0]);

    // console.log('root test', root.data);
    const tree = d3.tree().size([containerWidth, containerHeight]);

    const treeDataTransformed = tree(root);

    let nodes = treeDataTransformed.descendants();
    let links = treeDataTransformed.links();

    let node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        //console.log('d', d);
        // console.log(typeof d);
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("circle").attr("r", 15).attr("fill", "#e3ae52");

    // console.log(root);

    node
      .append("text")
      .text(function (d) {
        //console.log(d.data.name);
        return d.data.name;
      })
      .style("fill", "antiquewhite")
      .attr("dx", "3em") // Move text to right
      .attr("text-anchor", "middle");

    let diagonal = d3
      .linkVertical()
      .x((d) => d.x)
      .y((d) => d.y);

    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("d", diagonal);
  }
</script>

<div id="tree-container"></div>

<style>
</style>
