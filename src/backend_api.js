import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BackendApi {
    //Token for interacting with api is here
    static token;

    static async request(endpoint, data = {}, method = "get"){
        //Remove later
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BackendApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
        return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
        }
    }

    //Individual api routes

    //              USERS
    /**Get details on a user by username*/
    static async getUser(username){
        let res = await this.request(`users/${username}`);
        return res.user
    }
    

    //**Get all users */
    static async getAllUsers(){
        let res = await this.request("users")
        return res.users
    }

    
    //              Friend Request
    //**Send friend request */
    static async sendFriendRequest(user1,user2){
        let res = await this.request(`users/request/${user1}/${user2}`, {}, 'post');
        return res;
    }

    //**Accept friend request */
    static async acceptFriendRequest(reqId){
        let res = await this.request(`users/request/${reqId}`, {}, 'post')
        return res;
    }

    //**See friend requests */
    static async seeFriendRequest(userId){
        let res = await this.request(`users/request/${userId}`);
        return res.requests;
    }

    //**SEE friends list */
    static async seeFriendsList(userId){
        let res = await this.request(`users/friends/${userId}`);
        return res.friends;
    }
    //**Decline Friend Request */
    static async deleteFriendRequest(reqId){
        let res = await this.request(`users/request/${reqId}`, {}, 'delete');
        return res;
    }
    //Updates userUrl
    static async updateUserUrl(url, userId){
        let res = await this.request(`users/update/url/${userId}/${url}`, {}, 'patch');
        return res;
    }



    //             GAME METHODS
    //**Updates EXp and LVL after a game */
    static async addExp(username, exp){
        let res = await this.request(`users/update/exp/${username}/${exp}`, {}, 'patch');
        return res;
    }
    //**Updates game count and high score */
    static async endGameStatUpdate(username, score){
        let res = await this.request(`users/update/${username}/${score}`, {}, 'patch');
        return res;
    }

    //**get game by id */
    static async getGameById(gameId){
        let res = await this.request(`game/request/game/${gameId}`, {}, 'get');
        return res.requests;
    }

    //**Send game request */
    static async sendGameRequest(user1,user2){
        let res = await this.request(`game/request/${user1}/${user2}`, {}, 'post');
        return res;
    } 

     //**Accept Game request */
     static async acceptGameRequest(reqId){
        let res = await this.request(`game/request/${reqId}`, {}, 'post')
        return res;
    }

     //**See game requests */
     static async seeGameRequest(userId){
        let res = await this.request(`game/request/${userId}`);
        return res.requests;
    }

    //**See all finished game by user id */
    static async seeFinishedGames(userId){
        let res = await this.request(`game/request/finished/${userId}`);
        return res.requests;
    }

    //**Decline Game Request */
    static async declineGameRequest(reqId){
        let res = await this.request(`game/request/${reqId}`, {}, 'delete');
        return res;
    }

    static async endOfRoundUpdate(gameId, score){
        let res = await this.request(`game/update/${gameId}/${score}`, {}, 'patch');
        return res;

    }



    //            LOGIN and register
    //**Login User */
    static async login(userData){
        let res = await this.request(`auth/token`, userData, 'post');
        return res;
    }

    /**Register new user */
    static async register(userData){
            let res = await this.request(`auth/register`, userData, 'post');
            return res;
        }
        

}

BackendApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RBZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODc2NTExNn0.UIsyBJPfthPZQ9xRp3sVH7H3C4vgaWB9aTNg_GZMqcI";

export default BackendApi