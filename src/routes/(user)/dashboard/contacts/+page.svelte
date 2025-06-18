<script>
  import { alertError } from "$lib/alert";
  import { contactList } from "$lib/api/ContactApi";
  import { getLocalStorage } from "$lib/utils/localStorage";
  import { onMount } from "svelte";
  import SearchForm from "./components/SearchForm.svelte";
  import CreatNewContactCard from "./components/CreatNewContactCard.svelte";
  import ContactCard from "./components/ContactCard.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";

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

{#snippet icon()}
  <i class="fas fa-users text-blue-400 text-2xl mr-3"></i>
{/snippet}

<PageTitle title="My Contacts" {icon} />
<SearchForm {fetchContacts} {search} />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <CreatNewContactCard />

  {#each contacts as contact (contact.id)}
    <ContactCard {contact} {fetchContacts} />
  {/each}
</div>

<Pagination {search} {fetchContacts} {totalPage} />
