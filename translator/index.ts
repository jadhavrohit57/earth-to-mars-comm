import { createClient, RedisClientType } from 'redis';

(async () => {
	// create redis pub sub clients
	const publisher: RedisClientType = createClient();

	const subscriber: RedisClientType = publisher.duplicate();

	await publisher.connect();
	await subscriber.connect();

	console.log('redis pub sub client connectd successfully');
})();
