<script lang="ts">
    import LoadScript from 'svelte-google-maps-api/LoadScript.svelte';
import GoogleMap from 'svelte-google-maps-api//GoogleMap.svelte';

const options = {
    zoom: 4,
    center: {lat: -33, lng: 151},
};

const handleLoad = (map: google.maps.Map) => {
    // do something with the loaded map
};
</script>

<LoadScript apiKey={yourApiKey}>
<GoogleMap {options} onLoad={handleLoad} />
</LoadScript>