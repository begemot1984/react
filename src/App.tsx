import "./App.css";
import { List } from "./components/List";
import { Details } from "./components/Details";
import { useState } from "react";

export default function App() {
  const [activeUserId, setActiveUserId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const onClickUser = (id: number) => {
    if (id != activeUserId) {
      setIsLoading(true);
      setActiveUserId(id);
    }
  };

  return (
    <>
      <List onClickUser={onClickUser} />
      <Details
        activeUserId={activeUserId}
        isLoading={isLoading}
        resetIsLoading={() => setIsLoading(false)}
      />
    </>
  );
}
