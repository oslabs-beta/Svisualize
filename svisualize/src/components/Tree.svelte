<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let componentStructure;


  onMount(() => {
    let height = 2000;
    let width = 2000;

    let window = d3
      .select('#tree-container')
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g')
      .attr('transform', 'translate(50,50)');

    const root = d3.hierarchy(structure[0]);
    //const roots = d3.hierarchy(root);
    // console.log(componentStructure[0]);
    // console.log(root);

    // console.log('root test', root.data);
    const tree = d3.tree().size([height / 4, width / 4]);

    //console.log('hello');
    // console.log(componentStructure);
    // console.log(componentStructure[0]);

    const treeDataTransformed = tree(root);

    let nodes = treeDataTransformed.descendants();
    console.log('nodes', nodes);
    //console.log(nodes);
    let links = treeDataTransformed.links();
    //console.log(links);

    let node = window
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        //console.log('d', d);
        // console.log(typeof d);
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    node.append('circle').attr('r', 15).attr('fill', '#ff0000');

    // console.log(root);

    node.append('text').text(function (d) {
      //console.log(d.data.name);
      return d.data.name;
    });

    let diagonal = d3
      .linkVertical()
      .x((d) => d.x)
      .y((d) => d.y);

    window
      .selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('d', diagonal);
  });
</script>

<div id="tree-container"></div>

