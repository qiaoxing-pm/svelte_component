<script lang="ts">
    import { getContext } from "svelte";
    /**
     * table的最小单元, 树组件
     */
    // 竖/横
    type directionType = "vertical" | "horizontal";
    let { direction = "vertical", locationIndex } = $props();
    let setChangeWidthAndHeight = getContext(
        "setChangeWidthAndHeight",
    ) as Function;
    const mousedownHandler = (e: MouseEvent) => {
        const payload = {
            x: e.clientX,
            y: e.clientY,
        };

        document.body.style.userSelect = 'none'

        const mousemoveHandler = (ev: MouseEvent) => {
            if (direction === "vertical") {
                setChangeWidthAndHeight({
                    changeState: ev.clientX - payload.x,
                    local: direction,
                    localIndex: locationIndex - 1,
                    isMove: true,
                });
            }
        };

        const mouseupHandler = (ev: MouseEvent) => {
            setChangeWidthAndHeight({
                changeState: ev.clientX - payload.x,
                local: direction,
                localIndex: locationIndex - 1,
                isMove: false,
            });
            document.body.style.userSelect = ''
            window.removeEventListener("mousemove", mousemoveHandler);
            window.removeEventListener("mouseup", mouseupHandler);
        };

        window.addEventListener("mousemove", mousemoveHandler);
        window.addEventListener("mouseup", mouseupHandler);
    };
</script>

<!-- {#if direction === "vertical"}
    <div class="vertical" onmousedown={mousedownHandler}></div>
{:else if direction === "horizontal"}
    <div class="horizontal" onmousedown={mousedownHandler}></div>
{/if} -->

<style lang="scss">
    .vertical {
        max-width: 1px;
        width: 1px;
        min-width: 1px;
        background-color: var(--border, #ccc);
        cursor: col-resize;
    }

    .horizontal {
        height: 1px;
        max-height: 1px;
        min-height: 1px;
        width: 100%;
        background-color: var(--border, #ccc);
        // cursor: row-resize;
    }
</style>
