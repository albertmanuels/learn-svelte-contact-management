<script>
  import { page } from "$app/state";
  import { alertError, alertSuccess } from "$lib/alert";
  import { contactDetail, contactUpdate } from "$lib/api/ContactApi";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";

  const { id } = page.params;

  const token = getLocalStorage("token");

  let contact = $state({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  async function fetchContactDetail() {
    const response = await contactDetail(token, id);
    const resBody = await response.json();

    if (response.status === 200) {
      contact.first_name = resBody.data.first_name;
      contact.last_name = resBody.data.last_name;
      contact.email = resBody.data.email;
      contact.phone = resBody.data.phone;
    } else {
      await alertError(resBody.errors);
    }
  }

  async function handleSubmit() {
    const response = await contactUpdate(token, id, contact);
    const resBody = await response.json();

    if (response.status === 200) {
      await alertSuccess("Contact update successfully!");
    } else {
      await alertError(resBody.errors);
    }
  }

  onMount(async () => {
    await fetchContactDetail();
  });
</script>

{#snippet icon()}
  <i class="fas fa-user-edit text-blue-400 mr-3"></i>
{/snippet}

<PageTitle
  title="Edit Contact"
  {icon}
  withBackButton={true}
  backTo="/dashboard/contacts"
/>

<div
  class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
>
  <div class="p-8">
    <form onsubmit={handleSubmit}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label
            for="first_name"
            class="block text-gray-300 text-sm font-medium mb-2"
            >First Name</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-user-tag text-gray-500"></i>
            </div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter first name"
              required
              bind:value={contact.first_name}
            />
          </div>
        </div>
        <div>
          <label
            for="last_name"
            class="block text-gray-300 text-sm font-medium mb-2"
            >Last Name</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <i class="fas fa-user-tag text-gray-500"></i>
            </div>
            <input
              type="text"
              id="last_name"
              name="last_name"
              class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter last name"
              required
              bind:value={contact.last_name}
            />
          </div>
        </div>
      </div>

      <div class="mb-5">
        <label for="email" class="block text-gray-300 text-sm font-medium mb-2"
          >Email</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <i class="fas fa-envelope text-gray-500"></i>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter email address"
            required
            bind:value={contact.email}
          />
        </div>
      </div>

      <div class="mb-6">
        <label for="phone" class="block text-gray-300 text-sm font-medium mb-2"
          >Phone</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <i class="fas fa-phone text-gray-500"></i>
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter phone number"
            required
            bind:value={contact.phone}
          />
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <a
          href="/dashboard/contacts"
          class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
        >
          <i class="fas fa-times mr-2"></i> Cancel
        </a>
        <button
          type="submit"
          class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
        >
          <i class="fas fa-save mr-2"></i> Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
