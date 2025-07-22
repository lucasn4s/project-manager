<template>
    <div class="page">
        <PageHeader
            title="Editar projeto"
            with-breadcrumb
        />
        <div
            v-if="!loading"
            class="page__content"
        >
            <ProjectForm
                ref="projectForm"
                :project="selectedProject"
            />
            <Button
                class="page__submit"
                text="Salvar Projeto"
                :disabled="!form?.isValid()"
                @click="handleSubmit"
            />
        </div>
    </div>
    <Dialog
        v-if="showConfirmationDialog"
        title="Projeto atualizado"
        text="Projeto atualizado com sucesso!"
        submit-text="Ok"
        @ok="handleConfirmation"
    />
    <Dialog
        v-if="showErrorDialog"
        :title="dialogTitle"
        :text="dialogText"
        submit-text="Ok"
        @ok="showErrorDialog = false"
    />
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';
import { putProject, getProject } from '../services/projects';
import PageHeader from '../components/PageHeader.vue';
import Button from '../components/Button.vue';
import ProjectForm from '../components/ProjectForm.vue';
import { useRouter } from 'vue-router';
import Dialog from '../components/Dialog.vue';

const form = useTemplateRef('projectForm');
const loading = ref(true);
const router = useRouter();
const selectedProjectId = router.currentRoute.value.params.id;
const selectedProject = ref(null);
const showConfirmationDialog = ref(false);
const showErrorDialog = ref(false);
const dialogTitle = ref('');
const dialogText = ref('');

onMounted(() => {
    if (!selectedProjectId) {
        router.push({ name: 'Projects' });
    }

    loading.value = true;

    getProject(selectedProjectId)
        .then(({ data }) => selectedProject.value = data)
        .catch((error) => {
            dialogTitle.value = 'Erro ao carregar projeto';
            dialogText.value = 'Ocorreu um erro ao carregar o projeto. Por favor, tente novamente.';
            showErrorDialog.value = true;
        })
        .finally(() => loading.value = false);
});

function handleSubmit() {
    form.value.validate()
        .then((values) => {
            putProject({ id: selectedProjectId, ...values})
                .then(() => showConfirmationDialog.value = true)
                .catch(() => {
                    dialogTitle.value = 'Erro ao atualizar projeto';
                    dialogText.value = 'Ocorreu um erro ao atualizar o projeto. Por favor, tente novamente.';
                    showErrorDialog.value = true;
                });
        });
}

function handleConfirmation() {
    showConfirmationDialog.value = false;
    router.push({ name: 'Projects' });
}
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.page {
    padding: 67px 45px;

    &__content {
        border: 1px solid #DCDCDC;
        border-radius: 8px;
        padding: 52px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 33px;
        gap: 32px;
    }

    &__submit {
        width: 700px;
    }

    &__title {
        @include title;
        margin-top: 8px;
    }
}
</style>
