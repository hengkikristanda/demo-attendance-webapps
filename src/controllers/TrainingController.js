const CommonComponentServices = require("../services/CommonsComponentServices");
const AlumniService = require("../services/AlumniService");
const LecturerService = require("../services/Lecturer/LecturerService");
const NewsService = require("../services/NewsService");
const CommonUtils = require("../utils/CommonUtils");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "e69a143c-9cda-11ef-b867-9e406641108e";
const currentPage = {
	id: "Diklat",
	en: "Education and Training",
	ja: "教育と訓練",
	ko: "教育と訓練",
	zh: "教育与培训",
};

const EN = [
	{
		title: "TECHNICAL TRAINING ON ANDALALIN DOCUMENT PREPARATION",
		content: "Able to prepare Traffic Impact Analysis Documents.",
	},
	{
		title: "TECHNICAL TRAINING ON ANDALALIN DOCUMENT ASSESSMENT",
		content: "Able to assess Traffic Impact Analysis Documents.",
	},
	{
		title: "TECHNICAL TRAINING ON APILL MANAGEMENT",
		content: "Able to configure APILL and Traffic Data.",
	},
	{
		title: "TECHNICAL TRAINING ON TRAFFIC SURVEY MANAGEMENT",
		content: "Able to collect and process Traffic Data.",
	},
	{
		title: "TECHNICAL TRAINING ON PASSENGER TERMINAL MANAGEMENT",
		content: "Able to manage Passenger Transport Terminals.",
	},
	{
		title: "TECHNICAL TRAINING ON UPPKB OPERATIONAL MANAGEMENT",
		content: "Able to weigh and analyze vehicle weighing results.",
	},
	{
		title: "TECHNICAL TRAINING ON ROAD MARKINGS",
		content: "Able to apply road markings.",
	},
	{
		title: "TECHNICAL TRAINING ON TRAFFIC SIGNS",
		content: "Able to plan and create traffic signs.",
	},
	{
		title: "TECHNICAL TRAINING ON PUBLIC TRANSPORT DRIVING",
		content: "Able to drive and handle passengers in public transport.",
	},
	{
		title: "TECHNICAL TRAINING ON PUBLIC TRANSPORT MANAGEMENT",
		content: "Able to manage public transport operations and business.",
	},
	{
		title: "TECHNICAL TRAINING ON PPNS 200 JP SCHEME (FOR STRUCTURAL OFFICIALS)",
		content: "Able to investigate Traffic Violations.",
	},
	{
		title: "TECHNICAL TRAINING ON PPNS 400 JP SCHEME (FOR STAFF)",
		content: "Able to investigate Traffic Violations.",
	},
	{
		title: "TECHNICAL TRAINING FOR TRANSPORTATION DEPARTMENT HEADS",
		content: "Able to formulate transportation sector policies.",
	},
	{
		title: "TECHNICAL TRAINING FOR GROUND TRANSPORTATION DIVISION HEADS",
		content: "Able to formulate policies in the field of ground transportation.",
	},
	{
		title: "TECHNICAL TRAINING ON LLAJ ORIENTATION",
		content: "Able to understand the main tasks and functions in the field of LLAJ.",
	},
	{
		title: "TECHNICAL TRAINING ON BASIC VEHICLE TESTING (PKB)",
		content:
			"Able to manage PKB administration and pre-inspections, and able to conduct physical and visual vehicle testing.",
	},
	{
		title: "TECHNICAL TRAINING ON LLAJ SUPERVISION AND CONTROL",
		content: "Able to regulate and control LLAJ.",
	},
	{
		title: "TECHNICAL TRAINING ON RAILWAY TRACK AND BUILDINGS",
		content:
			"Understanding regulations and technical specifications for railway tracks and buildings.",
	},
	{
		title: "TECHNICAL TRAINING ON RAILWAY OPERATION FACILITIES",
		content:
			"Understanding regulations and technical specifications for railway operation facilities.",
	},
	{
		title: "TECHNICAL TRAINING ON NON-ELECTRIC RAILWAY VEHICLES",
		content:
			"Understanding regulations and technical specifications for non-electric railway vehicles.",
	},
	{
		title: "TECHNICAL TRAINING ON FIRST RAILWAY TRACK AND BUILDING INSPECTION",
		content: "Understanding the procedures for testing railway tracks and buildings.",
	},
	{
		title: "TECHNICAL TRAINING ON FIRST RAILWAY OPERATION FACILITY INSPECTION",
		content:
			"Understanding the procedures for testing railway operation facilities and technical specifications.",
	},
	{
		title: "TECHNICAL TRAINING ON FIRST NON-ELECTRIC RAILWAY VEHICLE INSPECTION",
		content:
			"Able to explain and apply the procedures for testing non-electric railway vehicles and plan the testing activities.",
	},
	{
		title: "TECHNICAL TRAINING ON RAILWAY LEVEL CROSSING ATTENDANTS",
		content:
			"Understanding how to operate equipment at railway level crossings and manage road traffic flow.",
	},
	{
		title: "TECHNICAL TRAINING ON REFRESHER COURSE FOR RAILWAY ENGINEERS",
		content:
			"Able to explain and apply railway regulations and identify infrastructure, vehicles, and railway operations.",
	},
	{
		title: "TECHNICAL TRAINING ON RAILWAY ORIENTATION",
		content:
			"Able to explain and apply railway regulations and identify infrastructure, vehicles, and railway operations.",
	},
	{
		title: "SPECIAL TRAINING (based on STAKEHOLDER needs)",
		content:
			"Special training for professional drivers, vehicle inspectors, road and transport officials, traffic supervision and control, and other technical trainings required by stakeholders.",
	},
];

