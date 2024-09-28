<template>
<div>
{{ formatDate(timeRef) }}
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  time: number,
  callBack: 
})

const timeRef = ref(props.time)

function formatDate(params) {
  const date = new Date(params);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds}`
}
onMounted(() => {
  const timer = setInterval(() => {
    if (unref(timeRef) <= 0) {
      clearInterval(timer)
      return;
    }
    callBack(unref(timeRef))
    timeRef.value--
  }, 1000)
})

</script>