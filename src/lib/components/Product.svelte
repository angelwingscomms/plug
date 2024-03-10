<script lang="ts">
	import type { ProductListing } from '$lib/types/product';
	import { Button, Link } from 'carbon-components-svelte';
	export let p: ProductListing, id: string;
	import { ShoppingCartPlus, StarFilled } from 'carbon-icons-svelte';
</script>

<div class="product-card">
	<div class="product-image">
		<img src={p.i} alt="example" />
	</div>
	<Link href="/product/id/{id}">{name}</Link>
	<p>{p.up}{p.p}</p>
	<div class="act">
		<Button>Buy Now</Button>
		<Button icon={ShoppingCartPlus} />
	</div>
</div>

<style lang="sass">
  @use '@carbon/layout'

  .product-card
      display: flex
      flex-direction: column
      justify-content: space-between
      width: 300px
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
