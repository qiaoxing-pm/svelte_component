<script>
  let { value = $bindable(), options, api, onChange } = $props();
  let wrapperRef = $state();
  let showValue = $derived.by(() => {
    return options.find((item) => item.value === value);
  });
  const onSelect = (selectValue) => {
    value = selectValue;
    onChange(value)
  };

  const onclick = () => {
    const rect = wrapperRef.getBoundingClientRect();
    if (options.length) {
      api.eventBus.emit("mcxa_select_test", {
        value,
        options,
        showSelectState: true,
        onSelect,
        rect,
      });
    }
  };
</script>

<div class="wrapper" bind:this={wrapperRef}>
  <button aria-label="select value" class="wrapper-value" {onclick}>
    <p>{showValue ? showValue.label : value}</p>
  </button>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    color: var(--font, #ffffff);
    background-color: transparent;
    flex-direction: column;
    .wrapper-value {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0px;
      border:none;
      padding-right: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: left;
      flex-direction: row;
      background-color: transparent;
      color: white;

      button {
        background-color: transparent;
        border: none;
        padding: 0;
      }

      p {
        text-align: left;
        width: 100%;
        height: fit-content;
        flex: 1;
        overflow: hidden;
        margin: 0;
        background-color: transparent;
      }
    }
  }
</style>
