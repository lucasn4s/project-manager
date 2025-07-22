import { createRouter, createWebHistory } from 'vue-router';
import ProjectListPage from './pages/ProjectListPage.vue';
import CreateProjectPage from './pages/CreateProjectPage.vue';
import EditProjectPage from './pages/EditProjectPage.vue';
import SearchResultsPage from './pages/SearchResultsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: ProjectListPage,
  },
  {
    path: '/new-project',
    name: 'NewProject',
    component: CreateProjectPage,
  },
  {
    path: '/edit-project/:id',
    name: 'EditProject',
    component: EditProjectPage,
  },
  {
    path: '/search-results',
    name: 'SearchResults',
    component: SearchResultsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
