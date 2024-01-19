/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />
// import ky from 'ky'
import ky from 'https://esm.sh/ky';

const onAction = new Action('dev.wgrant.homebridge.on');
const offAction = new Action('dev.wgrant.homebridge.off');

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
});


onAction.onKeyDown(async ({ action, context, device, event, payload }) => {
	console.log('Your key code goes here!');
	//testing testing 1,2,3!

	const server = "http://synology.local:8581/api"

	const resp = await ky.post(`${server}/auth/login`, {json: {username: "will", password: "password"}}).json()

	// console.log(resp)

	const headers = {'Authorization': `Bearer ${resp['access_token']}`}
	const opts = {headers: headers}

	const accessories = await ky.get(`${server}/accessories`, opts).json()
	console.log(accessories)

	const devId = "bec025d3874edc92121bbf1dd89c47334cc664c161357351ac642cae168d52d4"
	opts['json'] = {'characteristicType': "On", 'value': 1}

	const resp2 = await ky.put(`${server}/accessories/${devId}`, opts).json()
	console.log(resp2)
});


offAction.onKeyDown(async ({ action, context, device, event, payload }) => {
	console.log('Your key code goes here!');

	const server = "http://synology.local:8581/api"

	const resp = await ky.post(`${server}/auth/login`, {json: {username: "will", password: "password"}}).json()

	// console.log(resp)

	const headers = {'Authorization': `Bearer ${resp['access_token']}`}
	const opts = {headers: headers}

	const accessories = await ky.get(`${server}/accessories`, opts).json()
	console.log(accessories)

	const devId = "bec025d3874edc92121bbf1dd89c47334cc664c161357351ac642cae168d52d4"
	opts['json'] = {'characteristicType': "On", 'value': 0}

	const resp2 = await ky.put(`${server}/accessories/${devId}`, opts).json()
	console.log(resp2)
});


// lightOnAction.onDialRotate(({ action, context, device, event, payload }) => {
// 	console.log('Your dial code goes here!');
// });
