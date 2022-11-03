const buildScss         = require("../tasks/styles/build");
const buildScssMinify   = require("../tasks/styles/minify");
const buildJs           = require("../tasks/js/build");
const buildTranslations = require("../tasks/others/translations");
const buildSettings     = require("../tasks/others/settings");
const buildCssVarianblesFromSettings = require("../tasks/styles/variables");
const copyBuild         = require("../tasks/others/copy");
const svgBuild          = require("../tasks/images/svg");
const minifyJs          = require("../tasks/js/minify");
const clearThemekitWorkingDirectory = require("../tasks/others/clearThemekitWorkingDirectory");

const { gulp } = themeplify.packages;
const { nominify } = themeplify.options.themekit;

const stylesSeries = [
	buildScss,
	!nominify && buildScssMinify
];

const scriptsSeries = [
	buildJs,
	!nominify && minifyJs
];

const build = gulp.series([
    clearThemekitWorkingDirectory,
    gulp.parallel(
        gulp.series(stylesSeries),
        gulp.series(scriptsSeries),
        buildTranslations,
        buildSettings,
        buildCssVarianblesFromSettings
    ),
    copyBuild,
    svgBuild,
]);

build.displayName = "build";

module.exports = build;
