import { useState, useEffect, useRef, useCallback } from 'react';
import { firestore } from 'firebase';
import { Rental } from 'common';

type Data = Rental[];
type CollectionHook = [Data, boolean, Error | null];

export const useCollection = (
  query: firestore.Query,
  deps?: string[]
): CollectionHook => {
  const [data, setData] = useState<Data>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const ref = useRef(query);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const snap = await ref.current.get();
      if (snap.empty) {
        setLoading(false);
        return;
      }
      const results = snap.docs.map((doc) => {
        const rental = doc.data() as Omit<Rental, 'id'>; 
        return {
          id: doc.id,
          ...rental
        };
      });
      setData(results);
      setLoading(false);
    } catch (err) {
      setErr(err.message);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    fetchData();
  }, [fetchData, deps]);

  return [data, loading, err];
};
