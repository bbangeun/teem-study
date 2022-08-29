<script>
  import { Splitpanes, Pane } from "svelte-splitpanes";
  export let node = {};
  export let index = {};
  export let splitPanel;
  export let deletePanel;
</script>
  
  {#if typeof node === "string"}
    <Pane>
      <div on:drag={() => console.log("d")}>
        <button class="n-btn" on:click={splitPanel}>+</button>
        <button class="delete-btn" on:click={deletePanel}>-</button>
      </div>      
      <div class="text">Index {index}</div>
      <div class="text">Panel {node}</div>
    </Pane>
  {:else if typeof node === "object"}
    <Pane>
      <Splitpanes horizontal={node.horizontal}>
        {#each node.nodes as newNode, index}
          <svelte:self
            node={newNode}
            index={index}
            addPanel = {() => splitPanel(node.nodes, index)}
            deletePanel={() => deletePanel(node.nodes, index)}
          />
        {/each}
      </Splitpanes>
    </Pane>
  {/if}

<style>
.text {
  color: black;
}
</style>