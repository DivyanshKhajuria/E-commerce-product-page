'use strict';

const menu = document.querySelector('.menu');
const mainImg = document.querySelectorAll('.main-img');
const next = document.querySelectorAll('.next');
const previous = document.querySelectorAll('.previous');
const cart = document.querySelector('.cart');
const thumbs = document.querySelectorAll('.thumbs');
const lightbox = document.querySelector('.lightbox');
const closeBox = document.querySelector('.close-box');
const amount = document.querySelector('.amount');
const counter = document.querySelector('.counter');
const addItem = document.querySelector('.add-item');
const emptyCart = document.querySelector('.cart-empty');

let count = 0;
let total = 0;
let itemsNo;

// ----------------------------------------------toggle-navbar
menu.addEventListener('click', (e) => {
    const nav = e.target.parentElement;
    if (nav.getAttribute('aria-expanded') === 'false') {
        nav.setAttribute('aria-expanded', 'true');
    } else {
        nav.setAttribute('aria-expanded', 'false');
    }
});

// ----------------------------------------------navigate-between-imgs/thumbs
const prev = function(a) {
    const img = mainImg[a].getAttribute('src');
    for (let j = 0; j < 2; j++) {
        for (let i = 1; i < 5; i++) {
            if (i > 1) {
                if (img.indexOf(i) > 0) {
                    mainImg[j].setAttribute('src', img.replace(`${i}`, `${i - 1}`));
                    thumbs[j].children[i - 2].classList.add('active');
                } else {
                    if (thumbs[j].children[i - 2].getAttribute('class')) {
                        thumbs[j].children[i - 2].classList.remove('active');
                    }
                }
            } else {
                if (img.indexOf(i) > 0) {
                    mainImg[j].setAttribute('src', img.replace(`${i}`, '4'));
                    thumbs[j].children[3].classList.add('active');
                } else {
                    if (thumbs[j].children[3].getAttribute('class')) {
                        thumbs[j].children[3].classList.remove('active');
                    }
                }
            }
        }
    }
};

const nex = function(a) {
    const img = mainImg[a].getAttribute('src');
    for (let j = 0; j < 2; j++) {
        for (let i = 1; i < 5; i++) {
            if (i < 4) {
                if (img.indexOf(i) > 0) {
                    mainImg[j].setAttribute('src', img.replace(`${i}`, `${i + 1}`));
                    thumbs[j].children[i].classList.add('active');
                } else {
                    if (thumbs[j].children[i].getAttribute('class')) {
                        thumbs[j].children[i].classList.remove('active');
                    }
                }
            } else {
                if (img.indexOf(i) > 0) {
                    mainImg[j].setAttribute('src', img.replace(`${i}`, '1'));
                    thumbs[j].children[0].classList.add('active');
                } else {
                    if (thumbs[j].children[0].getAttribute('class')) {
                        thumbs[j].children[0].classList.remove('active');
                    }
                }
            }
        }
    }
};

const activeThumb = function() {
    for (let j = 0; j < 2; j++) {
        for (let i = 1; i < 5; i++) {
            if (mainImg[1].getAttribute('src').indexOf(i) > 0) {
                thumbs[j].children[i - 1].classList.add('active');
            } else if (thumbs[j].children[i - 1].getAttribute('class')) {
                thumbs[j].children[i - 1].classList.remove('active');
            }
        }
    }
};

previous[0].addEventListener('click', () => {
    prev(0);
});
previous[1].addEventListener('click', () => {
    prev(1);
    activeThumb();
});
next[0].addEventListener('click', () => {
    nex(0);
});
next[1].addEventListener('click', () => {
    nex(1);
    activeThumb();
});
// --------control-by-thumbs
const thumbListener = function(e) {
    const tag = e.target.tagName;
    let img = e.target.getAttribute('src');
    if (tag === 'IMG') {
        for (let j = 0; j < 2; j++) {
            for (let i = 1; i < 5; i++) {
                if (img.indexOf(i) > 0) {
                    img = img.replace(`${i}-thumbnail`, i);
                    mainImg[j].setAttribute('src', img);
                    thumbs[j].children[i - 1].classList.add('active');
                } else if (thumbs[j].children[i - 1].getAttribute('class')) {
                    thumbs[j].children[i - 1].classList.remove('active');
                }
            }
        }
    }
};
thumbs[0].addEventListener('click', (e) => {
    thumbListener(e);
});
thumbs[1].addEventListener('click', (e) => {
    thumbListener(e);
});

mainImg[0].addEventListener('click', () => {
    lightbox.classList.add('active');
});

closeBox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// ----------------------------------------------toggle-cart/remove-item
cart.addEventListener('click', (e) => {
    const tag = e.target.tagName;
    const removeItem = e.target.getAttribute('class');
    if (tag === 'svg' || tag === 'path') {
        const details = cart.children[0];
        details.classList.toggle('active');
    } else if (removeItem && removeItem === 'remove') {
        console.log(cart.children[0]);
        e.target.parentElement.remove();
        total--;
        cart.children[2].textContent = total;
        if (!total) {
            emptyCart.textContent = 'Your cart is empty.';
            cart.children[2].remove();
        }
    }
});

amount.addEventListener('click', (e) => {
    const sign = e.target.getAttribute('class');
    if (sign && sign.indexOf('plus') > -1) {
        count++;
        counter.textContent = count;
    } else if (sign && sign.indexOf('minus') > -1) {
        if (count > 0) {
            count--;
            counter.textContent = count;
        } else {
            count = 0;
        }
    }
});
// ----------------------------------------------------add-item-to-cart
addItem.addEventListener('click', () => {
    if (count) {
        if (!total) {
            emptyCart.textContent = '';
        }
        const item = document.createElement('div');
        emptyCart.prepend(item);
        const itemImg = document.createElement('img');
        itemImg.src = './images/image-product-1-thumbnail.jpg';
        const itemName = document.createElement('p');
        itemName.innerHTML = `Fall Limited Edition Sneakers <br> $125.00 x ${count} <span>$${
      count * 125
    }.00</span>`;
        const itemRemove = document.createElement('img');
        itemRemove.src = './images/icon-delete.svg';
        itemRemove.setAttribute('class', 'remove');
        item.append(itemImg);
        item.append(itemName);
        item.append(itemRemove);
        if (!total) {
            const checkout = document.createElement('button');
            checkout.textContent = 'Checkout';
            emptyCart.append(checkout);
            itemsNo = document.createElement('div');
            itemsNo.setAttribute('class', 'item-count');
            cart.append(itemsNo);
        }
        total++;
        itemsNo.textContent = total;
        count = 0;
        counter.textContent = count;
    }
});