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
		"_____ ___JSSS__",
		"SSS__J_ _______",
	],
	[// 4
		"___ ____JSSS___",
		"SSSSSS ____J___",
		"H_______ SSSSSS",
		"______W __H____",
	],
	[// 5
		"_____ _HWWWWSSS",
		"_____J__V______",
		"______^_ SSSSS_",
		"SSSSSSS H______",
	],
	[// 6
		"SSSSSSV_H_____S",
		"__________SSSJ_",
		"_^_______B_SSSS",
		"_SSSSP_ _______",
	],
	[// 7
		"SSSSSH ___SSSSS",
		"_______ WH_____",
		"_____ WJ_ W____",
		"_______ WJ_____",
	],
	[// 8
		"_W_V________W H",
		"__J________BSSS",
		"__ ___SSSSSSSSS",
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
		"SSSSSSS_____V_H",
		"__ _J____BSSSS_",
		"______H_____W _",
		"_^_SSS_ __JWPW_",
	],

	[// 12
		"SSSSSSSSSS_J__ ",
		"_____H_ SSSS___",
	],

	[// 13
		"___V________H__",
		"_ __WSSSSSS____",
		"_____SH SS^SSSS",
		"____J__ _WWSSW__",
	],

	[// 14
		"___ WWWWW__H___",
		"_______ WJ_____",
	],

	[// 15
		"HV_SSSS_ __B_W_",
		"__ _P __ __ _^ ",
		"_______ _J_W __",
	],

	[// 16 
		"___V_____JSSSSS",
		"______B_______ ",
		"S ^SSSSSSSSSS__",
		"____J__ __W^__W",
	],

	[// 17
		"________JW ____",
		"____ WJ________",
		"________JW ____",
		"SSSSSSJ _______",
	],
	[// 18 
		"_S_ SJSJSS HSJ_",
		"JS__J_W JS_J_S_",
	],
	[// 19
		"__H___SSSS ____",
		"__ _SSSJ_______",
		"S__SSSSSV___H__",
		"JSS__^_ SSS____",
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