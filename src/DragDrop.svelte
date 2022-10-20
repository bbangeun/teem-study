<script>

    import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte'
    import { fix_and_destroy_block } from 'svelte/internal'

    let previewType3 = '';
    let previewType4 = '';

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

        /*
        document.addEventListener("dragstart", event => {
            // 드래그한 요소에 대한 참조 저장
            dragged = event.target;
            // 반투명하게 만들기
            event.target.classList.add("dragging");
        });
        */
        
   
        Element_V3.addEventListener("dragstart",        eventDragStart);
        Element_V3.addEventListener("dragleave",        eventDragLeave);
        Element_V3.addEventListener("dragover",         eventDragOver);
        Element_V3.addEventListener("drop",             eventDrop);
        Element_V3.addEventListener("dragend",          eventDragEnd);  

        Element_V4.addEventListener("dragstart",        eventDragStart);
        Element_V4.addEventListener("dragleave",        eventDragLeave);
        Element_V4.addEventListener("dragover",         eventDragOver);   
        Element_V4.addEventListener("drop",             eventDrop);
        Element_V4.addEventListener("dragend",          eventDragEnd);  
        //Element_V4.addEventListener("mousemove",        eventMouseOn);
  


        /*
        Element_C3.addEventListener("dragover",         eventDragOver);
        Element_C4.addEventListener("dragover",         eventDragOver);
        Element_C5.addEventListener("dragover",         eventDragOver);
        Element_C6.addEventListener("dragover",         eventDragOver);
        */

        //Element_C3.addEventListener("dragleave",         eventDragLeave);
        //Element_C4.addEventListener("dragleave",         eventDragLeave);
        //Element_C5.addEventListener("dragleave",         eventDragLeave);
        //Element_C6.addEventListener("dragleave",         eventDragLeave);

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
    function eventDragEnter(event)
    {
        event.preventDefault();
        console.log(`type:${event.type}`);

    }
    function eventDragOver(event)
    {
        event.preventDefault();      
       
        let targetID = this.id;
        let type = '';    
       
        
        //console.log(event); 
        //console.log(targetID, event.offsetX, event.offsetY, event.layerX, event.layerY ); 
        
       
        
        if(targetID)
        {
            console.log(targetID); 
          
            type = GetPreViewPosition(targetID, event.offsetX, event.offsetY );

            if(targetID === 'V3')
            {
                previewType3 = type;
            }
            else
            {
                previewType4 = type;
            }
            //previewType = previewType;
        
                    
        }
        else
        {
            console.log(`Not exist target`); 
        }  
 
    
       // console.log(targetID, previewType);        
    }
    function eventDragLeave(event)
    {
        event.preventDefault();
        //previewType = '';
        console.log(`eventDragLeave${this.id}`); 
        
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

        let result = '';

        let targetElement = document.getElementById(eleID);    

        console.log(posX, posY);

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
                    console.log('Position:left');
                    result = 'left';
                }               
                else if( ((posX > rightStart) && (posX < targetWidth)) && ( (posY > 0) && (posY < targetHeight)) ) //right
                {   
                    console.log('Position:right');
                    result = 'right';
                }               
                else if( ((posX > leftEnd) && (posX < rightStart)) && ( (posY > 0) && (posY < topHeightEnd)) ) //top
                {
                    console.log('Position:top');
                    result = 'top';                    
                }
                else if( ((posX > leftEnd) && (posX < rightStart)) && ( (posY > bottomHeigtStart) && (posY < targetHeight)) ) //bottom
                {             
                    console.log('Position:bottom');      
                    result = 'bottom';
                }           
                else
                {                    
                    //console.log('Position:abnormal position');
                    //console.log(`Size: ${targetWidth} ${targetHeight}`);
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
</script>

<div id = "P0"
     class="divCanvas"> 
    <div id = "V1"  class="stViewBox"  >
        
        <div id = "V3" class = "stView"     draggable="true"   >
            <div class ="stHeader">Header:V3</div>    
            <div class ="stContent">Content:V3</div>    
            {#if previewType3 == 'top'}
                <div class="topPreview"/>            
            {:else if previewType3 == 'left'}                
                <div class="leftPreview"/>   
            {:else if previewType3 == 'right'}                
                <div class="rightPreview"/>
            {:else if previewType3 == 'bottom'}                
                <div class="bottomPreview"/>              
            {/if} 
        </div>
        
        <div id = "R1" class = "divResize"  style= "width: 6px; min-width:6px; height:100%;" ></div>

        <div id = "V4" class = "stView"     draggable="true" > 

            <div class ="stHeader">Header:V4</div>    
            <div class ="stContent">Content:V4  </div>               
           
            {#if previewType4 == 'top'}
                <div class="topPreview"/>            
            {:else if previewType4 == 'left'}                
                <div class="leftPreview"/>   
            {:else if previewType4 == 'right'}                
                <div class="rightPreview"/>
            {:else if previewType4 == 'bottom'}                
                <div class="bottomPreview"/>              
            {/if}
           
        </div> 
    </div>
    <div id = "R0"     class = "divResize"  style= "width:100%; height: 6px; min-height: 6px; "></div>
    <div id = "V2"     class="stViewBox">
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
.stView{    
    position: relative; 
    background-color:gray;
    width:calc(25% - 3px);
    height:70%;  
}
.stHeader{
    background-color:beige; 
    position:relative;
    left:0px;
    top:0px;
    width:100%; 
    height:20px;
}
.stContent{
    background-color:brown;
    position:relative; 
    left:0px; 
    top:0px;
    width:100%; 
    height:calc(100% - 20px);    
}

</style>