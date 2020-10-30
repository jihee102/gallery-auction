<script>
    import { createEventDispatcher} from 'svelte';

    export let bidList;
    const dispatch = createEventDispatcher();

    const deleteTheBid = async (bidId)=>{
        dispatch("delete", {bidId: bidId});

    }

</script>

<style>
    table{
        width: 100%;
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

    .center{
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }

    .cursor{
        cursor: pointer;
    }

</style>

<table>
    <thead>
    <tr>
        <th>BID ID</th>
        <th>PAINT NAME</th>
        <th>BID TIME</th>
        <th>BID PRICE</th>
        <th>IS BEST BID?</th>
        <th>REMOVE</th>
    </tr>
    </thead>
    <tbody>
    {#if   bidList.length === 0}
        <tr class="center"><td colspan='6'>No order found</td></tr>
            {:else}
        {#each bidList as bid}
        <tr>
            <td>{bid.id}</td>
            <td>{bid.paintName}</td>
            <td>{bid.bidTime}</td>
            <td>${bid.bidPrice || 'No'}</td>
            <td>{bid.isBest || 'No'}</td>
            <td class="cursor" on:click={deleteTheBid(bid.id)}> <i class="fa fa-trash"></i></td>

        </tr>
            {/each}
    {/if}

    </tbody>
</table>