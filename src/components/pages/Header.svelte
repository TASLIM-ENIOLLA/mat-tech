<section class = 'py-3 position-sticky top-0 left-0 backdrop-effect'>
    <div class = 'container'>
        <div class = 'row a-i-c j-c-space-between'>
            <div class = 'col-auto'>
                <a href = '/'><img width = '45' src = '/favicon.png' /></a>
            </div>
            <div class = 'd-none d-lg-block col-auto text-purple bold text-capitalize'>
                <a class = 'd-inline-block mx-4 bold' href = '/'>home</a>
                <a class = 'd-inline-block mx-4 bold' href = '/features'>features</a>
                <a class = 'd-inline-block mx-4 bold' href = '/integration'>integration</a>
                <a class = 'd-inline-block mx-4 bold' href = '/pricing'>pricing</a>
            </div>
            <div class = 'd-none d-lg-block col-auto bold'>
                <button class = 'sign-in-btn bold btn mx-3 text-capitalize py-2 px-4 rounded-1x bg-clear text-purple'>sign in</button>
                <button class = 'free-trial-btn bold btn mx-3 text-capitalize py-2 px-4 rounded-1x bg-purple text-white'>start free trial</button>
            </div>
            <div class = 'col-auto d-lg-none'>
                <button class = 'bg-clear btn border-0'>
                    <span class = 'bi-border-width text-purple fo-s-22'></span>
                </button>
            </div>
        </div>
    </div>
</section>

<style>
    .backdrop-effect{
        z-index: 10;
        background: #ffffff66;
        backdrop-filter: blur(4px);
    }
    .sign-in-btn{
        border: 2px solid var(--purple);
    }
    .free-trial-btn{
        border: 2px solid var(--purple);
    }
</style>