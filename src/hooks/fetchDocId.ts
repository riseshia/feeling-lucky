import { useState, useEffect } from 'react';

type Url = string | null;
type SetFunction = (value: Url) => void;

const getFetchDocIdFromLS: () => Url = () => localStorage.getItem("fetchDocId");
const setFetchDocIdFromLS: (value: Url) => void = (value: Url) => {
  if (value == null) {
    localStorage.removeItem("fetchDocId");
  } else {
    localStorage.setItem("fetchDocId", value);
  }
};

export const useFetchDocId: () => [Url, SetFunction] = () => {
  const [fetchDocId, setFetchDocIdFromState] = useState(getFetchDocIdFromLS());

  const setFetchDocId = (value: Url) => {
    setFetchDocIdFromState(value);
    setFetchDocIdFromLS(value);
  }

  return [fetchDocId, setFetchDocId];
}