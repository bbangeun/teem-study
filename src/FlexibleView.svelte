<script>
    import { writable } from 'svelte/store'
    import BoxView from './BoxView.svelte'
    import {onMount} from 'svelte'

    export let View;   
    export let ViewList;        

    export let Child_V1 = {};
    export let Child_V2 = {};   
    
    let V1_Width  = 0;
    let V1_Height = 0;

    let V2_Width  = 0;
    let V2_Height = 0;

    for(let i = 0; i < $ViewList.length; i++){

        if(View.V1 === $ViewList[i].Index){            
            Child_V1 = $ViewList[i];
            console.log(`Set Complete V1 ${Child_V1}`);
            
        }

        if(View.V2 === $ViewList[i].Index){          
            Child_V2 = $ViewList[i];
            console.log(`Set Complete End ${Child_V2}`);
        }
    }

    console.log('----------------------------------------------');
    console.log(View);        
    console.log(Child_V1, Child_V1.Index);    
    console.log(Child_V2, Child_V2.Index );    
    console.log($ViewList);        
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

<!-- <div class=divCanvas style="left: 0px; top: 0px; width:{View.HRatio}; height:{View.VRatio}; " > -->
<div class="divCanvas" style="width: calc({View.HRatio}); height:{View.VRatio};">    
    {#if (View.V1 === -1) && (View.V2 === -1)}                
        <BoxView ID ={View.Index}></BoxView>            
    {:else if (View.V1 > 0) && (View.V2 > 0)} 
        {#if ((Child_V1.Index > 0) && (Child_V2.Index > 0)) }         
            <svelte:self View={Child_V1} {ViewList}></svelte:self>         
            <div class = "divResize" style= "width: 10px; height:{Child_V1.VRatio}" ></div>
            <!-- <div class=divResize style="left: 1000px; top: 0px;  width:10px; height: {View.VRatio}" >HELLO</div>         -->
            <svelte:self View={Child_V2} {ViewList}></svelte:self> 
        {/if}
    {:else}
        <div>GoodBye!!</div>        
    {/if}
</div>

<style>      
    .divCanvas{
        background-color: blue;         
        display: inline-flex;           
        /*width:      100%;*/
        /* height: calc(100% - 10px);         */
    }     
    .divResize{        
        background-color: black;                                         
    }     
</style>