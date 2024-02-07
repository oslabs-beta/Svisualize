<script>
  import Pokedisplay from './components/pokedisplay.svelte';
  import Tree from './d3/tree.svelte';
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
    },
  ];

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
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Pokemart',
        },
        {
          name: 'Pokecenter',
        },
      ],
    },
  ];
</script>

<main>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1> -->

  <main>
    <!-- <Pokedisplay {pokes} /> -->
    <h1>Hello World</h1>
    <Tree {componentStructure} />
  </main>

  <!-- <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p> -->
</main>

<style>
</style>
