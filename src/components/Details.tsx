import { useState, useEffect } from "react";

export function Details({ activeUserId, isLoading, resetIsLoading }) {
  const [userDetails, setUserDetails] = useState<DetailsItem>();

  useEffect(() => {
    if (activeUserId) {
      fetch(
        `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${activeUserId}.json`,
      )
        .then((response) => response.json())
        .then((data) => {
          setUserDetails(data);
          resetIsLoading();
        });
    }
  }, [activeUserId]);

  if (isLoading) {
    return <>Loading user {activeUserId}...</>;
  }

  if (userDetails == undefined) {
    return <></>;
  }

  return (
    <>
      <img src={userDetails.avatar} />
      <h2>{userDetails.name}</h2>
      City: {userDetails.details.city}
      <br />
      Company: {userDetails.details.company}
      <br />
      Position: {userDetails.details.position}
    </>
  );
}

type UserDetails = {
  city: string;
  company: string;
  position: string;
};

type DetailsItem = {
  id: number;
  name: string;
  avatar: string;
  details: UserDetails;
};
