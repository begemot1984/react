import useJsonFetch from "../hooks/useJsonFetch";

export default function GetData() {
  const [{ data, error, loading }] = useJsonFetch("http://localhost:7070/data");

  return (
    <>
      <h2>Data</h2>
      <div>Data: {JSON.stringify(data)}</div>
      <div> Error: {JSON.stringify(error)}</div>
      <div> Loading: {loading}</div>
    </>
  );
}
