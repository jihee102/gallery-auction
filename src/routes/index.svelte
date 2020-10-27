<script>
	import AuctionListItem from "../components/AuctionListItem.svelte";
	import {onMount} from "svelte";
	import SearchBar from "../components/SearchBar.svelte";

	let error;
	let paintings = [];

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

</script>
<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	.auctionList{
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
		grid-auto-rows: auto;
		width: 100%;
		grid-gap: 30px;
		margin: 0 auto;
		justify-items: center;
		align-items: center;
		height: fit-content;
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
<SearchBar />
<div class="auctionList">
	{#each paintings as paint}
		<AuctionListItem name={paint.name} image={paint.image} auctionEndDate={paint.auctionEenDate}
						 painter={paint.painter} id={paint.id}/>
	{/each}
</div>
