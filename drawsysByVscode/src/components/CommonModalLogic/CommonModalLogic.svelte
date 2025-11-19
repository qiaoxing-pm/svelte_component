<svelte:options customElement="common-modal-logic" />


<script lang="ts">
  import { onDestroy, onMount, type Component } from "svelte";

  let {
    onClose = () => {},
    isOpenState = $bindable(false),
    isPublicState = false,
    haveCurtain = false,
    headTitle = "",
    isDraggable = true,
    isStretchable = true,
    styled = undefined,
  } = $props();

  let contentComponent = $state<any>();

  let wrapperRef = $state<HTMLElement | null>();
  let isOpen = $state(isOpenState);
  let isPublic = $state<boolean>(isPublicState);
  // let headTitle = $state<string>("");
  $effect(() => {
    isOpenState;
    requestAnimationFrame(() => {
      isOpen = isOpenState;
    });
  });

  let select = $state(false);

  // 窗口最大宽度和高度
  let MaxWidth = 800;
  let MaxHeight = 600;
  // 窗口占比
  let MaxWindowPercent = 0.8;
  // 窗口最小宽度和高度
  const MINWIDTH = 300;
  const MINHEIGHT = 300;
  // 窗口宽高
  let wrapperLocal = $state({
    width: 800,
    height: 800,
  });
  // 窗口偏移
  let wrapperLocalByOffset = $state({
    x: 0,
    y: 0,
  });
  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(min, value), max);
  }
  const closeModal = () => {
    isOpen = false;
    isOpenState = false;
    isPublic = false;
    onClose();
  };

  const moveDown = (
    e: MouseEvent,
    type: "head" | "top" | "bottom" | "left" | "right"
  ) => {
    e.preventDefault();
    const payload = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: wrapperLocal.width,
      startHeight: wrapperLocal.height,
      startOffsetX: wrapperLocalByOffset.x,
      startOffsetY: wrapperLocalByOffset.y,
    };

    document.body.style.userSelect = "none";
    const bodyRect = document.body.getBoundingClientRect();
    const wrapperRect = wrapperRef!.getBoundingClientRect();
    // 限制鼠标不要超出可视范围
    const maxX = bodyRect.width;
    const maxY = bodyRect.height;
    const moveHandler = (ev: MouseEvent) => {
      let dx = clamp(ev.clientX, 0, maxX) - payload.startX;
      let dy = clamp(ev.clientY, 0, maxY) - payload.startY;

      switch (type) {
        case "head":
          wrapperLocalByOffset = {
            x: payload.startOffsetX + dx,
            y: payload.startOffsetY + dy,
          };
          break;
        case "top":
          wrapperLocalByOffset = {
            ...wrapperLocalByOffset,
            y: clamp(
              payload.startOffsetY + dy,
              0,
              wrapperRect.bottom - MINHEIGHT
            ),
          };
          wrapperLocal = {
            ...wrapperLocal,
            height: clamp(payload.startHeight - dy, MINHEIGHT, maxX),
          };
          break;
        case "bottom":
          wrapperLocal = {
            ...wrapperLocal,
            height: clamp(payload.startHeight + dy, MINHEIGHT, maxX),
          };
          break;
        case "left":
          wrapperLocalByOffset = {
            ...wrapperLocalByOffset,
            x: clamp(
              payload.startOffsetX + dx,
              0,
              wrapperRect.right - MINWIDTH
            ),
          };
          wrapperLocal = {
            ...wrapperLocal,
            width: clamp(payload.startWidth - dx, MINWIDTH, maxY),
          };
          break;
        case "right":
          wrapperLocal = {
            ...wrapperLocal,
            width: clamp(payload.startWidth + dx, MINWIDTH, maxX),
          };
          break;
      }
    };

    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  };

  let contentComponentProps = $state<Record<string, any>>({});

  onMount(() => {
    window.addEventListener("resize", init);
  });

  onDestroy(() => {
    window.removeEventListener("resize", init);
  });
  $effect(() => {
    if (styled) {
      requestAnimationFrame(() => {
        wrapperLocal = {
          ...wrapperLocal,
          width: styled.width ?? wrapperLocal.width,
          height: styled.height ?? wrapperLocal.height,
        };
      });
    }
  });

  const init = () => {
    if (wrapperRef) {
      const wrapperBodyRect = document.body.getBoundingClientRect();
      const wrapperRefRect = wrapperRef?.getBoundingClientRect();
      if (isStretchable) {
        wrapperLocal = {
          width:
            wrapperBodyRect.width * MaxWindowPercent > MaxWidth
              ? MaxWidth
              : wrapperBodyRect.width * MaxWindowPercent,
          height:
            wrapperBodyRect.height * MaxWindowPercent > MaxHeight
              ? MaxHeight
              : wrapperBodyRect.height * MaxWindowPercent,
        };
      }

      wrapperLocalByOffset = {
        x: (wrapperBodyRect.width - wrapperRefRect.width) / 2,
        y: (wrapperBodyRect.height - wrapperRefRect.height) / 2,
      };
    }
  };

  $effect(() => {
    if (isOpen && wrapperRef) {
      init();
    }
  });
  const changeSeletState = (e: MouseEvent) => {
    if (wrapperRef?.contains(e.target)) {
      select = true;
    } else {
      select = false;
    }
  };

  onMount(() => {
    init();
    window.addEventListener("click", changeSeletState);
    window.addEventListener("mousedown", changeSeletState);
  });

  onDestroy(() => {
    window.removeEventListener("click", changeSeletState);
    window.removeEventListener("mousedown", changeSeletState);
  });
