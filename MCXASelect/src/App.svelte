<script>
  import Index from "./index.svelte";

const optionLength = [
    {
        label: 1,
        value: 1,
    },
    {
        label: 2,
        value: 2,
    },
    {
        label: 8,
        value: 8,
    },
    {
        label: 16,
        value: 16,
    },
    {
        label: 32,
        value: 32,
    },
    {
        label: 64,
        value: 64,
    },
    {
        label: 128,
        value: 128,
    },
    {
        label: 255,
        value: 255,
    },
];

</script>

<div class="wrapper">
  <Index options={optionLength} value={null} />
</div>

<style>
  .wrapper {
    width: 80px;
    height: 40px;
    background-color: aqua;
  }
</style>
