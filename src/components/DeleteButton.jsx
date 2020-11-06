import React from "react";
// import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

export const DeleteButton = (props) => {
  const deleteElement = gql`
        mutation {
            ${props.values} {
                delete (id: "${props.itemId}")
            }
        }
    `;

  const [removeElement] = useMutation(deleteElement);
  // const [removeElement, { data }] = useMutation(deleteElement);

  const deleteHandler = (e) => {
    removeElement(deleteElement);
  };

  // useEffect(() => {
  //     console.log(data)
  // }, [data])

  return (
    <div onClick={deleteHandler} className="btn btn-danger">
      Delete
    </div>
  );
};
