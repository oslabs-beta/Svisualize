<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let componentStructure;

  export let width;
  export let height;
  // export let height;
  // export let mounted;

  window.addEventListener('resize', (e)=> {
    width = document.querySelector('.tree-wrapper').offsetWidth;
    height = document.querySelector('.tree-wrapper').offsetHeight;
      
        // tick();
        // console.log('width: ',width);
        // console.log('height: ', height);
  ;})

  // let containerHeight = 0;
  // let containerWidth = 0;
  // document.addEventListener("DOMContentLoaded", () => {
  //   containerWidth = document.getElementById("tree-container").offsetWidth;
  //   containerHeight = document.getElementById("tree-container").offsetHeight;
  //   console.log("container: ", containerWidth);
  // });

  onMount(() => {
      // console.log('width: ',width);
        // console.log('height: ', height);
    console.log(width, height);
    // if( containerWidth === 0 && containerHeight === 0)
    let containerWidth = width;
    if (containerWidth === 0) containerWidth = 2000;
    let containerHeight = height; // let width;
    if (containerHeight === 0) containerHeight = 1500;
    // let height;ght;
    let window = d3
      .select("#tree-container")
      .append("svg")
      .attr("height", containerHeight)
      .attr("width", containerWidth)
      .append("g")
      .attr("transform", "translate(50,50)");

    const root = d3.hierarchy(componentStructure[0]);

    // console.log('root test', root.data);
    const tree = d3.tree().size([containerWidth / 4, containerHeight / 4]);

    const treeDataTransformed = tree(root);

    let nodes = treeDataTransformed.descendants();
    let links = treeDataTransformed.links();

    let node = window
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

    window
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("d", diagonal);
  });
</script>

<div id="tree-container"></div>

<style>
</style>
