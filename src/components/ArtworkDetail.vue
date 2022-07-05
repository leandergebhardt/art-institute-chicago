<template>
  <div class="artwork-detials-wrapper">
    <h2 class="film-title">{{ film.title }}</h2>
    <h3 class="original-titels">{{ film.original_title }} ( {{ film.original_title_romanised }} )</h3>

    <img 
        class="film-image" 
        :src="film.image" 
        alt=""
    >
    <p class="description">{{ film.description }}</p>
    <div class="film-info">
        <p><strong>Director:</strong> {{ film.director }}</p>
        <p><strong>Producer:</strong> {{ film.producer }}</p>
        <p><strong>Release Date: </strong> {{ film.release_date }}</p>
        <p><b-icon-clock></b-icon-clock> {{ film.running_time }} min</p>
        <p><strong>Rotten Tomatos: </strong> {{ film.rt_score }} <b-icon-award></b-icon-award></p>
    </div>
    <div class="objects">
        <b-dropdown text="People">
            <b-dropdown-item 
                href="#" 
                v-for="people in film.people" 
                :key="people"
            >
                {{people}}
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown text="species">
            <b-dropdown-item 
                href="#"
                v-for="species in film.species" 
                :key="species"
            >
                {{species}}
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown text="locations">
            <b-dropdown-item 
                href="#"
                v-for="location in film.locations" 
                :key="location"
            >
                {{location}}
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown text="vehicles">
            <b-dropdown-item 
                href="#"
                v-for="vehicle in film.vehicles" 
                :key="vehicle"
            >
                {{vehicle}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ArtworkDetail',
    data() {
        return {
            film: {},
            peoples: [],
        }
    },
    created() {
        let filmID = this.$route.params.id;

        console.log(filmID);
        this.getFilm(filmID);
        // if(this.film)
        //     this.getPeople();
    },
    methods: {
        getFilm(filmId) {
            axios.get(`https://ghibliapi.herokuapp.com/films/${filmId}`).then(resp => {
                this.film = resp.data;
            });
        },
        getPeople() {
            for(let index = 0; index < this.film.people.length; index++) {
                let person = this.film.people[index];
                axios.get(person).then(resp => {
                    this.peoples.push(resp);
                });
                
            }
        },
    }
}
</script>

<style>
.artwork-detials-wrapper {
    margin: 50px 0;
}

.film-title {
  color: white;
}

.film-image {

}

.description {
    color: white;
    font-size: 21px;
    margin: 2rem 8rem;
    text-align: left;
}

.film-info {
    position: absolute;
    left: 25px;
    top: 50%;
    background-color: #5c5c5c;
    border: 1px solid #737373;
    border-radius: 15px;
    color: white;
    padding: 25px;
    text-align: left;
}

</style>