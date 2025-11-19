<script lang="ts">
  import { onMount, getContext, tick } from "svelte";
  import DragLine from "./DragLine.svelte";

  /**
   * table的最小单元, 树组件
   */
  let {
    styleCss = {},
    treeType = "child",
    treeNode = $bindable(),
    treeIndex,
    height,
    width,
    label,
    colIndex,
    api,
    util,
  } = $props();
  let styleCssState = $state("");
  let tableItemWidth = $state<number>(width);
  let wrapperRef = $state<HTMLElement | undefined>();
  let isInput = $state<boolean>(false);
  let inputValue = $state<string>("");
  let inputRef = $state<HTMLElement | undefined>();
  const setSelectIndex = getContext("setSelectIndex") as Function;
  const changeTree = () => {
    setSelectIndex({ treeId: treeNode.treeId });
  };

  let isResizing = false;
  let isResizingDown = false;
  const setResizing = getContext("setResizing") as Function;

  // 检测鼠标是否在表格右侧边缘
  const isNearRightEdge = (element: HTMLElement, e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    return e.clientX > rect.right - 5 && e.clientX < rect.right;
  };

  // 检测鼠标是否在表格底部边缘
  const isNearBottomEdge = (element: HTMLElement, e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    return e.clientY > rect.bottom - 5 && e.clientY < rect.bottom;
  };

  const mousedownHandler = (e: MouseEvent) => {
    if (!isResizing) return;
    isResizingDown = true;
    const payload = {
      x: e.clientX,
      y: e.clientY,
    };
    document.body.style.userSelect = "none";

    const mousemoveHandler = (ev: MouseEvent) => {
      setResizing({
        clientX: ev.clientX,
        clientY: ev.clientY,
        type: "move",
        rect: wrapperRef!.getBoundingClientRect(),
        local: wrapperRef!.style.cursor === "col-resize" ? "right" : "bottom",
      });
    };

    const mouseupHandler = (ev: MouseEvent) => {
      setResizing({
        clientX: ev.clientX,
        clientY: ev.clientY,
        treeIndex: colIndex,
        rect: wrapperRef!.getBoundingClientRect(),
        type: "moveDown",
      });
      isResizingDown = false;
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", mousemoveHandler);
      window.removeEventListener("mouseup", mouseupHandler);
    };

    window.addEventListener("mousemove", mousemoveHandler);
    window.addEventListener("mouseup", mouseupHandler);
  };

  const mouseMoveResizing = (e: MouseEvent) => {
    if (isResizingDown) return;
    if (wrapperRef && isNearRightEdge(wrapperRef, e)) {
      isResizing = true;
      wrapperRef.style.cursor = "col-resize";
    } else if (wrapperRef && isNearBottomEdge(wrapperRef, e)) {
      // isResizing = true;
      // wrapperRef.style.cursor = "row-resize";
    } else if (wrapperRef && !isResizingDown) {
      wrapperRef.style.cursor = "";
      isResizing = false;
    }
  };

  const mouseDoubleClick = (e: MouseEvent) => {
    if (
      treeNode.source.id === "structManagement" ||
      treeNode.source.id === "variableManagement"
    ) {
      return;
    }
    inputValue = treeNode.source[label];
    // isInput = true;
    tick().then(() => {
      if (inputRef) {
        inputRef.focus();
      }
    });
  };

  const blurHandler = (e: HTMLInputElement) => {
    let newValue: any = {};
    newValue[label] = inputValue;
    const messagedata = util.validateCVariableName(inputValue);
    if (messagedata.valid) {
      api.eventBus.emit(
        api.constant.structAndVarRelationConstants
          .UPDATE_TREENODE_STRUCT_AND_VARRELATION_INTEGRATE,
        {
          source: treeNode.source,
          newValue,
        }
      );

      treeNode.source[label] = inputValue;
    } else {
      inputValue =
        treeNode.source[api.structAndVarRelationIntegrate.getRule().label];
      // apiInstance.message.globalMessageNotice({
      //     type: "error",
      //     message: messagedata.message,
      // });
    }
    isInput = false;
  };

  $effect(() => {
    if (width) {
      requestAnimationFrame(() => {
        tableItemWidth = width;
        styleCssState += ";flex:none;";
      });
    }
  });
  onMount(() => {
    styleCssState = util.camelToCss(styleCss);
    document.addEventListener("mousemove", mouseMoveResizing);
    api.eventBus.on("table:change:heightOrWidth", (e) => {
      if (colIndex === e.treeIndex) {
        tableItemWidth = e.newWidth;
      }
    });
    inputValue = treeNode.name;
  });
