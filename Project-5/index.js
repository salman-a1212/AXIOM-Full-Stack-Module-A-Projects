// Get DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const filterBtn = document.getElementById("filter");
const sortBtn = document.getElementById("sort");
const sumBtn = document.getElementById("sum");

// Initialize user data array
let data = [];

// Fetch random user from randomuser.me
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  // Get user data
  const user = data.results[0];
  //   console.log(user);

  //   creat new user
  const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    balance: Math.floor(Math.random() * 1000000),
  };

  //   console.log("newUser", newUser);

  //   Add new user into data array
  addData(newUser);
}

// function to add user data in to user data array
function addData(newUser) {
  data.push(newUser);
  //   console.log("data array", data);
  updateDOM();
}

// Update the UI with data from the user data array
function updateDOM(userData = data) {
  // clear previous data
  main.innerHTML = "<h2><strong>User</strong> Wealth</h2>";
  //   loop thru user data and render it in UI
  userData.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `<strong>${user.name}</strong> ${formatCurrency(
      user.balance
    )} `;
    main.appendChild(userDiv);
  });
}

// create random user

// Function to format a number as a currency
function formatCurrency(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUser);

// function double money
function doubleMoney() {
  data = data.map((user) => {
    console.log("user", user);
    return { ...user, balance: user.balance * 2 };
  });

  updateDOM();
}

doubleBtn.addEventListener("click", doubleMoney);
filterBtn.addEventListener("click", filterUsers);

// function to filter users
function filterUsers() {
  data = data.filter((user) => user.balance >= 1000000);
  updateDOM();
}

sortBtn.addEventListener("click", sortByBalance);

// function to sort by balance
function sortByBalance() {
  data = data.sort((a, b) => b.balance - a.balance);
  updateDOM();
}

sumBtn.addEventListener("click", totalBalance);

// function to sum total balance
function totalBalance() {
  updateDOM();
  const balance = data.reduce((acc, user) => (acc += user.balance), 0);
  const balanceElement = document.createElement("div");
  balanceElement.innerHTML = `<h3>Total Balance: ${formatCurrency(
    balance
  )}</h3>`;
  main.appendChild(balanceElement);
}
