<template>
  <div class="flex-box">
    <div class="Uibox">
      <!--   @drag="handleDrag(item)" -->
      <div
        @dragend="handleDragEnd(item)"
        draggable="true"
        class="Uibox-div"
        v-for="item in 10"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
    <div class="grid-box grid-box2">
      <grid-layout
        ref="gridLayout"
        v-model:layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[5, 5]"
        :use-css-transforms="true"
      >
        <grid-item
          ref="gridItem"
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >
          <component :key="item.i" :is="item.componentName" :title="item.componentName" />
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const layout = ref([
  { x: 0, y: 0, w: 2, h: 2, i: "0", componentName: "aboutIndex" },
  { x: 2, y: 0, w: 2, h: 4, i: "1", componentName: "aboutIndex" },
  { x: 4, y: 0, w: 2, h: 5, i: "2", componentName: "Cms1" },
  { x: 6, y: 0, w: 2, h: 3, i: "3", componentName: "Cms2" },
  { x: 8, y: 0, w: 2, h: 3, i: "4", componentName: "Cms3" },
  { x: 10, y: 0, w: 2, h: 3, i: "5", componentName: "aboutIndex" },
  { x: 0, y: 5, w: 2, h: 5, i: "6", componentName: "aboutIndex" },
  { x: 2, y: 5, w: 2, h: 5, i: "7", componentName: "aboutIndex" },
  { x: 4, y: 5, w: 2, h: 5, i: "8", componentName: "aboutIndex" },
  { x: 6, y: 3, w: 2, h: 4, i: "9", componentName: "aboutIndex" },
  { x: 8, y: 4, w: 2, h: 4, i: "10", componentName: "aboutIndex" },
]);

const handleDragEnd = (item) => {
  console.log(item, "handleDragEnd");
  layout.value.push({
    x: 8,
    y: 4,
    w: 2,
    h: 4,
    i: "10",
    componentName: "oneIndex",
  });
};
</script>
<style lang="scss" scoped>
.close {
  display: inline-block;
  height: 16px;
  width: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #fff;
}
.grid-box2 {
  width: 100%;
  height: 100%;
}
.flex-box {
  display: flex;
  height: 100%;
}
.Uibox {
  height: 100%;
  width: 20%;
  background-color: rgb(55, 0, 255);
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap; /* 允许项目换行 */
}

.Uibox-div {
  margin: 5px;
  display: inline-block;
  width: 30px;
  height: 40px;
  background-color: #fff;
}
</style>
