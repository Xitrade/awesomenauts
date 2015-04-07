game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 860,
			length: 500,
			spritewidth: "860",
			spriteheight: "500",
			getShape: function(){
				return (new me.Rect(0, 0, 860, 500)).toPolygon();
			}

		}]);
		this.floating = true;
		
	}
});
