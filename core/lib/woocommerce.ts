import axios from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

const ck = process.env.WOOCOMMERCE_CK;
const cs = process.env.WOOCOMMERCE_CS;
const baseUrl = process.env.WOOCOMMERCE_URL;

const oauth = new OAuth({
	consumer: {
		key: ck,
		secret: cs,
	},
	signature_method: 'HMAC-SHA1',
	hash_function: function (base_string, key) {
		return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
	},
});

export default class Api {
	get(endpoint: string) {
		return axios
			.get(baseUrl + endpoint, {
				params: oauth?.authorize({ url: baseUrl + endpoint, method: 'GET' }),
			})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	}

	post(endpoint: string, body: any) {
		return axios
			.post(baseUrl + endpoint, body, {
				params: oauth?.authorize({ url: baseUrl + endpoint, method: 'POST' }),
			})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	}
}
