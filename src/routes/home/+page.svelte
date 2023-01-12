<script>
	import {onMount} from 'svelte'

	import UserHead from '../../components/utils/others/UserProfile.svelte'
	import ServiceCard from '../../components/utils/services/ServiceCard.svelte'
	import TestimonialCard from '../../components/utils/others/TestimonialCard.svelte'
	import MailSubscription from '../../components/utils/footer/MailSubscription.svelte'

	onMount(() => {
		window.onscroll = () => {
			const element = document.querySelector("#main-container")
			const observer = new IntersectionObserver((entries) => {
				if(entries[0].isIntersecting === true) console.log('Element now in view')
				else console.log('Element now out of view')
			}, {threshold: [0]});
			
			observer.observe(element)
		}
	})
</script>

<header
	class = 'py-3 bg-white shadow position-sticky top-0 left-0'
	style = 'z-index: 10;'>
	<div class = 'container'>
		<div class = 'row a-i-c j-c-space-between'>
			<div class = 'col-auto'>
				<a href = ''>
					<img src = '/favicon.png' width = '40' />
				</a>
			</div>
			<div class = 'd-none d-lg-block col-auto gd-sage-bold'>
				<a href = '' class = 'mx-4 d-inline-block text-capitalize'>about</a>
				<a href = '' class = 'mx-4 d-inline-block text-capitalize'>services</a>
				<a href = '' class = 'mx-4 d-inline-block text-capitalize'>project</a>
				<a href = '' class = 'mx-4 d-inline-block text-capitalize'>contact</a>
			</div>
			<div class = 'd-none d-lg-block col-auto'>
				<button class = 'px-4 rounded-lg gd-sage-bold py-3 text-capitalize bg-black outline-0 border-0 text-white'>
					try for free
				</button>
			</div>
			<div class = 'd-lg-none col-auto'>
				<button class = 'px-3 py-2 text-capitalize bg-black outline-0 border-0 text-white'>
					<span class = 'bi-border-width fo-s-20'></span>
				</button>
			</div>
		</div>
	</div>
</header>
<section id = 'main-container' class = 'py-5'>
	<div class = 'container'>
		<div class = 'row j-c-c py-5'>
			<div class = 'col-lg-6 text-center'>
				<h2 class = 'gd-sage-bold text-capitalize'>
					what we provide
				</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
		</div>
		<div class = 'container'>
			<div class = 'row j-c-c'>
				<div class = 'col-md-4 col-lg-3 mb-lg-0 mb-5'>
					<ServiceCard />
				</div>
				<div class = 'col-md-4 col-lg-3 mb-lg-0 mb-5'>
					<ServiceCard />
				</div>
				<div class = 'col-md-4 col-lg-3 mb-lg-0 mb-5'>
					<ServiceCard />
				</div>
			</div>
		</div>
	</div>
</section>
<section id = 'main-container' class = 'py-5'>
	<div class = 'container'>
		<div class = 'row a-i-c j-c-c'>
			<div class = 'col-lg-10'>
				<div class = 'row j-c-space-between a-i-c'>
					<div class = 'col-md-4 mb-5'>
						<img src = '/images/sofa2.png' class = 'gray-image d-block w-100' />
					</div>
					<div class = 'col-md-7 mb-5'>
						<h2 class = 'gd-sage-bold text-capitalize mb-3'>
							we believe that a team makes any project better
						</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<div>
							<button class = 'px-5 rounded-lg gd-sage-bold py-3 text-capitalize bg-black outline-0 border-0 text-white'>
								try for free
							</button>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</section>
<section class = 'py-5'>
	<div class = 'container'>
		<div class = 'row j-c-c a-i-c'>
			<div class = 'col-lg-10'>
				<div class = 'row j-c-space-between a-i-c flex-row-reverse'>
					<div class = 'col-md-5 mb-md-0 mb-5'>
						<img src = '/images/sofa2.png' class = 'gray-image d-block w-100' />
					</div>
					<div class = 'col-md-7 mb-md-0 mb-5'>
						<h2 class = 'gd-sage-bold text-capitalize mb-3'>
							simple way to make stylish living room
						</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<div class = 'row my-3'>
							<div class = 'col-lg-3 col'>
								<h2 class = 'gd-sage-bold mb-1'>15</h2>
								<p class = 'text-sentence'>ipsum dolor sit labore et</p>
							</div>
							<div class = 'col-lg-3 col'>
								<h2 class = 'gd-sage-bold mb-1'>350</h2>
								<p class = 'text-sentence'>ut labore et dolore</p>
							</div>
							<div class = 'col-lg-3 col'>
								<h2 class = 'gd-sage-bold mb-1'>25</h2>
								<p class = 'text-sentence'>dolore magna aliqua</p>
							</div>
						</div>
						<div>
							<button class = 'px-5 rounded-lg gd-sage-bold py-3 text-capitalize bg-black outline-0 border-0 text-white'>
								try for free
							</button>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</section>
