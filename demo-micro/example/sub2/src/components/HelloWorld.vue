<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <div style="color: green"> 微前端子应用2</div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld2',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
