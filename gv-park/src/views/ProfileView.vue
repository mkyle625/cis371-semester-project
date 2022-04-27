<template>
  <div>
      <GuestLogin v-if="this.$store.state.isGuest === true"></GuestLogin>
      <div v-else class = profileViewContainer> 
            <img class="profile_image" :src="userPhotoURL" v-if="userPhotoURL.length > 0" width="100">
            <div class="profile_data">
                <h1>{{userInfo}}</h1>
                <h2>Parking pass <i class="fa-solid fa-ticket-simple"></i></h2>
                <p>{{parkingPassType}}<p>
                <h2>Total votes <i class="fa-solid fa-thumbs-up"></i></h2>
                <p>You have voted {{totalUserVotes}} times</p>
                <h2>Favorite lots <i class="fa-solid fa-star"></i></h2>
                <div id="favoritelots">
                    <span v-for="lot in favoriteLots" :key="`lot-${lot.name}-${lot}`">{{lot}} </span>
                </div>
                <h2>Badges <i class="fa-solid fa-award"></i></h2>
                <div id="badges">
                    <span v-for="badge in userBadges" :key="badge">
                       {{ badge }}
                        </span>
                </div> 
            <!-- <button id ="testBtn" @click = "saveToFirebase">test save data</button> -->
            </div>

         
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import NavBar from "../components/NavBar.vue";
    import GuestLogin from "../components/GuestLogin.vue";
    import {
        Auth,
        getAuth,
        onAuthStateChanged,
        User,
    } from "firebase/auth";
    
    import {db} from "../myconfig"
    @Component({ components: { NavBar, GuestLogin } })
    export default class ProfileView extends Vue {
        
    userPhotoURL = "";
    auth: Auth | null = null;
    userInfo = "";
    parkingPassType="";
    totalUserVotes = 0;
    favoriteLots:Array<string>=[];
    //userBadges:Array<any>=[];
    userBadges:Array<string>=[];


   
    mounted() : void {
        this.loadFromFirebase()
        console.log("Logged in as guest: " + this.$store.state.isGuest);
        this.auth = getAuth();
        onAuthStateChanged(this.auth, (user: User | null) => {
        console.log("Auth changed", user);
        if (user) {
            this.userPhotoURL = user.photoURL ?? "";
            this.userInfo = `${user.displayName ?? "No Name"}`;
        }
        });
    }



 

    //this function right now is useless, until we decide if the user can change some types such as parkingPass type which is probable.
    async saveToFirebase():Promise<void>{
        if(this.$store.state.guestLogin !== 'True'){
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        const data = {
            //actual data to be stored, right now just using dummyData because we dont have a way to change these values yet
            // parkingPassType: this.parkingPassType,
            // TotalVotes:this.totalUserVotes,
            // FavoriteLots:this.favoriteLots,
            // Badges:this.userBadges,

            //dummy data 
            parkingPassType: "Student commuter pass",
            TotalVotes:14,
            FavoriteLots:"Allendale Lot C1",
            //will be image later on 
            Badges:"Super voter badge!",
        };

        const profileCollectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
        await profileCollectionRef.set(data).then(() => {
            console.log("Saved!!");
        });
        }
    }

    async loadFromFirebase():Promise<void>{
        console.log("HERE:")
        console.log(this.$store.state.guestLogin);
        if(this.$store.state.guestLogin !== "true"){
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        
        const profileCollectionRef = db.collection("USERS").doc(userId).collection("Profile Info").doc("ProfileView");
        const doc = await profileCollectionRef.get();
        const collectedData = doc.data();
        console.log(collectedData);
        if(!collectedData){
            console.log("no matching doc")
        }
        else{
        this.parkingPassType = collectedData.parkingPassType;
        this.totalUserVotes = collectedData.TotalVotes;
        this.favoriteLots = collectedData.FavoriteLots;
        


        //any user not logged in as guest will be granted verified badge
        this.userBadges.push("Verified")
        //as long as loadFirebase is only ran once in this file, there should be no duplicate badges
        if(this.totalUserVotes >= 10){
            this.userBadges.push("Bronze Voter ")
            
        }
        if(this.totalUserVotes >= 25){
            this.userBadges.push("Silver Voter")
        }
        if (this.totalUserVotes >=50){
            this.userBadges.push("Gold Voter")
        }
        


        }


        }
    }
    }


    


</script>

<style scoped>
.profile_image {
    border-radius: 100px;
}

.profile_data {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    min-width: 70%;
}

.profileViewContainer {
    height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2vh;
    padding-top: 2vh;
}
.profile_data > h2{
    margin-bottom: 0.5vh;
    margin-top: 4vh;
    font-size: 20px;
    align-self: left;
    color: #026eb1
}
.profile_data > p{
    margin-bottom: 1px;
}
.profile_data > h1{
    margin-bottom: 3vh;
    text-align: center;
}

.btn {
    border-radius: 20px;
}
#LogoutBtn {
    color: #0065a4;
    margin-bottom: 1vh;
    margin-top: 8vh;

}

#LogoutBtn > span {
    font-size: 4vh;
}

#testBtn {
    margin-top: 2vh;
}

#favoritelots {
    display: flex;
    flex-direction: row;
}

#favoritelots > span {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #0065a4;
    color: white;
    border-radius: 10px;
    font-weight: bold;
}



#badges {
    display: flex;
    flex-direction: row;
}

#badges > span {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #0065a4;
    color: white;
    border-radius: 10px;
    font-weight: bold;
}
</style>

 