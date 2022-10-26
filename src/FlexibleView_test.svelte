<script>
    import { writable  } from 'svelte/store'
    import { ViewList , ViewBox } from './stores.js'
    import BoxView from './BoxView.svelte'
    import {onMount, beforeUpdate, afterUpdate,onDestroy} from 'svelte'
    import { createEventDispatcher } from "svelte";    

    export let View =  writable({});

    export let Child_V1 = {};
    export let Child_V2 = {};  

    export let Total_Width  = '0%';
    export let Total_Height = '0%';

    const dispatchChildRemove = createEventDispatcher();
    const dispatchChildParent = createEventDispatcher();

    const dispatchSpliteChild  = createEventDispatcher();
    const dispatchSpliteParent = createEventDispatcher();

    console.log('----------------------------------------------');
    console.log('View Init Start');
    console.log('----------------------------------------------');    
    console.log(View);
    console.log(View.Index);
    console.log('----------------------------------------------');

    for(let i = 0; i < $ViewList.length; i++)
    {
        if(View.V1 === $ViewList[i].Index){            
            Child_V1 = $ViewList[i];
            console.log(`Set Complete V1 ${View.V1}`);                
        }

        if(View.V2 === $ViewList[i].Index){          
            Child_V2 = $ViewList[i];
            console.log(`Set Complete V2 ${View.V2}`);
        }
    }
    /*
    ViewList.subscribe(value => {
        console.log('====Subscribe-Start===');
        console.log(View);
        console.log(value);        
        
        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(`Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(`Set Complete End ${View.V2}`);
            }
        }

        console.log('====Subscribe-End===');		  
    });    
    */
    /*    
    onMount(()=>{   
        console.log('----------------------------------------------');
        console.log('onMount');
        console.log(View);  
        console.log(View.Index);  
        console.log($ViewList);       
        
        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(`Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(`Set Complete V2 ${View.V2}`);
            }
        }
        console.log('----------------------------------------------');
    })
    */
 
    onMount(()=>{   

        let ResizeID;
        let ResizeEM;

        console.log('----------------------------------------------');
        console.log('OnMount Start ');
        console.log('----------------------------------------------');
        console.log(View);  
        console.log(View.Index);

        console.log('----------------------------------------------');
        console.log('OnMount Start ');
        console.log('----------------------------------------------');
    })
  
   /*
    afterUpdate(async() => {
        console.log('----------------------------------------------');
        console.log('AfterUpdate Start ');
        console.log('----------------------------------------------');
        console.log(View);  
        console.log(View.Index);
        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(`AfterUpdate Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(`AfterUpdate Set Complete End ${View.V2}`);
            }
        }
        console.log('----------------------------------------------');
        console.log('AfterUpdate Start ');
        console.log('----------------------------------------------');     
    })
    */
    beforeUpdate(async() => {

        let ResizeID;
        let ResizeEM;

        console.log('----------------------------------------------');
        console.log('beforeUpdate Start ');
        console.log('----------------------------------------------');
        
        console.log(View);  
        console.log(View.Index);
        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(`beforeUpdate Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(`beforeUpdate Set Complete V2 ${View.V2}`);
            }
        }
        
        ResizeID = `R${View.Index}`;
        console.log(ResizeID); 
        
        const item = document.getElementById(ResizeID);
        if(item)
        {
            item.removeEventListener("drag",    DragProcess);
            item.removeEventListener("dragend", DragProcess);        

            item.addEventListener("drag",       DragProcess);
            item.addEventListener("dragend",    DragProcess);            
        }
        console.log(item);

        console.log('----------------------------------------------');
        console.log('beforeUpdate End ');
        console.log('----------------------------------------------');     
    })
    
    const ReSizeElement = null

    /*
    afterUpdate(async() => {
        let ResizeID = '';

	    console.log('----------------------------------------------');
        console.log('afterUpdate');
        console.log(View);  
        console.log(View.Index);  
        console.log($ViewList);  

        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(`Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(`Set Complete V2 ${View.V2}`);
            }
        }
  
        
        ResizeID = `R${View.Index}`;
        console.log(ResizeID);         
       
        const item = document.getElementById(ResizeID);
       
        item.removeEventListener("drag", DragProcess);
        item.removeEventListener("dragend", DragProcess);        
        
        item.addEventListener("drag",    DragProcess);
        item.addEventListener("dragend", DragProcess);
 

        console.log('----------------------------------------------');
    })
    */

    onDestroy(async() => {() => console.log(`onDestroy ${View}`);}   );

    function DragProcess(e)
    {
        let ParentElement;
        let Element;

        let V1V, V2V;  

        let V1E, V2E;       
        
        let V1HRatio, V2HRatio;    

        let V1_Width, V2_Width;


        let V1VRatio, V2VRatio;
        

        let V1_Height, V2_Height;
     

        ParentElement = document.getElementById(View.Index);   
        Element = document.getElementById(`R${View.Index}`);

        console.log('----------------------------------------------');
        console.log('DragProcess');
        console.log(e);
        console.log('----------------------------------------------');
        console.log(ParentElement.clientHeight);  
        console.log(e.clientY);

        V1E = document.getElementById(View.V1);
        V2E = document.getElementById(View.V2);

        V1V = GetViewFromList(View.V1);
        V2V = GetViewFromList(View.V2);

        if(View.Type === 'H')
        {
            V1_Width = e.clientX - ParentElement.getBoundingClientRect().left;
            V2_Width = ParentElement.clientWidth - V1_Width - 6;
           
            console.log('DragProcess 1');

            V1E.style.setProperty('width', V1_Width + 'px');
            V2E.style.setProperty('width', V2_Width + 'px');
           
            console.log('DragProcess 2');

            V1HRatio = (((e.clientX - ParentElement.getBoundingClientRect().left + 3) / (ParentElement.clientWidth)) * 100).toFixed(2);

            V2HRatio = (100 - V1HRatio).toFixed(2);  


            console.log('DragProcess 3');
            if(e.type == "dragend")
            {
                Child_V1.HRatio = V1HRatio +'%'; 
                Child_V2.HRatio = V2HRatio +'%';
            }
            console.log('DragProcess 4');
        

            console.log(V1_Width, V2_Width);
            console.log(V1HRatio+'%', V2HRatio+'%');
        }
        else if(View.Type === 'V')
        {
            V1_Height = e.clientY - ParentElement.getBoundingClientRect().top;        
            V2_Height = ParentElement.clientHeight  - V1_Height - 6;

            V1E.style.setProperty('height', V1_Height + 'px');     
            V2E.style.setProperty('height', V2_Height + 'px');

            V1VRatio = ((( e.clientY - ParentElement.getBoundingClientRect().top  +  3) / (ParentElement.clientHeight)) * 100).toFixed(2);
            V2VRatio = (100 - V1VRatio).toFixed(2);

            if(e.type == "dragend")
            {
                Child_V1.VRatio = V1VRatio +'%'; 
                Child_V2.VRatio = V2VRatio +'%';
            }
            
            /*
            Child_V1.VRatio = V1VRatio +'%'; 
            Child_V2.VRatio = V2VRatio +'%';
            */

            console.log(V1_Height,  V2_Height);
            console.log(V1VRatio+'%', V2VRatio+'%');
        }

        

        console.log('----------------------------------------------');
    }    

    function GetViewFromList(Index){
      let ResultView  = {};

      for(let i = 0; i < $ViewList.length; i++){

        if($ViewList[i].Index == Index){            
            ResultView = $ViewList[i];
            break;
        }
      }

      return ResultView;
    }  
    const EventRemoveParent = event => {

        let ParentView;

        let RemovedView;
        let PairView;
        
        console.log(`Parent::Remove [${event.detail}] V1:${View.V1} V2:${View.V2}`);       

        RemovedView = GetViewFromList(event.detail);        
        ParentView  = GetViewFromList(RemovedView.PID);

        console.log(RemovedView);
        console.log(ParentView);
        console.log(View);                        

        if(ParentView.V1 === RemovedView.Index){
            PairView = GetViewFromList(ParentView.V2);
        }else{
            PairView = GetViewFromList(ParentView.V1);
        }

        PairView.PID     = ParentView.PID;
        PairView.HRatio  = ParentView.HRatio;
        PairView.VRatio  = ParentView.VRatio;

        PairView.Display = 'block';
        PairView.Type    = 'N';

        if(View.V1 === ParentView.Index){
            View.V1 = PairView.Index;
        }else{
            View.V2 = PairView.Index;
        }

        for(let i =0; i<$ViewList.length; i++){
            if(RemovedView.Index === $ViewList[i].Index ){
                $ViewList.splice(i, 1);
                console.log(`Parent::Removed1 [${RemovedView.Index}]`);  
                break;
            }
        }
        
        for(let i =0; i<$ViewList.length; i++){
            if(ParentView.Index === $ViewList[i].Index ){
                $ViewList.splice(i, 1);
                console.log(`Parent::Removed2 [${ParentView.Index}]`);  
                break;
            }
        }

        Object.freeze(RemovedView);
        Object.freeze(ParentView);

        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(`Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(`Set Complete V2 ${View.V2}`);
            }
        }         
    }
    const EventRemoveChild = event => {

        let RemovedView;
        let PairView;
        
        let V1;
        let V2;
        
        console.log(`Child::Remove [${event.detail}] V1:${View.V1} V2:${View.V2}`);
        
        if( (View.V1 === event.detail) || (View.V2 === event.detail))
        {   
            console.log(`Child::Remove Start`);

            RemovedView = GetViewFromList(event.detail);

            if(View.V1 === RemovedView.Index){
                PairView = GetViewFromList(View.V2);
            }else{
                PairView = GetViewFromList(View.V1);
            }

            if(PairView.Type === 'N')
            {
                console.log(`Child::PairView Type == N`);

                dispatchChildParent('RemoveParent', event.detail);
            }else
            {
                console.log(`Child::PairView Type != N`);
                V1 = GetViewFromList(PairView.V1);
                V2 = GetViewFromList(PairView.V2);

                V1.PID = View.Index;
                V2.PID = View.Index;

                if(PairView.Type ==='H'){
                    V1.VRatio = '100%';
                    V2.VRatio = '100%';

                }else{
                    V1.HRatio = '100%';
                    V2.HRatio = '100%';
                }

                View.Type = PairView.Type;
                View.V1 = PairView.V1;
                View.V2 = PairView.V2;
                View.Display =  PairView.Display;                


                for(let i =0; i<$ViewList.length; i++){
                    if(RemovedView.Index === $ViewList[i].Index ){
                        $ViewList.splice(i, 1);
                        console.log(`Child::Removed1 [${RemovedView.Index}]`);  
                        break;
                    }
                }

                for(let i =0; i<$ViewList.length; i++){
                    if(PairView.Index === $ViewList[i].Index ){
                        $ViewList.splice(i, 1);
                        console.log(`Child::Removed2 [${PairView.Index}]`);  
                        break;
                    }
                }
        
                Object.freeze(RemovedView);
                Object.freeze(PairView);
                
                for(let i = 0; i < $ViewList.length; i++)
                {
                    if(View.V1 === $ViewList[i].Index){            
                    Child_V1 = $ViewList[i];
                    console.log(`Set Complete V1 ${View.V1}`);                
                    }

                    if(View.V2 === $ViewList[i].Index){          
                        Child_V2 = $ViewList[i];
                        console.log(`Set Complete V2 ${View.V2}`);
                    }
                }

                console.log($ViewList);
            }    
            
            console.log(`Child::Remove End`);
        }
    }    
    const removeButtonClick = event => {
        dispatchChildRemove('RemoveChild', event.detail);
    }  
 
    const EventSpliteParent = event => {
        
      

        console.log(`Parent::SpliteParent End [${event.detail}] V1:${View.V1} V2:${View.V2}`);   
    }  
    function SpliteChildView(Index){

        let SpliteView;
        let ParentView;
        let New_ParentView;
        let New_V2;
        let LastIndex = 0;   
        let SpliteViewElement;

        console.log('============================================');
        console.log(`Child::Splite Start [${Index}] V:${View.Index} V1:${View.V1} V2:${View.V2}`); 
        console.log('============================================');

        SpliteView = GetViewFromList(Index);
        ParentView = GetViewFromList(SpliteView.PID);

        //LastIndex = $ViewList[($ViewList.length-1)].Index;
        LastIndex = getLastIndex();   
        
        //console.log('LastIndex');
        //console.log(LastIndex);

        New_ParentView =  new ViewBox(++LastIndex, SpliteView.PID);
        New_ParentView.Title = New_ParentView.Index.toString();

        if(ParentView.V1 === SpliteView.Index){
            ParentView.V1 = New_ParentView.Index;        
        }else{
            ParentView.V2 = New_ParentView.Index;
        }
        New_ParentView.HRatio = SpliteView.HRatio;
        New_ParentView.VRatio = SpliteView.VRatio;
       

        SpliteViewElement = document.getElementById(SpliteView.Index);

        New_V2 =  new ViewBox(New_ParentView.Index + 1, New_ParentView.Index);
        SpliteView.PID = New_ParentView.Index;
        SpliteView.Type = 'N';
        SpliteView.HRatio = '100%';
        SpliteView.VRatio = '100%';
        SpliteView.Display = 'Block';
        SpliteView.V1 = -1;
        SpliteView.V2 = -1;
        SpliteView.Title = SpliteView.Index.toString();

        New_V2.Type = 'N';
        New_V2.HRatio = '100%';
        New_V2.VRatio = '100%';
        New_V2.Display = 'Block';
        New_V2.V1 = -1;  
        New_V2.V2 = -1;  
        New_V2.Title = New_V2.Index.toString();

        New_ParentView.V1 = SpliteView.Index;
        New_ParentView.V2 = New_V2.Index;       
        
        if(SpliteViewElement){
            if(SpliteViewElement.clientWidth >= SpliteViewElement.clientHeight){ 
                New_ParentView.Type = 'H';
                New_ParentView.Display = 'inline-flex';

                SpliteView.HRatio = '50%';
                New_V2.HRatio = '50%';
            } 
            else{
                New_ParentView.Type = 'V';
                New_ParentView.Display = 'Block';

                SpliteView.VRatio = '50%';
                New_V2.VRatio = '50%'; 
            }
        }   

        $ViewList.push(New_ParentView);   
        $ViewList.push(New_V2);

        //$ViewList = $ViewList;

        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(Child_V1);     
                console.log(`Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(Child_V2); 
                console.log(`Set Complete V2 ${View.V2}`);
            }
        }

        console.log($ViewList);
        console.log(`Child::Splite End [${Index}] V:${View.Index} V1:${View.V1} V2:${View.V2}`);
    }
    const EventSpliteChild = event => {   
        SpliteChildView(event.detail);        
    }
    const spliteButtonClick = event => {       
        console.log(`spliteButtonClick ${event.detail}`);
        console.log(View);
      

        
        dispatchSpliteChild('SpliteChild', event.detail);
    } 
    
    const EventDialogDragStart = event =>{
        console.log(`EventDialogDragStart`);
        console.log(`EventDialogDragStart ${event.detail}`);
    }
    console.log('----------------------------------------------');
    console.log('View Init End');
    console.log('----------------------------------------------');    

