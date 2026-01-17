import useJsonFetch from "../hooks/useJsonFetch";

export default function GetError() {
  const [{ data, error, loading }] = useJsonFetch(
    "http://localhost:7070/error",
  );

  return (
    <>
      <h2>Error</h2>
      <div>Data: {JSON.stringify(data)}</div>
      <div> Error: {JSON.stringify(error)}</div>
      <div> Loading: {loading}</div>
    </>
  );
}
