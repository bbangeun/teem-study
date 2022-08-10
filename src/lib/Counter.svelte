<script>
  let count = 0
  const increment = () => {
    //count += 1
    count += 5
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
