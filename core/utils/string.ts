/**
 * List of string utils function
 * @param str
 * @returns
 */

// Join text with asterisk character for required field
export const join = (str: string): string => {
	const char = str.split(' ');
	if (char[char.length - 1] === '*') {
		const last = char.slice(-2).join('');
		char.splice(-2, 2, last);
		return char.join(' ');
	} else {
		return str;
	}
};

// Remove unwanted $nbsp; character
export const sanitizer = (str: string): void => {
	str
		.split(String.fromCodePoint(160))
		.join(' ')
		.replace(/\&nbsp;/g, ' ');
};

// Parse & sanitize JSON from custom gutenberg blocks
export const parseJSON = (str: string): string => {
	const parseQuotes = str
		.split(String.fromCodePoint(160))
		.join(' ')
		.replace(/\&nbsp;/g, ' ')
		.replace(/″/g, '"')
		.replace(/”/g, '"')
		.replace(/“/g, '"')
		.replace(/\\\//g, '/')
		.replace(/[^\x00-\x7F]/g, '')
		.replace(/\n|\r/g, '');

	return JSON.parse(parseQuotes);
};

export const titleCase = (str: string): string => {
	return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
