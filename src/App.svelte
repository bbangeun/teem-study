<script>    
    import svelteLogo from './assets/svelte.svg';    
    import Counter from './lib/Counter.svelte';  
    import InitPage from "./InitPage.svelte";
    import Mosaic from './Mosaic.svelte';  
	import DynamicLayout from './DynamicLayout.svelte';
    import {Router, Link, Route} from "svelte-routing";

    export let url ="";	
</script>

<Router url="{url}">
	<nav>
		<Link to="/">InitPage</Link>		
		<Link to="Mosaic">Mosaic</Link>		
		<Link to="DynamicLayout">Layout</Link>		
	</nav>
	<div>
		<Route path="/"><InitPage/></Route>
		<Route path="Mosaic" component={Mosaic}></Route>
		<Route path="DynamicLayout" component={DynamicLayout}></Route>
	</div>
</Router>

  
  

  
