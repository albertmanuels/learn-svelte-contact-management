<script>
  const {
    title,
    icon,
    withBackButton = false,
    backTo,
    backButtonText = "Back to Contacts",
  } = $props();
</script>

<div class="flex items-center mb-6">
  {#if withBackButton}
    <a
      href={backTo}
      class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
    >
      <i class="fas fa-arrow-left mr-2"></i>
      {backButtonText}
    </a>
  {/if}
  <h1 class="text-2xl font-bold text-white flex items-center">
    {@render icon()}
    {title}
  </h1>
</div>
