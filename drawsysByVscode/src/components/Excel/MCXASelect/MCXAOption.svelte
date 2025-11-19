<script>
  import { onMount } from "svelte";

  let { api } = $props();
  let showSelectState = $state(false);
  let value = $state("");
  let options = $state([]);
  let wrapperOptionRef = $state(null);
  let rect = $state();
  let onSelect = null;

  const onmousedown = (e) => {
    if (!wrapperOptionRef) {
      return;
    }
    const rect = wrapperOptionRef.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const inInX = clientX >= rect.left && clientX <= rect.right;
    const inInY = clientY >= rect.top && clientY <= rect.bottom;
    if (showSelectState && inInY && inInX) {
      
    } else {
      showSelectState = false;
    }
  };

  onMount(() => {
    window.addEventListener("mousedown", onmousedown);
    api.eventBus.on("mcxa_select_test", (e) => {
      options = e.options;
      value = e.value;
      showSelectState = e.showSelectState;
      onSelect = e.onSelect;
      rect = e.rect;
    });
  });
</script>

{#if showSelectState}
  <div
    class="wrapper-option"
    bind:this={wrapperOptionRef}
    style={`${options.length < 8 ? "padding:3px" : ""};top:${rect.top + rect.height}px;left:${rect.left}px;`}
  >
    <div class="select-content default-width">
      <div class="select-select">
        {#each options as item, i}
          <div
            class="select-option"
            style={item.value === value ? "background:#1677ff" : ""}
            data-value={i}
            onclick={() => {
              if (onSelect) {
                onSelect(item.value);
              }
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
  .wrapper-option {
    display: flex;
    justify-content: left;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
    position: fixed;
    box-sizing: border-box;
    padding: 3px 0px 3px 3px;
    background-color: #423f3f;
    max-height: 180px;
    z-index: 99999;
    overflow: hidden;
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
      background-color: transparent;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        background-color: transparent;
        width: 12px;
      }

      &::-webkit-scrollbar-thumb {
        background: #000000;
        border-radius: 8px;
        border: 2px solid transparent;
        background-clip: content-box;
      }

      .select-select {
        display: flex;
        justify-content: left;
        flex-direction: column;
        background-color: transparent;

        .select-option {
          width: 100%;
          height: 100%;
          padding: 0 5px;
          background-color: black;
          text-align: left;
          color: white;
          cursor: pointer;
          &:hover {
            background-color: #1677ff;
          }
        }
      }
    }
  }
</style>
