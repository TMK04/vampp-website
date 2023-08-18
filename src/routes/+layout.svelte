<script>
  import "../app.css";
</script>

<div class="mx-[10%]">
  <header class="box-content h-[80px]">
    <img src="/logo.png" alt="logo" class="h-full" />
  </header>
  <slot />
</div>


<style lang="postcss">
  :global(html) {
    background-color: theme(colors.background);
  }
</style>