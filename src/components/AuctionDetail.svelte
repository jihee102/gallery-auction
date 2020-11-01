<script>
    export let painting;

</script>


<style>

    * {
        box-sizing: border-box;
    }

    h2{
        margin-bottom: 50px;
        font-weight: bold;
        color: #010a5e;
        font-size: 25px;
    }

    h3{
        font-weight: bold;
        color: #555555;
        font-size: 15px;
    }
    .auction__item{
        display: flex;
        background-color: #f3e7e5;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 10px;
        overflow: hidden;
        padding-top: 50px;
        width: 75%;
        margin: 0 auto;
    }
    img{

        flex-basis: 50%;
    }

    .auctionItem__detail__container{
        flex-basis: 50%;
        width: 100%;
        margin: 0 auto;
    }

    .auctionItem__detail{
        display: flex;
        min-height: 300px;
        flex-direction: column;
        justify-content: space-between;
    }



    .auctionItem__img{
        min-width: 300px;
        max-width: 300px;
        height: 300px;
        margin: 0 auto;
        border-radius: 50%;
    }

    p{
        margin: 50px 0 50px;
    }

</style>


<div class="auction__item">
    <img class="auctionItem__img" src={painting.image} alt="img">
    <div class="auctionItem__detail__container">
        <div class="auctionItem__detail">
            <div>
                <h2>{painting.name}</h2>
            </div>
            <div>
                <h3>Value of this paint</h3>
                <span>${painting.value}</span>
            </div>
            <div>
                <h3>Auction end date</h3>
                <span>{painting.auctionEenDate}</span>
            </div>
            <div>
                <h3>Size</h3>
                <span>{painting.size}m2</span>
            </div>

        </div>
        <p>
            {painting.description}
        </p>
    </div>
</div>
