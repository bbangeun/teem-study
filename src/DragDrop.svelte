<script>

    import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte'
    import { fix_and_destroy_block } from 'svelte/internal'

    let previewType = '';

    onMount(async() => {

        let Index; 
        let Element_P0, Element_V1, Element_V2, Element_V3, Element_V4, Element_V5, Element_V6;
        let Element_C3, Element_C4, Element_C5, Element_C6;
        
        console.log('----------------------------------------------');
        console.log('onMount Start ');
        console.log('----------------------------------------------');

        Element_P0 = document.getElementById("P0");
        Element_V1 = document.getElementById("V1");
        Element_V3 = document.getElementById("V3");
        Element_V4 = document.getElementById("V4");

        Element_V2 = document.getElementById("V2");
        Element_V5 = document.getElementById("V5");
        Element_V6 = document.getElementById("V6");
       
        
        Element_C3 = document.getElementById("C3"); 
        Element_C4 = document.getElementById("C4"); 
        Element_C5 = document.getElementById("C5"); 
        Element_C6 = document.getElementById("C6"); 

        
        
        //Element_V1.addEventListener("dragstart",        eventDragDrop);
        //Element_V1.addEventListener("dragend",          eventDragDrop);  

        Element_V3.addEventListener("dragstart",        eventDragStart);
        //Element_V3.addEventListener("dragover",         eventDragOver);
        Element_V3.addEventListener("drop",             eventDrop);
        Element_V3.addEventListener("dragend",          eventDragEnd);  

        Element_V4.addEventListener("dragstart",        eventDragStart);
        //Element_V4.addEventListener("dragover",         eventDragOver);
        Element_V4.addEventListener("drop",             eventDrop);
        Element_V4.addEventListener("dragend",          eventDragEnd);  

        //Element_V2.addEventListener("dragstart",      eventDragDrop);
        //Element_V2.addEventListener("dragend",        eventDragDrop);  

        Element_V5.addEventListener("dragstart",        eventDragStart);
        //Element_V5.addEventListener("dragover",         eventDragOver);
        Element_V5.addEventListener("drop",             eventDrop);
        Element_V5.addEventListener("dragend",          eventDragEnd);  

        Element_V6.addEventListener("dragstart",        eventDragStart);
        //Element_V6.addEventListener("dragover",         eventDragOver);
        Element_V6.addEventListener("drop",             eventDrop);
        Element_V6.addEventListener("dragend",          eventDragEnd);

        Element_C3.addEventListener("dragover",         eventDragOver);
        Element_C4.addEventListener("dragover",         eventDragOver);
        Element_C5.addEventListener("dragover",         eventDragOver);
        Element_C6.addEventListener("dragover",         eventDragOver);

        console.log('----------------------------------------------');
        console.log('onMount End ');
        console.log('----------------------------------------------');     
    })

    function eventDragStart(event)
    { 
        //event.preventDefault();
        console.log(`type:${event.type} ${event}`);     
        console.log(event.path[0].id);      
        event.dataTransfer.setData("text/plain", event.path[0].id);

    }
    function eventDrop(event)
    {   
        event.preventDefault();
        console.log(`type:${event.type}`);

        const data = event.dataTransfer.getData("text/plain");
        
        console.log(event);
        console.log(`${data} -> ${event.path[0].id} X:${event.offsetX} Y:${event.offsetY}`);
    }
    function eventDragOver(event)
    {
        event.preventDefault();
        
        let targetID = event.path[0].id;

        //visibleTopPreview = false;
        //visibleLeftPreview = false;
        
        if(targetID)
        {
            GetPreViewPosition(targetID, event.offsetX, event.offsetY );
        }
        else
        {            
            //console.log(event); 
            //console.log(`Not exist target[${TargetID}]`); 
            console.log(`Not exist target`); 
        }
     
    }
    function eventDragEnd(event)
    {   
        //event.preventDefault();
        console.log(`type:${event.type}`);
        console.log(event.path[0].id);
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


        let targetElement = document.getElementById(eleID);    

        if(targetElement)
        { 
            let viewRect = targetElement.getBoundingClientRect();
            targetWidth  = targetElement.getBoundingClientRect().right  - targetElement.getBoundingClientRect().left;
            targetHeight = targetElement.getBoundingClientRect().bottom - targetElement.getBoundingClientRect().top;   
            
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
                    console.log('Position:left');
                    //previewType = 'left';
                }               
                else if( ((posX > rightStart) && (posX < targetWidth)) && ( (posY > 0) && (posY < targetHeight)) ) //right
                {   
                    console.log('Position:right');
                    //previewType = 'right';
                }               
                else if( ((posX > leftEnd) && (posX < rightStart)) && ( (posY > 0) && (posY < topHeightEnd)) ) //top
                {
                    console.log('Position:top');
                    //previewType = 'top';                    
                }
                else if( ((posX > leftEnd) && (posX < rightStart)) && ( (posY > bottomHeigtStart) && (posY < targetHeight)) ) //bottom
                {             
                    console.log('Position:bottom');      
                    //previewType = 'bottom';
                }           
                else
                {                    
                    //console.log('Position:abnormal position');
                  
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
    }
</script>

<div id = "P0"
     class="divCanvas"> 
    <div id = "V1"     class="stViewBox"  >
        <div id = "V3" style= "background-color:aqua;  width:calc(25% - 3px); height:70%; display=block;" draggable="true" display=block;  >
            <div style= "background-color:beige; height:20px;">V3</div>
            <div id = "C3" style= "background-color:brown; height:calc(100% - 20px);" draggable="true">V3</div>       
        </div>
        <div id = "R1" class = "divResize"  style= "width: 6px; min-width:  6px; height:100%;" ></div>
        <div id = "V4" style= "background-color:gray;  width:calc(25% - 3px);  height:70%; " draggable="true"  display=block;>
            <div style= "background-color:beige; height:20px;">V4</div>    
            <div id = "C4" style= "background-color:brown; height:calc(100% - 20px); z-index=1" draggable="true" >
                {#if previewType == 'top'}
                    <div class="topPreview"/>            
                {:else if previewType == 'left'}                
                    <div class="leftPreview"/>   
                {:else if previewType == 'right'}                
                    <div class="rightPreview"/>
                {:else if previewType == 'bottom'}                
                    <div class="bottomPreview"/>              
                {/if}
                    <div class="bottomPreview"/>
            </div>            
        </div> 
    </div>
    <div id = "R0"     class = "divResize"  style= "width:100%; height: 6px; min-height: 6px; "></div>
    <div id = "V2"     class="stViewBox"  >
        <div id = "V5" style= "background-color:aqua;  width:calc(25% - 3px); height:70%; " draggable="true" display=block; >
            <div style= "background-color:beige; height:20px;">V5</div>
            <div id = "C5" style= "background-color:brown; height:calc(100% - 20px);" draggable="true">V5</div>
        </div>
        <div id = "R2" class = "divResize"  style= "width: 6px; min-width:  6px; height:100%;"></div>
        <div id = "V6" style= "background-color:gray;  width:calc(25% - 3px);  height:70%; " draggable="true" display=block;>
            <div style= "background-color:beige; height:20px;" >V6</div>
            <div id = "C6" style= "background-color:brown; height:calc(100% - 20px);" draggable="true" >V6</div>
          
            
        </div> 
    </div>
</div>

<style>  
.stViewBox{
    background-color:green; 
    width: 100%; 
    height:calc(50% - 3px);
    display: flex;
    align-items: center;
    justify-content: center;
  
}    
.divCanvas{
   background-color: blue;
   position: absolute;   
   left:    0;
   top:     calc(50px);			        			
   width:   100%;
   height:  calc(100% - 50px);
   margin:  0px;
   padding: 0px; 
   
}     
.divResize{        
   background-color: red;                                              
}   
.divResize:hover{
   cursor: w-resize;
   background-color: skyblue;
}  
.topPreview{
    position: relative;
    left:0px;
    top:0px;
    width: 100%;
    height: 50%;
    background-color: skyblue;
    opacity: 50%; 
    z-index: 0;
}
.bottomPreview{
    position: relative;
    left:0px;
    top:50%;
    width: 100%;
    height: 50%;
    background-color: skyblue;
    opacity: 50%; 
    z-index: 0;
}
.leftPreview{
    position: relative;
    left:  0px;    
    top:   0px;
    width: 50%;
    height: 100%;
    background-color: skyblue;
    opacity: 50%; 
    z-index: 0;
}
.rightPreview{
    position: relative;
    left:  50%;    
    top:   0px;
    width: 50%;
    height: 100%;
    background-color: skyblue;
    opacity: 50%; 
    z-index: 0;
}

</style>