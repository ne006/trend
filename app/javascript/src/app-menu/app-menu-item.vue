<template>
	<a
		v-bind:href="link"
		v-bind:class="{ active: active }"
	>{{ name }}</a>
</template>

<script>
export default {
  props: ["name", "link", "active"],
  data: function () {
    return {}
  }
}
</script>

<style scoped lang="scss">
$buttonColor: #6b6;
$buttonShadowColor: #393;
$activeButtonColor: #8d8;
$activeButtonShadowColor: #5a5;
$fontStack: 'Segoe UI';

a, a:visited{
	display: block;
	width: 200px;
	height: 30px;
	border-radius: 6px;
	background-color: $buttonColor;
	box-shadow: 0 3px $buttonShadowColor;
	font-family: $fontStack;
	font-size: 18px;
	color: #eee;
	text-decoration: none;
	text-align: center;
	vertical-align: middle;
}

a:hover, a:focus {
	transform: translateY(2px);
	box-shadow: 0 1px $buttonShadowColor;
}

a.active {
	background-color: $activeButtonColor;
	box-shadow: 0 3px $activeButtonShadowColor;
}

a.active:hover, a.active:focus {
	box-shadow: 0 1px $activeButtonShadowColor;
}
</style>
