import { UserChangePasswordDto } from "./../../../server/src/user/user.interface";
import $axios from "src/api/axios";
import { getUserUrl } from "src/config/api.config";
export const UserService = {
  async updateUser(body) {
    try {
      const { data } = await $axios.put(`${getUserUrl("update")}`, body);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async myCourses() {
    try {
      const response = await $axios.get(`${getUserUrl("my-courses")}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async changePassword({ oldPassword, newPassword }: UserChangePasswordDto) {
    const response = await $axios.put(`${getUserUrl("change-password")}`, {
      oldPassword,
      newPassword,
    });

    return response.data;
  },
};
