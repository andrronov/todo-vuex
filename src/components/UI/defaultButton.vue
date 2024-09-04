<template>
   <button @click="$emit('click')" class="p-2 bg-blue-900 hover:bg-indigo-900 border-white">
      <slot />
   </button>
</template>