type DocId = string | null;
type GetFunction = () => DocId;
type SetFunction = (value: DocId) => void;

const getFetchDocIdFromLS: () => DocId = () =>
  localStorage.getItem("fetchDocId");
const setFetchDocIdFromLS: (value: DocId) => void = (value: DocId) => {
  if (value == null) {
    localStorage.removeItem("fetchDocId");
  } else {
    localStorage.setItem("fetchDocId", value);
  }
};

export const useFetchDocId: () => [GetFunction, SetFunction] = () => {
  return [getFetchDocIdFromLS, setFetchDocIdFromLS];
};
