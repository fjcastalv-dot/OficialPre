import { Product } from './types';
// @ts-ignore
import poloMarino from './assets/images/polo_marino.webp';
// @ts-ignore
import poloBlanco from './assets/images/polo_blanco.webp';
// @ts-ignore
import poloCarbon from './assets/images/polo_carbon.webp';
// @ts-ignore
import poloLimon from './assets/images/polo_limon.webp';
// @ts-ignore
import poloNaranja from './assets/images/polo_naranja.webp';
// @ts-ignore
import poloRojo from './assets/images/polo_rojo.webp';
// @ts-ignore
import poloTurquesa from './assets/images/polo_turquesa.webp';

export const CATEGORIES = [
  { id: 'todos', name: 'Todos', icon: 'Sparkles' },
  { id: 'top-ventas', name: 'Top Ventas', icon: 'Sparkles' },
  { id: 'restaurante', name: 'Restaurante', icon: 'Utensils' },
  { id: 'hoteleria', name: 'Hotelería', icon: 'Sparkles' },
  { id: 'medico', name: 'Médico', icon: 'Stethoscope' },
  { id: 'ejecutivo', name: 'Ejecutivo', icon: 'Briefcase' },
  { id: 'industrial', name: 'Industria', icon: 'ShieldAlert' },
  { id: 'manteleria', name: 'Mantelería', icon: 'Sparkles' },
  { id: 'tapiceria', name: 'Tapicería', icon: 'Sparkles' },
];

export const getCategoryName = (catId: string): string => {
  const names: Record<string, string> = {
    'top-ventas': 'Top Ventas',
    'restaurante': 'Restaurante',
    'hoteleria': 'Hotelería',
    'medico': 'Médico',
    'ejecutivo': 'Ejecutivo',
    'industrial': 'Industria',
    'manteleria': 'Mantelería',
    'tapiceria': 'Tapicería',
    'todos': 'Todos'
  };
  return names[catId] || catId;
};

export const MANTELERIA_GALLERY = [
  'https://res.cloudinary.com/boofzznx/image/upload/v1788720647/0048CCCE-EF54-406B-AD2B-162BE105F7A9.webp',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788720646/9088CA42-2C82-4179-B6DC-355DA269424C.webp',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788720644/1B5FB400-D0E5-4502-A55A-63FEDD690564.webp',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788720644/60A36711-A9D7-4BA0-A0B9-169A28D125A7.jpg',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788720644/4138040D-7CDF-4936-BA5D-7143191084AA.jpg'
];

export const TAPICERIA_GALLERY = [
  'https://res.cloudinary.com/boofzznx/image/upload/v1788721011/7f2b53bf-df3c-46b3-b034-bea9e9a5f203_2.jpg',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788721010/d70f50c6-0f90-4e97-9f4a-ccc7ada8ef1a.jpg',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788721008/7779532a-bcfd-4a3f-bdd0-1e546e12b58e_2.jpg',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788721007/49fc6694-83dd-4995-b2e2-9cd3a97832c3_2.jpg',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788721005/8be50ee2-b3f0-4f0f-848f-2f4755c93f10_2.jpg',
  'https://res.cloudinary.com/boofzznx/image/upload/v1788721003/1d8b51eb-050b-4b00-9d14-2266bda1018d.jpg'
];

