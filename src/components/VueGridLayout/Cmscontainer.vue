<template>
  <div>
    <div v-for="item in dataLst" :key="item">
      <template v-if="true">
        <component :is="item" :formInfo="formInfo" />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const commonFiles: any = import.meta.glob("/src/components/CmsGurp/*.vue");
const dataLst = ref();
const setCOommonFile = () => {
  console.log("commonFiles", commonFiles);
  for (const key in commonFiles) {
    console.log(commonFiles[key].name, "commonFiles[key]");
    const lastSlashIndex = commonFiles[key].name.lastIndexOf("/");
    // 如果找到了 /，则截取从它后面的位置到字符串末尾的所有字符
    if (lastSlashIndex !== -1) {
      const result = commonFiles[key].name.substring(lastSlashIndex + 1);
      console.log(result); // 输出: Cms1.vue
      dataLst.value.push(result);
    } else {
      console.log("No slash found in the string");
    }
  }
  // const data = commonFiles.map((item: any) => {
  //   // 找到最后一个 / 的位置
};
setCOommonFile();

// import componentList from "./CmsScript";
// console.log(componentList, "componentList");

const formInfo = ref({
  name: "张三",
  age: 18,
  sex: "男",
  address: "北京市",
  phone: "123456789",
  email: "123456789@qq.com",
  hobby: ["篮球", "足球", "羽毛球"],
  desc: "我是一个热爱运动的人",
});
</script>
<style lang="scss" scoped></style>
