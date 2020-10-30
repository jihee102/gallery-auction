<script>
	import {onMount} from "svelte";
	import SearchBar from "../components/SearchBar.svelte";
	import AuctionList from "../components/AuctionList.svelte";

	let error;
	let paintings = [];
	let searchPainting = [];

	onMount(() => {
		getPaintings();
	})

	const getPaintings = async () => {
		const response = await fetch('http://localhost:3000/paintings', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 200) {
			const json = await response.json();
			paintings = [...json];
		}
		error = await response.json();

	}

	const handleSearching = async (event)=>{
		const searchKeyword = event.detail.search;
		if(searchKeyword !== undefined){
		    const response = await fetch(`http://localhost:3000/paintings/search?name=${searchKeyword}`, {
		        method: "GET",
		        headers: {
		            'Content-Type': 'application/json',
		        },
		    });

		    if (response.status === 200) {
		        const json = await response.json();
				searchPainting= [...json];

		    }else{
		        error = await response.json();
		    }
		}else{
		    alert("Please enter a word to search.")
		}
	}

	const backToMain = ()=>{
		searchPainting = [];
	}


</script>
<style>
	h1{
		text-align: center;
		margin: 0 auto;
	}

	button{
		position: absolute;
		top: 170px;
		right: 50%;
		background-color:#010a5e ;
		border-radius: 5px;
		border: 1px #333 solid;
		height: 50px;
		width: 10%;
		min-width: 100px;
		color: #fff;
		transform: translateX(50%);
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Auction Gallery</title>
</svelte:head>

<h1>Auction List</h1>
<SearchBar on:search={handleSearching} />

{#if searchPainting.length > 0}
	<AuctionList paintings={searchPainting} />
	<button on:click = {backToMain}>Back</button>

{:else}
<AuctionList paintings={paintings} />
{/if}
