import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "./types";
import streams from "../apis/streams";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: {
      userId
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => {
  return async (dispatch, getState) => {
    const response = await streams.post("/streams", formValues);

    dispatch({ type: CREATE_STREAM, payload: response.data });
  };
};

export const fetchStreams = () => {
  return async (dispatch, getState) => {
    const response = await streams.get("/streams");

    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
};

export const fetchStream = streamId => {
  return async (dispatch, getState) => {
    const response = await streams.get(`/streams/${streamId}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
};

export const editStream = (streamId, formValues) => {
  return async (dispatch, getState) => {
    const response = await streams.put(`/streams/${streamId}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
  };
};

export const deleteStream = streamId => {
  return async (dispatch, getState) => {
    await streams.delete(`/streams/${streamId}`);

    dispatch({ type: DELETE_STREAM });
  };
};
