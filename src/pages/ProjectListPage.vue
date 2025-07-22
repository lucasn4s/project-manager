<template>
    <div
        class="page__container"
    >
        <ProjectListEmptyState
            v-if="projectList.length === 0"
            @new-project="router.push({ name: 'NewProject' })"
        />
        <template v-else>
            <PageHeader
                title="Projetos"
                with-actions
                @favorites-toggle="fetchProjects"
                @order-change="fetchProjects"
            >
                <template #title>
                    <div class="page__title">
                        Projetos
                        <span class="page__count">
                            ({{ projectList.length }})
                        </span>
                    </div>
                </template>
                <template #right>
                    <Button
                        text="Novo projeto"
                        icon-img="/images/plus-circle.svg"
                        small
                        @click="router.push({ name: 'NewProject' })"
                    />
                </template>
            </PageHeader>
            <ProjectListEmptyState
                v-if="filteredProjectList.length === 0"
                @new-project="router.push({ name: 'NewProject' })"
            />
            <div
                v-else
                class="page__content"
            >
                <ProjectCard
                    v-for="project in filteredProjectList"
                    :key="project.id"
                    :name="project.name"
                    :customer="project.customer"
                    :start-date="project.startDate"
                    :end-date="project.endDate"
                    :image-url="project.image"
                    :is-favorite="project.isFavorite"
                    @edit="handleEditProject(project.id)"
                    @remove="handleRemoveProject(project.id, project.name)"
                    @favorite="handleFavoriteProject(project.id)"
                />
            </div>
        </template>
    </div>
    <RemoveProjectDialog
        v-if="showRemoveProjectDialog"
        :project-name="projectToRemove.name"
        @close="showRemoveProjectDialog = false"
        @confirm="handleRemoveProjectConfirm(projectToRemove.id)"
    />
    <Dialog
        v-if="showDialog"
        title="Projeto removido"
        text="Projeto removido com sucesso!"
        submit-text="Ok"
        @ok="showDialog = false"
    />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { snakeCase } from 'lodash';
import { getProjects, deleteProject, patchProject } from '../services/projects';
import Button from '../components/Button.vue';
import ProjectListEmptyState from '../components/ProjectListEmptyState.vue';
import PageHeader from '../components/PageHeader.vue';
import ProjectCard from '../components/ProjectCard.vue';
import RemoveProjectDialog from '../components/RemoveProjectDialog.vue';
import Dialog from '../components/Dialog.vue';

const projectList = ref([]);
const router = useRouter();
const filteredProjectList = ref([]);
const selectedProjectId = ref(null);
const showRemoveProjectDialog = ref(false);
const showDialog = ref(false);
const projectToRemove = ref(null);
const dialogText = ref('');
const dialogTitle = ref('');

onMounted(() => fetchProjects());

function fetchProjects(fetchFavorites = false) {
    const order = localStorage.getItem('orderBy') || 'name';

    getProjects({ order_by: snakeCase(order) })
        .then((response) => {
            projectList.value = response.data;
            filteredProjectList.value = fetchFavorites
                ? projectList.value.filter((project) => project.isFavorite)
                : projectList.value;
        })
        .catch(() => {
            dialogTitle.value = 'Erro ao carregar projetos';
            dialogText.value = 'Ocorreu um erro ao carregar os projetos. Por favor, tente novamente.';
            showDialog.value = true;
        });
}

function handleEditProject(projectId) {
    selectedProjectId.value = projectId;
    router.push({ name: 'EditProject', params: { id: projectId } });
}

function handleRemoveProject(projectId, projectName) {
    projectToRemove.value = { id: projectId, name: projectName };
    showRemoveProjectDialog.value = true;
}

function handleFavoriteProject(projectId) {
    patchProject(projectId, !projectList.value.find((project) => project.id === projectId).isFavorite)
        .then(() => {
            fetchProjects();
        })
        .catch(() => {
            dialogTitle.value = 'Erro ao atualizar projeto';
            dialogText.value = 'Ocorreu um erro ao favoritar este projeto. Por favor, tente novamente.';
            showDialog.value = true;
        });
}

function handleRemoveProjectConfirm() {
    deleteProject(projectToRemove.value.id)
        .then(() => {
            showRemoveProjectDialog.value = false;
            fetchProjects();

            nextTick(() => {
                dialogTitle.value = 'Projeto removido';
                dialogText.value = 'Projeto removido com sucesso!';
                showDialog.value = true;
            })
        })
        .catch(() => {
            dialogTitle.value = 'Erro ao remover projeto';
            dialogText.value = 'Ocorreu um erro ao remover este projeto. Por favor, tente novamente.';
            showDialog.value = true;
        });
}
</script>

<style lang="scss" scoped>
.page {
    &__container {
        display: flex;
        flex-direction: column;
        gap: 22px;
        justify-content: center;
        align-items: center;
        padding: 60px 42px;
        overflow: auto;
    }

    &__content {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 32px;
        width: 100%;
        overflow: auto;
    }

    &__title {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
    }

    &__count {
        font-weight: 400;
        font-size: 17px;
    }
}
</style>
