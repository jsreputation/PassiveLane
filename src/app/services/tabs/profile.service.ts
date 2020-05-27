import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {tap} from "rxjs/operators";
import {ToastService} from "../UI/toast.service";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    savedProfileDetail = {} as any;

    countries: any[] = [
        {
            id: 0,
            countryName: 'United Kingdom',
            country: 'GBR',
            phonePrefix: '+44',
        },
        {
            id: 1,
            countryName: 'United States',
            country: 'USA',
            phonePrefix: '+1',
        },
        {
            id: 2,
            countryName: 'Afghanistan',
            country: 'AFG',
            phonePrefix: '+93',
        },
        {
            id: 3,
            countryName: 'Albania',
            country: 'ALB',
            phonePrefix: '+355',
        },
        {
            id: 4,
            countryName: 'Algeria',
            country: 'DZA',
            phonePrefix: '+213',
        },
        {
            id: 5,
            countryName: 'American Samoa',
            country: 'ASM',
            phonePrefix: '+1684',
        },
        {
            id: 6,
            countryName: 'Andorra',
            country: 'AND',
            phonePrefix: '+376',
        },
        {
            id: 7,
            countryName: 'Angola',
            country: 'AGO',
            phonePrefix: '+244',
        },
        {
            id: 8,
            countryName: 'Anguilla',
            country: 'AIA',
            phonePrefix: '+1264',
        },
        {
            id: 9,
            countryName: 'Antarctica',
            country: 'ATA',
            phonePrefix: '+672',
        },
        {
            id: 10,
            countryName: 'Antigua and Barbuda',
            country: 'ATG',
            phonePrefix: '+1268',
        },
        {
            id: 11,
            countryName: 'Argentina',
            country: 'ARG',
            phonePrefix: '+54',
        },
        {
            id: 12,
            countryName: 'Armenia',
            country: 'ARM',
            phonePrefix: '+374',
        },
        {
            id: 13,
            countryName: 'Aruba',
            country: 'ABW',
            phonePrefix: '+297',
        },
        {
            id: 14,
            countryName: 'Australia',
            country: 'AUS',
            phonePrefix: '+61',
        },
        {
            id: 15,
            countryName: 'Austria',
            country: 'AUT',
            phonePrefix: '+43',
        },
        {
            id: 16,
            countryName: 'Azerbaijan',
            country: 'AZE',
            phonePrefix: '+994',
        },
        {
            id: 17,
            countryName: 'Bahamas',
            country: 'BHS',
            phonePrefix: '+1242',
        },
        {
            id: 18,
            countryName: 'Bahrain',
            country: 'BHR',
            phonePrefix: '+973',
        },
        {
            id: 19,
            countryName: 'Bangladesh',
            country: 'BGD',
            phonePrefix: '+880',
        },
        {
            id: 20,
            countryName: 'Barbados',
            country: 'BRB',
            phonePrefix: '+1246',
        },
        {
            id: 21,
            countryName: 'Belarus',
            country: 'BLR',
            phonePrefix: '+375',
        },
        {
            id: 22,
            countryName: 'Belgium',
            country: 'BEL',
            phonePrefix: '+32',
        },
        {
            id: 23,
            countryName: 'Belize',
            country: 'BLZ',
            phonePrefix: '+501',
        },
        {
            id: 24,
            countryName: 'Benin',
            country: 'BEN',
            phonePrefix: '+229',
        },
        {
            id: 25,
            countryName: 'Bermuda',
            country: 'BMU',
            phonePrefix: '+1441',
        },
        {
            id: 26,
            countryName: 'Bhutan',
            country: 'BTN',
            phonePrefix: '+975',
        },
        {
            id: 27,
            countryName: 'Bolivia',
            country: 'BOL',
            phonePrefix: '+591',
        },
        {
            id: 28,
            countryName: 'Bonaire',
            country: 'BES',
            phonePrefix: '+599',
        },
        {
            id: 29,
            countryName: 'Bosnia',
            country: 'BIH',
            phonePrefix: '+387',
        },
        {
            id: 30,
            countryName: 'Botswana',
            country: 'BWA',
            phonePrefix: '+267',
        },
        {
            id: 31,
            countryName: 'Bouvet Island',
            country: 'BVT',
            phonePrefix: '+55',
        },
        {
            id: 32,
            countryName: 'Brazil',
            country: 'BRA',
            phonePrefix: '+55',
        },
        {
            id: 33,
            countryName: 'Brunei Darussalam',
            country: 'BRN',
            phonePrefix: '+673',
        },
        {
            id: 34,
            countryName: 'Bulgaria',
            country: 'BGR',
            phonePrefix: '+359',
        },
        {
            id: 35,
            countryName: 'Burkina Faso',
            country: 'BFA',
            phonePrefix: '+226',
        },
        {
            id: 36,
            countryName: 'Burundi',
            country: 'BDI',
            phonePrefix: '+257',
        },
        {
            id: 37,
            countryName: 'Cambodia',
            country: 'KHM',
            phonePrefix: '+855',
        },
        {
            id: 38,
            countryName: 'Cameroon',
            country: 'CMR',
            phonePrefix: '+237',
        },
        {
            id: 39,
            countryName: 'Canada',
            country: 'CAN',
            phonePrefix: '+1',
        },
        {
            id: 40,
            countryName: 'Cape Verde',
            country: 'CPV',
            phonePrefix: '+238',
        },
        {
            id: 41,
            countryName: 'Cayman Islands',
            country: 'CYM',
            phonePrefix: '+1345',
        },
        {
            id: 42,
            countryName: 'Chad',
            country: 'TCD',
            phonePrefix: '+235',
        },
        {
            id: 43,
            countryName: 'Chile',
            country: 'CHL',
            phonePrefix: '+56',
        },
        {
            id: 44,
            countryName: 'China',
            country: 'CHN',
            phonePrefix: '+86',
        },
        {
            id: 45,
            countryName: 'Christmas Island',
            country: 'CXR',
            phonePrefix: '+61',
        },
        {
            id: 46,
            countryName: 'Colombia',
            country: 'COL',
            phonePrefix: '+57',
        },
        {
            id: 47,
            countryName: 'Comoros',
            country: 'COM',
            phonePrefix: '+269',
        },
        {
            id: 48,
            countryName: 'Congo',
            country: 'COG',
            phonePrefix: '+243',
        },
        {
            id: 49,
            countryName: 'Cook Islands',
            country: 'COK',
            phonePrefix: '+682',
        },
        {
            id: 50,
            countryName: 'Costa Rica',
            country: 'CRI',
            phonePrefix: '+506',
        },
        {
            id: 51,
            countryName: 'Croatia',
            country: 'HRV',
            phonePrefix: '+385',
        },
        {
            id: 52,
            countryName: 'Cuba',
            country: 'CUB',
            phonePrefix: '+53',
        },
        {
            id: 53,
            countryName: 'Curaçao',
            country: 'CUW',
            phonePrefix: '+599',
        },
        {
            id: 54,
            countryName: 'Cyprus',
            country: 'CYP',
            phonePrefix: '+357',
        },
        {
            id: 55,
            countryName: 'Czech Republic',
            country: 'CZE',
            phonePrefix: '+420',
        },
        {
            id: 56,
            countryName: 'Côte d\'Ivoire',
            country: 'CIV',
            phonePrefix: '+225',
        },
        {
            id: 57,
            countryName: 'Denmark',
            country: 'DNK',
            phonePrefix: '+45',
        },
        {
            id: 58,
            countryName: 'Djibouti',
            country: 'DJI',
            phonePrefix: '+253',
        },
        {
            id: 59,
            countryName: 'Dominica',
            country: 'DMA',
            phonePrefix: '+767',
        },
        {
            id: 60,
            countryName: 'Dominican Republic',
            country: 'DOM',
            phonePrefix: '+809',
        },
        {
            id: 61,
            countryName: 'Ecuador',
            country: 'ECU',
            phonePrefix: '+593',
        },
        {
            id: 62,
            countryName: 'Egypt',
            country: 'EGY',
            phonePrefix: '+20',
        },
        {
            id: 63,
            countryName: 'El Salvador',
            country: 'SLV',
            phonePrefix: '+503',
        },
        {
            id: 64,
            countryName: 'Equatorial Guinea',
            country: 'GNQ',
            phonePrefix: '+240',
        },
        {
            id: 65,
            countryName: 'Eritrea',
            country: 'ERI',
            phonePrefix: '+291',
        },
        {
            id: 66,
            countryName: 'Estonia',
            country: 'EST',
            phonePrefix: '+372',
        },
        {
            id: 67,
            countryName: 'Ethiopia',
            country: 'ETH',
            phonePrefix: '+251',
        },
        {
            id: 68,
            countryName: 'Faroe Islands',
            country: 'FRO',
            phonePrefix: '+298',
        },
        {
            id: 69,
            countryName: 'Fiji',
            country: 'FJI',
            phonePrefix: '+679',
        },
        {
            id: 70,
            countryName: 'Finland',
            country: 'FIN',
            phonePrefix: '+358',
        },
        {
            id: 71,
            countryName: 'France',
            country: 'FRA',
            phonePrefix: '+33',
        },
        {
            id: 72,
            countryName: 'French Guiana',
            country: 'GUF',
            phonePrefix: '+594',
        },
        {
            id: 73,
            countryName: 'French Polynesia',
            country: 'PYF',
            phonePrefix: '+689',
        },
        {
            id: 74,
            countryName: 'Gabon',
            country: 'GAB',
            phonePrefix: '+241',
        },
        {
            id: 75,
            countryName: 'Gambia',
            country: 'GMB',
            phonePrefix: '+220',
        },
        {
            id: 76,
            countryName: 'Georgia',
            country: 'GEO',
            phonePrefix: '+995',
        },
        {
            id: 77,
            countryName: 'Germany',
            country: 'DEU',
            phonePrefix: '+49',
        },
        {
            id: 78,
            countryName: 'Ghana',
            country: 'GHA',
            phonePrefix: '+233',
        },
        {
            id: 79,
            countryName: 'Gibraltar',
            country: 'GIB',
            phonePrefix: '+350',
        },
        {
            id: 80,
            countryName: 'Greece',
            country: 'GRC',
            phonePrefix: '+30',
        },
        {
            id: 81,
            countryName: 'Greenland',
            country: 'GRL',
            phonePrefix: '+299',
        },
        {
            id: 82,
            countryName: 'Grenada',
            country: 'GRD',
            phonePrefix: '+1473',
        },
        {
            id: 83,
            countryName: 'Guadeloupe',
            country: 'GLP',
            phonePrefix: '+590',
        },
        {
            id: 84,
            countryName: 'Guam',
            country: 'GUM',
            phonePrefix: '+1',
        },
        {
            id: 85,
            countryName: 'Guatemala',
            country: 'GTM',
            phonePrefix: '+502',
        },
        {
            id: 86,
            countryName: 'Guernsey',
            country: 'GGY',
            phonePrefix: '+44',
        },
        {
            id: 87,
            countryName: 'Guinea',
            country: 'GIN',
            phonePrefix: '+224',
        },
        {
            id: 88,
            countryName: 'Guinea-Bissau',
            country: 'GNB',
            phonePrefix: '+245',
        },
        {
            id: 89,
            countryName: 'Guyana',
            country: 'GUY',
            phonePrefix: '+592',
        },
        {
            id: 90,
            countryName: 'Haiti',
            country: 'HTI',
            phonePrefix: '+509',
        },
        {
            id: 91,
            countryName: 'Honduras',
            country: 'HND',
            phonePrefix: '+504',
        },
        {
            id: 92,
            countryName: 'Hong Kong',
            country: 'HKG',
            phonePrefix: '+852',
        },
        {
            id: 93,
            countryName: 'Hungary',
            country: 'HUN',
            phonePrefix: '+36',
        },
        {
            id: 94,
            countryName: 'Iceland',
            country: 'ISL',
            phonePrefix: '+354',
        },
        {
            id: 95,
            countryName: 'India',
            country: 'IND',
            phonePrefix: '+91',
        },
        {
            id: 96,
            countryName: 'Indonesia',
            country: 'IDN',
            phonePrefix: '+62',
        },
        {
            id: 97,
            countryName: 'Iran',
            country: 'IRN',
            phonePrefix: '+98',
        },
        {
            id: 98,
            countryName: 'Iraq',
            country: 'IRQ',
            phonePrefix: '+964',
        },
        {
            id: 99,
            countryName: 'Ireland',
            country: 'IRL',
            phonePrefix: '+353',
        },
        {
            id: 100,
            countryName: 'Isle of Man',
            country: 'IMN',
            phonePrefix: '+44',
        },
        {
            id: 101,
            countryName: 'Israel',
            country: 'ISR',
            phonePrefix: '+972',
        },
        {
            id: 102,
            countryName: 'Italy',
            country: 'ITA',
            phonePrefix: '+39',
        },
        {
            id: 103,
            countryName: 'Jamaica',
            country: 'JAM',
            phonePrefix: '+876',
        },
        {
            id: 104,
            countryName: 'Japan',
            country: 'JPN',
            phonePrefix: '+81',
        },
        {
            id: 105,
            countryName: 'Jersey',
            country: 'JEY',
            phonePrefix: '+44',
        },
        {
            id: 106,
            countryName: 'Jordan',
            country: 'JOR',
            phonePrefix: '+962',
        },
        {
            id: 107,
            countryName: 'Kazakhstan',
            country: 'KAZ',
            phonePrefix: '+7',
        },
        {
            id: 108,
            countryName: 'Kenya',
            country: 'KEN',
            phonePrefix: '+254',
        },
        {
            id: 109,
            countryName: 'Kiribati',
            country: 'KIR',
            phonePrefix: '+686',
        },
        {
            id: 110,
            countryName: 'Korea',
            country: 'KOR',
            phonePrefix: '+82',
        },
        {
            id: 111,
            countryName: 'Korea',
            country: 'PRK',
            phonePrefix: '+82',
        },
        {
            id: 112,
            countryName: 'Kuwait',
            country: 'KWT',
            phonePrefix: '+965',
        },
        {
            id: 113,
            countryName: 'Kyrgyzstan',
            country: 'KGZ',
            phonePrefix: '+996',
        },
        {
            id: 114,
            countryName: 'Latvia',
            country: 'LVA',
            phonePrefix: '+371',
        },
        {
            id: 115,
            countryName: 'Lebanon',
            country: 'LBN',
            phonePrefix: '+961',
        },
        {
            id: 116,
            countryName: 'Lesotho',
            country: 'LSO',
            phonePrefix: '+266',
        },
        {
            id: 117,
            countryName: 'Liberia',
            country: 'LBR',
            phonePrefix: '+231',
        },
        {
            id: 118,
            countryName: 'Libya',
            country: 'LBY',
            phonePrefix: '+218',
        },
        {
            id: 119,
            countryName: 'Liechtenstein',
            country: 'LIE',
            phonePrefix: '+423',
        },
        {
            id: 120,
            countryName: 'Lithuania',
            country: 'LTU',
            phonePrefix: '+370',
        },
        {
            id: 121,
            countryName: 'Luxembourg',
            country: 'LUX',
            phonePrefix: '+352',
        },
        {
            id: 122,
            countryName: 'Macao',
            country: 'MAC',
            phonePrefix: '+853',
        },
        {
            id: 123,
            countryName: 'Macedonia',
            country: 'MKD',
            phonePrefix: '+389',
        },
        {
            id: 124,
            countryName: 'Madagascar',
            country: 'MDG',
            phonePrefix: '+261',
        },
        {
            id: 125,
            countryName: 'Malawi',
            country: 'MWI',
            phonePrefix: '+265',
        },
        {
            id: 126,
            countryName: 'Malaysia',
            country: 'MYS',
            phonePrefix: '+60',
        },
        {
            id: 127,
            countryName: 'Maldives',
            country: 'MDV',
            phonePrefix: '+960',
        },
        {
            id: 128,
            countryName: 'Mali',
            country: 'MLI',
            phonePrefix: '+223',
        },
        {
            id: 129,
            countryName: 'Malta',
            country: 'MLT',
            phonePrefix: '+356',
        },
        {
            id: 130,
            countryName: 'Marshall Islands',
            country: 'MHL',
            phonePrefix: '+692',
        },
        {
            id: 131,
            countryName: 'Martinique',
            country: 'MTQ',
            phonePrefix: '+596',
        },
        {
            id: 132,
            countryName: 'Mauritania',
            country: 'MRT',
            phonePrefix: '+222',
        },
        {
            id: 133,
            countryName: 'Mauritius',
            country: 'MUS',
            phonePrefix: '+230',
        },
        {
            id: 134,
            countryName: 'Mayotte',
            country: 'MYT',
            phonePrefix: '+262',
        },
        {
            id: 135,
            countryName: 'Mexico',
            country: 'MEX',
            phonePrefix: '+52',
        },
        {
            id: 136,
            countryName: 'Micronesia',
            country: 'FSM',
            phonePrefix: '+691',
        },
        {
            id: 137,
            countryName: 'Moldova',
            country: 'MDA',
            phonePrefix: '+373',
        },
        {
            id: 138,
            countryName: 'Monaco',
            country: 'MCO',
            phonePrefix: '+377',
        },
        {
            id: 139,
            countryName: 'Mongolia',
            country: 'MNG',
            phonePrefix: '+976',
        },
        {
            id: 140,
            countryName: 'Montenegro',
            country: 'MNE',
            phonePrefix: '+382',
        },
        {
            id: 141,
            countryName: 'Montserrat',
            country: 'MSR',
            phonePrefix: '+1664',
        },
        {
            id: 142,
            countryName: 'Morocco',
            country: 'MAR',
            phonePrefix: '+212',
        },
        {
            id: 143,
            countryName: 'Mozambique',
            country: 'MOZ',
            phonePrefix: '+258',
        },
        {
            id: 144,
            countryName: 'Myanmar',
            country: 'MMR',
            phonePrefix: '+95',
        },
        {
            id: 145,
            countryName: 'Namibia',
            country: 'NAM',
            phonePrefix: '+264',
        },
        {
            id: 146,
            countryName: 'Nauru',
            country: 'NRU',
            phonePrefix: '+674',
        },
        {
            id: 147,
            countryName: 'Nepal',
            country: 'NPL',
            phonePrefix: '+977',
        },
        {
            id: 148,
            countryName: 'Netherlands',
            country: 'NLD',
            phonePrefix: '+31',
        },
        {
            id: 149,
            countryName: 'New Caledonia',
            country: 'NCL',
            phonePrefix: '+687',
        },
        {
            id: 150,
            countryName: 'New Zealand',
            country: 'NZL',
            phonePrefix: '+64',
        },
        {
            id: 151,
            countryName: 'Nicaragua',
            country: 'NIC',
            phonePrefix: '+505',
        },
        {
            id: 152,
            countryName: 'Niger',
            country: 'NER',
            phonePrefix: '+227',
        },
        {
            id: 153,
            countryName: 'Nigeria',
            country: 'NGA',
            phonePrefix: '+234',
        },
        {
            id: 154,
            countryName: 'Niue',
            country: 'NIU',
            phonePrefix: '+683',
        },
        {
            id: 155,
            countryName: 'Norfolk Island',
            country: 'NFK',
            phonePrefix: '+672',
        },
        {
            id: 156,
            countryName: 'Norway',
            country: 'NOR',
            phonePrefix: '+47',
        },
        {
            id: 157,
            countryName: 'Oman',
            country: 'OMN',
            phonePrefix: '+968',
        },
        {
            id: 158,
            countryName: 'Pakistan',
            country: 'PAK',
            phonePrefix: '+92',
        },
        {
            id: 159,
            countryName: 'Palau',
            country: 'PLW',
            phonePrefix: '+680',
        },
        {
            id: 160,
            countryName: 'Palestine',
            country: 'PSE',
            phonePrefix: '+970',
        },
        {
            id: 161,
            countryName: 'Panama',
            country: 'PAN',
            phonePrefix: '+507',
        },
        {
            id: 162,
            countryName: 'Papua New Guinea',
            country: 'PNG',
            phonePrefix: '+675',
        },
        {
            id: 163,
            countryName: 'Paraguay',
            country: 'PRY',
            phonePrefix: '+595',
        },
        {
            id: 164,
            countryName: 'Peru',
            country: 'PER',
            phonePrefix: '+51',
        },
        {
            id: 165,
            countryName: 'Philippines',
            country: 'PHL',
            phonePrefix: '+63',
        },
        {
            id: 166,
            countryName: 'Pitcairn',
            country: 'PCN',
            phonePrefix: '+64',
        },
        {
            id: 167,
            countryName: 'Poland',
            country: 'POL',
            phonePrefix: '+48',
        },
        {
            id: 168,
            countryName: 'Portugal',
            country: 'PRT',
            phonePrefix: '+351',
        },
        {
            id: 169,
            countryName: 'Puerto Rico',
            country: 'PRI',
            phonePrefix: '+1',
        },
        {
            id: 170,
            countryName: 'Qatar',
            country: 'QAT',
            phonePrefix: '+974',
        },
        {
            id: 171,
            countryName: 'Romania',
            country: 'ROU',
            phonePrefix: '+40',
        },
        {
            id: 172,
            countryName: 'Russian Federation',
            country: 'RUS',
            phonePrefix: '+7',
        },
        {
            id: 173,
            countryName: 'Rwanda',
            country: 'RWA',
            phonePrefix: '+250',
        },
        {
            id: 174,
            countryName: 'Réunion',
            country: 'REU',
            phonePrefix: '+262',
        },
        {
            id: 175,
            countryName: 'Saint Barthélemy',
            country: 'BLM',
            phonePrefix: '+590',
        },
        {
            id: 176,
            countryName: 'Saint Helena',
            country: 'SHN',
            phonePrefix: '+290',
        },
        {
            id: 177,
            countryName: 'Saint Lucia',
            country: 'LCA',
            phonePrefix: '+1758',
        },
        {
            id: 178,
            countryName: 'Samoa',
            country: 'WSM',
            phonePrefix: '+685',
        },
        {
            id: 179,
            countryName: 'San Marino',
            country: 'SMR',
            phonePrefix: '+39',
        },
        {
            id: 180,
            countryName: 'Saudi Arabia',
            country: 'SAU',
            phonePrefix: '+966',
        },
        {
            id: 181,
            countryName: 'Senegal',
            country: 'SEN',
            phonePrefix: '+221',
        },
        {
            id: 182,
            countryName: 'Serbia',
            country: 'SRB',
            phonePrefix: '+381',
        },
        {
            id: 183,
            countryName: 'Seychelles',
            country: 'SYC',
            phonePrefix: '+248',
        },
        {
            id: 184,
            countryName: 'Sierra Leone',
            country: 'SLE',
            phonePrefix: '+232',
        },
        {
            id: 185,
            countryName: 'Singapore',
            country: 'SGP',
            phonePrefix: '+65',
        },
        {
            id: 186,
            countryName: 'Slovakia',
            country: 'SVK',
            phonePrefix: '+421',
        },
        {
            id: 187,
            countryName: 'Slovenia',
            country: 'SVN',
            phonePrefix: '+386',
        },
        {
            id: 188,
            countryName: 'Solomon Islands',
            country: 'SLB',
            phonePrefix: '+677',
        },
        {
            id: 189,
            countryName: 'Somalia',
            country: 'SOM',
            phonePrefix: '+252',
        },
        {
            id: 190,
            countryName: 'South Africa',
            country: 'ZAF',
            phonePrefix: '+27',
        },
        {
            id: 191,
            countryName: 'South Sudan',
            country: 'SSD',
            phonePrefix: '+211',
        },
        {
            id: 192,
            countryName: 'Spain',
            country: 'ESP',
            phonePrefix: '+34',
        },
        {
            id: 193,
            countryName: 'Sri Lanka',
            country: 'LKA',
            phonePrefix: '+94',
        },
        {
            id: 194,
            countryName: 'Sudan',
            country: 'SDN',
            phonePrefix: '+249',
        },
        {
            id: 195,
            countryName: 'Suriname',
            country: 'SUR',
            phonePrefix: '+597',
        },
        {
            id: 196,
            countryName: 'Swaziland',
            country: 'SWZ',
            phonePrefix: '+268',
        },
        {
            id: 197,
            countryName: 'Sweden',
            country: 'SWE',
            phonePrefix: '+46',
        },
        {
            id: 198,
            countryName: 'Switzerland',
            country: 'CHE',
            phonePrefix: '+41',
        },
        {
            id: 199,
            countryName: 'Syrian Arab Republic',
            country: 'SYR',
            phonePrefix: '+963',
        },
        {
            id: 200,
            countryName: 'Taiwan',
            country: 'TWN',
            phonePrefix: '+886',
        },
        {
            id: 201,
            countryName: 'Tajikistan',
            country: 'TJK',
            phonePrefix: '+992',
        },
        {
            id: 202,
            countryName: 'Tanzania',
            country: 'TZA',
            phonePrefix: '+255',
        },
        {
            id: 203,
            countryName: 'Thailand',
            country: 'THA',
            phonePrefix: '+66',
        },
        {
            id: 204,
            countryName: 'Timor-Leste',
            country: 'TLS',
            phonePrefix: '+670',
        },
        {
            id: 205,
            countryName: 'Togo',
            country: 'TGO',
            phonePrefix: '+228',
        },
        {
            id: 206,
            countryName: 'Tokelau',
            country: 'TKL',
            phonePrefix: '+690',
        },
        {
            id: 207,
            countryName: 'Tonga',
            country: 'TON',
            phonePrefix: '+676',
        },
        {
            id: 208,
            countryName: 'Trinidad and Tobago',
            country: 'TTO',
            phonePrefix: '+868',
        },
        {
            id: 209,
            countryName: 'Tunisia',
            country: 'TUN',
            phonePrefix: '+216',
        },
        {
            id: 210,
            countryName: 'Turkey',
            country: 'TUR',
            phonePrefix: '+90',
        },
        {
            id: 211,
            countryName: 'Turkmenistan',
            country: 'TKM',
            phonePrefix: '+993',
        },
        {
            id: 212,
            countryName: 'Tuvalu',
            country: 'TUV',
            phonePrefix: '+688',
        },
        {
            id: 213,
            countryName: 'Uganda',
            country: 'UGA',
            phonePrefix: '+256',
        },
        {
            id: 214,
            countryName: 'Ukraine',
            country: 'UKR',
            phonePrefix: '+380',
        },
        {
            id: 215,
            countryName: 'United Arab Emirates',
            country: 'ARE',
            phonePrefix: '+971',
        },
        {
            id: 216,
            countryName: 'Uruguay',
            country: 'URY',
            phonePrefix: '+598',
        },
        {
            id: 217,
            countryName: 'Uzbekistan',
            country: 'UZB',
            phonePrefix: '+998',
        },
        {
            id: 218,
            countryName: 'Vanuatu',
            country: 'VUT',
            phonePrefix: '+678',
        },
        {
            id: 219,
            countryName: 'Venezuela',
            country: 'VEN',
            phonePrefix: '+58',
        },
        {
            id: 220,
            countryName: 'Viet Nam',
            country: 'VNM',
            phonePrefix: '+84',
        },
        {
            id: 221,
            countryName: 'Virgin Islands',
            country: 'VGB',
            phonePrefix: '+1',
        },
        {
            id: 222,
            countryName: 'Wallis and Futuna',
            country: 'WLF',
            phonePrefix: '+681',
        },
        {
            id: 223,
            countryName: 'Western Sahara',
            country: 'ESH',
            phonePrefix: '+212',
        },
        {
            id: 224,
            countryName: 'Yemen',
            country: 'YEM',
            phonePrefix: '+967',
        },
        {
            id: 225,
            countryName: 'Zambia',
            country: 'ZMB',
            phonePrefix: '+260',
        },
        {
            id: 226,
            countryName: 'Zimbabwe',
            country: 'ZWE',
            phonePrefix: '+263',
        },
    ];

    constructor(
        private https: HttpClient,
        private authService: AuthService,
        private toastUIService: ToastService
    ) {
    }

    getBasicInfo(): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/profilebasicinfo', {params: this.authService.userInfo});
    }


    getContactNumber(): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/profilecontactinfo', {params: this.authService.userInfo});
    }

    getCountries(): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/profilecontactcountries', {params: this.authService.userInfo});
    }

    getMatiVerification(): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/photoid', {params: this.authService.userInfo});
    }

    getAddressDetail(): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/profileaddressinfo', {params: this.authService.userInfo});
    }

    saveProfile(url, data): Observable<any> {
        return this.https.get(url, {params: data}).pipe(tap((res) => {
            this.toastUIService.presentToast(res, 'all');
        }));
    }

    changePassword(data): Observable<any> {
        return this.https.post('https://www.passivelane.com/apiinvestor/changepassword', data).pipe(tap((res) => {
            this.toastUIService.presentToast(res, 'all');
        }));
    }

    saveSignature(url, data): Observable<any> {
        return this.https.post(url, data).pipe(tap((res) => {
            this.toastUIService.presentToast(res, 'all');
        }));
    }

    getAddressInfo(data): Observable<any> {
        const formdata = new FormData();
        Object.keys(data).forEach((key) => { formdata.append(key, data[key])});
        return this.https.post('https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.10/json3.ws', formdata);
    }

    getRetrieveAddressInfo(data): Observable<any> {
        const formdata = new FormData();
        Object.keys(data).forEach((key) => { formdata.append(key, data[key])});
        return this.https.post('https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws', formdata);
    }

    getBankInfo(data): Observable<any> {
        return this.https.get('https://api.addressy.com/BankAccountValidation/Interactive/Validate/v2.00/json3.ws', {params: data});
    }

    getBankDetail(): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/profilebankdetails', {params: this.authService.userInfo});
    }


    getBankDetailInfo(data): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/confirmpaymentbankinfo', {params: data});
    }

    getSignature(data): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/issignatured', {params: data});
    }


    sendSMS(data): Observable<any> {
        return this.https.get('https://www.passivelane.com/apisms/sendsms', {params: data}).pipe(
            tap((res) => {
                console.log(res);
                if (res.RESPONSECODE === 0) {
                    this.toastUIService.presentToast(res, 'danger');
                }
            })
        );
    }

    verifyOTP(data): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiinvestor/verifyotp', {params: data}).pipe(
            tap((res) => {
                console.log(res);
                if (res.RESPONSECODE === 0) {
                    this.toastUIService.presentToast(res, 'all');
                }
            })
        );
    }

    mailVerification(data): Observable<any> {
        return this.https.get('https://www.passivelane.com/apiusers/mailVerification', {params: data}).pipe(
            tap((res) => {
                console.log(res);
                if (res.RESPONSECODE === 0) {
                    this.toastUIService.presentToast(res, 'all');
                }
            })
        );
    }

}
