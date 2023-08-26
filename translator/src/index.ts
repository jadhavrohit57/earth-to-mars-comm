import { createClient, RedisClientType } from 'redis';
import { Translate } from './helper';

(async () => {
	const trans = new Translate();

	// create redis pub sub clients
	const publisher = createClient({
		url: 'redis://localhost:6379' // redis docker container url
	});

	const subscriber = publisher.duplicate();

	await publisher.connect();
	await subscriber.connect();

	// subscribe for channel from earth
	subscriber.subscribe('from-earth', (data) => {
		console.log('from-earth', data);

		// transfer to mars
		const translatedMsg = trans.translateFromEarthToMars(data);
		publisher.publish('toMars', translatedMsg);
	});

	subscriber.subscribe('from-mars', (data: string) => {
		console.log('from-mars', data);

		// transfer to earth
		const translatedMsg = trans.translateFromMarsToEarth(data);
		publisher.publish('toEarth', translatedMsg);
	});

	// setTimeout(() => {
	// 	publisher.publish('testme', JSON.stringify({ hello: 'there' }));
	// }, 5000);

	console.log('redis pub sub client connectd successfully');
})();

// 44434446668 444 26 3355566666 666668 44666887777866666
// 44434446668 444 26 3355566666 666668 44666887777866666
