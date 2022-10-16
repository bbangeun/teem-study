<script>
    import { createEventDispatcher } from "svelte";
    import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte'
    
    export let  Index = '';
    export let  LType = '';    
    export let  Ratio; 
    
    let IsDraggble = true;

    const dispatchSplite        = createEventDispatcher();
    const dispatchRemove        = createEventDispatcher(); 
    const dispatchDialogDrag    = createEventDispatcher(); 

    console.log('******************************')
    console.log(`BoxView:${Index}`)
    console.log('******************************')

    /*=======================================================================*/
    // Function Start 
    /*=======================================================================*/
    onMount(async() => {
        let DialogID, DialogElemnet;
        console.log('----------------------------------------------');
        console.log('Dialog OnMount Start');
        console.log('----------------------------------------------');


        DialogID = `D${Index}`;
        DialogElemnet = document.getElementById(DialogID);

        if(DialogElemnet){
            DialogElemnet.removeEventListener("dragstart",      DragEvent);
            DialogElemnet.removeEventListener("drag",           DragEvent);
            DialogElemnet.removeEventListener("drop",           DragEvent);
            DialogElemnet.removeEventListener("dragend",        DragEvent);        

            DialogElemnet.addEventListener("dragstart",     DragEvent);
            DialogElemnet.addEventListener("drag",          DragEvent);
            DialogElemnet.addEventListener("drop",          DragEvent);
            DialogElemnet.addEventListener("dragend",       DragEvent);
        }

        console.log('----------------------------------------------');
        console.log('Dialog OnMount End');
        console.log('----------------------------------------------');
    })
    function DialogDragEvent(e)
    {
        console.log('----------------------------------------------');
        console.log('DialogDragEvent');
        console.log(e);
        if(e.type === "dragstart")
        {
        }
        else if(e.type === "drag")
        {            
        }
        console.log('----------------------------------------------');
    }

    function MouseEnter(e){ 
        IsDraggble = false;       
    }
    function MouseLeave(e){  
        IsDraggble = true;
    }
    function onClickedSplite(){
        dispatchSplite('spliteClick', Index);        
    }
    function onClickedRemove(){
        dispatchRemove('removeClick', Index);    
    }
    function DragEvent(e)
    {
        dispatchDialogDrag('EventDialogDrag', e);
        /*
        console.log('----------------------------------------------');
        console.log('DragEvent');
        console.log(e);

        let MoveElement;
        MoveElement = document.getElementById(`D${Index}`);

        if(e.type === "dragstart")
        {
            MoveElement.style.position = 'absolute';
            MoveElement.style.zIndex = '1000';
            MoveElement.style.opacity = '50%';
            document.body.append(MoveElement);
        }
        else if(e.type === "drag")
        {            
            console.log(e);
           
            
            //MoveElement.style.left = e.pageX - MoveElement.offsetWidth  / 2 + 'px';
            //MoveElement.style.top  = e.pageY - MoveElement.offsetHeight / 2 + 'px';
                      
         
            MoveElement.style.left = e.pageX + 'px';;
            MoveElement.style.top  = e.pageY + 'px';;
         
        }
        else if(e.type === "dragend")
        {            
            console.log(e);
           
            MoveElement.style.opacity = '100%'; 
         
            MoveElement.style.left = e.pageX + 'px';;
            MoveElement.style.top  = e.pageY + 'px';;
         
        }
        console.log('----------------------------------------------');    
        */
    }  
    /*=======================================================================*/
    // Function end 
    /*=======================================================================*/
</script>
    
    <div id="D{Index}" class=divCanvas draggable={IsDraggble} >
        <header class="hdTop"  >            
            <button class="btnApply" type="button" on:click="{onClickedSplite}">분리</button> 
            <button class="btnApply" type="button" on:click="{onClickedRemove}">삭제</button>         
        </header>       
        <div id="idContainer" class="divCContainer" draggable="false"  on:mouseenter="{MouseEnter}" on:mouseleave="{MouseLeave}">{Index}</div>               
    </div>


<style>      
    .divCanvas{
        background-color: blue; 
        border:     5px solid red;
        width:      calc(100% - 10px);
        height:     calc(100% - 10px);
        resize:     both;    
        overflow:   hidden;
    } 
     /*
    .divCanvas{
        background-color: white;
        width:   100%;
        height:  100%;
        padding: 0px;
        margin:  0px;
        border:  5px solid red;
    } 
    */
    .hdTop{
        background-color: aqua;
        display: flex; 			
        justify-content: right;
        width:   100%;
        height:  50px;
        margin:  0px;
        padding: 0px;			
    }  
    .divCContainer{                            
        background-color: moccasin;     
        left:    0;
        top:     calc(50px + 50px);			     
        height:  calc(100% - 50px);
        margin:  0px;
        padding: 0px;        
    }
    /*    
    .divCContainer{                    
        position: absolute;   
        background-color: moccasin;     
        left:    0;
        top:     calc(50px + 50px);			
        width:   100%;
        height:  calc(100% - 100px);
        margin:  0px;
        padding: 0px;        
    }
    */
    .btnApply{            
        /* width:   200px; */
        width:   80px;       
        height:  calc(100% -10px);       
        margin:  5px;
        cursor:  pointer;
    }    
</style>