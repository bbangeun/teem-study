<script>
  import svelteLogo from './assets/svelte.svg';
  import Counter from './lib/Counter.svelte';
  import GridTiles from "./GridTiles.svelte";
  import GridControl from "./GridControl.svelte";

  //var MainPos = document.getElementById('main1').getBoundingClientRect(); 
  //var Child_Pos = document.getElementById("grid1").getBoundingClientRect(); 
  //var relativePos = {};

  //ChildPos.top    = MainPos.top;
  //ChildPos.left   = MainPos.left  + 50;
  //ChildPos.right  = MainPos.right - 50;
  //ChildPos.bottom = MainPos.bottom;
  let centerX =  document.documentElement.clientWidth;
  let centerY =  document.documentElement.clientHeight;
  console.log(centerX, centerY);
  
  function Refresh(){
   var MainPos   = document.getElementById('main1').getBoundingClientRect(); 
   var Child_Pos = document.getElementById("grid1").getBoundingClientRect();   
   var btn_pos   = document.getElementById("btn1").getBoundingClientRect();   
   console.log(MainPos.width,   MainPos.height);
   console.log(Child_Pos.width, Child_Pos.height);
   console.log(btn_pos.x, btn_pos.y, btn_pos.width, btn_pos.height);

  //  ChildPos.top    = MainPos.top;
  //  ChildPos.left   = MainPos.left  + 50;
  //  ChildPos.right  = MainPos.right - 50;
  //  ChildPos.bottom = MainPos.bottom; 
  }

</script>

<section id="main1">   
  <button id="btn1" type="button"  on:click="{Refresh}">Refresh</button>
  <div id="grid1">
    <div id = "toolbar">
      <svelte:component this={GridControl}/>
    </div>
    <div id="gridTiles">
			<GridTiles/>
		</div>
  </div>  
</section> 

<style>
  #main1{
    background-color: blue;
    position: relative;
    ;
  }
  #btn1{
    background-color: red;       
    width: 300px;
    height: 100px;    
    justify-items: start;    
    text-align: left;
  }
	#grid1{
		position: grid;
		display: grid; 
		grid-template-rows: 1fr 31fr;
		background: linen;
	}
	#toolbar {
		display: flex;
		gap: 1em;
		flex-direction: row-reverse;
	}
	/* #grid2 {
		grid-row-start: 2;
		display: grid;
		grid-template-columns: 1fr 7fr;
		background: forestgreen;
	} */
	#gridTiles {
		grid-row-start: 2;
		background: linen;
	}
</style>