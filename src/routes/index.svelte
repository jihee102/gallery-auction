<script>
	import AuctionListItem from "../components/AuctionListItem.svelte";
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
<div class="auctionList">
	<AuctionListItem />
	<AuctionListItem />
	<AuctionListItem />
	<AuctionListItem />
	<AuctionListItem />
</div>
