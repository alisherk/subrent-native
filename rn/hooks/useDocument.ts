import { useReducer, useEffect, useRef } from 'react';
import { RentalModel } from 'types';
import type firebase from 'firebase';

enum ActionTypes {
  ON_FETCH = 'ON_FETCH',
  ON_ERROR = 'ON_ERROR',
  ON_LOAD = 'ON_LOAD',
  RELOAD = 'RELOAD',
}

type Status = 'loading' | 'loaded' | 'error' | null;

type State = {
  data: RentalModel | null;
  status: Status;
  error: string | null;
  stateUpdate: number;
};

type Action =
  | {
      type: ActionTypes.ON_FETCH;
      document: firebase.firestore.DocumentData;
    }
  | { type: ActionTypes.ON_ERROR; error: string | null }
  | { type: ActionTypes.ON_LOAD }
  | { type: ActionTypes.RELOAD };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.RELOAD:
      return {
        ...state,
        stateUpdate: state.stateUpdate + 1,
      };
    case ActionTypes.ON_LOAD:
      return {
        ...state,
        status: 'loading',
      };
    case ActionTypes.ON_FETCH:
      return {
        ...state,
        status: 'loaded',
        data: {
          id: action.document.id,
          ...action.document.data(),
        },
      };
    case ActionTypes.ON_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error',
      };
    default:
      return state;
  }
}

const initialState: State = {
  data: null,
  status: null,
  error: null,
  stateUpdate: 0,
};

type reload = () => void;

export type useDocumentHookData = [
  RentalModel | null,
  Status,
  string | null,
  reload
];

export const useDocument = (
  docRef: firebase.firestore.DocumentReference | null,
  deps: any[]
): useDocumentHookData => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef(docRef);

  const { data, status, error, stateUpdate } = state;

  const reload = (): void => dispatch({ type: ActionTypes.RELOAD });

  useEffect(() => {
    if (!ref.current) return;
    (async function fetchData() {
      try {
        dispatch({ type: ActionTypes.ON_LOAD });
          const document = await ref.current?.get();
          if (!document?.exists) {
            return dispatch({
              type: ActionTypes.ON_ERROR,
              error: 'Document is empty',
            });
          }
          dispatch({ type: ActionTypes.ON_FETCH, document });
      } catch (err) {
        dispatch({ type: ActionTypes.ON_ERROR, error: err.message });
      }
    })();
  
  }, [stateUpdate, ...deps]);

  return [data, status, error, reload];
};
