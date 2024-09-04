import { BrothProtein } from './types';

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

    button.setAttribute('id', `button-broth-${element.id}`);
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
