import { createStore } from 'vuex';
import defaultBoard from '../default-board';
import { saveStatePlugin, uuid } from '../utils';

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;
export default createStore({
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  getters: {},
  mutations: {
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const [taskToMove] = fromTasks.splice(fromTaskIndex, 1);
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      const [columnToMove] = columnList.splice(fromColumnIndex, 1);
      columnList.splice(toColumnIndex, 0, columnToMove);
    },
  },
});
