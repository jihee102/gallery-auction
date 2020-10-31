<script>
    export let name;
    export let painter;
    export let auctionEndDate;
    export let image;
    export let value;
    export let creationDate;
    export let auctionStartDate;
    export let description;


</script>


<style>

    * {
        box-sizing: border-box;
    }

    ul{
        list-style: none;
        padding: 0;
    }

    ul li{
        font-size: 18px;
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
        min-width: 300px;
        max-width: 300px;
        height: 300px;
        margin: 0 auto;
        border-radius: 50%;
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
"value" : "10,000,000$",
"creationDate":"18/02/1486",
"size" : "10",
"image":"/images/TheBirthOfVenus.jpg",
"auctionStartDate" : "20/10/2020",
"auctionEenDate" : new Date('11/02/2020 10:1 AM'),
"description"

<div class="auction__item">
    <img class="auctionItem__img" src={image} alt="">
    <div class="auctionItem__detail__container">
        <span>{name}</span>
        <div class="auctionItem__detail">
            <ul>
                auctionEndDate;
                export let image;
                export let value;
                export let creationDate;
                export let auctionStartDate;
                export let description;
                <li>name</li>
                <li>painter</li>
                <li>value</li>
                <li>creation date</li>
                <li>auction start time</li>
                <li>auction end time</li>
                <li>description</li>
            </ul>
            <ul>
                <li class="auctionItem__name">{name}</li>
                <li class="auctionItem__painter">{painter}</li>
                <li class="auctionItem__value">{value}</li>
                <li class="auctionItem__creationDate">{creationDate}</li>
                <li class="auctionItem__startdate">{auctionStartDate}</li>
                <li class="auctionItem__duedate">{auctionEndDate}</li>
                <li class="auctionItem__description">{description}</li>
            </ul>
        </div>
    </div>
</div>