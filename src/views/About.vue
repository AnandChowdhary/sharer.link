<template>
  <div v-if="loading">Loading...</div>
  <main v-else>
    <div class="card">
      <div class="album-art">
        <img :src="result.artworkUrl100">
      </div>
      <div class="details">
        <div class="title">{{result.trackName || result.collectionName}}</div>
        <div class="info">
          <span style="text-transform: capitalize">{{result.kind || result.wrapperType}}</span> by {{result.artistName}}
        </div>
      </div>
    </div>
    <div v-if="type === 'podcast'">
      <div class="verb">Listen on:</div>
      <div class="buttons">
        <a :href="result.collectionViewUrl" class="button apple-podcasts">Apple Podcasts</a>
        <a :href="`https://www.google.com/podcasts?feed=${googleScheme(result.feedUrl)}`" class="button google-podcasts">Google Podcasts</a>
        <a :href="`https://pca.st/itunes/${result.collectionId}`" class="button pocket-casts">Pocket Casts</a>
        <a :href="`https://overcast.fm/itunes${result.collectionId}`" class="button overcast">Overcast</a>
        <a :href="`https://api.duckduckgo.com/?q=${encode('!ducky open.spotify.com ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button spotify">Spotify</a>
        <a :href="`https://player.fm/subscribe?id=${result.feedUrl}`" class="button playerfm">Player.fm</a>
        <a :href="`https://gpodder.net/subscribe?url=${result.feedUrl}`" class="button gpodder">Gpodder.net</a>
        <a :href="result.feedUrl" class="button rss">RSS feed</a>
      </div>
    </div>
    <!-- {{result}} -->
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import api from '@/api';
import slugify from '@/slugify';

@Component({})
export default class Home extends Vue {
  private result: any = {};
  private loading: boolean = false;
  private slugify = slugify;
  private type = '';
  private googleScheme(text: string) {
    return encodeURIComponent(btoa(text)).replace(/%2F/g, '_');
  }
  private encode(text: string) {
    return encodeURIComponent(text);
  }
  private mounted() {
    this.loading = true;
    const slug = this.$route.params.slug;
    this.type = this.$route.path.split('/')[1];
    api(`https://itunes.apple.com/search?term=${encodeURIComponent(
      slug.split('-')[slug.split('-').length - 1],
    )}&limit=1`)
      .then((result: any) => {
        this.result = result[0];
      })
      .then(() => this.loading = false);
  }
}
</script>

<style lang="scss">
.card {
  padding: 1rem;
  display: flex;
}
.loading-true {
  opacity: 0.5;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.button {
  display: block;
  background-color: #333;
  text-decoration: none;
  font-size: 110%;
  color: #fff;
  margin-top: 1rem;
  text-align: center;
  padding: 1rem;
  border-radius: 0.25rem;
  width: 240px;
  box-sizing: border-box;
  &.rss {
    background-color: #e76e3c;
  }
  &.google-podcasts {
    background-color: #ffffff;
    color: #000000;
  }
  &.apple-podcasts {
    background-color: #863fbf;
  }
  &.pocket-casts {
    background-color: #f44336;
  }
  &.overcast {
    background-color: #ee7d33;
  }
  &.playerfm {
    background-color: #ca352b;
  }
  &.gpodder {
    background-color: #4aa19d;
  }
  &.spotify {
    background-color: #6dd463;
  }
}
.verb {
  text-align: center;
  margin-top: 1rem;
}
@media (max-width: 500px) {
  .button {
    width: 100%;
  }
}
</style>
