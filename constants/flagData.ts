export interface Country {
    id: string;
    name: string;
    flag: string; // Image path to flag SVG
    region: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export const COUNTRIES: Country[] = [
    // EASY - Well-known major countries that most people recognize

    // North America - Easy
    { id: 'us', name: 'United States', flag: require('@/assets/images/flags/us.svg'), region: 'North America', difficulty: 'easy' },
    { id: 'ca', name: 'Canada', flag: require('@/assets/images/flags/ca.svg'), region: 'North America', difficulty: 'easy' },
    { id: 'mx', name: 'Mexico', flag: require('@/assets/images/flags/mx.svg'), region: 'North America', difficulty: 'easy' },

    // Europe - Easy
    { id: 'gb', name: 'United Kingdom', flag: require('@/assets/images/flags/gb.svg'), region: 'Europe', difficulty: 'easy' },
    { id: 'fr', name: 'France', flag: require('@/assets/images/flags/fr.svg'), region: 'Europe', difficulty: 'easy' },
    { id: 'de', name: 'Germany', flag: require('@/assets/images/flags/de.svg'), region: 'Europe', difficulty: 'easy' },
    { id: 'it', name: 'Italy', flag: require('@/assets/images/flags/it.svg'), region: 'Europe', difficulty: 'easy' },
    { id: 'es', name: 'Spain', flag: require('@/assets/images/flags/es.svg'), region: 'Europe', difficulty: 'easy' },
    { id: 'ru', name: 'Russia', flag: require('@/assets/images/flags/ru.svg'), region: 'Europe', difficulty: 'easy' },
    { id: 'nl', name: 'Netherlands', flag: require('@/assets/images/flags/nl.svg'), region: 'Europe', difficulty: 'easy' },

    // Asia - Easy
    { id: 'cn', name: 'China, People\'s Republic of', flag: require('@/assets/images/flags/cn.svg'), region: 'Asia', difficulty: 'easy' },
    { id: 'jp', name: 'Japan', flag: require('@/assets/images/flags/jp.svg'), region: 'Asia', difficulty: 'easy' },
    { id: 'in', name: 'India', flag: require('@/assets/images/flags/in.svg'), region: 'Asia', difficulty: 'easy' },
    { id: 'kr', name: 'South Korea', flag: require('@/assets/images/flags/kr.svg'), region: 'Asia', difficulty: 'easy' },

    // Oceania - Easy
    { id: 'au', name: 'Australia', flag: require('@/assets/images/flags/au.svg'), region: 'Oceania', difficulty: 'easy' },

    // South America - Easy
    { id: 'br', name: 'Brazil', flag: require('@/assets/images/flags/br.svg'), region: 'South America', difficulty: 'easy' },
    { id: 'ar', name: 'Argentina', flag: require('@/assets/images/flags/ar.svg'), region: 'South America', difficulty: 'easy' },

    // Africa - Easy
    { id: 'za', name: 'South Africa', flag: require('@/assets/images/flags/za.svg'), region: 'Africa', difficulty: 'easy' },
    { id: 'eg', name: 'Egypt', flag: require('@/assets/images/flags/eg.svg'), region: 'Africa', difficulty: 'easy' },

    // MEDIUM - Moderately well-known countries

    // Europe - Medium
    { id: 'se', name: 'Sweden', flag: require('@/assets/images/flags/se.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'no', name: 'Norway', flag: require('@/assets/images/flags/no.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'dk', name: 'Denmark', flag: require('@/assets/images/flags/dk.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'fi', name: 'Finland', flag: require('@/assets/images/flags/fi.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'be', name: 'Belgium', flag: require('@/assets/images/flags/be.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'ch', name: 'Switzerland', flag: require('@/assets/images/flags/ch.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'at', name: 'Austria', flag: require('@/assets/images/flags/at.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'pt', name: 'Portugal', flag: require('@/assets/images/flags/pt.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'gr', name: 'Greece', flag: require('@/assets/images/flags/gr.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'pl', name: 'Poland', flag: require('@/assets/images/flags/pl.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'cz', name: 'Czech Republic', flag: require('@/assets/images/flags/cz.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'hu', name: 'Hungary', flag: require('@/assets/images/flags/hu.svg'), region: 'Europe', difficulty: 'medium' },
    { id: 'ie', name: 'Ireland', flag: require('@/assets/images/flags/ie.svg'), region: 'Europe', difficulty: 'medium' },

    // Asia - Medium
    { id: 'th', name: 'Thailand', flag: require('@/assets/images/flags/th.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'vn', name: 'Vietnam', flag: require('@/assets/images/flags/vn.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'my', name: 'Malaysia', flag: require('@/assets/images/flags/my.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'sg', name: 'Singapore', flag: require('@/assets/images/flags/sg.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'ph', name: 'Philippines', flag: require('@/assets/images/flags/ph.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'id', name: 'Indonesia', flag: require('@/assets/images/flags/id.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'pk', name: 'Pakistan', flag: require('@/assets/images/flags/pk.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'bd', name: 'Bangladesh', flag: require('@/assets/images/flags/bd.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'ir', name: 'Iran', flag: require('@/assets/images/flags/ir.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'iq', name: 'Iraq', flag: require('@/assets/images/flags/iq.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'il', name: 'Israel', flag: require('@/assets/images/flags/il.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'tr', name: 'Turkey', flag: require('@/assets/images/flags/tr.svg'), region: 'Asia', difficulty: 'medium' },
    { id: 'sa', name: 'Saudi Arabia', flag: require('@/assets/images/flags/sa.svg'), region: 'Asia', difficulty: 'medium' },

    // Africa - Medium
    { id: 'ng', name: 'Nigeria', flag: require('@/assets/images/flags/ng.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'ke', name: 'Kenya', flag: require('@/assets/images/flags/ke.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'ma', name: 'Morocco', flag: require('@/assets/images/flags/ma.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'gh', name: 'Ghana', flag: require('@/assets/images/flags/gh.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'et', name: 'Ethiopia', flag: require('@/assets/images/flags/et.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'tz', name: 'Tanzania', flag: require('@/assets/images/flags/tz.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'ug', name: 'Uganda', flag: require('@/assets/images/flags/ug.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'dz', name: 'Algeria', flag: require('@/assets/images/flags/dz.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'tn', name: 'Tunisia', flag: require('@/assets/images/flags/tn.svg'), region: 'Africa', difficulty: 'medium' },
    { id: 'ly', name: 'Libya', flag: require('@/assets/images/flags/ly.svg'), region: 'Africa', difficulty: 'medium' },

    // South America - Medium
    { id: 'cl', name: 'Chile', flag: require('@/assets/images/flags/cl.svg'), region: 'South America', difficulty: 'medium' },
    { id: 'pe', name: 'Peru', flag: require('@/assets/images/flags/pe.svg'), region: 'South America', difficulty: 'medium' },
    { id: 'co', name: 'Colombia', flag: require('@/assets/images/flags/co.svg'), region: 'South America', difficulty: 'medium' },
    { id: 've', name: 'Venezuela', flag: require('@/assets/images/flags/ve.svg'), region: 'South America', difficulty: 'medium' },
    { id: 'ec', name: 'Ecuador', flag: require('@/assets/images/flags/ec.svg'), region: 'South America', difficulty: 'medium' },

    // Central America - Medium
    { id: 'cr', name: 'Costa Rica', flag: require('@/assets/images/flags/cr.svg'), region: 'Central America', difficulty: 'medium' },
    { id: 'pa', name: 'Panama', flag: require('@/assets/images/flags/pa.svg'), region: 'Central America', difficulty: 'medium' },
    { id: 'gt', name: 'Guatemala', flag: require('@/assets/images/flags/gt.svg'), region: 'Central America', difficulty: 'medium' },
    { id: 'cu', name: 'Cuba', flag: require('@/assets/images/flags/cu.svg'), region: 'Caribbean', difficulty: 'medium' },
    { id: 'jm', name: 'Jamaica', flag: require('@/assets/images/flags/jm.svg'), region: 'Caribbean', difficulty: 'medium' },

    // Oceania - Medium
    { id: 'nz', name: 'New Zealand', flag: require('@/assets/images/flags/nz.svg'), region: 'Oceania', difficulty: 'medium' },
    { id: 'fj', name: 'Fiji', flag: require('@/assets/images/flags/fj.svg'), region: 'Oceania', difficulty: 'medium' },
    { id: 'pg', name: 'Papua New Guinea', flag: require('@/assets/images/flags/pg.svg'), region: 'Oceania', difficulty: 'medium' },

    // HARD - Lesser-known countries, small nations, territories

    // Europe - Hard
    { id: 'is', name: 'Iceland', flag: require('@/assets/images/flags/is.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'mt', name: 'Malta', flag: require('@/assets/images/flags/mt.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'cy', name: 'Cyprus', flag: require('@/assets/images/flags/cy.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'lu', name: 'Luxembourg', flag: require('@/assets/images/flags/lu.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'ee', name: 'Estonia', flag: require('@/assets/images/flags/ee.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'lv', name: 'Latvia', flag: require('@/assets/images/flags/lv.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'lt', name: 'Lithuania', flag: require('@/assets/images/flags/lt.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'si', name: 'Slovenia', flag: require('@/assets/images/flags/si.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'sk', name: 'Slovakia', flag: require('@/assets/images/flags/sk.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'hr', name: 'Croatia', flag: require('@/assets/images/flags/hr.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'bg', name: 'Bulgaria', flag: require('@/assets/images/flags/bg.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'ro', name: 'Romania', flag: require('@/assets/images/flags/ro.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'rs', name: 'Serbia', flag: require('@/assets/images/flags/rs.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'ba', name: 'Bosnia and Herzegovina', flag: require('@/assets/images/flags/ba.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'me', name: 'Montenegro', flag: require('@/assets/images/flags/me.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'mk', name: 'North Macedonia', flag: require('@/assets/images/flags/mk.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'al', name: 'Albania', flag: require('@/assets/images/flags/al.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'by', name: 'Belarus', flag: require('@/assets/images/flags/by.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'ua', name: 'Ukraine', flag: require('@/assets/images/flags/ua.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'md', name: 'Moldova', flag: require('@/assets/images/flags/md.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'mc', name: 'Monaco', flag: require('@/assets/images/flags/mc.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'ad', name: 'Andorra', flag: require('@/assets/images/flags/ad.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'sm', name: 'San Marino', flag: require('@/assets/images/flags/sm.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'va', name: 'Vatican City', flag: require('@/assets/images/flags/va.svg'), region: 'Europe', difficulty: 'hard' },
    { id: 'li', name: 'Liechtenstein', flag: require('@/assets/images/flags/li.svg'), region: 'Europe', difficulty: 'hard' },

    // Asia - Hard
    { id: 'af', name: 'Afghanistan', flag: require('@/assets/images/flags/af.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'kz', name: 'Kazakhstan', flag: require('@/assets/images/flags/kz.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'uz', name: 'Uzbekistan', flag: require('@/assets/images/flags/uz.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'kg', name: 'Kyrgyzstan', flag: require('@/assets/images/flags/kg.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'tj', name: 'Tajikistan', flag: require('@/assets/images/flags/tj.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'tm', name: 'Turkmenistan', flag: require('@/assets/images/flags/tm.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'mn', name: 'Mongolia', flag: require('@/assets/images/flags/mn.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'kp', name: 'North Korea', flag: require('@/assets/images/flags/kp.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'mm', name: 'Myanmar', flag: require('@/assets/images/flags/mm.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'la', name: 'Laos', flag: require('@/assets/images/flags/la.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'kh', name: 'Cambodia', flag: require('@/assets/images/flags/kh.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'np', name: 'Nepal', flag: require('@/assets/images/flags/np.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'bt', name: 'Bhutan', flag: require('@/assets/images/flags/bt.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'lk', name: 'Sri Lanka', flag: require('@/assets/images/flags/lk.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'mv', name: 'Maldives', flag: require('@/assets/images/flags/mv.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'bn', name: 'Brunei', flag: require('@/assets/images/flags/bn.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'tl', name: 'East Timor', flag: require('@/assets/images/flags/tl.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'ge', name: 'Georgia', flag: require('@/assets/images/flags/ge.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'am', name: 'Armenia', flag: require('@/assets/images/flags/am.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'az', name: 'Azerbaijan', flag: require('@/assets/images/flags/az.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'ae', name: 'United Arab Emirates', flag: require('@/assets/images/flags/ae.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'qa', name: 'Qatar', flag: require('@/assets/images/flags/qa.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'kw', name: 'Kuwait', flag: require('@/assets/images/flags/kw.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'bh', name: 'Bahrain', flag: require('@/assets/images/flags/bh.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'om', name: 'Oman', flag: require('@/assets/images/flags/om.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'ye', name: 'Yemen', flag: require('@/assets/images/flags/ye.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'jo', name: 'Jordan', flag: require('@/assets/images/flags/jo.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'lb', name: 'Lebanon', flag: require('@/assets/images/flags/lb.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'sy', name: 'Syria', flag: require('@/assets/images/flags/sy.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'tw', name: 'Republic of China (Taiwan)', flag: require('@/assets/images/flags/tw.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'hk', name: 'Hong Kong, SAR of China', flag: require('@/assets/images/flags/hk.svg'), region: 'Asia', difficulty: 'hard' },
    { id: 'mo', name: 'Macao, SAR of China', flag: require('@/assets/images/flags/mo.svg'), region: 'Asia', difficulty: 'hard' },

    // Africa - Hard
    { id: 'ao', name: 'Angola', flag: require('@/assets/images/flags/ao.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'bw', name: 'Botswana', flag: require('@/assets/images/flags/bw.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'bf', name: 'Burkina Faso', flag: require('@/assets/images/flags/bf.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'bi', name: 'Burundi', flag: require('@/assets/images/flags/bi.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'cm', name: 'Cameroon', flag: require('@/assets/images/flags/cm.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'cv', name: 'Cape Verde', flag: require('@/assets/images/flags/cv.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'cf', name: 'Central African Republic', flag: require('@/assets/images/flags/cf.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'td', name: 'Chad', flag: require('@/assets/images/flags/td.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'km', name: 'Comoros', flag: require('@/assets/images/flags/km.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'cg', name: 'Republic of the Congo', flag: require('@/assets/images/flags/cg.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'cd', name: 'Democratic Republic of the Congo', flag: require('@/assets/images/flags/cd.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'dj', name: 'Djibouti', flag: require('@/assets/images/flags/dj.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'gq', name: 'Equatorial Guinea', flag: require('@/assets/images/flags/gq.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'er', name: 'Eritrea', flag: require('@/assets/images/flags/er.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'ga', name: 'Gabon', flag: require('@/assets/images/flags/ga.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'gm', name: 'Gambia', flag: require('@/assets/images/flags/gm.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'gn', name: 'Guinea', flag: require('@/assets/images/flags/gn.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'gw', name: 'Guinea-Bissau', flag: require('@/assets/images/flags/gw.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'ci', name: "Côte d'Ivoire", flag: require('@/assets/images/flags/ci.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'ls', name: 'Lesotho', flag: require('@/assets/images/flags/ls.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'lr', name: 'Liberia', flag: require('@/assets/images/flags/lr.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'mg', name: 'Madagascar', flag: require('@/assets/images/flags/mg.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'mw', name: 'Malawi', flag: require('@/assets/images/flags/mw.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'ml', name: 'Mali', flag: require('@/assets/images/flags/ml.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'mr', name: 'Mauritania', flag: require('@/assets/images/flags/mr.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'mu', name: 'Mauritius', flag: require('@/assets/images/flags/mu.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'mz', name: 'Mozambique', flag: require('@/assets/images/flags/mz.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'na', name: 'Namibia', flag: require('@/assets/images/flags/na.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'ne', name: 'Niger', flag: require('@/assets/images/flags/ne.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'rw', name: 'Rwanda', flag: require('@/assets/images/flags/rw.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'st', name: 'São Tomé and Príncipe', flag: require('@/assets/images/flags/st.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'sn', name: 'Senegal', flag: require('@/assets/images/flags/sn.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'sc', name: 'Seychelles', flag: require('@/assets/images/flags/sc.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'sl', name: 'Sierra Leone', flag: require('@/assets/images/flags/sl.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'so', name: 'Somalia', flag: require('@/assets/images/flags/so.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'ss', name: 'South Sudan', flag: require('@/assets/images/flags/ss.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'sd', name: 'Sudan', flag: require('@/assets/images/flags/sd.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'sz', name: 'Eswatini', flag: require('@/assets/images/flags/sz.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'tg', name: 'Togo', flag: require('@/assets/images/flags/tg.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'zm', name: 'Zambia', flag: require('@/assets/images/flags/zm.svg'), region: 'Africa', difficulty: 'hard' },
    { id: 'zw', name: 'Zimbabwe', flag: require('@/assets/images/flags/zw.svg'), region: 'Africa', difficulty: 'hard' },

    // South America - Hard
    { id: 'bo', name: 'Bolivia', flag: require('@/assets/images/flags/bo.svg'), region: 'South America', difficulty: 'hard' },
    { id: 'py', name: 'Paraguay', flag: require('@/assets/images/flags/py.svg'), region: 'South America', difficulty: 'hard' },
    { id: 'uy', name: 'Uruguay', flag: require('@/assets/images/flags/uy.svg'), region: 'South America', difficulty: 'hard' },
    { id: 'gy', name: 'Guyana', flag: require('@/assets/images/flags/gy.svg'), region: 'South America', difficulty: 'hard' },
    { id: 'sr', name: 'Suriname', flag: require('@/assets/images/flags/sr.svg'), region: 'South America', difficulty: 'hard' },

    // Central America & Caribbean - Hard
    { id: 'bz', name: 'Belize', flag: require('@/assets/images/flags/bz.svg'), region: 'Central America', difficulty: 'hard' },
    { id: 'sv', name: 'El Salvador', flag: require('@/assets/images/flags/sv.svg'), region: 'Central America', difficulty: 'hard' },
    { id: 'hn', name: 'Honduras', flag: require('@/assets/images/flags/hn.svg'), region: 'Central America', difficulty: 'hard' },
    { id: 'ni', name: 'Nicaragua', flag: require('@/assets/images/flags/ni.svg'), region: 'Central America', difficulty: 'hard' },
    { id: 'ag', name: 'Antigua and Barbuda', flag: require('@/assets/images/flags/ag.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'bs', name: 'Bahamas', flag: require('@/assets/images/flags/bs.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'bb', name: 'Barbados', flag: require('@/assets/images/flags/bb.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'dm', name: 'Dominica', flag: require('@/assets/images/flags/dm.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'do', name: 'Dominican Republic', flag: require('@/assets/images/flags/do.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'gd', name: 'Grenada', flag: require('@/assets/images/flags/gd.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'ht', name: 'Haiti', flag: require('@/assets/images/flags/ht.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'kn', name: 'Saint Kitts and Nevis', flag: require('@/assets/images/flags/kn.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'lc', name: 'Saint Lucia', flag: require('@/assets/images/flags/lc.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'vc', name: 'Saint Vincent and the Grenadines', flag: require('@/assets/images/flags/vc.svg'), region: 'Caribbean', difficulty: 'hard' },
    { id: 'tt', name: 'Trinidad and Tobago', flag: require('@/assets/images/flags/tt.svg'), region: 'Caribbean', difficulty: 'hard' },

    // Oceania - Hard
    { id: 'fm', name: 'Federated States of Micronesia', flag: require('@/assets/images/flags/fm.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'ki', name: 'Kiribati', flag: require('@/assets/images/flags/ki.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'mh', name: 'Marshall Islands', flag: require('@/assets/images/flags/mh.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'nr', name: 'Nauru', flag: require('@/assets/images/flags/nr.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'pw', name: 'Palau', flag: require('@/assets/images/flags/pw.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'ws', name: 'Samoa', flag: require('@/assets/images/flags/ws.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'sb', name: 'Solomon Islands', flag: require('@/assets/images/flags/sb.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'to', name: 'Tonga', flag: require('@/assets/images/flags/to.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'tv', name: 'Tuvalu', flag: require('@/assets/images/flags/tv.svg'), region: 'Oceania', difficulty: 'hard' },
    { id: 'vu', name: 'Vanuatu', flag: require('@/assets/images/flags/vu.svg'), region: 'Oceania', difficulty: 'hard' },
];

export function getRandomCountries(count: number, difficulty?: Country['difficulty']): Country[] {
    let filteredCountries = COUNTRIES;

    if (difficulty) {
        filteredCountries = COUNTRIES.filter(country => country.difficulty === difficulty);
    }

    const shuffled = [...filteredCountries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export function getCountryById(id: string): Country | undefined {
    return COUNTRIES.find(country => country.id === id);
} 