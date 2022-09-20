//src/App.vue
//Typescript code
<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  components:{
    HelloWorld,
  },
  data(){
    return{
      title:"welcome to my app",
      list: [
    {
      name: 'popoolatopzy',
      age: '26'
    },
    {
      name: 'Preetish',
      age: '26'
    },
    {
      name: 'John',
      age: '30'
    }
  ]
    }
  }
})
</script>