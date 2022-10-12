<script>
    import { object_without_properties, to_number } from 'svelte/internal'
    import { writable } from 'svelte/store'
    import {onMount, afterUpdate, onDestroy} from 'svelte'
    import BoxView      from './BoxView.svelte'
 
    
    import FlexibleView from './FlexibleView.svelte'    
    
    import { ViewList , ViewBox } from './stores.js'

    import { apiData, drinkNames } from './stores.js';

    let NewViewBox;    

    let TopParentView = null;

    let CurrentPageIndex = 0;

    let ID = 0;

    let LoadParentArray = [];
    let LoadChildArray = [];

    onMount(async ()=>{   
        console.log('----------------------------------------------');
        console.log('Mosaic onMount Start');
        console.log('----------------------------------------------');
      
        const res = await fetch("http://127.0.0.1:8887/pane/1")
          .then(response => response.json())
          .then(data => {
          
          console.log('=====================================');
          console.log(data.page_id);
          console.log(data.structure);

          LoadParentArray = data.structure.split('$#$');
          console.log(LoadParentArray);
          for(let i = 0; i < LoadParentArray.length; i++ )
          {
            LoadChildArray = LoadParentArray[i].split(',');
            console.log(LoadChildArray);
            NewViewBox = new ViewBox(LoadChildArray[0],
                                     LoadChildArray[1],
                                     LoadChildArray[2],
                                     LoadChildArray[3],
                                     LoadChildArray[4],
                                     LoadChildArray[5],
                                     LoadChildArray[6],
                                     LoadChildArray[0],
                                     LoadChildArray[7]);
            console.log(NewViewBox);

            $ViewList.push(NewViewBox);
          }
          console.log('=====================================');
          apiData.set(data);
        }).catch(error => {
          console.log(error);
          return [];
        });
      

        /*
        NewViewBox =  new ViewBox(ID, -1, 'H', '100%', '100%', 1, 2, ID.toString, 'inline-flex' );
        $ViewList.push(NewViewBox);

        NewViewBox =  new ViewBox(1,  0,  'N', '40%', '100%', -1, -1, 'Index-1', 'Block');
        $ViewList.push(NewViewBox);

        NewViewBox =  new ViewBox(2,  0,  'N', '60%', '100%', -1, -1, 'Index-2', 'Block');
        $ViewList.push(NewViewBox);
        */
        
        $ViewList.sort(function compare(a, b) {
          return a.Index - b.Index;
        });
       

        TopParentView = $ViewList[0];

        console.log('----------------------------------------------');
        console.log('Mosaic onMount End');
        console.log('----------------------------------------------');
    })
    
   
    /* 
    NewViewBox =  new ViewBox(ID, -1, 'H', '100%', '100%', 1, 2, ID.toString, 'inline-flex' );
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(1,  0,  'N', '40%', '100%', -1, -1, '1010', 'Block');
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(2,  0,  'N', '60%', '100%', -1, -1, '2020', 'Block');
    $ViewList.push(NewViewBox);   

      
    NewViewBox =  new ViewBox(3,  2,  'H', '100%', '50%', 5, 6, '3', 'inline-flex');
    $ViewList.push(NewViewBox);

    NewViewBox =  new ViewBox(4,  2,  'N', '100%', '50%', -1, -1, '4', 'Block');
    $ViewList.push(NewViewBox);  

  
    NewViewBox =  new ViewBox(5,  3,  'N', '70%', '100%', -1, -1, '5');
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(6,  3,  'N', '30%', '100%', -1, -1, '6');
    $ViewList.push(NewViewBox);  
    
    NewViewBox =  new ViewBox(7,  4,  'N', '100%', '50%', -1, -1, '5');
    $ViewList.push(NewViewBox);        

    NewViewBox =  new ViewBox(8,  4,  'N', '100%', '50%', -1, -1, '6');
    $ViewList.push(NewViewBox);  
    */
    
      

    //TopParentView = $ViewList[0];   

    
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
 

    /*
    $ViewList.sort(function compare(a, b) {
      return a.Index - b.Index;
    });
    
    $ViewList = $ViewList;
    */


    /*
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
    */
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
        let TopParentIndex = 0;

        let NewParentView = {};

        console.log('----------------------------------------------');
        console.log($ViewList);        
        console.log('----------------------------------------------');

        TopParentIndex = GetTopParentIndex();
        TopRightIndex = GetTopRightWindow(TopParentIndex);
        TopRightView  = GetViewFromList(TopRightIndex);

        if(TopRightView.PID  >= 0){       
          ParentView    = GetViewFromList(TopRightView.PID);
        }       

        LastIndex = $ViewList[($ViewList.length-1)].Index;   

        TopRightElement = document.getElementById(TopRightView.Index);

        if(TopRightView.PID  >= 0){      
          NewParentView         =  new ViewBox(++LastIndex, TopRightView.PID);
        }
        else{
          NewParentView         =  new ViewBox(++LastIndex, -1);
        }
        NewParentView.HRatio  =  TopRightView.HRatio;
        NewParentView.VRatio  =  TopRightView.VRatio;

        V2 =  new ViewBox(++LastIndex, NewParentView.Index);

        if(TopRightElement){
          if(TopRightElement.clientWidth >= TopRightElement.clientHeight){      
            NewParentView.Type = 'H';
            NewParentView.Display = 'inline-flex';

            TopRightView.Type = 'N';
            TopRightView.HRatio = '50%';
            TopRightView.VRatio = '100%';
            TopRightView.Display = 'Block';
            

            V2.Type = 'N';
            V2.HRatio = '50%';
            V2.VRatio = '100%';
            V2.Display = 'Block';          
          } 
          else{
            NewParentView.Type = 'V';
            NewParentView.Display = 'Block';

            TopRightView.Type = 'N';
            TopRightView.HRatio = '100%';
            TopRightView.VRatio = '50%';
            TopRightView.Display = 'Block';

            V2.Type = 'N';
            V2.HRatio = '100%';
            V2.VRatio = '50%';
            V2.Display = 'Block';    
          }

          TopRightView.PID = NewParentView.Index;
          
          V2.V1 = -1;
          V2.V2 = -1;

          NewParentView.V1 = TopRightView.Index;
          NewParentView.V2 = V2.Index;

          if(TopRightView.PID  >= 0){    
            if(ParentView.V1 === TopRightView.Index){
              ParentView.V1 = NewParentView.Index;
            }else{
              ParentView.V2 = NewParentView.Index;
            }
          }


          $ViewList.push(NewParentView);   
          $ViewList.push(V2);   

          if(NewParentView.PID  >= 0){
            $ViewList = $ViewList;
          }else{
            TopParentView = NewParentView;
          }

          //TopParentView = $ViewList[0];
          
          console.log($ViewList);
          console.log(`Compelted Add TopRightWindow ${V2.Index}`);     
        }
        else{

          console.log(`Failed Add TopRightWindow ${V2.Index}`);
        }

        console.log($ViewList);
        console.log('----------------------------------------------');

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
    function GetTopParentIndex(){
      let ResultIndex;

      for(let i = 0; i < $ViewList.length; i++){

        if($ViewList[i].PID == -1){            
            ResultIndex = $ViewList[i].Index;
            break;
        }
      }

      return ResultIndex;
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
    const EventRemoveChild = event => {
      console.log(`Remove Failed::Top Parent View [${event.detail}]`);
    }
    const EventRemoveParent = event => {

      let RemovedIndex = 0;     
     
      let ParentView;
      
      let RemovedView;
      let PairView; 

      let RemoveElement;
      let PairElement;   

      RemovedIndex = event.detail;

      console.log(`Top Parent::Remove Start [${RemovedIndex}]`);

      RemovedView = GetViewFromList(event.detail);

      if(RemovedView.PID >= 0){
        
          ParentView  = GetViewFromList(RemovedView.PID);

          if(ParentView.V1 === RemovedView.Index){
          PairView = GetViewFromList(ParentView.V2);
          }else{
          PairView = GetViewFromList(ParentView.V1);
          }

          PairView.HRatio = ParentView.HRatio;
          PairView.VRatio = ParentView.VRatio;
          PairView.Type   = 'N';
          PairView.Display = 'Block';
          PairView.PID = -1;

          for(let i =0; i<$ViewList.length; i++){
            if(RemovedView.Index === $ViewList[i].Index ){
              $ViewList.splice(i, 1);
              console.log(`Top Parent::RemovedView Removed [${RemovedView.Index}]`);  
              break;
            }
          }
          for(let i =0; i<$ViewList.length; i++){
            if(ParentView.Index === $ViewList[i].Index ){
              $ViewList.splice(i, 1);
              console.log(`Top Parent::ParentView Removed [${ParentView.Index}]`);  
              break;
            }
          }

          TopParentView = PairView;
      }else{
        console.log(`Remove Failed::Top Parent View [${RemovedIndex}]`);
      }      

      console.log(`Top Parent::Remove End [${RemovedIndex}]`);

  
      /*
      console.log(" ");
      console.log("============================================================1");
      RemoveElement = document.getElementById(RemovedIndex);
      console.log("============================================================2");
      console.log(RemoveElement);
      RemoveElement.parentNode.removeChild(RemoveElement);
      console.log("============================================================3");
      console.log(" "); 
      */
 
    }
    function SpliteTopView(Index){

        let SpliteView;
        let ParentView;
        let New_ParentView;
        let New_V2;
        let LastIndex = 0;   
        let SpliteViewElement;

        console.log(`TopParent::Splite Start [${Index}]`); 

        SpliteView = GetViewFromList(Index);
        //ParentView = GetViewFromList(SpliteView.PID);

        LastIndex = $ViewList[($ViewList.length-1)].Index;  

        New_ParentView =  new ViewBox(++LastIndex, -1);
        New_ParentView.Title = New_ParentView.Index.toString();

        /*
        if(ParentView.V1 === SpliteView.Index){
            ParentView.V1 = New_ParentView.Index;        
        }else{
            ParentView.V2 = New_ParentView.Index;
        }
        */

        New_ParentView.HRatio = SpliteView.HRatio;
        New_ParentView.VRatio = SpliteView.VRatio;


        SpliteViewElement = document.getElementById(SpliteView.Index);

        New_V2 =  new ViewBox(New_ParentView.Index + 1, New_ParentView.Index);
        SpliteView.PID = New_ParentView.Index;
        SpliteView.Type = 'N';
        SpliteView.HRatio = '100%';
        SpliteView.VRatio = '100%';
        SpliteView.Display = 'Block';
        SpliteView.V1 = -1;
        SpliteView.V2 = -1;
        SpliteView.Title = SpliteView.Index.toString();

        New_V2.Type = 'N';
        New_V2.HRatio = '100%';
        New_V2.VRatio = '100%';
        New_V2.Display = 'Block';
        New_V2.V1 = -1;  
        New_V2.V2 = -1;  
        New_V2.Title = New_V2.Index.toString();

        New_ParentView.V1 = SpliteView.Index;
        New_ParentView.V2 = New_V2.Index;       

        if(SpliteViewElement){
            if(SpliteViewElement.clientWidth >= SpliteViewElement.clientHeight){ 
                New_ParentView.Type = 'H';
                New_ParentView.Display = 'inline-flex';

                SpliteView.HRatio = '50%';
                New_V2.HRatio = '50%';
            } 
            else{
                New_ParentView.Type = 'V';
                New_ParentView.Display = 'Block';

                SpliteView.VRatio = '50%';
                New_V2.VRatio = '50%'; 
            }
        }   

        $ViewList.push(New_ParentView);   
        $ViewList.push(New_V2);

        //$ViewList = $ViewList;

        /*
        for(let i = 0; i < $ViewList.length; i++)
        {
            if(View.V1 === $ViewList[i].Index){            
                Child_V1 = $ViewList[i];
                console.log(Child_V1);     
                console.log(`Set Complete V1 ${View.V1}`);                
            }

            if(View.V2 === $ViewList[i].Index){          
                Child_V2 = $ViewList[i];
                console.log(Child_V2); 
                console.log(`Set Complete V2 ${View.V2}`);
            }
        }
        */
        TopParentView = New_ParentView;

        console.log($ViewList);
        console.log(`TopParent::Splite End [${Index}] V:${TopParentView.Index} V1:${TopParentView.V1} V2:${TopParentView.V2}`);
    }
    const EventSpliteParent = event => {   
      SpliteTopView(event.detail);        
    }
    function ClearViewList(){
      
      let Legnth = $ViewList.length;
      let View;
      let RemoveE;      
  
      for(let i = Legnth-1; i >= 0; i--)
      {
        View = $ViewList[i];
        //View = null;
        console.log(View);
        //$ViewList.splice(i, 1);
        Object.freeze(View);
      }

      $ViewList = [];

      //$ViewList = $ViewList;

      console.log($ViewList);

      /*
      console.log(`ClearViewList Start`);
      {
        RemoveE = document.getElementById('2');
        console.log(RemoveE);
        RemoveE.parentNode.removeChild(RemoveE);

        RemoveE = document.getElementById('1');
        console.log(RemoveE);
        RemoveE.parentNode.removeChild(RemoveE);

        RemoveE = document.getElementById('0');
        console.log(RemoveE);
        RemoveE.parentNode.removeChild(RemoveE);
      }
      console.log(`ClearViewList End`);
      */

      TopParentView = null;

      //$ViewList = $ViewList;
    } 
    function onClickedLoad1()
    {
      /*
      console.log(`Load0 Start`);
      ClearViewList();            
      console.log(`Load1 Start`);

      

      NewViewBox =  new ViewBox(ID, -1, 'V', '100%', '100%', 1, 2, ID.toString, 'Block' );
      $ViewList.push(NewViewBox);

      NewViewBox =  new ViewBox(1,  0,  'V', '100%', '40%', 3,  4, '1', 'Block');
      $ViewList.push(NewViewBox);

      NewViewBox =  new ViewBox(2,  0,  'N', '100%', '60%', -1, -1,  '2', 'Block');
      $ViewList.push(NewViewBox);   
       
      NewViewBox =  new ViewBox(3,  1,  'N', '100%', '50%', -1, -1, '3', 'Block');
      $ViewList.push(NewViewBox);

      NewViewBox =  new ViewBox(4,  1,  'N', '100%', '50%', -1, -1, '4', 'Block');
      $ViewList.push(NewViewBox);

      console.log($ViewList);

      TopParentView = $ViewList[0];

      console.log(`Load1 End`);
      console.log(`Load0 End`);
      */
    }
    function onClickedLoad2(){ ClearViewList();     }    
    async function onClickedLoad3()
    {  
        console.log('----------------------------------------------');
        console.log('onClickedLoad3');
        console.log('----------------------------------------------');
      
        const res = await fetch("http://127.0.0.1:8887/pane/1")
          .then(response => response.json())
          .then(data => {
          
          console.log('=====================================');
          console.log(data.page_id);
          console.log(data.structure);

          LoadParentArray = data.structure.split('$#$');
          console.log(LoadParentArray);
          for(let i = 0; i < LoadParentArray.length; i++ )
          {
            LoadChildArray = LoadParentArray[i].split(',');
            console.log(LoadChildArray);
            NewViewBox = new ViewBox(LoadChildArray[0],
                                     LoadChildArray[1],
                                     LoadChildArray[2],
                                     LoadChildArray[3],
                                     LoadChildArray[4],
                                     LoadChildArray[5],
                                     LoadChildArray[6],
                                     LoadChildArray[0],
                                     LoadChildArray[7]);
            console.log(NewViewBox);

            $ViewList.push(NewViewBox);
          }
          console.log('=====================================');
          apiData.set(data);
        }).catch(error => {
          console.log(error);
          return [];
        });
      

     
        
    

        TopParentView = $ViewList[0];

        console.log('----------------------------------------------');
        console.log('Mosaic onMount End');
        console.log('----------------------------------------------');

    }
    function onClickedLoad4(){}
    function onClickedLoad5(){}
    function onClickedSave(){}

    </script>

    <div class=divCanvas>
      <header class="hdTop">
        <button class="btnLoad"  type="button" on:click="{onClickedLoad1}">1</button>
        <button class="btnLoad"  type="button" on:click="{onClickedLoad2}">2</button>
        <button class="btnLoad"  type="button" on:click="{onClickedLoad3}">3</button>
        <button class="btnLoad"  type="button" on:click="{onClickedLoad4}">4</button>
        <button class="btnLoad"  type="button" on:click="{onClickedLoad5}">5</button>
        <button class="btnSave"  type="button" on:click="{onClickedSave}">저장</button>

        <button class="btnApply" type="button" on:click="{onClickedAdd}">추가</button> 
        <!--
        <button class="btnApply" type="button" on:click="{onClickedRefresh}">삭제</button>
        -->        
      </header>
      <div id="idContainer" class="divContainer">
        <!--{#if $ViewList.length > 0}-->
        {#if TopParentView}
          <FlexibleView bind:View={TopParentView} {ViewList}  Total_Width="100%" Total_Height="100%" on:RemoveChild={EventRemoveChild} on:RemoveParent={EventRemoveParent} on:SpliteChild={EventSpliteParent} />
        {/if}
        <!--
        {#each $ViewList as V}
          {#if V.Index === 0}
            <FlexibleView bind:View={V} {ViewList}  Total_Width="100%" Total_Height="100%" on:RemoveParent={EventRemoveParent} />  
           {/if}
        {/each}  
        -->
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
        margin-left:  auto;
        margin-right: 10px;
        font-size: 14px; 
        padding: 0px; 
     
      }

      .btnLoad{            
        width:   40px;       
        height:  calc(100% -10px);        
        margin:  10px;
        padding: 0px;
        text-align: center;
        font-size: 14px;  
      }
      .btnSave{            
        width:   80px;       
        height:  calc(100% -10px);        
        margin:  10px;
        padding: 0px;
        text-align: center;
        font-size: 14px;  
      }

      
    </style>