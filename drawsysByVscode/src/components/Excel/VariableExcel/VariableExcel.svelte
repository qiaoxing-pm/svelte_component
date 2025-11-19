<svelte:options customElement="variable-excel" />

<script lang="ts">
  import MCXACascaderOption from "../MCXACascader/MCXACascaderOption.svelte";
  import McxaExcel from "../MCXAExcel/MCXAExcel.svelte";
  import MCXAOption from "../MCXASelect/MCXAOption.svelte";

  let { headData = [], mockTreeData = [], api, util } = $props();
</script>

<div class="wrapper">
  <div class="wrapper-excel">
    <McxaExcel
      bind:headData
      bind:treeData={mockTreeData}
      treeKey={"name"}
      {api}
      {util}
    />
  </div>
  <MCXAOption {api}></MCXAOption>
  <MCXACascaderOption {api}></MCXACascaderOption>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--background, #000000);

    .wrapper-excel {
      width: max-content;
      min-width: 100%;
      height: 100%;
    }
  }
</style>
