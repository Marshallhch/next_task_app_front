import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GET_TASKS_API_URL,
  POST_TASKS_API_URL,
  DELETE_TASK_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
} from '../../utils/apiUrl';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from '../../utils/requestMethods';

const createFetchChunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    const fullPath = `${apiURL}/${userId}`;
    // console.log(fullPath, userId);
    return await getRequest(fullPath);
  });
};

const postFetchChunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (options) => {
    // console.log(options);
    return await postRequest(apiURL, options);
  });
};

const deleteFetchChunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    const option = {
      method: 'DELETE',
    };
    const fullPath = `${apiURL}/${id}`;
    // console.log(fullPath, option);
    return await deleteRequest(fullPath, option);
  });
};

const updateCompletedFetchChunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (options) => {
    // console.log(options);
    return await putRequest(apiURL, options);
  });
};

export const getTasks = createFetchChunk('getTasks', GET_TASKS_API_URL);
export const postTasks = postFetchChunk('postTasks', POST_TASKS_API_URL);
export const deleteTask = deleteFetchChunk('deleteTask', DELETE_TASK_API_URL);
export const updateCompletedTask = updateCompletedFetchChunk(
  'updateCompletedTask',
  UPDATE_COMPLETED_TASK_API_URL
);

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

const delHandleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = Date.now();
};

const updateCompletedHandleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = Date.now();
};

const handleRejected = (state, action) => {
  console.log('Error', action.payload);
  state.isError = true;
};

const apisSlice = createSlice({
  name: 'apis',
  initialState: {
    getTasksData: null,
    postTasksData: null,
    deleteTaskData: null,
    updateCompletedTaskData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, handleFulfilled('getTasksData'))
      .addCase(getTasks.rejected, handleRejected)
      .addCase(postTasks.fulfilled, handleFulfilled('postTasksData'))
      .addCase(postTasks.rejected, handleRejected)
      .addCase(deleteTask.fulfilled, delHandleFulfilled('deleteTaskData'))
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(
        updateCompletedTask.fulfilled,
        updateCompletedHandleFulfilled('updateCompletedTaskData')
      )
      .addCase(updateCompletedTask.rejected, handleRejected);
  },
});

export default apisSlice.reducer;
