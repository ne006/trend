<template>
  <div class="container">
    <slot></slot>
	</div>
</template>

<script>
export default {
  props: [],
  data: function () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  top: 20%;
}
</style>
