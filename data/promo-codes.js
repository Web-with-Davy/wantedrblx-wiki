const PROMO_CODES_DATA = [
    {
        code: "DEVV",
        reward: "DEVV Tire Rims",
        translations: {
            fr: { reward: "Jantes DEVV", description: "Jantes DEVV gratuites" },
            de: { reward: "DEVV-Felgen", description: "Kostenlose DEVV-Felgen" },
            es: { reward: "Llantas DEVV", description: "Llantas DEVV gratuitas" },
            pt: { reward: "Rodas DEVV", description: "Rodas DEVV gratuitas" },
            ru: { reward: "Диски DEVV", description: "Бесплатные диски DEVV" },
            ar: { reward: "جنوط عجلات DEVV", description: "جنوط عجلات DEVV مجانية" },
            tr: { reward: "DEVV Lastik Jantları", description: "Ücretsiz DEVV lastik jantları" },
            zh: { reward: "DEVV 轮毂", description: "免费 DEVV 轮毂" }
        },
        description: "Free DEVV tire rims",
        active: true
    },
    {
        code: "UZI",
        reward: "Uzi Weapon",
        translations: {
            fr: { reward: "Arme Uzi", description: "Uzi gratuit (1 vie)" },
            de: { reward: "Uzi-Waffe", description: "Kostenlose Uzi (1 Leben)" },
            es: { reward: "Arma Uzi", description: "Uzi gratuito (1 vida)" },
            pt: { reward: "Arma Uzi", description: "Uzi grátis (1 vida)" },
            ru: { reward: "Пистолет-пулемет Узи", description: "Бесплатный Узи на 1 жизнь" },
            ar: { reward: "سلاح يوزي", description: "سلاح يوزي مجاني لحياة واحدة" },
            tr: { reward: "Uzi Silahı", description: "Ücretsiz 1 canlık Uzi" },
            zh: { reward: "乌兹枪", description: "免费获得一把乌兹枪（单次寿命）" }
        },
        description: "Free 1 life Uzi Gun",
        active: true
    },
    {
        code: "WANTED",
        reward: "$10,000 Cash",
        translations: {
            fr: { reward: "10 000 $ en cash", description: "10k gratuit" },
            de: { reward: "10.000 $ Bargeld", description: "Kostenlose 10k" },
            es: { reward: "$10,000 en efectivo", description: "10k gratis" },
            pt: { reward: "$10.000 em dinheiro", description: "10k grátis" },
            ru: { reward: "$10 000 наличными", description: "Бесплатные 10к" },
            ar: { reward: "10,000 دولار نقداً", description: "10 آلاف دولار مجاناً" },
            tr: { reward: "10.000 $ Nakit", description: "Ücretsiz 10 bin nakit" },
            zh: { reward: "$10,000 现金", description: "免费 10k 现金" }
        },
        description: "Free 10k cash",
        active: true
    },
    {
        code: "BOOM",
        reward: "10 C4",
        translations: {
            fr: { reward: "10 C4", description: "10 C4 gratuits" },
            de: { reward: "10 C4", description: "Kostenlose 10 C4" },
            es: { reward: "10 C4", description: "10 C4 gratis" },
            pt: { reward: "10 C4", description: "10 C4 grátis" },
            ru: { reward: "10 зарядов C4", description: "Бесплатные 10 С4" },
            ar: { reward: "10 متفجرات C4", description: "10 متفجرات C4 مجانية" },
            tr: { reward: "10 C4", description: "Ücretsiz 10 C4" },
            zh: { reward: "10 个 C4", description: "免费 10 个 C4" }
        },
        description: "Free 10 C4",
        active: true
    },
    {
        code: "SANTA",
        reward: "$10,000 Cash",
        translations: {
            fr: { reward: "10 000 $ en cash", description: "10k gratuit" },
            de: { reward: "10.000 $ Bargeld", description: "Kostenlose 10k" },
            es: { reward: "$10,000 en efectivo", description: "10k gratis" },
            pt: { reward: "$10.000 em dinheiro", description: "10k grátis" },
            ru: { reward: "$10 000 наличными", description: "Бесплатные 10к" },
            ar: { reward: "10,000 دولار نقداً", description: "10 آلاف دولار مجاناً" },
            tr: { reward: "10.000 $ Nakit", description: "Ücretsiz 10 bin nakit" },
            zh: { reward: "$10,000 现金", description: "免费 10k 现金" }
        },
        description: "Free 10k cash",
        active: false
    },
    {
        code: "ZORVELLO",
        reward: "Zorvello Chair Funiture",
        translations: {
            fr: { reward: "Chaise Zorvello", description: "Chaise Zorvello gratuite" },
            de: { reward: "Zorvello-Stuhl", description: "Kostenlose Zorvello-Stuhlmöbel" },
            es: { reward: "Silla Zorvello", description: "Silla Zorvello gratuita" },
            pt: { reward: "Cadeira Zorvello", description: "Cadeira Zorvello grátis" },
            ru: { reward: "Стул Zorvello", description: "Бесплатный стул Zorvello" },
            ar: { reward: "أثاث كرسي زورفيلو", description: "أثاث كرسي زورفيلو مجاني" },
            tr: { reward: "Zorvello Sandalye Mobilyası", description: "Ücretsiz Zorvello Sandalye Mobilyası" },
            zh: { reward: "Zorvello 椅子家具", description: "免费 Zorvello 椅子家具" }
        },
        description: "Free Zorvello Chair Funiture",
        active: false
    },
    {
        code: "FRAG",
        reward: "Frag Grenade",
        translations: {
            fr: { reward: "Grenade à fragmentation", description: "Grenade Frag M67 gratuite" },
            de: { reward: "Splittergranate", description: "Kostenlose M67-Splittergranate" },
            es: { reward: "Granada fragmentaria", description: "Granada de fragmentación M67 gratis" },
            pt: { reward: "Granada de Fragmentação", description: "Granada de Fragmentação M67 grátis" },
            ru: { reward: "Осколочная граната", description: "Бесплатная осколочная граната M67" },
            ar: { reward: "قنبلة يدوية شظية", description: "قنبلة يدوية شظية M67 مجانية" },
            tr: { reward: "El Bombası", description: "Ücretsiz M67 El Bombası" },
            zh: { reward: "破片手榴弹", description: "免费 M67 破片手榴弹" }
        },
        description: "Free M67 Frag Grenade",
        active: true
    },
    {
        code: "EASTER",
        reward: "Egg Display Furniture",
        translations: {
            fr: { reward: "Présentoir à œufs", description: "Présentoir à œufs gratuit" },
            de: { reward: "Eier-Präsentationsmöbel", description: "Kostenlose Eier-Präsentationsmöbel" },
            es: { reward: "Mueble expositor de huevos", description: "Mueble expositor de huevos gratis" },
            pt: { reward: "Móvel Expositor de Ovos", description: "Móvel Expositor de Ovos grátis" },
            ru: { reward: "Стенд для яиц (мебель)", description: "Бесплатный стенд для пасхальных яиц" },
            ar: { reward: "أثاث عرض البيض", description: "أثاث عرض البيض مجاني" },
            tr: { reward: "Yumurta Standı Mobilyası", description: "Ücretsiz Yumurta Standı Mobilyası" },
            zh: { reward: "彩蛋展示架家具", description: "免费彩蛋展示架家具" }
        },
        description: "Free Egg Display Furniture",
        active: true
    }
];
