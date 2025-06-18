<script>
  import { page } from "$app/state";
  import { alertConfirm, alertError, alertSuccess } from "$lib/alert";
  import { addressDelete, addressList } from "$lib/api/AddressApi";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";

  const { id } = page.params;

  const { contact } = $props();

  const token = getLocalStorage("token");
  let addresses = $state([]);

  async function handleDeleteAddress(addressId) {
    if (!(await alertConfirm("Are you sure want to delete this address?"))) {
      return;
    }

    const response = await addressDelete(token, id, addressId);
    const resBody = await response.json();

    if (response.status === 200) {
      await alertSuccess("Address deleted successfully");
      await fetchAddressList();
    } else {
      await alertError(resBody.errors);
    }
  }

  async function fetchAddressList() {
    const response = await addressList(token, id);
    const resBody = await response.json();

    if (response.status === 200) {
      addresses = resBody.data;
    } else {
      await alertError(resBody.errors);
    }
  }

  onMount(async () => {
    await fetchAddressList();
  });
</script>

<!-- Addresses Section -->
<div class="mb-8">
  <div class="flex items-center mb-5">
    <i class="fas fa-map-marker-alt text-blue-400 mr-3"></i>
    <h3 class="text-xl font-semibold text-white">Addresses</h3>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <!-- Add Address Card -->
    <div
      class="bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover"
    >
      <a
        href="/dashboard/contacts/{contact.id}/addresses/create"
        class="block h-full"
      >
        <div
          class="flex flex-col items-center justify-center h-full text-center py-4"
        >
          <div
            class="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110"
          >
            <i class="fas fa-plus text-2xl text-white"></i>
          </div>
          <h4 class="text-lg font-semibold text-white">Add Address</h4>
        </div>
      </a>
    </div>

    {#each addresses as address (address.id)}
      <div
        class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover"
      >
        <div class="flex items-center mb-3">
          <div
            class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
          >
            <i class="fas fa-home text-white"></i>
          </div>
          <h4 class="text-lg font-semibold text-white">Home Address</h4>
        </div>
        <div class="space-y-3 text-gray-300 ml-2 mb-4">
          <p class="flex items-center">
            <i class="fas fa-road text-gray-500 w-6"></i>
            <span class="font-medium w-24">Street:</span>
            <span>{address.street}</span>
          </p>
          <p class="flex items-center">
            <i class="fas fa-city text-gray-500 w-6"></i>
            <span class="font-medium w-24">City:</span>
            <span>{address.city}</span>
          </p>
          <p class="flex items-center">
            <i class="fas fa-map text-gray-500 w-6"></i>
            <span class="font-medium w-24">Province:</span>
            <span>{address.province}</span>
          </p>
          <p class="flex items-center">
            <i class="fas fa-flag text-gray-500 w-6"></i>
            <span class="font-medium w-24">Country:</span>
            <span>{address.country}</span>
          </p>
          <p class="flex items-center">
            <i class="fas fa-mailbox text-gray-500 w-6"></i>
            <span class="font-medium w-24">Postal Code:</span>
            <span>{address.postal_code}</span>
          </p>
        </div>
        <div class="flex justify-end space-x-3">
          <a
            href="/dashboard/contacts/{id}/addresses/{address.id}/edit"
            class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
          >
            <i class="fas fa-edit mr-2"></i> Edit
          </a>
          <button
            onclick={() => handleDeleteAddress(address.id)}
            class="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
          >
            <i class="fas fa-trash-alt mr-2"></i> Delete
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
