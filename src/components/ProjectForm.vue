<template>
    <Form
        ref="validationForm"
        class="form__container"
        as="div"
    >
        <Field
            v-slot="{ field, meta, errors }"
            name="name"
            rules="minWords:2"
        >
            <FormInput
                v-bind="field"
                :model-value="field.value"
                label="Nome do Projeto"
                required
                :state="resolveInputState(meta)"
                :error-message="errors[0]"
            />
        </Field>
        <Field
            v-slot="{ field, meta, errors }"
            name="customer"
            rules="minWords:1"
        >
            <FormInput
                v-bind="field"
                :model-value="field.value"
                label="Cliente"
                required
                :state="resolveInputState(meta)"
                :error-message="errors[0]"
            />
        </Field>
        <div class="form__dates">
            <Field
                v-slot="{ field, meta, errors }"
                name="startDate"
                :rules="`required|before_date:${today}`"
            >
                <FormInput
                    v-bind="field"
                    :model-value="field.value"
                    label="Data de Início"
                    append-icon-src="/images/calendar-day-light.svg"
                    required
                    :mask="'##/##/####'"
                    :state="resolveInputState(meta)"
                    :error-message="errors[0]"
                />
            </Field>
            <Field
                v-slot="{ field, meta, errors }"
                name="endDate"
                :rules="`required|after_date:${today}`"
            >
                <FormInput
                    v-bind="field"
                    :model-value="field.value"
                    label="Data Final"
                    append-icon-src="/images/calendar-check-light.svg"
                    required
                    :mask="'##/##/####'"
                    :state="resolveInputState(meta)"
                    :error-message="errors[0]"
                />
            </Field>
        </div>
        <Field
            v-slot="{ field }"
            name="image"
        >
            <FileInput
                v-bind="field"
                :model-value="field.value"
                label="Capa do Projeto"
            />
        </Field>
    </Form>
</template>

<script setup>
import { onMounted, useTemplateRef } from 'vue';
import { Form, Field } from 'vee-validate';
import { isEmpty } from 'lodash';
import resolveInputState from '../utils/resolvers/resolveInputState';
import FormInput from './FormInput.vue';
import FileInput from './FileInput.vue';

const props = defineProps({
    project: {
        type: Object,
        default: () => ({}),
    },
});

const form = useTemplateRef('validationForm');
const today = new Intl.DateTimeFormat('pt-BR').format(new Date());

onMounted(() => {
    if (isEmpty(props.project)) {
        return;
    }

    form.value.setValues({
        name: props.project.name,
        customer: props.project.customer,
        startDate: props.project.startDate,
        endDate: props.project.endDate,
        image: props.project.imageUrl,
    });
})

defineExpose({
    isValid: () =>{
        if (!isEmpty(form.value?.errors)) {
            return false;
        }

        for (const field of ['name', 'customer', 'startDate', 'endDate']) {
            if (!form.value?.values[field]) {
                return false;
            }
        }

        return true;
    },
    validate: () => new Promise((resolve) => {
        form.value?.validate()
            .then(({ valid }) => {
                if (!valid) {
                    return;
                }

                const values = { ...form.value.values };

                if (values.image === null) {
                    delete values.image;
                }

                resolve(values);
            });
    }),
})
</script>

<style lang="scss" scoped>
.form {
    &__container {
        display: grid;
        width: 700px;
        row-gap: 32px;
    }

    &__dates {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5%;
    }
}
</style>