const ID = [
	{
		title: "PELATIHAN TEKNIS PENYUSUNAN DOKUMEN ANDALALIN",
		content: "Mampu menyusun Dokumen Analisis Dampak Lalu Lintas.",
	},
	{
		title: "PELATIHAN TEKNIS PENILAIAN DOKUMEN ANDALALIN",
		content: "Mampu menilai Dokumen Analisis Dampak Lalu Lintas.",
	},
	{
		title: "PELATIHAN TEKNIS MANAJEMEN APILL",
		content: "Mampu mengonfigurasi APILL dan Data Lalu Lintas.",
	},
	{
		title: "PELATIHAN TEKNIS MANAJEMEN SURVEI LALU LINTAS",
		content: "Mampu mengumpulkan dan memproses Data Lalu Lintas.",
	},
	{
		title: "PELATIHAN TEKNIS MANAJEMEN TERMINAL PENUMPANG",
		content: "Mampu mengelola Terminal Transportasi Penumpang.",
	},
	{
		title: "PELATIHAN TEKNIS MANAJEMEN OPERASIONAL UPPKB",
		content: "Mampu menimbang dan menganalisis hasil penimbangan kendaraan.",
	},
	{
		title: "PELATIHAN TEKNIS MARKA JALAN",
		content: "Mampu mengaplikasikan marka jalan.",
	},
	{
		title: "PELATIHAN TEKNIS RAMBU LALU LINTAS",
		content: "Mampu merencanakan dan membuat rambu lalu lintas.",
	},
	{
		title: "PELATIHAN TEKNIS MENGEMUDI TRANSPORTASI UMUM",
		content: "Mampu mengemudikan dan menangani penumpang dalam transportasi umum.",
	},
	{
		title: "PELATIHAN TEKNIS MANAJEMEN TRANSPORTASI UMUM",
		content: "Mampu mengelola operasi dan bisnis transportasi umum.",
	},
	{
		title: "PELATIHAN TEKNIS PPNS SKEMA 200 JP (UNTUK PEJABAT STRUKTURAL)",
		content: "Mampu menyelidiki Pelanggaran Lalu Lintas.",
	},
	{
		title: "PELATIHAN TEKNIS PPNS SKEMA 400 JP (UNTUK STAF)",
		content: "Mampu menyelidiki Pelanggaran Lalu Lintas.",
	},
	{
		title: "PELATIHAN TEKNIS UNTUK KEPALA DINAS PERHUBUNGAN",
		content: "Mampu merumuskan kebijakan sektor transportasi.",
	},
	{
		title: "PELATIHAN TEKNIS UNTUK KEPALA BIDANG TRANSPORTASI DARAT",
		content: "Mampu merumuskan kebijakan di bidang transportasi darat.",
	},
	{
		title: "PELATIHAN TEKNIS ORIENTASI LLAJ",
		content: "Mampu memahami tugas pokok dan fungsi di bidang LLAJ.",
	},
	{
		title: "PELATIHAN TEKNIS PENGUJIAN KENDARAAN DASAR (PKB)",
		content:
			"Mampu mengelola administrasi PKB, inspeksi awal, dan melakukan pengujian fisik serta visual kendaraan.",
	},
	{
		title: "PELATIHAN TEKNIS PENGAWASAN DAN PENGENDALIAN LLAJ",
		content: "Mampu mengatur dan mengendalikan LLAJ.",
	},
	{
		title: "PELATIHAN TEKNIS JALUR DAN BANGUNAN KERETA API",
		content: "Memahami peraturan dan spesifikasi teknis jalur dan bangunan kereta api.",
	},
	{
		title: "PELATIHAN TEKNIS FASILITAS OPERASI KERETA API",
		content: "Memahami peraturan dan spesifikasi teknis fasilitas operasi kereta api.",
	},
	{
		title: "PELATIHAN TEKNIS KENDARAAN REL NON LISTRIK",
		content: "Memahami peraturan dan spesifikasi teknis kendaraan rel non listrik.",
	},
	{
		title: "PELATIHAN TEKNIS PENGUJIAN AWAL JALUR DAN BANGUNAN KERETA API",
		content: "Memahami prosedur pengujian jalur dan bangunan kereta api.",
	},
	{
		title: "PELATIHAN TEKNIS PENGUJIAN AWAL FASILITAS OPERASI KERETA API",
		content: "Memahami prosedur pengujian fasilitas operasi kereta api dan spesifikasi teknis.",
	},
	{
		title: "PELATIHAN TEKNIS PENGUJIAN AWAL KENDARAAN REL NON LISTRIK",
		content:
			"Mampu menjelaskan dan mengaplikasikan prosedur pengujian kendaraan rel non listrik serta merencanakan kegiatan pengujian.",
	},
	{
		title: "PELATIHAN TEKNIS UNTUK PENJAGA PERLINTASAN KERETA API",
		content:
			"Memahami cara mengoperasikan peralatan di perlintasan kereta api dan mengatur arus lalu lintas jalan.",
	},
	{
		title: "PELATIHAN TEKNIS REFRESHER UNTUK INSINYUR KERETA API",
		content:
			"Mampu menjelaskan dan mengaplikasikan peraturan kereta api serta mengidentifikasi infrastruktur, kendaraan, dan operasi kereta api.",
	},
	{
		title: "PELATIHAN TEKNIS ORIENTASI KERETA API",
		content:
			"Mampu menjelaskan dan mengaplikasikan peraturan kereta api serta mengidentifikasi infrastruktur, kendaraan, dan operasi kereta api.",
	},
	{
		title: "PELATIHAN KHUSUS (berdasarkan kebutuhan PEMANGKU KEPENTINGAN)",
		content:
			"Pelatihan khusus untuk pengemudi profesional, pemeriksa kendaraan, pejabat jalan dan transportasi, pengawasan dan pengendalian lalu lintas, serta pelatihan teknis lainnya yang diperlukan oleh pemangku kepentingan.",
	},
];

