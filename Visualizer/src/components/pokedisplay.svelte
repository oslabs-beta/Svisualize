<script>
    import Pokemon from "./pokemon.svelte";
    export let pokes = []
</script>

{#each pokes as poke (poke.id)}
    <Pokemon {poke}/>
{/each}