import $axios from "src/api/axios";
import { getReviewUrl } from "src/config/api.config";
import {
  EditReviewDto,
  GetUserByDto,
  ReviewType,
} from "src/interfaces/course.interface";
export const ReviewService = {
  async createReview(body: ReviewType) {
    const response = await $axios.post(`${getReviewUrl("create")}`, body);

    return response.data;
  },

  async getByUser(body: GetUserByDto) {
    const response = await $axios.post(`${getReviewUrl("get-by-user")}`, body);

    return response.data;
  },

  async editReview(reviewId: string, body: EditReviewDto) {
    const response = await $axios.put(
      `${getReviewUrl("edit")}/${reviewId}`,
      body
    );

    return response.data;
  },

  async getReviews(courseId: string) {
    const response = await $axios.get(`${getReviewUrl("get")}/${courseId}`);

    return response.data;
  },
};
