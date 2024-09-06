<script>
import defaultInput from "./components/UI/defaultInput.vue";
import defaultButton from "./components/UI/defaultButton.vue";
import taskComponent from "./components/taskComponent.vue";

export default{
  components: {defaultInput, defaultButton, taskComponent},
  data(){
    return {
      taskInput: '',
      searchInput: '',
    }
  },
  methods: {
    searchTask(){
      this.$store.dispatch('searchtask', this.searchInput)
    },
    addTask(){
      if(this.taskInput.trim().length > 0){
        this.$store.dispatch('addtask', this.taskInput)
        this.taskInput = ''
      }
    },
    deleteTask(idx){
      this.$store.dispatch('deletetask', idx)
      this.searchInput = ''
    },
    updateTask(idx){
      this.$store.dispatch('updatetask', idx)
    }
  },
  computed:{
    tasks(){
      return this.$store.state.tasks
    },
    searchResults(){
      return this.$store.state.searchResult
    }
  },
}
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center bg-indigo-800 text-xl relative overflow-hidden">
    <!-- Фоновые мячики -->
    <div class="w-56 h-56 bottom-5 right-5 bg-green-700/90 blur-sm rounded-full absolute" id="ball_1"></div>
    <div class="w-44 h-44 top-5 left-5 bg-red-700/90 blur-sm rounded-full absolute" id="ball_2"></div>
    
    <!-- Контент -->
    <div class="max-w-7xl relative w-full max-h-[80vh] p-4 mx-2 rounded-xl backdrop-blur-xl border-2 border-white/50 bg-white/15 flex flex-col items-center justify-center" :class="tasks.length > 0 ? 'gap-8' : 'gap-0'">
      <defaultInput v-model="searchInput" @input="searchTask" v-if="tasks.length > 0" type="text" :placeholder="'Поиск'" />

      <!-- Результаты поиска -->
      <div v-if="searchResults && searchInput.length > 0 && tasks.length > 0" class="border-2 border-white/50 py-2 flex flex-col items-center gap-4 overflow-y-auto w-full max-h-[50vh]">
        <p v-if="searchResults.length > 0">Результаты поиска:</p>
        <taskComponent v-for="task in searchResults" :key="task.id" :task="task" @update="updateTask" @delete="deleteTask" />
        <p v-if="searchResults.length < 1">Нет результатов</p>
      </div>

      <!-- Все таски -->
      <div class="flex flex-col overflow-y-auto gap-4 w-full max-h-[50vh]">
        <taskComponent v-for="task in tasks" :key="task.id" :task="task" @update="updateTask" @delete="deleteTask" />
      </div>

      <!-- Добавление задачи -->
      <div class="flex flex-row items-center w-full">
        <defaultInput @keydown-enter="addTask" v-model="taskInput" :placeholder="'Введите задание:'" />
        <defaultButton @click="addTask" class="text-white">Добавить</defaultButton>
      </div>
    </div>
</div>

</template>

<style>
@keyframes move1 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-40px, -55px);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes move2 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(40px, 55px);
  }
  100% {
    transform: translate(0, 0);
  }
}

#ball_1 {
  animation: move1 25s infinite alternate ease-in-out;
}
#ball_2 {
  animation: move2 25s infinite alternate ease-in-out;
}
</style>