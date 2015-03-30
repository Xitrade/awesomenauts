game.LoadProfile = me.ScreenObject.extend({	
	   
	//action to perform on state change

	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10);
		//me.audio.playTrack("spend");

		me.input.unbindKey(me.input.KEY.A);
		me.input.unbindKey(me.input.KEY.S);
		me.input.unbindKey(me.input.KEY.D);
		me.input.unbindKey(me.input.KEY.Z);
		me.input.unbindKey(me.input.KEY.B);

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Times New Roman", 36, "darkred");
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Enter Username And Password", this.pos.x, this.pos.y);

			}


		})));


	},
	
	//action to perform when leaving this screen (state change)

	onDestroyEvent: function() {
	}
});