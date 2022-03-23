<template>
  <div class="task-view">
    <div>
      <Input :inputValue="task.name" @valueChange="onTextUpdate" />
      <TextArea :text="task.description" @textChange="onTextUpdate" />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from '@vue/runtime-core';
import TextArea from './shared/TextArea.vue';
import Input from './shared/Input.vue';

export default {
  name: 'TaskComponent',
  /*props: {
    task: {
      type: Object,
      required: true,
    },
  },*/
  components: {
    TextArea,
    Input,
  },
  emits: ['updateDescription'],

  setup(props, context) {
    const route = useRoute();

    const task = computed(() => JSON.parse(route.params.task));

    function onTextUpdate({ key, value }) {
      context.emit('updateDescription', { key, value });
    }

    return { task, TextArea, onTextUpdate, Input };
  },
};
</script>

<style>
.task-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border-radius: 0.25rem;
  margin: 0.75em;
  padding: 0.5em;
  max-width: 700px;
  position: relative;
  top: 35%;
  left: 30%;
}

.task-view > div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5em;
}
</style>
