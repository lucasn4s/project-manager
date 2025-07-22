<template>
    <div class="page">
        <PageHeader
            title="Resultados da busca"
            with-breadcrumb
        />
        <div
            v-if="results.length === 0 && !loading"
            class="empty-state"
        >
            <h1 class="empty-state__title">
                Nenhum resultado
            </h1>
            <h2 class="empty-state__caption">
                Nenhum projeto correspondente ao termo buscado. Tente novamente.
            </h2>
        </div>
        <div
            v-else
            class="page__content"
        >
            <ProjectCard
                v-for="project in results"
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
    </div>
    <RemoveProjectDialog
        v-if="showRemoveProjectDialog"
        :project-name="projectToRemove.name"
        @close="showRemoveProjectDialog = false"
        @confirm="handleRemoveProjectConfirm(projectToRemove.id)"
    />
    <Dialog
        v-if="showDialog"
        :title="dialogTitle"
        :text="dialogText"
        submit-text="Ok"
        @ok="showDialog = false"
    />
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { getProjects, deleteProject } from '../services/projects';
import { useRouter } from 'vue-router';
import PageHeader from '../components/PageHeader.vue';
import useSearchStore from '../store/search';
import ProjectCard from '../components/ProjectCard.vue';
import RemoveProjectDialog from '../components/RemoveProjectDialog.vue';
import Dialog from '../components/Dialog.vue';

const searchStore = useSearchStore();
const showRemoveProjectDialog = ref(false);
const showDialog = ref(false);
const dialogText = ref('');
const dialogTitle = ref('');
const selectedProjectId = ref(null);
const projectToRemove = ref(null);
const loading = ref(false);
const results = ref([]);
const router = useRouter();

watch(() => searchStore.searchString, () => {
    fetchProjects();
});

onMounted(() => {
    fetchProjects();
});

function fetchProjects() {
    loading.value = true;
    getProjects({ search: searchStore.searchString })
        .then(({ data }) => results.value = data)
        .catch(() => {
            dialogTitle.value = 'Erro ao carregar projetos';
            dialogText.value = 'Ocorreu um erro ao carregar os projetos. Por favor, tente novamente.';
            showDialog.value = true;
        })
        .finally(() => loading.value = false);
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
@import '../typography.scss';

.page {
    padding: 67px 45px;

    &__content {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 32px;
        width: 100%;
        overflow: auto;
        margin-top: 20px;
    }

    &__submit {
        width: 700px;
    }

    &__title {
        @include title;
        margin-top: 8px;
    }
}

.empty-state {
    width: 100%;
    min-height: 75vh;
    display: flex;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__caption {
        @include caption;
    }

    &__title {
        @include title;
    }
}
</style>
