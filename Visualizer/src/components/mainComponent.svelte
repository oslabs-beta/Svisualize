<script>
    import { onMount } from 'svelte';
    import { select, tree, hierarchy, linkHorizontal } from 'd3';
  
    let svg; // Declare svg as a variable
  
    onMount(() => {
      // Use select to get the reference to the svg element
      svg = select('svg');
  
      // dynamic width and height dimensions are created based on the dimmenions of the body 
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
  
      const treeLayout = tree().size([height, width]);
  
      // Paste your JSON data here
      const jsonData = [
        {
          "name": "Top Level",
          "parent": "null",
          "children": [
            {
              "name": "Level 2: A",
              "parent": "Top Level",
              "children": [
                {
                  "name": "Son of A",
                  "parent": "Level 2: A"
                },
                {
                  "name": "Daughter of A",
                  "parent": "Level 2: A"
                }
              ]
            },
            {
              "name": "Level 2: B",
              "parent": "Top Level"
            }
          ]
        }
      ];
  
      // Now you can use the jsonData variable in your component
      console.log(jsonData);
    
      // creates a hierarchyobject with the specified data - the data is already in the structure and format though?
      const root = hierarchy(jsonData);
      // defines the layout of the tree with specified dimensions 
      const links = treeLayout(root).links();
      const linkPathGenerator = linkHorizontal<HierarchyPointLink<any>, [number, number]>().x(d => d.y).y(d => d.x);
  
      svg.selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .attr('d', linkPathGenerator);
    });
  </script>
  
  <main>
    <div>
      <svg> </svg>
    </div>
  </main>
  
  <style>
  </style>
  