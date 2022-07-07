<template>
<div class="person-wrapper">
  <h1>{{ person.name }}</h1>
  <div class="person-container">
    <div class="person-details">
      <h2 class="headline">Infos</h2>
      <hr>
      <p>Gender: <strong>{{ person.gender }}</strong></p>
      <p>Age: <strong>{{ person.age }}</strong></p>
      <p>Eye Color: <strong>{{ person.eye_color }}</strong></p>
      <p>Hair Color: <strong>{{ person.hair_color }}</strong></p>
      <router-link :to='"/species/" + species.id' active-class="active" class="white">
        <p>Species: <strong>{{ this.species.name }}</strong></p>
      </router-link>
    </div>
    <div class="person-details">
      <h2 class="headline">Films</h2>
      <hr>
      <ul>
        <li v-for="film in films" :key="film.id" class="list-item">
          <router-link :to='"/film/" + film.id' tag="b-nav-item" active-class="active">
            {{ film.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Person',
    data() {
    return {
      person: {},
      films: [],
      species: {},
    }
    },
    async created() {
        let personID = this.$route.params.id;

        console.log(personID);
        await this.GetPersonData(personID);
        // this.GetFilms();
    },
    computed: {
        filteredPeople() {
            return this.people.filter(person => {
                return person.name.toLowerCase().indexOf(this.searchName.toLowerCase()) > -1
            })
        }
    },
    watch: {
        person() {
            this.GetFilms();
            this.GetSpecies();
        }
    },
    methods: {
      GetPersonData(personID) {
          axios.get(`https://ghibliapi.herokuapp.com/people/${personID}`).then(resp => {
              this.person = resp.data;
          });
      },
      GetFilms() {
        console.log(this.person.name);
        if(this.person.films) {
          for(let index = 0; index < this.person.films.length; index++) {
              axios.get(this.person.films[index]).then(resp => {
                  this.films.push(resp.data);
              });
          }
        }
      },
      GetSpecies() {
        axios.get(this.person.species).then(resp => {
          this.species = resp.data;
        });
      }
    }

}
</script>

<style>

.person-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
}

.headline {
  margin-bottom: 25px;
}

.person-details {
  background-color: #5c5c5c;
  border: 1px solid #737373;
  border-radius: 15px;
  color: white;
  padding: 25px;
  text-align: left;
  width: 300px;
  margin: auto;
}

.list-item a{
  color: white;
  text-decoration: underline;
}

.white {
  color: white;
}

</style>