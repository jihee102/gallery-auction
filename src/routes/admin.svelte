<script>
    import {tokenInfo} from "../tokenStorage.js";
    import {onMount} from "svelte";
    import {goto} from "@sapper/app";
    import AuctionTable from "../components/AuctionTable.svelte";
    let user;
    let paintings = [];
    let error;

    onMount(() => {
        if($tokenInfo !== undefined){
            getPaintings();
        }else{
            goto("/login");
        }

    })

    const getPaintings = async () => {
        const response = await fetch('http://localhost:3000/paintings', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': $tokenInfo,

            },
        });
        if (response.status >= 200 && response.status < 300) {
            const json = await response.json();
            paintings = [...json];
            const {username} = paintings[0];
            user = username;
        }
        error = await response.json();

    }

    const deletePaint = async (event)=>{
        const paintID = event.detail.paintingID;
        const response = await fetch(`http://localhost:3000/paintings/${paintID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': $tokenInfo,
            },

        });
        if (response.status >= 200 && response.status < 300) {
            await getPaintings();
        } else {
            const {message} = await response.json();
            error = message;
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
    }

    .bidBidPage{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        padding: 50px;
    }

    .details{
        flex: 1 1 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    span{
        font-size: 30px;
        color: #010a5e;
    }

    .bidList{
        flex: 3 1 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }


</style>

<div class="bidBidPage">
    <div class="details">
        <h1>Admin</h1>
        <img src="https://lh3.googleusercontent.com/proxy/qTfqYEv0JUdqjWrCBDW4OvZKHSnzsHWImobAJEgcZp2ityaQrdrwMqYh65Psd65PxjEELQ3yQfeY8s0sqslfVpl1DVomB77rFRnhj1uwKBF9dO6UGKQth0aB"
             alt = "profile"/>
        <span>{user}</span>
    </div>
    <div class="bidList">
        <h1>My Bids</h1>
        <AuctionTable on:delete={deletePaint()} bidList={paintings}/>
    </div>

</div>