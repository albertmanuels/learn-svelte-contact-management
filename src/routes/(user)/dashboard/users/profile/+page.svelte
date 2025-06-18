<script>
  import { alertError, alertSuccess } from "$lib/alert";
  import {
    userDetail,
    userUpdateName,
    userUpdatePassword,
  } from "$lib/api/UserApi";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";
  import EditProfileCard from "./components/EditProfileCard.svelte";
  import EditPasswordCard from "./components/EditPasswordCard.svelte";

  const token = getLocalStorage("token");

  const user = $state({
    name: "",
  });

  const password = $state({
    password: "",
    confirm_password: "",
  });

  async function handleChangePassword(e) {
    e.preventDefault();

    if (password.password !== password.confirm_password) {
      await alertError("Password and confirm password must be same");
      return;
    }

    const response = await userUpdatePassword(token, {
      password: password.password,
    });
    const resBody = await response.json();

    if (response.status === 200) {
      password.password = "";
      password.confirm_password = "";
      await alertSuccess(resBody.message);
    } else {
      await alertError(resBody.errors);
    }
  }
</script>

<div class="flex items-center mb-6">
  <i class="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
  <h1 class="text-2xl font-bold text-white">My Profile</h1>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  <EditProfileCard />
  <EditPasswordCard />
</div>
