<script>
    import NewsletterForm from "../utils/NewsletterForm.svelte";
</script>

<footer class = 'bg-light min-vh-100 border-top'>
    <div class = 'container theme-color'>
        <div class = 'row py-5 border-bottom j-c-space-between align-items-end'>
            <div class = 'col-lg-7 col-md-12 mb-4 mb-lg-0'>
                <!-- <img src = '/logo.png' class = 'mb-2' width = '200' on:click = {() => window.location = '/'} /> -->
                <p class = 'm-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius.</p>
            </div>
            <div class = 'col-lg-auto col-md-12'>
                <div class = 'row a-i-c'>
                    <div class = 'col-auto'>
                        <span>Follow our socials</span>
                    </div>
                    <div class = 'col-auto'>
                        <a href = '/'><span class = 'bi-facebook fo-s-20 mr-5'></span></a>
                        <a href = '/'><span class = 'bi-instagram fo-s-20 mr-5'></span></a>
                        <a href = '/'><span class = 'bi-linkedin fo-s-20 mr-5'></span></a>
                        <a href = '/'><span class = 'bi-twitter fo-s-20 mr-5'></span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class = 'row py-5'>
            <div class = 'col-6 col-sm-6 col-md-4 col-lg-2 mb-lg-0 mb-5'>
                <h6 class = 'text-capitalize bold text-dark mb-4'>products</h6>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>all products</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>product 1 (one)</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>product 2 (two)</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>product 3 (three)</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>product 4 (four)</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>product 5 (five)</a>
                </div>
            </div>
            <div class = 'col-6 col-sm-6 col-md-4 col-lg-2 mb-lg-0 mb-5'>
                <h6 class = 'text-capitalize bold text-dark mb-4'>resources</h6>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>community</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>blog and articles</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>support center</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>integrations</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>tutorials</a>
                </div>
            </div>
            <div class = 'col-6 col-sm-6 col-md-4 col-lg-2 mb-lg-0 mb-5'>
                <h6 class = 'text-capitalize bold text-dark mb-4'>company</h6>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>about</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>contact us</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>careers</a>
                </div>
                <div class = 'mb-3 text-capitalize'>
                    <a href = '/'>license</a>
                </div>
            </div>
            <div class = 'col-12 col-md-7 col-lg-5 mb-lg-0 mb-5'>
                <h6 class = 'text-capitalize bold text-dark mb-4'>newsletter</h6>
                <div class = 'mb-3'>
                    <NewsletterForm />
                </div>
            </div>
        </div>
    </div>
</footer>