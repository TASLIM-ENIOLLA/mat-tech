<script>
    export let checked = false
</script>

<button type = 'button' on:click = {() => checked = !checked} class = 'outline-0 bg-clear border-0'>
    <span class = {`bi-check-square${checked ? '-fill' : ''} fo-s-16 text-white`}></span>
</button>