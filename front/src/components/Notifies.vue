<script setup>
</script>

<template>
	<div class="notifies">
		<div class="notification has-background-grey has-text-light">
			<button class="delete"></button>
			<!-- <p class="title is-size-5 mb-2">Ошибка</p> -->
			<p class="content">Не уадлось войти</p>
		</div>
	</div>
</template>

<style lang="scss">
.notifies {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	position: fixed;
	padding: 20px;
	width: 100%;
	z-index: 1;

	& .notification {
		margin-bottom: 10px;
		width: 400px;
	}
}
</style>
