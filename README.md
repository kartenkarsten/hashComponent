# Hash Component

Hash Component lets you to add dynamic URL hashes to web pages with eg. the position of your current Leaflet map view. You can easily
link users to specific map views.

### Demo
You can view a demo of HashComponent at [http://kartenkarsten.github.io/hashComponent/demo](http://kartenkarsten.github.io/hashComponent/demo/index.html).

### Getting started

1. Prepare a basic leaflet map. You can find instructions on [Leaflet's quick-start guide](http://leaflet.cloudmade.com/examples/quick-start.html).

2. Include core [hash-component.js](https://github.com/kartenkarsten/hashComponent/blob/master/hash-component.js).

2. Include a connector for map position [mapposition-hash-connector.js](https://github.com/kartenkarsten/hashComponent/blob/master/mapposition-hash-connector.js).

3. Once you have initialized the map (an instance of [L.Map](http://leaflet.cloudmade.com/reference.html#map-usage)), add the following code:

	```javascript
        // Assuming your map instance is in a variable called map
		var hash = new HashComponent();
    ```
	and for map position Connector:
	```javascript
        // Assuming your map instance is in a variable called map
		var connector = new L.MapPositionConnector(map,hash);
    ```

### Author
[@mlevans](http://github.com/mlevans)
[@kartenkarsten](http://github.com/kartenkarsten)

### License

MIT License. See [LICENSE](https://github.com/kartenkarsten/leaflet-hash/blob/master/LICENSE.md) for details.
