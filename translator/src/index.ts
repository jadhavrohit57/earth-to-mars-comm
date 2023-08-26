import { createClient, RedisClientType } from 'redis';
import { Translate } from './helper';

(async () => {
	const trans = new Translate();

	// create redis pub sub clients
	const publisher: RedisClientType = createClient({
		url: 'redis://localhost:6379' // redis docker container url
	});

	const subscriber: RedisClientType = publisher.duplicate();

	await publisher.connect();
	await subscriber.connect();

	// subscribe for channel from earth
	subscriber.subscribe('from-earth', (data: string) => {
		const message: Record<string, any> = JSON.parse(data);
		// transfer to mars code
		const translatedMsg = trans.translateFromEarthToMars(message.data);
		console.log('Translation ', {
			from: message.data,
			to: translatedMsg
		});

		publisher.publish('toMars', translatedMsg);
	});

	subscriber.subscribe('from-mars', (data: string) => {
		const message: Record<string, any> = JSON.parse(data);

		// transfer to earth
		const translatedMsg = trans.translateFromMarsToEarth(message.data);
		console.log('Translation ', {
			from: message.data,
			to: translatedMsg
		});

		publisher.publish('toEarth', translatedMsg);
	});

	console.log('redis pub sub client connectd successfully');
})();
