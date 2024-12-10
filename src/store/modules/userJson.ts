import { defineStore } from "pinia";
interface UserState {
  Arr: string[];
  age: number;
}
export const useUserStore = defineStore("user", {
  // 定义状态（state）
  state: (): UserState => {
    return {
      Arr: [],
      age: 18,
      // 其他需要全局共享的数据
    };
  },

  // 定义方法（actions）
  actions: {
    // 例如，修改用户名称的方法
    setArr(newName: string[]) {
      this.Arr = newName;
    },
    // 其他方法
  },
});
