import { LessonType } from "src/interfaces/instructor.interface";

export interface LessonInitialStateType {
	isLoading: boolean;
	error: string | null | unknown;
  lesson: LessonType;
}

export interface LessonBodyType {
	callback: () => void;
	courseId?: string;
	sectionId?: string;
	lessonId?: string;
}
