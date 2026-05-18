const SHOES_VALUABLES_I18N = {

  "Sky James Golds": {
    fr: { commonLocation: "Shoe Locker" }, de: { commonLocation: "Shoe Locker" },
    es: { commonLocation: "Shoe Locker" }, pt: { commonLocation: "Shoe Locker" },
    ru: { commonLocation: "Shoe Locker" }, ar: { commonLocation: "متجر الأحذية" },
    tr: { commonLocation: "Shoe Locker Mağazası" }, zh: { commonLocation: "Shoe Locker商店" },
  },

  "Sky James Reds": {
    fr: { commonLocation: "Shoe Locker" }, de: { commonLocation: "Shoe Locker" },
    es: { commonLocation: "Shoe Locker" }, pt: { commonLocation: "Shoe Locker" },
    ru: { commonLocation: "Shoe Locker" }, ar: { commonLocation: "متجر الأحذية" },
    tr: { commonLocation: "Shoe Locker Mağazası" }, zh: { commonLocation: "Shoe Locker商店" },
  },

  "Black Boots": {
    fr: { name: "Bottes noires", commonLocation: "Shoe Locker" },
    de: { name: "Schwarze Stiefel", commonLocation: "Shoe Locker" },
    es: { name: "Botas negras", commonLocation: "Shoe Locker" },
    pt: { name: "Botas pretas", commonLocation: "Shoe Locker" },
    ru: { name: "Чёрные ботинки", commonLocation: "Shoe Locker" },
    ar: { name: "أحذية سوداء", commonLocation: "متجر الأحذية" },
    tr: { name: "Siyah Botlar", commonLocation: "Shoe Locker Mağazası" },
    zh: { name: "黑色靴子", commonLocation: "Shoe Locker商店" },
  },

  "Brown Boots": {
    fr: { name: "Bottes marron", commonLocation: "Shoe Locker" },
    de: { name: "Braune Stiefel", commonLocation: "Shoe Locker" },
    es: { name: "Botas marrones", commonLocation: "Shoe Locker" },
    pt: { name: "Botas marrons", commonLocation: "Shoe Locker" },
    ru: { name: "Коричневые ботинки", commonLocation: "Shoe Locker" },
    ar: { name: "أحذية بنية", commonLocation: "متجر الأحذية" },
    tr: { name: "Kahverengi Botlar", commonLocation: "Shoe Locker Mağazası" },
    zh: { name: "棕色靴子", commonLocation: "Shoe Locker商店" },
  },

  "Cheap White Sneakers": {
    fr: { name: "Baskets blanches bon marché", commonLocation: "Shoe Locker" },
    de: { name: "Billige weiße Sneakers", commonLocation: "Shoe Locker" },
    es: { name: "Zapatillas blancas baratas", commonLocation: "Shoe Locker" },
    pt: { name: "Tênis brancos baratos", commonLocation: "Shoe Locker" },
    ru: { name: "Дешёвые белые кеды", commonLocation: "Shoe Locker" },
    ar: { name: "أحذية رياضية بيضاء رخيصة", commonLocation: "متجر الأحذية" },
    tr: { name: "Ucuz Beyaz Spor Ayakkabı", commonLocation: "Shoe Locker Mağazası" },
    zh: { name: "廉价白色运动鞋", commonLocation: "Shoe Locker商店" },
  },

  "Cheap Black Sneakers": {
    fr: { name: "Baskets noires bon marché", commonLocation: "Shoe Locker" },
    de: { name: "Billige schwarze Sneakers", commonLocation: "Shoe Locker" },
    es: { name: "Zapatillas negras baratas", commonLocation: "Shoe Locker" },
    pt: { name: "Tênis pretos baratos", commonLocation: "Shoe Locker" },
    ru: { name: "Дешёвые чёрные кеды", commonLocation: "Shoe Locker" },
    ar: { name: "أحذية رياضية سوداء رخيصة", commonLocation: "متجر الأحذية" },
    tr: { name: "Ucuz Siyah Spor Ayakkabı", commonLocation: "Shoe Locker Mağazası" },
    zh: { name: "廉价黑色运动鞋", commonLocation: "Shoe Locker商店" },
  },

  "Cheap Brown Sneakers": {
    fr: { name: "Baskets marron bon marché", commonLocation: "Shoe Locker" },
    de: { name: "Billige braune Sneakers", commonLocation: "Shoe Locker" },
    es: { name: "Zapatillas marrones baratas", commonLocation: "Shoe Locker" },
    pt: { name: "Tênis marrons baratos", commonLocation: "Shoe Locker" },
    ru: { name: "Дешёвые коричневые кеды", commonLocation: "Shoe Locker" },
    ar: { name: "أحذية رياضية بنية رخيصة", commonLocation: "متجر الأحذية" },
    tr: { name: "Ucuz Kahverengi Spor Ayakkabı", commonLocation: "Shoe Locker Mağazası" },
    zh: { name: "廉价棕色运动鞋", commonLocation: "Shoe Locker商店" },
  },

};

(function () {
  SHOES_VALUABLES.forEach(function (item) {
    const i18n = SHOES_VALUABLES_I18N[item.name];
    if (!i18n) return;
    item.translations = Object.assign(
      { en: { name: item.name, commonLocation: item.commonLocation } },
      i18n
    );
  });
})();
