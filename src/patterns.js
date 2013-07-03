var PATTERN_LIST = [
	[
		"__________",
		"W__v__WWWW",
		"__________",
		"___^______",
		"_ _____H__",
		"_J________",
	],
	[
		"__________",
		"W__v__WWWW",
		"__________"
	],
];

function GetRandomPattern() {
	return PATTERN_LIST[Math.random() * PATTERN_LIST.length];
}