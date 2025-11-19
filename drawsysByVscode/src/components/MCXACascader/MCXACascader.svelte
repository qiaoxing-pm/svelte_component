<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  const deepClone = <T,>(data: T): T => {
    // 用于存储已拷贝的对象，解决循环引用问题
    const visited = new Map();

    // 创建一个处理函数，使用循环代替递归
    const clone = (source: any): any => {
      // 非对象类型直接返回
      if (typeof source !== "object" || source === null) {
        return source;
      }

      // 如果已经拷贝过，直接返回缓存的结果（处理循环引用）
      if (visited.has(source)) {
        return visited.get(source);
      }

      let result: any;

      // 处理数组
      if (source instanceof Array) {
        result = [];
        visited.set(source, result); // 先缓存空数组，处理循环引用

        // 使用循环遍历数组元素
        for (let i = 0; i < source.length; i++) {
          result.push(clone(source[i]));
        }
      }
      // 处理对象
      else {
        result = {};
        visited.set(source, result); // 先缓存空对象，处理循环引用

        // 使用循环遍历对象属性
        const keys = Object.keys(source);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          result[key] = clone(source[key]);
        }
      }

      return result;
    };

    return clone(data) as T;
  };

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

  interface propsType {
    option: Array<Array<optionType>>;
    onChange?: any;
    defaultValue: string;
    checkToClosePopup: Boolean;
    disabled: Boolean;
    isLocal: Boolean;
    api: any;
  }

  let {
    option,
    onChange,
    defaultValue = $bindable(""),
    checkToClosePopup = false,
    isLocal = true,
    api,
  }: propsType = $props();

  let options = $state<Array<Array<optionType>>>(deepClone(option));

  let wrapperInputRef = $state<HTMLElement | undefined>();
  let wrapperRef = $state<HTMLElement | undefined>();
  let inputValue = $state<Array<optionType>>([]);

  let select = $state<Map<number, optionType>>(new Map());
  let left = $state<number>(0);
  let top = $state<number>(0);
  let show = $state<boolean>(false);
  let showLabel = $state<string>("");
  let showValue = $state<string>("");
  let popUpAPI = $state<undefined | CascaderSelectType<optionType>>();

  $effect(() => {
    options = deepClone(option);
    requestAnimationFrame(() => {
      init();
    });
  });

  $effect(() => {
    defaultValue;
    if (defaultValue === showValue) {
      return;
    }

    requestAnimationFrame(() => {
      init();
    });
  });

  const init = () => {
    if (!defaultValue) {
      return;
    }
    showValue = defaultValue;
    const tempValues = defaultValue.split(".");
    if (options.length !== 0 && tempValues.length !== 0) {
      let willShow: Array<optionType> = [];
      let willShowItems = [options[0]];
      let currentLevel = options[0].find((item: optionType) => {
        return item.value === tempValues[0];
      });
      if (currentLevel) {
        willShow.push(currentLevel);
        for (let i = 1; i < tempValues.length; i++) {
          if (
            currentLevel !== undefined &&
            currentLevel.children &&
            currentLevel.children.length
          ) {
            willShowItems.push(currentLevel.children);
            currentLevel = currentLevel.children.find((item) => {
              return item.value === tempValues[i];
            });
            if (currentLevel) {
              willShow.push(currentLevel);
            }
          }
        }
        let tempSelect: Map<number, optionType> = new Map();
        for (let i = 0; i < willShow.length; i++) {
          const element = willShow[i];
          if (element) {
            tempSelect.set(i, element);
          }
        }
        select = tempSelect;
        options = willShowItems;
        const newData = getShowValue(willShow);
        showLabel = newData.labelStr;
        showValue = newData.valueStr;
        defaultValue = newData.valueStr;
      }
    }
  };

  const handleSelect = (level: number, item: optionType) => {
    select.set(level, item);

    if (item.children && item.children.length > 0) {
      if (options.length > level + 1) {
        options[level + 1] = item.children;
      } else {
        options.push(item.children);
      }
    } else {
      options.splice(level + 1);
    }
    options.splice(level + 2);
    const len = select.size;
    for (let i = level + 1; i < len; i++) {
      select.delete(i);
    }

    let tempInputValue = [];
    for (let i = 0; i < select.size; i++) {
      tempInputValue.push(select.get(i)!);
    }

    inputValue = tempInputValue;
    const newData = getShowValue(tempInputValue);
    showLabel = newData.labelStr;
    showValue = newData.valueStr;
    defaultValue = newData.valueStr;
    select = new Map(select);
    if (checkToClosePopup) {
      if (!inputValue[inputValue.length - 1].children) {
        show = false;
      }
    }

    if (!isLocal && popUpAPI) {
      popUpAPI.changeSelect(select);
    }

    return {};
  };

  const getShowValue = (inputValue: Array<optionType>) => {
    return {
      valueStr: inputValue
        .map((item) => {
          if (item) {
            return item.value;
          }
        })
        .join("."),
      labelStr: inputValue
        .map((item) => {
          if (item) {
            return item.label;
          }
        })
        .join("."),
    };
  };
  const updateLocal = (topValue: undefined | number = undefined) => {
    if (wrapperInputRef) {
      const rect = wrapperInputRef.getBoundingClientRect();
      left = rect.left;
      if (topValue) {
        top = topValue;
      } else {
        top = rect.top + rect.height;
      }
      if (!isLocal) {
        popUpAPI = api.popUp.getPopUp(
          "CASCADRE_SELECT"
        ) as unknown as CascaderSelectType<optionType>;
        popUpAPI.changeOptions(options);
        popUpAPI.changeShow({
          show,
          top,
          left,
          select,
        });
        popUpAPI.getSelectData(handleSelect);
      }
    }
  };
  const mouseDown = (e: MouseEvent) => {
    if (
      popUpAPI &&
      popUpAPI?.getDOMRef() &&
      popUpAPI?.getDOMRef()?.contains(e.target as Node)
    ) {
      show = true;
    } else {
      if (!wrapperRef?.contains(e.target as Node)) {
        show = false;
      } else {
        if (wrapperInputRef?.contains(e.target as Node)) {
          show = !show;
        } else {
          show = true;
        }
      }
    }
    if (!isLocal && popUpAPI) {
      popUpAPI.changeShow({ show });
    }
  };

  onMount(() => {
    updateLocal();
    options = deepClone(option);
    document.addEventListener("mousedown", (e) => {
      mouseDown(e);
    });
  });

  onDestroy(() => {
    document.removeEventListener("mousedown", mouseDown);
  });

  const clearSelect = () => {
    select = new Map();
    inputValue = [];
    showLabel = "";
    showValue = "";
    options = deepClone(option);
    show = false;
    if (onChange) {
      onChange({ obj: {}, str: "" });
    }
    if (popUpAPI) {
      popUpAPI.changeShow({
        show,
        top,
        left,
        select,
      });
    }
  };

  $effect(() => {
    if (!show) {
      requestAnimationFrame(() => {
        if (isLocal) {
          updateLocal(99999999);
        }
        if (showLabel.split(".").length === 2 && onChange) {
          onChange({ obj: inputValue, str: showValue });
        }
      });
    }
  });
