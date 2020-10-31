<script>
    import {tokenInfo} from "../tokenStorage.js";
    import {onMount} from "svelte";
    import {goto} from "@sapper/app";
    import BidTable from "../components/BidTable.svelte";

    let user;
    let bidList = [];
    let error;

    onMount(() => {
        if($tokenInfo !== undefined){
            getUserBids();
        }else{
            goto("/login");
        }

    })

    const getUserBids = async () => {
        const response = await fetch('http://localhost:3000/user/mybids', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': $tokenInfo,
            },

        });
        if (response.status >= 200 && response.status < 300) {
            const json = await response.json();
            bidList = [...json];
            const {username} = bidList[0];
            user = username;
        } else {
            const {message} = await response.json();
            error = message;
        }

    }

    const deleteBid = async (event)=>{
        const bidID = event.detail.bidId;
        const response = await fetch(`http://localhost:3000/user/mybids/${bidID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': $tokenInfo,
            },

        });
        if (response.status >= 200 && response.status < 300) {
            await getUserBids();
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
        <h1>My Details</h1>
        <i class="fas fa-user fa-7x"></i>
        <span>{user}</span>
    </div>
    <div class="bidList">
        <h1>My Bids</h1>
        <BidTable on:delete={deleteBid} bidList={bidList}/>
    </div>

</div>