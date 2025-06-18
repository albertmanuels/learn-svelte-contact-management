<script>
  import { page } from "$app/state";
  import { alertConfirm, alertError, alertSuccess } from "$lib/alert";
  import { addressDelete, addressList } from "$lib/api/AddressApi";
  import { contactDetail } from "$lib/api/ContactApi";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";
  import AddressSection from "./components/AddressSection.svelte";

  const { id } = page.params;

  const token = getLocalStorage("token");

  let contact = $state({
    id: id,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  async function fetchContactDetail() {
    const response = await contactDetail(token, id);
    const resBody = await response.json();

    if (response.status === 200) {
      contact = resBody.data;
    } else {
      await alertError(resBody.errors);
    }
  }

  onMount(async () => {
    await fetchContactDetail();
  });
</script>

{#snippet icon()}
  <i class="fas fa-id-card text-blue-400 mr-3"></i>
{/snippet}
<PageTitle
  title="Contact Details"
  {icon}
  withBackButton={true}
  backTo="/dashboard/contacts"
/>

<div
  class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
>
  <div class="p-8">
    <!-- Contact Header -->
    <div class="mb-8 text-center">
      <div
        class="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg"
      >
        <i class="fas fa-user text-3xl text-white"></i>
      </div>
      <h2 class="text-2xl font-bold text-white mb-2">
        {contact.first_name}
        {contact.last_name}
      </h2>
      <div class="w-24 h-1 bg-gradient mx-auto rounded-full"></div>
    </div>

    <!-- Contact Information -->
    <div class="space-y-5 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
        >
          <div class="flex items-center mb-2">
            <i class="fas fa-user-tag text-blue-400 mr-2"></i>
            <h3 class="text-gray-300 text-sm font-medium">First Name</h3>
          </div>
          <p class="text-white text-lg ml-6">{contact.first_name}</p>
        </div>
        <div
          class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
        >
          <div class="flex items-center mb-2">
            <i class="fas fa-user-tag text-blue-400 mr-2"></i>
            <h3 class="text-gray-300 text-sm font-medium">Last Name</h3>
          </div>
          <p class="text-white text-lg ml-6">{contact.last_name}</p>
        </div>
      </div>

      <div
        class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
      >
        <div class="flex items-center mb-2">
          <i class="fas fa-envelope text-blue-400 mr-2"></i>
          <h3 class="text-gray-300 text-sm font-medium">Email</h3>
        </div>
        <p class="text-white text-lg ml-6">{contact.email}</p>
      </div>

      <div
        class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
      >
        <div class="flex items-center mb-2">
          <i class="fas fa-phone text-blue-400 mr-2"></i>
          <h3 class="text-gray-300 text-sm font-medium">Phone</h3>
        </div>
        <p class="text-white text-lg ml-6">{contact.phone}</p>
      </div>
    </div>

    <AddressSection {contact} />

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4">
      <a
        href="/dashboard/contacts"
        class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
      >
        <i class="fas fa-arrow-left mr-2"></i> Back
      </a>
      <a
        href="/dashboard/contacts/{id}/edit"
        class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
      >
        <i class="fas fa-user-edit mr-2"></i> Edit Contact
      </a>
    </div>
  </div>
</div>
