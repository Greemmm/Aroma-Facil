// Get elements
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartModal = document.querySelector(".cart-modal");
const closeBtn = document.querySelector(".close-btn");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("totalPrice");
const checkoutButton = document.getElementById('checkoutButton');
const checkoutNotification = document.getElementById('checkout-notification');
const openInboxButton = document.getElementById("openInboxButton");
const inboxModal = document.getElementById("inboxModal");
const closeInboxButton = document.getElementById("closeInboxBtn");

// Initialize cart array
let cart = [];

// Ensure the modal is hidden initially
document.addEventListener('DOMContentLoaded', () => {
    cartModal.classList.remove("show");
});

// Function to update the cart modal
function updateCartModal() {
    cartItemsContainer.innerHTML = ''; // Clear the display
    let total = 0;

    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemElement = document.createElement("li");
        itemElement.textContent = `${item.name} - ₱${item.price}`;

        // Create a remove button for each item
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        itemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(itemElement);

        total += item.price;
    });

    // Update the total price
    totalPriceElement.textContent = total.toFixed(2);
}

// Function to add an item to the cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartModal();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartModal();
}

// Event delegation for remove buttons
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        event.stopPropagation(); // Prevent the click from closing the modal
        const index = Array.from(cartItemsContainer.children).indexOf(event.target.parentElement);
        removeFromCart(index);
    }
});

// Checkout button click event
checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        // Show notification
        checkoutNotification.textContent = 'Order Placed!';
        checkoutNotification.style.display = 'block';

        // Clear the cart items and reset total price
        cart = [];
        updateCartModal();

        // Hide the notification after 3 seconds
        setTimeout(() => {
            checkoutNotification.style.display = 'none';
        }, 3000);
    } else {
        alert('Add items in your cart first!');
    }
});

// Add item to cart when button is clicked
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productName = button.closest('.box').getAttribute("data-product");
        const productPrice = parseFloat(button.closest('.box').getAttribute("data-price"));
        addToCart(productName, productPrice);

        // Show notification
        const notification = document.getElementById("notification");
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 2000);
    });
});

// When the user clicks the cart icon, show the modal
document.getElementById("addToCartButton").addEventListener("click", function () {
    cartModal.classList.add("show");
});

// When the user clicks the close button, hide the modal
closeBtn.addEventListener("click", function () {
    cartModal.classList.remove("show");
});

// Close the modal if user clicks outside the sidebar
cartModal.addEventListener("click", (event) => {
    const cartSidebar = document.querySelector(".cart-sidebar");
    if (!cartSidebar.contains(event.target)) {
        cartModal.classList.remove("show");
    }
});

// Function to open the Inbox modal
openInboxButton.addEventListener("click", () => {
    inboxModal.classList.add("show");
});

// Function to close the Inbox modal
closeInboxButton.addEventListener("click", () => {
    inboxModal.classList.remove("show");
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === inboxModal) {
        inboxModal.classList.remove("show");
    }
});
