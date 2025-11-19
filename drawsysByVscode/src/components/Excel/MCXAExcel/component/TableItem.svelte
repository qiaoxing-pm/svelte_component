<script lang="ts">
  import { onMount, getContext, tick } from "svelte";
  import MCXASelect from "../../MCXASelect/MCXASelect.svelte";
  import MCXACascader from "../../MCXACascader/MCXACascader.svelte";

  /**
   * table的最小单元
   */
  let {
    styleCss = {},
    treeIndex,
    rowIndex,
    width,
    value,
    isFocus = false,
    headItem = {},
    treeNode = $bindable({ source: {} }),
    label = undefined,
    type = undefined,
    labelType = undefined,
    treeFlattener = undefined,
    api,
    util,
  } = $props();
  let styleCssState = $state("");
  let wrapperRef = $state<HTMLElement | undefined>();
  let tableItemWidth = $state<number>(width);
  let isInput = $state<boolean>(false);
  let inputValue = $state<string>(value);
  let inputRef = $state<HTMLElement | undefined>();
  let isResizing = false;
  let isResizingDown = false;
  const setResizing = getContext("setResizing") as Function;
  let optionState = $state([]);
  let selectLength = $state<number>(1);
  let resultLength = $state<number>(1);

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
    if (!isResizing || labelType !== "head") return;
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
        treeIndex,
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
    if (!label) {
      return;
    }

    if (!util.haveSelect(treeNode, label)) {
      return;
    }

    if (label === "attribute") {
      return;
    }
    isInput = true;
    tick().then(() => {
      inputRef?.focus();
      if (selectLength <= 0) {
        resultLength = selectLength * -1 + 1;
      } else {
        resultLength = selectLength;
      }
    });
  };

  const blurHandler = (e: HTMLInputElement) => {
    let newValue: any = {};
    if (treeNode.source.dataType === "string" && label === "length") {
      const numValue = parseInt(inputValue as string);
      if (!isNaN(numValue) && (numValue < 1 || numValue > 255)) {
        inputValue = treeNode.source[label];
        return;
      }
      newValue[label] = `${inputValue}`;
    } else {
      newValue[label] = inputValue;
    }

    if (treeNode.source.dataType === "string" && label === "length") {
      treeNode.source[label] = `${inputValue}`;
    } else {
      treeNode.source[label] = inputValue;
    }
    api.eventBus.emit(
      api.constant.structAndVarRelationConstants
        .UPDATE_TREENODE_STRUCT_AND_VARRELATION_INTEGRATE,
      {
        source: treeNode.source,
        newValue,
        selectLength: resultLength,
        treeFlattener,
      }
    );
    isInput = false;
  };

  const changeValue = (e) => {
    if (type === "select") {
      let newValue: any = {};
      newValue[label] = e;
      api.eventBus.emit(
        api.constant.structAndVarRelationConstants
          .UPDATE_TREENODE_STRUCT_AND_VARRELATION_INTEGRATE,
        {
          source: treeNode.source,
          newValue,
          changeValue: label,
          changeId: treeNode.treeId,
          selectLength: resultLength,
          treeFlattener,
        }
      );
    }

    if (type === "cascader") {
      let newValue: any = {};
      newValue[label] = e.str;
      treeNode.source[label] = e.str;
      api.eventBus.emit(
        api.constant.structAndVarRelationConstants
          .UPDATE_TREENODE_STRUCT_AND_VARRELATION_INTEGRATE,
        {
          source: treeNode.source,
          newValue,
          selectLength: resultLength,
          treeFlattener,
        }
      );
    }
  };
  const handleMousedownHandlerClick = (e) => {
    if (labelType === "head") {
      return;
    }
    e.preventDefault();
    const startClient = {
      x: e.clientX,
      y: e.clientY,
    };
    const rect = wrapperRef?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    api.eventBus.emit(
      api.constant.structAndVarRelationExcels.EXCEL_ITEM_CLICK,
      {
        rect,
        client: startClient,
        type: "tableItem",
      }
    );
    const moveHandler = (e) => {
      selectLength = util.getOppositeInteger((e.clientY - rect.top - 2) / 26);
      api.eventBus.emit(
        api.constant.structAndVarRelationExcels.EXCEL_ITEM_CLICK,
        {
          rect: {
            length: selectLength,
          },
          type: "boxSelection",
        }
      );
    };

    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
    };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  };

  const getValue = (treeNodeValue: any, headItemValue: string | Function) => {
    const treeNodeCurrent = api.structAndVarRelationIntegrate
      .getTreeFlattener()
      .getNodeBySourceId(treeNodeValue.source.id);
    if (typeof headItemValue === "function") {
      if (treeNodeCurrent) {
        return headItemValue(treeNodeCurrent);
      }
      return "";
    } else {
      return treeNodeValue.source[headItemValue];
    }
  };

  const init = () => {
    if (width) {
      requestAnimationFrame(() => {
        tableItemWidth = treeIndex === 0 ? width - 2 : width;
        styleCssState += ";flex:none;";
      });
    }
    if (treeNode) {
      if (type === "select") {
        optionState = headItem?.getOption(treeNode);
      }
    }

    if (Object.keys(styleCss).length) {
      styleCssState = util.camelToCss(styleCss) + ``;
    }
    api.eventBus.on("tableSelectLength", (e) => {
      selectLength = e.selectLength;
      // selectLength = 1;
    });
    document.addEventListener("mousemove", mouseMoveResizing);
    document.addEventListener("click", (e) => {
      if (e.target.closest(".wrapper") != wrapperRef) {
        isInput = false;
      }
    });

    api.eventBus.on("table:change:heightOrWidth", (e) => {
      if (treeIndex === e.treeIndex) {
        width = e.newWidth;
        tableItemWidth = treeIndex === 0 ? e.newWidth - 2 : e.newWidth;
      }
    });

    api.eventBus.on(
      api.constant.structAndVarRelationConstants
        .UPDATE_TREENODE_STRUCT_AND_VARRELATION_INTEGRATE,
      (e) => {
        if (e.changeId && treeNode && e.changeId === treeNode.treeId) {
          if (e.changeValue === "connection" && label === "reg") {
            const tempAgreement = api.structAndVarRelationIntegrate
              .getTreeFlattener()
              .getNodeBySourceId(e.newValue[e.changeValue]);

            if (tempAgreement?.source?.agreement?.Regs) {
              const reg = tempAgreement.source.agreement.Regs.Reg;
              const regsOption = reg.map((item) => {
                return {
                  label: item._attributes.Name,
                  value: item._attributes.ID,
                };
              });

              optionState = regsOption;
            }
          }
          if (e.changeValue === "reg" && label === "attribute") {
            requestAnimationFrame(() => {
              inputValue = getValue(treeNode, headItem.value);
            });
          }
        }
      }
    );
    if (labelType != "head") {
      if (label === "attribute") {
        if (headItem) {
          inputValue = headItem.value(treeNode);
        }
      } else {
        inputValue = treeNode.source[label];
      }
    }
  };

  $effect(() => {
    if (width) {
      requestAnimationFrame(() => {
        tableItemWidth = treeIndex === 0 ? width - 2 : width;
        styleCssState += ";flex:none;";
      });
    }
  });

  $effect(() => {
    if (treeNode) {
      if (type === "select") {
        optionState = headItem?.getOption(treeNode);
      }
    }
  });

  $effect(() => {
    treeNode;
    requestAnimationFrame(() => {
      init();
    });
  });

  onMount(() => {
    init();
  });
