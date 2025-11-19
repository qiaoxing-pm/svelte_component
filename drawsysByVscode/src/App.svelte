<script>
  import MyButton from "./MyButton.svelte";
  import api from "./api";
  import VariableExcel from "./components/VariableExcel/VariableExcel.svelte";
  import CommonModalLogic from "./CommonModalLogic/CommonModalLogic.svelte";
  import {
    validateCVariableName,
    camelToCss,
    haveSelect,
    clamp,
    haveConnect,
    getOppositeInteger,
  } from "./util/util";

  const util = {
    validateCVariableName,
    camelToCss,
    haveSelect,
    clamp,
    haveConnect,
    getOppositeInteger,
    createTreeObj: api.structAndVarRelationIntegrate.createTreeFlattener,
  };

  const headData = api.structAndVarRelationIntegrate.getHeadData();
  // const mockTreeData = api.structAndVarRelationIntegrate
  const treeFlattener = api.structAndVarRelationIntegrate.getTreeFlattener();
  const mockTreeData =
    treeFlattener.buildSourceTree(
      treeFlattener.getNodeBySourceId("root")?.treeId
    ) ?? [];
</script>

<div class="wrapper">
  <!-- <MyButton label={"asdfasdfasd"} /> -->
  <VariableExcel {headData} {mockTreeData} {api} {util}></VariableExcel>

  <CommonModalLogic haveCurtain={true} isOpenState={true}>
    <div>Javascript</div>
  </CommonModalLogic>
</div>

<style>
  .wrapper {
    width: 800px;
    height: 400px;
    background-color: aqua;
  }
</style>
