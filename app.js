const dropItems = document.querySelectorAll(".drop");
const dragItems = document.querySelectorAll(".draggable");
const button = document.getElementById("restart");
const modal = document.getElementById("game-over");

const array = [];
button.addEventListener("click", restart);

function endGame() {
  modal.classList.add("active");
}

function restart() {
  location.reload();
  modal.classList.remove("active");
}

dragItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

dropItems.forEach((item) => {
  item.addEventListener("dragenter", dragEnter);
  item.addEventListener("dragover", dragOver);
  item.addEventListener("dragleave", dragLeave);
  item.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("dropped-hover");
  }
}

function dragOver(event) {
  if (!event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.remove("dropped-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("dropped-hover");
  const dragItemData = event.dataTransfer.getData("text");
  const dropItemData = event.target.getAttribute("data-id");
  if (dragItemData === dropItemData) {
    array.push(dragItemData);
    event.target.classList.add("dropped");
    const dragElement = document.getElementById(dragItemData);
    event.target.style.color = "green";
    dragElement.classList.add("dragged");
    dragElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML(
      "afterbegin",
      `<i class="fab fa-${dragItemData}" style="color: green"> </i>`
    );
    checkArray(array);
  }
}

function checkArray(array) {
  if (array.length >= 6) {
    endGame();
  }
}
