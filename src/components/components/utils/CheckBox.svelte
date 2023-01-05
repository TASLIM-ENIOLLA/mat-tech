<script>
    export let checked = false
</script>

<button type = 'button' on:click = {() => checked = !checked} class = 'bg-clear border-0'>
    <span class = {`bi-check-square${checked ? '-fill' : ''} fo-s-16 theme-color`}></span>
</button>