﻿var PATTERN_LIST = [
	[// 12
		"_____ _____H___",
		"_______ H______",
		"______H_ ______",
		"_______ H______",
	],
	[// 13
		"____H__________",
		"________V______",
		"____SSSSSSS____",
		"_____^_ _______",
	],
	[// 14
		"_______J_ _____",
		"_____J__ ______",
		"_____ ___J_____",
		"_____J_ _______",
	],
	[// 15
		"________J______",
		"______ ____J___",
		"H_______ ______",
		"_______ __H____",
	],
	[// 16
		"_____ _H_______",
		"_____J__V______",
		"______^_ ______",
		"_______ H______",
	],
	[// 17
		"______V_H______",
		"__________SSSJ_",
		"_^_______B_____",
		"_____p_ _______",
	],
	[// 18
		"_____H ________",
		"_______ WH_____",
		"______WJ_ W____",
		"_______ WJ_____",
	],
	[// 19
		"_W_V________W H",
		"__J________B___",
		"__ __________SS",
		"______P ^______",
	],
	[// 20
		"SSSSV_HSSSSSSSS",
		"SSSSSSSSSSSS _^",
		"SJ_ SSSSSSSSSSS",
		"SSSSSSS __HSSSS",
	],
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
		"___V_____J_____",
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
		"__H___SSSS ____",
		"__ _SSS________",
		"S__SSSSSV___H__",
		"_____^_ SSS____",
	],
	[// 11
		"_______J______V",
		"_B_JSSSSSSS__ _",
		"_____H_ W^_PW__",
	],
];

PATTERN_STATE = 0;

function GetRandomPattern() {
    var pattern = ["__ ___H________"];
    switch ( PATTERN_STATE ) {
        case 0: pattern = [
            "__ ___H________",
            "__ _______H____",
            "__H___ ________",
            "__ ___H________",
            "__ _______H____",
            "__H___ ________", ]; break;
        default:
        case 1: pattern = PATTERN_LIST[Math.floor( Math.random() * PATTERN_LIST.length )]; break;
    }
    PATTERN_STATE++;
    return pattern;
}