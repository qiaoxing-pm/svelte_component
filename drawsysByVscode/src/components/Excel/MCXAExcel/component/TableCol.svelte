<script lang="ts">
  import { onMount } from "svelte";
  let { styleCss = {},util } = $props();
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: transparent;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
