<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 100%;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	header{
		display: flex;
		align-items: center;
		padding: 20px;
	}
	div{
		display: block;
		height: 30px;
		background-color: #f3e7e5;
		width: 100%;
		text-align: center;
		color: #010a5e;
	}
	span{
		flex: 0 1 20%;
		font-size: 25px;
		color: #010a5e;
		font-weight: bold;
		padding: 10px;
	}

	Nav{
		flex: 1 2 80%;
	}

	@media screen and (max-width: 800px){
		header{
			flex-direction: column;
		}

	}

</style>
<div>Welcome to Auction Gallery!</div>
<header>
<span>Auction Gallery</span>
<Nav {segment}/>
</header>

<main>
	<slot></slot>
</main>