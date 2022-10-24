<script>
    import { createEventDispatcher } from "svelte";
    import { ViewList, g_DragSourceElement, g_IsDropSafeZone, DragStartResult } from './stores.js'
    import { onMount, beforeUpdate, afterUpdate, onDestroy } from 'svelte'
    
    export let Index = ''; 
    
    let IsDraggble = true;
    let g_PreviewType = 'none'

    const dispatchSplite          = createEventDispatcher();
    const dispatchRemove          = createEventDispatcher(); 
    const dispatchDialogDrag      = createEventDispatcher(); 
    const dispatchDialogDragStart = createEventDispatcher(); 
    const dispatchDialogRollack   = createEventDispatcher(); 

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
            /*
            DialogElemnet.removeEventListener("dragstart",      eventDragStart);
            DialogElemnet.removeEventListener("drag",           DragEvent);
            DialogElemnet.removeEventListener("drop",           DragEvent);
            DialogElemnet.removeEventListener("dragend",        DragEvent);       
            */ 

            DialogElemnet.addEventListener("dragstart",     eventDragStart);
            DialogElemnet.addEventListener("dragover",      eventDragOver);
            DialogElemnet.addEventListener("dragleave",     eventDragLeave);
            DialogElemnet.addEventListener("drop",          eventDrop);
            DialogElemnet.addEventListener("dragend",       eventDragEnd);
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
    async function eventDragStart(event)
    {
        let PID = 0;        
        
        let srcElement = null;
        let parentElement = null;

        console.log(`eventDragStart::start`);

        //event.dataTransfer.setData("text/plain", event.path[0].id);
        //$g_IsDropSafeZone = false;    
        //event.dataTransfer.setDragImage(cloneElement, 0, 0);

        await dispatchDialogDragStart('DialogDragStart', new DragStartResult(Index, event));
        
        console.log(`eventDragStart::end`);
    }
    function eventDragOver(event)
    {
        event.preventDefault(); 

        let targetID = '';       
        
        targetID = this.id;
        
        if($g_DragSourceElement)
        {           
            $g_DragSourceElement.style.zIndex = 0;
        }

        if(targetID !== '')
        {
            g_PreviewType = GetPreViewPosition(targetID, event.offsetX, event.offsetY );
        }else
        {
            console.log(`eventDragOver::Not exist target`);
        }
    }
    function eventDragLeave(event)
    {
        event.preventDefault();
        console.log(`eventDragLeave${this.id}`); 
        $g_DragSourceElement = null;
        g_PreviewType = 'none';
    }
    function eventDrop(event)
    {
        event.preventDefault();
        console.log(`eventDrop${this.id}`);
        g_PreviewType = 'none';
        $g_IsDropSafeZone = true;
    }
    function eventDragEnd(event)
    {
        event.preventDefault();
        console.log(`eventDragEnd${this.id}`);
        g_PreviewType = 'none';
        if($g_IsDropSafeZone == false)
        {
            dispatchDialogRollack('DialogRollback', Index);
        }
        $g_IsDropSafeZone = false;
    }   
    function GetPreViewPosition(eleID, posX, posY)
    {    
        let targetWidth  = 0; 
        let targetHeight = 0;
        let widthRange = 0;
        let leftEnd = 0;
        let rightStart  = 0; 
        let topWidthRange = 0;
        let topHeightRange = 0;
        let topWidthStart = 0;
        let topWidthEnd = 0;
        let topHeightEnd = 0; 
        
        let rangeRight = 0;
        let bottomHeigtStart = 0; 

        let result = '';

        let targetElement = document.getElementById(eleID);    

        //console.log(posX, posY);

        if(targetElement)
        { 
            let viewRect = targetElement.getBoundingClientRect();
            targetWidth  = targetElement.getBoundingClientRect().right  - targetElement.getBoundingClientRect().left;
            targetHeight = targetElement.getBoundingClientRect().bottom - targetElement.getBoundingClientRect().top;   

            //console.log(targetWidth,  targetHeight);
            
            if( (targetWidth > 0) && (targetHeight > 0) )
            {
                //left:0 이고 일정 비율 30% 안에 포함 되고
                //top:헤더부터 끝까지
                
                widthRange    = (targetWidth * 0.3).toFixed(0);  
                
                leftEnd       = widthRange;
                rightStart    = targetWidth - widthRange;

                topWidthRange  = (targetWidth  * 0.4).toFixed(0);
                topHeightRange = (targetHeight * 0.2).toFixed(0);

                topWidthStart  = leftEnd
                topWidthEnd    = leftEnd + topWidthRange;
                topHeightEnd   = topHeightRange; 
                
                bottomHeigtStart = targetHeight - topHeightRange;

              
                //visibleTopPreview = false;

                if( ((posX > 0) && (posX < leftEnd)) && (( posY > 0) &&  (posY < targetHeight)) ) //left
                {   
                    //console.log('Position:left');
                    result = 'left';
                }               
                else if( ((posX > rightStart) && (posX < targetWidth)) && ( (posY > 0) && (posY < targetHeight)) ) //right
                {   
                    //console.log('Position:right');
                    result = 'right';
                }               
                else if( ((posX > leftEnd) && (posX < rightStart)) && ( (posY > 0) && (posY < topHeightEnd)) ) //top
                {
                    //console.log('Position:top');
                    result = 'top';                    
                }
                else if( ((posX > leftEnd) && (posX < rightStart)) && ( (posY > bottomHeigtStart) && (posY < targetHeight)) ) //bottom
                {             
                    //console.log('Position:bottom');      
                    result = 'bottom';
                }           
                else
                {
                    console.log('Position:none');                    
                    result = '';                   
                }              
            }
            else
            {
                console.log(`Target size abnormal[${eleID}]`); 
            }
        }
        else
        {           
            console.log(`Not exist element[${eleID}]`); 
        }

        return result;
    }
    /*=======================================================================*/
    // Function end 
    /*=======================================================================*/
