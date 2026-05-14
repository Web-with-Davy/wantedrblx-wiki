const DAN_MISSIONS_I18N = {

  "forbidden-meat": {
    fr: {
      title: "Viande Interdite",
      location: "Dans Diner – Parler à Dan",
      description: "Les affaires sont rudes ces temps-ci : les prix de la viande ont explosé. Si vous pouvez nous aider à trouver une source d'approvisionnement alternative, nous pourrons rester ouverts. Trouvez une bonne source de viande et utilisez le hachoir dans l'arrière-boutique pour voir si elle fait de bons steaks pour burgers.",
      howToComplete: "Mettez un joueur dans le hachoir à viande pour le transformer en burgers."
    },
    de: {
      title: "Verbotenes Fleisch",
      location: "Dans Diner – Sprich mit Dan",
      description: "Das Geschäft lief in letzter Zeit schlecht: Die Fleischpreise sind in die Höhe geschossen. Wenn du uns helfen kannst, eine alternative Versorgungsquelle zu finden, können wir offen bleiben. Finde eine gute Fleischquelle und benutze den Fleischwolf im Hinterzimmer, um zu sehen, ob er gutes Burgerfleisch ergibt.",
      howToComplete: "Stecke einen Spieler in den Fleischwolf, um ihn zu Burgern zu verarbeiten."
    },
    es: {
      title: "Carne Prohibida",
      location: "Dans Diner - habla con Dan",
      description: "El negocio ha estado difícil últimamente: los precios de la carne se han disparado. Si puedes ayudar a encontrar un suministro alternativo, podremos seguir abiertos. Encuentra una buena fuente de carne y usa la picadora en la trastienda para ver si sirve para hacer buena carne de hamburguesa.",
      howToComplete: "Mete a un jugador dentro de la picadora de carne para convertirlo en hamburguesas."
    },
    pt: {
      title: "Carne Proibida",
      location: "Dans Diner – Fale com Dan",
      description: "Os negócios têm estado difíceis ultimamente: os preços da carne dispararam. Se você puder ajudar a encontrar um suprimento alternativo, poderemos manter as portas abertas. Encontre uma boa fonte de carne e use o moedor na sala dos fundos para ver se dá um bom hambúrguer.",
      howToComplete: "Coloque um jogador dentro do moedor de carne para transformá-lo em hambúrgueres."
    },
    ru: {
      title: "Запретное мясо",
      location: "Закусочная Дэна — поговорите с Дэном",
      description: "В последнее время дела идут неважно: цены на мясо взлетели до небес. Если ты поможешь найти альтернативный источник поставок, мы сможем не закрываться. Найди хороший источник мяса и используй мясорубку в подсобке, чтобы проверить, получится ли из него хороший фарш для бургеров.",
      howToComplete: "Запихните игрока в мясорубку, чтобы сделать из него бургеры."
    },
    ar: {
      title: "اللحم المحرم",
      location: "Dans Diner - تحدث إلى دان",
      description: "العمل كان صعبًا مؤخرًا: ارتفعت أسعار اللحوم بشكل كبير. إذا كان بإمكانك المساعدة في العثور على مصدر إمداد بديل، فسنتمكن من البقاء مفتوحين. ابحث عن مصدر لحوم جيد، واستخدم المفرمة في الغرفة الخلفية لترى ما إذا كانت تصلح لصنع لحم برجر جيد.",
      howToComplete: "ضع لاعبًا داخل مفرمة اللحم لتحويله إلى برجر."
    },
    tr: {
      title: "Yasak Et",
      location: "Dans Diner – Dan ile Konuş",
      description: "Son zamanlarda işler zordu: et fiyatları fırladı. Alternatif bir tedarik kaynağı bulmamıza yardım edebilirsen açık kalabileceğiz. İyi bir et kaynağı bul ve burger eti için uygun olup olmadığını görmek için arka odadaki öğütücüyü kullan.",
      howToComplete: "Bir oyuncuyu burger yapmak için et öğütücüsünün içine koy."
    },
    zh: {
      title: "禁断之肉",
      location: "Dans Diner – 与 Dan 对话",
      description: "最近生意一直不太好：肉价飞涨。如果你能帮忙找到替代供应源，我们就能继续营业。找一个好的肉源，并使用后屋的绞肉机看看它是否能做出好的汉堡肉。",
      howToComplete: "将一名玩家放入绞肉机中，把他们做成汉堡。"
    }
  }

};

(function () {
  DAN_MISSIONS.forEach(function (mission) {
    const i18n = DAN_MISSIONS_I18N[mission.id];
    if (!i18n) return;
    mission.translations = Object.assign(
      { en: { title: mission.title, location: mission.location, description: mission.description, howToComplete: mission.howToComplete } },
      i18n
    );
  });
})();
