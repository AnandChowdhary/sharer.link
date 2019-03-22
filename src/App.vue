<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
body {
  background-color: #eee;
  color: #2c3e50;
  font-family: "Lato", sans-serif;
  line-height: 1.6;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
main {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
}
.card {
  border: 1px solid #ccc;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  background: #fff;
}
.details, .title {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-weight: bold;
  line-height: 1;
  margin-bottom: 0.5rem;
  font-size: 125%;
}
.details {
  line-height: 1;
}
.album-art {
  width: 5rem;
  margin-right: 2rem;
  img {
    width: 100%;
    vertical-align: middle;
  }
}
</style>
