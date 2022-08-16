// Modal functionality
let modal = document.getElementById("instructionsModal");
let btn = document.getElementById("instructionsModalBtn");
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.addEventListener('click', () => {
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
  modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})