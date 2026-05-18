const TECH_VALUABLES_I18N = {

  "TPU": {
    fr: { commonLocation: "Tech Shack" }, de: { commonLocation: "Tech Shack" },
    es: { commonLocation: "Tech Shack" }, pt: { commonLocation: "Tech Shack" },
    ru: { commonLocation: "Магазин Tech Shack" }, ar: { commonLocation: "متجر Tech Shack" },
    tr: { commonLocation: "Tech Shack Mağazası" }, zh: { commonLocation: "Tech Shack商店" },
  },

  "Cheap Laptop": {
    fr: { name: "Ordinateur bon marché", commonLocation: "Tech Shack" },
    de: { name: "Billiger Laptop", commonLocation: "Tech Shack" },
    es: { name: "Portátil barato", commonLocation: "Tech Shack" },
    pt: { name: "Laptop barato", commonLocation: "Tech Shack" },
    ru: { name: "Дешёвый ноутбук", commonLocation: "Магазин Tech Shack" },
    ar: { name: "حاسوب رخيص", commonLocation: "متجر Tech Shack" },
    tr: { name: "Ucuz Laptop", commonLocation: "Tech Shack Mağazası" },
    zh: { name: "廉价笔记本", commonLocation: "Tech Shack商店" },
  },

  "CPU Fan": {
    fr: { name: "Ventilateur CPU", commonLocation: "Tech Shack" },
    de: { name: "CPU-Lüfter", commonLocation: "Tech Shack" },
    es: { name: "Ventilador de CPU", commonLocation: "Tech Shack" },
    pt: { name: "Cooler de CPU", commonLocation: "Tech Shack" },
    ru: { name: "Кулер", commonLocation: "Магазин Tech Shack" },
    ar: { name: "مروحة معالج", commonLocation: "متجر Tech Shack" },
    tr: { name: "İşlemci Fanı", commonLocation: "Tech Shack Mağazası" },
    zh: { name: "CPU风扇", commonLocation: "Tech Shack商店" },
  },

  "Batteries": {
    fr: { name: "Piles", commonLocation: "Tech Shack" },
    de: { name: "Batterien", commonLocation: "Tech Shack" },
    es: { name: "Baterías", commonLocation: "Tech Shack" },
    pt: { name: "Baterias", commonLocation: "Tech Shack" },
    ru: { name: "Батарейки", commonLocation: "Магазин Tech Shack" },
    ar: { name: "بطاريات", commonLocation: "متجر Tech Shack" },
    tr: { name: "Piller", commonLocation: "Tech Shack Mağazası" },
    zh: { name: "电池", commonLocation: "Tech Shack商店" },
  },

  "Capacitors": {
    fr: { name: "Condensateurs", commonLocation: "Tech Shack" },
    de: { name: "Kondensatoren", commonLocation: "Tech Shack" },
    es: { name: "Capacitores", commonLocation: "Tech Shack" },
    pt: { name: "Capacitores", commonLocation: "Tech Shack" },
    ru: { name: "Конденсаторы", commonLocation: "Магазин Tech Shack" },
    ar: { name: "مكثفات", commonLocation: "متجر Tech Shack" },
    tr: { name: "Kapasitörler", commonLocation: "Tech Shack Mağazası" },
    zh: { name: "电容", commonLocation: "Tech Shack商店" },
  },

  "Wires": {
    fr: { name: "Câbles", commonLocation: "Tech Shack" },
    de: { name: "Kabel", commonLocation: "Tech Shack" },
    es: { name: "Cables", commonLocation: "Tech Shack" },
    pt: { name: "Fios", commonLocation: "Tech Shack" },
    ru: { name: "Провода", commonLocation: "Магазин Tech Shack" },
    ar: { name: "أسلاك", commonLocation: "متجر Tech Shack" },
    tr: { name: "Kablolar", commonLocation: "Tech Shack Mağazası" },
    zh: { name: "电线", commonLocation: "Tech Shack商店" },
  },

  "RAM": {
    fr: { name: "RAM", commonLocation: "Tech Shack" },
    de: { name: "RAM", commonLocation: "Tech Shack" },
    es: { name: "RAM", commonLocation: "Tech Shack" },
    pt: { name: "RAM", commonLocation: "Tech Shack" },
    ru: { name: "Оперативная память", commonLocation: "Магазин Tech Shack" },
    ar: { name: "ذاكرة عشوائية", commonLocation: "متجر Tech Shack" },
    tr: { name: "RAM", commonLocation: "Tech Shack Mağazası" },
    zh: { name: "内存条", commonLocation: "Tech Shack商店" },
  },

};

(function () {
  TECH_VALUABLES.forEach(function (item) {
    const i18n = TECH_VALUABLES_I18N[item.name];
    if (!i18n) return;
    item.translations = Object.assign(
      { en: { name: item.name, commonLocation: item.commonLocation } },
      i18n
    );
  });
})();
