game.TitleScreen = me.ScreenObject.extend({	
	   
	//action to perform on state change

	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		me.audio.playTrack("title");


		game.data.option1 = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Ariel", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Warriors of Java", 400, 130);
				this.font.draw(renderer.getContext(), "Begin New Conquest", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
				//why am i mising code?
				me.state.change(me.state.NEW);
			}
		})));

		me.game.world.addChild(game.data.option);

		game.data.option2 = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				this.font = new me.Font("Impact", 46, "black");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Continue Conquest", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
			//something has to go here (?)				
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.LOAD);
			}
		}));

		me.game.world.addChild(game.data.option2);

	},
	
	//action to perform when leaving this screen (state change)

	onDestroyEvent: function() {

		me.audio.stopTrack("title");
	}
});