</script>

<div
  class={`wrapper ${rowIndex % 2 != 0 ? "wrapper-background-deep" : ""} ${treeIndex === 0 ? "wrapper-sticky" : ""}`}
  style={`${styleCssState} ${tableItemWidth ? `width:${Math.trunc(tableItemWidth)}px` : `${width}`};`}
  bind:this={wrapperRef}
  onmousedown={(e: MouseEvent) => {
    mousedownHandler(e);
    handleMousedownHandlerClick(e);
  }}
  ondblclick={(e) => {
    mouseDoubleClick(e);
  }}
  onclick={() => {
    if (selectLength <= 0) {
      resultLength = selectLength * -1 + 1;
    } else {
      resultLength = selectLength;
    }
  }}
>
  {#key treeNode.source[label]}
    {#if type === "select"}
      {#if label === "connection" && treeNode.source[label] === "internal variable"}
        <div class="wrapper-slot">
          {inputValue}
        </div>
      {:else}
        <div class="wrapper-select">
          {#if treeNode.source.type === "file"}
            <MCXASelect
              {api}
              options={optionState}
              value={treeNode.source[label]}
              onChange={changeValue}
            ></MCXASelect>
          {:else}
            {treeNode.source[label]}
          {/if}
        </div>
      {/if}
    {:else if type === "cascader" && util.haveConnect(treeNode, label)}
      <div class="wrapper-select">
        <MCXACascader
          option={headItem?.getOption(treeNode) ?? []}
          onChange={changeValue}
          defaultValue={treeNode.source[label]}
          isLocal={false}
          {api}
        ></MCXACascader>
        <!-- <MCXACascader
          isLocal={false}
          option={headItem?.getOption(treeNode) ?? []}
          defaultValue={treeNode.source[label]}
          onChange={changeValue}
        ></MCXACascader> -->
      </div>
    {:else if label === "length"}
      {#if treeNode.source.dataType === "string"}
        {#if !isInput}
          <div class="wrapper-slot">
            {inputValue}
          </div>
        {:else}
          <div
            class="wrapper-input"
            style={`${styleCssState} ${tableItemWidth ? `width:${Math.trunc(tableItemWidth)}px` : ""};`}
          >
            <input
              type="number"
              bind:this={inputRef}
              bind:value={inputValue}
              class="clear-input"
              onblur={blurHandler}
            />
          </div>
        {/if}
      {:else}
        <div class="wrapper-slot">
          {api.typeOption.getOptionTypeLengths(treeNode.source.dataType)}
        </div>
      {/if}
    {:else if !isInput}
      <div class="wrapper-slot">
        {inputValue}
      </div>
    {:else}
      <div
        class="wrapper-input"
        style={`${styleCssState} ${tableItemWidth ? `width:${Math.trunc(tableItemWidth)}px` : ""};`}
      >
        <input
          bind:this={inputRef}
          bind:value={inputValue}
          class="clear-input"
          onblur={blurHandler}
        />
      </div>
    {/if}
  {/key}
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    flex: 1;
    min-width: 50px;
    height: 26px;
    background: #121212;
    color: var(--font-excel, #e0e0e0);
    flex-wrap: nowrap;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    border-bottom: 2px solid var(--border-pale, #ffffff);
    border-right: 2px solid var(--border-pale, #ffffff);
    user-select: none;

    .wrapper-select {
      /* z-index: 999; */
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding-left: 5px;
      position: relative;
    }
    .wrapper-slot {
      flex: 1;
      width: 100%;
      height: 24px;
      padding-left: 4px;
      white-space: nowrap;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .wrapper-input {
    flex: 1;
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: left;
    // color: var(--font, #ffffff);
    color: var(--font-excel, #e0e0e0);
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;

    input {
      flex: 1;
      max-width: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      height: 100%;
      box-shadow: 0 0 15px rgb(255, 255, 255) inset;
      padding: 0 5px;
    }
  }

  .wrapper-background-deep {
    // background-color: var(--background-light, #3d3d3d);
    background-color: #2b2b2b;
  }

  .wrapper-sticky {
    height: 24px;
    background-color: var(--background-light, #3d3d3d);
    position: sticky;
    left: 0px;
    min-width: 48px;
    box-sizing: content-box;
    // border-left: 2px solid white;
    z-index: 1;
  }
</style>
