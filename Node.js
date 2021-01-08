
class node{

    constructor(){
        this.yall = new Array(8);
        this.turn_on= true;
        this.visit= false;
        this.color = new Array(8);
        for(var i=1 ; i<8; i++){
            this.yall[i]=false;
        }
    }
    colorYall(color,index){
        this.color[index]=color;
    }
    colorYall(index){
        return this.color[index];
    }
    ////////////////////////////////////////////////
    setYall(yall,index){
        this.yall[index]=yall;
    }
    getYall(index){
        return this.yall[index];
    }
    //////////////////////////////////////////////
    setTurn_on(turn_on){
        this.turn_on=turn_on;
    }
    getTurn_on(){
        return this.turn_on;
    }
    setVisit(visit){
        this.visit=visit;
    }
    getVisit(){
        return this.visit;
    }
}
