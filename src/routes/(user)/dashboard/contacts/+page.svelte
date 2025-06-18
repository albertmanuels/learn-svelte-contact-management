<script>
  import { alertError } from "$lib/alert";
  import { contactList } from "$lib/api/ContactApi";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";
  import SearchForm from "./components/SearchForm.svelte";
  import CreatNewContactCard from "./components/CreatNewContactCard.svelte";
  import ContactCard from "./components/ContactCard.svelte";
  import Pagination from "$lib/components/Pagination.svelte";

  const token = getLocalStorage("token");

  const search = $state({
    name: "",
    email: "",
    phone: "",
    page: 1,
  });

  let totalPage = $state(0);
  let contacts = $state([]);

  async function fetchContacts() {
    const response = await contactList(token, search);
    const resBody = await response.json();

    if (response.status === 200) {
      contacts = resBody.data;
      totalPage = resBody.paging.total_page;
    } else {
      alertError(resBody.errors);
    }
  }

  onMount(async () => {
    await fetchContacts();
  });
</script>

<div class="flex items-center mb-6">
  <i class="fas fa-users text-blue-400 text-2xl mr-3"></i>
  <h1 class="text-2xl font-bold text-white">My Contacts</h1>
</div>

<SearchForm {fetchContacts} {search} />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <CreatNewContactCard />

  {#each contacts as contact (contact.id)}
    <ContactCard {contact} {fetchContacts} />
  {/each}
</div>

<Pagination {search} {fetchContacts} {totalPage} />
