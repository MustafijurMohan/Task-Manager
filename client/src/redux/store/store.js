import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from '../state-slice/settings-slice'
import taskReducer from '../state-slice/task-slice'
import summeryReducer from '../state-slice/summery-slice'
import profileReducer from '../state-slice/profile-slice'

export default configureStore({
    reducer: {
        settings: settingsReducer,
        task: taskReducer,
        summery: summeryReducer,
        profile: profileReducer
    }
})