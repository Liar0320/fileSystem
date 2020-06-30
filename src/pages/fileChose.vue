<template>
  <section class="wall">
    <figure class="wall__box" v-for="item in fileTypes" :key="item">
      <svg
        class="icon wall__box__img"
        aria-hidden="true"
        @click="routeGo(item)"
      >
        <use :xlink:href="'#icon-' + item"></use>
      </svg>
    </figure>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      fileTypes: ['code', 'tools', 'trash', 'program', 'bookcase', 'other'],
    };
  },
  methods: {
    routeGo(type) {
      if (type === 'other') {
        this.$router.push(`paper`);
      } else {
        this.$router.push(`/fileList/${type}`);
      }
    },
  },
};
</script>

<style lang="scss">
.wall {
  column-width: 320px;
  column-gap: 15px;
  width: 90%;
  max-width: 1100px;
  margin: 50px auto;
  &__box {
    // display: inline-block;
    column-break-inside: avoid;
    // height: 50vh;

    &__img {
      width: 100% !important;
      height: 100% !important;
      margin-bottom: 15px;
      border-radius: 8px;

      cursor: pointer;
      transition: 0.3s linear;
      transform: scale(0.8);
      &:hover {
        transform: scale(1);
      }
    }
  }
}
</style>
