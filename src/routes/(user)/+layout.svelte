<script>
  import Footer from "$lib/layouts/Footer.svelte";
  import Header from "$lib/layouts/Header.svelte";

  let { children } = $props();
</script>

<div
  class="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col"
>
  <Header />
  <main class="container mx-auto px-4 py-8 flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
