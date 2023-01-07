<script>
	import ServiceCard from '../utils/services/ServiceCard.svelte'
</script>

<section class = 'py-5'>
	<div class = 'container py-5'>
		<div class = 'row mb-5'>
			<div class = 'col-lg-7 mx-auto text-center'>
				<h3 class = 'gd-sage-bold text-purple text-sentence'>get the most our of our patronage by choosing a subscription that works for you.</h3>
			</div>
		</div>
		<div class = 'row pt-3'>
			<div class = 'col-lg-3 col-md-4 col-sm-6 col-xsm-6 col-12 mb-5'>
				<ServiceCard />
			</div>
			<div class = 'col-lg-3 col-md-4 col-sm-6 col-xsm-6 col-12 mb-5'>
				<ServiceCard />
			</div>
			<div class = 'col-lg-3 col-md-4 col-sm-6 col-xsm-6 col-12 mb-5'>
				<ServiceCard />
			</div>
			<div class = 'col-lg-3 col-md-4 col-sm-6 col-xsm-6 col-12 mb-5'>
				<ServiceCard />
			</div>
		</div>
	</div>
</section>