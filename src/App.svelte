<script>    
    import svelteLogo from './assets/svelte.svg';    
    import Counter from './lib/Counter.svelte';  
    import InitPage from "./InitPage.svelte";
    import Mosaic from './Mosaic.svelte';  
	import DynamicLayout from './DynamicLayout.svelte';
	import Split from './Split.svelte';
    import {Router, Link, Route} from "svelte-routing";

    export let url ="";	
</script>

<Router url="{url}">
	<nav>
		<Link to="/">InitPage</Link>		
		<Link to="Mosaic">Mosaic</Link>		
		<Link to="DynamicLayout">Layout</Link>		
		<Link to="Split">Split</Link>
	</nav>
	<div style="height:100%;">
		<Route path="/"><InitPage/></Route>
		<Route path="Mosaic" component={Mosaic}></Route>
		<Route path="DynamicLayout" component={DynamicLayout}></Route>
		<Route path="Split" component={Split}></Route>
	</div>
</Router>

  
  

  
