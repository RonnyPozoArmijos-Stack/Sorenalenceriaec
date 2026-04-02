
import { Product } from './types';

// Ecuador (593) + 969001613
export const WHATSAPP_NUMBER = "593969001613";
export const PHONE_NUMBER = WHATSAPP_NUMBER;

export const CATEGORIES = [
  "Todos",
  "Conjuntos",
  "Bodys",
  "Brassiers",
  "Panties",
  "Pijamas"
];

export const PRODUCTS: Product[] = [
  {
    id: 310,
    title: "Coffe",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159359/WhatsApp_Image_2026-04-02_at_1.42.50_PM_zzulwp.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159364/WhatsApp_Image_2026-04-02_at_1.42.50_PM_2_eowhgj.jpg",
    tertiaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159361/WhatsApp_Image_2026-04-02_at_1.42.50_PM_1_vtkkxp.jpg",
    category: "Conjuntos",
    tag: "PREVENTA",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 309,
    title: "Gala",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159345/WhatsApp_Image_2026-04-02_at_1.41.06_PM_2_wkizm9.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159342/WhatsApp_Image_2026-04-02_at_1.41.06_PM_1_lyi9zv.jpg",
    tertiaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159340/WhatsApp_Image_2026-04-02_at_1.41.06_PM_rowxjv.jpg",
    category: "Conjuntos",
    tag: "PREVENTA",
    availableSizes: ['L'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 308,
    title: "Esmeralda",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159337/WhatsApp_Image_2026-04-02_at_1.40.37_PM_2_ojzlri.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159335/WhatsApp_Image_2026-04-02_at_1.40.37_PM_1_wx01o4.jpg",
    tertiaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775161338/WhatsApp_Image_2026-04-02_at_1.40.37_PM_ijbydk.jpg",
    category: "Conjuntos",
    tag: "PREVENTA",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 307,
    title: "Sol",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159349/WhatsApp_Image_2026-04-02_at_1.41.44_PM_hviftu.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159356/WhatsApp_Image_2026-04-02_at_1.41.45_PM_kimnus.jpg",
    category: "Conjuntos",
    tag: "PREVENTA",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 306,
    title: "Hechizo",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159332/WhatsApp_Image_2026-04-02_at_1.39.15_PM_qphxxv.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159327/WhatsApp_Image_2026-04-02_at_1.39.14_PM_rm7idn.jpg",
    tertiaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159330/WhatsApp_Image_2026-04-02_at_1.39.14_PM_1_is6fcc.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['XL'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 305,
    title: "Luz",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159317/WhatsApp_Image_2026-04-02_at_1.37.50_PM_2_yczyae.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159238/WhatsApp_Image_2026-04-02_at_1.37.50_PM_1_yk4yhl.jpg",
    tertiaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159231/WhatsApp_Image_2026-04-02_at_1.37.50_PM_ucorsy.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 304,
    title: "Seda",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159324/WhatsApp_Image_2026-04-02_at_1.38.45_PM_b6vyjj.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159209/WhatsApp_Image_2026-04-02_at_1.38.44_PM_gxeg2a.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['XL'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 303,
    title: "Ébano",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159211/WhatsApp_Image_2026-04-02_at_1.36.51_PM_1_oj87lo.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159206/WhatsApp_Image_2026-04-02_at_1.36.51_PM_z8ohup.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 302,
    title: "Índigo",
    price: 21.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159187/WhatsApp_Image_2026-04-02_at_1.36.15_PM_nymskr.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 301,
    title: "Dahlia",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159181/WhatsApp_Image_2026-04-02_at_1.34.39_PM_x7hxn1.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159180/WhatsApp_Image_2026-04-02_at_1.34.39_PM_1_dutbtx.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['L'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 300,
    title: "Pétalo",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159039/WhatsApp_Image_2026-04-02_at_1.34.07_PM_2_mrfdl4.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/q_auto/f_auto/v1775159036/WhatsApp_Image_2026-04-02_at_1.34.07_PM_1_nzvn9p.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 206,
    title: "Violeta",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670785/WhatsApp_Image_2026-02-28_at_1.16.40_PM_2_mhw2og.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670785/WhatsApp_Image_2026-02-28_at_1.16.40_PM_tqe3dg.jpg",
    tertiaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670777/WhatsApp_Image_2026-02-28_at_1.16.40_PM_1_k1zl54.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 203,
    title: "Scarlet",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670837/WhatsApp_Image_2026-02-28_at_1.14.28_PM_2_erxy0q.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670842/WhatsApp_Image_2026-02-28_at_1.14.28_PM_3_ghaqyc.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['XS'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 200,
    title: "Aura",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670760/WhatsApp_Image_2026-02-28_at_1.15.45_PM_ckmi4c.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670860/WhatsApp_Image_2026-02-28_at_1.15.45_PM_1_c3r9ay.jpg",
    tertiaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1772670855/WhatsApp_Image_2026-02-28_at_1.15.44_PM_1_ffjsr3.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 104,
    title: "Dulce Atadura",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1768961561/WhatsApp_Image_2026-01-20_at_9.00.59_PM_sde2or.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1768961544/WhatsApp_Image_2026-01-20_at_9.00.59_PM_3_qrlxqq.jpg",
    category: "Conjuntos",
    tag: "NUEVO",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 12,
    title: "Noa",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765427808/WhatsApp_Image_2025-12-02_at_4.03.29_PM_2_flftmz.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765427789/WhatsApp_Image_2025-12-02_at_4.03.29_PM_3_rjfenn.jpg",
    category: "Conjuntos",
    tag: "MAS VENDIDO",
    availableSizes: ['S'],
    outOfStockSizes: ['XL', 'L'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 15,
    title: "Viviana",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765594359/WhatsApp_Image_2025-12-12_at_9.51.43_PM_uyq2dj.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765594360/WhatsApp_Image_2025-12-12_at_9.51.43_PM_1_xiv4fe.jpg",
    category: "Conjuntos",
    availableSizes: ['S', 'M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 16,
    title: "Venna",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554510/WhatsApp_Image_2025-12-11_at_5.52.20_PM_6_efo60k.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554514/WhatsApp_Image_2025-12-11_at_5.52.20_PM_7_ni3qxm.jpg",
    category: "Conjuntos",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 18,
    title: "Selene",
    price: 21.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554313/WhatsApp_Image_2025-12-11_at_5.52.22_PM_zfcmiu.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554371/WhatsApp_Image_2025-12-11_at_5.52.22_PM_1_qooygm.jpg",
    category: "Conjuntos",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 14,
    title: "Susurro",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554524/WhatsApp_Image_2025-12-11_at_5.52.28_PM_1_ybkwmb.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554537/WhatsApp_Image_2025-12-11_at_5.52.28_PM_2_c6rrww.jpg",
    category: "Conjuntos",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 11,
    title: "Valeri",
    price: 24.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554944/WhatsApp_Image_2025-12-11_at_5.52.36_PM_2_xjm6wi.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765554935/WhatsApp_Image_2025-12-11_at_5.52.36_PM_3_pbszra.jpg",
    category: "Conjuntos",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 3,
    title: "Lunaria",
    price: 14.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765555820/WhatsApp_Image_2025-12-11_at_5.52.40_PM_2_lons26.jpg",
    category: "Conjuntos",
    availableSizes: ['L'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 5,
    title: "Luz de medianoche",
    price: 14.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765555394/WhatsApp_Image_2025-12-11_at_5.52.29_PM_2_iychgn.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765555454/WhatsApp_Image_2025-12-11_at_5.52.29_PM_3_vzrjgr.jpg",
    category: "Conjuntos",
    availableSizes: ['L'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 9,
    title: "Rossetta",
    price: 17.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765555111/WhatsApp_Image_2025-12-11_at_5.52.32_PM_j1vswr.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765555273/WhatsApp_Image_2025-12-11_at_5.52.33_PM_1_l8kr5e.jpg",
    category: "Conjuntos",
    availableSizes: ['M'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 22,
    title: "Talia",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765553927/WhatsApp_Image_2025-12-11_at_5.52.36_PM_1_l2urd0.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765553922/WhatsApp_Image_2025-12-11_at_5.52.36_PM_qvnm1d.jpg",
    category: "Conjuntos",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  },
  {
    id: 24,
    title: "Romance",
    price: 19.99,
    img: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765494194/WhatsApp_Image_2025-12-11_at_5.52.39_PM_yw1ax7.jpg",
    secondaryImg: "https://res.cloudinary.com/dyqz0n0to/image/upload/v1765494174/WhatsApp_Image_2025-12-11_at_5.52.40_PM_w5ot5h.jpg",
    category: "Conjuntos",
    availableSizes: ['S'],
    inStock: true,
    description: "Diseño exclusivo de Sorena Lencería. Materiales de alta calidad que se ajustan a tu figura para brindarte comodidad y sensualidad."
  }
];

export const INITIAL_PRODUCTS = PRODUCTS;
