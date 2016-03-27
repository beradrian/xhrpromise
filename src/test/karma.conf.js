module.exports = function(config) {
	config.set({
		basePath: '../..'
		, logLevel: 'DEBUG'
		, frameworks: ["jasmine-ajax", "jasmine", "commonjs"]
		, files: ["src/test/spec/*Spec.js", {pattern: "src/main/js/*.js", included: true}]
		, preprocessors: {
			"**/*Spec.js": ["commonjs"]
			, "src/main/js/*.js": ["babel", "commonjs"]
		}
		, browsers: ["Chrome", "Firefox"]
		, singleRun: true
		, babelPreprocessor: {
			options: {
				presets: ['es2015']
				, plugins: ["babel-plugin-add-module-exports"]
			}
		}
	});
};
