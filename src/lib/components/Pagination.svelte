<script>
  const { search, totalPage, fetchContacts } = $props();

  let pages = $derived.by(() => {
    const data = [];

    for (let i = 1; i <= totalPage; i++) {
      data.push(i);
    }

    return data;
  });

  async function handlePageChang(value) {
    search.page = value;
    await fetchContacts();
  }
</script>

<div class="mt-10 flex justify-center">
  <nav
    class="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in"
  >
    {#if search.page > 1}
      <button
        onclick={() => handlePageChange(search.page - 1)}
        class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
      >
        <i class="fas fa-chevron-left mr-2"></i> Previous
      </button>
    {/if}
    {#each pages as page (page)}
      {#if page === search.page}
        <button
          onclick={() => handlePageChange(page)}
          class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md"
        >
          {page}
        </button>
      {:else}
        <button
          onclick={() => handlePageChange(page)}
          class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
        >
          {page}
        </button>
      {/if}
    {/each}
    {#if search.page < totalPage}
      <button
        onclick={() => handlePageChange(search.page + 1)}
        class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
      >
        Next <i class="fas fa-chevron-right ml-2"></i>
      </button>
    {/if}
  </nav>
</div>
