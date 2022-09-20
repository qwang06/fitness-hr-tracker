const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		env: env,
		host: 'localhost',
		apiNinjas: {
			apiKey: 'axsvbx+A/T7X8LSFs4G/Vg==7Gw3Tf9WcK4Aoa8w'
		}
	},
	production: {
		env: env,
		host: 'localhost',
		apiNinjas: {
			apiKey: 'axsvbx+A/T7X8LSFs4G/Vg==7Gw3Tf9WcK4Aoa8w'
		}
	}
};

module.exports = config[env];