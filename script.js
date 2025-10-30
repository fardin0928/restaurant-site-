// ==========================
// SHOPPING CART FUNCTIONALITY
// ==========================

const cart = [];
const cartContainer = document.createElement("div");
cartContainer.classList.add("cart-sidebar");
document.body.appendChild(cartContainer);

function renderCart() {
  cartContainer.innerHTML = `
    <div class="cart-header">
      <h3>🛒 Your Cart</h3>
      <button id="clear-cart" class="btn small">Clear</button>
    </div>
    <ul class="cart-items">
      ${cart.length === 0 ? "<li class='empty'>Cart is empty</li>" :
        cart.map((item, index) => `
          <li>
            <span>${item.name} (${item.qty})</span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">✕</button>
          </li>`).join("")}
    </ul>
    <div class="cart-total">
      <strong>Total:</strong> $${cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}
    </div>
  `;

  // Event listeners for buttons
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    });
  });

  const clearBtn = document.querySelector("#clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart.length = 0;
      renderCart();
    });
  }
}

document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const name = card.querySelector("h3").innerText;
    const price = parseFloat(card.querySelector(".price").dataset.price);

    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    renderCart();
  });
});

// Initial render
renderCart();