</script>

<div
  class="wrapper-wrappper {treeIndex % 2 === 0
    ? ''
    : 'wrapper-background-deep'}"
  bind:this={wrapperRef}
  onmousedown={(e: MouseEvent) => {
    mousedownHandler(e);
  }}
>
  {#if !isInput}
    <div
      class="wrapper-label"
      style={`${height ? `height:${height}px` : ""};${tableItemWidth ? `width:${tableItemWidth}px` : ""}`}
    >
      <div style={`padding-left:${treeNode.level * 16}px`}></div>
      {#if treeType === "parent"}
        <button
          class="button-op iconfont icon-arrow-{treeNode.expanded
            ? 'down'
            : 'right'}"
          onclick={(e) => {
            e.preventDefault();
            // e.stopPropagation();
            changeTree();
          }}
        ></button>
      {:else}
        <button class="onShow button-op iconfont icon-arrow-right"></button>
      {/if}
      <div class="wrapper-slot" ondblclick={mouseDoubleClick}>
        <slot></slot>
      </div>
    </div>
  {:else}
    <div
      class="wrapper-input"
      style={`${height ? `height:${height}px` : ""};${tableItemWidth ? `width:${tableItemWidth}px` : ""}`}
    >
      <input
        bind:this={inputRef}
        bind:value={inputValue}
        class="clear-input"
        onblur={blurHandler}
      />
    </div>
  {/if}

  <DragLine locationIndex={-1} direction="horizontal"></DragLine>
</div>

<style lang="scss">
  .wrapper-wrappper {
    display: flex;
    justify-content: left;
    flex-direction: column;
    position: sticky;
    left: 0px;
    box-sizing: border-box;
    // border-left: 2px solid white;

    overflow: hidden;
    background-color: var(--background, #121212);
    z-index: 1;

    .icon-arrow-down:before {
      content: "\eab4";
    }

    .icon-arrow-right:before {
      content: "\eab4";
    }
  }
  .wrapper-label {
    flex: 1;
    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: left;
    color: var(--font, #ffffff);
    flex-wrap: nowrap;
    white-space: nowrap;
    border-bottom: 2px solid var(--border-pale, #ffffff);
    border-right: 2px solid var(--border-pale, #ffffff);
    box-sizing: border-box;
    user-select: none;

    .wrapper-slot {
      flex: 1;
      width: 100%;
      height: 100%;
      white-space: nowrap;
    }

    &::-webkit-scrollbar {
      display: none;
    }
    .button-op {
      display: flex;
      width: 16px;
      height: 16px;
      background-color: transparent;
    }

    .onShow {
      opacity: 0;
    }
  }
  .wrapper-input {
    flex: 1;
    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: left;
    color: var(--font-excel, #e0e0e0);
    flex-wrap: nowrap;
    white-space: nowrap;
    border-bottom: 2px solid var(--border-pale, #ffffff);
    border-right: 2px solid var(--border-pale, #ffffff);
    line-height: 100%;
    input {
      max-width: 100%;
      width: 100%;
      height: 100%;
      padding: 0 5px;
      box-shadow: 0 0 5px yellow inset;
    }
  }

  .wrapper-background-deep {
    background-color: #2b2b2b;
  }
</style>
