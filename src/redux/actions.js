import {
  REFRESH_USER,
  USER_LOGIN,
  LOGOUT_USER,
  LOAD_USERS,
  USER_CREATE,
  LOAD_TECHNOLOGIES,
  LOAD_INDUSTRIES,
  TECHNOLOGY_CREATE,
  UPDATE_CURRENT_USER,
} from "./types";
import { client } from "../index";
import { loader } from "graphql.macro";
import Noty from "noty";

const loginMutation = loader("../gql/UserLoginMutation.graphql");
const currentUserQuery = loader("../gql/CurrentUserQuery.graphql");
const usersQuery = loader("../gql/UsersQuery.graphql");
const createUserMutation = loader("../gql/CreateUserMutation.graphql");
const createTechnologyMutation = loader("../gql/CreateTechnologyMutation.graphql");
const technologiesQuery = loader("../gql/TechnologiesQuery.graphql");
const industriesQuery = loader("../gql/IndustriesQuery.graphql");
const updateUserMutation = loader("../gql/UpdateUserMutation.graphql")

export function loginUser({ email, password }) {
  return async (dispatch) => {
    try {
      const { data } = await client.mutate({
        variables: { email, password },
        mutation: loginMutation,
      });
      const token = await data.user.login.token;
      const user = await data.user.login.user;
      localStorage.setItem("token", JSON.stringify(token));
      dispatch({
        type: USER_LOGIN,
        token,
        user,
      });
      const notyfy = new Noty({
        text: "Hello there!",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: "success",
        progressBar: true,
        timeout: 2500,
      });
      notyfy.show();
    } catch (err) {
      const notyfy = new Noty({
        text: "Something went wrong...",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: "error",
        progressBar: true,
        timeout: 2500,
      });
      notyfy.show();
    }
  };
}

export function refreshUser() {
  return async (dispatch) => {
    try {
      const { data } = await client.query({ query: currentUserQuery });
      const token = await JSON.parse(localStorage.getItem("token"));
      const user = data.currentUser;
      console.log(data);
      dispatch({
        type: REFRESH_USER,
        token,
        user,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch({
        type: LOGOUT_USER,
        token: null,
        user: {},
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadUsers() {
  return async (dispatch) => {
    try {
      const { data } = await client.query({ query: usersQuery });
      dispatch({
        type: LOAD_USERS,
        users: data.users.items,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function createUser({ email, password, name, position, image }) {
  return async (dispatch) => {
    try {
      const { data } = await client.mutate({
        variables: { email, password, name, position, image },
        mutation: createUserMutation,
      });
      console.log(data);
      dispatch({
        type: USER_CREATE,
        newUser: {
          id: data.user.create.id,
          email: data.user.create.email,
          name: data.user.create.name,
          position: data.user.create.position,
        },
      });
      const notyfy = new Noty({
        text: "User was created!",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: "success",
        progressBar: true,
        timeout: 2500,
      });
      notyfy.show();
    } catch (err) {
      console.log(err);
      const notyfy = new Noty({
        text: "User not created...",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: "info",
        progressBar: true,
        timeout: 2500,
      });
      notyfy.show();
    }
  };
}

export function loadTechnologies() {
  return async (dispatch) => {
    try {
      const { data } = await client.query({ query: technologiesQuery });
      dispatch({
        type: LOAD_TECHNOLOGIES,
        technologies: data.technologies.items,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadIndustries() {
  return async (dispatch) => {
    try {
      const { data } = await client.query({ query: industriesQuery });
      dispatch({
        type: LOAD_INDUSTRIES,
        industries: data.industries.items,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function createTechnology({ name, slug }) {
  return async (dispatch) => {
    try {
      const { data } = await client.mutate({
        variables: { name, slug },
        mutation: createTechnologyMutation,
      });
      dispatch({
        type: TECHNOLOGY_CREATE,
        newTechnology: {
          id: data.technology.create.id,
          name: data.technology.create.name,
          slug: data.technology.create.slug,
        },
      });
      const notyfy = new Noty({
        text: "Technology was created!",
        layout: "topLeft",
        theme: "bootstrap-v4",
        type: "warning",
        progressBar: false,
        timeout: 1000,
      });
      notyfy.show();
    } catch (err) {
      console.log(err);
      const notyfy = new Noty({
        text: "Error!",
        layout: "topRight",
        theme: "bootstrap-v4",
        type: "error",
        progressBar: false,
        timeout: 1000,
      });
      notyfy.show();
    }
  };
}


export function updateCurrentUser({ id, form }) {
  return async (dispatch) => {
    try {
      const { data } = await client.mutate({ mutation: updateUserMutation, variables: { id, ...form } })
      console.log(data)
      dispatch({
        type: UPDATE_CURRENT_USER,
        updatedUser: {
          id,
          form,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}