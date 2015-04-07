game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameOver = false;
	},

	update: function(){
		//exp for winning
		if(game.data.win === true && !this.gameover){
			this.gameOver(true);
			alert("You done did win try-hard!");
		//exp for losing
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
			alert("You lost scrub, ur team got 720 so-scoped by faze klan lel");
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
	
			$.ajax({
				type: "POST",
				url:"php/controller/save-user.php",
				data: {
					exp: game.data.exp,
					exp1: game.data.exp1,
					exp2: game.data.exp2,
					exp3: game.data.exp3,
					exp4: game.data.exp4,

				},
				dataType: "text"
			})
			.success(function(response){
				if (response==="true") {
					me.state.change(me.state.MENU);
				}else{
					alert(response);
				}
			})
			.fail(function(response){
				alert("It done did failededed lel. U wot M8?");
			});

	}

});