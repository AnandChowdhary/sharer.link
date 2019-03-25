<template>
  <main>
    <header>
      <!-- <img alt="Sharer.link icon" src="/logo.png"> -->
      <h1>Sharer.link</h1>
    </header>
    <form @submit.prevent="search">
      <input class="search-input" v-model="query" type="search" placeholder="Search for something...">
    </form>
    <section :class="`loading-${loading}`">
      <router-link class="card" :to="`/${result.kind || result.wrapperType}/${slugify(result)}`" v-for="(result, key) in results" :key="`result_${key}`">
        <article>
          <div class="album-art">
            <img :src="result.artworkUrl100">
          </div>
          <div class="details">
            <div class="title">{{result.trackName || result.collectionName}}</div>
            <div class="info"><span style="text-transform: capitalize">{{result.kind || result.wrapperType}}</span> by {{result.artistName}}</div>
          </div>
        </article>
      </router-link>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import api from '@/api';
import slugify from '@/slugify';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private results: any = [];
  private query: string = '';
  private loading: boolean = false;
  private slugify = slugify;
  private mounted() {
    this.search();
  }
  private search() {
    if (!this.query) {
      return;
    }
    this.loading = true;
    api(`https://itunes.apple.com/search?term=${encodeURIComponent(this.query)}&limit=5`)
      .then((result) => {
        this.results = result;
      })
      .then(() => this.loading = false);
  }
  @Watch('query')
  private onQueryChanged(val: string) {
    this.search();
  }
}
</script>

<style lang="scss">
section > a {
  display: block;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  & + a {
    margin-top: 1rem;
  }
}
article {
  display: flex;
}
.search-input {
  margin-bottom: 1rem;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  font: inherit;
  font-size: 120%;
  appearance: none;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  background-color: #fff;
}
.loading-true {
  opacity: 0.5;
}
header {
  text-align: center;
}
</style>
