<script>
    let LastObj
    
    function onClickedAdd () {
      const Parent = document.getElementById('divContainer')
      const newDiv = document.createElement('div')
    
      newDiv.style.position = 'relative'
      newDiv.style.backgroundColor = `#${Math.round(Math.random() * 0xffffff).toString(16)}`
    
      const ParaentSize = Parent.getBoundingClientRect()

      // newDiv.style.width  =  (ParaentSize.width  / 10) + 'px'
      // newDiv.style.height =  (ParaentSize.height / 10) + 'px';
    
      newDiv.style.width = `${ParaentSize.width / 10}px`
      newDiv.style.height = `${ParaentSize.height / 10}px`
    
      LastObj = newDiv

      // newDiv.style.width =  "100px"
      // newDiv.style.height = "100px"
      Parent.appendChild(newDiv)
    }
    function onClickedRefresh () {
      const Parent = document.getElementById('divContainer')
      if (Parent.childElementCount > 0) {
        const Obj = Parent.childNodes[Parent.childElementCount - 1]
        Parent.removeChild(Obj)
      }
    }
    </script>
    
    <br/>
    
    <div>
        <div id="divContainer">
        </div>
        <div class="divBtnSection">
            <button class="btnSide" type="button" on:click="{onClickedAdd}">추가</button>
            <button class="btnSide" type="button" on:click="{onClickedRefresh}">삭제</button>        
        </div> 
    </div>
    <style>    
        /*
        html{
            width: 100%;
            height: 100%;
        }
        body{                  
            width: 100%;
            height: 500px;
            background-color: aqua;        
        }
        */
        div{      
            background-color: blue;
            display: block; 
            position: relative;        
    
            width:  100%;
            height: 800px;
        }
        #divContainer{
            display: inline-block;
            position: absolute;        
            
            background-color: skyblue;                        
            
            top:    10px;
            left:   10px;
            width:  calc(90% - 15px);
            height: calc(100% - 20px);
        }
        .divBtnSection{
            display: inline-block;
            position: absolute;        
    
            background-color: green;
    
            top:     10px;
            right:   10px;        
    
            width:  calc(10% - 15px);
            height: calc(100% - 20px);
        }    
        .btnSide{
            display:  block;
            position: relative;        
            left: 10px;        
            width:  calc( 100% - 10px * 2 );       
            height: 5%;       ; 
            margin-top: 10px;
        }
    </style>