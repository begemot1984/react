import useJsonFetch from "../hooks/useJsonFetch";

export default function GetLoading() {
  const [{ data, error, loading }] = useJsonFetch(
    "http://localhost:7070/loading",
  );

  return (
    <>
      <h2>Loading</h2>
      <div>Data: {JSON.stringify(data)}</div>
      <div> Error: {JSON.stringify(error)}</div>
      <div> Loading: {loading}</div>
    </>
  );
}
