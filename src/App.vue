<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/Empty'
import MainLayout from './layouts/Main'
import firebase from 'firebase/app'

export default {
  computed: {
    layout() {
      if (!firebase.auth().currentUser) {
        return 'empty-layout'
      }
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import "assets/theme";
</style>
