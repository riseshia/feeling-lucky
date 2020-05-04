type DocId = string | null;
type GetFunction = () => DocId;
type SetFunction = (value: DocId) => void;

const getFetchDocId: () => DocId = () => localStorage.getItem("fetchDocId");
const setFetchDocId: (value: DocId) => void = (value: DocId) => {
  if (value == null) {
    localStorage.removeItem("fetchDocId");
  } else {
    localStorage.setItem("fetchDocId", value);
  }
};

export { getFetchDocId, setFetchDocId };
