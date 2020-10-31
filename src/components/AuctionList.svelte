<script>
    import AuctionListItem from "./AuctionListItem.svelte";
    export let paintings;
</script>
<style>

    .auctionList{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
        grid-auto-rows: auto;
        width: 100%;
        grid-gap: 30px;
        margin: 20px auto 100px;
        justify-items: center;
        align-items: center;
        height: fit-content;
    }
</style>

<div class="auctionList">
    {#each paintings as paint}
        <AuctionListItem name={paint.name} image={paint.image} auctionEndDate={paint.auctionEenDate}
                         painter={paint.painter} id={paint.id}/>
    {/each}
</div>