import axios from 'axios';

export default {
    methods: {
        getFilmsPlayedIn(url){
            axios.get(url).then(resp => {
                return resp.data;
            });
        }
    }
}