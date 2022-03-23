import { createRouter, createWebHistory } from 'vue-router';
import Board from '../views/Board.vue';
import Task from '../components/Task.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Board,
      children: [
        {
          path: 'task/:id',
          name: 'TaskComponent',
          component: Task,
          props: true,
        },
      ],
    },
  ],
});

export default router;
