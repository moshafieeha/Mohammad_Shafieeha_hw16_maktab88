const deleteButton = document.querySelector("#deleteButton");

deleteButton.addEventListener("click", (event) => {
  event.preventDefault();
  $("#deleteModal").modal("show");
});
