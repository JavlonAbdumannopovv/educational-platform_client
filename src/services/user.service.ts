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
};
