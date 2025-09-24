import { LessonType } from "./../../interfaces/instructor.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LessonInitialStateType } from "./lesson.interface";

const initialState: LessonInitialStateType = {
  isLoading: false,
  error: null,
  lesson: {} as LessonType,
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    clearlessonError: (state) => {
      state.error = null;
    },
    getLesson: (state, { payload }: PayloadAction<LessonType>) => {
      state.lesson = payload;
    },
  },
});

export const lessonReducer = lessonSlice.reducer;
export const lessonSliceAction = lessonSlice.actions;
