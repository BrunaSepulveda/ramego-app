import { createOrder } from './service';
import { useAppStateStorage } from './store';
import { Order } from './types';

function createContainerLeft(order: Order) {
  const img = document.createElement('img');
  const containerLeft = document.getElementById('container-left');
  const spanTitle = document.createElement('span');
  const spanDescription = document.createElement('span');

  img.src = order.image;

  spanTitle.innerText = 'Your Order:';
  spanTitle.className = 'span-order-title';

  spanDescription.innerText = order.description;
  spanDescription.className = 'span-order-description';

  containerLeft?.appendChild(img);
  containerLeft?.appendChild(spanTitle);
  containerLeft?.appendChild(spanDescription);
}

function createContainerRight() {
  const img = document.createElement('img');
  const containerRight = document.getElementById('container-right');
  const spanTextYellow = document.createElement('span');
  const spanTextRed = document.createElement('span');
  const spanTextBlack = document.createElement('span');
  const button = document.createElement('button');
  const buttonImg = document.createElement('img');

  img.src = './public/bowing.svg';
  img.style.width = '65.46px';
  img.style.height = '71.31px';
  img.style.marginBottom = '18px';

  spanTextYellow.innerText = 'どもありがとうございます。';
  spanTextYellow.className = 'span-order-title';
  spanTextYellow.style.color = '#ffc024';
  spanTextYellow.style.marginBottom = '15px';

  spanTextRed.innerText = 'Your order is being prepared';
  spanTextRed.className = 'span-order-description';
  spanTextRed.style.color = '#ff4e42';

  spanTextBlack.innerText =
    'Hold on, when you least expect you will be eating your rámen.';
  spanTextBlack.className = 'span-text-black';

  button.innerText = 'PLACE MY ORDER';
  button.className = 'button-style-base button-place-order';
  button.style.backgroundColor = '#1820ef';
  button.style.margin = '32px';

  buttonImg.src = './public/Fill 1.svg';
  button.appendChild(buttonImg);
  button.onclick = () => (window.location.href = '/');

  containerRight?.appendChild(img);
  containerRight?.appendChild(spanTextYellow);
  containerRight?.appendChild(spanTextRed);
  containerRight?.appendChild(spanTextBlack);
  containerRight?.appendChild(button);
}

window.addEventListener('DOMContentLoaded', () => {
  const { brothId, proteinId } = useAppStateStorage();

  createOrder(brothId, proteinId).then((order) => {
    createContainerLeft(order);
    createContainerRight();
  });
});
