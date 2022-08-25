<script>
  import { Splitpanes, Pane } from "svelte-splitpanes";
  export let node = {};
  export let deletePanel;
</script>
  
  {#if typeof node === "string"}
    <Pane>
      <div on:drag={() => console.log("d")}>
        <button on:click={deletePanel}>-</button>
      </div>
      <div class="node">{node}</div>
    </Pane>
  {:else if typeof node === "object"}
    <Pane>
      <Splitpanes horizontal={node.horizontal}>
        {#each node.nodes as newNode, index}
          <svelte:self
            node={newNode}
            deletePanel={() => deletePanel(node.nodes, index)}
          />
        {/each}
      </Splitpanes>
    </Pane>
  {:else}{/if}

<style>
.node {
  color: black;
}
</style>