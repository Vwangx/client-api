import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

export const HomePage = () => {
  const User = gql`
    query {
      currentUser {
        email
        name
        position
      }
    }
  `;
  const { data, loading } = useQuery(User);

  useEffect(() => {
    // console.log(data)
  });

  return (
    <>
      <h1>
        Welcome Home{!loading && data && <span>, {data.currentUser.name}</span>}
        !
      </h1>
      <div className="home">There is some shit!</div>
    </>
  );
};
