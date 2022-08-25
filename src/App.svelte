<script>
  import { Router, Link, Route } from 'svelte-routing'
  import InitPage from './InitPage.svelte'
  import Mosaic from './Mosaic.svelte'
  import DynamicLayout from './DynamicLayout.svelte'

  export let url = ''
</script>

<Router {url}>
  <nav>
    <Link to="/">InitPage</Link>
    <Link to="Mosaic">Mosaic</Link>
    <Link to="DynamicLayout">Layout</Link>
  </nav>
  <div>
    <Route path="/"><InitPage /></Route>
    <Route path="Mosaic" component={Mosaic} />
    <Route path="DynamicLayout" component={DynamicLayout} />
  </div>
</Router>
