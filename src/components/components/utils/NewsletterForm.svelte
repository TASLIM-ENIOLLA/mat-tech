<script>
    import CheckBox from "./CheckBox.svelte"

    const formData = {
        email: '',
        agreement: false
    }

</script>

<form class = 'row'>
    <div class = 'col-12 mb-3'>
        <input
            bind:value = {formData.email}
            placeholder = 'Your email...'
            class = 'p-3 rounded-1x border border-dark d-block w-100 bg-clear'
        />
    </div>
    <div class = 'col-auto'>
        <CheckBox bind:checked = {formData.agreement} />
    </div>
    <div class = 'col'>
        <p class = 'm-0 text-capitalize text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.</p>
    </div>
    <div class = 'col-auto'>
        <button disabled = {formData.email.length < 1 || !formData.agreement} type = 'submit' class = 'transit btn text-capitalize theme-bg text-white rounded-1x py-2 px-4 bold'>submit</button>
    </div>
</form>