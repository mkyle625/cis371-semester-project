<template>
    <div id="overlay">
        <div id="header">
            <span>Lot {{lot}}</span>
            <i class="fa-solid fa-circle-xmark" @click="closeOverlay"></i>
        </div>
        <div v-if= "this.$store.state.isGuest === false" @click="addToFavorites">
        <span>Add to favorites</span>
      </div>
      <div v-if="this.$store.state.isGuest === false" @click="removeFromFavorites">
          <span>Remove from favorites</span>
      </div>
        <div id="type">
            <span>Lot type here - </span>
            <i class="fa-solid fa-exclamation-triangle"></i>
            <p>You can't park here with your pass!</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { arrayRemove, arrayUnion, FieldValue } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { Vue, Component, Prop } from "vue-property-decorator";
import { db } from "../myconfig";

    @Component
    export default class LotOverlay extends Vue {

        @Prop() lot!: string;
        FavoriteLots:Array<string> = []; 

        closeOverlay(): void {
            this.$emit("closeOverlay");
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
                console.log('saved');
            });
            
    }


        async loadFromFirebase():Promise<void>{
    
        if(this.$store.state.guestLogin !== "true"){
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        
        const profileCollectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
        const doc = await profileCollectionRef.get();
        const collectedData = doc.data();
        if(!collectedData){
            console.log("no matching doc")
        }
        else{
        this.FavoriteLots = collectedData.FavoriteLots
        this.$store.state.favoritedLots = this.FavoriteLots
        console.log("here is on lotOverlay:" + this.$store.state.favoritedLots)
        }
        }
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
                console.log('removed');
            });
         }
         else{
             alert("This lot is not in your favorites!")
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
</style>