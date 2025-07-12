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
      component: () => import('../views/Employees.vue'),
      meta: { title: 'Сотрудники' }
    },
    {
      path: '/employees/:id',
      name: 'employee-inner',
      component: () => import('../views/EmployeesInner.vue'),
      meta: { title: 'Информация сотрудника' }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/Documents.vue'),
      meta: { title: 'Документы' }
    },
    {
      path: '/documents/:id',
      name: 'document-inner',
      component: () => import('../views/DocumentsInner.vue'),
      meta: { title: 'Информация документа' }
    }
  ]
})

export default router