<script>
  import { alertError, alertSuccess } from "$lib/alert";
  import { userDetail, userUpdateName } from "$lib/api/UserApi";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";

  const token = getLocalStorage("token");

  const user = $state({
    name: "",
  });

  async function fetchUser() {
    const response = await userDetail(token);
    const resBody = await response.json();

    if (response.status === 200) {
      user.name = resBody.data.name;
    } else {
      await alertError(resBody.errors);
    }
  }

  async function handleChangeName(e) {
    e.preventDefault();

    const response = await userUpdateName(token, { name: user.name });
    const resBody = await response.json();

    if (response.status === 200) {
      await alertSuccess(resBody.message);
    } else {
      await alertError(resBody.errors);
    }
  }

  onMount(async () => {
    await fetchUser();
  });
</script>

<div
  class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
>
  <div class="p-6">
    <div class="flex items-center mb-4">
      <div
        class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
      >
        <i class="fas fa-user-edit text-white"></i>
      </div>
      <h2 class="text-xl font-semibold text-white">Edit Profile</h2>
    </div>
    <form onsubmit={handleChangeName}>
      <div class="mb-5">
        <label for="name" class="block text-gray-300 text-sm font-medium mb-2"
          >Full Name</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <i class="fas fa-user text-gray-500"></i>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your full name"
            required
            bind:value={user.name}
          />
        </div>
      </div>

      <div class="mt-6">
        <button
          type="submit"
          class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
        >
          <i class="fas fa-save mr-2"></i> Update Profile
        </button>
      </div>
    </form>
  </div>
</div>
