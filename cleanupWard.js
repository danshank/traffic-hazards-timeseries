// db.loadServerScripts();

// function flatten(X) {
// 	db[X].find().forEach(function(x) { db[X].update({_id: x._id}, x.value); });
// }


// var calls = db.serviceCalls;

// db.potholes.drop();
// db.createCollection('potholes');

// calls.mapReduce(
// 	function() {
// 		var potholeTypes = ['BWSC Pothole', 'Request for Pothole Repair', 'Pothole Repair (Internal)'];
// 		if(potholeTypes.indexOf(this.type) === -1 && (this.latitude !== 0 && this.longitude !== 0)) {
// 			emit(this._id, this);
// 		}
// 	},
// 	function(k,v) {},
// 	{out: 'potholes'}
// );

// flatten('potholes');

db.wards.drop();
db.createCollection('wards');

var potholes = db.potholes.find();

potholes.forEach(function(pothole) {
	var ward = pothole.ward;
	if (!ward) return;
	if (typeof ward === 'number') {
		// db.wards.insert(pothole);
		ward = ward.toString();
		// return;
	}

	var wardList = ward.split(' ');
	if (wardList.length === 2) {
		ward = wardList[1];
	} else {
		ward = wardList[0];
	}

	if (ward.substring(0,1) === '0' && ward.length === 2) {
		ward = ward.substring(1);
		// return;
	}
	// if (ward.substring(0, 1) === '0' && ward.length === 2) {
	// return;
	// 	ward = ward.substr(1);
	// } else {
	// 	return;
	// }

	// ward = parseInt(ward);
	pothole.ward = ward;

	db.wards.insert(pothole);

});