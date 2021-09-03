<template>
  <iframe :src="frameSrc" width="100%" height="100%" scrolling="no" frameborder="0" />
</template>

<script>
export default {
  data() {
    return {
      frameSrc: ''
    }
  },
  mounted() {
    this.frameSrc = '/frame/1'
  }
}
</script>

<style scoped>

</style>