export const PRODUCTS: Product[] = [
  // 1. PLAYERA POLO DRY-FIT DAMA / CABALLERO
  {
    id: 'polo-dryfit-caballero-dama',
    code: 'PL001',
    name: 'Playera Polo Dry-Fit Dama / Caballero',
    price: 240.00,
    category: 'hoteleria',
    image: poloMarino,
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    description: 'Elaboradas en Dry-Fit, son ideales para el uso diario, deportivo o para uniformes empresariales. Cómodas, ligeras y resistentes para una transpiración eficiente.',
    composition: '150 g/m2 DRY-FIT 100% Poliéster',
    features: [
          'Botones cosidos en cruz para asegurar su durabilidad',
          'Tela fresca y ligera',
          'Costuras reforzadas',
          'Tecnología Dry-Fit (secado ultra rápido)'
    ],
    hasCorteSelection: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanco', hex: '#ffffff', code: '332', image: poloBlanco },
      { name: 'Negro', hex: '#000000', code: '338', image: poloCarbon },
      { name: 'Marino', hex: '#0f172a', code: '343', image: poloMarino },
      { name: 'Francia', hex: '#1d4ed8', code: '317' },
      { name: 'Gris', hex: '#6b7280', code: '385', image: poloCarbon }
    ],
    damaColors: [
      {
        name: 'Negra',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789930623/POLO_MC_NEGRADAMA.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789930623/POLO_MC_NEGRADAMA.png']
      },
      {
        name: 'Azul Marino',
        hex: '#1e3a8a',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789930624/POLO_MARINO_DAMA_1.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789930624/POLO_MARINO_DAMA_1.png']
      },
      {
        name: 'Gris Oxford',
        hex: '#374151',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789930625/POLO_NEGRA_DAMA.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789930625/POLO_NEGRA_DAMA.png']
      },
      {
        name: 'Blanca',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789930628/POLOBLANCAD.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789930628/POLOBLANCAD.png']
      }
    ],
    priceTiers: {
      '1-12': 240.00,
      '13-50': 230.00,
      '51+': 220.00
    }
  },

  // 3. PLAYERA C/REDONDO M/C DRY-FIT
  {
    id: 'playera-cuello-redondo-m-c',
    code: 'PL002MC',
    name: 'Playera Cuello Redondo Manga Corta Dry-Fit',
    price: 190.00,
    category: 'hoteleria',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729614/MC_NEGRA1.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729614/MC_NEGRA1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729610/MC_NEGRA.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729606/azul_marino.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729621/MC_BLANCA.png'
    ],
    rating: 4.9,
    description: 'Playera clásica de cuello redondo manga corta confeccionada en microfibra 100% poliéster Dryfit de alto rendimiento. Tejido ultra fresco, ligero y de secado rápido para staff, eventos y hotelería.',
    composition: '100% Poliéster Dryfit',
    features: [
      'Cuello redondo con cárdigan acanalado reforzado antidealargamiento',
      'Tecnología Dry-Fit de secado ultra rápido y control de humedad',
      'Costura doble reforzada en sisas, mangas y bastilla inferior',
      'Superficie óptima para bordado o serigrafía de alta definición'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729621/MC_BLANCA.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729621/MC_BLANCA.png'
        ]
      },
      {
        name: 'Marino',
        hex: '#111827',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729606/azul_marino.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729606/azul_marino.png'
        ]
      },
      {
        name: 'Oxford',
        hex: '#374151',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729614/MC_NEGRA1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729614/MC_NEGRA1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788729610/MC_NEGRA.png'
        ]
      },
      { name: 'Bandera', hex: '#0e6914' },
      { name: 'Botella', hex: '#072a10' },
      { name: 'Canario', hex: '#eab308' },
      { name: 'Gris', hex: '#6b7280' },
      { name: 'Guinda', hex: '#58111a' },
      { name: 'Mango', hex: '#ea990c' },
      { name: 'Naranja', hex: '#ea580c' },
      { name: 'Rey', hex: '#1d4ed8' },
      { name: 'Rojo', hex: '#b91c1c' },
      { name: 'Verde Agua', hex: '#17b5c2' }
    ],
    priceTiers: {
      '1-12': 190.00,
      '13-50': 180.00,
      '51+': 170.00
    }
  },

  // 4. PLAYERA C/REDONDO M/L (Playera Manga Larga Dry Fit)
  {
    id: 'polo-manga-larga-dry-fit',
    code: 'PL001ML',
    name: 'Playera Manga Larga Dry Fit',
    price: 210.00,
    category: 'hoteleria',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430967/3.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430967/3.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430963/8.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430960/1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430961/5.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430965/2.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430956/6.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788581147/Dise%C3%B1o_Sin_T%C3%ADtulo_-_4.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430958/7.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1788735769/ML_NEGRO_1.png'
    ],
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    description: 'Playera de alto rendimiento con mangas largas confeccionada en tecnología Dry-Fit micro-perforada. Máxima protección solar UV, ligereza y frescura en climas tropicales y exteriores.',
    composition: 'DRY-FIT 100% Poliéster (150 g/m2)',
    features: [
      'Protección solar UPF y confort térmico en exteriores',
      'Manga larga con puño anatómico cómodo',
      'Tela fresca y ligera de secado ultra rápido',
      'Costuras reforzadas de alta resistencia para uso continuo',
      'Excelente retención de forma y color'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        code: '332',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430965/2.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430965/2.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430956/6.png'
        ]
      },
      {
        name: 'Canario',
        hex: '#eab308',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789954500/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_4.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789954500/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_4.png'
        ]
      },
      {
        name: 'Gris',
        hex: '#6b7280',
        code: '338',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788581147/Dise%C3%B1o_Sin_T%C3%ADtulo_-_4.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788581147/Dise%C3%B1o_Sin_T%C3%ADtulo_-_4.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430958/7.png'
        ]
      },
      {
        name: 'Marino',
        hex: '#111827',
        code: '343',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430967/3.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430967/3.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430963/8.png'
        ]
      },
      {
        name: 'Oxford',
        hex: '#374151',
        code: '339',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788735769/ML_NEGRO_1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788735769/ML_NEGRO_1.png'
        ]
      },
      {
        name: 'Rey',
        hex: '#1d4ed8',
        code: '343',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430967/3.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430967/3.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430963/8.png'
        ]
      },
      {
        name: 'Rojo',
        hex: '#b91c1c',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789954498/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_5.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789954498/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_5.png'
        ]
      },
      {
        name: 'Verde Agua',
        hex: '#17b5c2',
        code: '317',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430960/1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430960/1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787430961/5.png'
        ]
      },
      { name: 'Bandera', hex: '#0e6914' },
      { name: 'Botella', hex: '#072a10' },
      { name: 'Guinda', hex: '#58111a' },
      { name: 'Mango', hex: '#ea990c' },
      { name: 'Naranja', hex: '#ea580c' }
    ],
    priceTiers: {
      '1-12': 210.00,
      '13-50': 203.00,
      '51+': 195.00
    }
  },

  // 5. CAZADORA M/C DAMA Y CAB.
  {
    id: 'cazadora-manga-corta',
    code: 'CZ001MC',
    name: 'Cazadora Manga Corta Dama y Caballero',
    price: 650.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194431/MARINOFRENTE.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194431/MARINOFRENTE.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195977/MARINOPECHO_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195981/AZULMARINO_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194436/FRENTEB.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195947/PECHO.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195950/FRENTE2.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194421/CAZADORA_NEGRA.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788196026/NEGROFRENTE_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788196036/NEGRO_1.png'
    ],
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    description: '100% POLIESTER, LIVIANA, CON STRECH, DURABILIDAD Y FRESCURA. CORTE DAMA O CABALLERO. TALLA XS-S-M-L-XL Y XXL.',
    composition: '100% Poliéster con strech',
    features: [
      '100% Poliéster',
      'Liviana y con strech',
      'Durabilidad y frescura',
      'Corte Dama o Caballero',
      'Cuello camisero',
      'Canesú y respiradero en espalda',
      'Manga corta',
      'Fresca y transpirable'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    hasCorteSelection: true,
    colors: [
      {
        name: 'Azul Marino',
        hex: '#0f172a',
        code: '343',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194431/MARINOFRENTE.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194431/MARINOFRENTE.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195977/MARINOPECHO_1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195981/AZULMARINO_1.png'
        ]
      },
      {
        name: 'Blanco',
        hex: '#ffffff',
        code: '332',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194436/FRENTEB.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194436/FRENTEB.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195947/PECHO.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788195950/FRENTE2.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789238098/cazadora_espalda.jpg'
        ]
      },
      {
        name: 'Negro',
        hex: '#000000',
        code: '001',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194421/CAZADORA_NEGRA.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788194421/CAZADORA_NEGRA.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788196026/NEGROFRENTE_1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788196036/NEGRO_1.png'
        ]
      }
    ],
    damaColors: [
      {
        name: 'Azul Marino',
        hex: '#0f172a',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789238118/cazadoradamamarino.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789238118/cazadoradamamarino.png'
        ]
      },
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789238140/cazadorda_damanegra.jpg',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789238140/cazadorda_damanegra.jpg'
        ]
      },
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789238330/cazadora_dama.jpg',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789238330/cazadora_dama.jpg'
        ]
      }
    ],
    priceTiers: {
      '1-12': 650.00,
      '13-50': 585.00,
      '51+': 535.00
    }
  },

  // 6. CAZADORA M/L, DAMA Y CAB.
  {
    id: 'cazadora-manga-larga',
    code: 'CZ001ML',
    name: 'Cazadora Manga Larga Dama y Caballero',
    price: 750.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789238159/cazadora_ML.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789238159/cazadora_ML.png'
    ],
    rating: 4.9,
    description: '100% POLIESTER, LIVIANA, CON STRECH, DURABILIDAD Y FRESCURA. CORTE DAMA O CABALLERO. TALLA XS-S-M-L-XL Y XXL.',
    composition: '100% Poliéster con strech',
    features: [
      '100% Poliéster',
      'Liviana y con strech',
      'Durabilidad y frescura',
      'Corte Dama o Caballero',
      'Cuello camisero',
      'Canesú y respiradero en espalda',
      'Manga larga',
      'Costuras reforzadas'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Azul Marino',
        hex: '#0f172a',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789238159/cazadora_ML.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789238159/cazadora_ML.png'
        ]
      },
      {
        name: 'Blanco',
        hex: '#ffffff'
      },
      {
        name: 'Negro',
        hex: '#000000'
      }
    ],
    priceTiers: {
      '1-12': 750.00,
      '13-50': 675.00,
      '51+': 620.00
    }
  },

  // 7. BLUSA MANGA CORTA OXFORD
  {
    id: 'blusa-manga-corta-oxford',
    code: 'B004D',
    name: 'Blusa Manga Corta Oxford',
    price: 350.00,
    category: 'ejecutivo',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788577305/BLUSA_BLANCA.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788577305/BLUSA_BLANCA.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788576797/AZUL_CIELO.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788577302/BLUSA_BLANCA_FRENTE.png'
    ],
    rating: 4.8,
    description: 'Blusa cuello en V, manga corta con un corte elegante y moderno, composición 65% Algodón 35% Poliéster, ofrece frescura, colores duraderos y una apariencia impecable que hará resaltar a tu equipo de trabajo con un estilo formal pero relajado.',
    composition: '65% Algodón 35% Poliéster',
    features: [
          'Cuello camisero en V',
          'Pinzas en busto',
          'Pinzas al frente y en espalda',
          'Manga corta'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788577305/BLUSA_BLANCA.png'
      },
      {
        name: 'Azul Cielo',
        hex: '#7dd3fc',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788576797/AZUL_CIELO.png'
      }
    ],
    priceTiers: {
      '1-12': 350.00,
      '13-50': 330.00,
      '51+': 320.00
    }
  },

  // 8. BLUSA MANGA 3/4 OXFORD
  {
    id: 'blusa-manga-3-4-oxford',
    code: 'B001D-13',
    name: 'Blusa Manga 3/4 Oxford',
    price: 370.00,
    category: 'ejecutivo',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788576783/BLUSA_MANGA_3_1.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788576783/BLUSA_MANGA_3_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788576771/blusabca3_1.png'
    ],
    rating: 4.8,
    description: 'Blusa cuello camisero, con un corte elegante y casual, manga 3/4, composición 65% Algodón 35% Poliéster, tela fresca, colores duraderos y una apariencia impecable que hará resaltar a tu equipo de trabajo con un estilo formal pero relajado.',
    composition: '65% Algodón 35% Poliéster',
    features: [
          'Cuello camisero en V',
          'Pinzas en busto',
          'Pinzas al frente y en espalda',
          'Manga 3/4'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Azul Cielo',
        hex: '#7dd3fc',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788576783/BLUSA_MANGA_3_1.png'
      },
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788576771/blusabca3_1.png'
      }
    ],
    priceTiers: {
      '1-12': 370.00,
      '13-50': 350.00,
      '51+': 345.00
    }
  },

  // 9. BLUSA MANGA LARGA OXFORD
  {
    id: 'blusa-manga-larga-oxford',
    code: 'B001D',
    name: 'Blusa Manga Larga Oxford',
    price: 390.00,
    category: 'ejecutivo',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789957587/Dise%C3%B1o_sin_t%C3%ADtulo_6.png',
    rating: 4.8,
    description: 'Blusa cuello camisero formal manga larga, con un corte elegante y moderno, composición 65% Algodón 35% Poliéster, ofrece frescura, colores duraderos y una apariencia impecable que hará resaltar a tu equipo de trabajo con un estilo formal pero relajado.',
    composition: '65% Algodón 35% Poliéster',
    features: [
          'Cuello camisero',
          'Pinzas en busto',
          'Pinzas al frente y en espalda',
          'Manga larga'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789957587/Dise%C3%B1o_sin_t%C3%ADtulo_6.png'
      },
      { name: 'Azul Cielo', hex: '#7dd3fc' }
    ],
    priceTiers: {
      '1-12': 390.00,
      '13-50': 370.00,
      '51+': 365.00
    }
  },

  // 10. CAMISA MANGA CORTA OXFORD
  {
    id: 'camisa-manga-corta-oxford',
    code: 'C006C',
    name: 'Camisa Manga Corta Oxford',
    price: 370.00,
    category: 'ejecutivo',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788575136/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_2.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788575136/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_2.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788575148/Dise%C3%B1o_Sin_T%C3%ADtulo_-_2_2.png'
    ],
    rating: 4.8,
    description: 'Una camisa con un corte elegante y moderno, con toda la durabilidad y seguridad para tus colaboradores. Gracias a su composición 35% Algodón 65% Poliéster, ofrece colores duraderos y una apariencia impecable que hará resaltar a tu equipo de trabajo con un estilo formal pero relajado.',
    composition: '35% Algodón 65% Poliéster',
    features: [
          'Cuello camisero',
          'Canesú y pinzas en la espalda',
          'Manga corta'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788575136/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_2.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788575136/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_2.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788575148/Dise%C3%B1o_Sin_T%C3%ADtulo_-_2_2.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 370.00,
      '13-50': 350.00,
      '51+': 345.00
    }
  },

  // 11. CAMISA MANGA LARGA OXFORD
  {
    id: 'camisa-manga-larga-oxford',
    code: 'C007C',
    name: 'Camisa Manga Larga Oxford',
    price: 390.00,
    category: 'ejecutivo',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788574414/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_1.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788574414/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788574419/Dise%C3%B1o_Sin_T%C3%ADtulo_-_2_1.png'
    ],
    rating: 4.9,
    description: 'Una camisa con un corte elegante y moderno, con toda la durabilidad y seguridad para tus colaboradores. Gracias a su composición 35% Algodón 65% Poliéster, ofrece colores duraderos y una apariencia impecable que hará resaltar a tu equipo de trabajo con un estilo formal pero relajado.',
    composition: '35% Algodón 65% Poliéster',
    features: [
          'Cuello camisero',
          'Pinzas en busto',
          'Pinzas al frente y en espalda',
          'Manga larga'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788574414/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788574414/Dise%C3%B1o_Sin_T%C3%ADtulo_-_1_1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788574419/Dise%C3%B1o_Sin_T%C3%ADtulo_-_2_1.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 390.00,
      '13-50': 370.00,
      '51+': 365.00
    }
  },

  // 12. FILIPINA GABARDINA ANTIFLUIDO MANGA 3/4
  {
    id: 'filipina-gabardina-antifluido',
    code: 'FI003-AF',
    name: 'Filipina Gabardina Antifluido Manga 3/4',
    price: 490.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789237290/UNIFROMES-chef_frente.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789237290/UNIFROMES-chef_frente.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789237288/UNIFROMES-chef_blanco_atras.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789237256/UNIFROMES-21_1.png'
    ],
    isBestSeller: true,
    isNew: true,
    rating: 5.0,
    description: 'Filipina con tecnología de repelencia a líquidos y aceite vegetal, ligera, versátil, resistente, transpirable y de fácil cuidado. Con respiradero para alto rendimiento en cocina.',
    composition: '65% Poliéster 35% Algodón con tecnología antifluido y repelente a aceites',
    features: [
      'Manga 3/4',
      'Repele el aceite vegetal y el agua',
      'Ligera, versátil y resistente',
      'Transpirable y fácil cuidado',
      'Con respiradero'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789237290/UNIFROMES-chef_frente.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789237290/UNIFROMES-chef_frente.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789237288/UNIFROMES-chef_blanco_atras.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789237256/UNIFROMES-21_1.png'
        ]
      },
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788572851/UNIFROMES-29_3.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788572851/UNIFROMES-29_3.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788572850/UNIFROMES-27_1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788202984/UNIFROMES-25.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 490.00,
      '13-50': 460.00,
      '51+': 430.00
    }
  },

  // 13. FILIPINA GABARDINA ANTIFLUIDO MANGA CORTA
  {
    id: 'filipina-cocina-mc-gab',
    code: 'FI001MC-G',
    name: 'Filipina Gabardina Antifluido Manga Corta',
    price: 390.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/c_crop,w_1200,h_1200,x_0,y_80/v1789932048/Filipina-para-chef-repelente-manga-corta-blanca.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/c_crop,w_1200,h_1200,x_0,y_80/v1789932048/Filipina-para-chef-repelente-manga-corta-blanca.png',
      'https://res.cloudinary.com/boofzznx/image/upload/c_crop,w_1200,h_1200,x_0,y_80/v1789932047/Filipina-para-chef-repelente-manga-corta-blanca-atras.png'
    ],
    rating: 4.8,
    description: 'Filipina manga corta con tecnología de repelencia a líquidos y aceite vegetal, ligera, versátil, resistente, transpirable y de fácil cuidado. Con respiradero para alto rendimiento en cocina.',
    composition: '65% Poliéster 35% Algodón con tecnología antifluido y repelente a aceites',
    features: [
      'Manga corta',
      'Repele el aceite vegetal y el agua',
      'Ligera, versátil y resistente',
      'Transpirable y fácil cuidado',
      'Con respiradero para alto rendimiento en cocina'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/c_crop,w_1200,h_1200,x_0,y_80/v1789932048/Filipina-para-chef-repelente-manga-corta-blanca.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/c_crop,w_1200,h_1200,x_0,y_80/v1789932048/Filipina-para-chef-repelente-manga-corta-blanca.png',
          'https://res.cloudinary.com/boofzznx/image/upload/c_crop,w_1200,h_1200,x_0,y_80/v1789932047/Filipina-para-chef-repelente-manga-corta-blanca-atras.png'
        ]
      },
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/ar_1:1,c_pad,b_white/v1789932319/Dise%C3%B1o_sin_t%C3%ADtulo_2.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/ar_1:1,c_pad,b_white/v1789932319/Dise%C3%B1o_sin_t%C3%ADtulo_2.png',
          'https://res.cloudinary.com/boofzznx/image/upload/ar_1:1,c_pad,b_white/v1789932321/Filipina-para-chef-repelente-manga-corta-negro-atras.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 390.00,
      '13-50': 380.00,
      '51+': 370.00
    }
  },

  // 14. FILIPINAS DE COCINA 3/4 GAB.
  {
    id: 'filipina-cocina-ml-gab',
    code: 'FI001ML-G',
    name: 'Filipinas de Cocina 3/4 Gabardina',
    price: 390.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788571992/Dise%C3%B1o_Sin_T%C3%ADtulo_-_11.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1788571992/Dise%C3%B1o_Sin_T%C3%ADtulo_-_11.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1788571990/Dise%C3%B1o_Sin_T%C3%ADtulo_-_13.png'
    ],
    rating: 4.9,
    description: 'Filipina de chef con doble abotonadura. Una apariencia profesional e impecable, confort, frescura y estilo en cada movimiento. Con tecnología de repelencia a líquidos y aceite vegetal, resistente para uso intensivo y lavadas constantes.',
    composition: '65% Poliéster 35% Algodón (150 g/m²)',
    features: [
          'Doble abotonadura',
          'Tecnología repelente al agua y al aceite',
          'Protección inteligente que no absorbe grasa',
          'Fresco y transpirable para uso intensivo'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788571992/Dise%C3%B1o_Sin_T%C3%ADtulo_-_11.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788571992/Dise%C3%B1o_Sin_T%C3%ADtulo_-_11.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788571990/Dise%C3%B1o_Sin_T%C3%ADtulo_-_13.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 390.00,
      '13-50': 380.00,
      '51+': 370.00
    }
  },

  // 14. FILIPINAS DE COCINA M/L BROOKLYN
  {
    id: 'filipina-cocina-ml-brooklyn',
    code: 'FI002ML-B',
    name: 'Filipinas de Cocina M/L Brooklyn',
    price: 580.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789934110/FILIPINA_BLANCA_1.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789934110/FILIPINA_BLANCA_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789934111/085A7376.jpg'
    ],
    rating: 4.9,
    description: 'Filipina de chef con tecnología de repelencia a líquidos y aceite vegetal, ligera, versátil, resistente, transpirable y de fácil cuidado. Las gotas se deslizan sin absorberse y la grasa no se adhiere.',
    composition: '65% Poliéster 35% Algodón',
    features: [
          'Tecnología repelente a líquidos y aceite vegetal',
          'Protección inteligente antimanchas',
          'Fresco y transpirable',
          'Resistente a lavadas constantes',
          'Doble abotonadura'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789934110/FILIPINA_BLANCA_1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789934110/FILIPINA_BLANCA_1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789934111/085A7376.jpg'
        ]
      },
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789934108/filipina_3_1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789934108/filipina_3_1.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 580.00,
      '13-50': 550.00,
      '51+': 520.00
    }
  },

  // 16. PANTALON DE VESTIR EN SUPREMO
  {
    id: 'pantalon-vestir-supremo',
    code: 'PV001S',
    name: 'Pantalón de Vestir en Supremo',
    price: 390.00,
    category: 'ejecutivo',
    image: '',
    rating: 4.8,
    description: 'Pantalón corte recto. Diseñado para lucir casual, cómodo y elegante con bolsillos laterales y costuras reforzadas.',
    composition: '100% Poliéster / Microfibra Supremo',
    features: [
          'Corte recto',
          'Bolsillos laterales',
          'Costuras reforzadas'
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Azul Marino', hex: '#1e3a8a' },
      { name: 'Gris Oxford', hex: '#374151' },
      { name: 'Kaki', hex: '#d4b996' }
    ],
    priceTiers: {
      '1-12': 390.00,
      '13-50': 370.00,
      '51+': 350.00
    }
  },

  // 17. PANTALON DE VESTIR EN TERGAL
  {
    id: 'pantalon-vestir-tergal',
    code: 'PV002T',
    name: 'Pantalón de Vestir en Tergal',
    price: 370.00,
    category: 'ejecutivo',
    image: '',
    rating: 4.7,
    description: 'Pantalón corte recto, bolsas laterales y costuras reforzadas. Diseñado para lucir casual, cómodo y elegante con alta resistencia al uso continuo.',
    composition: '65% Poliéster 35% Algodón / Tergal',
    features: [
          'Corte recto',
          'Bolsillos laterales',
          'Costuras reforzadas'
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    colors: [
      { name: 'Azul Marino', hex: '#1e3a8a' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Gris Plomo', hex: '#4b5563' }
    ],
    priceTiers: {
      '1-12': 370.00,
      '13-50': 355.00,
      '51+': 345.00
    }
  },


  // 19. PANTALON CARGO EN GAB.
  {
    id: 'pantalon-cargo-gabardina',
    code: 'PC001G',
    name: 'Pantalón Cargo en Gabardina',
    price: 450.00,
    category: 'industrial',
    image: '',
    rating: 4.9,
    description: 'Pantalón cargo. Diseñado para uso rudo, con corte recto, bolsillos laterales y bolsas cargo con costuras reforzadas.',
    composition: '60% Algodón 40% Poliéster',
    features: [
          'Corte recto',
          'Bolsillos laterales y bolsas cargo',
          'Costuras reforzadas'
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
    colors: [
      { name: 'Azul Marino', hex: '#1e3a8a' },
      { name: 'Negro', hex: '#000000' },
      { name: 'Kaki', hex: '#d4b996' },
      { name: 'Verde Militar', hex: '#3f6212' }
    ],
    priceTiers: {
      '1-12': 450.00,
      '13-50': 430.00,
      '51+': 420.00
    }
  },

  // 20. CAMISOLA MANTTO EN GAB.
  {
    id: 'camisola-mantenimiento-gabardina',
    code: 'CM001G',
    name: 'Camisola Mantenimiento en Gabardina',
    price: 450.00,
    category: 'industrial',
    image: '',
    rating: 4.8,
    description: 'Camisola industrial para mantenimiento y servicios generales en gabardina de alta resistencia. Confeccionada para proteger contra fricción, polvo y suciedad con solapa frontal y bolsas con fuelle.',
    composition: 'Gabardina 100% Algodón / Poliéster Reforzado',
    features: [
      'Dos bolsas superiores con tapa y botón',
      'Ranura portalápiz en bolsa izquierda',
      'Espalda con fuelles de acción para libertad motriz',
      'Costuras triples reforzadas en hombros y sisas'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Azul Marino', hex: '#1e3a8a' },
      { name: 'Gris Rata', hex: '#4b5563' },
      { name: 'Kaki', hex: '#d4b996' }
    ],
    priceTiers: {
      '1-12': 450.00,
      '13-50': 430.00,
      '51+': 420.00
    }
  },

  // 21. MANDILES DE PETO
  {
    id: 'mandiles-de-peto',
    code: 'MP001',
    name: 'Mandiles de Peto',
    price: 290.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788722819/Dise%C3%B1o_Sin_T%C3%ADtulo_-_8.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1788722819/Dise%C3%B1o_Sin_T%C3%ADtulo_-_8.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1787421851/9.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1787421861/10.png'
    ],
    isBestSeller: true,
    rating: 4.9,
    description: 'Mandil de peto, la correa del cuello se ajusta para mayor comodidad. Los lazos en la cintura le permiten un ajuste perfecto. Los dos bolsillos frontales mantienen sus pertenencias a mano y organizadas. Estilo cómodo y resistente que se mantiene impecable lavado tras lavado.',
    composition: '65% Algodón 35% Poliéster',
    features: [
          'Estilo con pechera protectora',
          'Correa ajustable en el cuello',
          'Se ata a la cintura',
          'Bolsillo frontal dividido'
    ],
    sizes: ['Unitalla'],
    colors: [
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788722819/Dise%C3%B1o_Sin_T%C3%ADtulo_-_8.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788722819/Dise%C3%B1o_Sin_T%C3%ADtulo_-_8.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1787421851/9.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1787421861/10.png'
        ]
      },
      {
        name: 'Azul',
        hex: '#1e3a8a',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788722841/mandil_azul.webp',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788722841/mandil_azul.webp',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788722845/Dise%C3%B1o_Sin_T%C3%ADtulo_-_7.png'
        ]
      },
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788722893/MANDIL_BLANCO.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788722893/MANDIL_BLANCO.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 290.00,
      '13-50': 270.00,
      '51+': 250.00
    }
  },

  // 22. MANDILES LARGOS
  {
    id: 'mandiles-largos',
    code: 'ML001',
    name: 'Mandiles Largos',
    price: 250.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789955203/Gemini_Generated_Image_kjfm74kjfm74kjfm.jpg',
    rating: 4.8,
    description: 'Mantenga una apariencia profesional e impecable con el exclusivo delantal de chef Premium. Suave, duradero y resistente a la decoloración manteniéndose vivo lavado tras lavado. Incluye tiras largas en la cintura y un bolsillo dividido para guardar todas sus pertenencias.',
    composition: '60% Algodón 40% Poliéster',
    features: [
          'Estilo bistró a la cintura',
          'Lazos largos',
          'Doble vista',
          'Bolsillo dividido de 14.5\' x 9\''
    ],
    sizes: ['Unitalla'],
    colors: [],
    priceTiers: {
      '1-12': 250.00,
      '13-50': 230.00,
      '51+': 210.00
    }
  },

  // 23. MANDIL CORTO
  {
    id: 'mandil-corto',
    code: 'MC001',
    name: 'Mandil Corto',
    price: 150.00,
    category: 'restaurante',
    image: '',
    rating: 4.8,
    description: 'Mandil corto, cómodo y práctico, estilo hotelero, tiras largas en la cintura y bolsas al frente con división para guardar sus notas o comandas.',
    composition: '65% Algodón 35% Poliéster',
    features: [
          'Estilo bistró a la cintura',
          'Lazos largos',
          'Bolsillo frontal dividido'
    ],
    sizes: ['Unitalla'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Vino', hex: '#7f1d1d' },
      { name: 'Azul Marino', hex: '#1e3a8a' }
    ],
    priceTiers: {
      '1-12': 150.00,
      '13-50': 140.00,
      '51+': 132.00
    }
  },

  // 24. GORROS DE COCINA
  {
    id: 'gorros-de-cocina',
    code: 'GC001',
    name: 'Gorros de Cocina',
    price: 110.00,
    category: 'restaurante',
    image: '',
    rating: 4.8,
    description: 'Gorro higiénico de cocina tipo boina / champiñón. Fabricado en tejido ligero y fresco con elástico posterior autoajustable que garantiza contención capilar conforme a normas sanitarias.',
    composition: 'Poliéster / Algodón Transpirable',
    features: [
      'Elástico posterior para ajuste universal confortable',
      'Banda frontal antitranspirante interna',
      'Cumple con normativas de higiene alimentaria',
      'Lavado rápido y secado ágil'
    ],
    sizes: ['Unitalla Universal'],
    colors: [
      { name: 'Negro', hex: '#000000' },
      { name: 'Blanco', hex: '#ffffff' }
    ],
    priceTiers: {
      '1-12': 110.00,
      '13-50': 103.00,
      '51+': 95.00
    }
  },

  // 25. ZAPATOS DE COCINA ALINA
  {
    id: 'zapatos-alina',
    code: 'ALINA',
    name: 'Zapatos de Cocina Alina',
    price: 840.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426610/model_4.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426610/model_4.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426608/model_por.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426608/model_por.png'
    ],
    isBestSeller: true,
    rating: 4.9,
    description: 'Calzado ergonómico de protección Tipo I certificado bajo la NOM-113-STPS-2009. Diseñado especialmente para gastronomía, hotelería y servicios con suela de inyección directa al corte de 100% poliuretano con base poliéster, alta resistencia a aceites y flexión extrema (35,000 ciclos), dieléctrico y antiderrapante.',
    composition: '100% Poliuretano base poliéster (Dureza 38-43° Shore A, densidad 0.45 gr/cm³)',
    features: [
      'Certificación Oficial NOM-113-STPS-2009 Calzado de Protección Tipo I',
      'Inyección directa al corte (100% Poliuretano base poliéster)',
      'Resistencia a aceites, solventes, abrasión y flexión extrema (35,000 ciclos)',
      'Calce ergonómico con ajuste de horma EEE y suela antiderrapante',
      'Propiedades dieléctricas y absorción de impacto antifatiga'
    ],
    sizes: ['22', '23', '24', '25', '26', '27'],
    colors: [
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426610/model_4.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426610/model_4.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426608/model_por.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426608/model_por.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 840.00,
      '13-50': 756.00,
      '51+': 690.00
    }
  },

  // 26. ZAPATOS DE COCINA PEGASO
  {
    id: 'zapatos-pegaso',
    code: 'PEGASO',
    name: 'Zapatos de Cocina Pegaso',
    price: 940.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426597/modelo_2.3.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426597/modelo_2.3.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426595/model_2.1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426595/modelo_2.2.png'
    ],
    isBestSeller: true,
    rating: 4.9,
    description: 'Calzado de protección Tipo I certificado bajo la NOM-113-STPS-2009 Modelo Pegaso. Confección en inyección directa al corte en poliuretano base poliéster con dureza 38-43° Shore A, máxima resistencia a grasas animales, vegetales, hidrocarburos y solventes, antiderrapante y dieléctrico.',
    composition: '100% Poliuretano base poliéster (Dureza 38-43° Shore A, densidad 0.45 gr/cm³)',
    features: [
      'Certificación Oficial NOM-113-STPS-2009 Calzado de Protección Tipo I',
      'Inyección directa al corte de alta densidad (0.45 gr/cm³)',
      'Resistencia comprobada a grasas, aceites e hidrocarburos (Tolueno/Gasolina)',
      'Resistencia a abrasión y flexión continua a 35,000 ciclos',
      'Calce ergonómico, suela antiderrapante, dieléctrico y horma anatómica EEE'
    ],
    sizes: ['25', '26', '27', '28', '29', '30'],
    colors: [
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426597/modelo_2.3.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426597/modelo_2.3.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426595/model_2.1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1787426595/modelo_2.2.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 940.00,
      '13-50': 846.00,
      '51+': 790.00
    }
  },

  // 27. ZAPATOS DE COCINA BIG APPLE
  {
    id: 'zapatos-cocina-big-apple',
    code: 'PING-BA',
    name: 'Zapatos de Cocina Big Apple',
    price: 1200.00,
    category: 'restaurante',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788720182/MG_1151_2.webp',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1788720182/MG_1151_2.webp',
      'https://res.cloudinary.com/boofzznx/image/upload/v1788720179/MG_1156.webp',
      'https://res.cloudinary.com/boofzznx/image/upload/v1788720182/MG_0518.webp',
      'https://res.cloudinary.com/boofzznx/image/upload/v1788720179/MG_0527.webp'
    ],
    rating: 5.0,
    isBestSeller: true,
    description: 'Big Apple Calzado para Chef Modelo Ping Big Apple. Diseñado para brindar máximo confort, seguridad y desempeño durante largas jornadas de trabajo.',
    composition: 'Poliuretano / Hule antiderrapante / Textil antimicrobiano certificado',
    features: [
      'Plantilla: Poliuretano/Textil removible antimicrobiana, diseñada para brindar mayor comodidad e higiene.',
      'Suela: Poliuretano/Hule antiderrapante, resistente y segura para entornos de trabajo exigentes.',
      'Certificación: Producto con certificado ante COFEPRIS.',
      'Estilo: Profesional y funcional, ideal para chefs, cocineros y personal de cocina que buscan comodidad y seguridad durante todo el día.'
    ],
    sizes: ['22 MX', '23 MX', '24 MX', '25 MX', '26 MX', '27 MX', '28 MX', '29 MX', '30 MX'],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788720182/MG_1151_2.webp',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788720182/MG_1151_2.webp',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788720179/MG_1156.webp',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788720182/MG_0518.webp',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788720179/MG_0527.webp'
        ]
      },
      {
        name: 'Negro',
        hex: '#000000',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1788720226/MG_0510.jpg',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1788720226/MG_0510.jpg',
          'https://res.cloudinary.com/boofzznx/image/upload/v1788720229/MG_0512_1.jpg'
        ]
      }
    ],
    priceTiers: {
      '1-12': 1200.00,
      '13-50': 1100.00,
      '51+': 1020.00
    }
  },

  // 29. PIJAMA MEDICA CON STRECH
  {
    id: 'pijama-medica-con-strech',
    code: 'PM001-S',
    name: 'Pijama Médica con Strech',
    price: 820.00,
    category: 'medico',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872405/pijama_azul_rey.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789872405/pijama_azul_rey.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789872413/verde_jade.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789872436/PIJAMA_EN_COLOR_NEGRA.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789872535/azul_marino_1.png'
    ],
    rating: 4.9,
    description: 'Conjunto quirúrgico de filipina y pantalón clínico con elasticidad, otorga completa libertad de movimiento para médicos, enfermeros y odontólogos.',
    features: [
      'Elasticidad en 4 direcciones que acompaña cada movimiento',
      'Tecnología antifluidos y repelencia a microgotas',
      'Pantalón jogger o recto con cintura elástica y múltiples bolsas',
      'Filipina con cuello en V ergonómico y bolsa de pecho con portacredencial'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    hasCorteSelection: true,
    colors: [
      {
        name: 'Azul Rey',
        hex: '#1d4ed8',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872405/pijama_azul_rey.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872405/pijama_azul_rey.png']
      },
      {
        name: 'Verde Jade',
        hex: '#059669',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872413/verde_jade.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872413/verde_jade.png']
      },
      {
        name: 'Negro',
        hex: '#18181b',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872436/PIJAMA_EN_COLOR_NEGRA.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872436/PIJAMA_EN_COLOR_NEGRA.png']
      },
      {
        name: 'Azul Marino',
        hex: '#1e3a8a',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872535/azul_marino_1.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872535/azul_marino_1.png']
      }
    ],
    damaColors: [
      {
        name: 'Azul Rey',
        hex: '#1d4ed8',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872779/azul_rey_dama.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872779/azul_rey_dama.png']
      },
      {
        name: 'Azul Marino',
        hex: '#1e3a8a',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872772/PIJAMA_DAMA_AZUL_MARINO.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872772/PIJAMA_DAMA_AZUL_MARINO.png']
      },
      {
        name: 'Rosa',
        hex: '#ec4899',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872786/pijama_rosa.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872786/pijama_rosa.png']
      },
      {
        name: 'Verde Jade',
        hex: '#059669',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789872793/verde_jade_dama.png',
        gallery: ['https://res.cloudinary.com/boofzznx/image/upload/v1789872793/verde_jade_dama.png']
      }
    ],
    priceTiers: {
      '1-12': 820.00,
      '13-50': 790.00,
      '51+': 750.00
    }
  },

  // 30. BATAS MEDICAS M/L
  {
    id: 'batas-medicas-m-l',
    code: 'BM001-ML',
    name: 'Batas Médicas M/L',
    price: 390.00,
    category: 'medico',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789873613/bata_frente.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789873613/bata_frente.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789931258/espalda.png'
    ],
    rating: 4.8,
    description: 'Bata clínica y de laboratorio manga larga para médicos, farmacéuticos y estudiantes. Corte profesional de longitud óptima, solapa clásica, botonadura frontal y tres bolsas de carga reforzadas.',
    composition: 'Gabardina Médica 65% Poliéster / 35% Algodón',
    features: [
      'Corte Dama o Caballero',
      'Manga larga con dobladillo amplio',
      'Tres bolsillos exteriores (uno de pecho, dos laterales amplios)',
      'Aberturas laterales para acceso a bolsas del pantalón',
      'Tratamiento antimanchas y blanqueado durable'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    hasCorteSelection: true,
    colors: [
      {
        name: 'Blanco Médico',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789873613/bata_frente.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789873613/bata_frente.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789931258/espalda.png'
        ]
      }
    ],
    damaColors: [
      {
        name: 'Blanco Médico',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789935741/PERFIL_BATA.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789935741/PERFIL_BATA.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789931364/ESPALDA_DAMA.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 390.00,
      '13-50': 370.00,
      '51+': 350.00
    }
  },

  // 31. CALZADO CLINICO MOD. 363 BLANCO
  {
    id: 'calzado-clinico-mod-363-blanco',
    code: 'MOD-363',
    name: 'Calzado Clínico Mod. 363 Blanco',
    price: 882.00,
    category: 'medico',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789944876/MODELO363_1.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789944876/MODELO363_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789944876/MODELO_363_1.png'
    ],
    rating: 4.9,
    description: 'Calzado clínico profesional Modelo 363 en color blanco. Estructura ergonómica con soporte de arco plantar, horma ancha para evitar puntos de presión y suela antiderrapante en suelos de hospital.',
    composition: 'Piel genuina suave tratada / Suela de poliuretano inyectado',
    features: [
      'Piel genuina blanca fácil de limpiar y desinfectar',
      'Suela antiderrapante ligera que no genera ruido al caminar',
      'Forro interno transpirable que evita la humedad',
      'Plantilla acolchada con memory foam'
    ],
    sizes: ['22 MX', '23 MX', '24 MX', '25 MX', '26 MX', '27 MX', '28 MX', '29 MX'],
    colors: [
      {
        name: 'Blanco Clínico',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789944876/MODELO363_1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789944876/MODELO363_1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789944876/MODELO_363_1.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 882.00,
      '13-50': 832.00,
      '51+': 790.00
    }
  },

  // 32. CALZADO CLINICO MOD. 920
  {
    id: 'calzado-clinico-mod-920-blanco',
    code: 'MOD-920-B',
    name: 'Calzado Clínico Mod. 920',
    price: 1025.00,
    category: 'medico',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789944948/MODEL363_2.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789944948/MODEL363_2.png'
    ],
    rating: 4.9,
    description: 'Calzado médico de confort superior Modelo 920 en color blanco. Amortiguación de alto impacto en talón, piel suave flor entera y diseño sin cordones de ajuste elástico lateral.',
    composition: '100% Piel Flor Entera Blanca / Suela Antifatiga',
    features: [
      'Elásticos laterales para calce inmediato y sujeción segura',
      'Suela de alta flexibilidad que amortigua cada paso',
      'Plantilla ergonómica antibacterial extraíble',
      'Excelente soporte para turnos de guardia médica prolongados'
    ],
    sizes: ['23 MX', '24 MX', '25 MX', '26 MX', '27 MX', '28 MX', '29 MX', '30 MX'],
    colors: [
      {
        name: 'Blanco Clínico',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789944948/MODEL363_2.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789944948/MODEL363_2.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 1025.00,
      '13-50': 975.00,
      '51+': 925.00
    }
  },

  // 33. CALZADO CLINICO MOD. 1042
  {
    id: 'calzado-clinico-mod-1042-blanco',
    code: 'MOD-1042-B',
    name: 'Calzado Clínico Mod. 1042',
    price: 1025.00,
    category: 'medico',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789945039/MOD1042_1.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/v1789945039/MOD1042_1.png',
      'https://res.cloudinary.com/boofzznx/image/upload/v1789945037/MODELO1042_1.png'
    ],
    rating: 4.9,
    description: 'Calzado ortopédico clínico Modelo 1042 en color blanco. Máxima amortiguación, suela de doble densidad y diseño cerrado con perforaciones laterales respirables para control térmico.',
    composition: 'Piel Selecta Tratada / Suela Dieléctrica Antiderrapante',
    features: [
      'Suela ligera de doble densidad que previene calambres y fatiga',
      'Diseño con perforaciones laterales que disipan calor',
      'Piel suave repelente a líquidos',
      'Recomendado para enfermería, quirófano y laboratorio'
    ],
    sizes: ['22 MX', '23 MX', '24 MX', '25 MX', '26 MX', '27 MX', '28 MX', '29 MX'],
    colors: [
      {
        name: 'Blanco Hospitalario',
        hex: '#ffffff',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789945039/MOD1042_1.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/v1789945039/MOD1042_1.png',
          'https://res.cloudinary.com/boofzznx/image/upload/v1789945037/MODELO1042_1.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 1025.00,
      '13-50': 975.00,
      '51+': 925.00
    }
  },

  // 35. RASH MANGA LARGA EN LICRA
  {
    id: 'rash-guardavidas',
    code: 'RS001L',
    name: 'Rash Manga Larga en Licra',
    price: 490.00,
    category: 'hoteleria',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788580772/Dise%C3%B1o_Sin_T%C3%ADtulo_-_3_2.png',
    gallery: [
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788580772/Dise%C3%B1o_Sin_T%C3%ADtulo_-_3_2.png',
      'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788580844/Dise%C3%B1o_Sin_T%C3%ADtulo_-_2_3.png'
    ],
    isBestSeller: true,
    rating: 4.9,
    description: 'Mantente protegido y cómodo con nuestras rash de Guardavidas manga larga. Confeccionada en tejido protector contra los rayos UV con cuello redondo y máxima durabilidad.',
    composition: '100% Poliéster',
    features: [
          'Manga larga',
          'Cuello redondo',
          'Logo en pecho y espalda',
          'Protector contra los rayos UV'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      {
        name: 'Rojo Guardavidas',
        hex: '#dc2626',
        image: 'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788580772/Dise%C3%B1o_Sin_T%C3%ADtulo_-_3_2.png',
        gallery: [
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788580772/Dise%C3%B1o_Sin_T%C3%ADtulo_-_3_2.png',
          'https://res.cloudinary.com/boofzznx/image/upload/f_auto,q_auto/v1788580844/Dise%C3%B1o_Sin_T%C3%ADtulo_-_2_3.png'
        ]
      }
    ],
    priceTiers: {
      '1-12': 490.00,
      '13-50': 470.00,
      '51+': 460.00
    }
  },



  // 38. SHORT GUARDAVIDAS
  {
    id: 'short-guardavidas',
    code: 'SG001',
    name: 'Short Guardavidas',
    price: 370.00,
    category: 'hoteleria',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789955218/Gemini_Generated_Image_8h7ema8h7ema8h7e.jpg',
    rating: 4.8,
    description: 'Short deportivo para salvavidas y monitores de alberca. Corte por encima de la rodilla para agilidad en nado y rescate inmediato con suspensorio interno de malla suave.',
    composition: '100% Poliéster Hidrófugo',
    features: [
      'Suspensorio interior higiénico transpirable',
      'Cintura elastizada con jareta de amarre rápido',
      'Bolsa trasera con ojillo para escape de agua',
      'Tejido ligero que no retiene peso en el agua'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [],
    priceTiers: {
      '1-12': 370.00,
      '13-50': 355.00,
      '51+': 340.00
    }
  },

  // 39. GORRA DE GABARDINA
  {
    id: 'gorra-gabardina',
    code: 'GG001',
    name: 'Gorra de Gabardina',
    price: 130.00,
    category: 'industrial',
    image: 'https://res.cloudinary.com/boofzznx/image/upload/v1789955208/Dise%C3%B1o_sin_t%C3%ADtulo_4.png',
    rating: 4.8,
    description: 'Gorra clásica de 6 gajos confeccionada en gabardina 100% algodón. Visera de 6 cm de largo por 16 cm de ancho, alto de corona de 16 cm, circunferencia de 53 cm y ajustador con broche de hebilla.',
    composition: 'Gabardina 100% Algodón',
    features: [
          'Composición 100% algodón',
          'Circunferencia: 53 cm',
          'Visera: Largo 6 cm - Ancho 16 cm',
          'Alto de corona 16 cm, 6 gajos',
          'Ajustador con broche de hebilla'
    ],
    sizes: ['Unitalla Ajustable'],
    colors: [],
    priceTiers: {
      '1-12': 130.00,
      '13-50': 120.00,
      '51+': 110.00
    }
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Adriana Barrera Ugalde',
    role: 'Cliente Verificado Google',
    company: 'Reseña en Google Maps',
    date: 'Hace 8 semanas',
    rating: 5,
    text: 'Excelente empresa, buen servicio al cliente de manera puntual y honesta y los materiales que usan son de alta calidad!!!',
    ownerResponse: {
      author: 'Uniformes Pre (propietario)',
      date: 'Hace 8 semanas',
      text: 'Adriana, muchas gracias por tus comentarios.'
    }
  },
  {
    id: '2',
    name: 'Emanuel Perez soto',
    role: 'Cliente Verificado Google',
    company: 'Reseña en Google Maps',
    date: 'Hace 8 semanas',
    rating: 5,
    text: 'Fui a comprar un pantalón para mi trabajo y muy buena atención, me enseñaron varios modelos termine comprando en varios colores para mi uso diario y para mi trabajo los recomiendo ampliamente',
    ownerResponse: {
      author: 'Uniformes Pre (propietario)',
      date: 'Hace 8 semanas',
      text: 'Hola, Muchas gracias por tus comentarios ¡Esperamos poder atenderte pronto otra vez!'
    }
  },
  {
    id: '3',
    name: 'Alejandro Bernal',
    role: 'Cliente Verificado Google',
    company: 'Reseña en Google Maps',
    date: 'Hace 8 semanas',
    rating: 5,
    text: 'Muy buena atención y servicio. 10 de 10 con la filipina que repele el agua y el aceite. La mejor compra.',
    ownerResponse: {
      author: 'Uniformes Pre (propietario)',
      date: 'Hace 8 semanas',
      text: '¡Nos encanta tu comentario! La Filipina repelente al agua y el aceite es una de las prendas más vendidas en nuestra tienda. No dudes en contactarnos si tienes alguna consulta ¡Gracias por compartirnos tu experiencia!'
    }
  }
];
