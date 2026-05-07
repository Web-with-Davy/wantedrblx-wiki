const GUNS_DATA = [
  {
    name: "M9",
    translations: {
      en: {
        name: "M9"
      },
      fr: {
        name: "M9"
      },
      de: {
        name: "M9"
      },
      es: {
        name: "M9"
      },
      pt: {
        name: "M9"
      },
      ru: {
        name: "M9"
      },
      ar: {
        name: "إم 9"
      },
      tr: {
        name: "M9"
      },
      zh: {
        name: "M9 手枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 200,
    sellPrice: 60,
    contractPrice: 0,
    stats: {
      ammo: "15/300",
      ammoPrice: "$150 for 15",
      translations: {
        fr: { ammoPrice: "150 $ pour 15", damage: "Tête-14/Torse-10/Membres-8" },
        de: { ammoPrice: "150 $ für 15", damage: "Kopf-14/Torso-10/Gliedmaßen-8" },
        es: { ammoPrice: "150 $ por 15", damage: "Cabeza-14/Torso-10/Extremidades-8" },
        pt: { ammoPrice: "150 $ por 15", damage: "Cabeça-14/Torso-10/Membros-8" },
        ru: { ammoPrice: "150 $ за 15", damage: "Голова-14/Торс-10/Конечности-8" },
        ar: { ammoPrice: "150 دولار مقابل 15", damage: "الرأس-14/الجذع-10/الأطراف-8" },
        tr: { ammoPrice: "15 için 150 $", damage: "Kafa-14/Gövde-10/Uzuvlar-8" },
        zh: { ammoPrice: "150 $ 每 15发", damage: "头部-14/躯干-10/四肢-8" }
      },
      damage: "Head-14/Torso-10/Limbs-8",
      firerate: 400,
      reload: 2.5,
      accuracy: "±0.40m @ 25m"
    },
    attachments: {
      Optics: [
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "M9" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Pistol Holo",
          translations: {
            en: { name: "M9" },
            fr: { name: "Viseur Holo pistolet" },
            de: { name: "Pistolen-Holovisier" },
            es: { name: "Mira Holo para pistola" },
            pt: { name: "Mira Holo de Pistola" },
            ru: { name: "Пистолетный голограф" },
            ar: { name: "منظار هولو للمسدس" },
            tr: { name: "Tabanca Holo" },
            zh: { name: "手枪全息瞄准镜" }
          },
          price: 20000
        }
      ],
      Muzzle: [
        {
          name: "Pistol Suppressor",
          translations: {
            en: { name: "M9" },
            fr: { name: "Silencieux pistolet" },
            de: { name: "Pistolenschalldämpfer" },
            es: { name: "Supresor de pistola" },
            pt: { name: "Silenciador de Pistola" },
            ru: { name: "Пистолетный глушитель" },
            ar: { name: "كاتم صوت للمسدس" },
            tr: { name: "Tabanca Susturucusu" },
            zh: { name: "手枪消音器" }
          },
          price: 16000
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "M9" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "FN FAL",
    translations: {
      en: {
        name: "FN FAL",
        obtaining: "Syndicate Level 4",
        contractPrice: "Un-Buyable"
      },
      fr: {
        name: "FN FAL",
        obtaining: "Niveau Syndicate 4",
        contractPrice: "Inachetable"
      },
      de: {
        name: "FN FAL",
        obtaining: "Syndicate Stufe 4",
        contractPrice: "Nicht käuflich"
      },
      es: {
        name: "FN FAL",
        obtaining: "Nivel de Syndicate 4",
        contractPrice: "No comprable"
      },
      pt: {
        name: "FN FAL",
        obtaining: "Nível de Syndicate 4",
        contractPrice: "Incomprávél"
      },
      ru: {
        name: "FN FAL",
        obtaining: "Уровень Синдиката 4",
        contractPrice: "Не для продажи"
      },
      ar: {
        name: "إف إن فال",
        obtaining: "مستوى النقابة 4",
        contractPrice: "غير قابل للشراء"
      },
      tr: {
        name: "FN FAL",
        obtaining: "Syndicate Seviyesi 4",
        contractPrice: "Satın Alınamaz"
      },
      zh: {
        name: "FN FAL 步枪",
        obtaining: "辛迪加等级 4",
        contractPrice: "不可购买"
      }
    },
    showMoreButton: true,
    obtaining: "Syndicate Level 4",
    reBuyPrice: 9000,
    sellPrice: 2700,
    contractPrice: "Un-Buyable",
    stats: {
      ammo: "20/280",
      ammoPrice: "$0 for 0",
      translations: {
        fr: { ammoPrice: "0 $ pour 0", damage: "Tête-14/Torse-10/Membres-9" },
        de: { ammoPrice: "0 $ für 0", damage: "Kopf-14/Torso-10/Gliedmaßen-9" },
        es: { ammoPrice: "0 $ por 0", damage: "Cabeza-14/Torso-10/Extremidades-9" },
        pt: { ammoPrice: "0 $ por 0", damage: "Cabeça-14/Torso-10/Membros-9" },
        ru: { ammoPrice: "0 $ за 0", damage: "Голова-14/Торс-10/Конечности-9" },
        ar: { ammoPrice: "0 دولار مقابل 0", damage: "الرأس-14/الجذع-10/الأطراف-9" },
        tr: { ammoPrice: "0 için 0 $", damage: "Kafa-14/Gövde-10/Uzuvlar-9" },
        zh: { ammoPrice: "0 $ 每 0发", damage: "头部-14/躯干-10/四肢-9" }
      },
      damage: "Head-14/Torso-10/Limbs-9",
      firerate: 705,
      reload: 2.5,
      accuracy: "±1.10m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "FN FAL" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "FN FAL" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "FN FAL" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "FN FAL" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "FN FAL" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "FN FAL" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "FN FAL" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Model 870",
    translations: {
      en: {
        name: "Model 870"
      },
      fr: {
        name: "Model 870"
      },
      de: {
        name: "Modell 870"
      },
      es: {
        name: "Modelo 870"
      },
      pt: {
        name: "Modelo 870"
      },
      ru: {
        name: "Модель 870"
      },
      ar: {
        name: "موديل 870"
      },
      tr: {
        name: "Model 870"
      },
      zh: {
        name: "Model 870 散弹枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 2000,
    sellPrice: 600,
    contractPrice: 20000,
    stats: {
      ammo: "4/80",
      ammoPrice: "$60 for 4",
      translations: {
        fr: { ammoPrice: "60 $ pour 4", damage: "Tête-7/Torse-6/Membres-4" },
        de: { ammoPrice: "60 $ für 4", damage: "Kopf-7/Torso-6/Gliedmaßen-4" },
        es: { ammoPrice: "60 $ por 4", damage: "Cabeza-7/Torso-6/Extremidades-4" },
        pt: { ammoPrice: "60 $ por 4", damage: "Cabeça-7/Torso-6/Membros-4" },
        ru: { ammoPrice: "60 $ за 4", damage: "Голова-7/Торс-6/Конечности-4" },
        ar: { ammoPrice: "60 دولار مقابل 4", damage: "الرأس-7/الجذع-6/الأطراف-4" },
        tr: { ammoPrice: "4 için 60 $", damage: "Kafa-7/Gövde-6/Uzuvlar-4" },
        zh: { ammoPrice: "60 $ 每 4发", damage: "头部-7/躯干-6/四肢-4" }
      },
      damage: "Head-7/Torso-6/Limbs-4",
      firerate: 66,
      reload: 0.8,
      accuracy: "±3.50m @ 25m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ],
      Ammunition: [
        {
          name: "Rubber Slugs",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Balles en caoutchouc" },
            de: { name: "Gummigeschosse" },
            es: { name: "Balas de goma" },
            pt: { name: "Balas de Borracha" },
            ru: { name: "Резиновые пули" },
            ar: { name: "رصاص مطاطي" },
            tr: { name: "Kauçuk Mermiler" },
            zh: { name: "橡胶子弹" }
          },
          price: 25000
        },
        {
          name: "12 Gauge Slugs",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Balles de calibre 12" },
            de: { name: "12er Kaliber Geschosse" },
            es: { name: "Postas de calibre 12" },
            pt: { name: "Balas Calibre 12" },
            ru: { name: "Пули 12 калибра" },
            ar: { name: "رصاص عيار 12" },
            tr: { name: "12 Kalibre Mermiler" },
            zh: { name: "12 号子弹" }
          },
          price: 35000
        },
        {
          name: "Super Magnum",
          translations: {
            en: { name: "Model 870" },
            fr: { name: "Super Magnum" },
            de: { name: "Super Magnum" },
            es: { name: "Súper Magnum" },
            pt: { name: "Super Magnum" },
            ru: { name: "Супер Магнум" },
            ar: { name: "سوبر ماغنوم" },
            tr: { name: "Süper Magnum" },
            zh: { name: "马格南强化弹" }
          },
          price: 750000
        }
      ]
    }
  },
  {
    name: "Uzi",
    translations: {
      en: {
        name: "Uzi"
      },
      fr: {
        name: "Uzi"
      },
      de: {
        name: "Uzi"
      },
      es: {
        name: "Uzi"
      },
      pt: {
        name: "Uzi"
      },
      ru: {
        name: "Узи"
      },
      ar: {
        name: "يوزي"
      },
      tr: {
        name: "Uzi"
      },
      zh: {
        name: "乌兹冲锋枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 2500,
    sellPrice: 750,
    contractPrice: 25000,
    stats: {
      ammo: "25/250",
      ammoPrice: "$250 for 25",
      translations: {
        fr: { ammoPrice: "250 $ pour 25", damage: "Tête-7/Torse-6/Membres-5" },
        de: { ammoPrice: "250 $ für 25", damage: "Kopf-7/Torso-6/Gliedmaßen-5" },
        es: { ammoPrice: "250 $ por 25", damage: "Cabeza-7/Torso-6/Extremidades-5" },
        pt: { ammoPrice: "250 $ por 25", damage: "Cabeça-7/Torso-6/Membros-5" },
        ru: { ammoPrice: "250 $ за 25", damage: "Голова-7/Торс-6/Конечности-5" },
        ar: { ammoPrice: "250 دولار مقابل 25", damage: "الرأس-7/الجذع-6/الأطراف-5" },
        tr: { ammoPrice: "25 için 250 $", damage: "Kafa-7/Gövde-6/Uzuvlar-5" },
        zh: { ammoPrice: "250 $ 每 25发", damage: "头部-7/躯干-6/四肢-5" }
      },
      damage: "Head-7/Torso-6/Limbs-5",
      firerate: 1500,
      reload: 2.2,
      accuracy: "±0.90m @ 50m"
    },
    attachments: {
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "Uzi" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Stock: [
        {
          name: "Uzi Stock",
          translations: {
            en: { name: "Uzi" },
            fr: { name: "Crosse d'Uzi" },
            de: { name: "Uzi-Schaft" },
            es: { name: "Culata de Uzi" },
            pt: { name: "Coronha de Uzi" },
            ru: { name: "Приклад Узи" },
            ar: { name: "أخمص يوزي" },
            tr: { name: "Uzi Dipçiği" },
            zh: { name: "乌兹枪托" }
          },
          price: 35000
        }
      ]
    }
  },
  {
    name: "UMP 45",
    translations: {
      en: {
        name: "UMP 45"
      },
      fr: {
        name: "UMP 45"
      },
      de: {
        name: "UMP 45"
      },
      es: {
        name: "UMP 45"
      },
      pt: {
        name: "UMP 45"
      },
      ru: {
        name: "UMP 45"
      },
      ar: {
        name: "يو إم بي 45"
      },
      tr: {
        name: "UMP 45"
      },
      zh: {
        name: "UMP 45 冲锋枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 3000,
    sellPrice: 900,
    contractPrice: 40000,
    stats: {
      ammo: "30/240",
      ammoPrice: "$300 for 30",
      translations: {
        fr: { ammoPrice: "300 $ pour 30", damage: "Tête-9/Torse-7/Membres-6" },
        de: { ammoPrice: "300 $ für 30", damage: "Kopf-9/Torso-7/Gliedmaßen-6" },
        es: { ammoPrice: "300 $ por 30", damage: "Cabeza-9/Torso-7/Extremidades-6" },
        pt: { ammoPrice: "300 $ por 30", damage: "Cabeça-9/Torso-7/Membros-6" },
        ru: { ammoPrice: "300 $ за 30", damage: "Голова-9/Торс-7/Конечности-6" },
        ar: { ammoPrice: "300 دولار مقابل 30", damage: "الرأس-9/الجذع-7/الأطراف-6" },
        tr: { ammoPrice: "30 için 300 $", damage: "Kafa-9/Gövde-7/Uzuvlar-6" },
        zh: { ammoPrice: "300 $ 每 30发", damage: "头部-9/躯干-7/四肢-6" }
      },
      damage: "Head-9/Torso-7/Limbs-6",
      firerate: 750,
      reload: 2,
      accuracy: "±1.70m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "UMP 45" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "UMP 45" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "UMP 45" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "UMP 45" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "UMP 45" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "UMP 45" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "UMP 45" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Skorpion",
    translations: {
      en: {
        name: "Skorpion"
      },
      fr: {
        name: "Skorpion"
      },
      de: {
        name: "Skorpion"
      },
      es: {
        name: "Skorpion"
      },
      pt: {
        name: "Skorpion"
      },
      ru: {
        name: "Скорпион"
      },
      ar: {
        name: "سكوربيون"
      },
      tr: {
        name: "Skorpion"
      },
      zh: {
        name: "蝎式冲锋枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 4000,
    sellPrice: 1200,
    contractPrice: 100000,
    stats: {
      ammo: "20/220",
      ammoPrice: "$200 for 20",
      translations: {
        fr: { ammoPrice: "200 $ pour 20", damage: "Tête-9/Torse-8/Membres-6" },
        de: { ammoPrice: "200 $ für 20", damage: "Kopf-9/Torso-8/Gliedmaßen-6" },
        es: { ammoPrice: "200 $ por 20", damage: "Cabeza-9/Torso-8/Extremidades-6" },
        pt: { ammoPrice: "200 $ por 20", damage: "Cabeça-9/Torso-8/Membros-6" },
        ru: { ammoPrice: "200 $ за 20", damage: "Голова-9/Торс-8/Конечности-6" },
        ar: { ammoPrice: "200 دولار مقابل 20", damage: "الرأس-9/الجذع-8/الأطراف-6" },
        tr: { ammoPrice: "20 için 200 $", damage: "Kafa-9/Gövde-8/Uzuvlar-6" },
        zh: { ammoPrice: "200 $ 每 20发", damage: "头部-9/躯干-8/四肢-6" }
      },
      damage: "Head-9/Torso-8/Limbs-6",
      firerate: 1200,
      reload: 2,
      accuracy: "±0.70m @ 25m"
    },
    attachments: {
      Muzzle: [
        {
          name: "Pistol Suppressor",
          translations: {
            en: { name: "Skorpion" },
            fr: { name: "Silencieux pistolet" },
            de: { name: "Pistolenschalldämpfer" },
            es: { name: "Supresor de pistola" },
            pt: { name: "Silenciador de Pistola" },
            ru: { name: "Пистолетный глушитель" },
            ar: { name: "كاتم صوت للمسدس" },
            tr: { name: "Tabanca Susturucusu" },
            zh: { name: "手枪消音器" }
          },
          price: 16000
        }
      ]
    }
  },
  {
    name: "AUG A1",
    translations: {
      en: {
        name: "AUG A1"
      },
      fr: {
        name: "AUG A1"
      },
      de: {
        name: "AUG A1"
      },
      es: {
        name: "AUG A1"
      },
      pt: {
        name: "AUG A1"
      },
      ru: {
        name: "AUG A1"
      },
      ar: {
        name: "أوج إيه 1"
      },
      tr: {
        name: "AUG A1"
      },
      zh: {
        name: "AUG A1 步枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 5000,
    sellPrice: 1500,
    contractPrice: 350000,
    stats: {
      ammo: "30/270",
      ammoPrice: "$450 for 30",
      translations: {
        fr: { ammoPrice: "450 $ pour 30", damage: "Tête-8/Torse-7/Membres-6" },
        de: { ammoPrice: "450 $ für 30", damage: "Kopf-8/Torso-7/Gliedmaßen-6" },
        es: { ammoPrice: "450 $ por 30", damage: "Cabeza-8/Torso-7/Extremidades-6" },
        pt: { ammoPrice: "450 $ por 30", damage: "Cabeça-8/Torso-7/Membros-6" },
        ru: { ammoPrice: "450 $ за 30", damage: "Голова-8/Торс-7/Конечности-6" },
        ar: { ammoPrice: "450 دولار مقابل 30", damage: "الرأس-8/الجذع-7/الأطراف-6" },
        tr: { ammoPrice: "30 için 450 $", damage: "Kafa-8/Gövde-7/Uzuvlar-6" },
        zh: { ammoPrice: "450 $ 每 30发", damage: "头部-8/躯干-7/四肢-8" }
      },
      damage: "Head-8/Torso-7/Limbs-6",
      firerate: 681,
      reload: 3,
      accuracy: "±0.90m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "AUG Scope",
          translations: {
            en: { name: "AUG A1" },
            fr: { name: "Viseur AUG" },
            de: { name: "AUG-Visier" },
            es: { name: "Mira AUG" },
            pt: { name: "Mira AUG" },
            ru: { name: "Прицел AUG" },
            ar: { name: "منظار أوج" },
            tr: { name: "AUG Dürbünü" },
            zh: { name: "AUG 原厂瞄准镜" }
          },
          price: 100000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "AUG A1" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "AUG A1" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Benelli M1014",
    translations: {
      en: {
        name: "Benelli M1014"
      },
      fr: {
        name: "Benelli M1014"
      },
      de: {
        name: "Benelli M1014"
      },
      es: {
        name: "Benelli M1014"
      },
      pt: {
        name: "Benelli M1014"
      },
      ru: {
        name: "Benelli M1014"
      },
      ar: {
        name: "بينلي إم 1014"
      },
      tr: {
        name: "Benelli M1014"
      },
      zh: {
        name: "贝内利 M1014 散弹枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 6000,
    sellPrice: 1800,
    contractPrice: 550000,
    stats: {
      ammo: "30/270",
      ammoPrice: "$120 for 6",
      translations: {
        fr: { ammoPrice: "120 $ pour 6", damage: "Tête-5/Torse-4/Membres-3" },
        de: { ammoPrice: "120 $ für 6", damage: "Kopf-5/Torso-4/Gliedmaßen-3" },
        es: { ammoPrice: "120 $ por 6", damage: "Cabeza-5/Torso-4/Extremidades-3" },
        pt: { ammoPrice: "120 $ por 6", damage: "Cabeça-5/Torso-4/Membros-3" },
        ru: { ammoPrice: "120 $ за 6", damage: "Голова-5/Торс-4/Конечности-3" },
        ar: { ammoPrice: "120 دولار مقابل 6", damage: "الرأس-5/الجذع-4/الأطراف-3" },
        tr: { ammoPrice: "6 için 120 $", damage: "Kafa-5/Gövde-4/Uzuvlar-3" },
        zh: { ammoPrice: "120 $ 每 6发", damage: "头部-5/躯干-4/四肢-3" }
      },
      damage: "Head-5/Torso-4/Limbs-3",
      firerate: 230,
      reload: 0.8,
      accuracy: "±3.50m @ 25m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ],
      Ammunition: [
        {
          name: "12 Gauge Slugs",
          translations: {
            en: { name: "Benelli M1014" },
            fr: { name: "Balles de calibre 12" },
            de: { name: "12er Kaliber Geschosse" },
            es: { name: "Postas de calibre 12" },
            pt: { name: "Balas Calibre 12" },
            ru: { name: "Пули 12 калибра" },
            ar: { name: "رصاص عيار 12" },
            tr: { name: "12 Kalibre Mermiler" },
            zh: { name: "12 号子弹" }
          },
          price: 35000
        }
      ]
    }
  },
  {
    name: "AK-47",
    translations: {
      en: {
        name: "AK-47"
      },
      fr: {
        name: "AK-47"
      },
      de: {
        name: "AK-47"
      },
      es: {
        name: "AK-47"
      },
      pt: {
        name: "AK-47"
      },
      ru: {
        name: "АК-47"
      },
      ar: {
        name: "إيه كيه-47"
      },
      tr: {
        name: "AK-47"
      },
      zh: {
        name: "AK-47 步枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 6500,
    sellPrice: 1950,
    contractPrice: 800000,
    stats: {
      ammo: "30/300",
      ammoPrice: "$4500 for 30",
      translations: {
        fr: { ammoPrice: "4500 $ pour 30", damage: "Tête-10/Torse-8/Membres-8" },
        de: { ammoPrice: "4500 $ für 30", damage: "Kopf-10/Torso-8/Gliedmaßen-8" },
        es: { ammoPrice: "4500 $ por 30", damage: "Cabeza-10/Torso-8/Extremidades-8" },
        pt: { ammoPrice: "4500 $ por 30", damage: "Cabeça-10/Torso-8/Membros-8" },
        ru: { ammoPrice: "4500 $ за 30", damage: "Голова-10/Торс-8/Конечности-8" },
        ar: { ammoPrice: "4500 دولار مقابل 30", damage: "الرأس-10/الجذع-8/الأطراف-8" },
        tr: { ammoPrice: "30 için 4500 $", damage: "Kafa-10/Gövde-8/Uzuvlar-8" },
        zh: { ammoPrice: "4500 $ 每 30发", damage: "头部-10/躯干-8/四肢-8" }
      },
      damage: "Head-10/Torso-8/Limbs-8",
      firerate: 750,
      reload: 2,
      accuracy: "±1.50m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "AK-47" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "AK-47" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "AK-47" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "AK-47" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "AK-47" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "AK-47" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "AK-47" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Glock 18c",
    translations: {
      en: {
        name: "Glock 18c"
      },
      fr: {
        name: "Glock 18c"
      },
      de: {
        name: "Glock 18c"
      },
      es: {
        name: "Glock 18c"
      },
      pt: {
        name: "Glock 18c"
      },
      ru: {
        name: "Glock 18c"
      },
      ar: {
        name: "غلوك 18 سي"
      },
      tr: {
        name: "Glock 18c"
      },
      zh: {
        name: "格洛克 18c 手枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 3500,
    sellPrice: 1050,
    contractPrice: 1100000,
    stats: {
      ammo: "19/285",
      ammoPrice: "$380 for 19",
      translations: {
        fr: { ammoPrice: "380 $ pour 19" },
        de: { ammoPrice: "380 $ für 19" },
        es: { ammoPrice: "380 $ por 19" },
        pt: { ammoPrice: "380 $ por 19" },
        ru: { ammoPrice: "380 $ за 19" },
        ar: { ammoPrice: "380 دولار مقابل 19" },
        tr: { ammoPrice: "19 için 380 $" },
        zh: { ammoPrice: "380 $ 每 19发" }
      },
      damage: "11-9-8",
      firerate: 750,
      reload: 3,
      accuracy: "±0.50m @ 25m"
    },
    attachments: {
      Optics: [
        {
          name: "Pistol Holo",
          translations: {
            en: { name: "Glock 18c" },
            fr: { name: "Viseur Holo pistolet" },
            de: { name: "Pistolen-Holovisier" },
            es: { name: "Mira Holo para pistola" },
            pt: { name: "Mira Holo de Pistola" },
            ru: { name: "Пистолетный голограф" },
            ar: { name: "منظار هولو للمسدس" },
            tr: { name: "Tabanca Holo" },
            zh: { name: "手枪全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Glock 18c" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        }
      ],
      Muzzle: [
        {
          name: "Pistol Suppressor",
          translations: {
            en: { name: "Glock 18c" },
            fr: { name: "Silencieux pistolet" },
            de: { name: "Pistolenschalldämpfer" },
            es: { name: "Supresor de pistola" },
            pt: { name: "Silenciador de Pistola" },
            ru: { name: "Пистолетный глушитель" },
            ar: { name: "كاتم صوت للمسدس" },
            tr: { name: "Tabanca Susturucusu" },
            zh: { name: "手枪消音器" }
          },
          price: 16000
        }
      ],
      Stock: [
        {
          name: "Pistol Stock",
          translations: {
            en: { name: "Glock 18c" },
            fr: { name: "Crosse pistolet" },
            de: { name: "Pistolenschaft" },
            es: { name: "Culata de pistola" },
            pt: { name: "Coronha de Pistola" },
            ru: { name: "Пистолетный приклад" },
            ar: { name: "أخمص مسدس" },
            tr: { name: "Tabanca Dipçiği" },
            zh: { name: "手枪枪托" }
          },
          price: 70000
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Glock 18c" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "M4A1",
    translations: {
      en: {
        name: "M4A1"
      },
      fr: {
        name: "M4A1"
      },
      de: {
        name: "M4A1"
      },
      es: {
        name: "M4A1"
      },
      pt: {
        name: "M4A1"
      },
      ru: {
        name: "M4A1"
      },
      ar: {
        name: "إم 4 إيه 1"
      },
      tr: {
        name: "M4A1"
      },
      zh: {
        name: "M4A1 步枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 1600000,
    stats: {
      ammo: "30/420",
      ammoPrice: "$600 for 30",
      translations: {
        fr: { ammoPrice: "600 $ pour 30", damage: "Tête-11/Torse-9/Membres-8" },
        de: { ammoPrice: "600 $ für 30", damage: "Kopf-11/Torso-8/Gliedmaßen-8" },
        es: { ammoPrice: "600 $ por 30", damage: "Cabeza-11/Torso-9/Extremidades-8" },
        pt: { ammoPrice: "600 $ por 30", damage: "Cabeça-11/Torso-9/Membros-8" },
        ru: { ammoPrice: "600 $ за 30", damage: "Голова-11/Торс-9/Конечности-8" },
        ar: { ammoPrice: "600 دولار مقابل 30", damage: "الرأس-11/الجذع-9/الأطراف-8" },
        tr: { ammoPrice: "30 için 600 $", damage: "Kafa-11/Gövde-9/Uzuvlar-8" },
        zh: { ammoPrice: "600 $ 每 30发", damage: "头部-11/躯干-9/四肢-8" }
      },
      damage: "Head-11/Torso-9/Limbs-8",
      firerate: 1000,
      reload: 2,
      accuracy: "±0.90m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "M4A1" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "M4A1" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "M4A1" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "M4A1" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "M4A1" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "M4A1" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "M4A1" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "ARX-160",
    translations: {
      en: {
        name: "ARX-160"
      },
      fr: {
        name: "ARX-160"
      },
      de: {
        name: "ARX-160"
      },
      es: {
        name: "ARX-160"
      },
      pt: {
        name: "ARX-160"
      },
      ru: {
        name: "ARX-160"
      },
      ar: {
        name: "إيه آر إكس-160"
      },
      tr: {
        name: "ARX-160"
      },
      zh: {
        name: "ARX-160 步枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 1800000,
    stats: {
      ammo: "30/300",
      ammoPrice: "$450 for 30",
      translations: {
        fr: { ammoPrice: "450 $ pour 30", damage: "Tête-9/Torse-8/Membres-7" },
        de: { ammoPrice: "450 $ für 30", damage: "Kopf-9/Torso-8/Gliedmaßen-7" },
        es: { ammoPrice: "450 $ por 30", damage: "Cabeza-9/Torso-8/Extremidades-7" },
        pt: { ammoPrice: "450 $ por 30", damage: "Cabeça-9/Torso-8/Membros-7" },
        ru: { ammoPrice: "450 $ за 30", damage: "Голова-9/Торс-8/Конечности-7" },
        ar: { ammoPrice: "450 دولار مقابل 30", damage: "الرأس-9/الجذع-8/الأطراف-7" },
        tr: { ammoPrice: "30 için 450 $", damage: "Kafa-9/Gövde-8/Uzuvlar-7" },
        zh: { ammoPrice: "450 $ 每 30发", damage: "头部-9/躯干-8/四肢-7" }
      },
      damage: "Head-9/Torso-8/Limbs-7",
      firerate: 1200,
      reload: 3,
      accuracy: "±1.10m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "N/A",
          translations: {
            en: { name: "ARX-160" },
            fr: { name: "N/A" },
            de: { name: "N/A" },
            es: { name: "N/A" },
            pt: { name: "N/A" },
            ru: { name: "Н/Д" },
            ar: { name: "غير متوفر" },
            tr: { name: "YOK" },
            zh: { name: "无" }
          },
          price: 0
        }
      ],
      Muzzle: [
        {
          name: "N/A",
          translations: {
            en: { name: "ARX-160" },
            fr: { name: "N/A" },
            de: { name: "N/A" },
            es: { name: "N/A" },
            pt: { name: "N/A" },
            ru: { name: "Н/Д" },
            ar: { name: "غير متوفر" },
            tr: { name: "YOK" },
            zh: { name: "无" }
          },
          price: 0
        }
      ],
      Underbarrel: [
        {
          name: "N/A",
          translations: {
            en: { name: "ARX-160" },
            fr: { name: "N/A" },
            de: { name: "N/A" },
            es: { name: "N/A" },
            pt: { name: "N/A" },
            ru: { name: "Н/Д" },
            ar: { name: "غير متوفر" },
            tr: { name: "YOK" },
            zh: { name: "无" }
          },
          price: 0
        }
      ],
      Tactical: [
        {
          name: "N/A",
          translations: {
            en: { name: "ARX-160" },
            fr: { name: "N/A" },
            de: { name: "N/A" },
            es: { name: "N/A" },
            pt: { name: "N/A" },
            ru: { name: "Н/Д" },
            ar: { name: "غير متوفر" },
            tr: { name: "YOK" },
            zh: { name: "无" }
          },
          price: 0
        }
      ],
      Ammunition: [
        {
          name: "N/A",
          translations: {
            en: { name: "ARX-160" },
            fr: { name: "N/A" },
            de: { name: "N/A" },
            es: { name: "N/A" },
            pt: { name: "N/A" },
            ru: { name: "Н/Д" },
            ar: { name: "غير متوفر" },
            tr: { name: "YOK" },
            zh: { name: "无" }
          },
          price: 0
        }
      ]
    }
  },
  {
    name: "SPAS-12",
    translations: {
      en: {
        name: "SPAS-12"
      },
      fr: {
        name: "SPAS-12"
      },
      de: {
        name: "SPAS-12"
      },
      es: {
        name: "SPAS-12"
      },
      pt: {
        name: "SPAS-12"
      },
      ru: {
        name: "SPAS-12"
      },
      ar: {
        name: "سباس-12"
      },
      tr: {
        name: "SPAS-12"
      },
      zh: {
        name: "SPAS-12 散弹枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 2000000,
    stats: {
      ammo: "6/90",
      ammoPrice: "$360 for 6",
      translations: {
        fr: { ammoPrice: "360 $ pour 6", damage: "Tête-7/Torse-5/Membres-4" },
        de: { ammoPrice: "360 $ für 6", damage: "Kopf-7/Torso-5/Gliedmaßen-4" },
        es: { ammoPrice: "360 $ por 6", damage: "Cabeza-7/Torso-5/Extremidades-4" },
        pt: { ammoPrice: "360 $ por 6", damage: "Cabeça-7/Torso-5/Membros-4" },
        ru: { ammoPrice: "360 $ за 6", damage: "Голова-7/Торс-5/Конечности-4" },
        ar: { ammoPrice: "360 دولار مقابل 6", damage: "الرأس-7/الجذع-5/الأطراف-4" },
        tr: { ammoPrice: "6 için 360 $", damage: "Kafa-7/Gövde-5/Uzuvlar-4" },
        zh: { ammoPrice: "360 $ 每 6发", damage: "头部-7/躯干-5/四肢-4" }
      },
      damage: "Head-7/Torso-5/Limbs-4",
      firerate: 200,
      reload: 0.8,
      accuracy: "±3.50m @ 25m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ],
      Ammunition: [
        {
          name: "Rubber Slugs",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Balles en caoutchouc" },
            de: { name: "Gummigeschosse" },
            es: { name: "Balas de goma" },
            pt: { name: "Balas de Borracha" },
            ru: { name: "Резиновые пули" },
            ar: { name: "رصاص مطاطي" },
            tr: { name: "Kauçuk Mermiler" },
            zh: { name: "橡胶子弹" }
          },
          price: 25000
        },
        {
          name: "12 Gauge Slugs",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Balles de calibre 12" },
            de: { name: "12er Kaliber Geschosse" },
            es: { name: "Postas de calibre 12" },
            pt: { name: "Balas Calibre 12" },
            ru: { name: "Пули 12 калибра" },
            ar: { name: "رصاص عيار 12" },
            tr: { name: "12 Kalibre Mermiler" },
            zh: { name: "12 号子弹" }
          },
          price: 35000
        },
        {
          name: "Dragon's Breath",
          translations: {
            en: { name: "SPAS-12" },
            fr: { name: "Souffle de Dragon" },
            de: { name: "Drachenatem" },
            es: { name: "Aliento de Dragón" },
            pt: { name: "Sopro de Dragão" },
            ru: { name: "Дыхание дракона" },
            ar: { name: "نفس التنين" },
            tr: { name: "Ejderha Nefesi" },
            zh: { name: "龙息弹" }
          },
          price: 750000
        }
      ]
    }
  },
  {
    name: "AWM",
    translations: {
      en: {
        name: "AWM"
      },
      fr: {
        name: "AWM"
      },
      de: {
        name: "AWM"
      },
      es: {
        name: "AWM"
      },
      pt: {
        name: "AWM"
      },
      ru: {
        name: "AWM"
      },
      ar: {
        name: "إيه دبليو إم"
      },
      tr: {
        name: "AWM"
      },
      zh: {
        name: "AWM 狙击步枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 3500000,
    stats: {
      ammo: "5/40",
      ammoPrice: "$750 for 5",
      translations: {
        fr: { ammoPrice: "750 $ pour 5", damage: "Tête-150/Torse-65/Membres-50" },
        de: { ammoPrice: "750 $ für 5", damage: "Kopf-150/Torso-65/Gliedmaßen-50" },
        es: { ammoPrice: "750 $ por 5", damage: "Cabeza-150/Torso-65/Extremidades-50" },
        pt: { ammoPrice: "750 $ por 5", damage: "Cabeça-150/Torso-65/Membros-50" },
        ru: { ammoPrice: "750 $ за 5", damage: "Голова-150/Торс-65/Конечности-50" },
        ar: { ammoPrice: "750 دولار مقابل 5", damage: "الرأس-150/الجذع-65/الأطراف-50" },
        tr: { ammoPrice: "5 için 750 $", damage: "Kafa-150/Gövde-65/Uzuvlar-50" },
        zh: { ammoPrice: "750 $ 每 5发", damage: "头部-150/躯干-65/四肢-50" }
      },
      damage: "Head-150/Torso-65/Limbs-50",
      firerate: 30,
      reload: 3.5,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "AWM" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "AWM" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "AWM" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        },
        {
          name: "Rifle Scope",
          translations: {
            en: { name: "AWM" },
            fr: { name: "Viseur de fusil" },
            de: { name: "Scharfschützendürbün" },
            es: { name: "Mira de rifle" },
            pt: { name: "Mira de Rifle" },
            ru: { name: "Винтовочный прицел" },
            ar: { name: "منظار بندقية" },
            tr: { name: "Tüfek Dürbünü" },
            zh: { name: "长距离瞄准镜" }
          },
          price: 1250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "AWM" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "AWM" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "AWM" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "AWM" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Kriss Vector",
    translations: {
      en: {
        name: "Kriss Vector"
      },
      fr: {
        name: "Kriss Vector"
      },
      de: {
        name: "Kriss Vector"
      },
      es: {
        name: "Kriss Vector"
      },
      pt: {
        name: "Kriss Vector"
      },
      ru: {
        name: "Kriss Vector"
      },
      ar: {
        name: "كريس فيكتور"
      },
      tr: {
        name: "Kriss Vector"
      },
      zh: {
        name: "维克托冲锋枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 3600000,
    stats: {
      ammo: "30/330",
      ammoPrice: "$450 for 30",
      translations: {
        fr: { ammoPrice: "450 $ pour 30", damage: "Tête-8/Torse-6/Membres-5" },
        de: { ammoPrice: "450 $ für 30", damage: "Kopf-8/Torso-6/Gliedmaßen-5" },
        es: { ammoPrice: "450 $ por 30", damage: "Cabeza-8/Torso-6/Extremidades-5" },
        pt: { ammoPrice: "450 $ por 30", damage: "Cabeça-8/Torso-6/Membros-5" },
        ru: { ammoPrice: "450 $ за 30", damage: "Голова-8/Торс-6/Конечности-5" },
        ar: { ammoPrice: "450 دولار مقابل 30", damage: "الرأس-8/الجذع-6/الأطراف-5" },
        tr: { ammoPrice: "30 için 450 $", damage: "Kafa-8/Gövde-6/Uzuvlar-5" },
        zh: { ammoPrice: "450 $ 每 30发", damage: "头部-8/躯干-6/四肢-5" }
      },
      damage: "Head-8/Torso-6/Limbs-5",
      firerate: 1200,
      reload: 2,
      accuracy: "±1.30m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "Kriss Vector" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Kriss Vector" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "Kriss Vector" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "Kriss Vector" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "Kriss Vector" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "Kriss Vector" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Kriss Vector" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "M60",
    translations: {
      en: {
        name: "M60"
      },
      fr: {
        name: "M60"
      },
      de: {
        name: "M60"
      },
      es: {
        name: "M60"
      },
      pt: {
        name: "M60"
      },
      ru: {
        name: "M60"
      },
      ar: {
        name: "إم 60"
      },
      tr: {
        name: "M60"
      },
      zh: {
        name: "M60 通用机枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 10000,
    sellPrice: 3000,
    contractPrice: 4200000,
    stats: {
      ammo: "100/800",
      ammoPrice: "$1000 for 100",
      translations: {
        fr: { ammoPrice: "1000 $ pour 100", damage: "Tête-15/Torse-11/Membres-9" },
        de: { ammoPrice: "1000 $ für 100", damage: "Kopf-15/Torso-11/Gliedmaßen-9" },
        es: { ammoPrice: "1000 $ por 100", damage: "Cabeza-15/Torso-11/Extremidades-9" },
        pt: { ammoPrice: "1000 $ por 100", damage: "Cabeça-15/Torso-11/Membros-9" },
        ru: { ammoPrice: "1000 $ за 100", damage: "Голова-15/Торс-11/Конечности-9" },
        ar: { ammoPrice: "1000 دولار مقابل 100", damage: "الرأس-15/الجذع-11/الأطراف-9" },
        tr: { ammoPrice: "100 için 1000 $", damage: "Kafa-15/Gövde-11/Uzuvlar-9" },
        zh: { ammoPrice: "1000 $ 每 100发", damage: "头部-15/躯干-11/四肢-9" }
      },
      damage: "Head-15/Torso-11/Limbs-9",
      firerate: 750,
      reload: 5,
      accuracy: "±5.30m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "M60" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "M60" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "M60" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        },
        {
          name: "Rifle Scope",
          translations: {
            en: { name: "M60" },
            fr: { name: "Viseur de fusil" },
            de: { name: "Scharfschützendürbün" },
            es: { name: "Mira de rifle" },
            pt: { name: "Mira de Rifle" },
            ru: { name: "Винтовочный прицел" },
            ar: { name: "منظار بندقية" },
            tr: { name: "Tüfek Dürbünü" },
            zh: { name: "长距离瞄准镜" }
          },
          price: 1250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "M60" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "M60 Bipod",
          translations: {
            en: { name: "M60" },
            fr: { name: "Bipied M60" },
            de: { name: "M60-Zweibein" },
            es: { name: "Bípode M60" },
            pt: { name: "Bipé M60" },
            ru: { name: "Сошки M60" },
            ar: { name: "ثنائية الأرجل إم 60" },
            tr: { name: "M60 Çatal Ayak" },
            zh: { name: "M60 两脚架" }
          },
          price: 5000
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "M60" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "SVD",
    translations: {
      en: {
        name: "SVD"
      },
      fr: {
        name: "SVD"
      },
      de: {
        name: "SVD"
      },
      es: {
        name: "SVD"
      },
      pt: {
        name: "SVD"
      },
      ru: {
        name: "СВД"
      },
      ar: {
        name: "إس في دي"
      },
      tr: {
        name: "SVD"
      },
      zh: {
        name: "SVD 狙击步枪"
      }
    },
    showMoreButton: true,
    reBuyPrice: 10000,
    sellPrice: 3000,
    contractPrice: 5000000,
    stats: {
      ammo: "10/110",
      ammoPrice: "$600 for 10",
      translations: {
        fr: { ammoPrice: "600 $ pour 10", damage: "Tête-90/Torse-45/Membres-45" },
        de: { ammoPrice: "600 $ für 10", damage: "Kopf-90/Torso-45/Gliedmaßen-45" },
        es: { ammoPrice: "600 $ por 10", damage: "Cabeza-90/Torso-45/Extremidades-45" },
        pt: { ammoPrice: "600 $ por 10", damage: "Cabeça-90/Torso-45/Membros-45" },
        ru: { ammoPrice: "600 $ за 10", damage: "Голова-90/Торс-45/Конечности-45" },
        ar: { ammoPrice: "600 دولار مقابل 10", damage: "الرأس-90/الجذع-45/الأطراف-45" },
        tr: { ammoPrice: "10 için 600 $", damage: "Kafa-90/Gövde-45/Uzuvlar-45" },
        zh: { ammoPrice: "600 $ 每 10发", damage: "头部-90/躯干-45/四肢-45" }
      },
      damage: "Head-90/Torso-45/Limbs-45",
      firerate: 150,
      reload: 4,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "SVD" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "SVD" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "PSO Scope",
          translations: {
            en: { name: "SVD" },
            fr: { name: "Viseur PSO" },
            de: { name: "PSO-Visier" },
            es: { name: "Mira PSO" },
            pt: { name: "Mira PSO" },
            ru: { name: "Прицел ПСО" },
            ar: { name: "منظار PSO" },
            tr: { name: "PSO Dürbünü" },
            zh: { name: "PSO 瞄准镜" }
          },
          price: 0
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "SVD" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "SVD" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "SVD" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "SVD" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "SVD" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Deagle",
    translations: {
      en: {
        name: "Deagle",
        obtaining: "Syndicate Level 3",
        contractPrice: "Un-Buyable"
      },
      fr: {
        name: "Deagle",
        obtaining: "Niveau Syndicate 3",
        contractPrice: "Inachetable"
      },
      de: {
        name: "Deagle",
        obtaining: "Syndicate Stufe 3",
        contractPrice: "Nicht käuflich"
      },
      es: {
        name: "Deagle",
        obtaining: "Nivel de Syndicate 3",
        contractPrice: "No comprable"
      },
      pt: {
        name: "Deagle",
        obtaining: "Nível de Syndicate 3",
        contractPrice: "Incomprávél"
      },
      ru: {
        name: "Дигл",
        obtaining: "Уровень Синдиката 3",
        contractPrice: "Не для продажи"
      },
      ar: {
        name: "ديجل",
        obtaining: "مستوى النقابة 3",
        contractPrice: "غير قابل للشراء"
      },
      tr: {
        name: "Deagle",
        obtaining: "Syndicate Seviyesi 3",
        contractPrice: "Satın Alınamaz"
      },
      zh: {
        name: "沙漠之鹰手枪",
        obtaining: "辛迪加等级 3",
        contractPrice: "不可购买"
      }
    },
    showMoreButton: true,
    obtaining: "Syndicate Level 3",
    reBuyPrice: 3500,
    sellPrice: 1050,
    contractPrice: "Un-Buyable",
    stats: {
      ammo: "8/160",
      ammoPrice: "$0 for 0",
      translations: {
        fr: { ammoPrice: "0 $ pour 0", damage: "Tête-40/Torse-25/Membres-20" },
        de: { ammoPrice: "0 $ für 0", damage: "Kopf-40/Torso-25/Gliedmaßen-20" },
        es: { ammoPrice: "0 $ por 0", damage: "Cabeza-40/Torso-25/Extremidades-20" },
        pt: { ammoPrice: "0 $ por 0", damage: "Cabeça-40/Torso-25/Membros-20" },
        ru: { ammoPrice: "0 $ за 0", damage: "Голова-40/Торс-25/Конечности-20" },
        ar: { ammoPrice: "0 دولار مقابل 0", damage: "الرأس-40/الجذع-25/الأطراف-20" },
        tr: { ammoPrice: "0 için 0 $", damage: "Kafa-40/Gövde-25/Uzuvlar-20" },
        zh: { ammoPrice: "0 $ 每 0发", damage: "头部-40/躯干-25/四肢-20" }
      },
      damage: "Head-40/Torso-25/Limbs-20",
      firerate: 200,
      reload: 3,
      accuracy: "±0.70m @ 25m"
    },
    attachments: {
      Optics: [
        {
          name: "Pistol Holo",
          translations: {
            en: { name: "Deagle" },
            fr: { name: "Viseur Holo pistolet" },
            de: { name: "Pistolen-Holovisier" },
            es: { name: "Mira Holo para pistola" },
            pt: { name: "Mira Holo de Pistola" },
            ru: { name: "Пистолетный голограф" },
            ar: { name: "منظار هولو للمسدس" },
            tr: { name: "Tabanca Holo" },
            zh: { name: "手枪全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Deagle" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        }
      ],
      Muzzle: [
        {
          name: "Pistol Suppressor",
          translations: {
            en: { name: "Deagle" },
            fr: { name: "Silencieux pistolet" },
            de: { name: "Pistolenschalldämpfer" },
            es: { name: "Supresor de pistola" },
            pt: { name: "Silenciador de Pistola" },
            ru: { name: "Пистолетный глушитель" },
            ar: { name: "كاتم صوت للمسدس" },
            tr: { name: "Tabanca Susturucusu" },
            zh: { name: "手枪消音器" }
          },
          price: 16000
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Deagle" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser táctico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Barrett M82",
    translations: {
      en: {
        name: "Barrett M82",
        obtaining: "Airdrop",
        contractPrice: "Un-Buyable"
      },
      fr: {
        name: "Barrett M82",
        obtaining: "Loot aérien",
        contractPrice: "Inachetable"
      },
      de: {
        name: "Barrett M82",
        obtaining: "Luftabwurf",
        contractPrice: "Nicht käuflich"
      },
      es: {
        name: "Barrett M82",
        obtaining: "Suministro aéreo",
        contractPrice: "No comprable"
      },
      pt: {
        name: "Barrett M82",
        obtaining: "Suprimento Aéreo",
        contractPrice: "Incomprávél"
      },
      ru: {
        name: "Barrett M82",
        obtaining: "Аирдроп",
        contractPrice: "Не для продажи"
      },
      ar: {
        name: "باريت إم 82",
        obtaining: "إنزال جوي",
        contractPrice: "غير قابل للشراء"
      },
      tr: {
        name: "Barrett M82",
        obtaining: "Hava İkmali",
        contractPrice: "Satın Alınamaz"
      },
      zh: {
        name: "巴雷特 M82 狙击步枪",
        obtaining: "空投",
        contractPrice: "不可购买"
      }
    },
    showMoreButton: true,
    obtaining: "Airdrop",
    contractPrice: "Un-Buyable",
    sellPrice: 30000,
    stats: {
      ammo: "5/30",
      ammoPrice: "$1000 for 5",
      translations: {
        fr: { ammoPrice: "1000 $ pour 5", damage: "Tête-200/Torse-80/Membres-80" },
        de: { ammoPrice: "1000 $ für 5", damage: "Kopf-200/Torso-80/Gliedmaßen-80" },
        es: { ammoPrice: "1000 $ por 5", damage: "Cabeza-200/Torso-80/Extremidades-80" },
        pt: { ammoPrice: "1000 $ por 5", damage: "Cabeça-200/Torso-80/Membros-80" },
        ru: { ammoPrice: "1000 $ за 5", damage: "Голова-200/Торс-80/Конечности-80" },
        ar: { ammoPrice: "1000 دولار مقابل 5", damage: "الرأس-200/الجذع-80/الأطراف-80" },
        tr: { ammoPrice: "5 için 1000 $", damage: "Kafa-200/Gövde-80/Uzuvlar-80" },
        zh: { ammoPrice: "1000 $ 每 5发", damage: "头部-200/躯干-80/四肢-80" }
      },
      damage: "Head-200/Torso-80/Limbs-80",
      firerate: 30,
      reload: 3.5,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        },
        {
          name: "Rifle Scope",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "Viseur de fusil" },
            de: { name: "Scharfschützendürbün" },
            es: { name: "Mira de rifle" },
            pt: { name: "Mira de Rifle" },
            ru: { name: "Винтовочный прицел" },
            ar: { name: "منظار بندقية" },
            tr: { name: "Tüfek Dürbünü" },
            zh: { name: "长距离瞄准镜" }
          },
          price: 1250000
        },
        {
          name: "Nightforce Scope",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "Viseur Nightforce" },
            de: { name: "Nightforce-Visier" },
            es: { name: "Mira Nightforce" },
            pt: { name: "Mira Nightforce" },
            ru: { name: "Прицел Nightforce" },
            ar: { name: "منظار نايت فورس" },
            tr: { name: "Nightforce Dürbünü" },
            zh: { name: "Nightforce 瞄准镜" }
          },
          price: 2500000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Barrett M82" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser tactico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Golden Barrett M82",
    translations: {
      en: {
        name: "Golden Barrett M82",
        obtaining: "Airdrop",
        contractPrice: "Un-Buyable"
      },
      fr: {
        name: "Barrett M82 en or",
        obtaining: "Loot aérien",
        contractPrice: "Inachetable"
      },
      de: {
        name: "Goldene Barrett M82",
        obtaining: "Luftabwurf",
        contractPrice: "Nicht käuflich"
      },
      es: {
        name: "Barrett M82 de oro",
        obtaining: "Suministro aéreo",
        contractPrice: "No comprable"
      },
      pt: {
        name: "Barrett M82 de Ouro",
        obtaining: "Suprimento Aéreo",
        contractPrice: "Incomprávél"
      },
      ru: {
        name: "Золотой Barrett M82",
        obtaining: "Аирдроп",
        contractPrice: "Не для продажи"
      },
      ar: {
        name: "باريت إم 82 الذهبي",
        obtaining: "إنزال جوي",
        contractPrice: "غير قابل للشراء"
      },
      tr: {
        name: "Altın Barrett M82",
        obtaining: "Hava İkmali",
        contractPrice: "Satın Alınamaz"
      },
      zh: {
        name: "黄金巴雷特 M82",
        obtaining: "空投",
        contractPrice: "不可购买"
      }
    },
    showMoreButton: true,
    obtaining: "Airdrop",
    contractPrice: "Un-Buyable",
    sellPrice: "300000",
    stats: {
      ammo: "5/30",
      ammoPrice: "2000? for 5",
      translations: {
        fr: { damage: "Tête-200/Torse-80/Membres-80" },
        de: { damage: "Kopf-200/Torso-80/Gliedmaßen-80" },
        es: { damage: "Cabeza-200/Torso-80/Extremidades-80" },
        pt: { damage: "Cabeça-200/Torso-80/Membros-80" },
        ru: { damage: "Голова-200/Торс-80/Конечности-80" },
        ar: { damage: "الرأس-200/الجذع-80/الأطراف-80" },
        tr: { damage: "Kafa-200/Gövde-80/Uzuvlar-80" },
        zh: { damage: "头部-200/躯干-80/四肢-80" }
      },
      damage: "Head-200/Torso-80/Limbs-80",
      firerate: 30,
      reload: 3.5,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        },
        {
          name: "Rifle Scope",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "Viseur de fusil" },
            de: { name: "Scharfschützendürbün" },
            es: { name: "Mira de rifle" },
            pt: { name: "Mira de Rifle" },
            ru: { name: "Винтовочный прицел" },
            ar: { name: "منظار بندقية" },
            tr: { name: "Tüfek Dürbünü" },
            zh: { name: "长距离瞄准镜" }
          },
          price: 1250000
        },
        {
          name: "Nightforce Scope",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "Viseur Nightforce" },
            de: { name: "Nightforce-Visier" },
            es: { name: "Mira Nightforce" },
            pt: { name: "Mira Nightforce" },
            ru: { name: "Прицел Nightforce" },
            ar: { name: "منظار نايت فورس" },
            tr: { name: "Nightforce Dürbünü" },
            zh: { name: "Nightforce 瞄准镜" }
          },
          price: 2500000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Golden Barrett M82" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser tactico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Golden AK-47",
    translations: {
      en: {
        name: "Golden AK-47",
        obtaining: "Airdrop",
        contractPrice: "Un-Buyable"
      },
      fr: {
        name: "AK-47 en or",
        obtaining: "Loot aérien",
        contractPrice: "Inachetable"
      },
      de: {
        name: "Goldene AK-47",
        obtaining: "Luftabwurf",
        contractPrice: "Nicht käuflich"
      },
      es: {
        name: "AK-47 de oro",
        obtaining: "Suministro aéreo",
        contractPrice: "No comprable"
      },
      pt: {
        name: "AK-47 de Ouro",
        obtaining: "Suprimento Aéreo",
        contractPrice: "Incomprávél"
      },
      ru: {
        name: "Золотой АК-47",
        obtaining: "Аирдроп",
        contractPrice: "Не для продажи"
      },
      ar: {
        name: "إيه كيه-47 الذهبي",
        obtaining: "إنزال جوي",
        contractPrice: "غير قابل للشراء"
      },
      tr: {
        name: "Altın AK-47",
        obtaining: "Hava İkmali",
        contractPrice: "Satın Alınamaz"
      },
      zh: {
        name: "黄金 AK-47",
        obtaining: "空投",
        contractPrice: "不可购买"
      }
    },
    showMoreButton: true,
    obtaining: "Airdrop",
    contractPrice: "Un-Buyable",
    sellPrice: 60000,
    stats: {
      ammo: "30/300",
      ammoPrice: "$600 for 10",
      translations: {
        fr: { ammoPrice: "600 $ pour 10", damage: "Tête-15/Torse-12/Membres-12" },
        de: { ammoPrice: "600 $ für 10", damage: "Kopf-15/Torso-12/Gliedmaßen-12" },
        es: { ammoPrice: "600 $ por 10", damage: "Cabeza-15/Torso-12/Extremidades-12" },
        pt: { ammoPrice: "600 $ por 10", damage: "Cabeça-15/Torso-12/Membros-12" },
        ru: { ammoPrice: "600 $ за 10", damage: "Голова-15/Торс-12/Конечности-12" },
        ar: { ammoPrice: "600 دولار مقابل 10", damage: "الرأس-15/الجذع-12/الأطراف-12" },
        tr: { ammoPrice: "10 için 600 $", damage: "Kafa-15/Gövde-12/Uzuvlar-12" },
        zh: { ammoPrice: "600 $ 每 10发", damage: "头部-15/躯干-12/四肢-12" }
      },
      damage: "Head-15/Torso-12/Limbs-12",
      firerate: 750,
      reload: 2,
      accuracy: "±1.50m @ 50m"
    },
    attachments: {
      Optics: [
        {
          name: "Holographic Sight",
          translations: {
            en: { name: "Golden AK-47" },
            fr: { name: "Viseur holographique" },
            de: { name: "Holografisches Visier" },
            es: { name: "Mira holográfica" },
            pt: { name: "Mira Holográfica" },
            ru: { name: "Голографический прицел" },
            ar: { name: "منظار هولوغرافي" },
            tr: { name: "Holografik Nişangah" },
            zh: { name: "全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Golden AK-47" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        },
        {
          name: "AGOC",
          translations: {
            en: { name: "Golden AK-47" },
            fr: { name: "AGOC" },
            de: { name: "AGOC" },
            es: { name: "AGOC" },
            pt: { name: "AGOC" },
            ru: { name: "AGOC" },
            ar: { name: "AGOC" },
            tr: { name: "AGOC" },
            zh: { name: "AGOC 瞄准镜" }
          },
          price: 250000
        }
      ],
      Muzzle: [
        {
          name: "Mono Suppressor",
          translations: {
            en: { name: "Golden AK-47" },
            fr: { name: "Silencieux monolithique" },
            de: { name: "Mono-Schalldämpfer" },
            es: { name: "Supresor monolítico" },
            pt: { name: "Silenciador Monolítico" },
            ru: { name: "Монолитный глушитель" },
            ar: { name: "كاتم صوت أحادي" },
            tr: { name: "Mono Susturucu" },
            zh: { name: "一体式消音器" }
          },
          price: 32000
        }
      ],
      Underbarrel: [
        {
          name: "Horizontal Foregrip",
          translations: {
            en: { name: "Golden AK-47" },
            fr: { name: "Poignée avant horizontale" },
            de: { name: "Horizontaler Vordergriff" },
            es: { name: "Empuñadura horizontal" },
            pt: { name: "Empunhadura Horizontal" },
            ru: { name: "Горизонтальная рукоятка" },
            ar: { name: "مقبض أمامي أفقي" },
            tr: { name: "Yatay Ön Kabza" },
            zh: { name: "水平前握把" }
          },
          price: 5000
        },
        {
          name: "Vertical Foregrip",
          translations: {
            en: { name: "Golden AK-47" },
            fr: { name: "Poignée avant verticale" },
            de: { name: "Vertikaler Vordergriff" },
            es: { name: "Empuñadura vertical" },
            pt: { name: "Empunhadura Vertical" },
            ru: { name: "Вертикальная рукоятка" },
            ar: { name: "مقبض أمامي عمودي" },
            tr: { name: "Dikey Ön Kabza" },
            zh: { name: "垂直前握把" }
          },
          price: 7500
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Golden AK-47" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser tactical" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  },
  {
    name: "Golden Deagle",
    translations: {
      en: {
        name: "Golden Deagle",
        obtaining: "Airdrop",
        contractPrice: "Un-Buyable"
      },
      fr: {
        name: "Deagle en or",
        obtaining: "Loot aérien",
        contractPrice: "Inachetable"
      },
      de: {
        name: "Goldene Deagle",
        obtaining: "Luftabwurf",
        contractPrice: "Nicht käuflich"
      },
      es: {
        name: "Deagle de oro",
        obtaining: "Suministro aéreo",
        contractPrice: "No comprable"
      },
      pt: {
        name: "Deagle de Ouro",
        obtaining: "Suprimento Aéreo",
        contractPrice: "Incomprávél"
      },
      ru: {
        name: "Золотой Дигл",
        obtaining: "Аирдроп",
        contractPrice: "Не для продажи"
      },
      ar: {
        name: "ديجل الذهبي",
        obtaining: "إنزال جوي",
        contractPrice: "غير قابل للشراء"
      },
      tr: {
        name: "Altın Deagle",
        obtaining: "Hava İkmali",
        contractPrice: "Satın Alınamaz"
      },
      zh: {
        name: "黄金沙漠之鹰",
        obtaining: "空投",
        contractPrice: "不可购买"
      }
    },
    showMoreButton: true,
    obtaining: "Airdrop",
    sellPrice: 21000,
    contractPrice: "Un-Buyable",
    stats: {
      ammo: "8/160",
      ammoPrice: "$160 for 8",
      translations: {
        fr: { ammoPrice: "160 $ pour 8", damage: "Tête-80/Torse-50/Membres-40" },
        de: { ammoPrice: "160 $ für 8", damage: "Kopf-80/Torso-50/Gliedmaßen-40" },
        es: { ammoPrice: "160 $ por 8", damage: "Cabeza-80/Torso-50/Extremidades-40" },
        pt: { ammoPrice: "160 $ por 8", damage: "Cabeça-80/Torso-50/Membros-40" },
        ru: { ammoPrice: "160 $ за 8", damage: "Голова-80/Торс-50/Конечности-40" },
        ar: { ammoPrice: "160 دولار مقابل 8", damage: "الرأس-80/الجذع-50/الأطراف-40" },
        tr: { ammoPrice: "8 için 160 $", damage: "Kafa-80/Gövde-50/Uzuvlar-40" },
        zh: { ammoPrice: "160 $ 每 8发", damage: "头部-80/躯干-50/四肢-40" }
      },
      damage: "Head-80/Torso-50/Limbs-40",
      firerate: 200,
      reload: 3,
      accuracy: "±0.70m @ 25m"
    },
    attachments: {
      Optics: [
        {
          name: "Pistol Holo",
          translations: {
            en: { name: "Golden Deagle" },
            fr: { name: "Viseur Holo pistolet" },
            de: { name: "Pistolen-Holovisier" },
            es: { name: "Mira Holo para pistola" },
            pt: { name: "Mira Holo de Pistola" },
            ru: { name: "Пистолетный голограф" },
            ar: { name: "منظار هولو للمسدس" },
            tr: { name: "Tabanca Holo" },
            zh: { name: "手枪全息瞄准镜" }
          },
          price: 12500
        },
        {
          name: "Reflex Sight",
          translations: {
            en: { name: "Golden Deagle" },
            fr: { name: "Viseur Reflex" },
            de: { name: "Reflexvisier" },
            es: { name: "Mira Reflex" },
            pt: { name: "Mira Reflex" },
            ru: { name: "Коллиматорный прицел" },
            ar: { name: "منظار ريفليكس" },
            tr: { name: "Refleks Nişangah" },
            zh: { name: "反射式瞄准镜" }
          },
          price: 20000
        }
      ],
      Muzzle: [
        {
          name: "Pistol Suppressor",
          translations: {
            en: { name: "Golden Deagle" },
            fr: { name: "Silencieux pistolet" },
            de: { name: "Pistolenschalldämpfer" },
            es: { name: "Supresor de pistola" },
            pt: { name: "Silenciador de Pistola" },
            ru: { name: "Пистолетный глушитель" },
            ar: { name: "كاتم صوت للمسدس" },
            tr: { name: "Tabanca Susturucusu" },
            zh: { name: "手枪消音器" }
          },
          price: 16000
        }
      ],
      Tactical: [
        {
          name: "Tactical Laser",
          translations: {
            en: { name: "Golden Deagle" },
            fr: { name: "Laser tactique" },
            de: { name: "Taktischer Laser" },
            es: { name: "Láser tactico" },
            pt: { name: "Laser Tático" },
            ru: { name: "Тактический лазер" },
            ar: { name: "ليزر تكتيكي" },
            tr: { name: "Taktik Lazer" },
            zh: { name: "战术激光" }
          },
          price: 50000
        }
      ]
    }
  }
];

const EXPLOSIVES_DATA = [
  {
    name: "C4",
    translations: {
      en: {
        name: "C4"
      },
      fr: {
        name: "C4"
      },
      de: {
        name: "C4"
      },
      es: {
        name: "C4"
      },
      pt: {
        name: "C4"
      },
      ru: {
        name: "C4"
      },
      ar: {
        name: "سي 4"
      },
      tr: {
        name: "C4"
      },
      zh: {
        name: "C4 炸药"
      }
    },
    showMoreButton: true,
    reBuyPrice: 1000,
    sellPrice: 300,
    contractPrice: 50000,
    stats: {
      ammo: "1/10",
      ammoPrice: "$1000 for 1",
      translations: {
        fr: { ammoPrice: "1000 $ pour 1" },
        de: { ammoPrice: "1000 $ für 1" },
        es: { ammoPrice: "1000 $ por 1" },
        pt: { ammoPrice: "1000 $ por 1" },
        ru: { ammoPrice: "1000 $ за 1" },
        ar: { ammoPrice: "1000 دولار مقابل 1" },
        tr: { ammoPrice: "1 için 1000 $" },
        zh: { ammoPrice: "1000 $ 每 1个" }
      },
      damage: "35",
      firerate: 0,
      reload: 0,
      accuracy: "0"
    }
  },
  {
    name: "M67",
    translations: {
      en: {
        name: "M67"
      },
      fr: {
        name: "M67"
      },
      de: {
        name: "M67"
      },
      es: {
        name: "M67"
      },
      pt: {
        name: "M67"
      },
      ru: {
        name: "M67"
      },
      ar: {
        name: "إم 67"
      },
      tr: {
        name: "M67"
      },
      zh: {
        name: "M67 手榴弹"
      }
    },
    showMoreButton: true,
    reBuyPrice: 1000,
    sellPrice: 300,
    contractPrice: 80000,
    stats: {
      ammo: "1/3",
      ammoPrice: "$1000 for 1",
      translations: {
        fr: { ammoPrice: "1000 $ pour 1", damage: "Tête-100/Torse-100/Membres-100" },
        de: { ammoPrice: "1000 $ für 1", damage: "Kopf-100/Torso-100/Gliedmaßen-100" },
        es: { ammoPrice: "1000 $ por 1", damage: "Cabeza-100/Torso-100/Extremidades-100" },
        pt: { ammoPrice: "1000 $ por 1", damage: "Cabeça-100/Torso-100/Membros-100" },
        ru: { ammoPrice: "1000 $ за 1", damage: "Голова-100/Торс-100/Конечности-100" },
        ar: { ammoPrice: "1000 دولار مقابل 1", damage: "الرأس-100/الجذع-100/الأطراف-100" },
        tr: { ammoPrice: "1 için 1000 $", damage: "Kafa-100/Gövde-100/Uzuvlar-100" },
        zh: { ammoPrice: "1000 $ 每 1个", damage: "头部-100/躯干-100/四肢-100" }
      },
      damage: "Head-100/Torso-100/Limbs-100",
      firerate: 0,
      reload: 0,
      accuracy: "0"
    }
  },
  {
    name: "RPG-7",
    translations: {
      en: {
        name: "RPG-7"
      },
      fr: {
        name: "RPG-7"
      },
      de: {
        name: "RPG-7"
      },
      es: {
        name: "RPG-7"
      },
      pt: {
        name: "RPG-7"
      },
      ru: {
        name: "РПГ-7"
      },
      ar: {
        name: "آر بي جي-7"
      },
      tr: {
        name: "RPG-7"
      },
      zh: {
        name: "RPG-7 火箭筒"
      }
    },
    showMoreButton: true,
    reBuyPrice: 10000,
    sellPrice: 3000,
    contractPrice: 1250000,
    stats: {
      ammo: "1/6",
      ammoPrice: "$2000 for 1",
      translations: {
        fr: { ammoPrice: "2000 $ pour 1" },
        de: { ammoPrice: "2000 $ für 1" },
        es: { ammoPrice: "2000 $ por 1" },
        pt: { ammoPrice: "2000 $ por 1" },
        ru: { ammoPrice: "2000 $ за 1" },
        ar: { ammoPrice: "2000 دولار مقابل 1" },
        tr: { ammoPrice: "1 için 2000 $" },
        zh: { ammoPrice: "2000 $ 每 1个" }
      },
      damage: "80",
      firerate: 8,
      reload: 7,
      accuracy: "±12.20m @ 200m"
    }
  }
];

const TOOLS_DATA = [
  {
    name: "Buzzsaw",
    translations: {
      en: {
        name: "Buzzsaw",
        location: "Ofy's Value Pawn"
      },
      fr: {
        name: "Tronçonneuse",
        location: "Prêteur sur gages d'Ofy"
      },
      de: {
        name: "Buzzsaw",
        location: "Ofy's Pfandhaus"
      },
      es: {
        name: "Sierra circular",
        location: "Casa de empeño de Ofy"
      },
      pt: {
        name: "Serra Circular",
        location: "Penhor de Valor do Ofy"
      },
      ru: {
        name: "Циркулярная пила",
        location: "Ломбард Офи"
      },
      ar: {
        name: "منشار دائري",
        location: "محل رهن أوفي"
      },
      tr: {
        name: "Testere",
        location: "Ofy'nin Rehin Dükkanı"
      },
      zh: {
        name: "圆锯",
        location: "奥菲当铺"
      }
    },
    showMoreButton: false,
    location: "Ofy's Value Pawn",
    contractPrice: 2000,
    stats: {
      ammo: "1/8",
      ammoPrice: "$250 for 1",
      translations: {
        fr: { ammoPrice: "250 $ pour 1", damage: "10 par 0,2s" },
        de: { ammoPrice: "250 $ für 1", damage: "10 pro 0,2s" },
        es: { ammoPrice: "250 $ por 1", damage: "10 por 0,2s" },
        pt: { ammoPrice: "250 $ por 1", damage: "10 por 0,2s" },
        ru: { ammoPrice: "250 $ за 1", damage: "10 за 0,2с" },
        ar: { ammoPrice: "250 دولار مقابل 1", damage: "10 كل 0.2 ثانية" },
        tr: { ammoPrice: "1 için 250 $", damage: "0,2 saniyede 10" },
        zh: { ammoPrice: "250 $ 每 1个", damage: "每 0.2秒 10伤害" }
      },
      damage: "10 per 0.2s",
    }
  },
  {
    name: "Vault Cracker",
    translations: {
      en: {
        name: "Vault Cracker",
        location: "Oasis City Port"
      },
      fr: {
        name: "Perceur de coffre",
        location: "Port d'Oasis City"
      },
      de: {
        name: "Tresorknacker",
        location: "Oasis City Hafen"
      },
      es: {
        name: "Abrecajas fuertes",
        location: "Puerto de Oasis City"
      },
      pt: {
        name: "Arrombador de Cofres",
        location: "Porto de Oasis City"
      },
      ru: {
        name: "Взломщик сейфов",
        location: "Порт Оазис-Сити"
      },
      ar: {
        name: "كاسر الخزائن",
        location: "ميناء مدينة الواحة"
      },
      tr: {
        name: "Kasa Hırsızı",
        location: "Oasis City Limanı"
      },
      zh: {
        name: "金库破解器",
        location: "绿洲城港口"
      }
    },
    showMoreButton: false,
    location: "Oasis City Port",
    contractPrice: 5000,
    stats: {
      ammo: "1/2",
      ammoPrice: "$5000 for 1",
      translations: {
        fr: { ammoPrice: "5000 $ pour 1" },
        de: { ammoPrice: "5000 $ für 1" },
        es: { ammoPrice: "5000 $ por 1" },
        pt: { ammoPrice: "5000 $ por 1" },
        ru: { ammoPrice: "5000 $ за 1" },
        ar: { ammoPrice: "5000 دولار مقابل 1" },
        tr: { ammoPrice: "1 için 5000 $" },
        zh: { ammoPrice: "5000 $ 每 1个" }
      },
    }
  }
];