import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_TASKS_API_URL, POST_TASKS_API_URL } from '../../utils/apiUrl';
import { getRequest, postRequest } from '../../utils/requestMethods';

const createFetchChunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

const postFetchChunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (options) => {
    console.log(options);
    return await postRequest(apiURL, options);
  });
};

// Get Tasks
export const getTasks = createFetchChunk('getTasks', GET_TASKS_API_URL);
export const postTasks = postFetchChunk('postTasks', POST_TASKS_API_URL);

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, handleFulfilled('getTasksData'))
      .addCase(getTasks.rejected, handleRejected)
      .addCase(postTasks.fulfilled, handleFulfilled('postTasksData'))
      .addCase(postTasks.rejected, handleRejected);
  },
});

export default apisSlice.reducer;
