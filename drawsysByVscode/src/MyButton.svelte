<svelte:options customElement="my-button" />

<script>
  const el = $host();

  // 获取初始 props
  let { title = { label: "按钮~", count: 0 } } = $props();

  const handleClick = () => {
    // 必须生成新对象引用，否则不会触发更新
    title = { ...title, count: title.count + 1 };
    console.log("按钮被点击啦~ 😘", title.count);

    // 派发自定义事件
    el.dispatchEvent(
      new CustomEvent("click-asd", {
        detail: { title },
        bubbles: true,
        composed: true,
      })
    );
  };
</script>

<div>
  <button on:click={handleClick}>
    {title.label}
    {title.count > 0 ? `(${title.count})` : ""}
  </button>
</div>
