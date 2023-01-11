<script>
	import UserHead from './UserProfile.svelte'
</script>

<section class = 'container py-4 border bg-white rounded-lg text-black border-white'>
	<div class = 'row'>
		<div class = 'col-12 border-white mb-4'>
			<div class = 'row a-i-c'>
				<div class = 'col-auto'>
					<UserHead />
				</div>
				<div class = 'col'>
					<h5 class = 'gd-sage-bold one-line text-capitalize mb-1'>john doe</h5>
					<div class = 'one-line text-sentence'>Lorem ipsum dolor sit amet</div>
				</div>
			</div>
		</div>
		<div class = 'col-12'>
			<p class = 'm-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat.</p>
		</div>
	</div>
</section>