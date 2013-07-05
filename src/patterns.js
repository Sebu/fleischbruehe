var PATTERN_LIST = [
	[// 1
		"_____ _____HSS_",
		"_______ H______",
		"SSSSSSH_ ______",
		"_______ H______",
	],
	[// 2
		"__SSH___V______",
		"____SSSSSSS____",
		"_____^_ SSS____",
	],
	[// 3
		"__WWW__J_ _____",
		"_____J__ ____SS",
		"_____ ___J_____",
		"SSS__J_ _______",
	],
	[// 4
		"___ ____J______",
		"______ ____J___",
		"H_______ ______",
		"_______ __H____",
	],
	[// 5
		"_____ _H_______",
		"_____J__V______",
		"______^_ ______",
		"_______ H______",
	],
	[// 6
		"______V_H______",
		"__________SSSJ_",
		"_^_______B_____",
		"_____P_ _______",
	],
	[// 7
		"_____H ________",
		"_______ WH_____",
		"______WJ_ W____",
		"_______ WJ_____",
	],
	[// 8
		"_W_V________W H",
		"__J________B___",
		"__ __________SS",
		"______P ^______",
	],
	[// 9
		"SSSSV_HSSSSSSSS",
		"SSSSSSSSSSSS _^",
		"SJ_ SSSSSSSSSSS",
		"SSSSSSS __HSSSS",
	],
	[// 10
		"___H_______V___",
		"SSSSSSS___SSSSS",
		" ^_SSS_J____SSS",
		"___W___ _____H_",
	],

	[// 11
		"____________V_H",
		"__ _J____B_____",
		"______H_____W _",
		"_^_SSS_ __JWPW_",
	],

	[// 12
		"SSSSSSSSSS_J__ ",
		"_____H_ _______",
	],

	[// 13
		"___V________H__",
		"_ ___SSSSSS____",
		"_____SH SS^SSSS",
		"____J__ _______",
	],

	[// 14
		"___ W______H___",
		"_______ WJ_____",
	],

	[// 15
		"HV_SSSS_ __B_W_",
		"__ _P __ __ _^ ",
		"_______ _J_W __",
	],

	[// 16 
		"___V_____J_____",
		"______B_______ ",
		"S ^SSSSSSSSSS__",
		"____J__ __W^__W",
	],

	[// 17
		"________JW ____",
		"____ WJ________",
		"________JW ____",
		"______J _______",
	],
	[// 18 
		"_S_ SJSJSS HSJ_",
		"JS__J_W JS_J_S_",
	],
	[// 19
		"__H___SSSS ____",
		"__ _SSSJ_______",
		"S__SSSSSV___H__",
		"_SS__^_ SSS____",
	],
	[// 20
		"_______J______V",
		"_B_JSSSSSSS__ _",
		"_____H_ W^_PW__",
	],
];

PATTERN_STATE = -1;

function GetRandomPattern() {
    var pattern = ["__ ___H________"];
    if ( PATTERN_STATE < 0 ) {
        pattern = [
            "__ ___H________",
            "__ _______H____",
            "__H___ ________",
            "__ ___H________",
            "__ _______H____",
            "__H____________", ];
    }
    else if ( PATTERN_STATE < 3 ) {
        pattern = PATTERN_LIST[ Math.floor( Math.random() * 5 ) ];
    }
    else if ( PATTERN_STATE < 8 ) {
        pattern = PATTERN_LIST[5 + Math.floor( Math.random() * 10 )];
    }
    else if ( PATTERN_STATE < 10 ) {
        pattern = PATTERN_LIST[15 + Math.floor( Math.random() * ( PATTERN_LIST.length - 15 ) )];
    }
    else {
        pattern = PATTERN_LIST[Math.floor( Math.random() * PATTERN_LIST.length )];
    }

    PATTERN_STATE++;
    return pattern ? pattern : ["__ ___H________"];
}