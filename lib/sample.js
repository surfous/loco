const util = require('util');
var icloud = require("find-my-iphone").findmyphone;
var tough = require('tough-cookie');

icloud.apple_id = "steve@jobs.com";
icloud.password = "oneMoreThing";

f_device = `{ id: 'R8okBAkNhSXqLoJEVhyJVkvHLyPr2jgA75syLz9eOOFw98WyndG6uFtOn7sJNyd2AAHG+bpxJn/dY6Nb4ELBSn7iUkkK7fhQjHJ5A72nXP8CpVYsXRm4ag==',
  name: 'Franco\'s iPhone',
  deviceModel: 'iphone7plus-2-2-0',
  modelDisplayName: 'iPhone',
  deviceDisplayName: 'iPhone 7 Plus',
  batteryLevel: 0.38,
  isLocating: false,
  lostModeCapable: true,
  location:
   { timeStamp: 1475095361158,
     isOld: true,
     isInaccurate: false,
     locationFinished: false,
     positionType: 'GPS',
     latitude: 37.01337296015518,
     horizontalAccuracy: 16,
     locationType: null,
     longitude: -121.5684259549119 }`;
k_device = `{ id: 'j2dJ4IRMC+LHWiQRzi1nYPyUueJeiO2Wa5f/1Miym18Xniz7e1tMg+HYVNSUzmWV',
  name: 'Kevin\'s 7plus',
  deviceModel: 'iphone7plus-2-2-0',
  modelDisplayName: 'iPhone',
  deviceDisplayName: 'iPhone 7 Plus',
  batteryLevel: 0,
  isLocating: true,
  lostModeCapable: true,
  location:
   { timeStamp: 1475095399332,
     isOld: true,
     isInaccurate: false,
     locationFinished: true,
     positionType: 'Wifi',
     latitude: 37.40227338505785,
     horizontalAccuracy: 65,
     locationType: null,
     longitude: -122.0482470826554 } }`;
//device = f_device;

listDevices();

console.log(util.inspect(icloud.jar._jar));

function listDevices() {
	icloud.getDevices(function(error, devices) {
		var device;

		if (error) {
			throw error;
		}
		//pick a device with location and findMyPhone enabled
		devices.forEach(function(d) {
			var hasLocation = false;
			if (d.location) {
				hasLocation = true;
			}
			console.info(d.name + "; Batt: " + d.batteryLevel + "; location? " + hasLocation + "\n\tID: " + d.id);
		});
	});
};

function getDevices() {
	icloud.getDevices(function(error, devices) {
		var device;

		if (error) {
			throw error;
		}
		//pick a device with location and findMyPhone enabled
		devices.forEach(function(d) {
			if (device == undefined && d.location && d.lostModeCapable && d.id == deviceid) {
				device = d;
			}
			console.log(util.inspect(d, false, null) + "\n");
		});

		if (device) {

			//gets the distance of the device from my location
			var myLatitude = 38.8977;
			var myLongitude = -77.0366;

			icloud.getDistanceOfDevice(device, myLatitude, myLongitude, function(err, result) {
				console.log("Distance: " + result.distance.text);
				console.log("Driving time: " + result.duration.text);
			});


			icloud.getLocationOfDevice(device, function(err, location) {
				console.log(location);
			});
		}
	});
};
