(function(window) {
	var HAS_HASHCHANGE = (function() {
		var doc_mode = window.documentMode;
		return ('onhashchange' in window) &&
			(doc_mode === undefined || doc_mode > 7);
	})();

	L.Hash = function(map) {
		this.onHashChange = L.Util.bind(this.onHashChange, this);

		if (map) {
			this.init(map);
		}
	};

	L.Hash.prototype = {
		map: null,
		lastHash: null,

		lastHashParts: new Array(),
		hashPartConnectors: new Array(),

		init: function(map) {
			this.map = map;

			// reset the hash
			this.lastHash = null;
			this.onHashChange();

			if (!this.isListening) {
				this.startListening();
			}
		},

		removeFrom: function(map) {
			if (this.changeTimeout) {
				clearTimeout(this.changeTimeout);
			}

			if (this.isListening) {
				this.stopListening();
			}

			this.map = null;
		},

		registerHashPartConnector: function(connector) {
			var idx = this.hashPartConnectors.length;
			this.hashPartConnectors[idx] = connector;
			return idx;
		},

		// called by connector 
		updateHashPart: function(e) {
			// bail if the map is not yet loaded
			if (!this.map._loaded) {
				return false;
			}

			//error handling
			if (!e.data || e.idx<0 || e.idx>this.hashPartConnectors.length) {
				console.log("ERROR: invalid index");
				return;
			}
			this.lastHashParts[e.idx] = e.data;
			var hash = "#" + this.lastHashParts.join("/");

			console.log("hash will be set to:",hash);
			if (this.lastHash != hash) {
				location.replace(hash);
				this.lastHash = hash;
			}
		},

		update: function() {
			var hash = location.hash;
			if (hash === this.lastHash) {
				return;
			}
			if(hash.indexOf('#') === 0) {
				hash = hash.substr(1);
			}

			var hashParts = hash.split("/");
			if (hashParts.length != this.hashPartConnectors.length) {
				console.log("can not call hashPartConnector because hash has invalid part count");
				return;
			}
			for (var i=0; i<hashParts.length; i++) {
				if (hashParts[i] === this.lastHashParts[i]) {
					// if hashPart is unchanged
					continue;
				}else{
					// call hashPartChancedListener with updated hash part
					this.hashPartConnectors[i].applyHash(hashParts[i]);
				}
			}
		},

		// defer hash change updates every 100ms
		changeDefer: 100,
		changeTimeout: null,
		onHashChange: function() {
			// throttle calls to update() so that they only happen every
			// `changeDefer` ms
			if (!this.changeTimeout) {
				var that = this;
				this.changeTimeout = setTimeout(function() {
					that.update();
					that.changeTimeout = null;
				}, this.changeDefer);
			}
		},

		isListening: false,
		hashChangeInterval: null,
		startListening: function() {
			if (HAS_HASHCHANGE) {
				L.DomEvent.addListener(window, "hashchange", this.onHashChange);
			} else {
				clearInterval(this.hashChangeInterval);
				this.hashChangeInterval = setInterval(this.onHashChange, 50);
			}
			this.isListening = true;
		},

		stopListening: function() {
			if (HAS_HASHCHANGE) {
				L.DomEvent.removeListener(window, "hashchange", this.onHashChange);
			} else {
				clearInterval(this.hashChangeInterval);
			}
			this.isListening = false;
		}
	};
	L.hash = function(map) {
		return new L.Hash(map);
	};
})(window);
