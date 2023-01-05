<script>
    import TopBanner from '../components/components/pages/TopBanner.svelte'
    import Header from '../components/components/pages/Header.svelte'
    import Footer from '../components/components/pages/Footer.svelte'
</script>

<section>
	<TopBanner />
	<Header />
	<slot></slot>
	<Footer />
</section>