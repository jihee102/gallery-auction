<script>
  import { tokenInfo, paintStore, bidStore } from '../auctionStorage';
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import AuctionDetail from '../components/AuctionDetail.svelte';
  import BidList from '../components/BidList.svelte';

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
    const request = url.split('/');
    paintId = request[4];
    getPainting();
    getPaintingBids();
  };

  const getPainting = () => {
    painting = $paintStore.find((paint) => paint.id === paintId);
  };

  const getPaintingBids = async () => {
    const response = await fetch(
      `https://gallery-auction.herokuapp.com/paintings/${paintId}/bid`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      const json = await response.json();
      bidList = [...json];
    } else {
      const { message } = await response.json();
      error = message;
    }
  };

  const doBid = async (e) => {
    const body = { amount: e.detail.amount };
    if ($tokenInfo !== undefined) {
      const response = await fetch(
        `https://gallery-auction.herokuapp.com/paintings/${paintId}/bid`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: $tokenInfo,
          },
          body: JSON.stringify(body),
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const newBid = await response.json();
        $bidStore = [newBid, ...$bidStore];
        console.log($bidStore);
        bidList = [...bidList, newBid].sort((a, b) => b.bidPrice - a.bidPrice);
      } else {
        const { message } = await response.json();
        error = message;
      }
    } else {
      goto('login');
    }
  };
</script>

<svelte:head>
  <title>Auction Gallery</title>
</svelte:head>

<h1>Auction Detail</h1>
{#if painting !== undefined}
  <AuctionDetail {painting} />

  <BidList {bidList} on:bid={doBid} />
{/if}

<style>
  img {
    max-height: 200px;
    max-width: 200px;
  }
  h1 {
    margin-bottom: 50px;
    font-weight: bold;
    color: #010a5e;
    font-size: 35px;
    text-align: center;
  }
</style>
