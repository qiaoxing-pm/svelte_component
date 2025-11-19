<script lang="ts">
  import { onMount, getContext } from "svelte";
  import TableRow from "./TableRow.svelte";
  import TableItem from "./TableItem.svelte";
  import DragLine from "./DragLine.svelte";

  let {
    styleCss = {},
    headData,
    api,
    util,
  } = $props();
  let styleCssState = $state("");

  onMount(() => {
    styleCssState = util.camelToCss(styleCss);
    (getContext("setHead") as Function)(headData);
  });
</script>

<div class="wrapper" style={styleCssState}>
  <TableRow {util}>
    {#each headData as item, index}
      <DragLine locationIndex={index}></DragLine>
      <TableItem
        {util}
        {api}
        width={item.width}
        treeIndex={index}
        value={item.label}
        labelType={"head"}
        styleCss={{
          backgroundColor: "#000000",
        }}
      ></TableItem>
    {/each}

    <DragLine locationIndex={headData.length + 1}></DragLine>
  </TableRow>
  <slot></slot>
</div>

<style lang="scss">
  .wrapper {
    flex: 1;
    min-width: 100%;
    width: max-content;
    height: 100%;
    justify-content: left;
    flex-direction: row;
    background-color: #000000;
    position: sticky;
    left: 0px;
    top: 0px;
    z-index: 1;
  }
</style>
