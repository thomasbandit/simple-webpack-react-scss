import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import Home from '../Home';
import {
  ErrorMessage,
  Preloader,
} from '../../components';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({ adapter: new ReactSixteenAdapter() });

describe('Home Component', () => {
  it('displays the preloader component if the loading prop is true', () => {
    const initialState = {
      users: {
        error: false,
        loading: true,
        users: [],
      },
    };

    // As we're using redux connect remember to dive()
    const home = shallow(<Home store={mockStore(initialState)} />).dive(); // eslint-disable-line react/jsx-filename-extension

    expect(home.find(Preloader).length).toBe(1);
  });

  it('displays the error component if the error prop is true', () => {
    const initialState = {
      users: {
        error: true,
        loading: false,
        users: [],
      },
    };

    const home = shallow(<Home store={mockStore(initialState)} />).dive(); // eslint-disable-line react/jsx-filename-extension

    expect(home.find(ErrorMessage).length).toBe(1);
  });
});
