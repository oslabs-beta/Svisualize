<script>
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

  let componentStructure = [
    {
      name: 'App',
      children: [
        {
          name: 'Pokedisplay',
          children: [
            {
              name: 'Pokemon',
              children: [
                {
                  name: 'Card',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: 'pokemart',
        }
      ]
    }
  ]
</script>

<main>
  <h1>Gotta Catch 'Em All!</h1>
  <Pokedisplay {pokes}/>
  <Tree {componentStructure}/>
</main>