const MISC_VALUABLES_I18N = {

  "Bank Cash Pile": {
    fr: { name: "Tas de billets de banque", commonLocation: "Banque d'Oasis" },
    de: { name: "Bank-Geldhaufen", commonLocation: "Bank von Oasis" },
    es: { name: "Pila de efectivo del banco", commonLocation: "Banco de Oasis" },
    pt: { name: "Pilha de dinheiro do banco", commonLocation: "Banco de Oasis" },
    ru: { name: "Стопка денег из банка", commonLocation: "Банк Оазиса" },
    ar: { name: "كومة نقود البنك", commonLocation: "بنك الواحة" },
    tr: { name: "Banka Para Yığını", commonLocation: "Oasis Bankası" },
    zh: { name: "银行现金堆", commonLocation: "绿洲银行" },
  },

  "Military Cash Pile": {
    fr: { name: "Tas de billets militaires", commonLocation: "Fort Emberreach" },
    de: { name: "Militär-Geldhaufen", commonLocation: "Fort Emberreach" },
    es: { name: "Pila de efectivo militar", commonLocation: "Fort Emberreach" },
    pt: { name: "Pilha de dinheiro militar", commonLocation: "Fort Emberreach" },
    ru: { name: "Военная стопка денег", commonLocation: "Форт Эмберрич" },
    ar: { name: "كومة نقود عسكرية", commonLocation: "حصن إمبرريتش" },
    tr: { name: "Askeri Para Yığını", commonLocation: "Fort Emberreach" },
    zh: { name: "军事现金堆", commonLocation: "火焰堡垒" },
  },

  "Secret Files": {
    fr: { name: "Dossiers secrets", commonLocation: "Fort Emberreach" },
    de: { name: "Geheimakten", commonLocation: "Fort Emberreach" },
    es: { name: "Archivos secretos", commonLocation: "Fort Emberreach" },
    pt: { name: "Arquivos secretos", commonLocation: "Fort Emberreach" },
    ru: { name: "Секретные файлы", commonLocation: "Форт Эмберрич" },
    ar: { name: "ملفات سرية", commonLocation: "حصن إمبرريتش" },
    tr: { name: "Gizli Dosyalar", commonLocation: "Fort Emberreach" },
    zh: { name: "机密文件", commonLocation: "火焰堡垒" },
  },

  "Bitcoin": {
    fr: { commonLocation: "Ordinateurs" },
    de: { commonLocation: "Computer" },
    es: { commonLocation: "Computadoras" },
    pt: { commonLocation: "Computadores" },
    ru: { name: "Биткоин", commonLocation: "Компьютеры" },
    ar: { name: "بيتكوين", commonLocation: "أجهزة الكمبيوتر" },
    tr: { commonLocation: "Bilgisayarlar" },
    zh: { name: "比特币", commonLocation: "电脑" },
  },

};

(function () {
  MISC_VALUABLES.forEach(function (item) {
    const i18n = MISC_VALUABLES_I18N[item.name];
    if (!i18n) return;
    item.translations = Object.assign(
      { en: { name: item.name, commonLocation: item.commonLocation } },
      i18n
    );
  });
})();
