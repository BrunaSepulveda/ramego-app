import { useAppStateStorage } from './store';
import { BrothProtein } from './types';

type ChangeColorsButtonsParams = {
  container: HTMLElement;
  elementIdName: string;
};

function changeColorsButtons({
  container,
  elementIdName,
}: ChangeColorsButtonsParams) {
  const store = useAppStateStorage();
  const id =
    store[`${elementIdName.replace(/\w$/, () => '')}Id` as keyof typeof store];
  const buttons = container.querySelectorAll('button');
  const buttonSelectedId = `button-${elementIdName}-${id}`;
  const elementsSave = (
    store[elementIdName as keyof typeof store] as BrothProtein[]
  );

  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    const name = btn.getElementsByClassName('option-name')[0];
    const description = btn.getElementsByClassName('option-description')[0];
    const price = btn.getElementsByClassName('option-price')[0];
    const img = btn.querySelectorAll('img')[0]
    const currentElementSave = elementsSave.find(el =>  el.id === btn.id.replace(`button-${elementIdName}-`, ''))

    if (btn.id === buttonSelectedId) {
      btn.style.backgroundColor = '#1820EF';
      if (name) (name as HTMLSpanElement).style.color = '#ffffff';
      if (description) (description as HTMLSpanElement).style.color = '#ffffff';
      if (price) (price as HTMLSpanElement).style.color = '#FFC024';
      if(img && currentElementSave) img.src = currentElementSave.imageActive;
    } else {
      btn.style.backgroundColor = '';
      if (name) (name as HTMLSpanElement).style.color = '#000000';
      if (description) (description as HTMLSpanElement).style.color = '#000000';
      if (price) (price as HTMLSpanElement).style.color = '#ff4e42';
      if(img && currentElementSave) img.src = currentElementSave.imageInactive;
    }
  });
}

function onClickButton(elementIdName: string, idValue: string) {
  const store = useAppStateStorage();

  const functionName = `change${elementIdName
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\w$/, () => '')}Id`;

  const changeFunction = store[functionName as keyof typeof store];

  if (!changeFunction || typeof changeFunction !== 'function') return;

  (changeFunction as (id: string) => void)(idValue);

  const container = document.getElementById(elementIdName);

  if (!container) return;

  changeColorsButtons({ container, elementIdName });
}

type CreateSelectButtonsParams = {
  list: BrothProtein[];
  id: string;
  title: string;
  description: string;
};

export function createSelectButtons({
  description,
  id,
  list,
  title,
}: CreateSelectButtonsParams) {
  const container = document.getElementById(id);
  const selectContainer = document.getElementById(`container-${id}`);

  if (!container || !selectContainer) return;

  const spanTitle = document.createElement('span');
  const spanDescription = document.createElement('span');

  spanTitle.setAttribute('class', 'select-container-title');
  spanDescription.setAttribute('class', 'select-container-description');

  spanTitle.innerText = title;
  spanDescription.innerText = description;

  list.forEach((element) => {
    const button = document.createElement('button');
    const img = document.createElement('img');
    const spanName = document.createElement('span');
    const spanDescription = document.createElement('span');
    const spanPrice = document.createElement('span');

    button.onclick = () => onClickButton(id, element.id);
    button.setAttribute('id', `button-${id}-${element.id}`);
    img.setAttribute('src', element.imageInactive);
    spanName.setAttribute('class', 'option-name');
    spanDescription.setAttribute('class', 'option-description');
    spanPrice.setAttribute('class', 'option-price');

    spanName.innerText = element.name;
    spanDescription.innerText = element.description;
    spanPrice.innerText = `US$ ${element.price}`;

    button.appendChild(img);
    button.appendChild(spanName);
    button.appendChild(spanDescription);
    button.appendChild(spanPrice);
    container.appendChild(button);
  });

  selectContainer.appendChild(spanTitle);
  selectContainer.appendChild(spanDescription);
  selectContainer.appendChild(container);
}
