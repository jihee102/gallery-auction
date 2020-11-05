<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    let bidAmount;
    export let bidList;
    let error;

    const doBid = ()=>{
        const isBidAmountGood = Number(bidAmount) > Number(bidList[0].bidPrice);

        if(isBidAmountGood){
            error = undefined;
            dispatch("bid", {amount : bidAmount})
        }else{
            error = "Bid amount should be bigger than current best bid amount! Current best bid: $"+ bidList[0].bidPrice;
        }
    }

</script>

<style>
    .bid__list{
        width: 73%;
        margin: 20px auto;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        background-color: lightgray;
    }

    h2{
        margin-bottom: 50px;
        font-weight: bold;
        color: #010a5e;
        font-size: 25px;
    }
    input[type="text"]{
        width: 40%;
        height: 30px;
        border: #010a5e 1px dotted;
        outline: none;
    }

    span{
        color: red;
    }

    button{
        height: 35px;
        min-width: 50px;
        background-color: #010a5e;
        color: #fff;
        margin: 0;
        border: none;
        border-radius: 5px;
    }
    table{
        margin-top: 50px;
        width: 100%;
        padding: 30px;
    }
    th {
        text-align: center;
    }

    tbody > tr:nth-child(odd) {
        background-color: #f3e7e5;
    }
    td {
        padding: 0.5rem;
        text-align: center;
    }



</style>


<div class="bid__list">
    <h2>Bid List</h2>
    <div>
        <input type="text" placeholder="Bid Amount" bind:value={bidAmount}>
        <button on:click={doBid}>Bid!</button>
    </div>
    {#if error !== undefined}
        <span>{error}</span>
        {/if}
    <table>
        <thead>
        <tr>
            <th>BID BY</th>
            <th>BID TIME</th>
            <th>BID PRICE</th>
        </tr>
        </thead>
        <tbody>
        {#if   bidList.length ===0}
            <tr class="center"><td colspan='3'>No bid found</td></tr>
        {:else}
            {#each bidList as bid}
                <tr>
                    <td>{bid.username}</td>
                    <td>{bid.bidTime}</td>
                    <td>{bid.bidPrice}</td>
                </tr>
            {/each}
        {/if}
        </tbody>
    </table>
</div>