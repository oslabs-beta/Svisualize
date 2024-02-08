<script>
    import Tree from "./Tree.svelte";
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
          },
          {
            name: 'pokenursery',
          }
        ]
      }
    ]
    
  </script>
    
  <main>
      <h1>See your component structure below!</h1>
      <Tree {componentStructure}/>
  </main>

  <style>
    h1 {
      color: pink;
    }
  </style>