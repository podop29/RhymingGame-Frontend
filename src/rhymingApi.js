import axios from "axios";
import data from "./words"

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

    //**Gets a list of words that rhymes with a specific word */
    static async getRhymesForWord(word){
        let res = await this.request(`words?rel_rhy=${word}`);
        return res

    }

    /**Gets a list of words that rhyme and are related to a specific word */
    static async rhymesWithAndRelatedTo(rhyme,related){
        let res = await this.request(`words?ml=${related}&rel_rhy=${rhyme}&max=1000`);
        return res
    }

    /**Gets a list of size n of random words based on number of passed difficulty */
    static async getListOfRandomWords(size, difficulty){
        let listSize = data.length
        let words = [];
       while(words.length !== size){
        let randWord = data[Math.floor(Math.random() * listSize)]
        if(new_count(randWord) <= difficulty){
           words.push(randWord)
        }
       }
       return words
    }
}


function new_count(word) {
    word = word.toLowerCase();                                    
    if(word.length <= 3) { return 1; }                             
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   
      word = word.replace(/^y/, '');                                
      return word.match(/[aeiouy]{1,2}/g).length;                    
  }



export default RhymingApi