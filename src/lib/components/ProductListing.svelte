<script lang="ts">
	import type { ProductListing } from '$lib/types/item';
	import { Button, Link, truncate } from 'carbon-components-svelte';
	export let p: ProductListing, id: string;
	// import { ShoppingCartPlus, StarFilled } from 'carbon-icons-svelte';
</script>

<a class="card" href="/p/{id}">
	<div class="item-card">
		<div class="item-image">
			<img src={p.i} alt="item" />
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

  .item-card
      display: flex
      flex-direction: column
      justify-content: space-between
      width: 144px
      row-gap: layout.$spacing-01
      overflow: hidden

  .item-card p
      font-weight: 500
  
  .item-image
    width: 100%
    height: 144px
    display: flex
    justify-content: center
    align-items: center
  
  .item-image img
    object-fit: contain
    width: 100%
    height: 100%
</style>
