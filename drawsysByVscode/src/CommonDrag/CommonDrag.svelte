<script lang="ts">
    import { setContext, onMount, tick } from "svelte";

    type HandleCommonDagItemType = (e: MouseEvent) => void;
    let {
        children,
        commonDragNewOrd = () => {},
    }: { children: () => any; commonDragNewOrd: Function } = $props();
    let parentWrapperRef: HTMLElement | null = $state(null);
    let parentWrapperOverflowRef: HTMLElement | null = $state(null);
    let placeholder: HTMLElement | null = $state(null);
    let draggingElementParent: HTMLElement | null = $state(null);
    let draggingElement: HTMLElement | null = $state(null);
    let offsetY: number = $state(0);
    let newOrdArray: Array<number> = $state<Array<number>>([]);
    let dragCurrentIndex = $state<number>(-1);
    let ordArray = $state<Array<number>>([]);
    // 容器滚动相关状态
    let scrollSpeed = $state(0); // 滚动速度（正数向下，负数向上）
    let scrollInterval = $state<number | null>(null); // 滚动定时器

    /**
     * 拖拽开始,进行初始化
     */
    const handleCommonDagItem = (e: MouseEvent): void => {
        try {
            document.body.style.userSelect = "none";
            const target = e.target as HTMLElement;
            if (target.closest(".drag-op")?.classList.contains("drag-op")) {
                if (e.button !== 0) return;
                // 被拖拽的元素。
                draggingElement = target.closest(
                    ".common-drag-content-content",
                ) as HTMLElement;
                // 拖拽后，在目标位置显示虚线，表示拖拽结束后，被拖拽元素所在的位置。
                placeholder = target.closest(
                    ".common-drag-content",
                ) as HTMLElement;
                // 整体元素所在的位置，用于处理拖拽时，位置变更的效果。
                draggingElementParent = target.closest(
                    ".common-drag-wrapper",
                ) as HTMLElement;
                // 禁用浏览器默认拖拽图标
                if (draggingElement && placeholder && parentWrapperRef) {
                    const rectDraggingElement =
                        draggingElement.getBoundingClientRect();
                    const rectParentWrapperRef =
                        parentWrapperRef.getBoundingClientRect();
                    placeholder.style.border = "1px dashed black";
                    placeholder.style.height = `${rectDraggingElement.height}px`;
                    offsetY = e.clientY;
                    draggingElement.style.position = "fixed";
                    draggingElement.style.opacity = "1";
                    draggingElement.style.boxShadow = "0 0 5px black";
                    draggingElement.style.zIndex = "1002";
                    draggingElement.style.width = `${rectParentWrapperRef.width}px`;
                    draggingElement.style.top = `${offsetY - rectDraggingElement.height / 2}px`;
                    draggingElement.style.left = `${rectParentWrapperRef.x}px`;
                }

                document.addEventListener("mousemove", handleDrag);
                document.addEventListener("mouseup", handleDrop);
            }
        } catch (e) {
            console.error(e);
            console.warn("The drag handle is not selected");
        }
    };

    const handleDrop = (): void => {
        handleDragend();
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleDrop);
    };

    const handleDrag = (e: MouseEvent) => {
        requestAnimationFrame(() => {
            if (draggingElement && parentWrapperOverflowRef) {
                const newY =
                    e.clientY -
                    draggingElement.getBoundingClientRect().height / 2;
                draggingElement.style.top = `${newY}px`;
                const containerRect =
                    parentWrapperOverflowRef.getBoundingClientRect();
                const dragRect = draggingElement.getBoundingClientRect();
                const containerHeight = containerRect.height;
                const edgeThreshold = containerHeight * 0.2;

                // 获取容器当前滚动状态
                const currentScrollTop = parentWrapperOverflowRef.scrollTop;
                const scrollHeight = parentWrapperOverflowRef.scrollHeight;
                const canScrollUp = currentScrollTop > 0;
                const canScrollDown =
                    currentScrollTop < scrollHeight - containerHeight;

                if (
                    dragRect.top < containerRect.top + edgeThreshold &&
                    canScrollUp
                ) {
                    // 只有还能向上滚动时才计算向上的滚动速度
                    scrollSpeed = -Math.min(
                        10,
                        (containerRect.top + edgeThreshold - dragRect.top) / 5,
                    );
                } else if (
                    dragRect.bottom > containerRect.bottom - edgeThreshold &&
                    canScrollDown
                ) {
                    // 只有还能向下滚动时才计算向下的滚动速度
                    scrollSpeed = Math.min(
                        10,
                        (dragRect.bottom -
                            (containerRect.bottom - edgeThreshold)) /
                            5,
                    );
                } else {
                    scrollSpeed = 0;
                }

                if (scrollSpeed !== 0) {
                    if (!scrollInterval) {
                        scrollInterval = window.setInterval(() => {
                            // 再次检查滚动边界，确保不会超出范围
                            const newScrollTop =
                                (parentWrapperOverflowRef as Element)
                                    .scrollTop + scrollSpeed;
                            if (
                                (scrollSpeed < 0 && newScrollTop >= 0) ||
                                (scrollSpeed > 0 &&
                                    newScrollTop <=
                                        scrollHeight - containerHeight)
                            ) {
                                (
                                    parentWrapperOverflowRef as Element
                                ).scrollTop = newScrollTop;
                            } else {
                                clearInterval(scrollInterval as number);
                                scrollInterval = null;
                                scrollSpeed = 0;
                            }
                        }, 16);
                    }
                } else if (scrollInterval) {
                    clearInterval(scrollInterval);
                    scrollInterval = null;
                }
            }
            handleDom(e);
        });
    };

    /**
     * 排序方法
     */
    const handleDom = (e: MouseEvent): void => {
        if (
            parentWrapperOverflowRef &&
            draggingElementParent &&
            draggingElement
        ) {
            const children = Array.from(parentWrapperOverflowRef.children);
            const index =
                dragCurrentIndex > 0
                    ? dragCurrentIndex
                    : children.indexOf(draggingElementParent);

            let changeIndex = Math.round(
                (draggingElement.getBoundingClientRect().top -
                    draggingElementParent.getBoundingClientRect().top) /
                    draggingElementParent.getBoundingClientRect().height,
            );

            if (
                changeIndex &&
                index + changeIndex >= 0 &&
                index + changeIndex < children.length
            ) {
                dragCurrentIndex = index + changeIndex;

                // 更新状态
                commonDragNewOrd(
                    shiftArrayElement(ordArray, index, changeIndex),
                );
                const length = parentWrapperOverflowRef?.children
                    .length as number;
                ordArray = Array.from({ length }, (_, index) => index);
                offsetY = e.clientY;
            }
        }
    };
    function shiftArrayElement(
        array: Array<number>,
        currentIndex: number,
        changeIndex: number,
    ) {
        // 复制原数组，避免修改原始数据
        const newArray = [...array];

        // 检查数组是否为空
        if (newArray.length === 0) {
            throw new Error("数组不能为空");
        }

        // 检查当前索引是否有效
        if (currentIndex < 0 || currentIndex >= newArray.length) {
            throw new Error("当前索引超出数组范围");
        }

        // 获取元素要移动到的新索引
        let newIndex = (currentIndex + changeIndex) % newArray.length;
        if (newIndex < 0) {
            newIndex += newArray.length;
        }

        // 取出要移动的元素
        const [element] = newArray.splice(currentIndex, 1);

        // 将元素插入到新位置
        newArray.splice(newIndex, 0, element);

        return newArray;
    }
    const handleDragend = (): void => {
        if (!parentWrapperRef) return;

        const newChildren: HTMLElement[] = Array.from(
            parentWrapperOverflowRef!.children,
        ) as HTMLElement[];
        newOrdArray = newChildren.map((child) => {
            const tempIndex = Math.round(
                (child.getBoundingClientRect().y -
                    parentWrapperRef!.getBoundingClientRect().y) /
                    child.getBoundingClientRect().height,
            );
            return tempIndex;
        });

        if (draggingElement && placeholder) {
            draggingElement.style.opacity = "";
            draggingElement.style.position = "";
            draggingElement.style.width = "";
            draggingElement.style.left = "";
            draggingElement.style.top = "";
            draggingElement.style.zIndex = "";
            draggingElement.style.boxShadow = "";
            placeholder.style.border = "none";
            placeholder.style.height = "fit-content";
            draggingElement = null;
            dragCurrentIndex = -1;
        }
    };
    // 子组件更新
    const childUpdateState = (state: false) => {
        const length = parentWrapperOverflowRef?.children.length as number;
        ordArray = Array.from({ length }, (_, index) => index);
    };

    setContext("changeChildItem", childUpdateState);

    setContext<HandleCommonDagItemType>(
        "handleCommonDagItem",
        handleCommonDagItem,
    );
    onMount(async () => {
        await tick();
        const length = parentWrapperOverflowRef?.children.length as number;
        ordArray = Array.from({ length }, (_, index) => index);
    });
</script>

<div class="wrapper this-class-for-child" bind:this={parentWrapperRef}>
    <div class="wrapper-overflow" bind:this={parentWrapperOverflowRef}>
        {@render children()}
    </div>
</div>

<style lang="scss">
    .wrapper {
        position: relative;
        height: 100%;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        .wrapper-overflow {
            position: relative;
            height: 100%;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0;
            // &::-webkit-scrollbar {
            //     background-color: transparent;
            //     width: 12px;
            // }

            // &::-webkit-scrollbar-thumb {
            //     background: var(--scrollbar, #ccc);
            //     border-radius: 10px;
            //     // border: 2px solid transparent;
            //     background-clip: content-box;
            // }
        }
    }
</style>
