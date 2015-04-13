game.SpendGold = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastBuy = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
		this.buying = false;
	},

	update: function(){
		this.now = new Date().getTime();
		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
			}else{
				this.stopBuying();
			}

		}

		this.checkBuyKeys();

		return true;
	},

	startBuying: function(){
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);
		me.state.pause(me.state.PLAY);
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();
	},

	setBuyText: function(){
		game.data.buytext = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Times New Roman", 36, "lightgreen");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Press F1-F6 To Buy  B To Exit  Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "F1- A (Skillshot) Skill Upgrade" + game.data.exp1 +" Cost: " + ((game.data.exp1+1)*10), this.pos.x, this.pos.y + 40);
				this.font.draw(renderer.getContext(), "F2- S (Summon/Health Buff/Regen Health) Skill Upgrade" + game.data.exp2 +" Cost: " + ((game.data.exp2+1)*10), this.pos.x, this.pos.y + 80);
				this.font.draw(renderer.getContext(), "F3- D (Ultamite) Skill Upgrade" + game.data.exp3 +" Cost: " + ((game.data.exp3+1)*10), this.pos.x, this.pos.y + 120);
				this.font.draw(renderer.getContext(), "F4- Increase Speed " + game.data.exp4 +" Cost: " + ((game.data.exp4+1)*10), this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "F5- Increase Damage " + game.data.exp5 +" Cost: " + ((game.data.exp5+1)*10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F6- Increase Health " + game.data.exp6 +" Cost: " + ((game.data.exp6+1)*10), this.pos.x, this.pos.y + 240);

			}


		}));
		me.game.world.addChild(game.data.buytext, 35);
	},

	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.game.world.removeChild(game.data.buyscreen);
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
	},

	checkBuyKeys: function(){
		if (me.input.isKeyPressed("F1")) {
			if (this.checkCost(1)){
				this.makePurchase(1);
			}
		}else if (me.input.isKeyPressed("F2")){
			if (this.checkCost(2)){
				this.makePurchase(2);
			}
		}else if (me.input.isKeyPressed("F3")){
			if (this.checkCost(3)){
				this.makePurchase(3);
			}
		}else if (me.input.isKeyPressed("F4")){
			if (this.checkCost(4)){
				this.makePurchase(4);
			}
		}else if (me.input.isKeyPressed("F5")){
			if (this.checkCost(5)){
				this.makePurchase(5);
			}
		}else if (me.input.isKeyPressed("F6")){
			if (this.checkCost(6)){
				this.makePurchase(6);
			}
		}
	},

	checkCost: function(skill){
		if(skill===1 && (game.data.gold >= ((game.data.exp1+1)*10))){
			return true;
		}else if(skill===2 && (game.data.gold >= ((game.data.exp2+1)*10))){
			return true;
		}else if(skill===3 && (game.data.gold >= ((game.data.exp3+1)*10))){
			return true;
		}else if(skill===4 && (game.data.gold >= ((game.data.exp4+1)*10))){
			return true;
		}else if(skill===5 && (game.data.gold >= ((game.data.exp5+1)*10))){
			return true;
		}else if(skill===6 && (game.data.gold >= ((game.data.exp6+1)*10))){
			return true;
		}else{
			return false;
		}
	},

	makePurchase:function(skill){
		if (skill === 1){
			game.data.gold -= ((game.data.exp1 + 1)* 10);
			game.data.exp1 += 1;
			game.data.playerAttack += 7;
		}else if (skill === 2) {
			game.data.gold -= ((game.data.exp2 + 1)* 10);
			game.data.exp2 += 1;
		}else if (skill === 3) {
			game.data.gold -= ((game.data.exp3 + 1)* 10);
			game.data.exp3 += 1;
		}else if (skill === 4) {
			game.data.gold -= ((game.data.exp4 + 1)* 10);
			game.data.exp4 += 1;
		}else if (skill === 5) {
			game.data.gold -= ((game.data.exp5 + 1)* 10);
			game.data.exp5 += 1;
		}else if (skill === 6) {
			game.data.gold -= ((game.data.exp6 + 1)* 10);
			game.data.exp6 += 1;
		}
	}

});