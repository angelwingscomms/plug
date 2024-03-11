<script lang="ts">
	import type { ProductListing } from '$lib/types/product';
	import { Button, Link, truncate } from 'carbon-components-svelte';
	export let p: ProductListing, id: string;
	// import { ShoppingCartPlus, StarFilled } from 'carbon-icons-svelte';
</script>

<a class="card" href="/product/{id}">
	<div class="product-card">
		<div class="product-image">
			<img src={p.i} alt="product" />
		</div>
		<p use:truncate>{p.n}</p>
		<!-- <Link href="/user/{p.u}">contact seller</Link> -->
		<p>GH₵ {p.p}</p>
		<div class="act">
			<!-- <Button>Buy Now</Button>
      <Button icon={ShoppingCartPlus} /> -->
		</div>
	</div>
</a>

<style lang="sass">
  @use '@carbon/layout'

  .card
    text-decoration: none
    // color: white
    all: inherit

  .product-card
      display: flex
      flex-direction: column
      justify-content: space-between
      width: 144px
      row-gap: layout.$spacing-03
      overflow: hidden
  
  .product-image
    width: 100%
    display: flex
    justify-content: center
    align-items: center
  
  .product-image img
    width: 100%
    height: auto
  
    .act
        display: flex
        flex-direction: row
</style>
