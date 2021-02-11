import { useReducer, useEffect, useRef } from 'react';
import { RentalModel } from 'models';

enum ActionTypes {
  INITIAL_LOAD = 'INITIAL_LOAD',
  LOAD_MORE = 'LOAD_MORE',
  ERROR = 'ERROR',
  RESET = 'RESET', 
  RELOADING = 'RELOADING'
}

type State = {
  hasMore: boolean;
  triggerEffect: firebase.firestore.DocumentData | null;
  limit: number;
  rentals: RentalModel[];
  lastLoaded: firebase.firestore.QueryDocumentSnapshot | null;
  loading: boolean;
  error: null | Error | string;
  hasMounted: boolean;
  reloading: boolean;
};

type Action =
    {
      type: ActionTypes.INITIAL_LOAD;
      snapshot: firebase.firestore.QuerySnapshot;
      limit: number;
    }
  | { type: ActionTypes.LOAD_MORE }
  | { type: ActionTypes.ERROR; error: string }
  | { type: ActionTypes.RESET }
  | { type: ActionTypes.RELOADING }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.INITIAL_LOAD: {
      const rentals = [...state.rentals];   
      if (action.snapshot) {
        action.snapshot.forEach((doc) => {
          if (doc.data) {
            const rental = doc.data() as Omit<RentalModel, 'id'> ;
            rentals.push({
              id: doc.id,
              ...rental, 
            });
          }
        });
      }

      const nextLimit = rentals.length + action.limit;
      const end = rentals.length < action.limit || nextLimit === state.limit;

      return {
        ...state,
        rentals,
        hasMore: !end,
        limit: nextLimit,
        loading: false,
        lastLoaded:
          action.snapshot.docs[action.snapshot.docs.length - 1] ||
          state.lastLoaded,
      };
    }

    case ActionTypes.LOAD_MORE: {
      if (state.hasMore) {
        return {
          ...state,
          triggerEffect: state.lastLoaded,
        };
      }
      return state;
    }
    case ActionTypes.ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
     case ActionTypes.RELOADING: 
      return {
          ...state, 
          reloading: true
      }
     case ActionTypes.RESET: 
      return {
          ...state, 
          reloading: false, 
          lastLoaded: null, 
          rentals: [],
          triggerEffect: null
      }
    default:
      return state;
  }
}

const initialState: State = {
  hasMore: false,
  triggerEffect: null,
  limit: 0,
  rentals: [],
  lastLoaded: null,
  loading: true,
  error: null,
  hasMounted: false,
  reloading: false
};

export type PaginateHookData = {
  loadMore: () => void;
  resetLoad: () => void;
  error: null | Error | string;
  loading: boolean;
  reloading: boolean;
  hasMore: boolean;
  rentals: RentalModel[];
};
export const usePaginateQuery = (
  query: firebase.firestore.Query,
  { limit = 1 } = {}
): PaginateHookData => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { lastLoaded, hasMore, triggerEffect, error, rentals, loading, reloading } = state;

  const persisted = useRef<firebase.firestore.Query>(query);
  const lastVisible = useRef<firebase.firestore.DocumentData | null>(lastLoaded);

  useEffect(() => {
    lastVisible.current = lastLoaded;
  }, [lastLoaded]);

  useEffect(() => {
    let isCancelled: boolean = false;
    async function getData(): Promise<void> {
      let query;
      lastVisible.current
        ? (query = persisted.current
            .startAfter(lastVisible.current)
            .limit(limit))
        : (query = persisted.current.limit(limit));
      try {
        const snapshot = await query.get();
        if (!isCancelled) {
          dispatch({ type: ActionTypes.INITIAL_LOAD, snapshot, limit });
        }
      } catch (err) {
        dispatch({ type: ActionTypes.ERROR, error: err.message });
      }
    }
    getData();
    return () => {
      isCancelled = true;
    };
  }, [triggerEffect, limit]);

  function loadMore() {
    dispatch({ type: ActionTypes.LOAD_MORE });
  }

  function resetLoad() {
      dispatch({ type: ActionTypes.RELOADING}); 
      dispatch({ type: ActionTypes.RESET })
  }

  return {
    loadMore,
    resetLoad,
    error,
    loading,
    hasMore,
    rentals,
    reloading
  };
};
