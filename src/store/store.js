import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const store = new Vuex.Store({
  state: {
    tasks: storedTasks,
    searchResult: [],
    counter: Math.max(0, ...storedTasks.map(task => task.id)) + 1
  },
  mutations: {
    ADD_TASK(state, input) {
      const newTask = {name: input, isCompleted: false, id: state.counter++}
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    DELETE_TASK(state, idx) {
      state.tasks = state.tasks.filter(task => task.id !== idx)
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    UPDATE_TASK(state, idx) {
      let task = state.tasks.find(task => task.id === idx)
      task.isCompleted = !task.isCompleted
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    SET_SEARCH_RESULTS(state, result) {
      state.searchResult = result
    },
  },
  actions: {
    addtask({ commit }, input) {
      commit("ADD_TASK", input);
    },
    deletetask({ commit }, idx) {
      commit("DELETE_TASK", idx);
      commit("SET_SEARCH_RESULTS");
    },
    updatetask({ commit }, idx) {
      commit("UPDATE_TASK", idx);
    },
    searchtask({state, commit}, input){
      const results = state.tasks.filter((task) =>
         task.name.toLowerCase().includes(input.toLowerCase())
       );
      commit("SET_SEARCH_RESULTS", results)
    }
  },
});

export default store;
