<template>
    <div id="overlay">
        <div id="header">
            <span>Lot {{lot}} <i class="fa-solid fa-plus" @click="addToFavorites"></i><i class="fa-solid fa-minus" @click="removeFromFavorites"></i></span>
            <!-- <i v-if="this.$store.state.isGuest === false" :class="starStyle" @click="favoriteClick"></i> -->
            <i class="fa-solid fa-circle-xmark" @click="closeOverlay"></i>
        </div>
        <div id="lotStatus">
            <p style="display:inline-block; margin-right:4px">Status:</p> 
            <p style="display:inline-block" v-bind:style="styleLot === 'Green' ?  'background-color:green; color:white' 
            : styleLot==='Red' ?  'background-color:red; color:white;' :'background-color:yellow; '"> {{lotStatus}}</p>
           
        </div>
        <!-- <div id="type">
            <span>Lot type here - </span>
            <i class="fa-solid fa-exclamation-triangle"></i>
            <p>You can't park here with your pass!</p>
        </div> -->
        <div id="votes">
            <i class="fa-solid fa-thumbs-up" @click="storeLikesinFirebase()"></i>
            <i class="fa-solid fa-thumbs-down" @click="storeDislikesinFirebase()"></i>
        </div>
        <LikeBar :likes="likes" :dislikes="dislikes" :key="likes+dislikes"/>
    </div>
</template>

<script lang="ts">
import LikeBar  from "../components/LikeBar.vue";
import { arrayRemove, arrayUnion, FieldValue, increment } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { Vue, Component, Prop } from "vue-property-decorator";
import { db } from "../myconfig";

    @Component({ components: { LikeBar } })
    export default class LotOverlay extends Vue {

        @Prop() lot!: string;
        FavoriteLots:Array<string> = [];
        lotFavorited = false;

        likes = 1;
        dislikes = 1;
        lotStatus = ''
        totalVoteSum= 0; 
        styleLot='';

        
        updated(): void {
            this.loadFromFirebase();
            // Create listener
            db.collection("Parking Lot data").doc("lots").collection(this.lot).doc("lotdata").onSnapshot(res => {
                this.loadFromFirebase();
            })


            this.totalVoteSum = this.likes + this.dislikes
            const likeVotePercent = this.calcPercentage(this.likes,this.totalVoteSum)
            console.log(likeVotePercent);
            if(likeVotePercent > 50){
                this.lotStatus = 'Good' 
                this.styleLot = 'Green'
            }
            else if(likeVotePercent === 50){
                this.lotStatus = 'Fair'
                this.styleLot = 'Yellow'
            }
            else if(likeVotePercent < 50){
                this.lotStatus ='Poor'
                this.styleLot = 'Red'
            }
        }

        beforeUpdate(): void {
           const unsub = db.collection("Parking Lot data").doc("lots").collection(this.lot).doc("lotdata").onSnapshot(() => {/* Remove listener */});
            unsub();
        }

        closeOverlay(): void {
            this.$emit("closeOverlay");
        }

        calcPercentage(partialVal:number, totalVal:number){
            return (100*partialVal) / totalVal;
        }

        async addToFavorites():Promise<void>{
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
                window.alert(`Lot ${this.lot} added to your favorites!`);
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
                        window.alert(`Lot ${this.lot} removed from your favorites.`);
                    });
                }
            }
        }

        async storeLikesinFirebase():Promise<void>{
            this.loadFromFirebase();
            this.likes +=1; 
            const data = { 
                likes: this.likes
            }
            
             const ref = db.collection("Parking Lot data").doc("lots").collection(this.lot).doc("lotdata")
             const sendRef = await ref.set(data, {merge: true}).then(() =>{
                 console.log('likes stored in firebase')
                  //call load so we can update this.likes var
             });



             if(this.$store.state.guestLogin !== "true"){
            const auth = getAuth();
            const userId = auth.currentUser?.uid;
            //additional check to make sure guest is not logged in, for some reason the above if statement doesnt seem to constrict guests 
            if(typeof userId !== 'undefined'){
            const profileCollectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
            //increment is a built in firebase func 
            const inc = increment(1)
            profileCollectionRef.update({TotalVotes: inc})
            }
             }

        }

        async storeDislikesinFirebase():Promise<void>{
            this.loadFromFirebase();
            this.dislikes+=1; 
            const data = { 
                dislikes: this.dislikes
            }
            

             const r = db.collection("Parking Lot data").doc("lots").collection(this.lot).doc("lotdata")
             const sendr = await r.set(data, {merge: true}).then(() =>{
                 console.log('dislikes stored in firebase')

             });

             if(this.$store.state.guestLogin !== "true"){
            
            const auth = getAuth();
            const userId = auth.currentUser?.uid;
            //additional check to make sure guest is not logged in, for some reason the above if statement doesnt seem to constrict guests 
            if(typeof userId !== 'undefined'){
            console.log(userId);
            const profileCollectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
            //increment is a built in firebase func 
            const inc = increment(1)
            profileCollectionRef.update({TotalVotes: inc})
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

            const lotRef = db.collection("Parking Lot data").doc("lots").collection(this.lot).doc("lotdata")
            const lotData = await lotRef.get(); 
            const collectedLotData = lotData.data(); 
            if(!collectedLotData){
                console.log("ERROR: could not fetch likes for " + this.lot); 
            }
            else{ 
        
                if(collectedLotData.likes > 0){
                    this.likes = collectedLotData.likes
                }
                else{ 
                    //if likes dont exist in firebase just init to 1
                    //this.likes =1; 
                }
                if(collectedLotData.dislikes > 0){
                    this.dislikes = collectedLotData.dislikes
                }
                else{
                    //this.dislikes=1;
                }
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
        margin: 0 5px 5px 5px;
        color: whitesmoke;
        padding: 10px;
        border-radius: 20px;
    }

    #votes > i {
        font-size: 2em;
    }

    .fa-thumbs-up {
        background-color: #84da84;
    }

    .fa-thumbs-down {
        background-color: coral;
    }

    #likebar {
        align-self: center;
        margin: 10px;
    }

    #type > span {
        margin-left: 3vw;
        margin-top: 1.5vh;
        font-style: italic;
    }

    #lotStatus {
        margin-left: 4vw;
    }

    #lotStatus > p:last-of-type {
        padding: 0.5vh 1vw;
        border-radius: 10px;
        font-weight: bold;
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

    .fa-plus, .fa-minus {
        color: gray;
    }
</style>