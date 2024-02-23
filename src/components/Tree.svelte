<script>
  import { afterUpdate } from 'svelte';
  import * as d3 from 'd3';

  export let componentStructure;

  let nodeText = '#EFD2A9';

  afterUpdate(() => renderTree());

  function renderTree() {
    //sets width and height to match #tree-container - changes on render button
    let treeContainer = document.getElementById('tree-container');
    let containerWidth = treeContainer.clientWidth;
    let containerHeight = treeContainer.clientHeight * 4;

    let svg = d3
      .select('#tree-container')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .style('overflow', 'visible') //prevents nodes from getting cutoff
      .append('g');

    let div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 1e-6)
      .style('position', 'absolute')
      .style('padding', '8px')
      .style('background', '#2a2a2a')
      .style('border', 'solid 2px #434343')
      .style('border-radius', '5px')
      .style('pointer-events', 'none');

    const root = d3.hierarchy(componentStructure[0]);

    const tree = d3.tree().size([containerWidth, containerHeight]);

    const treeDataTransformed = tree(root);

    let nodes = treeDataTransformed.descendants();
    console.log('nodes', nodes);
    let links = treeDataTransformed.links();

    let padding = 5; //padding for rectangles

    let diagonal = d3
      .linkVertical()
      .x((d) => d.x)
      .y((d) => d.y);

    //declare links before nodes so the linkes appear behind
    svg
      .selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#f3d9ae')
      .attr('stroke-width', 1)
      .attr('d', diagonal);

    let node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
      .on("mouseover", mouseover)
      .on("mousemove", function(event, d){mousemove(event,d);})
      .on("mouseout", mouseout)
      .on("click", function(d){
        const uri = d3.select(this).datum().data.uri
        tsvscode.postMessage({ type: 'uri', value: uri });
      })

    //appends text to node
    node
      .append('text')
      .attr('class', function (d) {
        return 'text ' + d.type;
      })
      .attr('text-anchor', 'middle')
      .attr('dx', 0)
      .attr('dy', '.55em')
      .text(function (d) {
        return d.data.name;
      })
      .style('fill', nodeText)
      .style('font-size', '16px')
      .attr("font-weight",function(d,i) {return 500;})
      .call(getTextBox);

    //inserts a rectangle behind text
    node
      .insert('rect', 'text')
      .attr('x', function (d) {
        return d.bbox.x - padding;
      })
      .attr('y', function (d) {
        return d.bbox.y - padding;
      })
      .attr('width', function (d) {
        return d.bbox.width + 2 * padding;
      })
      .attr('height', function (d) {
        return d.bbox.height + 2 * padding;
      })
      .style('fill', '#1d414c')
      .style('stroke', '#2c8078')
      .style('stroke-width', 2);

    function getTextBox(selection) {
      selection.each(function (d) {
        d.bbox = this.getBBox();
      });
    }

    function mouseover() {
      div.transition().duration(200).style('opacity', 1);

      d3.select(this)
        .raise()
        .transition()
        .duration(200)
        .select('text') // Select text element within the node
        .style('fill', '#ffffff'); // Change text fill color on hover

      d3.select(this)
        .select('rect') // Select rectangle element within the node
        .transition()
        .duration(200)
        .style('fill', '#2c8078');
    }

    function mousemove(event, d) {
      div
        .text(
          d.data.props.length > 0
            ? 'Props: ' + d.data.props.join(', ')
            : 'Props: No props detected'
        )
        .style('left', event.pageX + 'px')
        .style('top', event.pageY + 'px');
    }

    function mouseout() {
      div.transition().duration(300).style('opacity', 1e-6);

      d3.select(this)
        .transition()
        .duration(200)
        .select('text') // Select text element within the node
        .style('fill', nodeText); // Reset text fill color

      d3.select(this)
        .select('rect') // Select rectangle element within the node
        .transition()
        .duration(200)
        .style('fill', '#1d414c');
    }
  }
</script>

<div id="tree-container"></div>

<style>
  #tree-container {
    padding: 80px 0px;
    margin: 0px;
  }
</style>