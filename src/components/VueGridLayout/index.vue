<template>
  <div>
    <div>
      <div class="layoutJSON">
        Displayed as
        <code>[x, y, w, h]</code>
        :
        <div class="columns">
          <div class="layoutItem" v-for="item in state.layout" :key="item.i">
            <b>{{ item.i }}</b>
            : [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="bpx-worp">
      <div class="emement-list">
        <div
          @drag="drag(item)"
          @dragend="dragend"
          class="droppable-element"
          draggable="true"
          unselectable="on"
          v-for="item in cmsList"
          :key="item.id"
        >
          <div>
            {{ item.name || "--" }}
          </div>
        </div>
      </div>

      <div id="content">
        <GridLayout
          :ref="setLayoutRef"
          v-model:layout="state.layout"
          :col-num="12"
          :row-height="30"
          :is-draggable="true"
          :is-resizable="true"
          :vertical-compact="true"
          :use-css-transforms="true"
        >
          <GridItem
            v-for="item in state.layout"
            :key="item.i"
            :ref="(e) => setItemRef(item, e)"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
          >
            <!-- {{ item.componentName }} -->
            <component :is="item.componentName" :title="item.componentName" />
          </GridItem>
        </GridLayout>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, nextTick } from "vue";
import { GridLayout, GridItem } from "vue-grid-layout-v3";

const mouseXY = { x: null, y: null };
const DragPos = { x: null, y: null, w: 1, h: 1, i: null };
const cmsList = ref([
  {
    id: 1,
    name: "CMS1",
    componentName: "Cms1",
  },
  {
    id: 2,
    name: "CMS2",
    componentName: "Cms2",
  },
  {
    id: 3,
    name: "CMS3",
    componentName: "Cms3",
  },
]);
const state = reactive({
  layout: [{ x: 0, y: 0, w: 2, h: 2, i: "0", componentName: "Cms1" }],
  colNum: 12,
  layoutRef: {},
  itemRefs: {},
});

document.addEventListener(
  "dragover",
  (e) => {
    mouseXY.x = e.clientX;
    mouseXY.y = e.clientY;
  },
  false
);

async function drag(item) {
  const parentRect = document.getElementById("content").getBoundingClientRect();
  let mouseInGrid = false;
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true;
  }
  if (mouseInGrid === true && state.layout.findIndex((v) => v.i === item.id) === -1) {
    state.layout.push({
      x: (state.layout.length * 2) % (state.colNum || 12),
      y: state.layout.length + (state.colNum || 12), // puts it at the bottom
      w: 4,
      h: 4,
      i: item.id,
      componentName: item.componentName,
    });
    await nextTick();
  }
  if (!state.itemRefs?.drop) {
    return;
  }
  const index = state.layout.findIndex((item) => item.i === "drop");
  if (index !== -1) {
    if (state.itemRefs?.drop?.el?.style) {
      state.itemRefs.drop.el.style.display = "none";
    }
    const itemRef = state.itemRefs.drop;
    const new_pos = itemRef.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
    if (mouseInGrid === true) {
      state.layoutRef.emitter.emit("dragEvent", ["dragstart", "drop", new_pos.x, new_pos.y, 1, 1]);
      DragPos.i = String(index);
      DragPos.x = state.layout[index].x;
      DragPos.y = state.layout[index].y;
    }
    if (mouseInGrid === false) {
      state.layoutRef.emitter.emit("dragEvent", ["dragend", "drop", new_pos.x, new_pos.y, 1, 1]);
      state.layout = state.layout.filter((obj) => obj.i !== "drop");
      await nextTick();
    }
  }
}

async function dragend() {
  const parentRect = document.getElementById("content").getBoundingClientRect();
  let mouseInGrid = false;
  if (
    mouseXY.x > parentRect.left &&
    mouseXY.x < parentRect.right &&
    mouseXY.y > parentRect.top &&
    mouseXY.y < parentRect.bottom
  ) {
    mouseInGrid = true;
  }
  if (mouseInGrid === true) {
    state.layoutRef.emitter.emit("dragEvent", ["dragend", "drop", DragPos.x, DragPos.y, 1, 1]);
    state.layout = state.layout.filter((obj) => obj.i !== "drop");

    state.layout.push({
      x: DragPos.x,
      y: DragPos.y,
      w: 1,
      h: 1,
      i: DragPos.i,
    });
    await nextTick();
    state.layoutRef.emitter.emit("dragEvent", ["dragend", DragPos.i, DragPos.x, DragPos.y, 1, 1]);
  }
}

function setItemRef(item, e) {
  state.itemRefs[item.i] = e;
}

function setLayoutRef(e) {
  state.layoutRef = e;
}
</script>

<style scoped>
.vue-grid-layout {
  background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item.static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.bpx-worp {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#content {
  height: 100%;
  flex: 1;
}

.emement-list {
  width: 300px;
}

.droppable-element {
  width: 100px;
  height: 100%;
  float: left;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  columns: 120px;
}
</style>
