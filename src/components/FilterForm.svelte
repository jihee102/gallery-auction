<script>
    import { createEventDispatcher} from 'svelte';

    let price;
    let size;
    let name;
    const dispatch = createEventDispatcher();

    const searchCondition = async (e)=>{
        e.preventDefault();
        dispatch("search", {price: price, size:size, name:name});
        console.log(price,size,name)
    }





</script>

<style>
    .filter-condition{
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        min-height: 50px;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 0;
    }

    select{
        border: none;
        background-color: seashell;
        height: 30px;
        border-radius: 5px;

    }

    label{
        font-weight: bold;
        color: #555555;
    }

    button{
        display: block;
        background-color: #010a5e;
        color: white;
        font-size: 15px;
        transition: all 0.2s linear;
        cursor:pointer;
        height: 35px;
        border: 1px #333333 solid;
        border-radius: 10px;
        margin:0 auto 20px;
        width: 20%;
    }

    button:hover{
        background-color: #f3e7e5;
        color: #010a5e;
        font-weight: bold;
        border: solid 3px #f3e7e5;
    }

</style>

<form>
    <div class="filter-condition">
    <div class="price-filter">
        <label for="price">Choose a price:</label>
        <select id="price"  bind:value={price}>
            <option value="none"></option>
            <option value="hTol">high-low</option>
            <option value="lToh">low-high</option>
            <option value="less">less than 60,000,000</option>
            <option value="more">more than  60,000,000</option>
        </select>
    </div>
    <div class="size-filter">
        <label for="size">Choose a size:</label>
        <select id="size" bind:value={size}>
            <option value="none"></option>
            <option value="less5">less than 5m2</option>
            <option value="more5">more than 5m2</option>

        </select>
    </div>
    <div class="name-filter">
        <label for="name">Choose a name:</label>
        <select id="name" bind:value={name}>
            <option value="none"></option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>

        </select>
    </div>
    </div>
    <button  on:click={searchCondition}>Search</button>
</form>