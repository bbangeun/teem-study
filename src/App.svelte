<script>
  import { Router, Link, Route } from 'svelte-routing'
  import InitPage from './InitPage.svelte'
  import Mosaic from './Mosaic.svelte'
  import DynamicLayout from './DynamicLayout.svelte'
  import Split from './Split.svelte';
  import Drag from './Drag.svelte';
  export let url = ''
</script>

<style>
  .divBg{
    background-color: burlywood;
    display: block;
    widows:  100%;
    height:  100%;
    margin:  0px;
    padding: 0px;
  } 
  .navTop{    
    background-color: black;
    text-align: left;
    margin: 0px;
    padding: 10px;        
    width:   calc(100%-10px);
    /*height:  calc(5% - 20px);*/
    height:  calc(50px - 20px);
  }
  .divContent{    
    width:    100%;
    height:   calc(100% - 50px);
    margin:   0px;
    padding:  0px;
  }
  

</style>

<div class="divBg">
  <Router {url}>
    <nav class="navTop">
      <Link to="/">InitPage</Link>
      <Link to="Mosaic">Mosaic</Link> 
      <Link to="DynamicLayout">Layout</Link>
      <Link to="Split">Split</Link> 
      <Link to="Drag">Drag</Link> 
    </nav>
    <div class="divContent">
      <Route path="/"><InitPage /></Route>
      <Route path="Mosaic" component={Mosaic} /> 
      <Route path="DynamicLayout" component={DynamicLayout}/>
      <Route path="Split" component={Split} /> 
      <Route path="Drag" component={Drag} /> 
    </div>
  </Router>
</div>
