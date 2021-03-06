game.NewProfile = me.ScreenObject.extend({	
	   
	//action to perform on state change

	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10);
		//me.audio.playTrack("spend");
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";

		me.input.unbindKey(me.input.KEY.A);
		me.input.unbindKey(me.input.KEY.S);
		me.input.unbindKey(me.input.KEY.D);
		me.input.unbindKey(me.input.KEY.Z);
		me.input.unbindKey(me.input.KEY.B);

		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Times New Roman", 36, "darkgreen");
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Pick A Username And Password", this.pos.x, this.pos.y);

			}


		})));


	},
	
	//action to perform when leaving this screen (state change)

	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register").style.visibility = "hidden";
	}
});