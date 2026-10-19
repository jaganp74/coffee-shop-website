// ========================================
// BREW HAVEN COFFEE
// COMPLETE JAVASCRIPT
// ========================================


// ========================================
// CART
// ========================================

let cart = [];


// Get cart elements

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// Get Add to Cart buttons

const orderButtons = document.querySelectorAll(".order-button");


// ========================================
// ADD TO CART
// ========================================

orderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(function (item) {

            return item.name === name;

        });


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,
                price: price,
                quantity: 1

            });

        }


        updateCart();

        alert(name + " added to cart! ☕");


        // Scroll to cart

        document.getElementById("shopping-cart").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(function (item, index) {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    ₹${item.price} each
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    type="button"
                    onclick="decreaseQuantity(${index})">

                    −

                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    type="button"
                    onclick="increaseQuantity(${index})">

                    +

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent = `₹${totalPrice}`;

}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity++;

    updateCart();

}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ========================================
// MOBILE MENU
// ========================================

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });


    const links =
        navLinks.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

        });

    });

}


// ========================================
// CHECKOUT ELEMENTS
// ========================================

const checkoutButton =
    document.getElementById("checkout-button");

const checkoutSection =
    document.getElementById("checkout-section");

const checkoutForm =
    document.getElementById("checkout-form");


const customerName =
    document.getElementById("customer-name");

const customerPhone =
    document.getElementById("customer-phone");

const customerAddress =
    document.getElementById("customer-address");

const paymentMethod =
    document.getElementById("payment-method");


const orderMessage =
    document.getElementById("order-message");


// ========================================
// OPEN CHECKOUT
// ========================================

checkoutButton.addEventListener("click", function () {

    // Check if cart is empty

    if (cart.length === 0) {

        alert("Your cart is empty! Please add something first. ☕");

        return;

    }


    // Clear previous confirmation

    orderMessage.innerHTML = "";


    // Show checkout

    checkoutSection.style.display = "block";

    checkoutForm.style.display = "flex";


    // Scroll to checkout

    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// PLACE ORDER
// ========================================

checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // ========================================
    // GET CUSTOMER INFORMATION
    // ========================================

    const name =
        customerName.value.trim();

    const phone =
        customerPhone.value.trim();

    const address =
        customerAddress.value.trim();

    const payment =
        paymentMethod.value;


    // ========================================
    // VALIDATION
    // ========================================

    if (name === "") {

        alert("Please enter your name.");

        customerName.focus();

        return;

    }


    if (phone === "") {

        alert("Please enter your phone number.");

        customerPhone.focus();

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        customerPhone.focus();

        return;

    }


    if (address === "") {

        alert("Please enter your delivery address.");

        customerAddress.focus();

        return;

    }


    if (payment === "") {

        alert("Please select a payment method.");

        paymentMethod.focus();

        return;

    }


    // ========================================
    // CALCULATE ORDER
    // ========================================

    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(function (item) {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;

    });


    // ========================================
    // CREATE ORDER CONFIRMATION
    // ========================================

    orderMessage.innerHTML = `

        <div class="order-success">

            <h3>
                🎉 Order Placed Successfully!
            </h3>


            <p>
                Thank you, ${name}! ☕
            </p>


            <p>
                <strong>Items:</strong>
                ${totalItems}
            </p>


            <p>
                <strong>Total:</strong>
                ₹${totalPrice}
            </p>


            <p>
                <strong>Payment:</strong>
                ${payment}
            </p>


            <p>
                <strong>Delivery Address:</strong><br>
                ${address}
            </p>


            <p>
                Your order will be prepared shortly. ❤️
            </p>


            <button
                type="button"
                class="new-order-button"
                onclick="startNewOrder()">

                ☕ Start New Order

            </button>

        </div>

    `;


    // ========================================
    // CLEAR CART
    // ========================================

    cart.length = 0;

    updateCart();


    // Clear form

    checkoutForm.reset();


    // Hide checkout form

    checkoutForm.style.display = "none";


    // Keep checkout section visible
    // because confirmation is inside it

    checkoutSection.style.display = "block";


    // Scroll to confirmation

    orderMessage.scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// START NEW ORDER
// ========================================

function startNewOrder() {
    // Clear the previous order confirmation
    orderMessage.innerHTML = "";

    // Reset checkout form fields
    checkoutForm.reset();

    // Show the checkout form again
    checkoutForm.style.display = "flex";

    // Hide checkout until the customer clicks Checkout
    checkoutSection.style.display = "none";

    // Scroll back to the coffee menu
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}
// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // ========================================
    // VALIDATION
    // ========================================

    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    if (message === "") {

        alert("Please enter your message.");

        return;

    }


    // ========================================
    // SUCCESS
    // ========================================

    formMessage.textContent =
        "Thank you! Your message has been sent. ☕";

    formMessage.className =
        "form-success";


    contactForm.reset();

});


// ========================================
// INITIAL CART
// ========================================

updateCart();