import axios from "axios";

const BASE_URL = `https://api.datamuse.com/`

class RhymingApi{


    static async request(endpoint){
        const url = `${BASE_URL}${endpoint}`
        try {
            return (await axios({ url })).data;
            } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
            }
    }


    static async getRhymesForWord(word){
        let res = await this.request(`words?rel_rhy=${word}`);
        return res

    }

    static async rhymesWithAndRelatedTo(rhyme,related){
        let res = await this.request(`words?ml=${related}&rel_rhy=${rhyme}&max=1000`);
        return res
    }
}


export default RhymingApi