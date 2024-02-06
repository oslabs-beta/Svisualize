<script>
    import Card from "./card.svelte";
    export let poke
</script>

<Card>
    <div class="poke-name">
        <p>Name: {poke.name}</p>
        <p>Pokedex Number: {poke.id}</p>
        <p>Type: {poke.type}</p>
    </div>
    <div class="close">X</div>
</Card>

<style>
    .close {
        position: absolute;
        top: 10px;
        right: 20px; 
        cursor: pointer;
    }
</style>