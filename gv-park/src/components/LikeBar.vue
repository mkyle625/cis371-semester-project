<template>
    <div id="likebar">
        <div id="likes" :style="width(this.likesPct)">
            <span>{{likes}}</span>
        </div>
        <div id="dislikes" :style="width(this.dislikesPct)">
            <span>{{dislikes}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LikeBar extends Vue {
  @Prop() likes!: number;
  @Prop() dislikes!: number;

  total = 0;
  likesPct = 0;
  dislikesPct= 0;

  created(): void {
      //console.log(`Creating likebar with ${this.likes} likes and ${this.dislikes} dislikes`);
      this.calculate();
  }
  
  beforeUpdate(): void {
      this.calculate();
  }

  calculate(): void {
      this.total = this.likes + this.dislikes;
      this.likesPct = (this.likes / this.total) * 100;
      this.dislikesPct = (this.dislikes / this.total) * 100;
      //console.log(`Likes(Pct)\tDislikes(Pct)\n${this.likes}(${this.likesPct})\t${this.dislikes}(${this.dislikesPct})`);
  }

    width(amount: number): string {
        return `width: ${amount}%`
    }
}
</script>

<style scoped>
    #likebar {
        background-color: lightgray;
        height: 3vh;
        width: 80vw;
        overflow: hidden;
        border-radius: 20px;
    }

    #likes, #dislikes { 
        height: 100%;
        display: inline-block;
    }

    #likes {
        background-color: lightgreen;
    }

    #dislikes {
        background-color: lightcoral;
    }

    div {
        text-align: center;
    }

    div > span {
        height: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 15px;
    }
</style>