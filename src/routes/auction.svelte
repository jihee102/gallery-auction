<script>
    import {onMount} from "svelte";
    import AuctionDetail from "../components/AuctionDetail.svelte";
    import SearchBar from "../components/SearchBar.svelte";


    let error;
    let painting;

    onMount(() => {
        getPainting();
    })
    const getPainting = async (event) => {
        const paintingId = event.detail.paintingID;
        const response = await fetch(`http://localhost:3000/paintings/+${paintingId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const json = await response.json();
            painting = json;
        }
        error = await response.json();

    }
    </script>
<svelte:head>
    <title>Auction Gallery</title>
</svelte:head>

<h1>Auction List</h1>
<AuctionDetail painting={painting} />


