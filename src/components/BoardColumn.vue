<template>
  <div
    class="column"
    @drop="
      $emit('onDrop', {
        event: $event,
        toTasks: column.tasks,
        columnIndex,
      })
    "
    @dragover.prevent
    @dragenter.prevent
    draggable="true"
    @dragstart.self="$emit('onPickupColumn', { event: $event, columnIndex })"
  >
    <div class="title">{{ column.name }}</div>
    <div class="list-reset">
      <TaskCard
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        draggable="true"
        @dragstart.self="
          $emit('onPickupTask', {
            event: $event,
            taskIndex: $taskIndex,
            columnIndex,
          })
        "
        @click="$emit('goToTask', { task })"
        @dragover.prevent
        @dragenter.prevent
        @drop.stop="
          $emit('onDrop', {
            event: $event,
            toTasks: column.tasks,
            columnIndex,
          })
        "
      />
      <div>
        <Input
          @click="$emit('onSetColumn', { column })"
          :deleteInput="true"
          :placeholder="'+ Add the task'"
          @keyEnter="onKeyEnter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue';
import Input from '../components/shared/Input.vue';

export default {
  name: 'BoardColumns',
  components: { Input, TaskCard },
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    function onKeyEnter({ value }) {
      ctx.emit('onKeyEnter', value);
    }

    return { onKeyEnter };
  },
};
</script>

<style scoped>
.column {
  background: #dcdcdc;
  text-align: left;
  margin: 5px;
  padding: 5px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border-radius: 0.25rem;
  flex: 1;
}
</style>
