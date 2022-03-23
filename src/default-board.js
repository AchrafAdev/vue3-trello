import { uuid } from './utils';

export default {
  name: 'workshop',
  columns: [
    {
      name: 'To do',
      tasks: [
        {
          description: 'Creating a Vue project',
          name: 'First task',
          id: uuid(),
          userAssigned: 'Peter',
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null,
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'In Progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
    {
      name: 'Done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null,
        },
      ],
    },
  ],
};