</script>
        {#if View}    
        <div id = {View.Index}
            class="divCanvas" 
            style= "width: {Total_Width}; height:{Total_Height}; display:{View.Display}">              
            {#if      View.Type === 'H'}

                <svelte:self bind:View={Child_V1} {ViewList} Total_Width = "calc({Child_V1.HRatio} - 3px)" Total_Height = "100%" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent}></svelte:self> 
                <div id = "R{View.Index}"  class = "divResize" style= "width: 6px; min-width: 6px; height:{Child_V1.VRatio}" draggable="true"  ></div>
                <svelte:self bind:View={Child_V2} {ViewList} Total_Width = "calc({Child_V2.HRatio} - 3px)" Total_Height = "100%" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent}></svelte:self>     

            {:else if View.Type === 'V'}

                <svelte:self bind:View={Child_V1} {ViewList} Total_Width = "100%" Total_Height = "calc({Child_V1.VRatio} - 3px)" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent}></svelte:self> 
                <div id = "R{View.Index}" class = "divResize" style= "width:{Child_V1.HRatio}  height:6px; min-height: 6px;" draggable="true" ></div>
                <svelte:self bind:View={Child_V2} {ViewList} Total_Width = "100%" Total_Height = "calc({Child_V2.VRatio} - 3px)" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent}></svelte:self>     
            {:else}
                <BoxView bind:Index ={View.Index} on:spliteClick={spliteButtonClick} on:removeClick={removeButtonClick} on:DialogDragStart={EventDialogDragStart} ></BoxView> 
                <!-- <BoxView bind:Index ={View.Index} on:spliteClick on:removeClick></BoxView>  -->
            
            {/if}
        </div>  
        {/if}


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
    .divResize:hover{
        /*cursor: w-resize;*/
        background-color: skyblue;
    }  
   
</style>