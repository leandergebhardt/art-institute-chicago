<template>
  <div class="artwork-wrapper">
    <div class="artwork-image">
        <img 
          :src="artwork.movie_banner" 
          alt="artwork" 
          @mouseover="show = true"
          @mouselave="show = false" 
        />
        <p 
          class="movie-title">
          {{ artwork.title }}
        </p>
        <Transition name="slide">
          <div>
            <p 
              v-show="show" 
              class="movie-description">
              {{ artwork.original_title }}
            </p>
          </div>
        </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Artwork',
  props: ['artwork'],
  created: function () {

  },
  mounted () {
  
  },
  computed: {

  },
  data() {
    return {
      show: false,
    }
  },
   methods: {

  },
}
</script>

<style>

.movie-title {
  color: white;
}

/* Animation */
.slide-enter-active {
    -moz-transition-duration: 0.75s;
   -webkit-transition-duration: 0.75s;
   -o-transition-duration: 0.75s;
   transition-duration: 0.75s;
   -moz-transition-timing-function: ease;
   -webkit-transition-timing-function: ease;
   -o-transition-timing-function: ease;
   transition-timing-function: ease;
}

.slide-leave-active {
   -moz-transition-duration: 0.75s;
   -webkit-transition-duration: 0.75s;
   -o-transition-duration: 0.75s;
   transition-duration: 0.75s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

.artwork-image img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 15px;

    -webkit-box-shadow: 10px 10px 31px -12px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 31px -12px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 31px -12px rgba(0,0,0,0.75);
}

.artwork-image img:hover {
    cursor: pointer;
    transform: scale(1.06);
}

.artwork-image img {
    transition: all 1.75s ease-in-out;
}
</style>