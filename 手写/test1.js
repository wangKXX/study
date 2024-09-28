import {ref} from 'vue';
function useCountTime(time, callback) {
    const timeRef = ref(time);
    let timer = setInterval(() => {
      if (unref(timeRef) <= 0) {
        clearInterval(timer)
      }
      callback(unref(timeRef))
      timeRef.value--
    }, time)
}