/*
 * BoilerPlate to Connect a Leaflet Map action with Hash Component
 */
L.SimpleHashConnector = function(map, storage) {

	if (map && storage) {
		this.init(map, storage);
	}
};

L.SimpleHashConnector.formatHash = function(data) {
	console.log("format hash part");
	var hash = "";
	return hash;
}

L.SimpleHashConnector.parseHash = function(hash) {
	console.log("parse hash part");
}

L.SimpleHashConnector.prototype = {
	map: null,
	storage: null,
	idx:null,
	lastHash: null,

	parseHash: L.SimpleHashConnector.parseHash,
	formatHash: L.SimpleHashConnector.formatHash,


	init: function(map, storage) {
		this.map = map;
		this.storage = storage;

		// reset the hash
		this.lastHash = null;
		// register to be called after hash changed
		this.idx = this.storage.registerHashPartConnector(this);

		if (!this.isListening) {
			this.startListening();
		}
	},

	applyHash: function(hash) {
		console.log("apply",hash);
		if (hash == "") return;
		var data = this.parseHash(hash);
		this.applingHash = true;
		// TODO apply data here
		this.applingHash = false;
	},

	onEventOccurred: function(e) {
		if (this.applingHash) {
			return false;
		}
		var dataString = this.formatHash(e);

		if (this.storage) {
			this.storage.updateHashPart({idx:this.idx,data:dataString});
		}
	},

	isListening: false,
	startListening: function() {
		//TODO change event to react
		//map.on('measure:finishedpath', this.onEventOccurred, this);
		this.isListening = true;
	},
	stopListening: function() {
		//TODO change event to react
		//map.off('measure:finishedpath', this.onEventOccurred, this);
		this.isListening = false;
	}
};
L.simpleHashConnector = function(map) {
	return new L.SimpleHashConnector(map);
};
