import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { DeleteButton } from "../components/DeleteButton";
import { UpdateButton } from "../components/UpdateButton";

export const CasesPage = () => {
  const cases = gql`
    query {
      caseStudies {
        items {
          id
          name
          postedAt
          createdAt
          updatedAt
        }
      }
    }
  `;

  const { loading, data, refetch } = useQuery(cases);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>Case Studies</h1>
            <NavLink className="btn btn-success" to="/create">
              Create Case
            </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Posted At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data &&
                data.caseStudies.items.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.updatedAt}</td>
                    <td>
                      {item.postedAt ? (
                        item.postedAt
                      ) : (
                        <span>Not posted yet!</span>
                      )}
                    </td>
                    <td>
                      {" "}
                      <DeleteButton
                        values={"caseStudy"}
                        itemId={item.id}
                        query={cases}
                      />{" "}
                      <UpdateButton />{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
