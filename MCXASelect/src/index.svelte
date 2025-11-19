<script>
  import { onMount } from "svelte";

  let {
    value = $bindable(),
    options,
    haveSearch,
    changeValue,
    allowSelect,
  } = $props();

  let wrapperRef = $state();
  let wrapperOptionRef = $state(null);
  let showSelectState = $state(false);
  let showValue = $derived.by(() => {
    return options.find((item) => item.value === value);
  });

  const onmousedown = (e) => {
    const isClickInsideOption = wrapperOptionRef?.contains(e.target);
    if (!isClickInsideOption) {
      showSelectState = false;
    } else {
      e.stopPropagation();
    }
  };

  onMount(() => {
    window.addEventListener("mousedown", onmousedown);
  });
</script>

<div class="wrapper" bind:this={wrapperRef}>
  <button
    aria-label="select value"
    class="wrapper-value"
    onclick={() => {
      showSelectState = !showSelectState;
    }}
  >
    <p>{showValue ? showValue.label : "未选择"}</p>
  </button>
</div>

{#if showSelectState}
  <div class="wrapper-option" bind:this={wrapperOptionRef}>
    <div class="select-content default-width">
      <div class="select-select">
        {#each options as item, i}
          <div
            class="select-option"
            data-value={i}
            onclick={() => {
              value = item.value;
            }}
          >
            {item.label}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    color: var(--font, #ffffff);
    position: relative;

    .wrapper-value {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 5px;
      padding-right: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: left;
      flex-direction: row;

      p {
        text-align: left;
        width: 100%;
        height: fit-content;
        flex: 1;
        overflow: hidden;
      }

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
  }

  .wrapper-option {
    display: flex;
    justify-content: left;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
    position: absolute;
    box-sizing: border-box;
    padding: 3px 3px;
    background-color: #423f3f;
    max-height: 200px;
    z-index: 99999;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);

    .wrapper-search {
      height: max-content;
      width: 100%;
      margin-bottom: 3px;
    }

    .select-content {
      flex: 1;
      box-sizing: border-box;
      overflow-y: auto;

      &::-webkit-scrollbar {
        background-color: transparent;
        width: 12px;
      }

      &::-webkit-scrollbar-thumb {
        background: #423f3f;
        border-radius: 8px;
        border: 2px solid transparent;
        background-clip: content-box;
      }

      .select-select {
        display: flex;
        justify-content: left;
        flex-direction: column;

        .select-option {
          width: 100%;
          height: 100%;
          padding: 0 5px;
          text-align: left;
          color: white;
          cursor: pointer;
          &:hover {
            /* background-color: #1677ff; */
          }
        }
      }
    }
  }
</style>
