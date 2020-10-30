<script>
    import { createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    let searchedPaint;
    let searchKeyword;
    let error;

    const searchPaint = async (e)=>{
        e.preventDefault();
        dispatch("search", {search: searchKeyword});
        searchKeyword = '';

    }


</script>

<style>
    div{
        text-align: center;
        margin-bottom: 100px;
    }

    input[type="text"]{
        width: 40%;
        height: 30px;
        border: #010a5e 1px dotted;
        outline: none;
    }

    button{
        height: 35px;
        width: 50px;
        background-color: #010a5e;
        color: #fff;
        margin: 0;
        border: none;
        border-radius: 5px;
    }

</style>

<div>
    <input type="text" placeholder="Search paint name.." bind:value={searchKeyword}>
    <button on:click={searchPaint}><i class="fa fa-search"></i></button>
</div>
