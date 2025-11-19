<script lang="ts">
    import { getContext, onMount, tick } from "svelte";

    // 有手柄，只能对手柄拖拽，没有就是可以整体拖拽
    let { children, hasHandle = true } = $props();
    let wrapperRef: HTMLElement;
    let childrenHeight = $state(0);

    const handleCommonDagItem = getContext("handleCommonDagItem") as Function;
    const mountChild = getContext("changeChildItem") as Function;
    const handleMouseDown = (e: MouseEvent) => {
        handleCommonDagItem(e);
    };

    // 在组件挂载后获取children高度
    onMount(async () => {
        // 等待DOM更新完成
        await tick();
        // this-class-for-child
        // 找到children内容的容器元素
        const contentElement = wrapperRef?.querySelector(".content-content");
        if (contentElement) {
            childrenHeight = contentElement.getBoundingClientRect().height;
        }
        mountChild(true);
    });
</script>

<div bind:this={wrapperRef} class="wrapper common-drag-wrapper">
    <div
        onmousedown={handleMouseDown}
        class="wrapper-content common-drag-content"
        role="button"
        tabindex="0"
        aria-label="Drag Element"
    >
        <div class="content-content common-drag-content-content {hasHandle?"":"drag-op"}">
            {#if hasHandle}
                <div class="drag-op">
                    <span></span>
                </div>
            {/if}
            {@render children()}
        </div>
    </div>
</div>

<style lang="scss">
    .wrapper {
        width: 100%;
        height: fit-content;
        margin: 0;
        .wrapper-content {
            width: 100%;
            height: fit-content;
            display: flex;
            margin: 0;
            .common-drag-content-content {
                width: 100%;
                height: fit-content;
                position: relative;
                display: flex;
                box-sizing: border-box;
                flex-direction: row;
                justify-content: left;
                // border: 1px dashed transparent;
                align-items: center;
                margin: 0;
                .drag-op {
                    display: flex;
                    width: 15px;
                    height: 12px;
                    max-width: 15px;
                    max-height: 12px;
                    min-width: 15px;
                    min-height: 12px;
                    display: block;
                    z-index: inherit;
                    cursor: move;
                    margin: 0 10px;

                    span {
                        display: block;
                        height: 2px;
                        width: 100%;
                        background-color: var(--drag-op, #686868);
                        position: relative;

                        &:before {
                            content: "";
                            display: block;
                            height: 2px;
                            width: 100%;
                            background-color: var(--drag-op, #686868);
                            position: absolute;
                            top: 5px;
                        }

                        &:after {
                            content: "";
                            display: block;
                            height: 2px;
                            width: 100%;
                            background-color: var(--drag-op, #686868);
                            position: absolute;
                            top: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
