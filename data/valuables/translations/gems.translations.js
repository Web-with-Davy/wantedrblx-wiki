const GEMS_VALUABLES_I18N = {

  "Silver Bar": {
    fr: { name: "Barre d'argent", commonLocation: "Banque d'Oasis" },
    de: { name: "Silberbarren", commonLocation: "Bank von Oasis" },
    es: { name: "Barra de plata", commonLocation: "Banco de Oasis" },
    pt: { name: "Barra de prata", commonLocation: "Banco de Oasis" },
    ru: { name: "Серебряный слиток", commonLocation: "Банк Оазиса" },
    ar: { name: "سبيكة فضية", commonLocation: "بنك الواحة" },
    tr: { name: "Gümüş Külçe", commonLocation: "Oasis Bankası" },
    zh: { name: "银条", commonLocation: "绿洲银行" },
  },

  "Gold Bar": {
    fr: { name: "Barre d'or", commonLocation: "Banque d'Oasis" },
    de: { name: "Goldbarren", commonLocation: "Bank von Oasis" },
    es: { name: "Barra de oro", commonLocation: "Banco de Oasis" },
    pt: { name: "Barra de ouro", commonLocation: "Banco de Oasis" },
    ru: { name: "Золотой слиток", commonLocation: "Банк Оазиса" },
    ar: { name: "سبيكة ذهبية", commonLocation: "بنك الواحة" },
    tr: { name: "Altın Külçe", commonLocation: "Oasis Bankası" },
    zh: { name: "金条", commonLocation: "绿洲银行" },
  },

  "Sapphire": {
    fr: { name: "Saphir", commonLocation: "Banque d'Oasis" },
    de: { name: "Saphir", commonLocation: "Bank von Oasis" },
    es: { name: "Zafiro", commonLocation: "Banco de Oasis" },
    pt: { name: "Safira", commonLocation: "Banco de Oasis" },
    ru: { name: "Сапфир", commonLocation: "Банк Оазиса" },
    ar: { name: "ياقوت أزرق", commonLocation: "بنك الواحة" },
    tr: { name: "Safir", commonLocation: "Oasis Bankası" },
    zh: { name: "蓝宝石", commonLocation: "绿洲银行" },
  },

  "Ruby": {
    fr: { name: "Rubis", commonLocation: "Banque d'Oasis" },
    de: { name: "Rubin", commonLocation: "Bank von Oasis" },
    es: { name: "Rubí", commonLocation: "Banco de Oasis" },
    pt: { name: "Rubi", commonLocation: "Banco de Oasis" },
    ru: { name: "Рубин", commonLocation: "Банк Оазиса" },
    ar: { name: "ياقوت", commonLocation: "بنك الواحة" },
    tr: { name: "Yakut", commonLocation: "Oasis Bankası" },
    zh: { name: "红宝石", commonLocation: "绿洲银行" },
  },

  "Emerald": {
    fr: { name: "Émeraude", commonLocation: "Banque d'Oasis" },
    de: { name: "Smaragd", commonLocation: "Bank von Oasis" },
    es: { name: "Esmeralda", commonLocation: "Banco de Oasis" },
    pt: { name: "Esmeralda", commonLocation: "Banco de Oasis" },
    ru: { name: "Изумруд", commonLocation: "Банк Оазиса" },
    ar: { name: "زمرد", commonLocation: "بنك الواحة" },
    tr: { name: "Zümrüt", commonLocation: "Oasis Bankası" },
    zh: { name: "祖母绿", commonLocation: "绿洲银行" },
  },

  "Amethyst": {
    fr: { name: "Améthyste", commonLocation: "Banque d'Oasis" },
    de: { name: "Amethyst", commonLocation: "Bank von Oasis" },
    es: { name: "Amatista", commonLocation: "Banco de Oasis" },
    pt: { name: "Ametista", commonLocation: "Banco de Oasis" },
    ru: { name: "Аметист", commonLocation: "Банк Оазиса" },
    ar: { name: "جمشت", commonLocation: "بنك الواحة" },
    tr: { name: "Ametist", commonLocation: "Oasis Bankası" },
    zh: { name: "紫水晶", commonLocation: "绿洲银行" },
  },

  "Diamond": {
    fr: { name: "Diamant", commonLocation: "Bijouterie d'Oasis City" },
    de: { name: "Diamant", commonLocation: "Oasis City Juwelier" },
    es: { name: "Diamante", commonLocation: "Joyería de Oasis City" },
    pt: { name: "Diamante", commonLocation: "Joalheria de Oasis City" },
    ru: { name: "Алмаз", commonLocation: "Ювелирный магазин Оазис-Сити" },
    ar: { name: "ألماس", commonLocation: "مجوهرات مدينة الواحة" },
    tr: { name: "Elmas", commonLocation: "Oasis City Kuyumcusu" },
    zh: { name: "钻石", commonLocation: "绿洲城珠宝店" },
  },

};

(function () {
  GEMS_VALUABLES.forEach(function (item) {
    const i18n = GEMS_VALUABLES_I18N[item.name];
    if (!i18n) return;
    item.translations = Object.assign(
      { en: { name: item.name, commonLocation: item.commonLocation } },
      i18n
    );
  });
})();
