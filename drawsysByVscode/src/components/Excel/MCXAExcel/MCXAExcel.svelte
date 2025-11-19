<script lang="ts">
  import {
    TableRow,
    TableBody,
    TableHead,
    TableItem,
    TableTreeNode,
    Table,
  } from "./component";
  import { onMount, setContext } from "svelte";

  let {
    headData = $bindable(),
    treeData = $bindable(),
    treeKey,
    api,
    util,
  } = $props();

  let treeFlattener = $state(util.createTreeObj());

  let showValue = $state<any>([]);

  let wrapperRef = $state<HTMLElement | undefined>();

  let isFocus = $state<boolean>(false);

  let sourceHeadData: any = [];

  const init = () => {
    const tempTreeFlattener = util.createTreeObj();
    tempTreeFlattener.build(
      treeData,
      api.structAndVarRelationIntegrate.getRule(),
      {
        autoExpand: true,
      }
    );
    treeFlattener = tempTreeFlattener;
    let tempShowValue = treeFlattener.getShow();
    showValue = tempShowValue;
    sourceHeadData = headData.map((item: any) => {
      return {
        ...item,
      };
    });
    api.eventBus.on("table:change:heightOrWidth", (e) => {
      headData[e.treeIndex]["width"] = e.newWidth;
      api.structAndVarRelationIntegrate.setHeadData([...headData]);
    });
  };

  onMount(() => {
    init();

    window.addEventListener("mousedown", (e) => {
      if (wrapperRef?.contains(e.target as HTMLElement)) {
        isFocus = true;
      } else {
        isFocus = false;
      }
    });
  });

  $effect(() => {
    treeData;
    requestAnimationFrame(() => {
      init();
    });
  });

  setContext("setSelectIndex", (e: { treeId: number }) => {
    let currentTreeNode = treeFlattener.getNodeByTreeId(e.treeId)!;

    currentTreeNode.expanded = !currentTreeNode?.expanded;

    showValue = treeFlattener.getShow();
  });

  setContext(
    "setChangeWidthAndHeight",
    (e: {
      changeState: number;
      local: string;
      localIndex: number;
      isMove: boolean;
    }) => {
      requestAnimationFrame(() => {
        if (
          e.isMove &&
          e.localIndex >= 0 &&
          e.localIndex < headData.length - 1
        ) {
          let tempHeadData = Array.from([...headData]);
          let targetWidth = util.clamp(
            50,
            sourceHeadData[e.localIndex].width + e.changeState,
            999999999999
          );
          tempHeadData[e.localIndex].width = Math.floor(targetWidth);

          headData = tempHeadData;
        } else {
          sourceHeadData = headData.map((item) => {
            return { ...item };
          });
        }
      });
    }
  );

  const getValue = (treeNodeValue: any, headItemValue: string | Function) => {
    if (typeof headItemValue === "function") {
      return headItemValue(treeNodeValue);
    } else {
      return treeNodeValue.source[headItemValue];
    }
  };
</script>

<div class="wrapper" bind:this={wrapperRef}>
  <Table {api} {util}>
    <TableHead {util} {headData} {api}></TableHead>
    <TableBody {util}>
      {#each showValue as items, indexs}
        <TableRow {util}>
          {#each headData as headItem, index}
            {#if headItem.value === treeKey}
              <TableTreeNode
                {util}
                treeType={treeFlattener.getChildren(showValue[indexs].treeId)
                  ?.length
                  ? "parent"
                  : "child"}
                bind:treeNode={showValue[indexs]}
                treeIndex={indexs}
                colIndex={index}
                {api}
                height={headItem.height}
                width={headItem.width}
                label={headItem.label}
                styleCss={{
                  width: `${headItem.width}px`,
                }}
              >
                {getValue(showValue[indexs], headItem.value)}
              </TableTreeNode>
            {:else}
              <TableItem
                {util}
                {api}
                width={headItem.width}
                treeIndex={index}
                rowIndex={indexs}
                bind:treeNode={showValue[indexs]}
                label={headItem.label}
                type={headItem.type}
                {headItem}
                {treeFlattener}
                {isFocus}
                value={getValue(showValue[indexs], headItem.value)}
              >
                <!-- {items.source[headItem.value]} -->
              </TableItem>
            {/if}
          {/each}
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</div>

<style lang="scss">
  .wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: left;
    flex-direction: row;
    width: 100%;

    .wrapper-select {
      height: 30px;
      margin: 10px;
    }
  }

  .tableitem-input {
    background-color: transparent;
    border: 1px solid var(--border-pale, #ffffff);
    width: calc(100% - 10px);
    box-sizing: border;
    padding: 0 5px;
    margin: 0 5px;
    border-radius: 3px;

    &:hover {
      border-color: var(--border-hover, #1890ff);
    }

    &:focus {
      border-color: var(--border-hover, #1890ff);
    }
    &:disabled {
      border-color: var(--border-hover, #1890ff);
    }

    &:active {
      border-color: var(--border-hover, #1890ff);
    }
  }

  .wrapper-iconfont {
    width: 100%;
  }
</style>
