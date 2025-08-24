import { configureStore } from "@reduxjs/toolkit";
import notesslicesReducer from "../noteslice/noteslices"
export const store=configureStore({
    reducer:{
        noted:notesslicesReducer,
    }
});
