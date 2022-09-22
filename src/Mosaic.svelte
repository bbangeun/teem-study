<script>
    import { writable } from 'svelte/store'
    import BoxView      from './BoxView.svelte'
    import FlexibleView from './FlexibleView.svelte'

    class ViewBox{
      constructor(Index, PID, Type, HRatio, VRatio, V1, V2, Offset){
        this.Index = Index,
        this.PID   = PID,
        this.Type  = Type,
        this.Title = this.Index.toString(),
        this.HRatio = HRatio,        
        this.VRatio = VRatio,        
        this.V1   = V1,
        this.V2   = V2;
        this.HRealRatio = "calc({HRatio} - 10px)"        
        this.VRealRatio = "calc({VRatio} - 10px)"  
        this.Offset = (((V1 > 0) && (V2 > 0)) || (PID > 0)) ? '10px' : '0px';
        this.Display = (this.Type === 'H') ? 'inline-flex' : 'Block';                  
      }
    }

    let NewViewBox;    

    let ID = 0;
    let ViewList = writable([]);

    NewViewBox =  new ViewBox(ID, -1, 'H', '100%', '100%', 1, 2, );
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(1,  0,  'H', '60%', '100%', 3, 4);
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(2,  0,  'V', '40%', '100%', 5, 6);
    $ViewList.push(NewViewBox);    
    
    NewViewBox =  new ViewBox(3,  1,  'N', '50%', '100%', -1, -1);
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(4,  1,  'N', '50%', '100%', -1, -1);
    $ViewList.push(NewViewBox);       
      
    NewViewBox =  new ViewBox(5,  2,  'H', '100%', '50%', 7, 8);
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(6,  2,  'V', '100%', '50%', 9, 10);
    $ViewList.push(NewViewBox);     

    NewViewBox =  new ViewBox(7,  5,  'N', '50%', '100%', -1, -1);
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(8,  5,  'N', '50%', '100%', -1, -1);
    $ViewList.push(NewViewBox);     

    NewViewBox =  new ViewBox(9,  5,  'N', '100%', '50%', -1, -1);
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(10,  5,  'N', '100%', '50%', -1, -1);
    $ViewList.push(NewViewBox);     
    

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
            <!-- <FlexibleView View={V} StartView={(($ViewList[1]))} EndView={($ViewList[2])} {ViewList}/> -->
            <FlexibleView View={V} {ViewList} Total_Width="100%" Total_Height="100%"/>
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
        flex-direction: column;

      }
      .btnApply{            
        width:   80px;       
        height:  calc(100% -10px);       
        margin:  5px;
        cursor: pointer;
      }
    </style>