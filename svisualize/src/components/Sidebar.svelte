<script>
    import Tree from "./Tree.svelte";
    import componentStrcuture  from "../componentStructure";
    let structure = [
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
      <Tree {structure}/>
  </main>

  <style>
    h1 {
      color: red;
      text-align: center;
    }
  </style>