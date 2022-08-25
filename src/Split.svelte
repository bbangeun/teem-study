<script>
    import { Splitpanes } from "svelte-splitpanes";
    import Panel from "./Panel.svelte";
  
    const addPanel = (nodes, index) => {
      console.log(nodes);
      counter += 1;

      console.log('counter: ' +counter);      
      
      if (Object.keys(nodes).length == 1) { // 반으로 가르는건 push 
        nodes.push(String(counter));
      } 
      else if (counter == 3) {
        nodes[1] = {
          horizontal: true,
          nodes: [String(counter-1), String(counter)]
      };
      }
      else if (counter % 2 == 0) { // 짝수 horizontal false 
        splitPanel(mosaicData.nodes[1], false);
      } 
      else if (counter % 2 == 1) { // 홀수 horizontal true 
        splitPanel(mosaicData.nodes[1], true);        
      } 
      else {
        console.log('else: ' + counter); 
      }     
            
      console.log(nodes);
      
      mosaicData = mosaicData;
    };
  
    const deletePanel = (nodes, index) => {
      console.log('delte index: ' + index);
      counter -= 1;

      nodes.splice(index, 1);      

      mosaicData = mosaicData;
    };

    const splitPanel = (node, horizontal) => {   

      let nodeA = String(counter-1);
      let nodeB = String(counter);

      let splitNode = {
          horizontal: horizontal,
          nodes: [nodeA, nodeB]
      }

      if (typeof node === "string") { // 
        node = splitNode
      }
      else if (typeof node.nodes[1] === "object") {
        splitPanel(node.nodes[1], horizontal) // 재귀 
      }
      else { // typeof node.nodes[1] === "string"
        node.nodes[1] = splitNode
      }

    };

    let mosaicData = {
      horizontal: false,
      nodes: [
        "1", 
      ],
    };

    let counter = 1;

  </script>
  
  <div>
    <button on:click={() => addPanel(mosaicData.nodes)}>+</button>
  </div>
  <Splitpanes class="default-theme" style="height: 100%">
    {#each mosaicData.nodes as node, index}
      <Panel
        {node}
        deletePanel = {() => deletePanel(mosaicData.nodes, index)}
      />
    {/each}
  </Splitpanes>

  