<template>
  <div class="board">
    <div class="items">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        @onDrop="moveTaskOrColumn"
        @onPickupColumn="pickupColumn"
        @onPickupTask="pickupTask"
        @goToTask="goToTask"
        @onSetColumn="setColumn"
        @onKeyEnter="onKeyEnter"
      />
      <div class="column">
        <Input
          type="text"
          :deleteInput="true"
          placeholder="Add new Column"
          @keyEnter="createColumn"
        />
      </div>
    </div>

    <div v-if="isTaskOpen" class="task-bg" @click.self="close">
      <!-- <router-view @updateDescription="onSetDescription" /> -->
      <Task @updateDescription="onSetDescription" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import BoardColumn from '@/components/BoardColumn.vue';
import Input from '../components/shared/Input.vue';
import Task from '../components/Task.vue';

export default {
  name: 'BoardView',
  components: { Input, BoardColumn, Task },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const currentTask = ref(null);
    const currentColumn = ref(null);

    const board = computed(() => store.state.board);
    const isTaskOpen = computed(() => route.name === 'TaskComponent');

    function goToTask({ task }) {
      currentTask.value = task;
      router.push({
        name: 'TaskComponent',
        params: { id: task.id, task: JSON.stringify(task) },
      });
    }

    function close() {
      router.push({ name: 'home' });
    }

    function onSetDescription({ key, value }) {
      store.commit('UPDATE_TASK', {
        task: currentTask.value,
        key,
        value,
      });
    }

    function onKeyEnter(value) {
      const { tasks } = currentColumn.value;

      store.commit('CREATE_TASK', { tasks, name: value });
    }

    function createColumn({ value }) {
      store.commit('CREATE_COLUMN', { name: value });
    }
    function setColumn({ column }) {
      currentColumn.value = column;
    }

    function pickupTask({ event, taskIndex, columnIndex: fromColumnIndex }) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData('task-index', taskIndex);
      event.dataTransfer.setData('from-column-index', fromColumnIndex);
      event.dataTransfer.setData('type', 'task');
    }

    function pickupColumn({ event, columnIndex: fromColumnIndex }) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';

      event.dataTransfer.setData('from-column-index', fromColumnIndex);
      event.dataTransfer.setData('type', 'column');
    }

    function moveTaskOrColumn({
      event,
      toTasks,
      columnIndex: toColumnIndex,
      taskIndex,
    }) {
      const type = event.dataTransfer.getData('type');
      taskIndex = taskIndex !== undefined ? taskIndex : toTasks.length;

      type === 'task'
        ? moveTask(event, toTasks, taskIndex)
        : moveColumn(event, toColumnIndex);
    }

    function moveTask(event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index');
      const fromTaskIndex = event.dataTransfer.getData('task-index');

      const { columns } = board.value;
      const fromTasks = columns[fromColumnIndex].tasks;

      store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex,
      });
    }

    function moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index');

      store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex,
      });
    }

    return {
      board,
      BoardColumn,
      isTaskOpen,
      goToTask,
      close,
      onSetDescription,
      onKeyEnter,
      createColumn,
      setColumn,
      pickupTask,
      pickupColumn,
      moveTaskOrColumn,
      moveTask,
      moveColumn,
    };
  },
};
</script>

<style>
.board {
  background: #008080;
  padding: 15px;
  height: 100%;
  overflow: auto;
}

.title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding: 4px;
}

.items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: stretch;
}

.task-bg {
  margin: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}

.task > span {
  font-weight: bold;
}

.list-reset {
  list-style: none;
  padding: 0;
}
</style>
