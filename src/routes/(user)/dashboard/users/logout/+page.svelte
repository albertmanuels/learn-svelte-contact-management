<script>
  import { goto } from "$app/navigation";
  import { alertError } from "$lib/alert";
  import { userLogout } from "$lib/api/UserApi";
  import { onMount } from "svelte";

  const token = localStorage.getItem("token");

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
