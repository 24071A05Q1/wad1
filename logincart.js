

<script>
/* ---------------- USERS (with storage) ---------------- */
let users = JSON.parse(localStorage.getItem("users")) || [];

/* ---------------- PRODUCTS ---------------- */
const products = [
{ id: 1, name: "Headphones", price: 150, img: "🎧" },
{ id: 2, name: "Smartwatch", price: 210, img: "⌚" },
{ id: 3, name: "Keyboard", price: 85, img: "⌨️" },
{ id: 4, name: "Mouse", price: 45, img: "🖱️" }
];

let cart = [];

/* ---------------- PAGE SWITCH ---------------- */
function showPage(pageId) {
document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
document.getElementById(pageId).classList.add('active');
}

/* ---------------- REGISTER ---------------- */
function registerUser(e) {
e.preventDefault();

const name = e.target[0].value;
const email = e.target[1].value;
const password = e.target[2].value;

// check existing
if (users.find(u => u.email === email)) {
alert("User already exists!");
return;
}

users.push({ name, email, password });

// save
localStorage.setItem("users", JSON.stringify(users));

alert("Registered successfully!");
showPage('login');
}

/* ---------------- LOGIN ---------------- */
function loginUser(e) {
e.preventDefault();

const email = e.target[0].value;
const password = e.target[1].value;

const user = users.find(u => u.email === email && u.password === password);

if (user) {
alert("Login successful!");
showPage('catalog');
} else {
alert("Invalid email or password!");
}
}

/* ---------------- CATALOG ---------------- */
function renderCatalog() {
const list = document.getElementById('product-list');

list.innerHTML = products.map(p => `
<div class="col-md-3">
<div class="card text-center">
<div class="product-emoji">${p.img}</div>
<div class="card-body">
<h6>${p.name}</h6>
<p>$${p.price}</p>
<button class="btn btn-info btn-sm" onclick="addToCart(${p.id})">Add</button>
</div>
</div>
</div>
`).join('');
}

/* ---------------- CART ---------------- */
function addToCart(id) {
cart.push(products.find(p => p.id === id));
updateCart();
}

function updateCart() {
document.getElementById("cart-count").innerText = cart.length;

let total = 0;

document.getElementById("cart-items").innerHTML = cart.map((item, i) => {
total += item.price;
return `
<tr>
<td>${item.name}</td>
<td>$${item.price}</td>
<td><button onclick="removeItem(${i})">Remove</button></td>
</tr>
`;
}).join('');

document.getElementById("cart-total").innerText = total;
}

function removeItem(i) {
cart.splice(i, 1);
updateCart();
}

/* ---------------- INIT ---------------- */
renderCatalog();

</script>

</body>
</html>