const KO = [
	{
		title: "ANDALALIN 문서 준비에 대한 기술 교육",
		content: "교통 영향 분석 문서를 작성할 수 있습니다.",
	},
	{
		title: "ANDALALIN 문서 평가에 대한 기술 교육",
		content: "교통 영향 분석 문서를 평가할 수 있습니다.",
	},
	{
		title: "APILL 관리에 대한 기술 교육",
		content: "APILL 및 교통 데이터를 구성할 수 있습니다.",
	},
	{
		title: "교통 조사 관리에 대한 기술 교육",
		content: "교통 데이터를 수집하고 처리할 수 있습니다.",
	},
	{
		title: "여객 터미널 관리에 대한 기술 교육",
		content: "여객 운송 터미널을 관리할 수 있습니다.",
	},
	{
		title: "UPPKB 운영 관리에 대한 기술 교육",
		content: "차량 중량 측정 결과를 측정하고 분석할 수 있습니다.",
	},
	{
		title: "도로 표시 적용에 대한 기술 교육",
		content: "도로 표시를 적용할 수 있습니다.",
	},
	{
		title: "교통 표지에 대한 기술 교육",
		content: "교통 표지를 계획하고 만들 수 있습니다.",
	},
	{
		title: "대중교통 운전에 대한 기술 교육",
		content: "대중교통에서 운전하고 승객을 처리할 수 있습니다.",
	},
	{
		title: "대중교통 관리에 대한 기술 교육",
		content: "대중교통 운영 및 비즈니스를 관리할 수 있습니다.",
	},
	{
		title: "PPNS 200 JP 제도 (구조적 공무원 대상)에 대한 기술 교육",
		content: "교통 위반을 조사할 수 있습니다.",
	},
	{
		title: "PPNS 400 JP 제도 (직원 대상)에 대한 기술 교육",
		content: "교통 위반을 조사할 수 있습니다.",
	},
	{
		title: "교통부 장관을 위한 기술 교육",
		content: "교통 부문 정책을 수립할 수 있습니다.",
	},
	{
		title: "육상교통부 책임자를 위한 기술 교육",
		content: "육상교통 분야의 정책을 수립할 수 있습니다.",
	},
	{
		title: "LLAJ 지향에 대한 기술 교육",
		content: "LLAJ 분야의 주요 임무와 기능을 이해할 수 있습니다.",
	},
	{
		title: "기초 차량 검사 (PKB)에 대한 기술 교육",
		content: "PKB 행정 및 사전 점검을 관리하고 물리적, 시각적 차량 검사를 수행할 수 있습니다.",
	},
	{
		title: "LLAJ 감독 및 제어에 대한 기술 교육",
		content: "LLAJ를 규제하고 제어할 수 있습니다.",
	},
	{
		title: "철도 선로 및 건물에 대한 기술 교육",
		content: "철도 선로 및 건물에 대한 규정과 기술 사양을 이해합니다.",
	},
	{
		title: "철도 운영 시설에 대한 기술 교육",
		content: "철도 운영 시설에 대한 규정과 기술 사양을 이해합니다.",
	},
	{
		title: "비전기 철도 차량에 대한 기술 교육",
		content: "비전기 철도 차량에 대한 규정과 기술 사양을 이해합니다.",
	},
	{
		title: "첫 철도 선로 및 건물 검사에 대한 기술 교육",
		content: "철도 선로 및 건물 검사 절차를 이해합니다.",
	},
	{
		title: "첫 철도 운영 시설 검사에 대한 기술 교육",
		content: "철도 운영 시설 및 기술 사양의 검사 절차를 이해합니다.",
	},
	{
		title: "첫 비전기 철도 차량 검사에 대한 기술 교육",
		content: "비전기 철도 차량 검사 절차를 설명하고 적용하며 검사 활동을 계획할 수 있습니다.",
	},
	{
		title: "철도 건널목 직원에 대한 기술 교육",
		content: "철도 건널목 장비를 작동하고 도로 교통 흐름을 관리하는 방법을 이해합니다.",
	},
	{
		title: "철도 기술자 리프레셔 코스에 대한 기술 교육",
		content: "철도 규정을 설명하고 적용하며 인프라, 차량 및 철도 운영을 식별할 수 있습니다.",
	},
	{
		title: "철도 지향에 대한 기술 교육",
		content: "철도 규정을 설명하고 적용하며 인프라, 차량 및 철도 운영을 식별할 수 있습니다.",
	},
	{
		title: "특별 교육 (이해관계자의 필요에 따라)",
		content:
			"전문 운전자, 차량 검사관, 도로 및 운송 공무원, 교통 감독 및 제어 및 이해관계자가 필요로 하는 기타 기술 교육을 위한 특별 교육.",
	},
];

