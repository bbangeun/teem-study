<script>
    import { writable } from 'svelte/store'
    import Flexible from './FlexibleView.svelte'

    let LastObj

    let id = 0;
    let ViewList = writable([] );

    $ViewList.push({
        Index : id++,
        Type  : 'H',
        Title : id.toString(),
        Pos_x : 0,  
        Pos_y : 0,
        Ratio : 50
    })
      
    $ViewList.push({
        Index : id++,
        Type  : 'H',
        Title : id.toString(),
        Pos_x : 0,  
        Pos_y : 0,
        Ratio : 50
    })

    $ViewList = $ViewList;
    console.log($ViewList);


    function onClickedAdd () {
      /*
    
      const Parent = document.getElementById('idContainer')
      const newDiv = document.createElement('div')      
    
      newDiv.style.position = 'absolute'
      newDiv.style.backgroundColor = `#${Math.round(Math.random() * 0xffffff).toString(16)}`

      const ParaentSize = Parent.getBoundingClientRect()      
    
      newDiv.style.width  = `${ParaentSize.width / 10}px`
      newDiv.style.height = `${ParaentSize.height / 10}px`

      console.log(Math.random()* 0xffffff);
      
      newDiv.style.left = `${(Math.random() * 0xffffff) % ParaentSize.width}px`;   
      newDiv.style.top  = `${(Math.random() * 0xffffff) % ParaentSize.height}px`;   	  
      
      LastObj = newDiv

      Parent.appendChild(newDiv)
      */

      

      $ViewList.push({
        Index : id,
        Type  : 'H',
        Title : id.toString(),
        Pos_x : 0,  
        Pos_y : 0,
        Ratio : 50
      })

      $ViewList = $ViewList;      
      id += 1;
    }
    function onClickedRefresh () {
      const Parent = document.getElementById('idContainer')
      if (Parent.childElementCount > 0) {
        const Obj = Parent.childNodes[Parent.childElementCount - 1]
        Parent.removeChild(Obj)
      }
    }
    </script>
	
    <div class=divCanvas>
      <header class="hdTop">
        <button class="btnApply" type="button" on:click="{onClickedAdd}">추가</button> 
        <button class="btnApply" type="button" on:click="{onClickedRefresh}">삭제</button>        
      </header>
      <div id="idContainer" class="divContainer">
        {#each $ViewList as V}
          <Flexible ID ={V.Index} LType={V.type} ></Flexible>
        {/each}
      </div>
    </div>

    <style>            
      .divCanvas{
        background-color: white;
        display: flex;
        flex-direction: column;
        widows:  100%;
        height:  100%;
        padding: 0px;
        margin:  0px;
      }
      .hdTop{
        background-color: blueviolet;
        display: flex; 			
        justify-content: right;
        width:   100%;
        height:  50px;
        margin:  0px;
        padding: 0px;			
      }      
      .divContainer{                    
        /*position: absolute;   */
        position: absolute;   
        background-color: beige;     

        left:    0;
        top:     calc(50px + 50px);			        			
        width:   100%;
        height:  calc(100% - 100px);
        margin:  0px;
        padding: 0px;

        display: flex;
        flex-direction: row;

      }
      .btnApply{            
        width:   100px;       
        height:  calc(100% -10px);       
        margin:  5px;
        cursor: pointer;
      }
    </style>