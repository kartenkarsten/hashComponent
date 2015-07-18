
L.MapPositionConnector = function(map, storage) {

	if (map && storage) {
		this.init(map, storage);
	}
};

L.MapPositionConnector.formatHash = function(data) {
	console.log("format hash part");
	var center = map.getCenter(),
	zoom = map.getZoom(),
	precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

	var hash = [zoom,
		center.lat.toFixed(precision),
		center.lng.toFixed(precision)
		].join(";");
	return hash;
}

L.MapPositionConnector.parseHash = function(hash) {
	console.log("parse hash part");
	var args = hash.split(";");
	if (args.length = 3) {
		var zoom = parseInt(args[0], 10),
			lat = parseFloat(args[1]),
			lon = parseFloat(args[2]);
		if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
			return false;
		} else {
			return {
				center: new L.LatLng(lat, lon),
				zoom: zoom
			};
		}
	} else {
			return false;
		}
}

L.MapPositionConnector.prototype = {
	map: null,
	storage: null,
	idx:null,
	lastHash: null,

	parseHash: L.MapPositionConnector.parseHash,
	formatHash: L.MapPositionConnector.formatHash,


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
		// apply data here
		this.map.setView(data.center, data.zoom);
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
		map.on('moveend', this.onEventOccurred, this);
		this.isListening = true;
	},
	stopListening: function() {
		map.off('moveend', this.onEventOccurred, this);
		this.isListening = false;
	}
};
L.mapPositionConnector = function(map) {
	return new L.MapPositionConnector(map);
};
