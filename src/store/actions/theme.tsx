import {theme} from '../../types/store/store';
import useStore from '../store';

const themeActions: theme = {
  theme: 'dark',
  setTheme: (changedTheme: 'dark' | 'light') => {
    useStore.setState({theme: changedTheme});
  },
};
export default themeActions;
