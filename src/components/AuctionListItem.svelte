<script>


</script>


<style>

    * {
        box-sizing: border-box;
    }
    .auction__item{
        display: flex;
        flex-direction: column;
        background-color: #f3e7e5;

        justify-content: center;
        border-radius: 10px;
        overflow: hidden;

    }

    .auctionItem__detail__container{
        padding: 10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .auctionItem__detail{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        font-size: 20px;
        margin-top: 20px;
    }

    .auctionItem__detail ul:first-of-type{
        color: gray;
    }
    .auctionItem__detail ul:last-of-type{
        font-weight: 700;

    }


    .auctionItem__img{
        max-width: 100%;
        height: 300px;
    }

    .auctionBtn{
        border: 1px solid #010a5e;
        border-radius: 10px;
        text-decoration: none;
        color: #010a5e;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 40px;
        margin: 20px 0;
        background-color: rgba(255,255,255, 0.2);
        transition: all 0.2s linear;;
    }

    .auctionBtn:hover {
        background-color: #010a5e;
        color: #fff;
        border: solid 3px #fff;

    }
</style>

<div class="auction__item">
    <img class="auctionItem__img" src="http://source.unsplash.com/random/" alt="">
    <div class="auctionItem__detail__container">
        <span>auctionItem__name</span>
        <div class="auctionItem__detail">
            <ul>
                <li>Last bid price</li>
                <li>Due Time</li>
            </ul>
            <ul>
                <li class="auctionItem__lastbid">$10</li>
                <li class="auctionItem__duedate">2d 3h</li>
            </ul>
        </div>
        <a class="auctionBtn" href="#">Bid</a>
    </div>
</div>