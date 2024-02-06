
<script>
  import { onMount } from 'svelte';


  import Pokedisplay from "./components/pokedisplay.svelte";
  import Tree from "./d3/tree.svelte";
  let pokes = [
    {
      id: 1,
      name: 'Bulbasaur',
      type: 'grass',
    },
    {
      id: 2,
      name: 'Ivysaur',
      type: 'grass',
    },
    {
      id: 3,
      name: 'Venusaur',
      type: 'grass',
    }
  ]

  import { generateComponentStructure } from "./d3/generateStructure";
  const projectDirectory = '/Users/lumeng/Desktop/Svisualize/Visualizer';
  let componentStructure;

  onMount(async () => {
    componentStructure = await generateComponentStructure(projectDirectory + '/src/App.svelte');
    console.log(JSON.stringify(componentStructure, null, 2));
  });
</script>

<main>
  <h1>Gotta Catch 'Em All!</h1>
  <Pokedisplay {pokes}/>
  <Tree {componentStructure}/>
</main>