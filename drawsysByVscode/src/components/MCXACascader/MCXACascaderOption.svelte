<script lang="ts">
  import { onMount } from "svelte";

  let { api } = $props();

  interface optionType {
    label: string | number | Function;
    value: string | number | Function;
    [key: string]: any;
  }
  interface CascaderSelectType<T> {
    changeOptions: (e: Array<Array<T>>) => void;
    changeSelect: (e: Map<number, optionType>) => void;
    changeShow: (e: {
      show: boolean;
      top?: string | number;
      left?: string | number;
      select?: Map<number, optionType>;
    }) => void;
    getSelectData: (e: (level: number, item: optionType) => {}) => void;
    getDOMRef: () => HTMLElement | undefined;
  }

  let left = $state<string | number>("0");
  let top = $state<string | number>("0");
  let show = $state<boolean>(false);
  let options = $state<Array<Array<optionType>>>([]);
  let select = $state<Map<number, optionType>>(new Map());
  let wrapperRef = $state<HTMLElement | undefined>();

  const changeOptions = (e: Array<Array<optionType>>) => {
    options = e;
  };

  const changeShow = (e: {
    show: boolean;
    top?: string | number;
    left?: string | number;
    select?: Map<number, optionType>;
  }) => {
    if (e.show) {
      left = e.left ?? left;
      top = e.top ?? top;
      show = e.show;
      select = e.select ?? select;
    } else {
      left = "9999999";
      top = "9999999";
      show = e.show;
      select = e.select ?? select;
    }
  };
  let eventListener: any = null; // 用于存储事件监听器，以便销毁

  const getSelectData = (
    callback: (level: number, item: optionType) => void
  ) => {
    eventListener = (level: number, item: optionType) => {
      if (typeof callback === "function") {
        callback(level, item);
      }
    };
  };

  const changeSelect = (e: Map<number, optionType>) => {
    select = e ?? new Map();
  };

  onMount(() => {
    {
      const cascaderAPI: CascaderSelectType<optionType> = {
        changeOptions: (e: Array<Array<optionType>>) => {
          changeOptions(e);
        },
        changeSelect: (e: Map<number, optionType>) => {
          changeSelect(e);
        },
        changeShow: (e: {
          show: boolean;
          top?: string | number;
          left?: string | number;
          select?: Map<number, optionType>;
        }) => {
          changeShow(e);
        },
        getSelectData: (e: (level: number, item: optionType) => any) => {
          getSelectData(e);
        },
        getDOMRef: () => {
          return wrapperRef;
        },
      };
      api.popUp.registerPopUp("CASCADRE_SELECT", cascaderAPI);
    }
  });
</script>

{#if show}
  <div
    class="wrapper-option"
    style={`top:${top}px;left:${left}px;`}
    bind:this={wrapperRef}
  >
    {#each options as items, level (level)}
      <div class="wrapper-item">
        {#each items as item}
          <button
            disabled={item.disabled}
            class={select.get(level)?.value === item.value
              ? "item-select"
              : `${item.disabled ? "item-disabled" : "item"}`}
            onclick={() => {
              if (eventListener) {
                eventListener(level, item);
              }
            }}
          >
            {item.label}
            {#if item.children && item.children.length}
              <span class="iconfont icon-arrow-right"></span>
            {/if}
          </button>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  .wrapper-option {
    position: fixed;
    top: 1000vh;
    width: max-content;
    height: 212px;
    box-sizing: border-box;
    box-shadow: 0 0 1px white inset;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.397);
    z-index: 100000;
    background-color: #423f3f;
    padding: 4px;
    .wrapper-item {
      min-width: 120px;
      height: 100%;
      box-sizing: border-box;
      border-right: 4px solid #423f3f;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      overflow: auto;
      gap: 4px;
      background-color: black;

      .item {
        height: 30px;
        min-height: 30px;
        max-height: 30px;
        width: 100%;
        //border-radius: 0.5rem;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        // color: #000000a0;
        color: white;
        display: flex;
        box-sizing: border-box;
        border: 1px solid transparent;
        justify-content: space-between;
        align-items: center;

        &:hover {
          // background-color: #0000000f;
          // background-color: ;
          // height: 28px;
          border: 1px solid #0073ff;
          background-color: #096dd979;
        }
      }

      .item-disabled {
        height: 30px;
        min-height: 30px;
        max-height: 30px;
        width: 100%;
        //border-radius: 0.5rem;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f5f5f5;
        // color: #434343;
        color: white;
        cursor: not-allowed;
      }

      .item-select {
        height: 30px;
        min-height: 30px;
        max-height: 30px;
        width: 100%;
        //border-radius: 0.5rem;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        // color: #000000a0;
        color: white;
        background-color: #167ff1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
      }

      &:last-child {
        border-right: none;
      }
    }
  }
</style>
