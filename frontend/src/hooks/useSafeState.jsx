import { useState, useRef, useEffect, useCallback } from "react";

export function useSafeState(initialState) {
  const [state, setState] = useState(initialState);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setSafeState = useCallback((value) => {
    if (mountedRef.current) {
      setState(value);
    }
  }, []);

  return [state, setSafeState];
}

export function useMounted() {
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}