</script>

<div class="wrapper" bind:this={wrapperRef}>
  <div class="wrapper-input" bind:this={wrapperInputRef}>
    <div
      class="wrapper-scroller"
      onclick={() => {
        updateLocal();
      }}
    >
      <input
        readonly
        class="clear-input"
        placeholder="Please select..."
        bind:value={showLabel}
      />
      <span
        onclick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          clearSelect();
        }}
        class="iconClose iconfont icon-close"
      ></span>
      <span class="iconArrowDown iconfont icon-arrow-down"></span>
    </div>
  </div>
  {#if show && isLocal}
    <div class="wrapper-option" style={`top:${top}px;left:${left}px;`}>
      {#each options as items, level (level)}
        <div class="wrapper-item">
          {#each items as item}
            <button
              disabled={item.disabled}
              class={select.get(level)?.value === item.value
                ? "item-select"
                : `${item.disabled ? "item-disabled" : "item"}`}
              onclick={() => handleSelect(level, item)}
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
</div>

<style lang="scss">
  .wrapper {
    display: inline;
    width: max-content;
    height: max-content;
    left: 10px;
    top: 10px;
  }
  .wrapper-input {
    width: 100%;
    min-height: 20px;
    height: 100%;
    max-height: 32px;
    box-sizing: border-box;
    box-shadow: 0 0 1px white inset;
    padding: 0 8px;
    // border-radius: 0.5rem;
    // border: 1px solid #1677ff;
    // box-shadow: 0 0 5px #1677ff;
    overflow: hidden;
    // background-color: #374151;

    .wrapper-scroller {
      overflow: auto;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      cursor: pointer;

      .iconClose {
        display: none;
        border-radius: 50%;
        box-sizing: border-box;
        font-size: 8px;
        background-color: #cbcbcb;
        color: black;
        padding: 4px;
      }

      &:hover .iconClose {
        display: block;
      }

      &:hover .iconArrowDown {
        display: none;
      }

      input {
        color: white;
        width: 100%;
        height: 100%;
        font-size: 14px;
        cursor: pointer;
      }

      &::-webkit-scrollbar {
        display: none;
      }

      span {
        margin: auto;
        line-height: 100%;
        position: relative;
        right: 0px;
        color: white;
      }
    }
  }
  .wrapper-option {
    position: fixed;
    top: 1000vh;
    width: max-content;
    height: 200px;
    box-sizing: border-box;
    box-shadow: 0 0 1px white inset;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.397);
    border-radius: 0.5rem;
    z-index: 100000;
    background-color: white;
    .wrapper-item {
      min-width: 120px;
      height: 200px;
      box-sizing: border-box;
      border-right: 1px solid rgba(5, 5, 5, 0.06);
      padding: 4px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      overflow: auto;

      .item {
        height: 30px;
        min-height: 30px;
        max-height: 30px;
        width: 100%;
        border-radius: 0.5rem;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        color: #000000a0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
          background-color: #0000000f;
        }
      }

      .item-disabled {
        height: 30px;
        min-height: 30px;
        max-height: 30px;
        width: 100%;
        border-radius: 0.5rem;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f5f5f5;
        color: #434343;
        cursor: not-allowed;
      }

      .item-select {
        height: 30px;
        min-height: 30px;
        max-height: 30px;
        width: 100%;
        border-radius: 0.5rem;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        color: #000000a0;
        background-color: #e6f4ff;
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
