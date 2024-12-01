const amount = 8;
const numbers = [];

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(4, 1fr)`;

for (let i = 1; i <= amount; i++) {
  numbers.push(i, i);
}
console.log(numbers);

for (let i = 1; i <= amount * 2; i++) {
  const rand = Math.floor(Math.random() * numbers.length);
  const div = document.createElement("div");
  div.innerHTML = `<span>${numbers[rand]}</span>`;
  board.appendChild(div);
  numbers.splice(rand, 1);
  div.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("hidden") ||
      event.target.classList.contains("showing")
    ) {
      return;
    }
    if (board.querySelectorAll(".showing").length === 2) {
      return;
    }
    event.target.classList.add("showing");
    check();
  });
}

function check() {
  const cards = board.querySelectorAll(".showing");
  if (cards.length === 2) {
    if (cards[0].textContent === cards[1].textContent) {
      setTimeout(() => {
        cards[0].classList.remove("showing");
        cards[1].classList.remove("showing");
        cards[0].classList.add("hidden");
        cards[1].classList.add("hidden");
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
      }, 1000);
    } else if (cards[0].textContent !== cards[1].textContent) {
      setTimeout(() => {
        cards[0].classList.remove("showing");
        cards[1].classList.remove("showing");
      }, 1000);
    }
  }
}

function finish() {
  const cards = board.querySelectorAll("div:not(.hidden)");
  if (!cards.length) {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
}
