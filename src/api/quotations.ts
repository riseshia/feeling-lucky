export const fetchQuotations = async (fetchDocId: string) => {
  const res = await fetch(`https://spreadsheets.google.com/feeds/cells/${fetchDocId}/1/public/full?alt=json`);
  const data = await res.json();
  const targetRows = data.feed.entry.filter((row: any) => row.gs$cell.col == "1");
  return targetRows.map((row: any) => row.content.$t);
}