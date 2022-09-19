<script>
    import { writable } from 'svelte/store'
    import BoxView      from './BoxView.svelte'
    import FlexibleView from './FlexibleView.svelte'

    class ViewBox{
      constructor(Index, PID, Type, Ratio, Start, End){
        this.Index = Index,
        this.PID   = PID,
        this.Type  = Type,
        this.Title = this.Index.toString(),
        this.Ratio = Ratio,        
        this.Start = Start,
        this.End   = End;
      }
    }

    let NewViewBox;    

    let ID = 0;
    let ViewList = writable([]);

  


    NewViewBox =  new ViewBox(ID, -1, 'H', '100%', 1, 2);
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(1,  0, 'V', '50%', -1, -1);
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(2,  0, 'N', '50%', -1, -1);
    $ViewList.push(NewViewBox);
  

    /*
    NewViewBox =  new ViewBox(3,  1, 'N', '100%', -1, -1);
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(4,  1, 'N', '100%', -1, -1);
    $ViewList.push(NewViewBox); 
    */

    /*
    NewViewBox =  new ViewBox(++ID, NewViewBox.Index, '', '70%', 1, -1);
    $ViewList.push(NewViewBox);    
    */

    $ViewList = $ViewList;
    console.log('===================================================');
    console.log($ViewList);
    console.log('===================================================');

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
      */
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
          {#if V.Index === 0}           
           <!--<BoxView ID ={V.Index} LType={V.Type} Ratio={V.Ratio}></BoxView>-->
            <FlexibleView View={V} StartView={(($ViewList[1]))} EndView={($ViewList[2])} {ViewList}/>
          {/if}
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