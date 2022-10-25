<script>
    import { writable  } from 'svelte/store'
    import { ViewList , ViewBox, g_DragSourceElement } from './stores.js'
    import BoxView from './BoxView.svelte'
    import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte'
    import { createEventDispatcher } from "svelte";    
    import { object_without_properties } from 'svelte/internal'

    export let View =  writable({});
    //export let View = {};
    //export let ViewList;

    export let Child_V1 = {};
    export let Child_V2 = {};  

    export let Total_Width  = '0%';
    export let Total_Height = '0%';

    let g_PreviewType = 'none'

    let TempView = {};
    let IsDragStart = false;

    const dispatchChildRemove = createEventDispatcher();
    const dispatchChildParent = createEventDispatcher();

    const dispatchSpliteChild  = createEventDispatcher();
    const dispatchSpliteParent = createEventDispatcher();

    const dispatchDragStart    = createEventDispatcher();
    const dispatchDragEnd      = createEventDispatcher();

    const dispatchDrop          = createEventDispatcher();

    const dispatchChildDragStart = createEventDispatcher();
    const dispatchChildRollback  = createEventDispatcher();
    const dispatchChildMove      = createEventDispatcher();
    const dispatchChildDrop      = createEventDispatcher();

    

    
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
    console.log('----------------------------------------------');
    console.log('View Init End');    
    console.log('----------------------------------------------');

    /*=======================================================================*/
    // Function Start 
    /*=======================================================================*/
    beforeUpdate(async() => {

        let Resize_Index, Resize_Element;        

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

        Resize_Index = `R${View.Index}`;
        console.log(Resize_Index); 

        Resize_Element = document.getElementById(Resize_Index);
        if(Resize_Element)
        {
            Resize_Element.removeEventListener("drag",    DragProcess);
            Resize_Element.removeEventListener("dragend", DragProcess);        

            Resize_Element.addEventListener("drag",       DragProcess);
            Resize_Element.addEventListener("dragend",    DragProcess);            
        }
        console.log(Resize_Element);

        console.log('----------------------------------------------');
        console.log('beforeUpdate End ');
        console.log('----------------------------------------------');     
    })
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

        console.log(`Child::Splite Start [${Index}] V:${View.Index} V1:${View.V1} V2:${View.V2}`); 

        SpliteView = GetViewFromList(Index);
        ParentView = GetViewFromList(SpliteView.PID);

        LastIndex = $ViewList[($ViewList.length-1)].Index;  

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
    const EventDragStart = (event) => {  

        console.log('EventDragStart');

        //dispatchChildRemove('RemoveChild', event.detail);

        let MoveView;

        let MoveElement, ResizeElement;   
        
        console.log('EventDragStart');

        MoveView = GetViewFromList(event.detail);

        MoveElement   = document.getElementById(MoveView.Index);
        ResizeElement = document.getElementById(`R${View.Index}`);

        //Child_V2.HRatio = '40%';
        MoveElement.style.display   = 'none';  
        ResizeElement.style.display = 'none';          

        console.log(TempView); 
          
    }
    const EventDrop = (event) => {
        let MoveView;

        let MoveElement, ResizeElement;   

        console.log('EventDrop');

        MoveView = GetViewFromList(event.detail);

        MoveElement   = document.getElementById(MoveView.Index);
        ResizeElement = document.getElementById(`R${View.Index}`);

        MoveView.HRatio = '30%';
        //MoveElement.style.display = 'block';  
        ResizeElement.style.display = 'block';          

        console.log(TempView);
    }
    const EventDragEnd = (event) => {
        let MoveView;

        let MoveElement, ResizeElement;   

        console.log('EventDragEnd');

        MoveView = GetViewFromList(event.detail);

        MoveElement   = document.getElementById(MoveView.Index);
        ResizeElement = document.getElementById(`R${View.Index}`);

        MoveView.HRatio = '30%';

        MoveElement.style.display = 'block';  
        ResizeElement.style.display = 'block';          

        console.log(TempView);
    }
    const EventDialogDrag = event => {    
        
        /*
        let MoveElement, ResizeElement;   
        let MoveView = GetViewFromList(View.Index);

        MoveElement   = document.getElementById(MoveView.Index);

        let shiftX = event.clientX - MoveElement.getBoundingClientRect().left;
        let shiftY = event.clientY - MoveElement.getBoundingClientRect().top;
        */

     

        if(event.detail.type === "dragstart")
        {
            /*
            console.log('dragStart');


            MoveElement.style.position = 'absolute';
            MoveElement.style.zIndex = '1000';
            document.body.append(MoveElement);

            console.log('dragEnd');
            */

          

          
            if(IsDragStart===false)
            {
                IsDragStart=true;
            }  
         
            
            //dispatchDragStart('EventDragStart', View.Index);
            //dispatchChildRemove('RemoveChild', View.Index);              
        }   
        else if(event.detail.type === "drag")
        {
            
            /*
            console.log('drag');
            MoveElement.style.left = event.detail.pageX - MoveElement.offsetWidth  / 2 + 'px';
            MoveElement.style.top  = event.detail.pageY - MoveElement.offsetHeight / 2 + 'px';
            */
         
            //MoveElement.style.left ='500px';
            //MoveElement.style.top  = '500px';
           
          
            if(IsDragStart)
            {
                IsDragStart = false;
                dispatchChildRemove('RemoveChild', View.Index);
            }
            else
            {   
                console.log(`EventDrag${View.Index}`);             
            }
      
         
            //console.log('EventDrag');
      
        }
        /*
        else if(event.detail.type === "drop")
        {
            console.log('Eventdrop');

            //dispatchDrop('EventDrop', View.Index);
        }
        else if(event.detail.type === "dragend")
        {
            console.log(`Eventend${View.Index}`);
            console.log($ViewList);
            //dispatchDragEnd('Eventend', View.Index);
        }  
        else
        {
            console.log('Process::Drag Elese');
        }
        */
   
    }        
    const EventChildDragStart = event =>{
        let targetID = '';
        let dragStartEvent;

        console.log(event.detail.detail.Index);  
        console.log(event.detail.detail.Event);  
           
        targetID = event.detail.detail.Index;
        dragStartEvent = event.detail.detail.Event;
        console.log(`EventChildDragStart ID:${targetID}`);
         
        HideDragView(targetID, dragStartEvent);
    }
    const EventChildRollback  = event =>{        
        Rollback(event.detail.detail);
    }
    const EventChildMove = event =>{

        let cloneElement   = null;
        let parentElement  = null;
        let moveIndex = event.detail.detail;

        console.log('====================================================');
        console.log('EventChildMove');
        console.log('====================================================');

        /*
        parentElement = document.getElementById(View.Index);
        cloneElement  = document.getElementById('c'+moveIndex.toString());

        if(parentElement){
            parentElement.style.position = '';
            parentElement.style.display  = View.Display;   
        }else{        
            console.log("parentElement is null");
        }

        if(cloneElement)
        {
            parentElement.removeChild(cloneElement);
        }else{
            console.log("cloneElement is null");
        }      
        console.log(moveIndex);
        ChildMove(moveIndex);
        */
       ChildMove(moveIndex);
        console.log('====================================================');
    }
    const EventChildDrop  = event =>{
        console.log("******************************************");
        dispatchChildDrop('EventChildDrop', event);
    }

    const EventDialogDragStart = event  =>{
        dispatchChildDragStart('EventChildDragStart', event);
    }
    const EventDialogRollback = event  =>{
        dispatchChildRollback('EventChildRollback', event);
    }
    const EventDialogMove = event  =>{
        dispatchChildMove('EventChildMove', event);
    }
    const EventDialogDrop = event  =>{
        dispatchChildDrop('EventChildDrop', event);
    }   

    function GetDragImageElement(sourceElement){
        
        let cloneElement = null;

        cloneElement = sourceElement.cloneNode(true);

        cloneElement.id    = 'c'+sourceElement.id;
        cloneElement.style.width  = sourceElement.style.width;
        cloneElement.style.height = sourceElement.style.height;
        //cloneElement.style.opacity = '100%';
        cloneElement.style.zIndex = 0;

        return cloneElement;
    }
    function HideDragView(dragIndex, event)
    {
        let cloneElement = null;
        let srcElement = null; 
        let parentElement = null;
        let pairElement = null;
        let resizeElement = null;   

        let srcBoxElement  = null;
        let pairBoxElement = null;

        console.log('==============================================');
        console.log('HideDragView Start  ');
        console.log('==============================================');
      
        parentElement = document.getElementById(View.Index);
        srcElement    = document.getElementById(dragIndex);
        cloneElement  = GetDragImageElement(srcElement);
        resizeElement = document.getElementById('R'+View.Index.toString());

           

        parentElement.style.position = "relative"; 
        //parentElement.style.display = "";      
        //parentElement.style.zIndex = 90;
       
        //parentElement.style.display = 'flex';

        parentElement.appendChild(cloneElement);
        
        srcBoxElement = document.getElementById("D"+dragIndex.toString());

       
        if(dragIndex === View.V1)
        {
            pairElement = document.getElementById(View.V2);   
            pairBoxElement = document.getElementById("D"+View.V2.toString());          
        }
        else{
            pairElement = document.getElementById(View.V1); 
            pairBoxElement = document.getElementById("D"+View.V1.toString());           
        }

        srcBoxElement = document.getElementById("D"+dragIndex.toString());

           
        pairElement.style.position = 'absolute'; 
        //pairBoxElement.style.display = ''; //      
        pairElement.style.left  = '0px';
        pairElement.style.top   = '0px';
        pairElement.style.zIndex   = 100;     


        pairElement.style.width  = '100%';
        pairElement.style.height = '100%';
       
        /*
        pairBoxElement.style.position = 'absolute'; 
        //pairBoxElement.style.display = ''; //      
        pairBoxElement.style.left  = '0px';
        pairBoxElement.style.top   = '0px';
        pairBoxElement.style.zIndex   = 90;     
        if(View.Type === 'H')
        {
            pairBoxElement.style.width  = '100%';
        }else
        {
            pairBoxElement.style.height = '100%';
        }
        */
        
        resizeElement.style.display = 'none';

    
        srcElement.style.position = 'absolute';
        //srcElement.style.display = ''; //
   
        srcElement.style.left     = '0px';
        srcElement.style.top      = '0px';
        srcElement.style.width    = '100%';
        srcElement.style.height    = '100%';        
        srcElement.style.opacity  = '0%';
        srcElement.style.zIndex   = 101; 
      

        $g_DragSourceElement = srcElement;


        
        //pairBoxElement.style.zIndex = 100;        
        //srcBoxElement.style.zIndex   = 90; 

        
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setDragImage(cloneElement, 0, 0);

        console.log(parentElement.style);
        console.log(srcElement.style);
        console.log(pairElement.style);
    

        console.log('==============================================');
        console.log('HideDragView End  ');
        console.log('==============================================');
    }
    function Rollback(rollbackIndex){
        
        let parentElement  = null;
        let resizeElement  = null;
        let cloneElement   = null;
        let srcElement     = null;
        let pairElement    = null;
        let srcView, pairView;

        console.log('==============================================');
        console.log('RollBack Start  ');
        console.log('==============================================');

        resizeElement = document.getElementById('R'+View.Index.toString());
        parentElement = document.getElementById(View.Index);
        cloneElement  = document.getElementById('c'+rollbackIndex.toString());
        srcElement    = document.getElementById(rollbackIndex);

        console.log('c' + rollbackIndex  );

        if(parentElement){
            parentElement.style.position = '';
            parentElement.style.display  = View.Display;   
        }else{        
            console.log("parentElement is null");
        }

        if(cloneElement)
        {
            parentElement.removeChild(cloneElement);
        }else{
            console.log("cloneElement is null");
        } 

        if(resizeElement){
            resizeElement.style.display = 'block';
        }else{
            console.log("resizeElement is null");
        }        

        if(rollbackIndex === View.V1)
        {
            pairElement = document.getElementById(View.V2);   
            
            srcView  = Child_V1;
            pairView = Child_V2;
        }
        else{
            pairElement = document.getElementById(View.V1);

            srcView  = Child_V2;
            pairView = Child_V1;
        }

        if(pairElement){
            pairElement.style.position = '';       

            if(View.Type == 'H'){
                pairElement.style.width    = `calc(${pairView.HRatio} - 3px)`;
                pairElement.style.height   = '100%';
            }else if(View.Type == 'V'){
            
                pairElement.style.width    = '100%';
                pairElement.style.height   = `calc(${pairView.VRatio} - 3px)`;

            }else
            {
                pairElement.style.width    = '50%';
                pairElement.style.height   = '50%';
                console.log("View.Type is none");
            }

            pairElement.style.zIndex   = 100;   

        }else{
            console.log("pairElement is null");
        }
        
        if(srcElement)
        {
            srcElement.style.position = '';

            if(View.Type == 'H'){
                srcElement.style.width    = `calc(${srcView.HRatio} - 3px)`;
                srcElement.style.height   = '100%';
            }else if(View.Type == 'V'){
            
                srcElement.style.width    = '100%';
                srcElement.style.height   = `calc(${srcView.VRatio} - 3px)`;;

            }else
            {

                srcElement.style.width    = '50%';
                srcElement.style.height   = '50%';
                console.log("View.Type is none");
            }
    
            srcElement.style.opacity  = '100%';
            srcElement.style.zIndex   = 100; 

        }else{
            console.log("srcElement is null");
        }        

        console.log('==============================================');
        console.log('RollBack End  ');
        console.log('==============================================');
    }
    function ChildMove(removeIndex){
        let RemovedView;
        let PairView;
        
        let V1;
        let V2;
        
        console.log(`Child::Remove [${removeIndex}] V1:${View.V1} V2:${View.V2}`);
        
        if( (View.V1 === removeIndex) || (View.V2 === removeIndex))
        {   
            console.log(`Child::Remove Start`);

            RemovedView = GetViewFromList(removeIndex);

            if(View.V1 === RemovedView.Index){
                PairView = GetViewFromList(View.V2);
            }else{
                PairView = GetViewFromList(View.V1);
            }

            if(PairView.Type === 'N')
            {
                console.log(`Child::PairView Type == N`);

                dispatchChildParent('RemoveParent', removeIndex);
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
    
    /*=======================================================================*/
    // Function end 
    /*=======================================================================*/    
</script>
    {#if View}
        <div id = {View.Index}
            class="divCanvas" 
            style= "width: {Total_Width}; height:{Total_Height}; display:{View.Display}">              
            {#if      View.Type === 'H'}
                <svelte:self bind:View={Child_V1} {ViewList} Total_Width = "calc({Child_V1.HRatio} - 3px)" Total_Height = "100%" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent} on:EventDragStart={EventDragStart} on:EventDrop={EventDrop} on:EventDragEnd={EventDragEnd} on:EventChildDragStart={EventChildDragStart} on:EventChildRollback={EventChildRollback} on:EventChildMove={EventChildMove} on:EventChildDrop={EventChildDrop} > </svelte:self> 
                <div id = "R{View.Index}"  class = "divResize" style= "width: 6px; min-width: 6px; height:{Child_V1.VRatio}" draggable="true"  ></div>
                <svelte:self bind:View={Child_V2} {ViewList} Total_Width = "calc({Child_V2.HRatio} - 3px)" Total_Height = "100%" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent} on:EventDragStart={EventDragStart} on:EventDrop={EventDrop} on:EventDragEnd={EventDragEnd} on:EventChildDragStart={EventChildDragStart} on:EventChildRollback={EventChildRollback} on:EventChildMove={EventChildMove} on:EventChildDrop={EventChildDrop}></svelte:self>    
            {:else if View.Type === 'V'}
                <svelte:self bind:View={Child_V1} {ViewList} Total_Width = "100%" Total_Height = "calc({Child_V1.VRatio} - 3px)" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent} on:EventDragStart={EventDragStart} on:EventDrop={EventDrop} on:EventDragEnd={EventDragEnd} on:EventChildDragStart={EventChildDragStart} on:EventChildRollback={EventChildRollback} on:EventChildMove={EventChildMove} on:EventChildDrop={EventChildDrop}></svelte:self> 
                <div id = "R{View.Index}" class = "divResize" style= "width:{Child_V1.HRatio}  height:6px; min-height: 6px;" draggable="true" ></div>
                <svelte:self bind:View={Child_V2} {ViewList} Total_Width = "100%" Total_Height = "calc({Child_V2.VRatio} - 3px)" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteChild} on:SpliteParent={EventSpliteParent} on:EventDragStart={EventDragStart} on:EventDrop={EventDrop} on:EventDragEnd={EventDragEnd} on:EventChildDragStart={EventChildDragStart} on:EventChildRollback={EventChildRollback} on:EventChildMove={EventChildMove} on:EventChildDrop={EventChildDrop}></svelte:self>     
            {:else}
                <!--<BoxView bind:Index ={View.Index} on:spliteClick={spliteButtonClick} on:removeClick={removeButtonClick} on:EventDialogDrag={EventDialogDrag} on:DialogDragStart={EventDialogDragStart}></BoxView> -->
                <BoxView    bind:Index ={View.Index} 
                            on:spliteClick      = {spliteButtonClick} 
                            on:removeClick      = {removeButtonClick} 
                            on:DialogDragStart  = {EventDialogDragStart}
                            on:DialogRollback   = {EventDialogRollback}
                            on:DialogMove       = {EventDialogMove}
                            on:DialogDrop       = {EventDialogDrop}>                         
                </BoxView>

 
            {/if}
        </div> 
    {/if}
<style>      
    .divCanvas{
       
        background-color: blue;
        position: relative;  
        /* display: inline-flex;              */
        /*width:      100%;*/
        /* height: calc(100% - 10px);         */
        z-index: 90;
    }     
    .divResize{        
        background-color: black;
                                                   
    }   
    .divResize:hover{
        /*cursor: w-resize;*/
        background-color: skyblue;
    }  
   
</style>