import Vue from 'vue';
import Vuex from 'vuex';
// import { Message } from 'element-ui';|
import { sync } from 'vuex-router-sync'
import router from '@/router'
import APIrequest from '@/request';
import auth from './auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    base: {
      state: {
        projects: []
      },
      mutations: {
        setProjects(state, projects) {
          state.projects = projects;
        }
      },
      actions: {
        pushRouter(_, path) {
          router.push(path);
        },
        goRouter(_, path) {
          router.go(path);
        },
        async getAllProjects({ commit }) {
          const { data } = await APIrequest('/projects');
          commit('setProjects', data)
        }
      }
    }
  },
})

sync(store, router)

export default store;