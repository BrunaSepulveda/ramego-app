import { createSelectButtons } from './createButtonFunctions';
import { requestSaveProteinsAndBroths } from './service';
import { useAppStateStorage } from './store';
import './style.css';

window.addEventListener('DOMContentLoaded', () => {
  const { changeBroths, changeProteins, broths, proteins } =
    useAppStateStorage();

  requestSaveProteinsAndBroths()
    .then((value) => {
      changeBroths(value?.broths || []);
      changeProteins(value?.proteins || []);
    })
    .then(() => {
      if (broths.length !== 0 && proteins.length !== 0) {
        createSelectButtons({
          list: broths,
          id: 'broths',
          title: 'First things first: select your favorite broth.',
          description: 'It will give the whole flavor on your ramen soup.'
        });

        createSelectButtons({
          list: proteins,
          id: 'proteins',
          title: 'It’s time to choose (or not) your meat!',
          description: 'Some people love, some don’t. We have options for all tastes.'
        });
      }
    });
});

document.querySelector<HTMLDivElement>('#app');
