<script lang="ts">
  import { onDestroy, onMount, setContext } from "svelte";

  interface itemBorderType {
    top: number;
    left: number;
    width: number;
    height: number;
    display: string;
  }

  /**
   * table的最小单元
   */

  let {
    styleCss = {},
    // headData,
    api,
    util,
  } = $props();
  let styleCssState = $state("");
  let wrapperRef = $state<HTMLElement | undefined>();
  let lineVLeft = $state<number>(0);
  let lineHTop = $state<number>(0);
  let selectLength = $state<number>(0);
  let itemBorder = $state<itemBorderType>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    display: "none,",
  });
  let startBorder = $state<itemBorderType>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    display: "none,",
  });
  setContext("setHead", (e) => {});
  setContext("setResizing", (e) => {
    const rect = wrapperRef!.getBoundingClientRect();
    if (e.type === "move") {
      if (e.local === "right") {
        lineVLeft = util.clamp(
          e.rect.left - rect.x + 50,
          e.clientX - rect.x,
          rect.width
        );
      }

      if (e.local === "bottom") {
        lineHTop = util.clamp(e.rect.top + 15, e.clientY - rect.y, rect.height - 2);
      }
    } else if (e.type === "moveDown") {
      if (lineVLeft === 0) {
        return;
      }
      api.eventBus.emit("table:change:heightOrWidth", {
        treeIndex: e.treeIndex,
        newWidth: parseInt(`${lineVLeft - e.rect.left + rect.x}`),
        newHeight: parseInt(`${lineHTop - e.rect.top + rect.y}`),
      });

      lineVLeft = 0;
      lineHTop = 0;
    }
  });

  const changeBorder = (e) => {
    if (wrapperRef) {
      const rect = wrapperRef.getBoundingClientRect();
      const widthStatus =
        itemBorder.left + rect.x < e.clientX &&
        e.clientX < itemBorder.left + rect.x + itemBorder.width;
      const heightStatus =
        itemBorder.top + rect.y < e.clientY &&
        e.clientY < itemBorder.top + rect.y + itemBorder.height;
      if (!(widthStatus && heightStatus)) {
        api.eventBus.emit("tableSelectLength", {
          selectLength: 1,
        });
        itemBorder = {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          display: "none,",
        };

        startBorder = {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          display: "none,",
        };
      } else {
        api.eventBus.emit("tableSelectLength", {
          selectLength,
        });
      }
    }
  };

  onMount(() => {
    styleCssState = util.camelToCss(styleCss);
    api.eventBus.on(
      api.constant.structAndVarRelationExcels.EXCEL_ITEM_CLICK,
      (e) => {
        requestAnimationFrame(() => {
          if (wrapperRef) {
            const rect = wrapperRef.getBoundingClientRect();
            if (e.type === "tableItem") {
              const widthStatus =
                itemBorder.left + rect.x < e.client.x &&
                e.client.x < itemBorder.left + rect.x + itemBorder.width;
              const heightStatus =
                itemBorder.top + rect.y < e.client.y &&
                e.client.y < itemBorder.top + rect.y + 28;
              if (widthStatus && heightStatus) {
                return;
              }
              itemBorder = {
                left: e.rect.left - 2 - rect.left,
                top: e.rect.top - 2 - rect.top - 2,
                width: e.rect.width + 2,
                height: 28,
                display: "block",
              };
              startBorder = {
                left: e.rect.left - 2 - rect.left,
                top: e.rect.top - 2 - rect.top - 2,
                width: e.rect.width + 2,
                height: 28,
                display: "block",
              };
            } else if (e.type === "boxSelection") {
              if (e.rect.length < 0) {
                if (startBorder.top + e.rect.length * 26 - 26 < -10) {
                  return;
                }

                itemBorder = {
                  ...itemBorder,
                  top: startBorder.top + e.rect.length * 26,
                  height: -e.rect.length * 26 + 2 + 26,
                };
              } else if (e.rect.length === 0) {
                // itemBorder = {
                //     ...itemBorder,
                //     top: startBorder.top + 26,
                //     height: 28,
                // };
              } else {
                if (
                  startBorder.top + e.rect.length * 26 + 2 - rect.height >
                  0
                ) {
                  return;
                }
                if (startBorder.top + e.rect.length * 26 + 2) {
                }
                itemBorder = {
                  ...itemBorder,
                  top: startBorder.top,
                  height: e.rect.length * 26 + 2,
                };
              }

              selectLength = e.rect.length;
            }
          }
        });
      }
    );
    document.addEventListener("mousedown", changeBorder);
    document.addEventListener("scroll", () => {
      itemBorder = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        display: "none,",
      };

      startBorder = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        display: "none,",
      };
    });
  });

  onDestroy(() => {
    document.removeEventListener("mousedown", changeBorder);
  });
</script>

<div class="wrapper" style={styleCssState} bind:this={wrapperRef}>
  <div
    class="line-v"
    style={`left:${lineVLeft}px;display:${lineVLeft ? "block" : "none"}`}
  ></div>
  <div
    class="line-h"
    style={`top:${lineHTop}px;display:${lineHTop ? "block" : "none"}`}
  ></div>
  <div class="wrapper-content">
    <slot></slot>
  </div>
  <div
    class="item-border left"
    style="display:{itemBorder.display};top:{itemBorder.top}px;left:{itemBorder.left}px;height:{itemBorder.height}px;width:3px;"
  ></div>
  <div
    class="item-border top"
    style="display:{itemBorder.display};top:{itemBorder.top}px;left:{itemBorder.left}px;height:3px;width:{itemBorder.width}px;"
  ></div>
  <div
    class="item-border right"
    style="display:{itemBorder.display};top:{itemBorder.top}px;left:{itemBorder.left +
      itemBorder.width -
      3}px;height:{itemBorder.height}px;width:3px;"
  ></div>
  <div
    class="item-border bottom"
    style="display:{itemBorder.display};top:{itemBorder.top +
      itemBorder.height -
      3}px;left:{itemBorder.left}px;height:3px;width:{itemBorder.width}px;"
  ></div>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    /* height: 100%; */
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    background: transparent;
    width: 100%;
    border-top: 2px solid #2d2d2d;

    .wrapper-content {
      width: 100%;
      height: 100%;
    }

    .line-v {
      position: absolute;
      height: 100%;
      width: 1px;
      left: 0px;
      background-color: var(--backgorund, #000000);
      // border-right: 2px dashed var(--border-pale, #ffffff);
      border-right: 2px solid #2d2d2d;
      background: transparent; /* 移除实线背景 */
      z-index: 2;
    }

    .line-h {
      position: absolute;
      top: 0px;
      height: 1px;
      width: 100%;
      background-color: var(--backgorund, #000000);
      // border-bottom: 2px dashed var(--border-pale, #ffffff);
      border-bottom: 2px solid #2d2d2d;
      background: transparent; /* 移除实线背景 */
      z-index: 2;
    }

    .item-border {
      position: absolute;
      box-sizing: border-box;
      z-index: 1;
      top: 0px;
      left: 0px;
      height: 0px;
      width: 0px;
      background-color: #aeaeae;
      border-radius: 1px;
      // transition: all 0.1s;
    }

    .left {
      box-shadow: 0 0 5px white;
    }
    .top {
      box-shadow: 0 0px 5px white;
    }
    .right {
      box-shadow: 0 0 5px white;
    }

    .bottom {
      box-shadow: 0 0 5px white;
    }
  }
</style>