const JA = [
	{
		title: "ANDALALIN ドキュメント作成に関する技術研修",
		content: "交通影響分析ドキュメントを作成できる。",
	},
	{
		title: "ANDALALIN ドキュメント評価に関する技術研修",
		content: "交通影響分析ドキュメントを評価できる。",
	},
	{
		title: "APILL 管理に関する技術研修",
		content: "APILL と交通データを設定できる。",
	},
	{
		title: "交通調査管理に関する技術研修",
		content: "交通データを収集し処理できる。",
	},
	{
		title: "旅客ターミナル管理に関する技術研修",
		content: "旅客輸送ターミナルを管理できる。",
	},
	{
		title: "UPPKB 運用管理に関する技術研修",
		content: "車両の計量結果を測定し分析できる。",
	},
	{
		title: "道路標示に関する技術研修",
		content: "道路標示を適用できる。",
	},
	{
		title: "交通標識に関する技術研修",
		content: "交通標識を計画し作成できる。",
	},
	{
		title: "公共交通運転に関する技術研修",
		content: "公共交通で運転し、乗客を対応できる。",
	},
	{
		title: "公共交通管理に関する技術研修",
		content: "公共交通の運営と事業を管理できる。",
	},
	{
		title: "PPNS 200 JP スキーム（管理職向け）に関する技術研修",
		content: "交通違反を調査できる。",
	},
	{
		title: "PPNS 400 JP スキーム（職員向け）に関する技術研修",
		content: "交通違反を調査できる。",
	},
	{
		title: "交通部長向け技術研修",
		content: "交通分野の政策を策定できる。",
	},
	{
		title: "陸上交通部門長向け技術研修",
		content: "陸上交通分野での政策を策定できる。",
	},
	{
		title: "LLAJ オリエンテーションに関する技術研修",
		content: "LLAJ 分野の主要な任務と機能を理解できる。",
	},
	{
		title: "基本車両検査（PKB）に関する技術研修",
		content: "PKB 管理、事前検査、物理的および視覚的な車両検査を行うことができる。",
	},
	{
		title: "LLAJ 監視と制御に関する技術研修",
		content: "LLAJ を規制し制御できる。",
	},
	{
		title: "鉄道線路および建物に関する技術研修",
		content: "鉄道線路および建物に関する規則と技術仕様を理解できる。",
	},
	{
		title: "鉄道運行施設に関する技術研修",
		content: "鉄道運行施設に関する規則と技術仕様を理解できる。",
	},
	{
		title: "非電気鉄道車両に関する技術研修",
		content: "非電気鉄道車両に関する規則と技術仕様を理解できる。",
	},
	{
		title: "初回鉄道線路および建物検査に関する技術研修",
		content: "鉄道線路および建物の検査手順を理解できる。",
	},
	{
		title: "初回鉄道運行施設検査に関する技術研修",
		content: "鉄道運行施設および技術仕様の検査手順を理解できる。",
	},
	{
		title: "初回非電気鉄道車両検査に関する技術研修",
		content: "非電気鉄道車両の検査手順を説明し適用し、検査活動を計画できる。",
	},
	{
		title: "鉄道踏切係員向け技術研修",
		content: "鉄道踏切設備の操作方法を理解し、道路交通の流れを管理できる。",
	},
	{
		title: "鉄道技術者リフレッシュコースに関する技術研修",
		content: "鉄道規則を説明し適用し、インフラ、車両、鉄道運行を識別できる。",
	},
	{
		title: "鉄道オリエンテーションに関する技術研修",
		content: "鉄道規則を説明し適用し、インフラ、車両、鉄道運行を識別できる。",
	},
	{
		title: "特別研修（ステークホルダーのニーズに基づく）",
		content:
			"プロフェッショナルドライバー、車両検査官、道路および交通担当官、交通監視および制御、その他ステークホルダーが必要とする技術研修のための特別研修。",
	},
];

