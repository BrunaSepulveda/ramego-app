import { createSelectButtons } from './createButtonFunctions';
import { requestSaveProteinsAndBroths } from './service';
import { useAppStateStorage } from './store';
import './style.css';

window.addEventListener('DOMContentLoaded', () => {
  const store = useAppStateStorage();

  requestSaveProteinsAndBroths()
    .then((value) => {
      store.changeBroths(value?.broths || []);
      store.changeProteins(value?.proteins || []);
    })
    .then(() => {
      const updatedStore = useAppStateStorage();
      const updatedBroths = updatedStore.broths;
      const updatedProteins = updatedStore.proteins;

      if (updatedBroths.length !== 0 && updatedProteins.length !== 0) {
        createSelectButtons({
          list: updatedBroths,
          id: 'broths',
          title: 'First things first: select your favorite broth.',
          description: 'It will give the whole flavor on your ramen soup.'
        });

        createSelectButtons({
          list: updatedProteins,
          id: 'proteins',
          title: 'It’s time to choose (or not) your meat!',
          description: 'Some people love, some don’t. We have options for all tastes.'
        });
      }
    });
});

document.querySelector<HTMLDivElement>('#app');
