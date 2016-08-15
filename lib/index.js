var Promise = require('bluebird');
var icloud = Promise.promisfyAll(require("find-my-iphone").findmyphone);
var config = require('config.js');

var device;

if (config.credentials.password != null) {
    console.log('Password in config must be null');
    process.exit(1);
} else {
    config.credentials.password = new Buffer.from(config.credentials.passwenc, 'base64').toString('ascii');
}

// xfer the creds
icloud.apple_id = config.credentials.username;
icloud.password = config.credentials.password;

icloud.getDevicesAsync().then;

function parseDevices() {
	return new Promise(function(resolve, reject) {
		parseDevicesCallback(error, devices) {
			if (error) {
				reject error;
			}
		}
	}
}

function getDevicesCallback(error, devices) {
    if (error) {
        throw error;
    }

    devices.forEach(function(d) {
        if (device == null && d.id == config.credentials.id) {
            device = d;
        }
	});

    if (device) {
        startJob(device);
    } else {
        console.log('device not found');
    }

}

function startJob(device) {
	while (true) {

	}
}
