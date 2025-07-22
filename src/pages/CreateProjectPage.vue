<template>
    <div class="page">
        <PageHeader
            title="Novo projeto"
            with-breadcrumb
        />
        <div class="page__content">
            <ProjectForm
                ref="projectForm"
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
        title="Projeto criado"
        text="Projeto criado com sucesso!"
        submit-text="Ok"
        @ok="handleConfirmation"
    />
    <Dialog
        v-if="showErrorDialog"
        title="Erro ao criar projeto"
        text="Por favor, tente novamente."
        submit-text="Ok"
        @ok="showErrorDialog = false"
    />
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';
import { postProject } from '../services/projects';
import PageHeader from '../components/PageHeader.vue';
import Button from '../components/Button.vue';
import ProjectForm from '../components/ProjectForm.vue';
import { useRouter } from 'vue-router';
import Dialog from '../components/Dialog.vue';

const form = useTemplateRef('projectForm');
const router = useRouter();
const showConfirmationDialog = ref(false);
const showErrorDialog = ref(false);

function handleSubmit() {
    form.value.validate()
        .then((values) => {
            postProject(values)
                .then(() => showConfirmationDialog.value = true)
                .catch(() => showErrorDialog.value = true);
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
