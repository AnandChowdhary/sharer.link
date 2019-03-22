<template>
  <div class="home">
    <ul>
      <li v-for="(result, key) in results" :key="`result_${key}`">
        {{result.kind}}
        {{result.trackId}}
        {{result.trackName}}
        {{result.artistName}}
        {{result.collectionName}}
        {{result.releaseDate}}
        {{result.currency}}
        {{result.primaryGenreName}}
        <img :src="result.artworkUrl30">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import api from '@/api';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private results: any = [];
  private mounted() {
    api('https://itunes.apple.com/search?term=hello+internet&limit=5')
      .then((result) => {
        this.results = result;
      })
      .catch((error) => {
        alert('error');
      });
  }
}
</script>
