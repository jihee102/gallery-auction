<script>
  import { tokenInfo, paintStore } from '../auctionStorage.js';
  import { decode as atob, encode as btoa } from 'base-64';
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import AuctionTable from '../components/AuctionTable.svelte';
  import AuctionForm from '../components/AuctionForm.svelte';

  let user;
  let error;
  let paintings;
  let updatingPaint;

  onMount(() => {
    if ($tokenInfo !== undefined) {
      const payload = JSON.parse(atob($tokenInfo.split('.')[1]));
      if (!payload.admin) {
        alert('Only admin can see this page');
        goto('/');
      } else {
      }
    } else {
      goto('/login');
    }
  });

  const deletePaint = async (event) => {
    const paintID = event.detail.paintingID;

    const response = await fetch(
      `https://gallery-auction.herokuapp.com/paintings/${paintID}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: $tokenInfo,
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      $paintStore = $paintStore.filter((paint) => paint.id !== paintID);
      console.log('success');
    } else {
      const { message } = await response.json();
      error = message;
    }
  };

  const updateBid = async (event) => {
    const paintingID = event.detail.paintingID;

    updatingPaint = $paintStore.find((paint) => paint.id === paintingID);
  };

  const updateAuction = async (e) => {
    const bidID = e.detail.paintId;

    const body = {
      name: e.detail.paintName,
      description: e.detail.description,
      auctionEenDate: e.detail.endTime,
    };
    const response = await fetch(
      `https://gallery-auction.herokuapp.com/paintings/${bidID}/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: $tokenInfo,
        },
        body: JSON.stringify(body),
      }
    );
    if (response.status >= 200 && response.status < 300) {
      $paintStore = $paintStore.map((paint) => {
        if (paint.id === bidID) {
          return (paint = {
            ...paint,
            name: e.detail.paintName,
            description: e.detail.description,
            auctionEenDate: e.detail.endTime,
          });
        } else {
          return paint;
        }
      });
    } else {
      const { message } = await response.json();
      error = message;
    }
  };

  const addAuction = async (e) => {
    const body = {
      name: e.detail.paintName,
      description: e.detail.description,
      auctionEenDate: e.detail.endTime,
    };
    const response = await fetch(
      `https://gallery-auction.herokuapp.com/paintings`,
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
      const newPaint = await response.json();
      $paintStore = [...$paintStore, newPaint];
    } else {
      const { message } = await response.json();
      error = message;
    }
  };
</script>

<div class="bidBidPage">
  <div class="details">
    <h1>Admin</h1>
    <i class="fas fa-user fa-7x" />
  </div>
  <div class="bidList">
    <h1>Current Auctions</h1>
    <AuctionTable
      on:delete={deletePaint}
      on:update={updateBid}
      paintings={$paintStore}
    />
    <AuctionForm
      painting={updatingPaint}
      on:update={updateAuction}
      on:add={addAuction}
    />
  </div>
</div>

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
  }

  .bidBidPage {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    padding: 50px;
  }

  .details {
    flex: 1 1 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  span {
    font-size: 30px;
    color: #010a5e;
  }

  .bidList {
    flex: 3 1 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