const ZH = [
	{
		title: "ANDALALIN 文件编制技术培训",
		content: "能够编制交通影响分析文件。",
	},
	{
		title: "ANDALALIN 文件评估技术培训",
		content: "能够评估交通影响分析文件。",
	},
	{
		title: "APILL 管理技术培训",
		content: "能够配置 APILL 和交通数据。",
	},
	{
		title: "交通调查管理技术培训",
		content: "能够收集和处理交通数据。",
	},
	{
		title: "客运站管理技术培训",
		content: "能够管理客运交通站点。",
	},
	{
		title: "UPPKB 运营管理技术培训",
		content: "能够称量并分析车辆称重结果。",
	},
	{
		title: "道路标线技术培训",
		content: "能够应用道路标线。",
	},
	{
		title: "交通标志技术培训",
		content: "能够规划和制作交通标志。",
	},
	{
		title: "公共交通驾驶技术培训",
		content: "能够驾驶公共交通工具并处理乘客事务。",
	},
	{
		title: "公共交通管理技术培训",
		content: "能够管理公共交通运营和业务。",
	},
	{
		title: "PPNS 200 JP 方案（面向结构官员）技术培训",
		content: "能够调查交通违法行为。",
	},
	{
		title: "PPNS 400 JP 方案（面向职员）技术培训",
		content: "能够调查交通违法行为。",
	},
	{
		title: "交通部门负责人技术培训",
		content: "能够制定交通领域政策。",
	},
	{
		title: "地面交通部门负责人技术培训",
		content: "能够制定地面交通领域政策。",
	},
	{
		title: "LLAJ 导向技术培训",
		content: "能够理解 LLAJ 领域的主要任务和功能。",
	},
	{
		title: "基础车辆测试 (PKB) 技术培训",
		content: "能够管理 PKB 行政、预检，并进行车辆的物理和视觉测试。",
	},
	{
		title: "LLAJ 监督和控制技术培训",
		content: "能够规范和控制 LLAJ。",
	},
	{
		title: "铁路轨道和建筑技术培训",
		content: "理解铁路轨道和建筑的法规和技术规范。",
	},
	{
		title: "铁路运行设施技术培训",
		content: "理解铁路运行设施的法规和技术规范。",
	},
	{
		title: "非电力铁路车辆技术培训",
		content: "理解非电力铁路车辆的法规和技术规范。",
	},
	{
		title: "铁路轨道和建筑首次检测技术培训",
		content: "理解铁路轨道和建筑的检测程序。",
	},
	{
		title: "铁路运行设施首次检测技术培训",
		content: "理解铁路运行设施的检测程序和技术规范。",
	},
	{
		title: "非电力铁路车辆首次检测技术培训",
		content: "能够解释和应用非电力铁路车辆的检测程序，并规划检测活动。",
	},
	{
		title: "铁路道口工作人员技术培训",
		content: "理解如何操作铁路道口设备并管理道路交通流量。",
	},
	{
		title: "铁路工程师复习课程技术培训",
		content: "能够解释和应用铁路法规，并识别基础设施、车辆和铁路运营。",
	},
	{
		title: "铁路导向技术培训",
		content: "能够解释和应用铁路法规，并识别基础设施、车辆和铁路运营。",
	},
	{
		title: "特别培训（根据利益相关方需求）",
		content:
			"为专业驾驶员、车辆检查员、道路和交通官员、交通监督与控制以及其他利益相关方所需的技术培训提供特别培训。",
	},
];

