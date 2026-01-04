
export const translations = {
  uz: {
    nav_home: "Bosh sahifa",
    nav_about: "Simpozium haqida",
    nav_program: "Dastur",
    nav_tracks: "Sho‘balar",
    nav_speakers: "Ma’ruzachilar",
    nav_logistics: "Logistika",
    nav_archive: "Arxiv",
    nav_cabinet: "Kabinet",
    nav_admin: "Admin",
    nav_register: "Ro'yxatdan o'tish",
    nav_login: "Kirish",
    nav_location: "Manzil",
    nav_heritage_section: "Viloyat va Universitet",
    
    // Registration keys
    reg_roles: ["Ishtirokchi", "Ma'ruzachi", "Tinglovchi"],
    reg_back: "Orqaga",
    reg_title: "Ro'yxatdan o'tish",
    reg_subtitle: "Xalqaro ilmiy hamjamiyatga qo'shiling",
    reg_label_name: "To'liq ism-sharifingiz",
    reg_label_email: "Elektron pochta manzili",
    reg_label_role: "Ishtirok etish turi",
    reg_label_track: "Ilmiy yo'nalish (Sho'ba)",
    reg_btn: "Ro'yxatdan o'tishni yakunlash",

    // Login keys
    login_error: "Email yoki parol noto'g'ri",
    login_title: "Tizimga kirish",
    login_subtitle: "Shaxsiy kabinetingizga xush kelibsiz",
    login_label_email: "Elektron pochta",
    login_label_password: "Parol",
    login_forgot: "Parolni unutdingizmi?",
    login_btn: "Kirish",
    login_no_account: "Hali ro'yxatdan o'tmaganmisiz?",

    speakers_title: "Asosiy Ma'ruzachilar",
    speakers_subtitle: "Jahonning nufuzli ilmiy markazlari va universitetlaridan tashrif buyurgan olimlar",
    speakers_list: [
      { 
        name: "Oybek Abduraimov", 
        title: "Professor, Filologiya fanlari doktori", 
        inst: "Navoiy davlat universiteti rektori",
        isKeynote: true,
        topic: "Alisher Navoiy merosi — yangi O'zbekiston ma'naviy poydevori",
        bio: "Oybek Abduraimov ko'p yillar davomida Navoiy asarlari tahlili va uning sharq falsafasidagi o'rni bo'yicha ilmiy izlanishlar olib boradi. Uning rahbarligida universitetda 'Raqamli navoiyshunoslik' markazi tashkil etilgan bo'lib, u yerda qo'lyozmalarni sun'iy intellekt yordamida tahlil qilish tizimi yo'lga qo'yilgan.",
        interests: ["Navoiyshunoslik", "Matnshunoslik", "Oliy ta'lim menejmenti", "Raqamli gumanitar fanlar"],
        social: { scholar: "#", linkedin: "#", mail: "rector@navoiy-uni.uz" }
      },
      { 
        name: "Selahattin Tolkun", 
        title: "Turkolog olim, Professor", 
        inst: "Ege University (Turkiya)",
        isKeynote: true,
        topic: "Chig'atoy adabiyoti va Navoiy ijodining Anadoludagi ta'siri",
        bio: "Professor Tolkun turkiy tillar va adabiyot tarixi bo'yicha dunyodagi eng nufuzli ekspertlardan biri hisoblanadi. U Navoiy asarlarining turk tiliga o'girilishi va ularning qiyosiy tahlili bo'yicha 50 dan ortiq monografiya va 200 dan ortiq maqolalar muallifidir.",
        interests: ["Turkshunoslik", "Qiyosiy adabiyotshunoslik", "Eski turkiy til", "Lingvistika"],
        social: { scholar: "#", linkedin: "#", mail: "selahattin@ege.edu.tr" }
      }
    ],
    logistics_title: "Logistika va Joylashuv",
    logistics_subtitle: "Simpozium ishtirokchilari uchun qulay infratuzilma va yuqori darajadagi servis",
    logistics_hotels_h: "Premium Mehmonxonalar",
    logistics_dining_h: "Gastronomiya va Restoranlar",
    logistics_transport_h: "Transport va Transfer",
    logistics_hotels: [
      { name: "Zarafshan Grand Hotel", stars: 5, dist: "Simpoziumgacha 1.2 km", price: "$60-120", amenities: ["Free WiFi", "Spa & Sauna", "Pool", "Fine Dining", "Airport VIP Transfer"], desc: "Navoiy shahridagi eng nufuzli va hashamatli mehmonxona.", map: "https://maps.app.goo.gl/..." }
    ],
    logistics_dining: [
      { name: "Navoiy Choyxonasi", type: "Milliy Oshxona", rating: 4.9, specialty: "Navoiy Plovi", desc: "O'zbekistonning eng sara milliy taomlari.", address: "G'alaba shox ko'chasi" }
    ],
    tracks_title: "Ilmiy Sho'balar",
    tracks_subtitle: "Simpoziumning asosiy ilmiy yo'nalishlari va zamonaviy tahlillar",
    tracks_list: [
      { title: "Tasavvuf va ma’naviyat", desc: "Alisher Navoiy asarlaridagi tasavvufiy ramzlar, 'Lisonut-tayr' falsafasi va komil inson masalalari." },
      { title: "Navoiy va turkiy adabiyot", desc: "Turkiy tillar evolyutsiyasi, 'Muhokamatul-lug'atayn' ahamiyati va adabiy merosning qiyosiy tahlili." },
      { title: "Sharq falsafasi va san'ati", desc: "Markaziy Osiyo mutafakkirlarining jahon tamaddunidagi o'rni va Navoiy davri san'atining o'ziga xosligi." },
      { title: "Raqamli navoiyshunoslik", desc: "Navoiy asarlarini raqamlashtirish, korpus lingvistikasi va sun'iy intellekt yordamida matnlarni tahlil qilish." }
    ],
    tourism_title: "Turizm va Sayohat",
    tourism_subtitle: "Navoiy Viloyatining Qadimiy va Zamonaviy Jilosi",
    tourism_monuments: [
      { 
        title: "Qosim Shaykh Majmuasi", 
        period: "XVI asr (1570-1571)", 
        desc: "Karmana shahridagi noyob me'moriy va ma'naviy yodgorlik.",
        long_desc: "Qosim Shayx xonaqohi XVI asrda Abdullaxon II davrida qurilgan bo'lib, Markaziy Osiyo me'morchiligining eng yorqin namunalaridan biri hisoblanadi. Majmua o'z ichiga xonaqoh, daxma va keyinchalik qurilgan masjidni oladi.",
        wiki_data: { 
          type: "Me'moriy majmua", 
          location: "Karmana shahri", 
          status: "Davlat muhofazasida",
          architectural_style: "O'rta Osiyo Islom me'morchiligi",
          UNESCO_status: "Nomzod (Tentative List)"
        },
        gallery: [
          "https://avatars.mds.yandex.net/get-altay/4365309/2a000001785486f1a9ac886622994d06f423/orig"
        ]
      },
      { 
        title: "Raboti Malik Karvonsaroyi", 
        period: "XI asr (1078-1079)", 
        desc: "Buyuk Ipak yo'lidagi eng ulug'vor va noyob karvonsaroy namunasi.",
        long_desc: "Qoraxoniylar davrida barpo etilgan ushbu inshoot 'shohlar roboti' hisoblangan. Uning mahobatli peshtoqi va sardobasi o'rta asrlar muhandislik san'atining yuksak cho'qqisidir.",
        wiki_data: { 
          type: "Karvonsaroy / Istehkom", 
          location: "Navoiy-Buxoro yo'li", 
          status: "UNESCO World Heritage Site",
          architectural_style: "Qoraxoniylar davri",
          UNESCO_status: "Silk Roads: the Routes Network of Chang'an-Tianshan Corridor"
        },
        gallery: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Malik_Sardoba_22.jpg/1200px-Malik_Sardoba_22.jpg"
        ]
      },
      { 
        title: "Sarmishsoy Qoyatosh Rasmlari", 
        period: "Mezolit davridan o'rta asrlargacha", 
        desc: "Ochiq osmon ostidagi eng yirik petrogliflar galereyasi.",
        long_desc: "Sarmishsoy darasida 10 000 dan ortiq qoyatosh rasmlari mavjud bo'lib, ular ibtidoiy insonlarning dunyoqarashi, hayvonot olami va ov jarayonlarini aks ettiradi. Bu yer 'Markaziy Osiyoning qadimiy xotirasi' deb ataladi.",
        wiki_data: { 
          type: "Arxeologik yodgorlik", 
          location: "Nurota tog' tizmasi", 
          status: "UNESCO kutilayotgan ro'yxatda",
          significance: "Antropologik va tarixiy ahamiyat",
          UNESCO_status: "Cultural Landscape Category"
        },
        gallery: [
          "https://xabar.uz/static/crop/1/7/736_736_95_1799738308.jpg"
        ]
      },
      { 
        title: "Chashma Majmuasi (Nurota)", 
        period: "Qadimiy (IX-XX asrlar)", 
        desc: "Muqaddas suv manbai va qadimiy 'Nur' qal'asi atrofidagi ziyoratgoh.",
        long_desc: "Nurota shahridagi ushbu majmua o'zining shifobaxsh suvi va qadimiy masjidi bilan mashhur. Rivoyatlarga ko'ra, qal'a Aleksandr Makedonskiy tomonidan asos solingan 'Nur' istehkomidir.",
        wiki_data: { 
          type: "Ziyoratgoh / Tarixiy majmua", 
          location: "Nurota shahri", 
          status: "Davlat muhofazasida",
          main_features: "Shifobaxsh chashma, Panjvakta masjidi",
          significance: "Markaziy Osiyo Islom markazlaridan biri"
        },
        gallery: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3umVpqsBejwaEmP79WZsevHUPMzzHaIHdEw&s"
        ]
      }
    ],
    past_symposiums: [
      {
        id: "2024",
        year: 2024,
        theme: "Navoiy ijodi — bashariyatning ma'naviy xazinasi",
        description: "2024-yilgi simpozium Navoiy merosini o'rganishda xalqaro ilmiy hamkorlikni yangi bosqichga ko'tarishga bag'ishlandi.",
        stats: { speakers: 120, articles: 85, countries: 15 },
        books: [{ id: "b1", title: "Navoiy merosi 2024", year: 2024 }],
        gallery: ["https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    schedule_data: [
      {
        day: 1,
        date: "14.02.2025",
        events: [
          { time: "10:00", title: "Yalpi majlis: Ochilish marosimi", type: "plenary", location: "Katta anjumanlar zali" }
        ]
      }
    ],
    program_day: "Kun",
    program_subtitle: "Simpoziumning boyitilgan ilmiy va madaniy tadbirlar rejasi",
    region_title: "Navoiy Viloyati: Tarix va Kelajak Chorrahasi",
    region_desc: "O'zbekistonning eng yosh, ammo tarixi ming yilliklarga borib taqaladigan, Hazrat Navoiy nomi bilan atalgan saxovatvi hududi.",
    districts_data: [
      { id: "nav-sh", name: "Navoiy shahri", year: "1958", icon: "🏙️", history: "Hazrat Navoiy nomi bilan atalgan zamonaviy sanoat markazi.", full_info: "Navoiy shahri 1958-yilda tashkil etilgan.", landmarks: ["Alisher Navoiy haykali"], importance: "Viloyatning ma'muriy va madaniy markazi." },
      { id: "zar-sh", name: "Zarafshon shahri", year: "1965", icon: "⛏️", history: "Qizilqum bag'ridagi 'Oltin shahar'.", full_info: "Zarafshon shahri oltin qazib olish sanoati markazi.", landmarks: ["Muruntov koni"], importance: "Oltin qazib olish va metallurgiya." },
      { id: "goz-sh", name: "G'ozg'on shahri", year: "2019", icon: "💎", history: "Marmar va san'at shahri.", full_info: "G'ozg'on marmar konlari bilan mashhur.", landmarks: ["Marmar zavodi"], importance: "Qurilish materiallari." },
      { id: "kar-t", name: "Karmana tumani", year: "Qadimiy", icon: "🕌", history: "Tarixiy ma'naviyat markazi.", full_info: "Karmana viloyatning eng qadimiy hududi.", landmarks: ["Qosim Shayx majmuasi"], importance: "Ziyorat turizmi." },
      { id: "nur-t", name: "Nurota tumani", year: "Qadimiy", icon: "🏔️", history: "Muqaddas 'Chashma' maskani.", full_info: "Nurota shifobaxsh suvi bilan mashhur.", landmarks: ["Chashma ziyoratgohi"], importance: "Turizm." },
      { id: "qiz-t", name: "Qiziltepa tumani", year: "Qadimiy", icon: "🌾", history: "Agrosanoat markazi.", full_info: "Qiziltepa boy qishloq xo'jaligiga ega.", landmarks: ["Toshmasjid"], importance: "Qishloq xo'jaligi." },
      { id: "kon-t", name: "Konimex tumani", year: "1925", icon: "🐫", history: "Etnoturizm maskani.", full_info: "Konimex o'zining etno-ovullari bilan mashhur.", landmarks: ["Etno-ovul"], importance: "Chorvachilik." },
      { id: "tom-t", name: "Tomdi tumani", year: "1925", icon: "🌵", history: "Qizilqum yuragi.", full_info: "Tomdi yaylov chorvachiligi markazi.", landmarks: ["Tomdi buloqlari"], importance: "Konchilik." },
      { id: "uch-t", name: "Uchquduq tumani", year: "1982", icon: "🏗️", history: "Sanoat shahri.", full_info: "Uchquduq strategik sanoat markazi.", landmarks: ["Uchquduq monumenti"], importance: "Sanoat." },
      { id: "xat-t", name: "Xatirchi tumani", year: "1926", icon: "🍇", history: "Bog'dorchilik markazi.", full_info: "Xatirchi mevalari bilan tanilgan.", landmarks: ["Sangijumon"], importance: "Bog'dorchilik." },
      { id: "navb-t", name: "Navbahor tumani", year: "1980", icon: "🚜", history: "Agrosanoat poydevori.", full_info: "Navbahor g'allachilikka ixtisoslashgan.", landmarks: ["Sarmishsoy"], importance: "Agrosanoat." }
    ],
    uni_infographic: {
      title: "Navoiy davlat universitetida 2025-yilda amalga oshirilgan ishlar",
      infrastructure: {
        buildings: 7,
        total_area: "17.7 ga",
        capacity: 7200,
        faculties: 7,
        departments: 28,
        directions: 60,
        specialties: 54,
        specializations: 17
      },
      students: {
        total: 17668,
        full_time: 9466,
        evening: 1974,
        external: 5341,
        distance: 689,
        masters: 194
      },
      faculty: {
        total: 587,
        dsc: 31,
        phd: 267,
        senior_teachers: 171,
        teachers: 262,
        doctoral: 201
      },
      international: {
        foreign_professors: 43,
        trained_abroad: 107,
        foreign_students: 114,
        agreements: 90,
        investments: "2 mln $",
        joint_programs: 2,
        world_ranking: "Top 800 (THE)",
        green_metric: "Top 854"
      },
      social_economic: {
        infrastructure_investment: "5.7 mlrd so'm",
        material_support: "12 mlrd so'm",
        digital_base: "100 dona kompyuter",
        laboratories: "500 mln so'm",
        scholarship_support: "2.3 mlrd so'm",
        events: 1263,
        winners: 112,
        green_energy: "650 kVt"
      },
      scientific_potential: [
        { year: 2023, value: "37%" },
        { year: 2024, value: "38%" },
        { year: 2025, value: "55%" }
      ],
      contracts_money: [
        { year: 2023, value: "124 mln so'm" },
        { year: 2024, value: "370 mln so'm" },
        { year: 2025, value: "2.0 mlrd so'm" }
      ]
    },
    uni_milestones: [
      { year: "1992", event: "Navoiy davlat pedagogika instituti sifatida tashkil etildi.", details: "Mustaqillik yillarida viloyatda malakali kadrlar tayyorlash maqsadida asos solindi." },
      { year: "2024", event: "Navoiy davlat universiteti maqomi berildi.", details: "Prezident qarori bilan universitet keng qamrovli oliy ta'lim muassasasiga aylandi." }
    ],
    uni_stats: { buildings: 7, capacity: "17,000+", dormitories: 4, wifi: "100%", total_students: "17,668" },
    about_quote: "Navoiy merosi — insoniyatning ma'naviy xazinasi bo'lib, u ilm-fan taraqqiyotiga xizmat qiladi.",
    about_goal_title: "Simpoziumning Maqsadi",
    about_goal_desc: "Alisher Navoiy ijodini jahon miqyosida targ'ib qilish va zamonaviy navoiyshunoslikni rivojlantirish.",
    about_card_intl: "Xalqaro hamkorlik",
    about_card_intl_desc: "Dunyo universitetlari bilan aloqalar",
    about_card_quality: "Sifatli ta'lim",
    about_card_quality_desc: "Zamonaviy standartlar asosida",
    about_card_community: "Ilmiy jamoa",
    about_card_community_desc: "Kuchli mutaxassislar birlashmasi",
    about_card_heritage: "Milliy meros",
    about_card_heritage_desc: "Navoiy ijodini asrash",
    about_org_title: "Tashkilotchilar",
    hero_university: "Navoiy davlat universiteti",
    hero_quote: "Ma'naviyat — inson ruhining quvvatidir.",
    hero_cta_register: "Ro'yxatdan o'tish",
    hero_cta_plan: "Dasturni o'rganish",
    hero_date: "14-15 Fevral, 2025",
    hero_location: "Navoiy, O'zbekiston",
    hero_format: "Gibrid",
    hero_tracks: "4 ta Sho'ba",
    venue_title: "Manzilimiz",
    venue_subtitle: "Navoiy davlat universiteti",
    venue_desc: "Simpozium universitetning yangi zamonaviy binosida bo'lib o'tadi.",
    venue_uni_h: "Akademik Muhit",
    venue_uni_p1: "Universitetning zamonaviy o'quv binolari va laboratoriyalari simpozium ishtirokchilari ixtiyorida.",
    venue_uni_p2: "Biz ilmiy izlanishlar uchun barcha zarur sharoitlarni yaratganmiz.",
    venue_city_h: "Navoiy Shahri",
    venue_city_p1: "Navoiy shahri - O'zbekistonning sanoat va madaniyat markazlaridan biri.",
    venue_city_p2: "Shahar o'zining me'moriy yodgorliklari va zamonaviy qiyofasi bilan mashhur.",
    heritage_title: "Navoiy Merosi",
    heritage_subtitle: "Jahon Merosi",
    heritage_p1: "Alisher Navoiy jahon adabiyotining buyuk namoyandasi.",
    heritage_p2: "Uning g'oyalari bugungi kunda ham dolzarb.",
    heritage_p3: "Biz bu merosni asrab qolishimiz kerak.",
    heritage_quote: "Olam ahlidin g'ami yo'q...",
    heritage_author: "Alisher Navoiy",
    footer_text: "Hazrat Navoiy asarlari ma'rifat chirog'idir.",
    footer_rights: "© 2025 Navoiy davlat universiteti.",
    footer_quick_links: "Havolalar",
    footer_resources: "Resurslar",
    footer_location_btn: "Xaritada ko'rish",
    footer_address: "Navoiy shahri, Galaba ko'chasi, 176.",
    archive_title: "Ilmiy Arxiv",
    archive_subtitle: "O'tgan yillar materiallari"
  }
};
