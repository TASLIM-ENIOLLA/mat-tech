<script>
    import CheckBox from "../others/CheckBox.svelte"

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
            class = 'p-3 rounded-1x text-white border border-white d-block w-100 bg-clear'
        />
    </div>
    <div class = 'col-auto'>
        <CheckBox bind:checked = {formData.agreement} />
    </div>
    <div class = 'col'>
        <p class = 'm-0 text-capitalize text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.</p>
    </div>
    <div class = 'col-auto'>
        <button disabled = {formData.email.length < 1 || !formData.agreement} type = 'submit' class = 'transit btn text-capitalize bg-white text-purple rounded-1x py-2 px-4 bold'>submit</button>
    </div>
</form>

<style>
    ::placeholder{
        color: var(--light);
    }
</style>