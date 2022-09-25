<script>
    import { writable  } from 'svelte/store'
    import { ViewList } from './stores.js'
    import BoxView from './BoxView.svelte'
    import {onMount} from 'svelte'

    export let View =  writable({});
    //export let ViewList;        

 
    export let Child_V1 = {};
    export let Child_V2 = {};
  

    export let Total_Width  = '0%';
    export let Total_Height = '0%';

    ViewList.subscribe(value => {
        console.log('====subscribe-F===');
        console.log(value);
        console.log('====subscribe-F===');
        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(`Set Complete V1 ${Child_V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(`Set Complete End ${Child_V2}`);
            }
        }		  
    });

    
    /*
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
    */

  
    console.log('----------------------------------------------');
    console.log(View.Index);  
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

    <!-- 부모 일경우 -->

    <!-- 부모가 아닐 경우 -->
    <div id = {View.Index}
         class="divCanvas" 
         style= "width: {Total_Width}; height:{Total_Height}; display:{View.Display}">              
         {#if      View.Type === 'H'}

            <svelte:self bind:View={Child_V1} {ViewList} Total_Width = "calc({Child_V1.HRatio} - 5px)" Total_Height = "100%"></svelte:self> 
            <div class = "divResize" style= "width: 10px; min-width: 10px; height:{Child_V1.VRatio}" ></div>
            <svelte:self bind:View={Child_V2} {ViewList} Total_Width = "calc({Child_V2.HRatio} - 5px)" Total_Height = "100%"></svelte:self>     

            <!--
            <svelte:self View={Child_V1} {ViewList} Total_Width = "40%" Total_Height = "100%"></svelte:self> 
            <div class = "divResize" style= "width: 10px; min-width: 10px; height:{Child_V1.VRatio}" ></div>
            <svelte:self View={Child_V2} {ViewList} Total_Width = "50%" Total_Height = "100%"></svelte:self>     
            -->

         {:else if View.Type === 'V'}
            <svelte:self bind:View={Child_V1} {ViewList} Total_Width = "100%" Total_Height = "calc({Child_V1.VRatio} - 5px)"></svelte:self> 
            <div class = "divResize" style= "width:{Child_V1.HRatio}  height:10px; min-height: 10px;" ></div>
            <svelte:self bind:View={Child_V2} {ViewList} Total_Width = "100%" Total_Height = "calc({Child_V2.VRatio} - 5px)"></svelte:self>     
         {:else}
            <BoxView bind:ID ={View.Title}></BoxView> 
         {/if}
    </div>    

    



<!--
    <div class="divCanvas" 
        style= "width: calc({View.HRatio} - 10px + {View.Offset}); height:{View.VRatio};  display:{View.Display}">    
        {#if (View.V1 === -1) && (View.V2 === -1)}                
            <BoxView ID ={View.Index}></BoxView>            
        {:else if (View.V1 > 0) && (View.V2 > 0)}                 
            {#if ((Child_V1.Index > 0) && (Child_V2.Index > 0)) }         
                <svelte:self View={Child_V1} {ViewList}></svelte:self>         
                    {#if (View.Type === 'H')}
                        <div class = "divResize" style= "width: 10px; min-width: 10px; height:{Child_V1.VRatio}" ></div>
                    {:else if (View.Type === 'V') }
                        <div class = "divResize" style= "height:10px; min-height: 10px; width:{Child_V1.HRatio}" ></div>
                    {/if}                    
                <svelte:self View={Child_V2} {ViewList}></svelte:self> 
            {/if}
        {:else}
            <div>GoodBye!!</div>        
        {/if}
    </div>
-->

<style>      
    .divCanvas{
        background-color: blue;   
        /* display: inline-flex;              */
        /*width:      100%;*/
        /* height: calc(100% - 10px);         */
    }     
    .divResize{        
        background-color: black;                                                 
    }     
</style>