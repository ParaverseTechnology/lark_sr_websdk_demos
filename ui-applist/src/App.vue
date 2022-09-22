<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    this.restoreHost();
    
    console.log('global state', this.Host);

    if (!this.Host) {
      this.$router.replace("/First");
    }
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}
</style>
