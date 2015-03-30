game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameOver = false;
	},

	update: function(){
		//exp for winning
		if(game.data.win === true && !this.gameover){
			this.gameOver(true);
		//exp for losing
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
		}
		//console.log(game.data.exp);

		return true;
	},

	gameOver: function(win){
		if (win) {
			game.data.exp += 10;		
		}else{
			game.data.exp += 5;			
		}

		this.gameover = true;
		me.save.exp = game.data.exp;	
		me.save.exp2 = 4;
	}

});