const fatherOfItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const buttonClearCart = document.querySelector('.empty-cart');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const replaceImgForHD = image.replace('-I.jpg', '-J.jpg');

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(replaceImgForHD));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const renderProducts = async () => {
  const products = await fetchProducts('computador');
  const arrProducts = products.results;
  arrProducts.forEach((product) => fatherOfItems.appendChild(createProductItemElement(product)));
};

const itemToCart = async (event) => {
  const idTarget = event.target.parentNode.firstChild.innerText;
  const info = await fetchItem(idTarget);
  cartItems.appendChild(createCartItemElement(info));
  saveCartItems(cartItems.innerHTML); 
};

const itemAppearsOnScreen = async () => {
  await renderProducts();
  const buttonItem = document.getElementsByClassName('item__add');
  Array.from(buttonItem).forEach((item) => item.addEventListener('click', itemToCart));
};

const clearCartItems = () => {
  cartItems.innerText = '';
  localStorage.removeItem('cartItems');
};
buttonClearCart.addEventListener('click', clearCartItems);

const alsoRemoveStoragedItemOnClick = () => {
  cartItems.innerHTML = getSavedCartItems();
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const textLoading = async () => {
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerText = 'Carregando...';
  fatherOfItems.appendChild(div);
  await itemAppearsOnScreen();
  fatherOfItems.removeChild(div);
};

window.onload = () => {
  textLoading();
  getSavedCartItems();
  alsoRemoveStoragedItemOnClick();
};
