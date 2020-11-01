<script>
    import {tokenInfo} from "../tokenStorage";
    import {onMount} from "svelte";
    import {goto} from "@sapper/app";
    import AuctionDetail from "../components/AuctionDetail.svelte";
    import BidList from "../components/BidList.svelte";

    let user;
    let bidList = [];
    let error;
    let painting;
    let paintId;
    onMount(() => {
        readUrl();

    });
    const readUrl = () => {
        const url = document.location.href;
        const request = url.split("/");
        paintId = request[4];
        getPainting();
        getPaintingBids();
    }
    const getPainting = async () => {
        const response = await fetch(`http://localhost:3000/paintings/${paintId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status >= 200 && response.status < 300) {
            const json = await response.json();
            painting = json;
            console.log(painting)
        } else {
            error = await response.json();
        }

    }
    const getPaintingBids = async () => {
        const response = await fetch(`http://localhost:3000/paintings/${paintId}/bid`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status >= 200 && response.status < 300) {
            const json = await response.json();
            bidList = [...json];
            console.log(bidList)

        } else {
            const {message} = await response.json();
            error = message;
        }
    }

    const doBid = async (e)=>{
        const body = {amount:e.detail.amount};
        if($tokenInfo !==undefined){
            const response = await fetch(`http://localhost:3000/paintings/${paintId}/bid`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': $tokenInfo,
                },
                body: JSON.stringify(body),
            });

            if (response.status >= 200 && response.status < 300) {
                await getPaintingBids();

            } else {
                const {message} = await response.json();
                error = message;
            }
        }else{
            goto("login")
        }

    }


</script>

<style>

    img{
        max-height: 200px;
        max-width: 200px;
    }
    h1{
        margin-bottom: 50px;
        font-weight: bold;
        color: #010a5e;
        font-size: 35px;
        text-align: center;
    }
</style>
<svelte:head>
    <title>Auction Gallery</title>
</svelte:head>

<h1>Auction Detail</h1>
{#if painting !==undefined}
    <AuctionDetail painting={painting} bidList={bidList}/>
    <BidList bidList={bidList} on:bid={doBid}/>
{/if}


