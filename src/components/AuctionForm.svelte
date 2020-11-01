<script>
    import { onMount, createEventDispatcher } from 'svelte';
    export let painting;
    let paintName;
    let description;
    let endTime;
    const dispatch = createEventDispatcher();



    const updateAuction= (id)=>{
        dispatch("update", {paintId: id, paintName: paintName, description:description, endTime:endTime});
        paintName="";
        description="";
        endTime="";
        painting = undefined;
    }

    const addAuction = ()=>{
        dispatch("add", { paintName: paintName, description:description, endTime:endTime});
        paintName="";
        description="";
        endTime="";
        painting = undefined;
    }

    const setInput = ()=>{
        paintName = painting!==undefined? painting.name: undefined;
        description = painting!==undefined? painting.description: undefined;
        endTime= painting!==undefined? painting.auctionEenDate: undefined;
    }

    const cancel = ()=>{
        painting = undefined;
    }

</script>

<style>
    .form{
        width: 100%;
        margin: 50px auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    h1{
        margin-bottom: 50px;
        font-weight: bold;
        color: #010a5e;
        font-size: 35px;
    }

    input[type="text"]{
        height: 30px;
        flex-basis: 30%;
    }

    .input{
        width: 100%;
       display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    input[type="submit"]{
        border: 1px solid #010a5e;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 50px;
        background-color: #010a5e;
        color: #fff;
        transition: all 0.2s linear;;
    }

    input[type="submit"]:hover{
        background-color: rgba(0,0,0, 0.2);
        color: #010a5e;
        border: solid 3px #fff;

    }

    .buttons{
        display: flex;
        flex-wrap: wrap;
        margin: 50px auto;
        gap: 20px;
    }

</style>


    {#if painting !==undefined}
        <div class="form" use:setInput>
        <h1 class="auction_title">Update the auction</h1>
            <div class="input">
                <input type="text" placeholder="Name" bind:value={paintName}/>
                <input  type="text" placeholder="Description" name="description"  bind:value={description}/>
                <input  type="text" placeholder="End time" name="end_time"  bind:value={endTime}/>
            </div>

            <div class="buttons">
                <input type="submit" on:click = {updateAuction(painting.id)}/>
                <input type="submit" on:click = {cancel} value="Cancel"/>
            </div>

        </div>
    {:else}
        <div class="form" use:setInput>
        <h1 class="auction_title">Add an auction</h1>
            <div class="input">
                <input type="text" placeholder="Name" bind:value={paintName}/>
                <input  type="text" placeholder="Description" name="description"  bind:value={description}/>
                <input  type="text" placeholder="End time" name="end_time"  bind:value={endTime}/>
            </div>

            <div class="buttons">
                <input  type="submit" on:click = {addAuction}/>
            </div>

        </div>
    {/if}
