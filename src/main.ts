import { createApp } from "vue";
import App from "./App.vue";
import setupPlugins from "@/plugins";
//@ts-ignore
import VueGridLayout from "vue-grid-layout";
// 使用 import.meta.glob 匹配 components 目录下的所有 .vue 文件
const components = import.meta.glob("./components/CmsGurp/*.vue");
// 创建一个函数来动态注册所有全局组件
const newArr: any = [];
async function registerGlobalComponents(app: any) {
  let componentName = "";
  for (const [filePath, module] of Object.entries(components)) {
    // 提取组件名称，这里假设文件名是 PascalCase 的
    //@ts-ignore
    componentName = filePath
      .split("/")
      .pop() // 获取文件名
      .replace(/\.\w+$/, "") // 移除文件扩展名
      .replace(/-/g, ""); // 如果文件名是 kebab-case，可以将其转换为 camelCase（可选）
    // 动态导入组件
    //@ts-ignore
    const component = (await module()).default;
    // 注册全局组件
    newArr.push(componentName);
    app.component(componentName, component);
    // console.log(component, componentName, "componentName");
  }
}
// 本地SVG图标
import "virtual:svg-icons-register";
// 暗黑主题样式
import "element-plus/theme-chalk/dark/css-vars.css";
// 暗黑模式自定义变量
import "@/styles/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import "animate.css";

const app = createApp(App);
// 注册插件
app.use(setupPlugins);
app.use(VueGridLayout);
// 注册全局组件
registerGlobalComponents(app).then(() => {
  // 挂载 Vue 应用
  app.mount("#app");
});
