import { keymappings } from './keyMapping';

const reverseMap: any = {};
Object.entries(keymappings).forEach((element: any) => {
	reverseMap[element[1]] = element[0];
});

export class Translate {
	translateFromEarthToMars(messagge: string) {
		let message: any = '';

		for (let index = 0; index < messagge.length; index++) {
			const char = messagge[index];
			if (char == ' ') {
				message = message + ' ';
			} else {
				const val = keymappings[char] || char;
				message = message + val;
			}
		}
		return message;
	}

	translateFromMarsToEarth(code: string): string {
		let message: string = '';
		let group: string = '';
		for (let index = 0; index < code.length; index++) {
			const char = code[index];

			if (char == ' ') {
				if (group.length > 0) {
					message = message + reverseMap[group];
				}
				message = message + ' ';
				group = '';
			} else {
				if (char === '$') {
					if (group.length > 0) {
						message = message + reverseMap[group];

						group = '';
					}
					continue;
				}
				if (group == '') {
					group = char;
				} else {
					if (group.includes(char)) {
						group = group + char;
					} else {
						message = message + reverseMap[group];
						group = char;
					}
				}
			}
		}
		if (group.length > 0) {
			message = message + reverseMap[group];
		}

		return message;
	}
}
