const MISSION_ITEMS_VALUABLES_I18N = {

  "Priceless Watch": {
    fr: { name: "Montre inestimable", commonLocation: "Bureau de Buck Moneymaker à la Banque d'Oasis" },
    de: { name: "Unbezahlbare Uhr", commonLocation: "Buck Moneymakers Büro in der Bank von Oasis" },
    es: { name: "Reloj invaluable", commonLocation: "Oficina de Buck Moneymaker en Banco de Oasis" },
    pt: { name: "Relógio inestimável", commonLocation: "Escritório do Buck Moneymaker no Banco de Oasis" },
    ru: { name: "Бесценные часы", commonLocation: "Офис Бака в Банке Оазиса" },
    ar: { name: "ساعة لا تُقدّر بثمن", commonLocation: "مكتب باك في بنك الواحة" },
    tr: { name: "Paha Biçilmez Saat", commonLocation: "Oasis Bankası'nda Buck Moneymaker'ın Ofisi" },
    zh: { name: "无价手表", commonLocation: "绿洲银行 Buck Moneymaker 的办公室" },
  },

  "Data Disk": {
    fr: { name: "Disque de données", commonLocation: "Site du crash à la montagne enneigée" },
    de: { name: "Datenträger", commonLocation: "Absturzstelle am Schneeberg" },
    es: { name: "Disco de datos", commonLocation: "Sitio del accidente en la Montaña Nevada" },
    pt: { name: "Disco de dados", commonLocation: "Local do acidente na Montanha Nevada" },
    ru: { name: "Диск с данными", commonLocation: "Место крушения на Снежной горе" },
    ar: { name: "قرص بيانات", commonLocation: "موقع التحطم في الجبل الثلجي" },
    tr: { name: "Veri Diski", commonLocation: "Karlı Dağ'daki Kaza Yeri" },
    zh: { name: "数据磁盘", commonLocation: "雪山坠机点" },
  },

};

(function () {
  MISSION_ITEMS_VALUABLES.forEach(function (item) {
    const i18n = MISSION_ITEMS_VALUABLES_I18N[item.name];
    if (!i18n) return;
    item.translations = Object.assign(
      { en: { name: item.name, commonLocation: item.commonLocation } },
      i18n
    );
  });
})();
