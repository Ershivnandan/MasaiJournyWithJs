let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
let wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];

const CardGrid = document.getElementById("CardGrid");

const sampleData = async () => {
  let data = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return data;
};

let productData = null;
let cartLength = cartItem.length;

sampleData().then((data) => {
  productData = data;
  displayData(data);
});

function removeItemFromCart(cartItemId) {
  cartItem.splice(cartItemId, 1);
  updateCart();
  cartLength = cartItem.length;
  displayData(productData);
}

function toggleWishListItem(index) {
  let itemIndex = wishlistItem.findIndex((item) => item.ItemId === index);

  if (itemIndex === -1) {
    let res = {
      ItemId: index,
    };
    wishlistItem.push(res);
  } else {
    wishlistItem.splice(itemIndex, 1);
  }

  updateWishList();
}

function increaseQuantity(index) {
  cartItem[index].qty += 1;
  updateCart();
  displayData(productData);
}

function decreaseQuantity(index) {
  cartItem[index].qty -= 1;

  if (cartItem[index].qty <= 0) {
    removeItemFromCart(index);
    return;
  }
  updateCart();
  displayData(productData);
}

function updateWishList() {
  localStorage.setItem("wishlistItem", JSON.stringify(wishlistItem));
}

function updateCart() {
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
}

function displayData(data) {
  const CardGrid = document.getElementById("CardGrid");
  const cartSize = document.getElementById("cartSize");
  CardGrid.innerHTML = "";

  cartSize.innerHTML = "";
  cartSize.innerHTML = cartLength;

  // yaha par filter apply karenge on the baises of cart ka id key and api ke id
  let filteredData = data.filter((user) => {
    return cartItem.some((cartItem) => cartItem.ItemId === user.id - 1);
  });

  filteredData.forEach((product, index) => {
    const card = document.createElement("div");
    card.className =
      "rounded-lg flex lg:flex-row flex-col gap-5 border border-gray-700 bg-gray-800 p-6 shadow-sm";
    card.id = `card-${index + 1}`;

    let matchingCartItem = cartItem.find((cart) => cart.ItemId === product.id);
    let quantity = matchingCartItem ? matchingCartItem.qty : 1;

    const { rate, count } = product.rating;

    let fullStars = Math.floor(rate);
    let halfStar = rate % 1 >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStar;
    let starsHTML = "";

    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<i class="text-yellow-500 fa-solid fa-star"></i>`;
    }

    if (halfStar) {
      starsHTML += `<i class="text-yellow-500 fa-solid fa-star-half-alt"></i>`;
    }

    for (let i = 0; i < emptyStars; i++) {
      starsHTML += `<i class="text-yellow-500 fa-regular fa-star"></i>`;
    }

    const cartBtnID = `addTocart-${index + 1}`;
    const randomNumber = Math.floor(Math.random() * 4 + 1);
    const wishListBtnId = `addToWishlist-${index + 1}`;

    const increaseQtyId = `increaseBtn-${index + 1}`;
    const decreaseQtyId = `decrease-${index + 1}`;

    card.innerHTML = `      
            <div class="h-56 lg:w-[30%]">
              <a href="#">
                <img
                  class="mx-auto h-full"
                  src="${product.image}"
                  alt="product image"
                />
              </a>
            </div>

            <div class="pt-6 lg:w-[50%]">
              <div class="mb-4 flex items-center justify-between gap-4">
                <span
                  class="me-2 bg-blue-600 rounded px-2.5 py-0.5 text-xs font-medium text-white"
                >
                 ${product.category}
                </span>

                <div class="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    id="${wishListBtnId}"
                    data-tooltip-target="tooltip-add-to-favorites"
                    class="rounded-lg p-2 text-gray-500 hover:scale-150 duration-300"
                  >
                    <i
                      class="fa-solid fa-heart hidden text-red-500"
                      aria-hidden="true"
                    ></i>
                    <i class="fa-regular fa-heart" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <a
                href="#"
                class="text-lg font-semibold leading-tight text-gray-100 hover:underline text-white overflow-hidden"
                >${product.title}
              </a>

              <p
                class="text-gray-400 overflow-hidden text-ellipsis whitespace-normal line-clamp-2"
              >
                ${product.description}
              </p>

              <div class="mt-4 flex items-center justify-between gap-4">
                <p
                  class="text-2xl font-extrabold leading-tight text-gray-100 text-white"
                >
                 ${product.price}
                </p>
              </div>
              <ul class="mt-1 flex justify-between items-center gap-4">
                <li class="flex items-center gap-2">
                  <p
                    class="text-sm font-bold leading-tight text-gray-100 text-white w-24 overflow-hidden line-through"
                  >
                    ₹${product.price * randomNumber}
                  </p>
                </li>
                <li class="flex items-center gap-2">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      ${starsHTML}
                    </div>

                    <p class="text-sm font-medium text-gray-100 text-white">
                       ${rate.toFixed(1)}
                    </p>
                    <p
                      class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      (${count})
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="px-5 mx-auto my-0 relative flex gap-5 flex-col justify-center lg:w-[20%] w-[70%] ">
              <button
                type="button"
                id="${cartBtnID}"
                class="inline-flex justify-center gap-2 items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white border border-gray-200 bg-red-800"
              >
                <i class="fa-solid fa-cart-arrow-down" aria-hidden="true"></i>
                Remove
              </button>

              <div class="flex flex-col gap-2">
                <div class="text-gray-100 text-center">
                  <p>Quantity</p>
                </div>
                <div
                  class="flex items-center justify-between space-x-4 border border-gray-200 rounded-lg"
                >
                  <button
                    id="${decreaseQtyId}"
                    class="bg-gray-200 text-gray-900 font-bold text-md px-2 py-1 rounded"
                  >
                    -
                  </button>

                  <span class="text-lg font-semibold text-gray-100 cursor-default">${quantity}</span>

                  <button
                    id="${increaseQtyId}"
                    class="bg-gray-200 text-gray-900 font-bold text-md px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            `;

    CardGrid.appendChild(card);

    document.getElementById(cartBtnID).addEventListener("click", () => {
      removeItemFromCart(index);
    });

    let wishlistBtn = document.getElementById(wishListBtnId);

    wishlistBtn.addEventListener("click", () => {
      const solidHeart = wishlistBtn.querySelector(".fa-solid");
      const regularHeart = wishlistBtn.querySelector(".fa-regular");

      solidHeart.classList.toggle("hidden");
      regularHeart.classList.toggle("hidden");

      toggleWishListItem(index);
    });

    let increaseQtyBtn = document.getElementById(increaseQtyId);
    let decreaseQtyBtn = document.getElementById(decreaseQtyId);

    increaseQtyBtn.addEventListener("click", () => {
      increaseQuantity(product.id);
    });
    decreaseQtyBtn.addEventListener("click", () => {
      decreaseQuantity(product.id);
    });
  });
}
