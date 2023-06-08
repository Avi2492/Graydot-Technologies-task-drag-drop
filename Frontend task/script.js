const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");
const successMessage = document.getElementById("success-message");

const items = container1.querySelectorAll(".item");
items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

container2.addEventListener("dragover", dragOver);
container2.addEventListener("drop", drop);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetContainers);

let draggedItems = [];

function dragStart(event) {
  draggedItems.push(event.target);
  if (event.target.tagName === "IMG") {
    event.dataTransfer.setData("text/plain", event.target.src);
  } else {
    event.dataTransfer.setData("text/plain", event.target.textContent);
  }
  event.target.classList.add("dragged");
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (!draggedItems.includes(event.target)) {
    const data = event.dataTransfer.getData("text/plain");
    if (data.startsWith("http")) {
      const img = document.createElement("img");
      img.src = data;
      img.alt = "Dropped Image";
      event.target.appendChild(img);
    } else {
      const p = document.createElement("p");
      p.textContent = data;
      event.target.appendChild(p);
    }
  }
  draggedItems.forEach((item) => item.classList.remove("dragged"));
  draggedItems = [];
  successMessage.textContent = "Items dropped successfully!";
}

function resetContainers() {
  container2.innerHTML = "";
  successMessage.textContent = "";
  draggedItems.forEach((item) => item.classList.remove("dragged"));
  draggedItems = [];
}
