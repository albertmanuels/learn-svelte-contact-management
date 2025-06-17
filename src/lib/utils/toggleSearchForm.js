function toggleSearchForm() {
  const toggleButton = document.getElementById("toggleSearchForm");
  const searchFormContent = document.getElementById("searchFormContent");
  const toggleIcon = document.getElementById("toggleSearchIcon");

  // Add transition for smooth animation
  searchFormContent.style.transition =
    "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
  searchFormContent.style.overflow = "hidden";
  searchFormContent.style.maxHeight = "0px";
  searchFormContent.style.opacity = "0";
  searchFormContent.style.marginTop = "0";

  toggleButton.addEventListener("click", function () {
    if (searchFormContent.style.maxHeight !== "0px") {
      // Hide the form
      searchFormContent.style.maxHeight = "0px";
      searchFormContent.style.opacity = "0";
      searchFormContent.style.marginTop = "0";
      toggleIcon.classList.remove("fa-chevron-up");
      toggleIcon.classList.add("fa-chevron-down");
    } else {
      // Show the form
      searchFormContent.style.maxHeight = searchFormContent.scrollHeight + "px";
      searchFormContent.style.opacity = "1";
      searchFormContent.style.marginTop = "1rem";
      toggleIcon.classList.remove("fa-chevron-down");
      toggleIcon.classList.add("fa-chevron-up");
    }
  });
}

export default toggleSearchForm;
