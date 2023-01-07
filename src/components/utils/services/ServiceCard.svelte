<div class = 'service-card bg-white rounded-2x px-4 py-5'>
	<h3 class = 'gd-sage-bold theme-color text-sentence mb-3'>ice</h3>
	<p class = 'text-capitalize bold m-0'>ice mobile 10GB</p>
	<div class = 'text-sentence'>up to 100Mbit/s</div>
	<div class = 'mt-3 mb-5 d-flex a-i-c'>
		<h4 class = 'gd-sage-bold theme-color'>$299&nbsp;</h4>
		<span>/ month</span>
	</div>
	<button class = 'd-block w-100 p-3 rounded-2x border-0 bg-purple text-white bold text-capitalize btn'>add subscription</button>
</div>

<style>
	.service-card{
		position: relative;
		top: 0;
		left: 0;
	}
	.service-card::after{
		z-index: -1000;
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 20px;
		content: '';
		transform: scale(.8);
		background: var(--creame);
		position: absolute;
		top: -15%;
		left: 0%;
	}
</style>