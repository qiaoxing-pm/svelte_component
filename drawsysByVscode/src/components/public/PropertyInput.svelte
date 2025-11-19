<script lang="ts" module>

type SelectOptionType<T> = {
  name: string | number;
  value: T;
  disabled?: boolean;
  [key: string]: any;
};



  import type { MultiSelectProps } from "$lib/index";
  export type PropInputProps = {
    label: string;
    value: any;
    type?:
      | "string"
      | "number"
      | "float"
      | "unsigned"
      | "boolean"
      | "option"
      | "multi-option"
      | "color"
      | "checkbox"
      | "textarea"
      | "radio"
      | "color";
    options?: SelectOptionType<string | number>[];
    onChange?: (value: any, name?: string) => void;
    valid?: (value: any) => boolean;
    size?: "sm" | "md" | "lg";
    multiChild?: MultiSelectProps<string | number>["children"];
    disabled?: boolean;
    [key: string]: unknown;
  };
</script>

<script lang="ts">
  import {
    Input,
    Checkbox,
    Select,
    Textarea,
    type ColorName,
    MultiSelect,
  } from "$lib/index";
  import MCXAColorPicker from "./MCXAComponent/MCXAColorPicker/MCXAColorPicker.svelte";

  let {
    label,
    value = $bindable(),
    type = "string",
    options = [],
    onChange,
    valid,
    size = "sm",
    multiChild,
    disabled = false,
    ...others
  }: PropInputProps = $props();

  let ref = $state(value);
  let color = $state<ColorName | "default">("default");

  function changeValue(v: any, label: string) {
    let isValid = true;
    if (type === "number" || type == "float" || type == "unsigned") {
      v = type === "number" || type == "unsigned" ? parseInt(v) : parseFloat(v);
      if (isNaN(v)) {
        v = type === "float" ? 0.0 : 0;
      }
      isValid = valid?.(v) ?? true;
      if (type === "unsigned" && v < 0) {
        isValid = false;
        v = Math.max(0, v);
        ref = v;
        value = v;
      }
    }
    if (!isValid) {
      color = "red";
      return;
    }
    ref = v;
    value = v;
    color = "default";
    onChange?.(v, label);
  }

  function handleInputConfirm(e: KeyboardEvent, label: string) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    let v = ref;
    changeValue(v, label);
  }
  // onkeydown={(e) => handleInputConfirm(e, label)} texterea 不支持回车确定
</script>

{#if type === "option"}
  <Select
    items={options}
    bind:value
    {disabled}
    {size}
    {...others}
    onchange={(e) => {
      let v = e.currentTarget.value;
      if (typeof value === "number") {
        (v as any) = parseInt(v);
      }
      onChange?.(v, label);
    }}
  />
{:else if type === "multi-option"}
  <MultiSelect items={options} bind:value {size} {...others}>
    {#snippet children({ item, clear })}
      {@render multiChild?.({ item, clear })}
    {/snippet}
  </MultiSelect>
{:else if type === "checkbox"}
  <Checkbox
    bind:checked={value}
    {disabled}
    onchange={(e) => {
      onChange?.(e.currentTarget.checked, label);
    }}>{label}</Checkbox
  >
{:else if type === "radio"}
  <!-- <div> -->
  {#each options as item, index}
    <div class="flex items-center">
      <input
        id="radio-{index}"
        type="radio"
        value={item.value}
        onchange={(e) => {
          value = e.currentTarget.value;
          onChange?.(e.currentTarget.value, item.name as string);
        }}
        name="radio"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="radio-{index}"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{item.name}</label
      >
    </div>
  {/each}
  <!-- </div> -->
{:else if type === "textarea"}
  <Textarea
    {disabled}
    {...others}
    class="w-full"
    bind:value={ref}
    onblur={(e) => {
      let v: any = e.currentTarget.value;
      changeValue(v, label);
    }}
  />
{:else if type === "color"}
  <!-- <div style="width:100%; height:100%;display:block;"> -->
  <MCXAColorPicker bind:color={value} {...others}></MCXAColorPicker>
  <!-- </div> -->
{:else}
  <Input
    class="text-black"
    type={type === "string" ? "text" : "number"}
    {disabled}
    {color}
    {...others}
    bind:value={ref}
    onkeydown={(e: KeyboardEvent) => handleInputConfirm(e, label)}
    onblur={(e: any) => {
      let v: any = e.currentTarget!.value;
      changeValue(v, label);
    }}
    {size}
  />
{/if}

<style lang="scss">
  .wrapper-select {
    width: 40px;
  }
</style>
