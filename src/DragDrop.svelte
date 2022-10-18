<script>

    import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte'

    onMount(async() => {

        let Index; 
        let Element_P0, Element_V1, Element_V2, Element_V3, Element_V4, Element_V5, Element_V6;
        
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
        
        //Element_V1.addEventListener("dragstart",        eventDragDrop);
        //Element_V1.addEventListener("dragend",          eventDragDrop);  

        Element_V3.addEventListener("dragstart",        eventDragStart);
        Element_V3.addEventListener("dragover",         eventDragOver);
        Element_V3.addEventListener("drop",             eventDrop);
        //Element_V3.addEventListener("dragend",          eventDragEnd);  

        Element_V4.addEventListener("dragstart",        eventDragStart);
        Element_V4.addEventListener("dragover",         eventDragOver);
        Element_V4.addEventListener("drop",             eventDrop);
        //Element_V4.addEventListener("dragend",          eventDragEnd);  

        //Element_V2.addEventListener("dragstart",      eventDragDrop);
        //Element_V2.addEventListener("dragend",        eventDragDrop);  

        Element_V5.addEventListener("dragstart",        eventDragStart);
        Element_V5.addEventListener("dragover",         eventDragOver);
        Element_V5.addEventListener("drop",             eventDrop);
        //lement_V5.addEventListener("dragend",          eventDragEnd);  

        Element_V6.addEventListener("dragstart",        eventDragStart);
        Element_V6.addEventListener("dragover",         eventDragOver);
        Element_V6.addEventListener("drop",             eventDrop);
        //Element_V6.addEventListener("dragend",          eventDragEnd);

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

        const data = event.dataTransfer.getData("text");
        
        console.log(event);
        console.log(`${data} -> ${event.path[0].id} X:${event.offsetX} Y:${event.offsetY}`);
    }
    function eventDragOver(event)
    {   
        event.preventDefault();
        console.log(`type:${event.type} X:${event.offsetX} Y:${event.offsetY}`);
    }
    function eventDragEnd(event)
    {   
        //event.preventDefault();
        console.log(`type:${event.type}`);
        console.log(event.path[0].id);
    }


</script>

<div id = "P0"
     class="divCanvas"> 
    <div id = "V1"     class="stViewBox"  >
        <div id = "V3" style= "background-color:aqua;  width:calc(30% - 3px); height:30%; display=block; " draggable="true"  >
            <div style= "background-color:beige;">V3</div>
        </div>
        <div id = "R1" class = "divResize"  style= "width: 6px; min-width:  6px; height:100%;" ></div>
        <div id = "V4" style= "background-color:gray;  width:calc(30% - 3px);  height:30%; " draggable="true">
            <div style= "background-color:beige;">V4</div>    
        </div> 
    </div>
    <div id = "R0"     class = "divResize"  style= "width:100%; height: 6px; min-height: 6px; "></div>
    <div id = "V2"     class="stViewBox"  >
        <div id = "V5" style= "background-color:aqua;  width:calc(30% - 3px); height:30%; " draggable="true" >
            <div style= "background-color:beige;">V5</div>
        </div>
        <div id = "R2" class = "divResize"  style= "width: 6px; min-width:  6px; height:100%;"></div>
        <div id = "V6" style= "background-color:gray;  width:calc(30% - 3px);  height:30%; " draggable="true">
            <div style= "background-color:beige;">V6</div>
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

</style>