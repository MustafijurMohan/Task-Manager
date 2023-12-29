import { createSlice } from "@reduxjs/toolkit";



export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        New: [],
        Completed: [],
        Canceled: [],
        Progress: [],
    },
    reducers: {
        SetNewTask: (state, action) => {
            state.New = action.payload
        },
        SetCompletedTask: (state, action) => {
            state.Completed = action.payload
        },
        SetCanceledTask: (state, action) => {
            state.Canceled = action.payload
        },
        SetProgressTask: (state, action) => {
            state.Progress = action.payload
        },
    }
})

export const {SetNewTask, SetCompletedTask, SetCanceledTask, SetProgressTask} = taskSlice.actions

export default taskSlice.reducer
