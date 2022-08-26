<template>
  <TheMenu/>
  <Header/>
  <TheContent/>
</template>

<script>
import Header from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
import TheContent from './components/layout/TheContent.vue'

export default {
  name: 'App',
  components: {
    Header,
    TheContent, 
    TheMenu 
  },
  methods:{
    
  }
}
</script>

<style>

</style>
