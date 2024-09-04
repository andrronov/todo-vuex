<template>
   <input type="text" :value="value" @input="$emit('input', $event.target.value)" @keydown.enter="$emit('keydown-enter')" :placeholder="placeholder" class="w-full bg-white/50 text-black placeholder:text-black/60 p-2" />
</template>

<script>
export default {
   props: {
      placeholder: {type: String, default: 'Введите'},
      value: {type: String}
   }
}
</script>

<style>

</style>