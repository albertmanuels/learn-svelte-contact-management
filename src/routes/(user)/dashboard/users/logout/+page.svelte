<script>
  import { goto } from "$app/navigation";
  import { alertError } from "$lib/alert";
  import { userLogout } from "$lib/api/UserApi";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";

  const token = getLocalStorage("token");

  async function handleLogout() {
    if (token) {
      const response = await userLogout(token);
      const resBody = await response.json();

      if (response.status == 200) {
        localStorage.removeItem("token");
      } else {
        await alertError(resBody.errors);
      }
    }

    await goto("/login");
  }

  onMount(async () => {
    await handleLogout();
  });
</script>
