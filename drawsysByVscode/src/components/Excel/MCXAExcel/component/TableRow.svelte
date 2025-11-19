<script lang="ts">
    import { onMount } from "svelte";
    /**
     * table的最小单元
     */

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
        flex: 1;
        // width: 100%;
        height: 100%;
        display: flex;
        justify-content: left;
        // overflow: hidden;
        flex-direction: row;
        background: transparent;
        // overflow: hidden;
        // width: max-content;
        position: sticky;
        box-sizing: border-box;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
