<script>
    import { createEventDispatcher} from 'svelte';

    export let paintings;
    const dispatch = createEventDispatcher();

    const deleteTheBid = async (paintingID)=>{
        dispatch("delete", {paintingID: paintingID});

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
        <th>Name</th>
        <th>Due Date</th>
        <th>Update</th>
        <th>Remove</th>

    </tr>
    </thead>
    <tbody>
    {#if   paintings.length === 0}
        <tr class="center"><td colspan='6'>No order found</td></tr>
    {:else}
        {#each paintings as painting}
            <tr>
                <td>{painting.name}</td>
                <td>{painting.auctionEenDate}</td>
                <td>{painting.auctionEenDate}</td>
                <td class="cursor" on:click={deleteTheBid(painting.id)}> <i class="fa fa-trash"></i></td>

            </tr>
        {/each}
    {/if}

    </tbody>
</table>