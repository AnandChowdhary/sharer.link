<template>
  <div class="loading" v-if="loading">Loading...</div>
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
        <a target="_blank" :href="result.collectionViewUrl" class="button apple-podcasts">Apple Podcasts</a>
        <a target="_blank" :href="`https://www.google.com/podcasts?feed=${googleScheme(result.feedUrl)}`" class="button google-podcasts">Google Podcasts</a>
        <a target="_blank" :href="`https://pca.st/itunes/${result.collectionId}`" class="button pocket-casts">Pocket Casts</a>
        <a target="_blank" :href="`https://overcast.fm/itunes${result.collectionId}`" class="button overcast">Overcast</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky open.spotify.com ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button spotify">Spotify</a>
        <a target="_blank" :href="`https://player.fm/subscribe?id=${result.feedUrl}`" class="button playerfm">Player.fm</a>
        <a target="_blank" :href="`https://gpodder.net/subscribe?url=${result.feedUrl}`" class="button gpodder">Gpodder.net</a>
        <a target="_blank" :href="result.feedUrl" class="button rss">RSS feed</a>
      </div>
    </div>
    <div v-else-if="type === 'song'">
      <div class="verb">Listen on:</div>
      <div class="buttons">
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky open.spotify.com ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button spotify">Spotify</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky youtube.com ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button youtube">YouTube</a>
        <a target="_blank" :href="result.collectionViewUrl" class="button apple-music">Apple Music</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky amazon.com amazon music ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button amazon-music">Amazon Music</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky play.google.com google play ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button google-play-music">Google Play Music</a>
      </div>
    </div>
    <div v-else-if="type === 'feature-movie'">
      <div class="verb">Watch on:</div>
      <div class="buttons">
        <a target="_blank" :href="result.collectionViewUrl" class="button itunes">iTunes</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky play.google.com google play ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button google-play-movies">Google Play Movies</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky amazon.com ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button prime-video">Prime Video</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky microsoft.com ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button microsoft-store">Microsoft Store</a>
      </div>
    </div>
    <div v-else-if="type === 'audiobook'">
      <div class="verb">Listen on:</div>
      <div class="buttons">
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky audible.com ' + result.collectionName + ' ' + result.artistName)}&format=json`" class="button audible">Audible</a>
        <a target="_blank" :href="result.collectionViewUrl" class="button apple-books">Apple Books</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky play.google.com google play audiobook ' + result.collectionName + ' ' + result.artistName)}&format=json`" class="button google-play-books">Google Play Books</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky amazon.com audiobook ' + result.collectionName + ' ' + result.artistName)}&format=json`" class="button amazon">Amazon</a>
        <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky audiobooks.com ' + result.collectionName + ' ' + result.artistName)}&format=json`" class="button audiobookscom">Audiobooks.com</a>
        <!-- <a target="_blank" :href="`https://api.duckduckgo.com/?q=${encode('!ducky microsoft.com ' + result.trackName + ' ' + result.artistName)}&format=json`" class="button microsoft-store">Microsoft Store</a> -->
      </div>
    </div>
    <!-- {{result}} -->
    <div class="link-sharing">
      <div class="verb">Share on:</div>
      <div class="buttons">
        <a v-if="mobile" :href="`whatsapp://send?text=${currentUrl}`" class="whatsapp">
          <font-awesome-icon title="Whatsapp" fixed-width :icon="['fab', 'whatsapp']" />
        </a>
        <a v-if="mobile" :href="`https://telegram.me/share/url?url=${encodeCurrentUrl}`" class="telegram">
          <font-awesome-icon title="Telegram" fixed-width :icon="['fab', 'telegram']" />
        </a>
        <a v-if="mobile" :href="`fb-messenger://share/?link=${encodeCurrentUrl}`" class="messenger">
          <font-awesome-icon title="Messenger" fixed-width :icon="['fab', 'facebook-messenger']" />
        </a>
        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeCurrentUrl}`" class="facebook">
          <font-awesome-icon title="Facebook" fixed-width :icon="['fab', 'facebook']" />
        </a>
        <a :href="`https://twitter.com/home?status=${encodeCurrentUrl}`" class="twitter">
          <font-awesome-icon title="Twitter" fixed-width :icon="['fab', 'twitter']" />
        </a>
        <a v-if="!mobile" :href="`https://wa.me/whatsappphonenumber/?text=${encodeCurrentUrl}`" class="whatsapp">
          <font-awesome-icon title="Whatsapp" fixed-width :icon="['fab', 'whatsapp']" />
        </a>
        <a :href="`https://pinterest.com/pin/create/button/?url=${encodeCurrentUrl}`" class="pinterest">
          <font-awesome-icon title="Pinterest" fixed-width :icon="['fab', 'pinterest']" />
        </a>
        <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeCurrentUrl}`" class="linkedin">
          <font-awesome-icon title="Linkedin" fixed-width :icon="['fab', 'linkedin']" />
        </a>
        <a :href="`mailto:?&body=${currentUrl}`" class="email">
          <font-awesome-icon title="email" fixed-width :icon="['fas', 'envelope']" />
        </a>
      </div>
    </div>
    <footer>
      <p><router-link to="/">Share another link</router-link></p>
      <router-link to="/" class="button sharerlink">Sharer.link</router-link>
    </footer>
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
  private mobile: boolean = false;
  private slugify = slugify;
  private type = '';
  private encodeCurrentUrl = '';
  private currentUrl = '';
  private googleScheme(text: string) {
    return encodeURIComponent(btoa(text)).replace(/%2F/g, '_');
  }
  private encode(text: string) {
    return encodeURIComponent(text);
  }
  private mounted() {
    this.mobile = window.innerWidth < 500;
    this.currentUrl = location.href;
    this.encodeCurrentUrl = encodeURIComponent(location.href);
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

<style lang="scss" scoped>
.card {
  padding: 1rem;
  display: flex;
}
.loading-true {
  opacity: 0.5;
}
.loading {
  text-align: center;
  margin: 5rem 0;
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
  &.apple-music {
    background-color: #333333;
  }
  &.youtube {
    background-color: #ff0000;
  }
  &.amazon-music {
    background-color: #2674b6;
  }
  &.google-play-music {
    background-color: #ea5333;
  }
  &.itunes {
    background-color: #c34bc3;
  }
  &.google-play-movies {
    background-color: #e93f3a;
  }
  &.prime-video {
    background-color: #46abe2;
  }
  &.microsoft-store {
    background-color: #3fa6f0;
  }
  &.apple-books {
    background-color: #ef8433;
  }
  &.google-play-books {
    background-color: #399ce5;
  }
  &.amazon, &.audible {
    background-color: #f19833;
  }
  &.audiobookscom {
    background-color: #b62f26;
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
footer {
  text-align: center;
  margin-top: 3rem;
  a {
    text-decoration: none;
    color: inherit;
  }
}
.link-sharing {
  margin-top: 2rem;
}
.link-sharing a {
  display: block;
  width: auto;
  background-color: #333;
  text-decoration: none;
  font-size: 110%;
  color: #fff;
  margin-top: 1rem;
  text-align: center;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  font-size: 200%;
  box-sizing: border-box;
  &.whatsapp {
    background-color: #6dd242;
  }
  &.facebook {
    background-color: #37538d;
  }
  &.twitter {
    background-color: #53a8e5;
  }
  &.pinterest {
    background-color: #e23d31;
  }
  &.linkedin {
    background-color: #2773af;
  }
  &.telegram {
    background-color: #3c96c6;
  }
  &.messenger {
    background-color: #147ff3;
  }
}
.sharerlink {
  background-color: #71e7c4;
  color: #000000;
  font-weight: bold;
  width: 100%;
}
</style>
