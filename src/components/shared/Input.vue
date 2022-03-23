<template>
  <input
    type="text"
    v-model="textValue"
    :placeholder="placeholder"
    @keyup="$emit('valueChange', { key: 'name', value: textValue })"
    @keyup.enter="onKeyEnter"
  />
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: ['inputValue', 'placeholder', 'deleteInput'],
  emits: ['valueChange', 'keyEnter'],

  setup(props, context) {
    const textValue = ref(props.inputValue);

    //const valueProp = computed(() => props.deleteInput);

    /**watch(valueProp, (newValue) => {
      console.log('hamza');
      if (newValue) {
        console.log(valueProp.value);
        textValue.value = '';
      }
    });*/

    function onKeyEnter() {
      context.emit('keyEnter', { value: textValue.value });
      if (props.deleteInput) {
        textValue.value = '';
      }
    }

    return { textValue, onKeyEnter };
  },
};
</script>

<style scoped>
input {
  border: none;
  text-align: center;
  display: block;
  margin: 5px;
  font-weight: bold;
  outline: none;
  width: 90%;
  background: transparent;
}
</style>
