let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
let wishlistItem = JSON.parse(localStorage.getItem("wishlistItem")) || [];

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

function AddItemToCart(index) {
  let item = cartItem.find((item) => item.ItemId === index);

  if (item) {
    item.qty++;
  } else {
    let res = {
      ItemId: index,
      qty: 1,
    };
    cartItem.push(res);
    cartLength = cartItem.length;
    displayData(productData);
  }
  updateCart();
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

  data.forEach((product, index) => {
    const card = document.createElement("div");
    card.className =
      "rounded-lg border border-gray-200 bg-gray-800 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800";
    card.id = `card-${index + 1}`;

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
    card.innerHTML = ` 
              <div class="h-56 w-full">
                <a href="#">
                  <img
                    class="mx-auto h-full"
                    src="${product.image}"
                    alt="product image"
                  />
                </a>
              </div>
              <div class="pt-6">
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
                      <i class="fa-solid fa-heart hidden  text-red-500"></i>
                      <i class="fa-regular fa-heart"></i>
                    </button>
                  </div>
                </div>
  
                <a
                  href="#"
                  class="text-lg font-semibold leading-tight text-gray-100 hover:underline text-white overflow-hidden"
                  >${product.title}</a
                >
  
                <p
                  class="text-gray-400 overflow-hidden text-ellipsis whitespace-normal line-clamp-2"
                >
                 ${product.description}
                </p>
  
                <div class="mt-4 flex items-center justify-between gap-4">
                  <p
                    class="text-2xl font-extrabold leading-tight text-gray-100 text-white"
                  >
                    ₹${product.price}
                  </p>
  
                  <button
                    type="button"
                    id="${cartBtnID}"
                    class="inline-flex gap-2 items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <i class="fa-solid fa-cart-arrow-down"></i>
                    Add to cart
                  </button>
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
  
                      <p
                        class="text-sm font-medium text-gray-100 text-white"
                      >
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
            
          `;

    CardGrid.appendChild(card);

    document.getElementById(cartBtnID).addEventListener("click", () => {
      AddItemToCart(index);
    });

    let wishlistBtn = document.getElementById(wishListBtnId);

    wishlistBtn.addEventListener("click", () => {
      const solidHeart = wishlistBtn.querySelector(".fa-solid");
      const regularHeart = wishlistBtn.querySelector(".fa-regular");

      solidHeart.classList.toggle("hidden");
      regularHeart.classList.toggle("hidden");

      toggleWishListItem(index);
    });
  });
}
