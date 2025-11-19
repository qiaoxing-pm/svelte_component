<script lang="ts">
  import { onMount } from "svelte";

  let { styleCss = {}, util } = $props();
  let styleCssState = $state("");

  onMount(() => {
    styleCssState = util.camelToCss(styleCss);
  });
</script>

<div class="wrapper" style={styleCssState}>
  <slot></slot>
</div>

<style lang="scss">
  .wrapper {
    height: 100%;
    justify-content: left;
    flex-direction: row;

    background: transparent;
  }
</style>