const CTA_BUTTON_LABEL = {
	en: "Registration Information",
	id: "Informasi Pendaftaran",
	ja: "登録情報",
	ko: "등록 정보",
	zh: "注册信息",
};

const getTraining = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		const trainingTranslation = await CommonComponentServices.getTrainingSection(req);

		res.locals.trainingTranslation = trainingTranslation;

		let trainingCategoryTranslation = ID;

		if (selectedLanguage === "en") {
			trainingCategoryTranslation = EN;
		} else if (selectedLanguage === "ko") {
			trainingCategoryTranslation = KO;
		} else if (selectedLanguage === "ja") {
			trainingCategoryTranslation = JA;
		} else if (selectedLanguage === "zh") {
			trainingCategoryTranslation = ZH;
		}

		res.locals.trainingCategoryTranslation = trainingCategoryTranslation;
		res.locals.ctaButtonLabel = CTA_BUTTON_LABEL[selectedLanguage];

		// Render the index page
		return res.render("academics/training/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			currentPage: currentPage[selectedLanguage],
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

const getTrainingRegistration = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		const trainingTranslation = await CommonComponentServices.getTrainingSection(req);

		res.locals.trainingTranslation = trainingTranslation;

		let trainingCategoryTranslation = ID;

		if (selectedLanguage === "en") {
			trainingCategoryTranslation = EN;
		} else if (selectedLanguage === "ko") {
			trainingCategoryTranslation = KO;
		} else if (selectedLanguage === "ja") {
			trainingCategoryTranslation = JA;
		} else if (selectedLanguage === "zh") {
			trainingCategoryTranslation = ZH;
		}

		res.locals.trainingCategoryTranslation = trainingCategoryTranslation;
		res.locals.ctaButtonLabel = CTA_BUTTON_LABEL[selectedLanguage];

		// Render the index page
		return res.render("academics/training/registration/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			currentPage: currentPage[selectedLanguage],
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getTraining,
	getTrainingRegistration,
};
