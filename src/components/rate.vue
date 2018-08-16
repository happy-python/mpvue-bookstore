<template>
    <div class="rate">
        <span class="hollow">☆☆☆☆☆</span>
        <span class="cover" :style="style">★★★★★</span>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    style: function () {
      return `width:${this.value / 2}em`
    }
  }
}
</script>

<style scoped>
.rate {
  font-size: 16px;
  position:relative;
  display: inline-block;
}
.hollow {
  color: #D84B45;
}
.rate > span.cover {
  position:absolute;
  display: inline-block;
  top:0;
  left:0;
  width:0;
  overflow:hidden;
  color: #D84B45;
}
</style>

