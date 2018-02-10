export function getUserLanguage() {
	if (!!navigator.languages) {
		return navigator.languages[0];
	}

	return navigator.language;
}

export function getCurrencyFromLanguage() {
	const userLanguage = getUserLanguage();
	const availableCurrencies = {
		'en-AU': {
			symbol: '$',
			code: 'AUD'
		},
		'en-US': {
			symbol: '$',
			code: 'USD'
		},
		'fr': {
			symbol: '€',
			code: 'EUR'
		},
		'ja': {
			symbol: '¥',
			code: 'JPY'
		},
		'de-DE': {
			symbol: '€',
			code: 'EUR'
		},
		'it': {
			symbol: '€',
			code: 'EUR'
		},
		'en-GB': {
			symbol: '£',
			code: 'GBP'
		}
	};
	if (availableCurrencies[userLanguage] === undefined) {
		return availableCurrencies['en-US'];
	}
	return availableCurrencies[userLanguage];
}