
<script>
    import {onMount, afterUpdate} from 'svelte'
    import {ViewBox} from './stores.js'

    
    let V1;
    let V2;

    
    V1 = new ViewBox(1, 0);
    V2 = new ViewBox(2, 0);

    /*
    V1.HRatio = '60%';
    V1.VRatio = '100%';

    V2.HRatio = '40%';
    V2.VRatio = '100%';
    */
    V1.HRatio = '100%';
    V1.VRatio = '50%';

    V2.HRatio = '100%';
    V2.VRatio = '50%';


    onMount(()=>{  
        console.log('----------------------------------------------');
        console.log('Drag Test Start ');

        //const item = document.querySelector(".divResize");
        const item =document.getElementById('R');
        
        item.addEventListener("dragstart", (e) => {
            console.log(e);
            console.log("dragstart");
        });
        item.addEventListener("drag", (e) => {
            console.log(e);
            console.log("drag");

            DragProcess(e);
        });
        item.addEventListener("dragend", (e) => {
            console.log(e);
            console.log("dragend");

            DragProcess(e);
        });
        item.addEventListener("drop", (e) => {
            console.log(e);
            console.log("drop");

            //DragProcess(e);
        });
        console.log('----------------------------------------------');
    })

    function DragProcess(e)
    {
        let ParentElement;
        let Element;

        let V1E, V2E;

        let V1VRatio, V2VRatio;        

        let V1_Height, V2_Height;        

        ParentElement = document.getElementById('W');              
        
        Element = document.getElementById('R');        
  
        console.log(ParentElement.clientHeight);  
        console.log(e.clientY);        

        V1E = document.getElementById(V1.Index);
        V2E = document.getElementById(V2.Index);     
      
        V1_Height = e.clientY - ParentElement.getBoundingClientRect().top;        
        V2_Height = ParentElement.clientHeight  - V1_Height - 6;
  
        V1E.style.setProperty('height', V1_Height + 'px');     
        V2E.style.setProperty('height', V2_Height + 'px');


        //V1VRatio = Math.floor(((e.clientY  +  3) / (ParentElement.clientHeight)) * 100);
        V1VRatio = ((( e.clientY - ParentElement.getBoundingClientRect().top  +  3) / (ParentElement.clientHeight)) * 100).toFixed(2);

        V2VRatio = 100 - V1VRatio;

        console.log(V1_Height,  V2_Height);
        console.log(V1VRatio,   V2VRatio);      

        console.log('DragProcess(e)');
    }


</script>

<!--
<div id = "W"
     class="divCanvas" 
     style= "display:inline-flex">              

   <div id = {V1.Index} class = "divBox" style= " background-color:red; width: calc({V1.HRatio} - 3px); height:100%"></div>
   <div id = 'R' class = "divResize" style= "width: 6px; min-width: 6px; height:100%" draggable="true"  ></div>
   <div id = {V2.Index} class = "divBox" style= "width: calc({V2.HRatio} - 3px); height:100%"></div> 

</div> 
-->



<div id = "W"
     class="divCanvas" 
     style= "display:block">              

   <div id = {V1.Index} class = "divBox" style= " background-color:red; width: 100%; height:calc({V1.VRatio} - 3px)"></div>
   <div id = 'R' class = "divResize" style= "height: 6px; min-height: 6px; width:100%" draggable="true"  ></div>
   <div id = {V2.Index} class = "divBox" style= "width: 100%; height:calc({V2.VRatio} - 3px)"></div> 

</div>



<style>      
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
        background-color: green;
                                                   
    }   
    .divResize:hover{
        cursor: w-resize;
        background-color: skyblue;
    }  
   
</style>