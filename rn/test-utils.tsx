import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './redux/reducers';
import { PaginateHookData } from './hooks';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

//mock redux store cofig for dispathing action 
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
export const returnWithStore = (args?: any) =>  mockStore(args);

//testing libriary config for returning render with redux
export function renderWithRedux(
    component: React.ReactNode,
    initialState?: any,
    {
      store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    } = {}
  ) {
    return {
      ...render(<Provider store={store}>{component}</Provider>),
      store,
    };
  }
  
  //function for passing props to components with react navigation
  export const createTestProps =<T extends {}> (props: T) => ({
    navigation: {
      navigate: jest.fn(),
      setOptions: jest.fn(), 
      addListener: jest.fn()
    },
    route: {
      params: {}
    },
    ...props,
  });

//mock data used in tests
export const mockRental = {
  id: '1',
  name: 'test',
  full_day_price: '10',
  half_day_price: '5',
  category: 'test',
  region: 'test',
  description: 'test',
  ownerImage: 'test',
  displayName: 'test',
  delivery: 'test',
  image: 'test',
  instructions: 'test', 
  confirmation_required: 'test',
  ownerUid: 'e9e9e9er', 
  expoToken: 'ajdjdudnfififh',
  g: { geopoint: { U: 1, k: 2 }}
};

export const mockPaginateHookReturn: PaginateHookData = {
  rentals: [mockRental], 
  loadMore: jest.fn, 
  resetLoad: jest.fn, 
  loading: false, 
  reloading: false, 
  error: null, 
  hasMore: true, 
}


