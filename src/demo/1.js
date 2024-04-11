const openDialogBtn = document.getElementById("openDialogBtn");
const dialog = document.getElementById("dialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");

openDialogBtn.addEventListener("click", () => {
  dialog.style.display = "block";
});

closeDialogBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});
