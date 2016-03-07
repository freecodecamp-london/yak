module.exports = {
	"parser": "babel-eslint",
	"env": {
		"browser": false,
		"es6": true,
		"node": true,
		"mocha": true,
	},
	"extends": "eslint:recommended",
	"ecmaFeatures": {
		"modules": true
	},
	"parserOptions": {
		"sourceType": "module"
	},
	"rules": {
		"no-console": "off"
	}
};
