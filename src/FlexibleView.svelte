<script>
    export let  ID = 0;
    export let  LType = '';    

    function onClickedSplite(){        
    }
    function onClickedRemove(){    
    }
</script>

<!--{#if LType === 'H'}-->
    <div class=divCanvas>        
        
        <header class="hdTop">
            <button class="btnApply" type="button" on:click="{onClickedSplite}">분리</button> 
            <button class="btnApply" type="button" on:click="{onClickedRemove}">삭제</button>        
        </header>       
        <div id="idContainer" class="divCContainer">{ID}</div>       
        
    </div>
<!--{/if}-->


<style>      
    .divCanvas{
        background-color: blue; 
        border:     5px solid red;
        width:      100%;
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
        width:   100px;       
        height:  calc(100% -10px);       
        margin:  5px;
        cursor:  pointer;
    }    
</style>