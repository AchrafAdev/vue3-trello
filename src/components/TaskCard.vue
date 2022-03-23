<template>
  <div class="task">
    <span>{{ task.name }}</span>
    <p v-if="task.description">{{ task.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  align-items: left;
  flex-wrap: wrap;
  margin: 0.75em;
  padding: 0.5em;
  background: white;
  border-radius: 5px;
}
</style>
