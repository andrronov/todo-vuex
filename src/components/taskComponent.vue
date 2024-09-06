<template>
   <div class="flex flex-col items-center gap-4 w-full">
      <div :key="task.id" class="flex flex-row items-center w-full justify-between px-4 py-2 border-2 border-white text-white" :class="task.isCompleted ? 'text-opacity-50 bg-white/5 border-opacity-25' : ''">
        <p class="text-xl font-semibold">{{task.name}}</p>
        <div class="flex flex-row items-center gap-4">
          <input :checked="task.isCompleted" type="checkbox" class="w-8 h-8" @change="$emit('update', task.id)" />
          <button @click="$emit('delete', task.id)">Delete</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
   props: {
      task: {
         type: Object
      }
   }
}
</script>

<style>

</style>