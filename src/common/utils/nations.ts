export type nationType = {
  code: string;
  zh: string;
  icon: string;
  locale: string;
  isFirst?: boolean;
  initial: string;
  en: string;
  hasCompany?: boolean;
};
const nations: nationType[] = [
  {
    code: '93',
    zh: '阿富汗',
    icon: 'flag_af',
    locale: 'AF',
    isFirst: true,
    initial: 'A',
    en: 'Afghanistan',
  },
  {
    code: '355',
    zh: '阿尔巴尼亚',
    icon: 'flag_al',
    locale: 'AL',
    initial: 'A',
    en: 'Albania',
  },
  {
    code: '213',
    zh: '阿尔及利亚',
    icon: 'flag_dz',
    locale: 'DZ',
    initial: 'A',
    en: 'Algeria',
  },
  {
    code: '1',
    zh: '美属萨摩亚',
    icon: 'flag_as',
    locale: 'AS',
    initial: 'A',
    en: 'American Samoa',
  },
  {
    code: '376',
    zh: '安道尔',
    icon: 'flag_ad',
    locale: 'AD',
    initial: 'A',
    en: 'Andorra',
  },
  {
    code: '244',
    zh: '安哥拉',
    icon: 'flag_ao',
    locale: 'AO',
    initial: 'A',
    en: 'Angola',
  },
  {
    code: '1',
    zh: '安圭拉',
    icon: 'flag_ai',
    locale: 'AI',
    initial: 'A',
    en: 'Anguilla',
  },
  {
    code: '1',
    zh: '安提瓜岛',
    icon: 'flag_ag',
    locale: 'AG',
    initial: 'A',
    en: 'Antigua',
  },
  {
    code: '54',
    zh: '阿根廷',
    icon: 'flag_ar',
    locale: 'AR',
    initial: 'A',
    en: 'Argentina',
  },
  {
    code: '374',
    zh: '亚美尼亚',
    icon: 'flag_am',
    locale: 'AM',
    initial: 'A',
    en: 'Armenia',
  },
  {
    code: '297',
    zh: '阿鲁巴',
    icon: 'flag_aw',
    locale: 'AW',
    initial: 'A',
    en: 'Aruba',
  },
  {
    code: '61',
    zh: '澳大利亚',
    icon: 'flag_au',
    locale: 'AU',
    initial: 'A',
    en: 'Australia',
    hasCompany: true,
  },
  {
    code: '43',
    zh: '奥地利',
    icon: 'flag_at',
    locale: 'AT',
    initial: 'A',
    en: 'Austria',
    hasCompany: true,
  },
  {
    code: '994',
    zh: '阿塞拜疆',
    icon: 'flag_az',
    locale: 'AZ',
    initial: 'A',
    en: 'Azerbaijan',
  },
  {
    code: '973',
    zh: '巴林',
    icon: 'flag_bh',
    locale: 'BH',
    isFirst: true,
    initial: 'B',
    en: 'Bahrain',
  },
  {
    code: '880',
    zh: '孟加拉国',
    icon: 'flag_bd',
    locale: 'BD',
    initial: 'B',
    en: 'Bangladesh',
  },
  {
    code: '1',
    zh: '巴巴多斯岛',
    icon: 'flag_bb',
    locale: 'BB',
    initial: 'B',
    en: 'Barbados',
  },
  {
    code: '375',
    zh: '白俄罗斯',
    icon: 'flag_by',
    locale: 'BY',
    initial: 'B',
    en: 'Belarus',
    hasCompany: true,
  },
  {
    code: '32',
    zh: '比利时',
    icon: 'flag_be',
    locale: 'BE',
    initial: 'B',
    en: 'Belgium',
    hasCompany: true,
  },
  {
    code: '501',
    zh: '伯利兹',
    icon: 'flag_bz',
    locale: 'BZ',
    initial: 'B',
    en: 'Belize',
  },
  {
    code: '229',
    zh: '贝宁',
    icon: 'flag_bj',
    locale: 'BJ',
    initial: 'B',
    en: 'Benin',
  },
  {
    code: '1',
    zh: '百慕大',
    icon: 'flag_bm',
    locale: 'BM',
    initial: 'B',
    en: 'Bermuda',
  },
  {
    code: '975',
    zh: '不丹',
    icon: 'flag_bt',
    locale: 'BT',
    initial: 'B',
    en: 'Bhutan',
  },
  {
    code: '591',
    zh: '玻利维亚',
    icon: 'flag_bo',
    locale: 'BO',
    initial: 'B',
    en: 'Bolivia',
  },
  {
    code: '599',
    zh: '博内尔，圣尤斯特歇斯和沙巴',
    icon: 'flag_bq',
    locale: 'BQ',
    initial: 'B',
    en: 'Bonaire, Sint Eustatius and Saba',
  },
  {
    code: '387',
    zh: '波斯尼亚和黑塞哥维那',
    icon: 'flag_ba',
    locale: 'BA',
    initial: 'B',
    en: 'Bosnia and Herzegovina',
  },
  {
    code: '267',
    zh: '博茨瓦纳',
    icon: 'flag_bw',
    locale: 'BW',
    initial: 'B',
    en: 'Botswana',
  },
  {
    code: '55',
    zh: '巴西',
    icon: 'flag_br',
    locale: 'BR',
    initial: 'B',
    en: 'Brazil',
    hasCompany: true,
  },
  {
    code: '246',
    zh: '英属印度洋领地',
    icon: 'flag_io',
    locale: 'IO',
    initial: 'B',
    en: 'British Indian Ocean Territory',
    hasCompany: true,
  },
  {
    code: '1',
    zh: '英属维京群岛',
    icon: 'flag_vg',
    locale: 'VG',
    initial: 'B',
    en: 'British Virgin Islands',
  },
  {
    code: '673',
    zh: '文莱',
    icon: 'flag_bn',
    locale: 'BN',
    initial: 'B',
    en: 'Brunei',
  },
  {
    code: '359',
    zh: '保加利亚',
    icon: 'flag_bg',
    locale: 'BG',
    initial: 'B',
    en: 'Bulgaria',
    hasCompany: true,
  },
  {
    code: '226',
    zh: '布基纳法索',
    icon: 'flag_bf',
    locale: 'BF',
    initial: 'B',
    en: 'Burkina Faso',
  },
  {
    code: '257',
    zh: '布隆迪',
    icon: 'flag_bi',
    locale: 'BI',
    initial: 'B',
    en: 'Burundi',
  },
  {
    code: '855',
    zh: '柬埔寨',
    icon: 'flag_kh',
    locale: 'KH',
    isFirst: true,
    initial: 'C',
    en: 'Cambodia',
  },
  {
    code: '237',
    zh: '喀麦隆',
    icon: 'flag_cm',
    locale: 'CM',
    initial: 'C',
    en: 'Cameroon',
  },
  {
    code: '1',
    zh: '加拿大',
    icon: 'flag_ca',
    locale: 'CA',
    initial: 'C',
    en: 'Canada',
    hasCompany: true,
  },
  {
    code: '238',
    zh: '佛得角',
    icon: 'flag_cv',
    locale: 'CV',
    initial: 'C',
    en: 'Cape Verde',
  },
  {
    code: '1',
    zh: '开曼群岛',
    icon: 'flag_ky',
    locale: 'KY',
    initial: 'C',
    en: 'Cayman Islands',
  },
  {
    code: '236',
    zh: '中非共和国',
    icon: 'flag_cf',
    locale: 'CF',
    initial: 'C',
    en: 'Central African Republic',
  },
  {
    code: '235',
    zh: '乍得',
    icon: 'flag_td',
    locale: 'TD',
    initial: 'C',
    en: 'Chad',
  },
  {
    code: '56',
    zh: '智利',
    icon: 'flag_cl',
    locale: 'CL',
    initial: 'C',
    en: 'Chile',
  },
  {
    code: '86',
    zh: '中国大陆',
    icon: 'flag_cn',
    locale: 'CN',
    initial: 'C',
    en: 'China',
    hasCompany: true,
  },
  {
    code: '57',
    zh: '哥伦比亚',
    icon: 'flag_co',
    locale: 'CO',
    initial: 'C',
    en: 'Colombia',
  },
  {
    code: '269',
    zh: '科摩罗',
    icon: 'flag_km',
    locale: 'KM',
    initial: 'C',
    en: 'Comoros',
  },
  {
    code: '682',
    zh: '库克群岛',
    icon: 'flag_ck',
    locale: 'CK',
    initial: 'C',
    en: 'Cook Islands',
  },
  {
    code: '506',
    zh: '哥斯达黎加',
    icon: 'flag_cr',
    locale: 'CR',
    initial: 'C',
    en: 'Costa Rica',
  },
  {
    code: '385',
    zh: '克罗地亚',
    icon: 'flag_hr',
    locale: 'HR',
    initial: 'C',
    en: 'Croatia',
  },
  {
    code: '53',
    zh: '古巴',
    icon: 'flag_cu',
    locale: 'CU',
    initial: 'C',
    en: 'Cuba',
  },
  {
    code: '599',
    zh: '库拉索',
    icon: 'flag_cw',
    locale: 'CW',
    initial: 'C',
    en: 'Curaçao',
  },
  {
    code: '357',
    zh: '塞浦路斯',
    icon: 'flag_cy',
    locale: 'CY',
    initial: 'C',
    en: 'Cyprus',
  },
  {
    code: '420',
    zh: '捷克',
    icon: 'flag_cz',
    locale: 'CZ',
    initial: 'C',
    en: 'Czech Republic',
    hasCompany: true,
  },
  {
    code: '225',
    zh: '科特迪瓦',
    icon: 'flag_ci',
    locale: 'CI',
    initial: 'C',
    en: "Côte d\\'Ivoire",
  },
  {
    code: '243',
    zh: '刚果民主共和国',
    icon: 'flag_cd',
    locale: 'CD',
    isFirst: true,
    initial: 'D',
    en: 'Democratic Republic of the Congo',
  },
  {
    code: '45',
    zh: '丹麦',
    icon: 'flag_dk',
    locale: 'DK',
    initial: 'D',
    en: 'Denmark',
    hasCompany: true,
  },
  {
    code: '253',
    zh: '吉布提',
    icon: 'flag_dj',
    locale: 'DJ',
    initial: 'D',
    en: 'Djibouti',
  },
  {
    code: '1',
    zh: '多米尼加',
    icon: 'flag_dm',
    locale: 'DM',
    initial: 'D',
    en: 'Dominica',
  },
  {
    code: '1',
    zh: '多米尼加共和国',
    icon: 'flag_do',
    locale: 'DO',
    initial: 'D',
    en: 'Dominican Republic',
  },
  {
    code: '593',
    zh: '厄瓜多尔',
    icon: 'flag_ec',
    locale: 'EC',
    isFirst: true,
    initial: 'E',
    en: 'Ecuador',
  },
  {
    code: '20',
    zh: '埃及',
    icon: 'flag_eg',
    locale: 'EG',
    initial: 'E',
    en: 'Egypt',
  },
  {
    code: '503',
    zh: '萨尔瓦多',
    icon: 'flag_sv',
    locale: 'SV',
    initial: 'E',
    en: 'El Salvador',
  },
  {
    code: '240',
    zh: '赤道几内亚',
    icon: 'flag_gq',
    locale: 'GQ',
    initial: 'E',
    en: 'Equatorial Guinea',
  },
  {
    code: '291',
    zh: '厄立特里亚',
    icon: 'flag_er',
    locale: 'ER',
    initial: 'E',
    en: 'Eritrea',
  },
  {
    code: '372',
    zh: '爱沙尼亚',
    icon: 'flag_ee',
    locale: 'EE',
    initial: 'E',
    en: 'Estonia',
    hasCompany: true,
  },
  {
    code: '251',
    zh: '埃塞俄比亚',
    icon: 'flag_et',
    locale: 'ET',
    initial: 'E',
    en: 'Ethiopia',
  },
  {
    code: '500',
    zh: '福克兰群岛',
    icon: 'flag_fk',
    locale: 'FK',
    isFirst: true,
    initial: 'F',
    en: 'Falkland Islands',
  },
  {
    code: '298',
    zh: '法罗群岛',
    icon: 'flag_fo',
    locale: 'FO',
    initial: 'F',
    en: 'Faroe Islands',
  },
  {
    code: '691',
    zh: '密克罗尼西亚联邦',
    icon: 'flag_fm',
    locale: 'FM',
    initial: 'F',
    en: 'Federated States of Micronesia',
  },
  {
    code: '679',
    zh: '斐济',
    icon: 'flag_fj',
    locale: 'FJ',
    initial: 'F',
    en: 'Fiji',
  },
  {
    code: '358',
    zh: '芬兰',
    icon: 'flag_fi',
    locale: 'FI',
    initial: 'F',
    en: 'Finland',
    hasCompany: true,
  },
  {
    code: '33',
    zh: '法国',
    icon: 'flag_fr',
    locale: 'FR',
    initial: 'F',
    en: 'France',
    hasCompany: true,
  },
  {
    code: '594',
    zh: '法属圭亚那',
    icon: 'flag_gf',
    locale: 'GF',
    initial: 'F',
    en: 'French Guiana',
  },
  {
    code: '689',
    zh: '法属玻利尼西亚',
    icon: 'flag_pf',
    locale: 'PF',
    initial: 'F',
    en: 'French Polynesia',
  },
  {
    code: '241',
    zh: '加蓬',
    icon: 'flag_ga',
    locale: 'GA',
    isFirst: true,
    initial: 'G',
    en: 'Gabon',
  },
  {
    code: '995',
    zh: '格鲁吉亚',
    icon: 'flag_ge',
    locale: 'GE',
    initial: 'G',
    en: 'Georgia',
    hasCompany: true,
  },
  {
    code: '49',
    zh: '德国',
    icon: 'flag_de',
    locale: 'DE',
    initial: 'G',
    en: 'Germany',
    hasCompany: true,
  },
  {
    code: '233',
    zh: '加纳',
    icon: 'flag_gh',
    locale: 'GH',
    initial: 'G',
    en: 'Ghana',
  },
  {
    code: '350',
    zh: '直布罗陀',
    icon: 'flag_gi',
    locale: 'GI',
    initial: 'G',
    en: 'Gibraltar',
  },
  {
    code: '30',
    zh: '希腊',
    icon: 'flag_gr',
    locale: 'GR',
    initial: 'G',
    en: 'Greece',
    hasCompany: true,
  },
  {
    code: '299',
    zh: '格陵兰',
    icon: 'flag_gl',
    locale: 'GL',
    initial: 'G',
    en: 'Greenland',
  },
  {
    code: '1',
    zh: '格林纳达',
    icon: 'flag_gd',
    locale: 'GD',
    initial: 'G',
    en: 'Grenada',
  },
  {
    code: '590',
    zh: '瓜德罗普岛',
    icon: 'flag_gp',
    locale: 'GP',
    initial: 'G',
    en: 'Guadeloupe',
  },
  {
    code: '1',
    zh: '关岛',
    icon: 'flag_gu',
    locale: 'GU',
    initial: 'G',
    en: 'Guam',
  },
  {
    code: '502',
    zh: '危地马拉',
    icon: 'flag_gt',
    locale: 'GT',
    initial: 'G',
    en: 'Guatemala',
  },
  {
    code: '44',
    zh: '根西岛',
    icon: 'flag_gg',
    locale: 'GG',
    initial: 'G',
    en: 'Guernsey',
  },
  {
    code: '224',
    zh: '几内亚',
    icon: 'flag_gn',
    locale: 'GN',
    initial: 'G',
    en: 'Guinea',
  },
  {
    code: '245',
    zh: '几内亚比绍共和国',
    icon: 'flag_gw',
    locale: 'GW',
    initial: 'G',
    en: 'Guinea-Bissau',
  },
  {
    code: '592',
    zh: '圭亚那',
    icon: 'flag_gy',
    locale: 'GY',
    initial: 'G',
    en: 'Guyana',
  },
  {
    code: '509',
    zh: '海地',
    icon: 'flag_ht',
    locale: 'HT',
    isFirst: true,
    initial: 'H',
    en: 'Haiti',
  },
  {
    code: '504',
    zh: '洪都拉斯',
    icon: 'flag_hn',
    locale: 'HN',
    initial: 'H',
    en: 'Honduras',
  },
  {
    code: '852',
    zh: '中国香港',
    icon: 'flag_hk',
    locale: 'HK',
    initial: 'H',
    en: 'Hong Kong',
    hasCompany: true,
  },
  {
    code: '36',
    zh: '匈牙利',
    icon: 'flag_hu',
    locale: 'HU',
    initial: 'H',
    en: 'Hungary',
    hasCompany: true,
  },
  {
    code: '354',
    zh: '冰岛',
    icon: 'flag_is',
    locale: 'IS',
    isFirst: true,
    initial: 'I',
    en: 'Iceland',
  },
  {
    code: '91',
    zh: '印度',
    icon: 'flag_in',
    locale: 'IN',
    initial: 'I',
    en: 'India',
    hasCompany: true,
  },
  {
    code: '62',
    zh: '印度尼西亚',
    icon: 'flag_id',
    locale: 'ID',
    initial: 'I',
    en: 'Indonesia',
  },
  {
    code: '98',
    zh: '伊朗',
    icon: 'flag_ir',
    locale: 'IR',
    initial: 'I',
    en: 'Iran',
  },
  {
    code: '964',
    zh: '伊拉克',
    icon: 'flag_iq',
    locale: 'IQ',
    initial: 'I',
    en: 'Iraq',
  },
  {
    code: '353',
    zh: '爱尔兰',
    icon: 'flag_ie',
    locale: 'IE',
    initial: 'I',
    en: 'Ireland',
    hasCompany: true,
  },
  {
    code: '44',
    zh: '马恩岛',
    icon: 'flag_im',
    locale: 'IM',
    initial: 'I',
    en: 'Isle Of Man',
  },
  {
    code: '972',
    zh: '以色列',
    icon: 'flag_il',
    locale: 'IL',
    initial: 'I',
    en: 'Israel',
    hasCompany: true,
  },
  {
    code: '39',
    zh: '意大利',
    icon: 'flag_it',
    locale: 'IT',
    initial: 'I',
    en: 'Italy',
    hasCompany: true,
  },
  {
    code: '1',
    zh: '牙买加',
    icon: 'flag_jm',
    locale: 'JM',
    isFirst: true,
    initial: 'J',
    en: 'Jamaica',
  },
  {
    code: '81',
    zh: '日本',
    icon: 'flag_jp',
    locale: 'JP',
    initial: 'J',
    en: 'Japan',
    hasCompany: true,
  },
  {
    code: '44',
    zh: '泽西岛',
    icon: 'flag_je',
    locale: 'JE',
    initial: 'J',
    en: 'Jersey',
  },
  {
    code: '962',
    zh: '约旦',
    icon: 'flag_jo',
    locale: 'JO',
    initial: 'J',
    en: 'Jordan',
  },
  {
    code: '7',
    zh: '哈萨克斯坦',
    icon: 'flag_kz',
    locale: 'KZ',
    isFirst: true,
    initial: 'K',
    en: 'Kazakhstan',
  },
  {
    code: '254',
    zh: '肯尼亚',
    icon: 'flag_ke',
    locale: 'KE',
    initial: 'K',
    en: 'Kenya',
  },
  {
    code: '686',
    zh: '基里巴斯',
    icon: 'flag_ki',
    locale: 'KI',
    initial: 'K',
    en: 'Kiribati',
    hasCompany: true,
  },
  {
    code: '965',
    zh: '科威特',
    icon: 'flag_kw',
    locale: 'KW',
    initial: 'K',
    en: 'Kuwait',
  },
  {
    code: '996',
    zh: '吉尔吉斯斯坦',
    icon: 'flag_kg',
    locale: 'KG',
    initial: 'K',
    en: 'Kyrgyzstan',
  },
  {
    code: '856',
    zh: '老挝',
    icon: 'flag_la',
    locale: 'LA',
    isFirst: true,
    initial: 'L',
    en: 'Laos',
  },
  {
    code: '371',
    zh: '拉脱维亚',
    icon: 'flag_lv',
    locale: 'LV',
    initial: 'L',
    en: 'Latvia',
  },
  {
    code: '961',
    zh: '黎巴嫩',
    icon: 'flag_lb',
    locale: 'LB',
    initial: 'L',
    en: 'Lebanon',
  },
  {
    code: '266',
    zh: '莱索托',
    icon: 'flag_ls',
    locale: 'LS',
    initial: 'L',
    en: 'Lesotho',
  },
  {
    code: '231',
    zh: '利比亚',
    icon: 'flag_lr',
    locale: 'LR',
    initial: 'L',
    en: 'Liberia',
  },
  {
    code: '218',
    zh: '利比亞',
    icon: 'flag_ly',
    locale: 'LY',
    initial: 'L',
    en: 'Libya',
  },
  {
    code: '423',
    zh: '列支敦士登',
    icon: 'flag_li',
    locale: 'LI',
    initial: 'L',
    en: 'Liechtenstein',
    hasCompany: true,
  },
  {
    code: '370',
    zh: '立陶宛',
    icon: 'flag_lt',
    locale: 'LT',
    initial: 'L',
    en: 'Lithuania',
    hasCompany: true,
  },
  {
    code: '352',
    zh: '卢森堡',
    icon: 'flag_lu',
    locale: 'LU',
    initial: 'L',
    en: 'Luxembourg',
  },
  {
    code: '853',
    zh: '中国澳门',
    icon: 'flag_mo',
    locale: 'MO',
    isFirst: true,
    initial: 'M',
    en: 'Macau',
  },
  {
    code: '389',
    zh: '马其顿',
    icon: 'flag_mk',
    locale: 'MK',
    initial: 'M',
    en: 'Macedonia',
  },
  {
    code: '261',
    zh: '马达加斯加',
    icon: 'flag_mg',
    locale: 'MG',
    initial: 'M',
    en: 'Madagascar',
  },
  {
    code: '265',
    zh: '马拉维',
    icon: 'flag_mw',
    locale: 'MW',
    initial: 'M',
    en: 'Malawi',
  },
  {
    code: '60',
    zh: '马来西亚',
    icon: 'flag_my',
    locale: 'MY',
    initial: 'M',
    en: 'Malaysia',
    hasCompany: true,
  },
  {
    code: '960',
    zh: '马尔代夫',
    icon: 'flag_mv',
    locale: 'MV',
    initial: 'M',
    en: 'Maldives',
  },
  {
    code: '223',
    zh: '马里',
    icon: 'flag_ml',
    locale: 'ML',
    initial: 'M',
    en: 'Mali',
  },
  {
    code: '356',
    zh: '马耳他',
    icon: 'flag_mt',
    locale: 'MT',
    initial: 'M',
    en: 'Malta',
  },
  {
    code: '692',
    zh: '马绍尔群岛',
    icon: 'flag_mh',
    locale: 'MH',
    initial: 'M',
    en: 'Marshall Islands',
  },
  {
    code: '596',
    zh: '马提尼克岛',
    icon: 'flag_mq',
    locale: 'MQ',
    initial: 'M',
    en: 'Martinique',
  },
  {
    code: '222',
    zh: '毛里塔尼亚',
    icon: 'flag_mr',
    locale: 'MR',
    initial: 'M',
    en: 'Mauritania',
  },
  {
    code: '230',
    zh: '毛里求斯',
    icon: 'flag_mu',
    locale: 'MU',
    initial: 'M',
    en: 'Mauritius',
  },
  {
    code: '262',
    zh: '马约特',
    icon: 'flag_yt',
    locale: 'YT',
    initial: 'M',
    en: 'Mayotte',
  },
  {
    code: '52',
    zh: '墨西哥',
    icon: 'flag_mx',
    locale: 'MX',
    initial: 'M',
    en: 'Mexico',
    hasCompany: true,
  },
  {
    code: '373',
    zh: '摩尔多瓦',
    icon: 'flag_md',
    locale: 'MD',
    initial: 'M',
    en: 'Moldova',
  },
  {
    code: '377',
    zh: '摩纳哥',
    icon: 'flag_mc',
    locale: 'MC',
    initial: 'M',
    en: 'Monaco',
  },
  {
    code: '976',
    zh: '蒙古',
    icon: 'flag_mn',
    locale: 'MN',
    initial: 'M',
    en: 'Mongolia',
  },
  {
    code: '382',
    zh: '黑山共和国',
    icon: 'flag_me',
    locale: 'ME',
    initial: 'M',
    en: 'Montenegro',
  },
  {
    code: '1',
    zh: '蒙塞拉特岛',
    icon: 'flag_ms',
    locale: 'MS',
    initial: 'M',
    en: 'Montserrat',
  },
  {
    code: '212',
    zh: '摩洛哥',
    icon: 'flag_ma',
    locale: 'MA',
    initial: 'M',
    en: 'Morocco',
  },
  {
    code: '258',
    zh: '莫桑比克',
    icon: 'flag_mz',
    locale: 'MZ',
    initial: 'M',
    en: 'Mozambique',
  },
  {
    code: '95',
    zh: '缅甸',
    icon: 'flag_mm',
    locale: 'MM',
    initial: 'M',
    en: 'Myanmar',
  },
  {
    code: '264',
    zh: '纳米比亚',
    icon: 'flag_na',
    locale: 'NA',
    isFirst: true,
    initial: 'N',
    en: 'Namibia',
  },
  {
    code: '674',
    zh: '瑙鲁',
    icon: 'flag_nr',
    locale: 'NR',
    initial: 'N',
    en: 'Nauru',
  },
  {
    code: '977',
    zh: '尼泊尔',
    icon: 'flag_np',
    locale: 'NP',
    initial: 'N',
    en: 'Nepal',
  },
  {
    code: '31',
    zh: '荷兰',
    icon: 'flag_nl',
    locale: 'NL',
    initial: 'N',
    en: 'Netherlands',
    hasCompany: true,
  },
  {
    code: '687',
    zh: '新喀里多尼亚',
    icon: 'flag_nc',
    locale: 'NC',
    initial: 'N',
    en: 'New Caledonia',
  },
  {
    code: '64',
    zh: '新西兰',
    icon: 'flag_nz',
    locale: 'NZ',
    initial: 'N',
    en: 'New Zealand',
    hasCompany: true,
  },
  {
    code: '505',
    zh: '尼加拉瓜',
    icon: 'flag_ni',
    locale: 'NI',
    initial: 'N',
    en: 'Nicaragua',
  },
  {
    code: '227',
    zh: '尼日尔',
    icon: 'flag_ne',
    locale: 'NE',
    initial: 'N',
    en: 'Niger',
  },
  {
    code: '234',
    zh: '尼日利亚',
    icon: 'flag_ng',
    locale: 'NG',
    initial: 'N',
    en: 'Nigeria',
  },
  {
    code: '683',
    zh: '纽埃',
    icon: 'flag_nu',
    locale: 'NU',
    initial: 'N',
    en: 'Niue',
  },
  {
    code: '672',
    zh: '诺福克岛',
    icon: 'flag_nf',
    locale: 'NF',
    initial: 'N',
    en: 'Norfolk Island',
  },
  {
    code: '850',
    zh: '朝鲜',
    icon: 'flag_kp',
    locale: 'KP',
    initial: 'N',
    en: 'North Korea',
  },
  {
    code: '1',
    zh: '北马里亚纳群岛',
    icon: 'flag_mp',
    locale: 'MP',
    initial: 'N',
    en: 'Northern Mariana Islands',
  },
  {
    code: '47',
    zh: '挪威',
    icon: 'flag_no',
    locale: 'NO',
    initial: 'N',
    en: 'Norway',
  },
  {
    code: '968',
    zh: '阿曼',
    icon: 'flag_om',
    locale: 'OM',
    isFirst: true,
    initial: 'O',
    en: 'Oman',
  },
  {
    code: '92',
    zh: '巴基斯坦',
    icon: 'flag_pk',
    locale: 'PK',
    isFirst: true,
    initial: 'P',
    en: 'Pakistan',
  },
  {
    code: '680',
    zh: '帕劳',
    icon: 'flag_pw',
    locale: 'PW',
    initial: 'P',
    en: 'Palau',
  },
  {
    code: '970',
    zh: '巴勒斯坦',
    icon: 'flag_ps',
    locale: 'PS',
    initial: 'P',
    en: 'Palestine',
  },
  {
    code: '507',
    zh: '巴拿马',
    icon: 'flag_pa',
    locale: 'PA',
    initial: 'P',
    en: 'Panama',
  },
  {
    code: '675',
    zh: '巴布亚新几内亚',
    icon: 'flag_pg',
    locale: 'PG',
    initial: 'P',
    en: 'Papua New Guinea',
  },
  {
    code: '595',
    zh: '巴拉圭',
    icon: 'flag_py',
    locale: 'PY',
    initial: 'P',
    en: 'Paraguay',
  },
  {
    code: '51',
    zh: '秘鲁',
    icon: 'flag_pe',
    locale: 'PE',
    initial: 'P',
    en: 'Peru',
  },
  {
    code: '63',
    zh: '菲律宾',
    icon: 'flag_ph',
    locale: 'PH',
    initial: 'P',
    en: 'Philippines',
  },
  {
    code: '48',
    zh: '波兰',
    icon: 'flag_pl',
    locale: 'PL',
    initial: 'P',
    en: 'Poland',
    hasCompany: true,
  },
  {
    code: '351',
    zh: '葡萄牙',
    icon: 'flag_pt',
    locale: 'PT',
    initial: 'P',
    en: 'Portugal',
    hasCompany: true,
  },
  {
    code: '1',
    zh: '波多黎各',
    icon: 'flag_pr',
    locale: 'PR',
    initial: 'P',
    en: 'Puerto Rico',
  },
  {
    code: '974',
    zh: '卡塔尔',
    icon: 'flag_qa',
    locale: 'QA',
    isFirst: true,
    initial: 'Q',
    en: 'Qatar',
  },
  {
    code: '242',
    zh: '刚果共和国',
    icon: 'flag_cg',
    locale: 'CG',
    isFirst: true,
    initial: 'R',
    en: 'Republic of the Congo',
  },
  {
    code: '40',
    zh: '罗马尼亚',
    icon: 'flag_ro',
    locale: 'RO',
    initial: 'R',
    en: 'Romania',
  },
  {
    code: '7',
    zh: '俄罗斯',
    icon: 'flag_ru',
    locale: 'RU',
    initial: 'R',
    en: 'Russia',
    hasCompany: true,
  },
  {
    code: '250',
    zh: '卢旺达',
    icon: 'flag_rw',
    locale: 'RW',
    initial: 'R',
    en: 'Rwanda',
  },
  {
    code: '262',
    zh: '留尼汪',
    icon: 'flag_re',
    locale: 'RE',
    initial: 'R',
    en: 'Réunion',
  },
  {
    code: '290',
    zh: '圣赫勒拿',
    icon: 'flag_sh',
    locale: 'SH',
    isFirst: true,
    initial: 'S',
    en: 'Saint Helena',
  },
  {
    code: '1',
    zh: '圣基茨和尼维斯',
    icon: 'flag_kn',
    locale: 'KN',
    initial: 'S',
    en: 'Saint Kitts and Nevis',
  },
  {
    code: '508',
    zh: '圣皮埃尔和密克隆',
    icon: 'flag_pm',
    locale: 'PM',
    initial: 'S',
    en: 'Saint Pierre and Miquelon',
  },
  {
    code: '1',
    zh: '圣文森特和格林纳丁斯',
    icon: 'flag_vc',
    locale: 'VC',
    initial: 'S',
    en: 'Saint Vincent and the Grenadines',
  },
  {
    code: '685',
    zh: '萨摩亚',
    icon: 'flag_ws',
    locale: 'WS',
    initial: 'S',
    en: 'Samoa',
  },
  {
    code: '378',
    zh: '圣马力诺',
    icon: 'flag_sm',
    locale: 'SM',
    initial: 'S',
    en: 'San Marino',
  },
  {
    code: '239',
    zh: '圣多美和普林西比',
    icon: 'flag_st',
    locale: 'ST',
    initial: 'S',
    en: 'Sao Tome and Principe',
  },
  {
    code: '966',
    zh: '沙特阿拉伯',
    icon: 'flag_sa',
    locale: 'SA',
    initial: 'S',
    en: 'Saudi Arabia',
  },
  {
    code: '221',
    zh: '塞内加尔',
    icon: 'flag_sn',
    locale: 'SN',
    initial: 'S',
    en: 'Senegal',
  },
  {
    code: '381',
    zh: '塞尔维亚',
    icon: 'flag_rs',
    locale: 'RS',
    initial: 'S',
    en: 'Serbia',
  },
  {
    code: '248',
    zh: '塞舌尔',
    icon: 'flag_sc',
    locale: 'SC',
    initial: 'S',
    en: 'Seychelles',
  },
  {
    code: '232',
    zh: '塞拉利昂',
    icon: 'flag_sl',
    locale: 'SL',
    initial: 'S',
    en: 'Sierra Leone',
  },
  {
    code: '65',
    zh: '新加坡',
    icon: 'flag_sg',
    locale: 'SG',
    initial: 'S',
    en: 'Singapore',
    hasCompany: true,
  },
  {
    code: '1',
    zh: '圣马丁岛',
    icon: 'flag_sx',
    locale: 'SX',
    initial: 'S',
    en: 'Sint Maarten',
  },
  {
    code: '421',
    zh: '斯洛伐克',
    icon: 'flag_sk',
    locale: 'SK',
    initial: 'S',
    en: 'Slovakia',
    hasCompany: true,
  },
  {
    code: '386',
    zh: '斯洛文尼亚',
    icon: 'flag_si',
    locale: 'SI',
    initial: 'S',
    en: 'Slovenia',
    hasCompany: true,
  },
  {
    code: '677',
    zh: '所罗门群岛',
    icon: 'flag_sb',
    locale: 'SB',
    initial: 'S',
    en: 'Solomon Islands',
  },
  {
    code: '252',
    zh: '索马里',
    icon: 'flag_so',
    locale: 'SO',
    initial: 'S',
    en: 'Somalia',
  },
  {
    code: '27',
    zh: '南非',
    icon: 'flag_za',
    locale: 'ZA',
    initial: 'S',
    en: 'South Africa',
  },
  {
    code: '82',
    zh: '韩国',
    icon: 'flag_kr',
    locale: 'KR',
    initial: 'S',
    en: 'South Korea',
    hasCompany: true,
  },
  {
    code: '211',
    zh: '南苏丹',
    icon: 'flag_ss',
    locale: 'SS',
    initial: 'S',
    en: 'South Sudan',
  },
  {
    code: '34',
    zh: '西班牙',
    icon: 'flag_es',
    locale: 'ES',
    initial: 'S',
    en: 'Spain',
    hasCompany: true,
  },
  {
    code: '94',
    zh: '斯里兰卡',
    icon: 'flag_lk',
    locale: 'LK',
    initial: 'S',
    en: 'Sri Lanka',
  },
  {
    code: '1',
    zh: '圣卢西亚',
    icon: 'flag_lc',
    locale: 'LC',
    initial: 'S',
    en: 'St. Lucia',
  },
  {
    code: '249',
    zh: '苏丹',
    icon: 'flag_sd',
    locale: 'SD',
    initial: 'S',
    en: 'Sudan',
  },
  {
    code: '597',
    zh: '苏里南',
    icon: 'flag_sr',
    locale: 'SR',
    initial: 'S',
    en: 'Suriname',
  },
  {
    code: '268',
    zh: '斯威士兰',
    icon: 'flag_sz',
    locale: 'SZ',
    initial: 'S',
    en: 'Swaziland',
    hasCompany: true,
  },
  {
    code: '46',
    zh: '瑞典',
    icon: 'flag_se',
    locale: 'SE',
    initial: 'S',
    en: 'Sweden',
    hasCompany: true,
  },
  {
    code: '41',
    zh: '瑞士',
    icon: 'flag_ch',
    locale: 'CH',
    initial: 'S',
    en: 'Switzerland',
    hasCompany: true,
  },
  {
    code: '963',
    zh: '叙利亚',
    icon: 'flag_sy',
    locale: 'SY',
    initial: 'S',
    en: 'Syria',
  },
  {
    code: '886',
    zh: '中国台湾',
    icon: 'flag_tw',
    locale: 'TW',
    isFirst: true,
    initial: 'T',
    en: 'Taiwan',
    hasCompany: true,
  },
  {
    code: '992',
    zh: '塔吉克斯坦',
    icon: 'flag_tj',
    locale: 'TJ',
    initial: 'T',
    en: 'Tajikistan',
  },
  {
    code: '255',
    zh: '坦桑尼亚',
    icon: 'flag_tz',
    locale: 'TZ',
    initial: 'T',
    en: 'Tanzania',
  },
  {
    code: '66',
    zh: '泰国',
    icon: 'flag_th',
    locale: 'TH',
    initial: 'T',
    en: 'Thailand',
  },
  {
    code: '1',
    zh: '巴哈马',
    icon: 'flag_bs',
    locale: 'BS',
    initial: 'T',
    en: 'The Bahamas',
  },
  {
    code: '220',
    zh: '冈比亚',
    icon: 'flag_gm',
    locale: 'GM',
    initial: 'T',
    en: 'The Gambia',
  },
  {
    code: '670',
    zh: '东帝汶',
    icon: 'flag_tl',
    locale: 'TL',
    initial: 'T',
    en: 'Timor-Leste',
  },
  {
    code: '228',
    zh: '多哥',
    icon: 'flag_tg',
    locale: 'TG',
    initial: 'T',
    en: 'Togo',
  },
  {
    code: '690',
    zh: '托克劳',
    icon: 'flag_tk',
    locale: 'TK',
    initial: 'T',
    en: 'Tokelau',
  },
  {
    code: '676',
    zh: '汤加',
    icon: 'flag_to',
    locale: 'TO',
    initial: 'T',
    en: 'Tonga',
  },
  {
    code: '1',
    zh: '特立尼达和多巴哥',
    icon: 'flag_tt',
    locale: 'TT',
    initial: 'T',
    en: 'Trinidad and Tobago',
  },
  {
    code: '216',
    zh: '突尼斯',
    icon: 'flag_tn',
    locale: 'TN',
    initial: 'T',
    en: 'Tunisia',
  },
  {
    code: '90',
    zh: '土耳其',
    icon: 'flag_tr',
    locale: 'TR',
    initial: 'T',
    en: 'Turkey',
    hasCompany: true,
  },
  {
    code: '993',
    zh: '土库曼斯坦',
    icon: 'flag_tm',
    locale: 'TM',
    initial: 'T',
    en: 'Turkmenistan',
  },
  {
    code: '1',
    zh: '特克斯和凯科斯群岛',
    icon: 'flag_tc',
    locale: 'TC',
    initial: 'T',
    en: 'Turks and Caicos Islands',
  },
  {
    code: '688',
    zh: '图瓦卢',
    icon: 'flag_tv',
    locale: 'TV',
    initial: 'T',
    en: 'Tuvalu',
  },
  {
    code: '1',
    zh: '美属维京群岛',
    icon: 'flag_vi',
    locale: 'VI',
    isFirst: true,
    initial: 'U',
    en: 'US Virgin Islands',
  },
  {
    code: '256',
    zh: '乌干达',
    icon: 'flag_ug',
    locale: 'UG',
    initial: 'U',
    en: 'Uganda',
  },
  {
    code: '380',
    zh: '乌克兰',
    icon: 'flag_ua',
    locale: 'UA',
    initial: 'U',
    en: 'Ukraine',
    hasCompany: true,
  },
  {
    code: '971',
    zh: '阿联酋',
    icon: 'flag_ae',
    locale: 'AE',
    initial: 'U',
    en: 'United Arab Emirates',
  },
  {
    code: '44',
    zh: '英国',
    icon: 'flag_gb',
    locale: 'GB',
    initial: 'U',
    en: 'United Kingdom',
    hasCompany: true,
  },
  {
    code: '1',
    zh: '美国',
    icon: 'flag_us',
    locale: 'US',
    initial: 'U',
    en: 'United States',
    hasCompany: true,
  },
  {
    code: '598',
    zh: '乌拉圭',
    icon: 'flag_uy',
    locale: 'UY',
    initial: 'U',
    en: 'Uruguay',
  },
  {
    code: '998',
    zh: '乌兹别克斯坦',
    icon: 'flag_uz',
    locale: 'UZ',
    initial: 'U',
    en: 'Uzbekistan',
  },
  {
    code: '678',
    zh: '瓦努阿图',
    icon: 'flag_vu',
    locale: 'VU',
    isFirst: true,
    initial: 'V',
    en: 'Vanuatu',
  },
  {
    code: '58',
    zh: '委内瑞拉',
    icon: 'flag_ve',
    locale: 'VE',
    initial: 'V',
    en: 'Venezuela',
  },
  {
    code: '84',
    zh: '越南',
    icon: 'flag_vn',
    locale: 'VN',
    initial: 'V',
    en: 'Vietnam',
  },
  {
    code: '681',
    zh: '瓦利斯和富图纳群岛',
    icon: 'flag_wf',
    locale: 'WF',
    isFirst: true,
    initial: 'W',
    en: 'Wallis and Futuna',
  },
  {
    code: '212',
    zh: '西撒哈拉',
    icon: 'flag_eh',
    locale: 'EH',
    initial: 'W',
    en: 'Western Sahara',
  },
  {
    code: '967',
    zh: '也门',
    icon: 'flag_ye',
    locale: 'YE',
    isFirst: true,
    initial: 'Y',
    en: 'Yemen',
  },
  {
    code: '260',
    zh: '赞比亚',
    icon: 'flag_zm',
    locale: 'ZM',
    isFirst: true,
    initial: 'Z',
    en: 'Zambia',
  },
  {
    code: '263',
    zh: '津巴布韦',
    icon: 'flag_zw',
    locale: 'ZW',
    initial: 'Z',
    en: 'Zimbabwe',
  },
];

/**
 * 获取所有国别信息
 * @returns
 */
export const getAllNations = () => {
  return nations;
};

// 获取具有厂商的国别
export const getHasCompanyNations = () => {
  return nations.filter((item) => item.hasCompany);
};

/**
 * 根据locale字段获取具体国家
 * @param {*} locale
 * @returns
 */
export const getByLocale = (locale: string) => {
  const filtered = nations.filter((n) => n.locale === locale);
  if (filtered.length) {
    return filtered[0];
  }
  return null;
};

/**
 * 根据code字段获取具体国家
 * @param {*} code
 * @returns
 */
export const getByCode = (code: string) => {
  const filtered = nations.filter((n) => n.code === code);
  if (filtered.length) {
    return filtered[0];
  }
  return null;
};

/**
 * 根据en字段获取具体国家
 * @param {*} en
 * @returns
 */
export const getByEn = (en: string): string | null => {
  const filtered = nations.filter((n) => n.en === en);
  if (filtered.length) {
    return filtered[0].locale;
  }
  return null;
};
