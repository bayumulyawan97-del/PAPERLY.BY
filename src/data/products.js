import imgNotebookA5 from '../assets/images/product-notebook-a5.svg';
import imgBinderA5 from '../assets/images/product-binder-a5.svg';
import imgJournalB5 from '../assets/images/product-journal-b5.svg';
import imgGelPens from '../assets/images/product-gel-pens.svg';
import imgBrassPencil from '../assets/images/product-brass-pencil.svg';
import imgBrushPens from '../assets/images/product-brush-pens.svg';
import imgPencilCase from '../assets/images/product-pencil-case.svg';
import imgRulerSet from '../assets/images/product-ruler-set.svg';
import imgDeskPlanner from '../assets/images/product-desk-planner.svg';
import imgStickyNotes from '../assets/images/product-sticky-notes.svg';
import imgWashiTape from '../assets/images/product-washi-tape.svg';
import imgDeskOrganizer from '../assets/images/product-desk-organizer.svg';

export const CATEGORIES = [
  {
    id: 'buku-binder',
    name: 'Buku dan Binder',
    description: 'Notebook hardcover, binder ring, dan jurnal kertas premium anti tembus tinta.',
    icon: 'book',
  },
  {
    id: 'pulpen-pensil',
    name: 'Pulpen dan Pensil',
    description: 'Gel pen halus, pensil mekanik presisi, dan brush pen untuk catatan kreatif.',
    icon: 'pen',
  },
  {
    id: 'perlengkapan-sekolah',
    name: 'Perlengkapan Sekolah',
    description: 'Kotak pensil kanvas, penggaris geometri, dan planner mingguan yang rapi.',
    icon: 'backpack',
  },
  {
    id: 'aksesoris-alat-tulis',
    name: 'Aksesoris Alat Tulis',
    description: 'Sticky notes, washi tape estetik, dan organizer meja kayu minimalis.',
    icon: 'sparkles',
  },
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Paperly Linen Hardcover Notebook A5',
    category: 'Buku dan Binder',
    price: 68000,
    stock: 24,
    description:
      'Buku catatan sampul linen bertekstur lembut dengan 192 halaman kertas ivory 100 gsm. Nyaman untuk menulis catatan kuliah, jurnal harian, maupun rapat kantor tanpa tinta tembus.',
    specs: [
      'Ukuran A5 (14.8 x 21 cm)',
      '192 halaman dotted / bergaris',
      'Kertas 100 gsm ramah fountain pen',
      'Dilengkapi pita pembatas & karet pengunci',
    ],
    image: imgNotebookA5,
    isBestSeller: true,
    isNew: true,
  },
  {
    id: 2,
    name: 'Sage Ring Binder A5 20-Ring + Loose Leaf',
    category: 'Buku dan Binder',
    price: 85000,
    stock: 18,
    description:
      'Binder A5 warna sage green dengan mekanisme 20-ring kokoh berbahan matte metal. Sudah termasuk 60 lembar kertas loose leaf bergaris dan 4 pembatas halaman pastel.',
    specs: [
      '20-ring stainless anti macet',
      'Termasuk 60 lembar loose leaf 90 gsm',
      '4 divider kategori berwarna lembut',
      'Cover PP doff tahan percikan air',
    ],
    image: imgBinderA5,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 3,
    name: 'Grid Dotted Study Journal B5',
    category: 'Buku dan Binder',
    price: 54000,
    stock: 30,
    description:
      'Jurnal belajar ukuran B5 yang lega dengan pola titik presisi untuk membuat mind-map, rangkuman mata kuliah, atau sketsa diagram. Jilid jahit benang agar buku terbuka rata 180 derajat.',
    specs: [
      'Ukuran B5 (17.6 x 25 cm)',
      '120 halaman dotted 5 mm',
      'Jilid lay-flat terbuka rata',
      'Sampul softcover kraft laminasi doff',
    ],
    image: imgJournalB5,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: 4,
    name: 'Pastel Gel Pen Set 0.5mm (6 Warna)',
    category: 'Pulpen dan Pensil',
    price: 45000,
    stock: 40,
    description:
      'Paket 6 pulpen gel tinta cepat kering dengan ujung 0.5 mm yang halus dan tidak mudah luntur. Hadir dalam palet warna bumi sage, krem, terracotta, biru debu, taupe, dan hitam.',
    specs: [
      'Mata pena 0.5 mm needle tip',
      'Tinta cepat kering anti smudge',
      'Grip karet ergonomis',
      'Isi 6 pulpen warna estetik',
    ],
    image: imgGelPens,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 5,
    name: 'Mechanical Pencil Brass 0.5mm',
    category: 'Pulpen dan Pensil',
    price: 62000,
    stock: 15,
    description:
      'Pensil mekanik berbalut kuningan matte dan aksen sage green dengan bobot seimbang di tangan. Memberikan kendali presisi untuk menulis rumus, menggambar teknik, atau sketsa ringan.',
    specs: [
      'Ukuran isi pensil 0.5 mm',
      'Bodi logam brass tahan lama',
      'Klip saku & penghapus di tutup',
      'Bonus 1 tube isi pensil 2B',
    ],
    image: imgBrassPencil,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: 6,
    name: 'Dual-Tip Brush & Fineliner Set (12 Pcs)',
    category: 'Pulpen dan Pensil',
    price: 92000,
    stock: 20,
    description:
      'Set 12 spidol dua sisi: ujung kuas fleksibel untuk kaligrafi/highlighting dan ujung fineliner 0.4 mm untuk detail catatan. Warna berbasis air yang lembut di mata.',
    specs: [
      '12 warna earthy & pastel',
      'Dual tip: brush + fineliner 0.4 mm',
      'Tinta water-based tidak berbau',
      'Wadah kotak penyimpanan rapi',
    ],
    image: imgBrushPens,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 7,
    name: 'Minimalist Canvas Pencil Case',
    category: 'Perlengkapan Sekolah',
    price: 49000,
    stock: 28,
    description:
      'Kotak pensil berbahan kanvas katun tebal dengan ritsleting halus dan bukaan lebar. Muat hingga 25 alat tulis termasuk penggaris 15 cm, penghapus, dan correction tape.',
    specs: [
      'Bahan kanvas katun 14 oz',
      'Dimensi 21 x 9 x 6 cm',
      'Kantong jaring internal',
      'Mudah dicuci dan ringan',
    ],
    image: imgPencilCase,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 8,
    name: 'Geometry Ruler & Protractor Set Aluminium',
    category: 'Perlengkapan Sekolah',
    price: 38000,
    stock: 35,
    description:
      'Set penggaris lengkap berbahan aluminium anodized anti karat dengan angka cetak laser yang tidak mudah pudar. Cocok untuk pelajar, mahasiswa teknik, dan arsitektur.',
    specs: [
      'Penggaris lurus 15 cm',
      '2 penggaris segitiga siku',
      'Busur derajat 180 derajat',
      'Kotak pelindung transparan',
    ],
    image: imgRulerSet,
    isBestSeller: false,
    isNew: false,
  },
  {
    id: 9,
    name: 'Weekly Desk Planner Pad A4 (52 Lembar)',
    category: 'Perlengkapan Sekolah',
    price: 58000,
    stock: 22,
    description:
      'Alas perencana mingguan ukuran A4 dengan 52 lembar sobek untuk jadwal 1 tahun penuh. Dilengkapi kolom prioritas tugas, jadwal harian, dan catatan target belajar.',
    specs: [
      'Ukuran A4 (21 x 29.7 cm)',
      '52 lembar kertas HVS 100 gsm',
      'Alas karton tebal di bagian bawah',
      'Desain grid sage minimalis',
    ],
    image: imgDeskPlanner,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: 10,
    name: 'Sage Sticky Notes & Page Marker Kit',
    category: 'Aksesoris Alat Tulis',
    price: 29000,
    stock: 50,
    description:
      'Paket lengkap sticky notes persegi dan penanda halaman transparan dengan daya rekat pas yang tidak merusak kertas buku saat dilepas.',
    specs: [
      '3 blok sticky notes (masing-masing 50 lembar)',
      '5 warna page marker PET',
      'Permukaan mudah ditulis pulpen maupun pensil',
      'Kemasan saku praktis',
    ],
    image: imgStickyNotes,
    isBestSeller: true,
    isNew: false,
  },
  {
    id: 11,
    name: 'Washi Tape Earthy Tone Set (5 Rolls)',
    category: 'Aksesoris Alat Tulis',
    price: 42000,
    stock: 32,
    description:
      'Set 5 gulungan selotip kertas washi bermotif polos dan garis lembut nuansa sage, krem, dan soft orange. Ideal untuk menghias jurnal, pembatas binder, atau label dokumen.',
    specs: [
      '5 roll ukuran lebar 15 mm',
      'Panjang 5 meter per roll',
      'Mudah disobek dengan tangan',
      'Tidak meninggalkan residu lem',
    ],
    image: imgWashiTape,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: 12,
    name: 'Wooden Desk Organizer & Pen Holder',
    category: 'Aksesoris Alat Tulis',
    price: 115000,
    stock: 12,
    description:
      'Tempat alat tulis meja berbahan kayu oak ringan dengan finishing natural matte. Memiliki 4 sekat serbaguna untuk pulpen, gunting, sticky notes, dan kartu nama.',
    specs: [
      'Kayu oak solid finishing natural',
      'Dimensi 20 x 11 x 10 cm',
      '4 kompartemen bertingkat',
      'Bantalan anti selip di bagian dasar',
    ],
    image: imgDeskOrganizer,
    isBestSeller: false,
    isNew: true,
  },
];

export function getProductById(id) {
  const numericId = Number(id);
  return PRODUCTS.find((item) => item.id === numericId) || null;
}

export function getCategoryCount(categoryName) {
  return PRODUCTS.filter((item) => item.category === categoryName).length;
}
