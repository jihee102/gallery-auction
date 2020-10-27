<script>
	export let segment;
</script>

<style>
	nav {
		width: 80%;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		margin: 0 15% 0;
	}

	ul {
		display: flex;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		position: relative;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	li:last-of-type{
		margin-left: 25%;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #010a5e;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'mybid' ? 'page' : undefined}" href="mybid">my bids</a></li>
		<li><a aria-current="{segment === 'admin' ? 'page' : undefined}" href="admin">administration</a></li>
		<li><a aria-current="{segment === 'login' ? 'page' : undefined}" href="login">login</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
	</ul>
</nav>
