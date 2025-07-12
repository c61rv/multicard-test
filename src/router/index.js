import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/employees'
    },
    {
      path: '/employees',
      component: () => import('../layouts/EmployeesLayout.vue'),
      children: [
        {
          path: '',
          name: 'employees',
          component: () => import('../views/Employees.vue'),
          meta: { title: 'Сотрудники' }
        },
        {
          path: ':id',
          name: 'employee-inner',
          component: () => import('../views/EmployeesInner.vue'),
          meta: { title: 'Информация сотрудника' }
        }
      ]
    },
    {
      path: '/documents',
      component: () => import('../layouts/DocumentsLayout.vue'),
      children: [
        {
          path: '',
          name: 'documents',
          component: () => import('../views/Documents.vue'),
          meta: { title: 'Документы' }
        },
        {
          path: ':id',
          name: 'document-inner',
          component: () => import('../views/DocumentsInner.vue'),
          meta: { title: 'Информация документа' }
        }
      ]
    },
  ]
});

export default router;