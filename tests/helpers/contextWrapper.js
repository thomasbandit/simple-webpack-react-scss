import { configure, shallow } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';

configure({ adapter: new ReactSixteenAdapter() });

// @see https://github.com/airbnb/enzyme/issues/1112
// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
});

export function mountWrap(node) {
  return mount(node, createContext());
}

export function shallowWrap(node) {
  return shallow(node, createContext());
}
