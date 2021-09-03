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
    console.log(this.$route.path)
    this.frameSrc = this.$route.path
  }
}
</script>

<style scoped>

</style>
