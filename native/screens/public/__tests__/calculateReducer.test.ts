import {
  renderHook,
  act,
  cleanup,
  HookResult,
} from '@testing-library/react-hooks';
import { Dispatch, useReducer } from 'react';
import { mockRental as rental } from '../../../test-utils';
import {
  reducer as calculateReducer,
  State,
  PriceChoices,
  ActionTypes,
  Action,
} from '..';

describe('calculate reducer', () => {
  afterAll(cleanup);
  const initialState: State = {
    total: 0,
    fromDate: new Date(new Date().setHours(0, 0, 0, 0)),
    toDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    loading: false,
    duration: 0,
    price_choice: PriceChoices.full_day_price,
  };

  let hookResult: HookResult<[State, Dispatch<Action>]>;
  beforeEach(() => {
    const { result } = renderHook(() =>
      useReducer(calculateReducer, initialState)
    );
    hookResult = result;
  });

  it('returns initial state', () => {
    const [state] = hookResult.current;
    expect(state).toEqual(initialState);
  });

  it('fires calculate action', () => {
    const [, dispatch] = hookResult.current;
    act(() => dispatch({ type: ActionTypes.CALCULATE, rental }));
    const [state] = hookResult.current;
    expect(state.total).toEqual(11.5);
    expect(state.duration).toEqual(1);
  });

  it('fires set date action', () => {
    const [, dispatch] = hookResult.current;
    const inTwoDays = new Date(new Date().setDate(new Date().getDate() + 2));
    act(() =>
      dispatch({
        type: ActionTypes.SET_DATE,
        dateType: 'toDate',
        value: inTwoDays,
      })
    );
    const [state] = hookResult.current;
    expect(state.toDate).toEqual(inTwoDays);
  });

  it('fires price change action', () => {
    const [, dispatch] = hookResult.current;
    act(() => dispatch({ type: ActionTypes.ON_PRICE_CHANGE, rental }));
    const [state] = hookResult.current;
    expect(state.price_choice).toBe(PriceChoices.half_day_price);
    expect(state.total).toEqual(5.75);
  });

  it('fires loading action', () => {
    const [, dispatch] = hookResult.current;
    act(() => dispatch({ type: ActionTypes.ON_LOAD, loading: true }));
    const [state] = hookResult.current;
    expect(state.loading).toEqual(true);
  });
});