</script>

{#if isOpen}
  {#if haveCurtain || isPublic}
    <div
      class="overlay-gray-curtain"
      style={isPublic ? "z-index: 1005;" : `${select ? "z-index:1003;" : ""}`}
    ></div>
  {/if}
  <div
    class="wrapper"
    onclick={() => {
      select = true;
    }}
    bind:this={wrapperRef}
    style="width:{wrapperLocal.width}px;height:{wrapperLocal.height}px;left:{wrapperLocalByOffset.x}px;top:{wrapperLocalByOffset.y}px;{isPublic
      ? 'z-index: 1006'
      : `${select ? 'z-index:1004;' : ''}`}"
  >
    {#if isStretchable}
      <div
        class="resize resize-top"
        onmousedown={(e) => {
          moveDown(e, "top");
        }}
      ></div>
      <div
        class="resize resize-bottom"
        onmousedown={(e) => {
          moveDown(e, "bottom");
        }}
      ></div>
      <div
        class="resize resize-left"
        onmousedown={(e) => {
          moveDown(e, "left");
        }}
      ></div>
      <div
        class="resize resize-right"
        onmousedown={(e) => {
          moveDown(e, "right");
        }}
      ></div>
    {/if}

    <div
      class="head"
      onmousedown={(e) => {
        if (isDraggable) {
          moveDown(e, "head");
        }
      }}
    >
      <p>{headTitle}</p>
      <button
        class={`button-close iconItem iconfont ${"icon-close"}`}
        onclick={closeModal}
      ></button>
    </div>
    <div class="content" style={isStretchable ? "" : "padding:0;"}>
      <div class="content-content">
        {#if isPublic}
          {#if contentComponent}
            <svelte:component
              this={contentComponent}
              {...contentComponentProps}
            />
          {/if}
        {:else}
          <slot></slot>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .overlay-gray-curtain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--gray-curtain, rgba(0, 0, 0, 0.5));
    z-index: 1000;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    left: 50vw;
    top: 50vh;
    width: 800px;
    height: 800px;
    background-color: var(--background, #000000);
    z-index: 1001;
    box-shadow: 0 0 5px var(--box-shadow, #ccc);
    border-radius: 8px;
    overflow: hidden;

    .resize-top {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);
      height: 10px;
      width: 95%;
      cursor: ns-resize;
      border-radius: 8px;
      background-color: transparent;
      z-index: 1004;
    }

    .resize-bottom {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -100%);
      height: 10px;
      width: 95%;
      cursor: ns-resize;
      border-radius: 8px;
      background-color: transparent;
      z-index: 1004;
    }

    .resize-left {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      height: 95%;
      width: 10px;
      cursor: ew-resize;
      border-radius: 8px;
      background-color: transparent;
      z-index: 1004;
    }

    .resize-right {
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translate(-100%, -50%);
      height: 95%;
      width: 10px;
      cursor: ew-resize;
      border-radius: 8px;
      background-color: transparent;
      z-index: 1004;
    }

    .head {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      cursor: move;
      border-bottom: 2px solid var(--dock-view-border, #2b2b2b);
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 15px;
      .button-close {
        float: right;
        color: var(--button-font, #ccc);
        font-size: 18px;
      }
    }

    .content {
      /* width: 100%; */
      height: 80%;
      // height: max-content;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;

      .content-content {
        width: 100%;
        flex: 1;
        height: 100%;
        box-sizing: border-box;
      }
    }

    .footer {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: right;
      flex-direction: row;
      box-sizing: border-box;
      border-top: 2px solid var(--border, #ccc);
      align-items: center;
      padding: 0 26px;
    }
  }
</style>
