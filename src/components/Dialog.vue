<template>
	<div class="backdrop">
		<div class="dialog">
			<div class="dialog__title">
				{{ title }}
			</div>
			<div class="divider" />
			<div class="dialog__name">
				{{ text }}
			</div>
			<div class="dialog__actions">
				<Button
					:text="submitText"
					fluid
					small
					@click="emits('ok')"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import Button from './Button.vue';

const emits = defineEmits(['ok']);

defineProps({
	title: {
		type: String,
		default: 'Título',
	},
	text: {
		type: String,
		default: 'Texto',
	},
	submitText: {
		type: String,
		default: 'Confirmar',
	},
});
</script>

<style lang="scss" scoped>
@import '../typography.scss';

.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
}

.dialog {
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 12px;
	width: 582px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	border-radius: 8px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	padding: 48px 32px 32px 32px;

	&__actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		width: 100%;
	}

	&__name {
		font-size: 24px;
		font-weight: 500;
		color: #1C1930;
	}

	&__title {
		@include caption;
		font-size: 22px;
	}
}

.divider{
	width: 100%;
	border: 1px solid #ECECEC;
	margin: 12px 0 22px 0;
}
</style>
