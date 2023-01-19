'use strict';

/писал дого

const ggg = document.querySelector('.cartIconWrap span');;
const basket_hiden = document.querySelector('.basketTotal');
const basketTotal = document.querySelector('.basketTotalValue');
const basket = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basket.classList.toggle('hidden');
});

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
    return;
  }
  
  const featuredItemEl = event.target.closest('.featuredItem');
  const id = +featuredItemEl.dataset.id;
  const name = featuredItemEl.dataset.name;
  const price = +featuredItemEl.dataset.price
addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
    basket[id] = {id: id, name: name, price: price, count: 0};
  }
  
  basket[id].count++;
  // Ставим новое количество добавленных товаров у значка корзины.
  ggg.textContent = getTotalBasketCount().toString();
  // Ставим новую общую стоимость товаров в корзине.
  basketTotal.textContent = getTotalBasketPrice().toFixed(2);
  // Отрисовываем продукт с данным id.
  renderProductInBasket(id);
}


function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}


function getTotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}


function renderProductInBasket(productId) {
  // Получаем строку в корзине, которая отвечает за данный продукт.
  const basketRowEl = basket
    .querySelector(`.basketRow[data-id="${productId}"]`);
  // Если такой строки нет, то отрисовываем новую строку.
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }

  // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
  // добавленных продуктах.
  const product = basket[productId];
  // Ставим новое количество в строке продукта корзины.
  basketRowEl.querySelector('.productCount').textContent = product.count;
  // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}


function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basket_hiden.insertAdjacentHTML("beforebegin", productRow);
}



