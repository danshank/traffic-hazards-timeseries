db.loadServerScripts();

function flatten(X) {
	db[X].find().forEach(function(x) { db[X].update({_id: x._id}, x.value); });
}


var calls = db.wards;

db.formattedtime.drop();
db.createCollection('formattedtime');
calls.mapReduce(
	function() {
		var open = new Date(this.open_dt);
		var closed = new Date(this.closed_dt);

		if(this.case_status == "Closed") {
			var diff = closed - open;
		} else {
			var diff = 1461547800000 - open;
		}
		this.date_diff = diff;
		if(!(diff <= 0)) {
			emit(this._id, this)
		} 
		
	},
	function(k,v) {},
	{out: 'formattedtime'}
);

flatten('formattedtime');
