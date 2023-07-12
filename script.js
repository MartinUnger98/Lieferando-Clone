let foods = [
  {
    name: "Pizza Margherita",
    price: 7.5,
    description: "mit Basilikum und Käse",
  },
  {
    name: "Pizza Salami",
    price: 9.0,
    description: "mit Salami und Käse",
  },
  {
    name: "Pizza Napoli",
    price: 8.5,
    description: "mit Oliven und Käse",
  },
  {
    name: "Pizza Schinken Mais",
    price: 9.5,
    description: "mit Schinken, Mais und Käse",
  },
  {
    name: "Pizza Prosciutto",
    price: 9.5,
    description: "mit Prosciutto Schinken, Basilikum und Käse",
  },
];

let basket = [];

let total = 0;

load();

function render() {
  renderCards();
  renderBasket();
}

function renderOnlyBasket() {
  renderBasket();
}

function renderCards() {
  let content_cards = document.getElementById("content_cards");
  content_cards.innerHTML = "";

  foods.forEach((food, i) => {
    let price = food.price.toFixed(2);
    let cardHTML = generatecardHTML(food, price, i);
    content_cards.innerHTML += cardHTML;
  });
}

function generatecardHTML(food, price, i) {
  return `
  <div class="card">
    <div>
      <h2>${food.name}</h2>
      <p>${price} €</p>
      <p>${food.description}</p>
    </div>
    <img src="icon/plus.png" class="logo" onclick="add(${i})">
  </div>
`
}

function renderBasket() {
  let content_basket = document.getElementById("shoppingCard_content");
  content_basket.innerHTML = "";

  basket.forEach((product, i) => {
    let price = product.price.toFixed(2);
    basketHTML = generatebasketHTML(product, i, price);
    content_basket.innerHTML += basketHTML;
  });

  calcTotal();
  updateTotal();
  
}

function updateTotal() {
  let totalPrice = document.getElementById("total");
  totalPrice.innerHTML = `<p>${total}</p>`;

  let totalPrice_bottom = document.getElementById("basket_bottom");
  totalPrice_bottom.innerHTML = `Warenkorb ${total}`;

  let order_bottom = document.getElementById("order_bottom");
  order_bottom.innerHTML = `<div>Bestellen</div>`
}

function generatebasketHTML(product, i, price) {
  return `
  <div class="produkt">
    <table class="table_basket">
      <tr>
        <td><b>${product.counter}</b></td>
        <td>${product.name}</td>
        <td>${price}€</td>
        <td><img src="icon/plus.png" class="logo_basket" onclick="addOrSub(${i}, 0)"></td>
        <td><img src="icon/minus.png" class="logo_basket" onclick="addOrSub(${i}, 1)"></td>
      </tr>
    </table>
  </div>
  `;
}

function add(index) {
  let food = foods[index];
  let name = food.name;
  let price = food.price;

  let existingProduct = basket.find(product => product.name === name);
  if (existingProduct) {
    existingProduct.counter++;
  } else {
    basket.push({ name, price, counter: 1 });
  }

  renderBasket();
  save();
}

function checkBasket(name) {
  return basket.some(product => product.name === name);
}

function calcTotal() {
  total = 0;
  for (let i = 0; i < basket.length; i++) {
    const product = basket[i];
    let totalprice = product.price * product.counter;
    total += totalprice;
  }
  total = total.toFixed(2) + "€";
}

function addOrSub(index, x) {
  let product = basket[index];
  if (x === 0) {
    product.counter++;
  } else {
    product.counter--;
    if (product.counter === 0) {
      basket.splice(index, 1);
    }
  }
  renderBasket();
  save();
}

function finishOrder() {
  total = parseInt(total);
  if (total < 12.0) {
    alert("Mindestbestellwert unterschritten!");
  } else {
    window.location.href = "finish.html";
  }
}

function basketExtern() {
  window.location.href = "basket.html";
}

function backToMain() {
  window.location.href = "index.html";
}

function save() {
  let basketAsText = JSON.stringify(basket);
  localStorage.setItem("basket", basketAsText);
}

function load() {
  let basketAsText = localStorage.getItem("basket");
  if (basketAsText) {
    basket = JSON.parse(basketAsText);
  }
}
