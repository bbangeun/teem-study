<script>
    import { writable } from 'svelte/store'
    import BoxView from './BoxView.svelte'

    export let View;
</script>

    <div class=divCanvas style="width:{View.Ratio}">                            
        {#if View.Type === 'H'}                 
        {:else if View.Type === 'V'}
        {/if}
    </div>

<style>      
    .divCanvas{
        background-color: blue;         
        /*width:      100%;*/
        height:     calc(100% - 10px);        
    } 
   
</style>