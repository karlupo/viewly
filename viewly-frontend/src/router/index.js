import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyAccount from '../views/account/MyAccount.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ToDoOverview from '../views/ToDo-Overview.vue'
import Teams from '../views/Teams.vue'
import CreateTeam from '../views/CreateTeam.vue'
import ViewTeam from '../views/ViewTeam.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: MyAccount
  },
  {
    path: '/myaccount/login',
    name: 'login',
    component: Login
  },
  {
    path: '/myaccount/register',
    name: 'register',
    component: Register
  },
  {
    path: '/myaccount/mytodos',
    name: 'todooverview',
    component: ToDoOverview
  },
  {
    path: '/myaccount/teams',
    name: 'teams',
    component: Teams
  },
  {
    path: '/myaccount/teams/createteam',
    name: 'createteam',
    component: CreateTeam
  },
  {
    path: '/myaccount/teams/:teamid',
    name: 'viewteam',
    component: ViewTeam 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
