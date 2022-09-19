<script>
    import { writable } from 'svelte/store'
    import BoxView from './BoxView.svelte'
    import {onMount} from 'svelte'

    export let View;   
    export let ViewList;    

    export let StartView;
    export let EndView;


    console.log('----------------------------------------------');
    console.log(View);    
    console.log(StartView);    
    console.log(EndView);    
    console.log('----------------------------------------------');
    console.log('');

    /*    
    onMount(()=>{
        console.log('Hello World1');
        console.log(View.Index);
        console.log('Hello World2');

        console.log(View.Start, View.End);
        console.log('Hello World3');

        if( (View.Start > 0) && (View.End > 0) )
        {
            StartView = $ViewList[View.Start];
            EndView   = $ViewList[View.End];

            console.log('Hello World4');

            console.log(StartView);

            console.log('Hello World5');
        }
        else
        {
            console.log('View.Start/End == 0');
        }       
    })
    */


    

</script>

    <div class=divCanvas style="width:{View.Ratio}">                                    
        {#if (View.Start === -1) && (View.End === -1)}                
            <BoxView ID ={View.Index} Ratio={'100%'}></BoxView>
            <div>dadadadadaddasdddddddd</div>            
        {:else if (View.Start > 0) && (View.End > 0)} 
            {#if ((StartView.Index > 0) && (EndView.Index > 0)) }         
                <svelte:self View={StartView}, {ViewList}></svelte:self>         
                <div>HELLO</div>        
                <svelte:self View={EndView}, {ViewList}></svelte:self> 
            {/if}
        {:else}
            <div>GoodBye!!</div>        
        {/if}
    </div>

<style>      
    .divCanvas{
        background-color: blue;         
        /*width:      100%;*/
        height:     calc(100% - 10px);        
    } 
   
</style>