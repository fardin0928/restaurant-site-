// ==========================================
// SHOPPING CART FUNCTIONALITY WITH TOGGLE
// ==========================================

// Create cart container (hidden by default)
const cart = [];
const cartContainer = document.createElement("div");
cartContainer.classList.add("cart-sidebar", "hidden");
document.body.appendChild(cartContainer);

// Cart toggle button (🛒 in navbar)
const cartToggle = document.getElementById("cart-toggle");
cartToggle.addEventListener("click", (e) => {
  e.preventDefault();
  cartContainer.classList.toggle("show");
  cartContainer.classList.toggle("hidden");
});


// ===========================
// Render Cart Function
// ===========================
function renderCart() {
  // Generate cart HTML
  cartContainer.innerHTML = `
    <div class="cart-header">
      <h3>🛒 Your Cart</h3>
      <button id="clear-cart" class="btn small">Clear</button>
    </div>
    <ul class="cart-items">
      ${
        cart.length === 0
          ? "<li class='empty'>Cart is empty</li>"
          : cart
              .map(
                (item, index) => `
          <li>
            <span>${item.name} (${item.qty})</span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">✕</button>
          </li>`
              )
              .join("")
      }
    </ul>
    <div class="cart-total">
      <strong>Total:</strong> $${cart
        .reduce((sum, i) => sum + i.price * i.qty, 0)
        .toFixed(2)}
    </div>
  `;

  // Attach remove buttons
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    });
  });

  // Clear cart
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart.length = 0;
      renderCart();
    });
  }
}

// ===========================
// Add to Cart Buttons
// ===========================
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const name = card.querySelector("h3").innerText;
    const price = parseFloat(card.querySelector(".price").dataset.price);

    // Check if item exists
    const existing = cart.find((i) => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    renderCart();

    // Auto-open cart when item added
    cartContainer.classList.remove("hidden");

    // Optional: scroll to the bottom of the cart when a new item is added
    cartContainer.scrollTop = cartContainer.scrollHeight;
  });
});

// Initial render (empty cart)
renderCart();