<section class = 'py-5'>
	<div class = 'pb-5 container text-black'>
		<div class = 'row j-c-c'>
			<div class = 'col-lg-6 text-center'>
				<h2 class = 'gd-sage-bold text-capitalize'>
					words from our customers
				</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
		</div>
	</div>
	<div class = 'container-fluid bg-black py-4'>
		<div class = 'row py-5'>
			<div class = 'col-12'>
				<div class = 'container'>
					<div class = 'row'>
						<div class = 'col-md-6 col-lg-4 mb-lg-0 mb-5'>
							<TestimonialCard />
						</div>
						<div class = 'col-md-6 col-lg-4 mb-lg-0 mb-5'>
							<TestimonialCard />
						</div>
						<div class = 'col-md-6 col-lg-4 mb-lg-0 mb-5'>
							<TestimonialCard />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<footer class = 'py-5'>
	<div class = 'container text-black'>
		<div class = 'row j-c-c mb-5 pb-5'>
			<div class = 'col-lg-6 text-center'>
				<h2 class = 'gd-sage-bold text-capitalize'>
					subscribe to our newsletter
				</h2>
				<p class = 'text-dark'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<div class = 'pt-3'>
					<MailSubscription />
				</div>
			</div>
		</div>
		<div class = 'row'>
			<div class = 'col-lg-3 mb-lg-0 mb-5'>
				<h5>
					<a href = ''><img src = '/favicon.png' width = '45' /></a>
				</h5>
				<div>
					<address class = 'text-capitalize'>
						2305 NW Kearney St, Portland, Oregon.
					</address>
				</div>
				<div class = 'text-capitalize'>
					<p>&copy; {new Date().getFullYear()} MAT Technical Services, all rights reserved.</p>
				</div>
			</div>
			<div class = 'col-12 col-lg-3 col-sm-6 mb-lg-0 mb-5'>
				<h5 class = 'gd-sage-bold text-capitalize mb-4'>about us</h5>
				<div>
					<p><a href = '' class = 'text-capitalize'>Contact information</a></p>
					<p><a href = '' class = 'text-capitalize'>About Us</a></p>
					<p><a href = '' class = 'text-capitalize'>Return Policy</a></p>
					<p><a href = '' class = 'text-capitalize'>Contract Policy</a></p>
					<p><a href = '' class = 'text-capitalize'>Cookie Declaration</a></p>
					<p><a href = '' class = 'text-capitalize'>Privacy Policy</a></p>
				</div>
			</div>
			<div class = 'col-12 col-lg-3 col-sm-6 mb-lg-0 mb-5'>
				<h5 class = 'gd-sage-bold text-capitalize mb-4'>support</h5>
				<div>
					<p><a href = '' class = 'text-capitalize'>FAQs</a></p>
					<p><a href = '' class = 'text-capitalize'>Shipping &amp; purchase</a></p>
					<p><a href = '' class = 'text-capitalize'>Care guide</a></p>
					<p><a href = '' class = 'text-capitalize'>Warranty</a></p>
				</div>
			</div>
			<div class = 'col-12 col-lg-3 col-sm-6 mb-lg-0 mb-5'>
				<h5 class = 'gd-sage-bold text-capitalize mb-4'>reach us</h5>
				<div>
					<p>
						<a href = 'mailto://support@mattech.com'class = 'text-lowercase'>
							support@mattech.com
						</a>
					</p>
					<p>
						<a href = 'tel://(503) 224-5586' class = 'text-capitalize'>
							(503) 224-5586
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</footer>

<style type="text/css">
	.gray-image{
		filter: grayscale(80%);
	}
</style>