// Remove unwanted $nbsp; character
const sanitizer = (str) =>
	str
		.split(String.fromCodePoint(160))
		.join(' ')
		.replace(/\&nbsp;/g, ' ');
export default sanitizer;
