<template>
  <textarea
    class="textarea"
    v-model="innerText"
    @keyup="$emit('textChange', { key: 'description', value: innerText })"
  />
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: ['text'],
  emits: ['textChange'],

  setup(props) {
    const innerText = ref(props.text);

    return { innerText };
  },
};
</script>

<style scoped>
.textarea {
  position: relative;
  border: none;
  background: transparent;
  border: none;
  overflow: auto;
  outline: none;
  width: 100%;
  resize: none;
  text-align: center;
  padding: 5px;
}
</style>
