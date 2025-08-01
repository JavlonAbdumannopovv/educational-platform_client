import * as courseActions from './course/course.action';
import { courseSliceAction } from './course/course.slice';
import * as instructorActions from './instructor/instructor.action';
import { instructorSliceAction } from './instructor/instructor.slice';
import * as lessonActions from './lesson/lesson.action';
import { lessonSliceAction } from './lesson/lesson.slice';
import * as sectionActions from './section/section.action';
import { sectionSliceAction } from './section/section.slice';
import * as userActions from './user/user.action';
import { userSliceAction } from './user/user.slice';

export const allActions = {
	...userSliceAction,
	...userActions,
	...instructorSliceAction,
	...instructorActions,
	...courseActions,
	...courseSliceAction,
	...sectionActions,
	...sectionSliceAction,
	...lessonActions,
	...lessonSliceAction,
};
