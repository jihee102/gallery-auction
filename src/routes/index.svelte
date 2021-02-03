<script>
  import { onMount } from 'svelte';
  import { paintStore } from '../auctionStorage.js';
  import SearchBar from '../components/SearchBar.svelte';
  import AuctionList from '../components/AuctionList.svelte';
  import FilterForm from '../components/FilterForm.svelte';

  let error;
  let searchPainting = [];
  let filterSearch = false;
  let filterPainting = [];

  onMount(() => {
    getPaintings();
  });

  const getPaintings = async () => {
    const response = await fetch(
      'https://gallery-auction.herokuapp.com/paintings',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      const json = await response.json();
      $paintStore = [...json];
    } else {
      error = await response.json();
    }
  };

  const handleSearching = async (event) => {
    const searchKeyword = event.detail.search;
    if (searchKeyword !== undefined) {
      const response = await fetch(
        `https://gallery-auction.herokuapp.com/paintings/paint?name=${searchKeyword}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const json = await response.json();
        searchPainting = [...json];
      } else {
        error = await response.json();
      }
    } else {
      alert('Please enter a word to search.');
    }
  };

  const backToMain = () => {
    searchPainting = [];
    filterPainting = [];
  };

  const searchCondition = async (e) => {
    let priceValue = e.detail.price;
    let sizeValue = e.detail.size;
    let nameValue = e.detail.name;
    console.log(priceValue, sizeValue, nameValue);
    filterPainting = [...$paintStore];

    // If price is defined, filter the painting list according to the condition
    if (priceValue !== 'none') {
      switch (priceValue) {
        case 'hTol':
          filterPainting = filterPainting.sort((a, b) => b.value - a.value);
          break;
        case 'lToh':
          filterPainting = filterPainting.sort((a, b) => a.value - b.value);
          break;
        case 'less':
          filterPainting = filterPainting.filter(
            (paint) => Number(paint.value) < 60000000
          );
          break;
        case 'more':
          filterPainting = filterPainting.filter(
            (paint) => Number(paint.value) >= 60000000
          );
          break;
      }
    }

    // If size is defined, filter the painting list according to the condition
    if (sizeValue !== 'none') {
      switch (sizeValue) {
        case 'less5':
          filterPainting = filterPainting.filter(
            (paint) => Number(paint.size) < 5
          );
          break;
        case 'more5':
          filterPainting = filterPainting.filter(
            (paint) => Number(paint.size) >= 5
          );
          break;
      }
    }

    // If name order is defined, filter the painting list according to the condition
    if (nameValue !== 'none') {
      switch (nameValue) {
        // ascending alphabetical order
        case 'az':
          filterPainting = filterPainting.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        // descending alphabetical order
        case 'za':
          filterPainting = filterPainting.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
      }
    }
    console.log(filterPainting);
  };

  const handleFiltering = async (e) => {
    filterSearch = e.detail.filter;
  };
</script>

<svelte:head>
  <title>Auction Gallery</title>
</svelte:head>

<h1>Auction List</h1>
<SearchBar on:search={handleSearching} on:filter={handleFiltering} />
<div class={filterSearch ? 'filterForm active' : 'filterForm'}>
  <FilterForm on:search={searchCondition} />
</div>

{#if searchPainting.length > 0}
  <AuctionList paintings={searchPainting} />
  <button on:click={backToMain}>Back</button>
{:else if filterPainting.length > 0}
  <AuctionList paintings={filterPainting} />
  <button on:click={backToMain}>Back</button>
{:else}
  <AuctionList paintings={$paintStore} />
{/if}

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
    z-index: 1;
  }

  button {
    position: absolute;
    bottom: 20px;
    right: 50%;
    background-color: #010a5e;
    border-radius: 50%;
    border: 1px #333 solid;
    height: 50px;
    width: 50px;
    cursor: pointer;
    opacity: 0.9;
    color: #fff;
    transform: translateX(50%);
  }

  .filterForm {
    width: 45%;
    z-index: -100;
    min-width: 300px;
    border: #f3e7e5 5px double;
    border-radius: 10px;
    margin: 20px auto;
    transform: translateY(-30%);
    display: none;
    transition: transform 1s ease-in;
  }

  .filterForm.active {
    display: block;
    transform: translateY(0);
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
