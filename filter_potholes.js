db.loadServerScripts();

function flatten(X) {
	db[X].find().forEach(function(x) { db[X].update({_id: x._id}, x.value); });
}


var calls = db.serviceCalls;

db.potholes.drop();
db.createCollection('potholes');
calls.mapReduce(
	function() {
		var potholeTypes = ['BWSC Pothole', 'Request for Pothole Repair', 'Pothole Repair (Internal)'];
		if(potholeTypes.indexOf(this.type) !== -1 && (this.latitude !== 0 && this.longitude !== 0)) {
			emit(this._id, this);
		}
	},
	function(k,v) {},
	{out: 'potholes'}
);

flatten('potholes');
