<template>
    <div id="overlay">
        <div id="header">
            <span>Lot {{lot}} <i v-if="this.$store.state.isGuest === false" :class="starStyle" @click="favoriteClick"></i></span>
            <i class="fa-solid fa-circle-xmark" @click="closeOverlay"></i>
        </div>
        <div id="type">
            <span>Lot type here - </span>
            <i class="fa-solid fa-exclamation-triangle"></i>
            <p>You can't park here with your pass!</p>
        </div>
        <div id="votes">
            <i class="fa-solid fa-thumbs-up" @click="likes += 1"></i>
            <LikeBar :likes="likes" :dislikes="dislikes" :key="likes+dislikes"/>
            <i class="fa-solid fa-thumbs-down" @click="dislikes += 1"></i>
        </div>
    </div>
</template>

<script lang="ts">
import LikeBar  from "../components/LikeBar.vue";
import { arrayRemove, arrayUnion } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { Vue, Component, Prop } from "vue-property-decorator";
import { db } from "../myconfig";

    @Component({ components: { LikeBar } })
    export default class LotOverlay extends Vue {

        @Prop() lot!: string;
        FavoriteLots:Array<string> = [];
        starStyle = "fa-regular fa-star";
        lotFavorited = false;

        likes = 1;
        dislikes = 1;

        closeOverlay(): void {
            this.$emit("closeOverlay");
        }

        updated(): void {
            this.lotFavorited = false;
            this.checkFavorite();
        }

        // Check if selected lot is favorited
        checkFavorite():void {
            for(let index = 0; index<this.$store.state.favoritedLots.length; index++){
                if(this.$store.state.favoritedLots[index] === this.lot){
                    this.lotFavorited = true;
                }
            }

            if (this.lotFavorited) {
                this.starStyle = "fa-solid fa-star";
            }
            else {
                this.starStyle = "fa-regular fa-star";
            }
        }

        favoriteClick(): void {
            if (this.lotFavorited) {
                this.starStyle = "fa-regular fa-star";
                this.lotFavorited = false;
                this.removeFromFavorites();
            }
            else {
                this.lotFavorited = true;
                this.starStyle = "fa-solid fa-star";
                this.addToFavorites();
            }
        }

        async addToFavorites():Promise<void>{
            console.log(this.$store.state.favoritedLots)
            console.log("clicked");
            const auth = getAuth();
            const userId = auth.currentUser?.uid;

            //add to local array 
            this.FavoriteLots.push(this.lot);
            //add to global array 

            const profileRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
            console.log(this.lot)
            const appendRef = await profileRef.update({
                FavoriteLots: arrayUnion(this.lot)
            }).then(()=>{
                //we call this function to update the global favoriteLots array 
                this.loadFromFirebase();
                console.log(`Added lot ${this.lot} to favorites`);
            });
            
        }

        async removeFromFavorites():Promise<void>{

            const auth = getAuth();
            const userId = auth.currentUser?.uid;

            for(let index = 0; index<this.$store.state.favoritedLots.length; index++){
                if(this.$store.state.favoritedLots[index] === this.lot){
                    const profileRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
                    const appendRef = await profileRef.update({
                        FavoriteLots: arrayRemove(this.lot)
                    }).then(()=>{
                        //we call this function to update the global favoriteLots array 
                        this.loadFromFirebase();
                        console.log(`Removed lot ${this.lot} from favorites`);
                    });
                    }
            }
        }


        async loadFromFirebase():Promise<void>{
    
        if(this.$store.state.guestLogin !== "true"){
            const auth = getAuth();
            const userId = auth.currentUser?.uid;
            
            const profileCollectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
            const doc = await profileCollectionRef.get();
            const collectedData = doc.data();
            if(!collectedData){
                console.log("Could not load favorites!")
            }
            else{
                this.FavoriteLots = collectedData.FavoriteLots
                this.$store.state.favoritedLots = this.FavoriteLots
            }
        }
    }
}
</script>

<style scoped>
    #overlay {
        z-index: 900;
        width: 90vw;
        height: 30vh;
        background-color: white;
        position: absolute;
        bottom: 12vh;
        align-self: center;
        border-radius: 20px;
        display: flex;
    }

    #header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    #header > span {
        margin-left: 3vw;
        margin-top: 1.5vh;
        font-size: 2em;
        font-weight: bold;
    }

    #type {
        display: flex;
        flex-direction: row;
    }

    #votes {
        display: flex;
        flex-direction: row;
        align-self: center;
    }

    #votes > i {
        font-size: 2em;
    }

    .fa-thumbs-up {
        color: lightgreen;
    }

    .fa-thumbs-down {
        color: coral;
    }

    #likebar {
        margin: 10px;
    }

    #type > span {
        margin-left: 3vw;
        margin-top: 1.5vh;
        font-style: italic;
    }

    .fa-exclamation-triangle {
        color: red;
        font-size : 1em;
        margin-top: 1vw;
    }

    .fa-circle-xmark {
        margin-right: 2vw;
        margin-top: 1.3vh;
        font-size: 2em;
        color: gray;
    }

    .fa-star {
        color: #ffc400;
    }
</style>