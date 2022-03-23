<template>
  <div class="board">
    <div class="items">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="title">{{ column.name }}</div>
        <div class="list-reset">
          <TaskCard
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            :task="task"
            draggable="true"
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task)"
          />
          <div>
            <Input
              @click="setColumn(column)"
              :deleteInput="true"
              :placeholder="'+ Add the task'"
              @keyEnter="onKeyEnter"
            />
          </div>
        </div>
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
import TaskCard from '@/components/TaskCard.vue';
import Task from '@/components/Task.vue';
import Input from '../components/shared/Input.vue';

export default {
  name: 'BoardView',
  components: { TaskCard, Task, Input },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const currentTask = ref(null);
    const currentColumn = ref(null);

    const board = computed(() => store.state.board);
    const isTaskOpen = computed(() => route.name === 'TaskComponent');

    function goToTask(task) {
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

    function setColumn(column) {
      currentColumn.value = column;
    }

    function onKeyEnter({ value }) {
      const { tasks } = currentColumn.value;
      store.commit('CREATE_TASK', { tasks, name: value });
    }

    function pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';

      event.dataTransfer.setData('task-index', taskIndex);
      event.dataTransfer.setData('from-column-index', fromColumnIndex);
    }

    function moveTask(event, toTasks) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index');
      const taskIndex = event.dataTransfer.getData('task-index');

      const { columns } = board.value;
      const fromTasks = columns[fromColumnIndex].tasks;

      store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        taskIndex,
      });
    }

    return {
      board,
      isTaskOpen,
      goToTask,
      close,
      onSetDescription,
      onKeyEnter,
      setColumn,
      pickupTask,
      moveTask,
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

.column {
  background: #dcdcdc;
  text-align: left;
  margin: 5px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border-radius: 0.25rem;
  flex: 1;
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
