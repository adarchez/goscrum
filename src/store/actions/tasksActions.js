import axios from "axios";
import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types";

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const tasksRequest = () => ({
  type: TASKS_REQUEST,
});

export const tasksSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});

export const tasksFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  axios
    .get(`${API_ENDPOINT}task/${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      dispatch(tasksSuccess(response.data.result));
    })
    .catch((error) => {
      dispatch(tasksFailure(error));
    });
};

export const deleteTask = (id) => (dispatch) => {
  axios
    .delete(`${API_ENDPOINT}task/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      dispatch(getTasks(""));
    })
    .catch((error) => {
      dispatch(tasksFailure(error));
    });
};

export const editTaskStatus = (data) => (dispatch) => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];

  const newStatusIndex =
    statusArray.indexOf(data.status) > 1
      ? 0
      : statusArray.indexOf(data.status) + 1;

  axios({
    method: "patch",
    url: `${API_ENDPOINT}task/${data._id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    data: {
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      },
    },
  })
    .then((response) => {
      dispatch(getTasks(""));
    })
    .catch((error) => {
      dispatch(tasksFailure(error));
    });
};
