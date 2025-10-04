import axios from "axios";
import {
  API_URL,
  getBooksUrl,
  getCourseUrl,
  getInstructorurl,
} from "src/config/api.config";
import { BooksType } from "src/interfaces/books.interface";

export const AppService = {
  async getMainPageSource(language?: string) {
    const { data: courses } = await axios.get(
      `${API_URL}${getCourseUrl("all")}?language=${language}&limit=6`
    );

    const { data: instructors } = await axios.get(
      `${API_URL}${getInstructorurl("all")}?language=${language}&limit=6`
    );

    const { data: books } = await axios.get<BooksType[]>(
      `${API_URL}${getBooksUrl("find-all")}`
    );

    return { courses, instructors, books };
  },

  async getCourses(language?: string, limit = "10") {
    const { data: courses } = await axios.get(
      `${API_URL}${getCourseUrl("all")}?language=${language}&limit=${limit}`
    );

    return courses;
  },

  async getDetailedCourse(slug?: string) {
    const { data } = await axios.get(
      `${API_URL}${getCourseUrl("detailed-course")}/${slug}`
    );

    return data;
  },

  async getInstructors(language: string) {
    const { data: instructors } = await axios.get(
      `${API_URL}${getInstructorurl("all")}?language=${language}&limit=100`
    );

    return instructors;
  },

    async getDetailedInstructor(instructorId: string) {
    const { data: instructors } = await axios.get(
      `${API_URL}${getInstructorurl("detailed")}/${instructorId}`
    );

    return instructors;
  },
};
