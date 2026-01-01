
export const translations = {
  uz: {
    nav_home: "Bosh sahifa",
    nav_about: "Simpozium haqida",
    nav_tracks: "Sho‘balar",
    nav_speakers: "Ma’ruzachilar",
    nav_logistics: "Logistika",
    nav_archive: "Arxiv",
    nav_cabinet: "Kabinet",
    nav_register: "Ishtirok etish",
    nav_location: "Manzil",

    archive_title: "Ilmiy Meros Arxivi",
    archive_subtitle: "Simpoziumlar xronologiyasi: O'tmishdan kelajakka ma'rifat ko'priklari",
    archive_view_details: "Tafsilotlarni ko'rish",
    archive_books_title: "Chop etilgan ilmiy asarlar",
    archive_tracks_title: "Ilmiy sho'balar va yo'nalishlar",
    archive_stats_speakers: "Ma'ruzachilar",
    archive_stats_articles: "Maqolalar",
    archive_stats_countries: "Davlatlar",
    archive_download_proceedings: "Yuklab olish",
    archive_outcomes_title: "Ilmiy rezolyutsiya va natijalar",
    archive_gallery_title: "Simpozium lahzalari",

    past_symposiums: [
      {
        id: "2024-1",
        year: 2024,
        theme: "“Alisher Navoiy va Sharq renessansi” IV xalqaro simpoziumi",
        description: "Hazrat Alisher Navoiy tavalludining 583 yilligiga bag'ishlangan ushbu yirik ilmiy anjuman doirasida Navoiy ijodining falsafiy va badiiy qirralari Sharq renessansi kontekstida chuqur tahlil qilindi.",
        stats: { speakers: 145, articles: 520, countries: 25 },
        outcomes: [
          "Navoiy asarlarining yangi akademik nashri tamoyillari ishlab chiqildi",
          "Sharq renessansi va Temuriylar davri madaniyatiga doir xalqaro memorandum imzolandi",
          "Yosh olimlar uchun maxsus ilmiy grantlar dasturi e'lon qilindi"
        ],
        tracks: [
          { title: "Navoiy va umuminsoniy qadriyatlar", count: 75, details: "Navoiy asarlaridagi gumanizm va adolat g'oyalari." },
          { title: "Matnshunoslik va manbashunoslik", count: 48, details: "Qo'lyozmalarni qiyosiy o'rganish metodikasi." }
        ],
        books: [
          { id: "b1-1", title: "Sharq Renessansi va Navoiy - I Jild", isbn: "978-9943-12-000-1", editors: "Akad. Sh. Rahmonov", year: 2024, pages: 580 }
        ],
        gallery: [
          "https://picsum.photos/seed/nav1/800/600",
          "https://picsum.photos/seed/nav2/800/600"
        ]
      },
      {
        id: "2024-2",
        year: 2024,
        theme: "“Alisher Navoiy va Sharq renessansi” IV xalqaro simpoziumi",
        description: "Simpoziumning ikkinchi bosqichida asosiy e'tibor Navoiy merosini raqamlashtirish va uni jahon tillariga tarjima qilish muammolariga qaratildi.",
        stats: { speakers: 110, articles: 430, countries: 21 },
        outcomes: [
          "Navoiy asarlarining ko'p tilli raqamli platformasi (Digital Navoi) ishga tushirildi",
          "Xalqaro tarjimonlar gildiyasi bilan hamkorlik o'rnatildi",
          "Simpoziumning ilmiy rezolyutsiyasi tasdiqlandi"
        ],
        tracks: [
          { title: "Raqamli gumanitar fanlar", count: 62, details: "Navoiy qo'lyozmalarini AI yordamida o'qish." },
          { title: "Tarjimashunoslik masalalari", count: 45, details: "Navoiy g'azallarini ingliz va fransuz tillariga tarjima qilish muammolari." }
        ],
        books: [
          { id: "b2-2", title: "Navoiy Merosi: Tarjima va Talqinlar", isbn: "978-9943-12-000-2", editors: "Dr. Z. Turkiy", year: 2024, pages: 420 }
        ],
        gallery: [
          "https://picsum.photos/seed/nav3/800/600",
          "https://picsum.photos/seed/nav4/800/600"
        ]
      }
    ],

    hero_university: "Navoiy Davlat Universiteti — Ilm-u Ma’rifat Markazi",
    hero_quote: "\"Fidoyi elga bo'lur xalqaro e'tibor har dam, Navoiy nomi birlan mashhur bo'ldi butun olam.\"",
    hero_cta_register: "Ro‘yxatdan O‘tish",
    hero_cta_plan: "Simpozium Rejasi",
    hero_date: "9-11 Fevral",
    hero_location: "Navoiy, NDU",
    hero_format: "Gibrid",
    hero_tracks: "4 Sho‘ba",
    heritage_title: "Sultoni Salotini Nazm:",
    heritage_subtitle: "Hazrat Navoiy Merosi",
    heritage_p1: "Alisher Navoiy nafaqat buyuk shoir, balki turkiy dunyoning ma'naviy me'moridir.",
    heritage_p2: "Uning \"Muhokamatul-lug'atayn\" asari turkiy tilning naqadar boy va qudratli ekanligini butun jahonga isbotlab berdi.",
    heritage_p3: "Bugungi simpozium — bu buyuk dahoning falsafiy qarashlarini XXI asr tafakkuri bilan uyg'unlashtirish uchun bir chorlovdir.",
    heritage_quote: "\"G'urbatda g'arib shodmon bo'lmas emish...\"",
    heritage_author: "— Navoiy ruboiylaridan",
    venue_title: "Navoiy Shahri va",
    venue_subtitle: "Mezbon Universitet Merosi",
    venue_desc: "\"Navoiy — bu shunchaki shahar emas, bu buyuk g'oyalarning moddiylashgan timsolidir.\"",
    venue_uni_h: "Alisher Navoiy Nomidagi Navoiy Davlat Universiteti",
    venue_uni_p1: "Navoiy davlat universiteti 1992-yilda tashkil etilgan bo'lib, o'sha paytdanoq buyuk mutafakkir nomini munosib ulug'lab kelmoqda.",
    venue_uni_p2: "Aynan ushbu universitet \"Navoiyshunoslik\" ilmiy-tadqiqot markazi bilan faxrlanadi.",
    venue_city_h: "Navoiy — Uyg'onish va Taraqqiyot Shahri",
    venue_city_p1: "Navoiy shahri — O'zbekistonning zamonaviy ramzlaridan biri. Shahar 1958-yilda barpo etilgan.",
    venue_city_p2: "Shaharning markaziy qismida joylashgan \"Alisher Navoiy bog'i\" o'zining ko'rkamligi bilan ishtirokchilarni mahliyo qiladi.",
    tourism_title: "Navoiy Viloyati",
    tourism_subtitle: "Tarixiy Obidalari",
    tourism_monuments: [
      { title: "Qosim Shaykh Majmuasi", period: "XVI-XIX asrlar", desc: "Navoiy viloyatining Karmana shahridagi eng muhim arxitektura yodgorliklaridan biri." },
      { title: "Raboti Malik Karvonsaroyi", period: "XI asr", desc: "Qadimiy Ipak yo'lidagi eng mashhur karvonsaroylardan biri." },
      { title: "Sarmishsoy Qoyatoshlari", period: "Paleolit davri", desc: "5000 dan ortiq qadimiy petrogliflar saqlanib qolgan ochiq osmon ostidagi muzey." },
      { title: "NurOta chashmasi", period: "Antik davr", desc: "Muqaddas chashma va uning atrofidagi me'moriy majmua." }
    ],
    tracks_title: "Simpozium Sho‘balari",
    tracks_subtitle: "Konferensiyaning asosiy ilmiy yo‘nalishlari",
    tracks_list: [
      { title: "Navoiy va turkiy adabiyot", desc: "Turkiy tillar rivoji va Navoiy asarlarining tilshunoslikdagi ahamiyati." },
      { title: "Fors-tojik adabiy muhiti", desc: "Hirot adabiy muhiti va Navoiy ijodida ikki tillilik (Zullisaynayn)." },
      { title: "Arab-islom tafakkuri", desc: "Navoiy asarlarida Qur'on va Hadis talqinlari, diniy falsafa." },
      { title: "Tasavvuf va ma’naviyat", desc: "Navoiy va tasavvuf tariqatlari, 'Xamsa'da inson kamoloti masalalari." }
    ],
    speakers_title: "Asosiy Ma’ruzachilar",
    speakers_subtitle: "Jahon navoiyshunosligining eng yorqin namoyandalari va sharqshunos olimlar.",
    speakers_list: [
      { 
        name: "Professor Dr. Ahmad Al-Mansur", 
        title: "Xalqaro islom akademiyasi prezidenti", 
        inst: "Misr, Qohira universiteti",
        bio: "Navoiy asarlaridagi islomiy falsafa va tasavvufiy ramzlar bo'yicha dunyoning yetakchi eksperti." 
      },
      { 
        name: "Akademik Shavkat Rahmonov", 
        title: "Fanlar Akademiyasi haqiqiy a’zosi", 
        inst: "O‘zbekiston, O‘zMU",
        bio: "Turkiy tillarning qiyosiy grammatikasi va Navoiy leksikologiyasi maktabi asoschisi." 
      },
      { 
        name: "Dr. Zaynab Turkiy", 
        title: "Turkiy meros tadqiqotlar markazi rahbari", 
        inst: "Turkiya, Istanbul universiteti",
        bio: "Usmonli va Temuriy adabiy aloqalari hamda Navoiyning Anado'lidagi ta'siri bo'yicha tadqiqotchi." 
      },
      { 
        name: "Professor Michel Vernet", 
        title: "Sharqshunos-olim, f.f.d.", 
        inst: "Fransiya, Sorbonna universiteti",
        bio: "Navoiy asarlarining G'arbiy Yevropa tillariga tarjimasi va madaniyatlararo muloqot mutaxassisi." 
      }
    ],
    logistics_hotels_h: "Mehmonxonalar",
    logistics_hotels: [
      { name: "Zarafshan Grand Hotel", desc: "Navoiy shahridagi eng hashamatli mehmonxona. Konferensiyadan 5 daqiqalik yo'l." },
      { name: "Grand M Hotel", desc: "Zamonaviy dizayn va yuqori xizmat. Ishtirokchilar uchun maxsus chegirmalar." },
      { name: "Hanjin Hotel", desc: "Qulay va tinch muhit. Shahar markazida joylgan, logistika uchun qulay." }
    ],
    logistics_dining_h: "Ovqatlanish",
    logistics_dining: [
      { name: "Navoiy Milliy Taomlari", type: "Milliy Oshxona", desc: "Haqiqiy Navoiy palovi va tandir kaboblar makoni." },
      { name: "Sanoat Restorani", type: "Yevropa va Milliy", desc: "Dab-dabali kechki ovqatlar uchun ideal joy." }
    ],
    reg_title: "Simpoziumda Ishtirok Etish",
    reg_subtitle: "Iltimos, ma'lumotlaringizni to'ldiring.",
    reg_label_name: "To‘liq ism-sharifingiz",
    reg_label_email: "Elektron pochta",
    reg_label_role: "Ishtirok turi",
    reg_label_track: "Tanlangan sho'ba",
    reg_roles: ["Tinglovchi", "Ma'ruzachi", "Talaba"],
    reg_btn: "Ro‘yxatdan o‘tishni yakunlash",
    reg_back: "Ortga qaytish",
    cabinet_welcome: "Xush kelibsiz",
    cabinet_status: "Holat: Tasdiqlangan",
    cabinet_badge: "Simpozium Beydjiki",
    cabinet_download_pdf: "PDF Shaklida Yuklash",
    cabinet_article_status: "Maqola Holati",
    cabinet_profile_title: "Profil Ma'lumotlari",
    cabinet_profile_subtitle: "Ilmiy faoliyatingizga doir barcha ma'lumotlarni to'ldiring",
    cabinet_save: "Ma'lumotlarni Tasdiqlash",
    cabinet_saving: "Saqlanmoqda...",
    label_fullname: "To'liq ism-sharif",
    label_institution: "Muassasa / Universitet",
    label_degree: "Ilmiy Daraja",
    label_title: "Ilmiy Unvon",
    label_bio: "Bio / Shaxsiy ma'lumot",
    label_email: "Elektron Pochta",
    label_phone: "Bog'lanish (Tel)",
    label_orcid: "ORCID ID",
    label_track: "Asosiy Ilmiy Sho'ba",
    article_submit_title: "Maqola topshirish",
    article_title_label: "Maqola sarlavhasi",
    article_abstract_label: "Annotatsiya (Abstract)",
    article_keywords_label: "Kalit so'zlar",
    article_file_label: "Maqola fayli",
    article_btn_submit: "Yuborish",
    article_btn_cancel: "Bekor qilish",
    timeline_submitted: "Yuborildi",
    timeline_tech: "Texnik ko'rik",
    timeline_review: "Taqriz",
    timeline_accepted: "Qabul qilindi",
    cert_title: "Sertifikat",
    cert_confirm: "Ushbu hujjat bilan tasdiqlanadiki,",
    cert_body: "Hazrat Alisher Navoiy tavalludining 584 yilligiga bag'ishlangan \"ALISHER NAVOIY VA XXI ASR\" nomli xalqaro ilmiy-nazariy simpoziumida o'zining mazmundor ilmiy ma'ruzasi bilan ishtirok etib, faol ilmiy izlanishlarini namoyon etdi.",
    cert_rector_name: "Muxiddin KALONOV",
    cert_rector_title: "Navoiy davlat universiteti rektori, professor",
    cert_date: "09.02.2025",
    cert_btn_download: "Sertifikatni Yuklash",
    footer_text: "Ma'naviyat — inson ruhining quvvatidir. Hazrat Navoiy asarlari asrlar osha bizga yo'l ko'rsatuvchi ma'rifat chirog'idir.",
    footer_rights: "© 2025 Alisher Navoiy Nomidagi Navoiy Davlat Universiteti. Barcha huquqlar himoyalangan.",
    footer_quick_links: "Tezkor havolalar",
    footer_resources: "Ilmiy resurslar",
    footer_location_btn: "Xaritada ko'rish",
    footer_address: "Navoiy shahri, Galaba ko'chasi, 176-uy.",
    footer_follow: "Bizni kuzatib boring"
  },
  ru: {
    nav_home: "Главная",
    nav_about: "О симпозиуме",
    nav_tracks: "Секции",
    nav_speakers: "Докладчики",
    nav_logistics: "Логистика",
    nav_archive: "Архив",
    nav_cabinet: "Кабинет",
    nav_register: "Участие",
    nav_location: "Адрес",

    archive_title: "Архив научного наследия",
    archive_subtitle: "Хронология симпозиумов: мосты просвещения из прошлого в будущее",
    archive_view_details: "Просмотреть детали",
    archive_books_title: "Опубликованные научные труды",
    archive_tracks_title: "Научные секции и направления",
    archive_stats_speakers: "Докладчики",
    archive_stats_articles: "Статьи",
    archive_stats_countries: "Страны",
    archive_download_proceedings: "Скачать",
    archive_outcomes_title: "Научные резолюции и итоги",
    archive_gallery_title: "Моменты симпозиума",

    past_symposiums: [
      {
        id: "2024-1",
        year: 2024,
        theme: "IV международный симпозиум «Алишер Навои и Восточный ренессанс»",
        description: "В рамках этого крупного научного форума, посвященного 583-летию Алишера Навои, были глубоко проанализированы философские и художественные грани творчества Навои в контексте Восточного ренессанса.",
        stats: { speakers: 145, articles: 520, countries: 25 },
        outcomes: [
          "Разработаны принципы нового академического издания произведений Навои",
          "Подписан международный меморандум о культуре эпохи Темуридов",
          "Объявлена программа специальных научных грантов для молодых ученых"
        ],
        tracks: [
          { title: "Навои и общечеловеческие ценности", count: 75, details: "Идеи гуманизма и справедливости в произведениях Навои." },
          { title: "Текстология и источниковедение", count: 48, details: "Методика сравнительного изучения рукописей." }
        ],
        books: [
          { id: "b1-1", title: "Восточный Ренессанс и Навои - Том I", isbn: "978-9943-12-000-1", editors: "Акад. Ш. Рахмонов", year: 2024, pages: 580 }
        ],
        gallery: [
          "https://picsum.photos/seed/nav1/800/600",
          "https://picsum.photos/seed/nav2/800/600"
        ]
      },
      {
        id: "2024-2",
        year: 2024,
        theme: "IV международный симпозиум «Алишер Навои и Восточный ренессанс»",
        description: "На втором этапе симпозиума основное внимание было уделено цифровизации наследия Навои и проблемам его перевода на мировые языки.",
        stats: { speakers: 110, articles: 430, countries: 21 },
        outcomes: [
          "Запущена многоязычная цифровая платформа (Digital Navoi)",
          "Установлено сотрудничество с Международной гильдией переводчиков",
          "Утверждена научная резолюция симпозиума"
        ],
        tracks: [
          { title: "Цифровые гуманитарные науки", count: 62, details: "Чтение рукописей Навои с помощью ИИ." },
          { title: "Вопросы переводоведения", count: 45, details: "Перевод газелей Навои на английский и французский языки." }
        ],
        books: [
          { id: "b2-2", title: "Наследие Навои: Переводы и интерпретации", isbn: "978-9943-12-000-2", editors: "Д-р З. Туркий", year: 2024, pages: 420 }
        ],
        gallery: [
          "https://picsum.photos/seed/nav3/800/600",
          "https://picsum.photos/seed/nav4/800/600"
        ]
      }
    ],

    hero_university: "Навоийский государственный университет — центр науки и просвещения",
    hero_quote: "\"Преданному народу международное почтение даруется каждый миг, именем Навои прославился весь мир.\"",
    hero_cta_register: "Зарегистрироваться",
    hero_cta_plan: "План симпозиума",
    hero_date: "9-11 Февраля",
    hero_location: "Навои, НГУ",
    hero_format: "Гибридный",
    hero_tracks: "4 Секции",
    heritage_title: "Султан царей поэзии:",
    heritage_subtitle: "Наследие Хазрата Навои",
    heritage_p1: "Алишер Навои — не только великий поэт, но и духовный архитектор тюркского мира.",
    heritage_p2: "Его труд «Мухокаматул-лугатайн» доказал всему миру богатство и мощь тюркского языка.",
    heritage_p3: "Сегодняшний симпозиум — это призыв гармонизировать философские взгляды этого великого гения с мышлением XXI века.",
    heritage_quote: "\"На чужбине странник не бывает счастлив...\"",
    heritage_author: "— из рубаи Навои",
    venue_title: "Город Навои и",
    venue_subtitle: "Наследие принимающего университета",
    venue_desc: "«Навои — это не просто город, это материализованный символ великих идей».",
    venue_uni_h: "Навоийский государственный университет имени Алишера Навои",
    venue_uni_p1: "Навоийский государственный университет был основан в 1992 году и с тех пор достойно прославляет имя великого мыслителя.",
    venue_uni_p2: "Этот университет гордится научно-исследовательским центром «Навоиведение».",
    venue_city_h: "Навои — город возрождения и прогресса",
    venue_city_p1: "Город Навои — один из современных символов Узбекистана, основанный в 1958 году.",
    venue_city_p2: "Парк имени Алишера Навои в центре города очаровывает участников своей красотой.",
    tourism_title: "Навоийская область",
    tourism_subtitle: "Исторические памятники",
    tourism_monuments: [
      { title: "Комплекс Касым Шейха", period: "XVI-XIX века", desc: "Один из важнейших архитектурных памятников в городе Кармана." },
      { title: "Караван-сарай Работи Малик", period: "XI век", desc: "Один из самых известных караван-сараев на древнем Шелковом пути." },
      { title: "Наскальные рисунки Сармышсая", period: "Эпоха палеолита", desc: "Музей под открытым небом с более чем 5000 древних петроглифов." },
      { title: "Источник Нурата", period: "Античность", desc: "Священный источник и архитектурный ансамбль вокруг него." }
    ],
    tracks_title: "Секции симпозиума",
    tracks_subtitle: "Основные научные направления конференции",
    tracks_list: [
      { title: "Навои и тюркская литература", desc: "Развитие тюркских языков и значение трудов Навои в лингвистике." },
      { title: "Персидско-таджикская литературная среда", desc: "Литературная среда Герата и двуязычие в творчестве Навои (Зуллисанайн)." },
      { title: "Арабо-исламская мысль", desc: "Толкование Корана и Хадисов в произведениях Навои, религиозная философия." },
      { title: "Суфизм и духовность", desc: "Навои и суфийские ордена, вопросы совершенствования человека в «Хамсе»." }
    ],
    speakers_title: "Ключевые спикеры",
    speakers_subtitle: "Ярчайшие представители мирового навоиведения и востоковеды.",
    speakers_list: [
      { 
        name: "Проф. д-р Ахмад аль-Мансур", 
        title: "Президент Международной исламской академии", 
        inst: "Египет, Каирский университет",
        bio: "Ведущий мировой эксперт по исламской философии и суфийским символам в трудах Навои." 
      },
      { 
        name: "Академик Шавкат Рахмонов", 
        title: "Действительный член Академии наук", 
        inst: "Узбекистан, НУУз",
        bio: "Основатель школы сравнительной грамматики тюркских языков и лексикологии Навои." 
      },
      { 
        name: "Д-р Зайнаб Туркий", 
        title: "Руководитель центра исследований тюркского наследия", 
        inst: "Турция, Стамбульский университет",
        bio: "Исследователь османско-тимуридских литературных связей и влияния Навои в Анатолии." 
      },
      { 
        name: "Профессор Мишель Верне", 
        title: "Востоковед, д.ф.н.", 
        inst: "Франция, Сорбонна",
        bio: "Специалист по переводам произведений Навои на западноевропейские языки." 
      }
    ],
    logistics_hotels_h: "Отели",
    logistics_hotels: [
      { name: "Zarafshan Grand Hotel", desc: "Самый роскошный отель в Навои. 5 минут от конференции." },
      { name: "Grand M Hotel", desc: "Современный дизайн и высокий сервис. Специальные скидки для участников." },
      { name: "Hanjin Hotel", desc: "Уютная и спокойная атмосфера. Удобное расположение в центре." }
    ],
    logistics_dining_h: "Питание",
    logistics_dining: [
      { name: "Навоийские национальные блюда", type: "Национальная кухня", desc: "Место настоящего навоийского плова и тандыр-кебаба." },
      { name: "Ресторан Саноат", type: "Европейская и национальная", desc: "Идеальное место для торжественных ужинов." }
    ],
    reg_title: "Участие в симпозиуме",
    reg_subtitle: "Пожалуйста, заполните ваши данные.",
    reg_label_name: "Полное имя",
    reg_label_email: "Электронная почта",
    reg_label_role: "Тип участия",
    reg_label_track: "Выбранная секция",
    reg_roles: ["Слушатель", "Докладчик", "Студент"],
    reg_btn: "Завершить регистрацию",
    reg_back: "Назад",
    cabinet_welcome: "Добро пожаловать",
    cabinet_status: "Статус: Подтверждено",
    cabinet_badge: "Бейджик симпозиума",
    cabinet_download_pdf: "Скачать в формате PDF",
    cabinet_article_status: "Статус статьи",
    cabinet_profile_title: "Данные профиля",
    cabinet_profile_subtitle: "Заполните всю информацию о вашей научной деятельности",
    cabinet_save: "Подтвердить данные",
    cabinet_saving: "Сохранение...",
    label_fullname: "ФИО",
    label_institution: "Учреждение / Университет",
    label_degree: "Ученая степень",
    label_title: "Ученое звание",
    label_bio: "Био / Личная информация",
    label_email: "Электронная почта",
    label_phone: "Контактный телефон",
    label_orcid: "ORCID ID",
    label_track: "Основная научная секция",
    article_submit_title: "Подача статьи",
    article_title_label: "Заголовок статьи",
    article_abstract_label: "Аннотация (Abstract)",
    article_keywords_label: "Ключевые слова",
    article_file_label: "Файл статьи",
    article_btn_submit: "Отправить",
    article_btn_cancel: "Отмена",
    timeline_submitted: "Отправлено",
    timeline_tech: "Тех. осмотр",
    timeline_review: "Рецензия",
    timeline_accepted: "Принято",
    cert_title: "Сертификат",
    cert_confirm: "Данным документом подтверждается, что",
    cert_body: "принял(а) участие в международном научно-теоретическом симпозиуме «АЛИШЕР НАВОИ И XXI ВЕК», посвященном 584-летию Хазрата Алишера Навои, выступив с содержательным докладом.",
    cert_rector_name: "Мухиддин КАЛОНОВ",
    cert_rector_title: "Ректор Навоийского государственного университета, профессор",
    cert_date: "09.02.2025",
    cert_btn_download: "Скачать сертификат",
    footer_text: "Духовность — это сила человеческого духа. Произведения Хазрата Навои — светоч просвещения, направляющий нас сквозь века.",
    footer_rights: "© 2025 Навоийский государственный университет имени Алишера Навои. Все права защищены.",
    footer_quick_links: "Быстрые ссылки",
    footer_resources: "Научные ресурсы",
    footer_location_btn: "Показать на карте",
    footer_address: "г. Навои, ул. Галаба, 176.",
    footer_follow: "Подписывайтесь на нас"
  },
  en: {
    nav_home: "Home",
    nav_about: "About Symposium",
    nav_tracks: "Tracks",
    nav_speakers: "Speakers",
    nav_logistics: "Logistics",
    nav_archive: "Archive",
    nav_cabinet: "Cabinet",
    nav_register: "Registration",
    nav_location: "Location",

    archive_title: "Scientific Heritage Archive",
    archive_subtitle: "Symposium Chronology: Bridges of Enlightenment from Past to Future",
    archive_view_details: "View Details",
    archive_books_title: "Published Scientific Works",
    archive_tracks_title: "Scientific Tracks & Directions",
    archive_stats_speakers: "Speakers",
    archive_stats_articles: "Articles",
    archive_stats_countries: "Countries",
    archive_download_proceedings: "Download",
    archive_outcomes_title: "Scientific Outcomes",
    archive_gallery_title: "Symposium Moments",

    past_symposiums: [
      {
        id: "2024-1",
        year: 2024,
        theme: "“Alisher Navoi and Oriental Renaissance” IV International Symposium",
        description: "Dedicated to the 583rd anniversary of Hazrat Alisher Navoi, this major scientific gathering analyzed philosophical and artistic aspects of Navoi's legacy in the context of the Oriental Renaissance.",
        stats: { speakers: 145, articles: 520, countries: 25 },
        outcomes: [
          "Principles for new academic editions of Navoi's works developed",
          "International memorandum on Timurid culture signed",
          "Scientific grant program for young scholars announced"
        ],
        tracks: [
          { title: "Navoi and Universal Values", count: 75, details: "Humanism and justice in Navoi's works." },
          { title: "Textology and Source Studies", count: 48, details: "Methodology of comparative manuscript study." }
        ],
        books: [
          { id: "b1-1", title: "Oriental Renaissance and Navoi - Vol I", isbn: "978-9943-12-000-1", editors: "Acad. Sh. Rakhmonov", year: 2024, pages: 580 }
        ],
        gallery: [
          "https://picsum.photos/seed/nav1/800/600",
          "https://picsum.photos/seed/nav2/800/600"
        ]
      },
      {
        id: "2024-2",
        year: 2024,
        theme: "“Alisher Navoi and Oriental Renaissance” IV International Symposium",
        description: "The second phase focused on the digitization of Navoi's heritage and translation issues into world languages.",
        stats: { speakers: 110, articles: 430, countries: 21 },
        outcomes: [
          "Digital Navoi platform launched",
          "Cooperation with International Translators Guild established",
          "Scientific resolution confirmed"
        ],
        tracks: [
          { title: "Digital Humanities", count: 62, details: "Reading Navoi manuscripts with AI." },
          { title: "Translation Studies", count: 45, details: "Translating Navoi's ghazals into English and French." }
        ],
        books: [
          { id: "b2-2", title: "Navoi Heritage: Translations and Interpretations", isbn: "978-9943-12-000-2", editors: "Dr. Z. Turkiy", year: 2024, pages: 420 }
        ],
        gallery: [
          "https://picsum.photos/seed/nav3/800/600",
          "https://picsum.photos/seed/nav4/800/600"
        ]
      }
    ],

    hero_university: "Navoi State University — Center of Science and Enlightenment",
    hero_quote: "\"To a devoted people, international respect is given every moment, Navoi's name has become famous throughout the world.\"",
    hero_cta_register: "Register Now",
    hero_cta_plan: "Symposium Plan",
    hero_date: "Feb 9-11",
    hero_location: "Navoi, NSU",
    hero_format: "Hybrid",
    hero_tracks: "4 Tracks",
    heritage_title: "Sultan of Poetry:",
    heritage_subtitle: "Hazrat Navoi's Heritage",
    heritage_p1: "Alisher Navoi is not only a great poet but also a spiritual architect of the Turkic world.",
    heritage_p2: "His work \"Muhokamatul-lug'atayn\" proved the richness and power of the Turkic language to the whole world.",
    heritage_p3: "Today's symposium is a call to harmonize the philosophical views of this great genius with 21st-century thinking.",
    heritage_quote: "\"A wanderer in a foreign land is never truly happy...\"",
    heritage_author: "— from Navoi's rubais",
    venue_title: "Navoi City and",
    venue_subtitle: "Host University Heritage",
    venue_desc: "\"Navoi is not just a city; it is a materialized symbol of great ideas.\"",
    venue_uni_h: "Alisher Navoi State University of Navoi",
    venue_uni_p1: "Navoi State University was established in 1992 and has since honored the name of the great thinker.",
    venue_uni_p2: "The university is proud of its \"Navoi Studies\" research center.",
    venue_city_h: "Navoi — City of Renaissance and Progress",
    venue_city_p1: "Navoi city is one of the modern symbols of Uzbekistan, founded in 1958.",
    venue_city_p2: "The \"Alisher Navoi Park\" in the city center charms participants with its beauty.",
    tourism_title: "Navoi Region",
    tourism_subtitle: "Historical Monuments",
    tourism_monuments: [
      { title: "Qosim Sheikh Complex", period: "16th-19th Century", desc: "One of the most important architectural monuments in Karmana." },
      { title: "Raboti Malik Caravanserai", period: "11th Century", desc: "One of the most famous caravanserais on the ancient Silk Road." },
      { title: "Sarmishsoy Petroglyphs", period: "Paleolithic Era", desc: "An open-air museum with over 5,000 ancient petroglyphs." },
      { title: "Nurata Spring", period: "Antiquity", desc: "A sacred spring and the architectural ensemble around it." }
    ],
    tracks_title: "Symposium Tracks",
    tracks_subtitle: "Main scientific directions of the conference",
    tracks_list: [
      { title: "Navoi and Turkic Literature", desc: "Development of Turkic languages and significance of Navoi's works in linguistics." },
      { title: "Persian-Tajik Literary Environment", desc: "Literary environment of Herat and bilingualism in Navoi's works." },
      { title: "Arab-Islamic Thought", desc: "Interpretation of Quran and Hadith in Navoi's works, religious philosophy." },
      { title: "Sufism and Spirituality", desc: "Navoi and Sufi orders, human perfection in 'Khamsa'." }
    ],
    speakers_title: "Keynote Speakers",
    speakers_subtitle: "Brightest representatives of global Navoi studies and orientalists.",
    speakers_list: [
      { 
        name: "Professor Dr. Ahmad Al-Mansur", 
        title: "President of International Islamic Academy", 
        inst: "Egypt, Cairo University",
        bio: "Leading global expert on Islamic philosophy and Sufi symbols in Navoi's works." 
      },
      { 
        name: "Academician Shavkat Rakhmonov", 
        title: "Member of the Academy of Sciences", 
        inst: "Uzbekistan, NUUz",
        bio: "Founder of the comparative grammar school of Turkic languages." 
      },
      { 
        name: "Dr. Zaynab Turkiy", 
        title: "Head of Turkic Heritage Research Center", 
        inst: "Turkey, Istanbul University",
        bio: "Researcher of Ottoman-Timurid literary relations." 
      },
      { 
        name: "Professor Michel Vernet", 
        title: "Orientalist, PhD", 
        inst: "France, Sorbonne University",
        bio: "Specialist in translations of Navoi's works into Western European languages." 
      }
    ],
    logistics_hotels_h: "Hotels",
    logistics_hotels: [
      { name: "Zarafshan Grand Hotel", desc: "The most luxurious hotel in Navoi. 5 minutes from the venue." },
      { name: "Grand M Hotel", desc: "Modern design and high service. Special discounts for participants." },
      { name: "Hanjin Hotel", desc: "Comfortable and quiet environment. Located in the city center." }
    ],
    logistics_dining_h: "Dining",
    logistics_dining: [
      { name: "Navoi National Cuisine", type: "National Cuisine", desc: "Home of authentic Navoi pilaf and tandoor kebab." },
      { name: "Sanoat Restaurant", type: "European and National", desc: "Ideal place for formal dinners." }
    ],
    reg_title: "Symposium Participation",
    reg_subtitle: "Please fill in your details.",
    reg_label_name: "Full Name",
    reg_label_email: "Email Address",
    reg_label_role: "Participation Type",
    reg_label_track: "Selected Track",
    reg_roles: ["Listener", "Speaker", "Student"],
    reg_btn: "Complete Registration",
    reg_back: "Go Back",
    cabinet_welcome: "Welcome",
    cabinet_status: "Status: Confirmed",
    cabinet_badge: "Symposium Badge",
    cabinet_download_pdf: "Download as PDF",
    cabinet_article_status: "Article Status",
    cabinet_profile_title: "Profile Info",
    cabinet_profile_subtitle: "Complete all information regarding your scientific activity",
    cabinet_save: "Confirm Data",
    cabinet_saving: "Saving...",
    label_fullname: "Full Name",
    label_institution: "Institution / University",
    label_degree: "Academic Degree",
    label_title: "Academic Title",
    label_bio: "Bio / Personal Info",
    label_email: "Email Address",
    label_phone: "Contact (Tel)",
    label_orcid: "ORCID ID",
    label_track: "Primary Scientific Track",
    article_submit_title: "Paper Submission",
    article_title_label: "Paper Title",
    article_abstract_label: "Abstract",
    article_keywords_label: "Keywords",
    article_file_label: "Paper File",
    article_btn_submit: "Submit",
    article_btn_cancel: "Cancel",
    timeline_submitted: "Submitted",
    timeline_tech: "Technical Check",
    timeline_review: "Review",
    timeline_accepted: "Accepted",
    cert_title: "Certificate",
    cert_confirm: "This document confirms that",
    cert_body: "has participated in the international scientific-theoretical symposium \"ALISHER NAVOI AND XXI CENTURY\" dedicated to the 584th anniversary of Hazrat Alisher Navoi, presenting a meaningful scientific report.",
    cert_rector_name: "Muxiddin KALONOV",
    cert_rector_title: "Rector of Navoi State University, Professor",
    cert_date: "09.02.2025",
    cert_btn_download: "Download Certificate",
    footer_text: "Spirituality is the power of the human spirit. Hazrat Navoi's works are a beacon of enlightenment guiding us through centuries.",
    footer_rights: "© 2025 Alisher Navoi State University of Navoi. All rights reserved.",
    footer_quick_links: "Quick Links",
    footer_resources: "Scientific Resources",
    footer_location_btn: "View on Map",
    footer_address: "176 Galaba St., Navoi city.",
    footer_follow: "Follow Us"
  }
};
