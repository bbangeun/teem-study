<script>
    import { Splitpanes } from "svelte-splitpanes";
    import Panel from "./Panel.svelte";
  
    const addPanel = (nodes, index) => {
      // console.log(nodes);
      counter += 1;

      console.log('counter: ' +counter);      
      

      if (Object.keys(nodes).length == 1) {
        nodes.push(String(counter))
      }       
      else if (counter == 3) {
        nodes[1] = {
          horizontal: true,
          nodes: [String(counter-1), String(counter)],
        };
      }
      else if (counter % 2 == 0) { // 짝수 horizontal false 
        recursion(mosaicData.nodes[1], false);
      } 
      else if (counter % 2 == 1) { // 홀수 horizontal true         
        recursion(mosaicData.nodes[1], true);        
      } 
      else {
        console.log('else: ' + counter); 
      }     
            
      console.log(nodes);
      
      mosaicData = mosaicData;
    };
  
    const deletePanel = (nodes, index) => {
      
      console.log(index);
      nodes.splice(index, 1);      

      mosaicData = mosaicData;

    };

    const recursion = (node, horizontal) => {   

      let nodeA = String(counter - 1);
      let nodeB = String(counter);

      let splitNode = {
          horizontal: horizontal,
          nodes: [nodeA, nodeB],
          count: counter
      }

      if (typeof node === "string") { // 3
        node = splitNode
      }
      else if (typeof node.nodes[1] === "object") { // 4 이상 
        recursion(node.nodes[1], horizontal) // 재귀 
      }
      else { // typeof node.nodes[1] === "string"
        node.nodes[1] = splitNode
      }

    };

    const splitPanel = (nodes, index) => {

      // let target = document.querySelector('')

      counter+=1;

      if (index >= 0 && typeof nodes[index] === "string") { 
        // splice(추가할 인덱스, 0, '추가할내용');
        nodes.splice(index+1, 0, String(counter))
      } 
      else if (typeof nodes[index] === "object") { 
        //r
      }
      else {
        // 
      }

      mosaicData = mosaicData;
    }

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
        {index}
        splitPanel = {() => splitPanel(mosaicData.nodes, index)}        
        deletePanel = {() => deletePanel(mosaicData.nodes, index)}
      />
    {/each}
  </Splitpanes>

  