</script>
    
    <!-- 
    <div id="D{Index}" class=divCanvas draggable={IsDraggble} >
        <header class="hdTop"  >            
            <button class="btnApply" type="button" on:click="{onClickedSplite}">분리</button> 
            <button class="btnApply" type="button" on:click="{onClickedRemove}">삭제</button>         
        </header>       
        <div id="idContainer" class="divCContainer" draggable="false"  on:mouseenter="{MouseEnter}" on:mouseleave="{MouseLeave}">{Index}</div>     
        {#if      g_PreviewType == 'top'}
            <div class="topPreview"/>            
        {:else if g_PreviewType == 'left'}                
            <div class="leftPreview"/>   
        {:else if g_PreviewType == 'right'}                
            <div class="rightPreview"/>
        {:else if g_PreviewType == 'bottom'}                
            <div class="bottomPreview"/>              
        {/if}          
    </div>
    -->
    <div id="D{Index}" class=divCanvas draggable={IsDraggble} >
        <header class="hdTop"  >            
            <button class="btnApply" type="button" on:click="{onClickedSplite}">분리</button> 
            <button class="btnApply" type="button" on:click="{onClickedRemove}">삭제</button>         
        </header>       
        <div id="idContainer" class="divCContainer" draggable="false"  on:mouseenter="{MouseEnter}" on:mouseleave="{MouseLeave}">{Index}</div>     
        {#if      g_PreviewType == 'top'}
            <div class="topPreview"/>            
        {:else if g_PreviewType == 'left'}                
            <div class="leftPreview"/>   
        {:else if g_PreviewType == 'right'}                
            <div class="rightPreview"/>
        {:else if g_PreviewType == 'bottom'}                
            <div class="bottomPreview"/>              
        {/if}          
    </div>


<style>
    /*
    .divCanvas{          
        background-color: blue; 
        border:     5px solid red;
        width:      calc(100% - 10px);
        height:     calc(100% - 10px);
        resize:     both;    
        overflow:   hidden;
    }  
    */
    .divCanvas{
        position: relative;  
        background-color: blue; 
        border:     5px solid red;  
        width:      calc(100% - 10px);
        height:     calc(100% - 10px);
        /*resize:     both;*/    
        z-index:    1000;
    }  
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
  
    .btnApply{            
        /* width:   200px; */
        width:   80px;       
        height:  calc(100% -10px);       
        margin:  5px;
        cursor:  pointer;
    }    
    .topPreview{
        position: absolute;
        left:0px;
        top:0px;
        width: 100%;
        height: 50%;
        background-color: skyblue;
        opacity: 50%; 
        z-index: 100;
        pointer-events: none;
    }
    .bottomPreview{
        position: absolute;
        left:0px;
        top:50%;
        width: 100%;
        height: 50%;
        background-color: skyblue;
        opacity: 50%; 
        z-index: 100;
        pointer-events: none; 
    
    }
    .leftPreview{
        position: absolute;
        left:  0px;    
        top:   0px;
        width: 50%;
        height: 100%;
        background-color: skyblue;
        opacity: 50%; 
        z-index: 100;
        pointer-events: none; 
    
    }
    .rightPreview{
        position: absolute;
        top:   0px;
        left:  50%;
        width: 50%;
        height: 100%;
        background-color: skyblue;
        opacity: 50%; 
        z-index: 100;
        pointer-events: none; 
    }
</style>