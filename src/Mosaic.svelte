<script>
    import { object_without_properties, to_number } from 'svelte/internal'
    import { writable } from 'svelte/store'
    import BoxView      from './BoxView.svelte'
    import FlexibleView from './FlexibleView.svelte'

    
    import { ViewList } from './stores.js'    

    class ViewBox{
      constructor(Index, PID, Type, HRatio, VRatio, V1, V2, Title, Display){
        this.Index = Index,
        this.PID   = PID,
        this.Type  = Type,
        this.Title = Title;
        this.HRatio = HRatio,        
        this.VRatio = VRatio,        
        this.V1   = V1,
        this.V2   = V2;
        this.HRealRatio = "calc({HRatio} - 10px)"        
        this.VRealRatio = "calc({VRatio} - 10px)"  
        this.Offset = (((V1 > 0) && (V2 > 0)) || (PID > 0)) ? '10px' : '0px';
        //this.Display = (this.Type === 'H') ? 'inline-flex' : 'Block';
        this.Display = Display;                  
      }
    }

    let NewViewBox;    

    let ID = 0;
    //let ViewList = writable([]);
  
  
    NewViewBox =  new ViewBox(ID, -1, 'H', '100%', '100%', 1, 2, ID.toString, 'inline-flex' );
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(1,  0,  'N', '40%', '100%', -1, -1, '1', 'Block');
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(2,  0,  'V', '60%', '100%', 3, 4, '2', 'Block');
    $ViewList.push(NewViewBox);    

    NewViewBox =  new ViewBox(3,  2,  'N', '100%', '50%', -1, -1, '3', 'Block');
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(4,  2,  'N', '100%', '50%', -1, -1, '4', 'Block');
    $ViewList.push(NewViewBox);  
    
    /*
    NewViewBox =  new ViewBox(1,  0,  'H', '60%', '100%', 3, 4, '1');
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(2,  0,  'V', '40%', '100%', 5, 6, '2');c
    $ViewList.push(NewViewBox);    
    
      
    NewViewBox =  new ViewBox(3,  1,  'N', '50%', '100%', -1, -1, '3');
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(4,  1,  'N', '50%', '100%', -1, -1, '4');
    $ViewList.push(NewViewBox);       
      
    NewViewBox =  new ViewBox(5,  2,  'H', '100%', '50%', 7, 8, '5');
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(6,  2,  'V', '100%', '50%', 9, 10, '6');
    $ViewList.push(NewViewBox);     

    NewViewBox =  new ViewBox(7,  5,  'N', '50%', '100%', -1, -1, '7');
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(8,  5,  'V', '50%', '100%', 11, 12, '8');
    $ViewList.push(NewViewBox);     

    NewViewBox =  new ViewBox(9,  5,  'N', '100%', '50%', -1, -1, '9');
    $ViewList.push(NewViewBox);   

    NewViewBox =  new ViewBox(10,  5,  'N', '100%', '50%', -1, -1, '10');
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(11,  8,  'N', '100%', '70%', -1, -1, '11');
    $ViewList.push(NewViewBox);      
    

    NewViewBox =  new ViewBox(12,  8,  'N', '100%', '30%', -1, -1, '12');
    $ViewList.push(NewViewBox);   
    */


 

    $ViewList.sort(function compare(a, b) {
      return a.Index - b.Index;
    });
    
    $ViewList = $ViewList;
    console.log('===================================================');
    console.log($ViewList);
    console.log('==================================================='); 
  
    function onClickedAdd () {

      let TopRightIndex = 0;
      let TopRightView  = {};
      let ParentView    = {};
      let V1            = {};
      let V2            = {};
      let LastIndex     = 0;   
      let TopRightElement;
      let NewViewHRatio = '';
      let NewViewVRatio = '';

      TopRightIndex = GetTopRightWindow(0);
      TopRightView  = GetViewFromList(TopRightIndex);
      ParentView    = GetViewFromList(TopRightView.Index);       
      
      LastIndex = $ViewList[($ViewList.length-1)].Index;   

      TopRightElement = document.getElementById(TopRightView.Index);

      if(TopRightElement){
        if(TopRightElement.clientWidth >= TopRightElement.clientHeight){
            TopRightView.Type = 'H';
            TopRightView.Display = 'inline-flex';
            NewViewHRatio = '50%';
            NewViewVRatio = '100%';
        } 
        else{
            TopRightView.Type = 'V';
            TopRightView.Display = 'Block';
            NewViewHRatio = '100%';
            NewViewVRatio = '50%';
        }
        console.log(TopRightElement);

        V1  =  new ViewBox(++LastIndex, TopRightView.Index,  'N', NewViewHRatio, NewViewVRatio, -1, -1, LastIndex.toString(), 'Block');
        V2  =  new ViewBox(++LastIndex, TopRightView.Index,  'N', NewViewHRatio, NewViewVRatio, -1, -1, LastIndex.toString(), 'Block');
        TopRightView.V1 = V1.Index;
        TopRightView.V2 = V2.Index;

        $ViewList.push(V1);   
        $ViewList.push(V2);       

        $ViewList = $ViewList;
        console.log(`Compelted Add TopRightWindow ${TopRightView.Index}`);     
      }
      else{
        console.log(`Failed Add TopRightWindow ${TopRightView.Index}`);
      }

    }
    function onClickedRefresh () {
      const Parent = document.getElementById('idContainer')
      if (Parent.childElementCount > 0) {
        const Obj = Parent.childNodes[Parent.childElementCount - 1]
        Parent.removeChild(Obj)
      }
    }

    function GetViewFromList(Index){
      let ResultView  = {};

      for(let i = 0; i < $ViewList.length; i++){

        if($ViewList[i].Index == Index){            
            ResultView = $ViewList[i];
            break;
        }
      }

      return ResultView;
    }

    function GetTopRightWindow(Index){
      let ResultIndex = 0;
      let View = {};

      View = GetViewFromList(Index);
      console.log(`GetTopRightWindow Start ${View.Index}`);

      if(View.Type === 'H'){
        console.log(`GetTopRightWindow Type H[${View.V2}]`);        
        ResultIndex = GetTopRightWindow(View.V2);
      }else if(View.Type === 'V'){
        console.log(`GetTopRightWindow Type V[${View.V1}]`);
        ResultIndex = GetTopRightWindow(View.V1);
      }
      else{
        ResultIndex = View.Index;
      }

      return ResultIndex;
    }

    


    const clickedRemove = event => {

      let RemovedIndex = 0;
      let PairViewIndex = 0;    
     
      let ParentView;
      let PParentView;
      let RemovedView;
      let PairView; 
      let RemoveElement;

      RemovedIndex = event.detail;

      console.log(`Parent::Remove Start [${RemovedIndex}]`);

      console.log(" ");
      console.log("============================================================1");
      RemoveElement = document.getElementById(RemovedIndex.toString());
      console.log("============================================================2");
      console.log(RemoveElement);
      RemoveElement.parentNode.removeChild(RemoveElement);
      console.log("============================================================3");
      console.log(" ");

   
      RemovedView = GetViewFromList(RemovedIndex);

      if(RemovedView.PID >= 0){
        ParentView  = GetViewFromList(RemovedView.PID);

        if(ParentView.V1 === RemovedView.Index){
          PairView = GetViewFromList(ParentView.V2);
        }
        else{
          PairView = GetViewFromList(ParentView.V1);
        }

        PairView.HRatio = ParentView.HRatio;
        PairView.VRatio = ParentView.VRatio;
        //PairView.Type = ParentView.Type; 

        if(ParentView.PID >= 0)
        { 
          PParentView = GetViewFromList(ParentView.PID);
          
          if(PParentView.V1 === ParentView.Index){
            PParentView.V1 = PairView.Index; 
          }
          else{
            PParentView.V2 = PairView.Index;
          }

          PairView.PID = PParentView.Index;
        }
        else{
          PairView.PID = -1;
          PairView.Index = 0;
        }

        for(let i =0; i<$ViewList.length; i++){
          if(RemovedView.Index === $ViewList[i].Index ){
            $ViewList.splice(i, 1);
            console.log(`Parent::Removed1 [${RemovedView.Index}]`);  
            break;
          }
        }

        for(let i =0; i<$ViewList.length; i++){
          if(ParentView.Index === $ViewList[i].Index ){
            $ViewList.splice(i, 1);
            console.log(`Parent::Removed2 [${ParentView.Index}]`);  
            break;
          }
        }

        Object.freeze(ParentView);
        Object.freeze(RemovedView);
        console.log($ViewList);

        $ViewList = $ViewList;

        
      }else{
        console.log(`Parent View[Index:${RemovedIndex}, PID:${RemovedView.PID}]`);
      }
      
      

      /*
      if((RemovedView.PID >= 0) && (ParentView.Index >= 0)){
        if(ParentView.V1 === RemovedView.Index ){
          PairViewIndex = ParentView.V2;  
        }
        else{
          PairViewIndex = ParentView.V1;
        }
 
        for(let i =0; i<$ViewList.length; i++){
          if(RemovedView.Index === $ViewList[i].Index ){
            $ViewList.splice(i, 1);   
            console.log($ViewList);
            console.log(`Parent::Removed1 [${RemovedView.Index}]`);  
            break;
          }
        }
       

        if(PParentView.V1 === ParentView.Index){
          PParentView.V1 = PairViewIndex;
        }else if(PParentView.V2 === ParentView.Index){
          PParentView.V2 = PairViewIndex;  
        }

        PairView = GetViewFromList(PairViewIndex);
        PairView.PID = PParentView.Index;
        PairView.HRatio = ParentView.HRatio;
        PairView.VRatio = ParentView.VRatio;

        for(let i =0; i<$ViewList.length; i++){
          if(ParentView.Index === $ViewList[i].Index ){
            $ViewList.splice(i, 1);   
            console.log($ViewList);
            console.log(`Parent::Removed2 [${ParentView.Index}]`);  
            break;
          }
        }        

        Object.freeze(ParentView);
        Object.freeze(RemovedView);
        console.log(`========================================`);
        console.log($ViewList);  
        console.log(`========================================`);
        $ViewList = $ViewList;
      }
      else{
        if( (ParentView.PID < 0) && (RemovedView.Index === 0) ){
          console.log(`Parent::Last View[${RemovedView.Index}]`);
        }else{
          console.log(`Parent::Abnormal Removed Process[2][${RemovedView.Index}]`);
        }
      }
      */
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
            <FlexibleView bind:View={V} {ViewList}  Total_Width="100%" Total_Height="100%" on:FlexibleRemove={clickedRemove} /> 
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