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
        <b-dropdown variant="success" text="People" class="m-2">
            <b-dropdown-item 
                href="#" 
                v-for="person in peoples" 
                :key="person.id"
            >
            <router-link :to='"/person/" + person.id' active-class="active" class="black">
                {{ person.name }}
            </router-link>
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown variant="success" text="species" class="m-2">
            <b-dropdown-item 
                href="#"
                v-for="species in species" 
                :key="species.id"
            >
            <router-link :to='"/species/" + species.id' active-class="active" class="black">
                {{ species.name }}
            </router-link>
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown variant="success" text="vehicles" class="m-2">
            <b-dropdown-item 
                href="#"
                v-for="vehicle in vehicles" 
                :key="vehicle.id"
            >
            <router-link :to='"/vehicle/" + vehicle.id' active-class="active" class="black">
                {{ vehicle.name }}
            </router-link>
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
            species: [],
            vehicles: [],
            locations: [],
        }
    },
    created() {
        let filmID = this.$route.params.id;

        console.log(filmID);
        this.getFilm(filmID);
    },
    watch: {
        film() {
            this.GetPeople();
            this.GetSpecies();
            this.GetVehicles();
            this.GetLocations();
        }
    },
    methods: {
        getFilm(filmId) {
            axios.get(`https://ghibliapi.herokuapp.com/films/${filmId}`).then(resp => {
                this.film = resp.data;
            });
        },
        GetPeople() {
            for(let index = 0; index < this.film.people.length; index++) {
                axios.get(this.film.people[index]).then(resp => {
                    this.peoples.push(resp.data);
                });
                
            }
        },
        GetSpecies() {
            for(let index = 0; index < this.film.species.length; index++) {
                axios.get(this.film.species[index]).then(resp => {
                    this.species.push(resp.data);
                });
                
            }
        },
        GetVehicles() {
            for(let index = 0; index < this.film.vehicles.length; index++) {
                axios.get(this.film.vehicles[index]).then(resp => {
                    this.vehicles.push(resp.data);
                });
                
            }
        },
        GetLocations() {
            for(let index = 0; index < this.film.locations.length; index++) {
                axios.get(this.film.locations[index]).then(resp => {
                    this.locations.push(resp.data);
                });
                
            }
        },
    }
}
</script>

<style scoped lang="scss">
.artwork-detials-wrapper {
    margin: 50px 0;
}

.film-title {
  color: white;
}

.black {
    color: black;
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