var PATTERN_LIST = [
	[// 1
		"___H_______V___",
		"SSSSSSS___SSSSS",
		" ^_SSS_J____SSS",
		"___W___ _____H_",
	],

	[// 2
		"____________V_H",
		"____J____B_____",
		"______H_____W _",
		"_^_SSS_ ___WPW_",
	],

	[// 3
		"SSSSSSSSSS_J__ ",
		"_____H_ _______",
	],

	[// 4
		"___V________H__",
		"_ ___SSSSSS____",
		"_____SH SS^SSSS",
		"____J__ _______",
	],

	[// 5
		"___ W______H___",
		"_______ WJ_____",
	],

	[// 6
		"HV_SSSS_ __B_W_",
		"__ _P __ __ _^ ",
		"_______ _J_W __",
	],

	[// 7 
		"___V___________",
		"______B_______ ",
		"S ^SSSSSSSSSS__",
		"____J__ __W^__W",
	],

	[// 8
		"________JW ____",
		"____ WJ________",
		"________JW ____",
		"______J _______",
	],
	[// 9 
		"_S_ S_S_SS HS__",
		"_S____W JS___S_",
	],
	[// 10
		"______SSSS ____",
		"__ _SSS________",
		"S__SSSSSV___H__",
		"_____^_ SSS____",
	],
];

function GetRandomPattern() {
	return PATTERN_LIST[Math.floor( Math.random() * PATTERN_LIST.length )];
}