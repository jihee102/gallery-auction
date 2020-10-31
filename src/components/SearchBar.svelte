<script>
    import {createEventDispatcher} from 'svelte';
    import FilterForm from "./FilterForm.svelte";

    const dispatch = createEventDispatcher();
    let searchedPaint;
    let searchKeyword;
    let error;
    let filterSearch = false;


    const searchPaint = async (e) => {
        e.preventDefault();
        dispatch("search", {search: searchKeyword});
        searchKeyword = '';

    }



    const clicked = (e)=>{
        e.preventDefault();
        filterSearch = !filterSearch;
        dispatch("filter", {filter: filterSearch} );
    }


</script>

<style>
    .search{
        text-align: center;
        margin-bottom: 50px;
    }

    input[type="text"]{
        width: 40%;
        height: 30px;
        border: #010a5e 1px dotted;
        outline: none;
    }

    button{
        height: 35px;
        min-width: 50px;
        background-color: #010a5e;
        color: #fff;
        margin: 0;
        border: none;
        border-radius: 5px;
    }


</style>

<div class="search">
    <input type="text" placeholder="Search paint name.." bind:value={searchKeyword}>
    <button on:click={searchPaint}><i class="fa fa-search"></i></button>
    <button on:click={clicked}>Filter <i class="fas fa-caret-down"></i></button>
</div>


