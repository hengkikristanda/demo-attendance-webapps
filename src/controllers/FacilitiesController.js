const WebPageService = require("../services/WebPageService");
const HeroSectionService = require("../services/HeroSectionService");
const AccordionContentService = require("../services/AccordionContentService");

const CommonComponentServices = require("../services/CommonsComponentServices");
const CommonUtils = require("../utils/CommonUtils");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const SectionImagesService = require("../services/SectionImagesService/SectionImagesService");
const TabListItemService = require("../services/TabList/TabListItemService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const WebPageSectionMappingService = require("../services/WebPageSectionMappingService");

const FacilitiesImagesService = require("../services/FacilitiesImagesService");
const { id } = require("translate-google/languages");

const webPageId = "7e4a4013-a63b-11ef-be9c-d5a2ad7b6072";
const currentPage = {
	id: "Fasilitas",
	en: "Facilities",
	ja: "施設",
	ko: "시설",
	zh: "设施",
};

const sectionImage = {
	id: "Galeri",
	en: "Gallery",
	ja: "ギャラリー",
	ko: "갤러리",
	zh: "画廊",
};

const headingPage = {
	en: "MODERN FACILITIES TO BOOST YOUR LEARNING EXPERIENCE",
	id: "FASILITAS MODERN UNTUK MENINGKATKAN PENGALAMAN BELAJAR ANDA",
	ko: "현대적인 시설로 학습 경험 향상",
	ja: "学習体験を向上させるモダンな施設",
	zh: "现代化设升您的学习体验",
};

const contentPage = {
	en: "Our campus boasts cutting-edge classrooms, fully equipped laboratories, and extensive libraries designed to provide an optimal learning environment. Additionally, we offer various recreational and wellness facilities, including a modern gym, sports fields, and comfortable student lounges. Our goal is to create a well-rounded experience that caters to both academic and personal growth. Explore the diverse range of facilities available to you and see how they contribute to a vibrant and dynamic campus life. Your success is our priority, and our facilities are here to support you every step of the way.",
	id: "Kampus kami memiliki ruang kelas mutakhir, laboratorium yang lengkap, dan perpustakaan yang luas yang dirancang untuk memberikan lingkungan belajar yang optimal. Selain itu, kami menawarkan berbagai fasilitas rekreasi dan kesehatan, termasuk gym modern, lapangan olahraga, dan ruang santai yang nyaman bagi mahasiswa. Tujuan kami adalah menciptakan pengalaman yang menyeluruh yang mendukung pertumbuhan akademik dan pribadi. Jelajahi beragam fasilitas yang tersedia untuk Anda dan lihat bagaimana mereka berkontribusi pada kehidupan kampus yang dinamis dan bersemangat. Kesuksesan Anda adalah prioritas kami, dan fasilitas kami siap mendukung Anda di setiap langkah.",
	ko: "우리 캠퍼스는 최첨단 강의실, 완비된 실험실, 그리고 학습에 최적화된 광범위한 도서관을 자랑합니다. 또한, 현대적인 체육관, 스포츠 필드, 편안한 학생 라운지를 포함한 다양한 레크리에이션 및 웰니스 시설을 제공합니다. 우리의 목표는 학업과 개인 성장을 모두 지원하는 완전한 경험을 제공하는 것입니다. 다양한 시설을 탐험하며 활기차고 역동적인 캠퍼스 생활에 어떻게 기여하는지 확인해 보세요. 여러분의 성공이 우리의 최우선 과제이며, 우리의 시설은 여러분의 모든 단계에서 지원할 준비가 되어 있습니다.",
	ja: "私たちのキャンパスには、最新の教室、設備の整った実験室、そして最適な学習環境を提供する広大な図書館があります。さらに、モダンなジム、スポーツフィールド、快適な学生ラウンジなど、さまざまなレクリエーションおよびウェルネス施設を提供しています。私たちの目標は、学業と個人の成長の両方を支える充実した体験を創造することです。利用可能なさまざまな施設を探索し、それらがどのように活気に満ちたダイナミックなキャンパスライフに貢献しているかをご覧ください。あなたの成功が私たちの最優先事項であり、私たちの施設は常にあなたを支える準備ができています。",
	zh: "我们的校园拥有最先进的教室、设备齐全的实验室和广泛的图书馆，旨在提供最佳的学习环境。此外，我们还提供各种休闲和健康设施，包括现代化的健身房、运动场和舒适的学生休息室。我们的目标是创造一个全面的体验，既满足学术需求，又促进个人成长。探索我们提供的各种设施，看看它们如何助力充满活力和动感的校园生活。您的成功是我们的首要任务，我们的设施将在每一步都支持您。",
};

const facilitiesPage = {
	id: [
		{
			name: "GEDUNG REKTORAT HERJAN KENASIN",
			description:
				"Gedung Rektorat Herjan Kenasin merupakan salah satu bangunan penting yang menjadi pusat administrasi dan kepemimpinan di Politeknik Transportasi Darat Indonesia - STTD, Bekasi. Gedung ini tidak hanya berfungsi sebagai kantor bagi pimpinan kampus, tetapi juga sebagai tempat untuk berbagai kegiatan administratif dan strategis dalam pengembangan kebijakan akademik dan non-akademik. Sebagai pusat administrasi, Gedung Rektorat Herjan Kenasin menyediakan ruang bagi Pimpinan, Para Pejabat, dan staf administrasi untuk menjalankan fungsi manajemen kampus secara efektif. Di sini, berbagai keputusan strategis diambil, sumber daya kampus dikelola, dan berbagai kegiatan pengembangan dirancang untuk mendukung misi pendidikan PTDI-STTD. Selain itu, gedung ini juga sering menjadi tempat pertemuan antara pimpinan dengan dosen, staf, mahasiswa, serta stakeholders eksternal. Berbagai rapat penting, presentasi, dan diskusi kebijakan dilakukan di Gedung Rektorat ini, memastikan arah dan tujuan kampus sesuai dengan visi dan misinya dalam mengembangkan SDM di bidang transportasi darat. Dengan demikian, Gedung Rektorat Herjan Kenasin bukan hanya sebagai pusat administrasi tetapi juga sebagai simbol kekuatan dan keberlanjutan pengembangan Politeknik Transportasi Darat Indonesia - STTD, menjadi pendorong utama untuk kemajuan pendidikan dan inovasi di bidang transportasi darat.",
		},
		{
			name: "GEDUNG AUDITORIUM GIRI S. HADIHARDJONO",
			description:
				"Gedung Auditorium Giri S. Hadihardjono adalah salah satu landmark penting di Politeknik Transportasi Darat Indonesia - STTD, Bekasi. Gedung ini merupakan pusat kegiatan akademik dan non-akademik yang berfungsi sebagai tempat untuk berbagai acara penting seperti seminar, konferensi, kuliah umum, dan acara budaya. Didesain dengan fasilitas modern dan kapasitas yang besar, Auditorium Giri S. Hadihardjono menyediakan lingkungan yang ideal untuk pertemuan-pertemuan besar dan aktivitas berbasis komunitas di kampus. Selain itu, auditorium ini juga sering digunakan untuk acara-acara penting seperti wisuda, acara seni, dan kegiatan sosial lainnya yang melibatkan mahasiswa, staf, dan masyarakat umum. Keberadaan Gedung Auditorium Giri S. Hadihardjono bukan hanya sebagai tempat berlangsungnya berbagai acara, tetapi juga sebagai simbol kebanggaan bagi PTDI-STTD, mengingat namanya berasal dari sosok yang berjasa dalam pengembangan dan promosi transportasi darat di Indonesia. Hal ini mencerminkan komitmen PTDI-STTD dalam menghadirkan fasilitas terbaik untuk mendukung pengembangan ilmu pengetahuan dan seni di lingkungan akademik mereka.",
		},
		{
			name: "GEDUNG AULA GARUDA",
			description:
				'Gedung Aula Garuda adalah salah satu fasilitas utama di Politeknik Transportasi Darat Indonesia - STTD, Bekasi, yang memegang peran vital dalam mendukung berbagai kegiatan akademik dan non-akademik. Nama "Garuda" sendiri mencerminkan kebanggaan atas identitas nasional, sekaligus menggambarkan tingginya cita-cita dan prestasi yang ingin dicapai oleh PTDI-STTD dalam bidang transportasi darat. Gedung ini sering digunakan untuk berbagai kegiatan seperti kuliah umum dengan pembicara terkemuka, acara seni dan budaya, serta pertemuan besar antara mahasiswa, dosen, dan stakeholder kampus. Selain sebagai tempat berlangsungnya berbagai acara, Aula Garuda juga menjadi simbol kebersamaan dan komunitas di PTDI-STTD, tempat di mana ide-ide baru diperkenalkan, kolaborasi akademik ditingkatkan, dan inspirasi untuk memajukan pendidikan transportasi darat dipupuk. Dengan fasilitas dan suasana yang mendukung, Aula Garuda menjadi ruang yang penting dalam memperkuat identitas dan kualitas PTDI-STTD sebagai institusi pendidikan yang berwawasan global dan berkualitas tinggi.',
		},
		{
			name: "GEDUNG PROGRAM STUDI",
			description:
				"Gedung Program Studi di Politeknik Transportasi Darat Indonesia - STTD, Bekasi, merupakan fasilitas kunci yang mendukung aktivitas akademik dan pengembangan ilmu pengetahuan di berbagai disiplin transportasi darat. Terdapat lima gedung program studi yang masing-masing dilengkapi dengan fasilitas yang sesuai untuk mendukung kegiatan belajar mengajar, yakni Gedung Program Studi Transportasi Darat, Gedung Program Studi Manajemen Transportasi Jalan, Gedung Program Studi Manajemen Transportasi Perkeretaapian, Gedung Program Studi Teknologi Rekayasa Otomotif, dan Gedung Program Studi Magister Terapan. Tiap Gedung dilengkapi dengan Ruang Ketua Program Studi, Ruang Akademik, Ruang Dosen, Amphiteater, Laboratorium, Kantin Program Studi dan Ruang Kelas untuk mendukung kegiatan belajar mengajar. Setiap gedung program studi ini dirancang tidak hanya untuk menawarkan ruang belajar yang nyaman dan fungsional, tetapi juga untuk menciptakan lingkungan yang mendukung kolaborasi antara mahasiswa, dosen, dan staf dalam pengembangan ilmu pengetahuan dan keterampilan praktis di bidang transportasi darat. Dengan demikian, PTDI-STTD tidak hanya memenuhi standar akademik tetapi juga memastikan bahwa mahasiswa mendapatkan pengalaman pendidikan yang komprehensif dan berkualitas",
		},
		{
			name: "GEDUNG PERPUSTAKAAN",
			description:
				"Pada perpustakaan terdapat berbagai macam koleksi buku baik dari ilmu sains, sosial maupun pengetahuan umum lainnya. Perpustakaan juga dilengkapi dengan sistem manajemen perpustakaan yang modern untuk memudahkan pencarian dan peminjaman buku serta sumber informasi lainnya. Perpustakaan di PTDI-STTD juga mengadopsi teknologi terkini seperti akses online ke berbagai database jurnal dan e-book, sehingga memperluas akses mahasiswa dan staf terhadap literatur ilmiah terbaru di bidang transportasi darat. Perpustakaan PTDI-STTD saat ini menjadi satu gedung dengan Laboratorium Komputer, Laboratorium Bahasa dan beberapa ruang lainnya yang mendukung keberlangsungan kegiatan di kampus PTDI-STTD. Keberadaan fasilitas-fasilitas ini dalam satu gedung mengoptimalkan penggunaan ruang dan sumber daya kampus, menciptakan lingkungan yang kondusif untuk belajar, penelitian, dan pengembangan keterampilan bagi seluruh komunitas akademik PTDI-STTD. Dengan mengintegrasikan perpustakaan dengan laboratorium dan ruang lainnya, kampus ini tidak hanya memfasilitasi akses terhadap pengetahuan, tetapi juga mendorong kolaborasi lintas disiplin yang esensial dalam persiapan mahasiswa untuk tantangan dunia nyata di bidang transportasi darat",
		},
		{
			name: "SARANA OLAH RAGA",
			description:
				"Sarana olahraga di kampus PTDI-STTD terdiri dari gedung olahraga indoor maupun outdoor. Pada Gedung olahraga indoor (Gedung Olah Raga Sugihardjo) terdapat lapangan futsal, lapangan bulu tangkis, dan lapangan voli dimana dilengkapi dengan ruang ganti baju, toilet serta tribun penonton yang mampu menampung hingga 1000 lebih pengunjung. Di Gedung indoor ini juga terdapat fasilitas gym yang dapat digunakan oleh seluruh civitas akademika PTDI-STTD. Selain fasilitas indoor, terdapat pula sarana olahraga yang sifatnya outdoor seperti lapangan basket, lapangan futsal, lapangan tenis, lapangan sepakbola, serta sarana gym outdoor. Sarana olahraga yang komprehensif di PTDI-STTD tidak hanya mendukung kebugaran fisik, tetapi juga memberikan kesempatan bagi mahasiswa dan staf untuk terlibat dalam kegiatan olahraga yang bervariasi dan berbagai kompetisi. Fasilitas indoor seperti Gedung Olah Raga Sugihardjo memberikan ruang untuk olahraga dalam ruangan yang terstruktur, sementara fasilitas outdoor menawarkan pengalaman olahraga di udara terbuka yang menyegarkan. Hal ini mencerminkan komitmen kampus untuk mendukung kesejahteraan dan pengembangan holistik bagi seluruh komunitas akademik PTDI-STTD",
		},
		{
			name: "ASRAMA",
			description:
				"PTDI-STTD menyediakan fasilitas asrama untuk mahasiswa/i yang sedang menempuh masa pendidikan di kampus PTDI-STTD. Terdapat beberapa gedung asrama yang terdiri dari Asrama Maleo, Asrama Cendrawasih, Asrama Merak, Asrama Rajawali, Asrama Elang, Asrama Eksekutif dan Asrama Dadali. Pada asrama tentunya terdapat fasilitas tempat tidur, kamar mandi dan toilet serta sarana belajar yang memadai. Asrama di PTDI-STTD tidak hanya menyediakan tempat tinggal, tetapi juga berperan penting dalam membentuk pengalaman belajar dan hidup mahasiswa. Dengan menyediakan lingkungan yang mendukung, asrama membantu mahasiswa untuk berkembang secara pribadi, akademik, dan sosial selama masa studi mereka. Ini juga menciptakan komunitas yang solid di antara mahasiswa, memfasilitasi pertukaran ide dan pengalaman yang berharga di luar ruang kelas. Dengan fasilitas yang komprehensif dan manajemen yang baik, asrama di PTDI-STTD memberikan kontribusi positif dalam menciptakan lingkungan belajar yang kondusif dan mempersiapkan mahasiswa untuk menjadi profesional di bidang transportasi darat",
		},
		{
			name: "LABORATORIUM",
			description:
				"Salah satu fasilitas unggulan yang tersedia di PTDI-STTD adalah laboratorium. Laboratorium ini dirancang dengan teknologi terkini dan peralatan untuk mendukung praktikum dan penelitian dalam berbagai disiplin ilmu terkait transportasi darat. Dengan adanya laboratorium ini, mahasiswa dapat mengaplikasikan teori yang dipelajari di kelas ke dalam praktik langsung, memperdalam pemahaman mereka tentang berbagai aspek transportasi darat seperti teknik perkeretaapian, manajemen lalu lintas, dan teknologi otomotif. Selain itu, laboratorium ini juga menjadi tempat kolaborasi antara mahasiswa dan dosen serta peneliti dalam mengembangkan inovasi baru di bidang transportasi darat. Dengan demikian, PTDI-STTD tidak hanya menyediakan pendidikan berkualitas tetapi juga mempersiapkan mahasiswa untuk menjadi profesional yang siap berkontribusi dalam industri transportasi darat di masa depan",
		},
		{
			name: "POLIKLINIK",
			description:
				"Poliklinik di Politeknik Transportasi Darat Indonesia - STTD Bekasi merupakan fasilitas penting yang mendukung kesehatan dan kesejahteraan mahasiswa, staf, dan masyarakat sekitar. Poliklinik ini dilengkapi dengan tenaga medis dan paramedis yang kompeten serta peralatan medis modern untuk memberikan pelayanan kesehatan dasar. Mahasiswa dapat mengakses layanan pemeriksaan medis rutin, penanganan kasus ringan, dan konsultasi kesehatan secara mudah dan efisien. Selain itu, poliklinik juga berperan dalam menjaga kesehatan secara preventif dengan menyediakan program-program kesehatan seperti vaksinasi dan edukasi kesehatan. Dengan adanya poliklinik di PTDI-STTD, mahasiswa tidak hanya dapat fokus pada pengembangan akademiknya tetapi juga merasa aman dan terjamin dalam hal kesehatan mereka selama menjalani masa studi di kampus",
		},
		{
			name: "GEDUNG WORKSHOP",
			description:
				"Gedung workshop di PTDI-STTD memiliki peran yang krusial dalam mendukung kurikulum pendidikan praktis. Di sinilah mahasiswa belajar secara langsung bagaimana menerapkan pengetahuan teoritis yang mereka peroleh di kelas ke dalam praktik nyata. Dengan fasilitas dan peralatan yang memadai, mahasiswa dapat mengembangkan keterampilan teknis yang diperlukan untuk menjadi profesional yang kompeten di industri transportasi darat Gedung workshop tidak hanya menyediakan tempat untuk belajar praktis, tetapi juga berperan penting dalam meningkatkan keterampilan kerja mahasiswa dan mempersiapkan mereka untuk tantangan di lapangan kerja. Ini juga menjadi tempat untuk inovasi dan pengembangan teknologi baru dalam bidang transportasi darat, yang merupakan fokus utama dari pendidikan di PTDI-STTD. Dengan demikian, gedung workshop di PTDI-STTD tidak hanya sebagai ruang fisik, tetapi juga sebagai pusat kegiatan yang memungkinkan mahasiswa untuk mengasah keterampilan praktis mereka, meningkatkan daya saing, dan berkontribusi positif dalam industri transportasi darat secara keseluruhan",
		},
		{
			name: "KANTIN",
			description:
				"Merupakan salah satu fasilitas vital yang mendukung kehidupan sehari-hari dan kesejahteraan seluruh komunitas kampus. Terletak strategis di area kampus, kantin menyediakan berbagai pilihan makanan dan minuman yang sesuai dengan selera dan kebutuhan mahasiswa, dosen, dan staf. Selain menjadi tempat untuk menikmati hidangan, kantin juga berfungsi sebagai ruang sosial yang memfasilitasi interaksi antaranggota kampus, memperkuat jaringan sosial, dan menciptakan lingkungan yang ramah dan inklusif. Dengan suasana yang nyaman dan layanan yang ramah, kantin di PTDI-STTD tidak hanya memenuhi kebutuhan nutrisi, tetapi juga menjadi tempat untuk bersantai dan melepas penat setelah aktivitas belajar dan mengajar. Ini menjadikannya sebagai bagian integral dari pengalaman kampus yang berpusat pada keseimbangan antara akademik, sosial, dan kesejahteraan personal",
		},
		{
			name: "TEMPAT IBADAH",
			description:
				"Masjid di Politeknik Transportasi Darat Indonesia - STTD (PTDI-STTD) merupakan pusat kegiatan keagamaan dan spiritual bagi seluruh komunitas kampus. Didesain sebagai tempat ibadah yang nyaman dan mendukung, masjid ini menjadi titik penting dalam memenuhi kebutuhan spiritual mahasiswa, dosen, dan staf. Terletak di lokasi yang mudah diakses di dalam kampus, masjid ini tidak hanya menyediakan tempat untuk shalat lima waktu, tetapi juga menjadi pusat aktivitas keagamaan seperti ceramah, pengajian, dan kegiatan sosial keagamaan lainnya. Fasilitas masjid di PTDI-STTD mencakup ruang shalat yang luas, fasilitas wudhu yang bersih, serta lingkungan yang tenang dan damai untuk refleksi spiritual. Dengan adanya masjid ini, kampus menghargai dan memfasilitasi praktik keagamaan sebagai bagian dari kehidupan mahasiswa dan staf, mempromosikan nilai-nilai toleransi, penghormatan, dan keragaman di lingkungan pendidikan. Masjid di PTDI-STTD tidak hanya sebagai tempat ibadah, tetapi juga sebagai simbol komitmen kampus dalam memperkuat nilai-nilai keagamaan dan spiritualitas dalam pendidikan tinggi",
		},
	],
	en: [
		{
			name: "HERJAN KENASIN RECTORATE BUILDING",
			description:
				"The Herjan Kenasin Rectorate Building is a key administrative and leadership center at the Indonesian Land Transportation Polytechnic - STTD, Bekasi. This building not only serves as the office for campus leaders but also as a place for various administrative and strategic activities in developing academic and non-academic policies. As an administrative hub, the Herjan Kenasin Rectorate Building provides space for the management team and administrative staff to effectively run the campus. It also hosts important meetings between the leadership, faculty, staff, students, and external stakeholders, ensuring the alignment of campus objectives with its vision and mission in developing human resources in land transportation. It stands as a symbol of the strength and sustainability of PTDI-STTD, driving progress in education and innovation in land transportation.",
		},
		{
			name: "GIRI S. HADIHARDJONO AUDITORIUM",
			description:
				"The Giri S. Hadihardjono Auditorium is a major landmark at the Indonesian Land Transportation Polytechnic - STTD, Bekasi. It serves as a venue for various academic and non-academic events, such as seminars, conferences, public lectures, and cultural activities. With modern facilities and large capacity, the auditorium offers an ideal setting for campus-wide events and community-based activities. It is also used for significant occasions like graduation ceremonies and social gatherings, symbolizing the pride of PTDI-STTD for its contribution to land transportation development in Indonesia.",
		},
		{
			name: "GARUDA HALL",
			description:
				"Garuda Hall is one of the main facilities at the Indonesian Land Transportation Polytechnic - STTD, Bekasi, playing a vital role in supporting academic and non-academic activities. The name 'Garuda' symbolizes national pride and high aspirations. Garuda Hall is often used for public lectures, cultural performances, and large meetings, serving as a space for collaboration and inspiration in land transportation education. It is an important venue for fostering PTDI-STTD’s community spirit and academic growth.",
		},
		{
			name: "ACADEMIC BUILDINGS",
			description:
				"The Academic Buildings at PTDI-STTD, Bekasi, are crucial for supporting academic activities in various land transportation disciplines. These buildings house the study programs for Land Transportation, Road Transport Management, Rail Transport Management, Automotive Engineering Technology, and Applied Masters programs. Each building is equipped with study rooms, faculty offices, laboratories, and classrooms to support teaching and learning activities, fostering collaboration between students, faculty, and staff in developing knowledge and skills in land transportation.",
		},
		{
			name: "LIBRARY",
			description:
				"The library houses a wide range of books across various fields, including science, social studies, and general knowledge. Equipped with a modern management system, the library makes it easy to search for and borrow books. The library also offers access to online journals and e-books, expanding students' access to the latest academic resources in land transportation. It is integrated with the computer and language labs, providing a comprehensive learning environment.",
		},
		{
			name: "SPORTS FACILITIES",
			description:
				"The sports facilities at PTDI-STTD include both indoor and outdoor areas. The indoor sports hall, Sugihardjo Sports Hall, features futsal, badminton, and volleyball courts, as well as a gym and spectator stands. Outdoor facilities include basketball, futsal, tennis, football fields, and an outdoor gym. These facilities support physical well-being and provide opportunities for various sports activities and competitions.",
		},
		{
			name: "DORMITORIES",
			description:
				"PTDI-STTD provides dormitory facilities for students during their studies. The dorms include Maleo, Cendrawasih, Merak, Rajawali, Elang, Executive Dormitory, and Dadali Dormitory. Equipped with bedrooms, bathrooms, and study spaces, the dormitories offer a supportive environment for students to grow personally, academically, and socially.",
		},
		{
			name: "LABORATORIES",
			description:
				"The laboratories at PTDI-STTD are designed with the latest technology and equipment to support practical learning and research in land transportation. Students can apply theoretical knowledge in practical settings, working on innovations in areas such as rail transportation, traffic management, and automotive technology. These labs are essential for preparing students for real-world challenges in the land transportation industry.",
		},
		{
			name: "CLINIC",
			description:
				"The clinic at PTDI-STTD provides medical services to support the health and well-being of students, staff, and the surrounding community. With competent medical staff and modern equipment, the clinic offers basic health services and preventive care, ensuring the campus community can focus on their academic development while feeling secure in terms of their health.",
		},
		{
			name: "WORKSHOP BUILDING",
			description:
				"The workshop building plays a critical role in PTDI-STTD’s practical curriculum, providing a space for students to apply theoretical knowledge in hands-on activities. It supports the development of technical skills necessary for careers in land transportation and serves as a hub for innovation and technological advancements.",
		},
		{
			name: "CANTEEN",
			description:
				"The canteen is a vital facility that supports the daily life and well-being of the entire campus community. It offers a variety of food and drinks, serving as a social space for students, faculty, and staff to interact, relax, and recharge. The canteen contributes to the overall campus experience, promoting a balance between academic and personal well-being.",
		},
		{
			name: "PRAYER FACILITIES",
			description:
				"The mosque at PTDI-STTD serves as a religious and spiritual center for the campus community. It provides a peaceful environment for daily prayers and religious activities, promoting the values of tolerance, respect, and diversity.",
		},
	],
	ja: [
		{
			name: "ヘルジャン・ケナシン学長館",
			description:
				"ヘルジャン・ケナシン学長館は、インドネシア陸上交通ポリテクニック - STTD, Bekasiの重要な行政およびリーダーシップの中心です。この建物は、キャンパスリーダーのオフィスとしてだけでなく、学術および非学術政策の開発におけるさまざまな行政および戦略的活動の場所として機能します。ヘルジャン・ケナシン学長館は、管理チームとスタッフがキャンパスを効果的に運営するためのスペースを提供し、学長と教職員、学生、外部ステークホルダーの間の重要な会議も行われます。",
		},
		{
			name: "ギリ・S・ハディハルジョノ講堂",
			description:
				"ギリ・S・ハディハルジョノ講堂は、インドネシア陸上交通ポリテクニック - STTD, Bekasiの主要なランドマークです。セミナー、会議、公開講義、文化活動など、さまざまな学術および非学術イベントの会場として機能します。モダンな設備と大容量の講堂は、キャンパス全体のイベントやコミュニティベースの活動に理想的な環境を提供します。卒業式やその他の重要なイベントもここで行われます。",
		},
		{
			name: "ガルーダホール",
			description:
				"ガルーダホールは、インドネシア陸上交通ポリテクニック - STTD, Bekasiにおける主要施設の一つであり、学術および非学術活動を支援する重要な役割を果たしています。「ガルーダ」という名前は、国民の誇りと高い目標を象徴しています。ガルーダホールは、公開講義、文化的パフォーマンス、大規模な会議などに使用されており、コラボレーションやインスピレーションを提供する場です。",
		},
		{
			name: "学科棟",
			description:
				"インドネシア陸上交通ポリテクニック - STTD, Bekasiの学科棟は、さまざまな陸上輸送分野での学術活動をサポートする重要な施設です。各棟には、教室、教員のオフィス、実験室などがあり、学習活動を支援するための設備が整っています。",
		},
		{
			name: "図書館",
			description:
				"図書館には、科学、社会学、その他の一般知識に関するさまざまな書籍が収蔵されています。モダンな管理システムにより、書籍の検索や貸し出しが簡単に行えるほか、オンラインジャーナルや電子書籍へのアクセスも提供されており、最新の学術リソースを利用できます。",
		},
		{
			name: "スポーツ施設",
			description:
				"PTDI-STTDのスポーツ施設には、屋内外の運動施設があります。屋内スポーツホール「Sugihardjoスポーツホール」には、フットサル、バドミントン、バレーボールコートがあり、観客席やジムも完備されています。屋外にはバスケットボールコートやサッカー場などもあります。",
		},
		{
			name: "寮",
			description:
				"PTDI-STTDは、在学中の学生のために寮施設を提供しています。Maleo寮、Cendrawasih寮、Merak寮など、さまざまな寮があり、各寮にはベッド、バスルーム、学習スペースが完備されています。",
		},
		{
			name: "実験室",
			description:
				"PTDI-STTDの実験室は、最新技術と設備を備えており、陸上輸送に関連するさまざまな分野での実践学習と研究を支援します。学生は、教室で学んだ理論を実際に適用し、陸上輸送における技術革新を推進することができます。",
		},
		{
			name: "診療所",
			description:
				"PTDI-STTDの診療所は、学生、スタッフ、地域社会の健康と福祉をサポートする重要な施設です。",
		},
		{
			name: "ワークショップビル",
			description:
				"PTDI-STTDのワークショップビルは、実践的なカリキュラムを支える重要な施設であり、学生が理論を実際に応用できる環境を提供しています。",
		},
		{
			name: "食堂",
			description:
				"キャンパスコミュニティの日常生活と福祉を支える重要な施設です。食堂は、さまざまな食事や飲み物を提供し、学生やスタッフがリラックスできる社交の場となっています。",
		},
		{
			name: "礼拝施設",
			description:
				"PTDI-STTDのモスクは、キャンパスコミュニティの宗教的および精神的な中心地であり、学生やスタッフが日々の祈りや宗教活動を行う場所です。",
		},
	],
	ko: [
		{
			name: "헤르잔 케나신 본관",
			description:
				"헤르잔 케나신 본관은 인도네시아 육상 교통 폴리텍 - STTD, 베카시의 주요 행정 및 리더십 센터입니다. 이 건물은 캠퍼스 지도자들의 사무실로 사용될 뿐만 아니라, 학문적 및 비학문적 정책 개발을 위한 다양한 행정 및 전략적 활동의 장소로도 기능합니다. 헤르잔 케나신 본관은 캠퍼스의 관리를 효과적으로 운영할 수 있도록 관리 팀과 행정 직원들에게 공간을 제공하며, 리더와 교수진, 학생, 외부 이해관계자 간의 중요한 회의도 이곳에서 이루어집니다.",
		},
		{
			name: "기리 S. 하디하르조노 강당",
			description:
				"기리 S. 하디하르조노 강당은 인도네시아 육상 교통 폴리텍 - STTD, 베카시의 주요 랜드마크 중 하나입니다. 세미나, 회의, 공개 강의, 문화 활동 등 다양한 학문적 및 비학문적 이벤트의 장소로 사용됩니다. 현대적인 시설과 대규모 수용력을 갖춘 이 강당은 캠퍼스 전체 행사와 커뮤니티 기반 활동에 이상적인 환경을 제공합니다. 졸업식 등 중요한 행사도 이곳에서 열립니다.",
		},
		{
			name: "가루다 홀",
			description:
				"가루다 홀은 인도네시아 육상 교통 폴리텍 - STTD, 베카시의 주요 시설 중 하나로, 학문적 및 비학문적 활동을 지원하는 중요한 역할을 합니다. '가루다'라는 이름은 국가의 자부심과 높은 목표를 상징하며, 가루다 홀은 공개 강의, 문화 공연, 대규모 회의 등에서 사용되며 협력과 영감을 제공하는 장소입니다.",
		},
		{
			name: "학과 건물",
			description:
				"인도네시아 육상 교통 폴리텍 - STTD, 베카시의 학과 건물은 다양한 육상 교통 분야에서 학문적 활동을 지원하는 중요한 시설입니다. 각 건물에는 교실, 교수진 사무실, 실험실 등이 갖춰져 있어 학습 활동을 지원합니다.",
		},
		{
			name: "도서관",
			description:
				"도서관에는 과학, 사회학, 기타 일반 지식에 관한 다양한 책들이 소장되어 있습니다. 현대적인 관리 시스템을 통해 책의 검색과 대출이 용이하며, 온라인 저널 및 전자책에 대한 접근도 제공되어 최신 학술 자료를 이용할 수 있습니다.",
		},
		{
			name: "운동 시설",
			description:
				"PTDI-STTD의 운동 시설에는 실내 및 실외 운동장이 포함되어 있습니다. 실내 스포츠 홀 'Sugihardjo 스포츠 홀'에는 풋살, 배드민턴, 배구 코트가 있으며, 관중석과 체육관도 완비되어 있습니다. 실외에는 농구장, 축구장 등의 시설이 있습니다.",
		},
		{
			name: "기숙사",
			description:
				"PTDI-STTD는 재학 중인 학생들을 위해 기숙사 시설을 제공합니다. Maleo 기숙사, Cendrawasih 기숙사, Merak 기숙사 등 다양한 기숙사가 있으며, 각 기숙사에는 침대, 욕실, 학습 공간이 갖춰져 있습니다.",
		},
		{
			name: "실험실",
			description:
				"PTDI-STTD의 실험실은 최신 기술과 장비를 갖추고 있으며, 육상 교통과 관련된 다양한 분야에서 실습 학습과 연구를 지원합니다. 학생들은 교실에서 배운 이론을 실제로 적용하고 육상 교통의 기술 혁신을 추진할 수 있습니다.",
		},
		{
			name: "클리닉",
			description:
				"PTDI-STTD의 클리닉은 학생, 교직원 및 지역 사회의 건강과 복지를 지원하는 중요한 시설입니다.",
		},
		{
			name: "워크숍 건물",
			description:
				"PTDI-STTD의 워크숍 건물은 실습 교육과정을 지원하는 중요한 시설로, 학생들이 이론을 실제로 응용할 수 있는 환경을 제공합니다.",
		},
		{
			name: "구내식당",
			description:
				"캠퍼스 커뮤니티의 일상생활과 복지를 지원하는 중요한 시설입니다. 구내식당은 다양한 음식과 음료를 제공하며, 학생과 교직원이 편안하게 소통하고 휴식을 취할 수 있는 장소입니다.",
		},
		{
			name: "예배 시설",
			description:
				"PTDI-STTD의 모스크는 캠퍼스 커뮤니티의 종교적 및 영적 중심지로, 학생과 교직원이 일상적인 기도와 종교 활동을 할 수 있는 장소입니다.",
		},
	],
	zh: [
		{
			name: "赫尔扬·科纳辛校长办公楼",
			description:
				"赫尔扬·科纳辛校长办公楼是印尼陆地运输理工学院 - STTD（Bekasi）的一个重要行政和领导中心。这座建筑不仅是校园领导的办公室，还作为制定学术和非学术政策的各种行政和战略活动的场所。赫尔扬·科纳辛校长办公楼为管理团队和行政人员提供了有效管理校园的空间，并且这里也经常举行领导层与教职员工、学生和外部利益相关者之间的重要会议。",
		},
		{
			name: "吉里·S·哈迪哈贾诺礼堂",
			description:
				"吉里·S·哈迪哈贾诺礼堂是印尼陆地运输理工学院 - STTD（Bekasi）的一个主要地标。该礼堂是举办各种学术和非学术活动的场所，如研讨会、会议、公开讲座和文化活动。拥有现代化的设施和较大的容量，这座礼堂为整个校园的大型活动和社区活动提供了理想的场地。毕业典礼等重要活动也在此举行。",
		},
		{
			name: "加鲁达大厅",
			description:
				"加鲁达大厅是印尼陆地运输理工学院 - STTD（Bekasi）的主要设施之一，在支持学术和非学术活动方面发挥着重要作用。'加鲁达'这个名字象征着国家的骄傲和高远的目标。加鲁达大厅经常用于公开讲座、文化演出和大型会议，为陆地运输教育提供合作和灵感的空间。",
		},
		{
			name: "学科楼",
			description:
				"印尼陆地运输理工学院 - STTD（Bekasi）的学科楼是支持陆地运输各学科学术活动的重要设施。每栋大楼都配备了教室、教师办公室和实验室，以支持教学活动。",
		},
		{
			name: "图书馆",
			description:
				"图书馆收藏了科学、社会学和其他一般知识领域的各种书籍。现代化的管理系统使得书籍的搜索和借阅变得更加方便，图书馆还提供在线期刊和电子书的访问权限，使学生可以获得最新的学术资源。",
		},
		{
			name: "体育设施",
			description:
				"PTDI-STTD 的体育设施包括室内和室外运动场。室内体育馆（Sugihardjo 体育馆）设有足球、羽毛球和排球场，配备观众席和健身房。室外设施包括篮球场和足球场等。",
		},
		{
			name: "宿舍",
			description:
				"PTDI-STTD 为在校学生提供宿舍设施。Maleo 宿舍、Cendrawasih 宿舍、Merak 宿舍等多个宿舍都提供床位、浴室和学习空间，支持学生的学习生活。",
		},
		{
			name: "实验室",
			description:
				"PTDI-STTD 的实验室配备了最新的技术和设备，支持陆地运输相关领域的实践学习和研究。学生可以将课堂上学到的理论应用于实际，推动陆地运输技术的创新。",
		},
		{
			name: "诊所",
			description:
				"PTDI-STTD 的诊所为学生、教职工和周边社区提供健康和福祉支持，配备有现代化的医疗设备和专业的医护人员。",
		},
		{
			name: "工作坊大楼",
			description:
				"PTDI-STTD 的工作坊大楼在支持实践课程方面发挥着至关重要的作用，学生可以在这里将理论知识应用于实际操作。",
		},
		{
			name: "食堂",
			description:
				"食堂是支持校园社区日常生活和福祉的重要设施。位于校园的食堂提供各种食品和饮料，是学生和教职工互动、放松的社交空间。",
		},
		{
			name: "礼拜设施",
			description:
				"PTDI-STTD 的清真寺是校园社区的宗教和精神中心，为学生和教职工提供了一个进行日常祷告和宗教活动的地方。",
		},
	],
};

const getFacilities = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// const heroSectionList = [];
		// const imagesSectionList = [];

		// const sectionList = await WebPageSectionMappingService.findByWebPageId(webPageId);

		// for (sectionItem of sectionList) {
		// 	if (sectionItem.hero_section_id !== "" && sectionItem.hero_section_id !== null) {
		// 		let heroSection = await HeroSectionService.findById(sectionItem.hero_section_id);
		// 		if (heroSection) {
		// 			heroSection = await CommonUtils.getImageUrl(heroSection, "/img/sections");
		// 			heroSectionList.push(heroSection);
		// 		}
		// 	} else if (sectionItem.section_images_id !== "" && sectionItem.section_images_id !== null) {
		// 		let imagesSection = await SectionImagesService.findById(sectionItem.section_images_id);
		// 		if (imagesSection) {
		// 			imagesSection = await CommonUtils.getImageUrl(imagesSection, "/img/sections");
		// 			imagesSectionList.push(imagesSection);
		// 		}
		// 	}
		// }

		// res.locals.heroSectionListData = heroSectionList;
		// res.locals.imagesSectionListData = imagesSectionList;

		// const webSectionList = await WebPageService.findMappingById(
		// 	"83279412-a183-11ef-be9c-d5a2ad7b6072"
		// );

		// const groupedData = await WebPageService.groupByIdentifier(webSectionList);

		// // Get Hero Section
		// const heroSectionData = await getHeroSection(groupedData.hero_section[0]);
		// res.locals.heroSectionData = heroSectionData;

		// // Get Accordion Content
		// res.locals.facilitiesContentData = await getAccordionContent(groupedData.accordion_content);

		// // Get Section Content
		// res.locals.facilitiesSectionData = await getSectionContent(groupedData.section_content);

		// // Get Images Section/Gallery
		// const sectionImagesList = groupedData.section_images;

		// const sectionImagesData = [];

		// for (item of sectionImagesList) {
		// 	const sectionImageItem = await SectionImagesService.findById(item.section_images_id);

		// 	let imagesList = await SectionImagesService.findMappingBySectionImagesId(sectionImageItem.id);

		// 	imagesList = imagesList.map((image) => CommonUtils.getImageUrl(image, "/img/facilities"));

		// 	sectionImageItem.imageList = imagesList;

		// 	sectionImageItem.title = sectionImageItem[`title_${selectedLanguage}`];

		// 	sectionImagesData.push(sectionImageItem);
		// }
		// res.locals.sectionImagesData = sectionImagesData;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		let facilitiesImagesList = await FacilitiesImagesService.findAllInView();
		facilitiesImagesList = facilitiesImagesList.map((item) => {
			return {
				imageUrl: `/img/facilities/${item["image_id"]}.${item["mime_type"].split("/")[1]}`,
			};
		});

		res.locals.facilitiesImagesList = facilitiesImagesList;

		let heading = headingPage["id"];
		let content = contentPage["id"];
		let facilitiesList = facilitiesPage["id"];

		if (selectedLanguage === "en") {
			heading = headingPage["en"];
			content = contentPage["en"];
			facilitiesList = facilitiesPage["en"];
		} else if (selectedLanguage === "ja") {
			heading = headingPage["ja"];
			content = contentPage["ja"];
			facilitiesList = facilitiesPage["ja"];
		} else if (selectedLanguage === "ko") {
			heading = headingPage["ko"];
			content = contentPage["ko"];
			facilitiesList = facilitiesPage["ko"];
		} else if (selectedLanguage === "zh") {
			heading = headingPage["zh"];
			content = contentPage["zh"];
			facilitiesList = facilitiesPage["zh"];
		}

		res.locals.heading = heading;
		res.locals.content = content;
		res.locals.facilitiesList = facilitiesList;

		// Render the index page
		return res.render("aboutUs/facilities/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
			currentPage: currentPage[selectedLanguage],
			sectionImage: sectionImage[selectedLanguage],
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

async function getHeroSection(heroSection) {
	// Get Hero Section
	let heroSectionData = await HeroSectionService.findById(heroSection.hero_section_id);

	return await CommonUtils.getImageUrl(heroSectionData, "/img/facilities");
}

async function getAccordionContent(accordionContentList) {
	// Get Accordion Section
	const accordionContentData = [];

	// Use Promise.all to handle all async operations
	const contentPromises = accordionContentList.map(async (accordionContent) => {
		const content = await AccordionContentService.findById(accordionContent.accordion_content_id);
		return content;
	});

	// Wait for all promises to resolve and add results to accordionContentData
	accordionContentData.push(...(await Promise.all(contentPromises)));

	return accordionContentData;
}

async function getSectionContent(sectionContentList) {
	const sectionContentData = [];

	// Use Promise.all to handle all async operations
	const contentPromises = sectionContentList.map(async (sectionContent) => {
		const content = await SectionContentService.findInViewById(sectionContent.section_content_id);
		return content;
	});

	// Wait for all promises to resolve and add results to accordionContentData
	sectionContentData.push(...(await Promise.all(contentPromises)));

	return sectionContentData;
}

function createObjectByLanguage(item, languageCode) {
	// Get the title for the specified language
	const key = item[`title_${languageCode}`];

	// If the key exists, return an object with the language title as the key
	if (key) {
		return { [key]: item };
	}

	// If the title is null or undefined, return null or handle as needed
	return null;
}

module.exports = {
	getFacilities,
};
