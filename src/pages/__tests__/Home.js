import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Home } from '../Home';
import { mountWrap, shallowWrap } from '../../../tests/helpers/contextWrapper';
import {
  ErrorMessage,
  Preloader,
} from '../../components';

describe('Home Component', () => {
  it('displays the preloader component if the loading prop is true', () => {
    const initialState = {
      users: {
        error: false,
        loading: true,
        users: [],
      },
    };

    const wrappedShallow = () => shallowWrap(<Home error={false} loading={true} users={[]} loadUsers={jest.fn()} />);
    const wrapper = wrappedShallow();

    expect(wrapper.find(Preloader).length).toBe(1);
  });

  it('displays the error component if the error prop is true', () => {
    const initialState = {
      users: {
        error: true,
        loading: false,
        users: [],
      },
    };

    const wrappedShallow = () => shallowWrap(<Home error={true} loading={false} users={[]} loadUsers={jest.fn()} />);
    const wrapper = wrappedShallow();
    expect(wrapper.find(ErrorMessage).length).toBe(1);
  });
});
