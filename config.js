const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	development :{
		APIKey : 'F_MmpTeeRkm9N6nTruujhQ',
		APISecret : 'y57949cGTbR3DWFt9hH5kPMLn5e5HAbZL7PJ'
	},
	production:{	
		APIKey : 'F_MmpTeeRkm9N6nTruujhQ',
		APISecret : 'y57949cGTbR3DWFt9hH5kPMLn5e5HAbZL7PJ'
	}
};

module.exports = config[env];