import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/employees'
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('../views/Employees.vue')
    },
    {
      path: '/employees/:id',
      name: 'employee-inner',
      component: () => import('../views/EmployeesInner.vue')
    }
  ]
})

export default router