const NPCS_DATA = [
  {
    name: "Erik",
    showMoreButton: true,
    team: "CRIMINAL",
    translations: {
      en: {
        location: "Syndicate Headquarters",
        description: "Arms dealer specializing in guns, ammo, and modifications. Offers Artisan missions for testing gun mods."
      },
      fr: {
        location: "QG du Syndicat",
        description: "Marchand d'armes spécialisé dans les armes, les munitions et les modifications. Propose des missions Artisan pour tester les modifications d'armes."
      },
      de: {
        location: "Syndikat-Hauptquartier",
        description: "Waffenhändler, spezialisiert auf Waffen, Munition und Modifikationen. Bietet Handwerker-Missionen an, um Waffenmodifikationen zu testen."
      },
      es: {
        location: "Cuartel general del Sindicato",
        description: "Traficante de armas especializado en armas, municiones y modificaciones. Ofrece misiones de Artesano para probar modificaciones de armas."
      },
      pt: {
        location: "Sede do Sindicato",
        description: "Traficante de armas especializado em armas, munições e modificações. Oferece missões de Artesão para testar modificações de armas."
      },
      ru: {
        location: "Штаб-квартира Синдиката",
        description: "Торговец оружием, специализирующийся на пушках, боеприпасах и модификациях. Предлагает ремесленные миссии для тестирования модификаций оружия."
      },
      ar: {
        location: "مقر المنظمة",
        description: "تاجر أسلحة متخصص في الأسلحة والذخائر والتعديلات. يقدم مهام الحرفيين لاختبار تعديلات الأسلحة."
      },
      tr: {
        location: "Sendika Karargahı",
        description: "Silahlar, mühimmat ve modifikasyonlar konusunda uzmanlaşmış silah tüccarı. Silah modlarını test etmek için Zanaatkar görevleri sunar."
      },
      zh: {
        location: "辛迪加总部",
        description: "专门从事枪支、弹药和改装的军火商。提供工匠任务以测试枪支改装。"
      }
    },
    location: "Syndicate Headquarters",
    description: "Arms dealer specializing in guns, ammo, and modifications. Offers Artisan missions for testing gun mods."
  },
  {
    name: "Dan",
    showMoreButton: true,
    team: "NEUTRAL",
    translations: {
      en: {
        location: "Dans Diner",
        description: "Diner owner facing meat shortages. Seeks alternative supplies through the Forbidden Meat mission."
      },
      fr: {
        location: "Chez Dan",
        description: "Propriétaire de snack-bar confronté à des pénuries de viande. Recherche des approvisionnements alternatifs via la mission Viande Interdite."
      },
      de: {
        location: "Dans Diner",
        description: "Imbissbesitzer, der mit Fleischknappheit zu kämpfen hat. Sucht alternative Vorräte über die Mission „Verbotenes Fleisch“."
      },
      es: {
        location: "Restaurante de Dan",
        description: "Dueño de un restaurante que se enfrenta a la escasez de carne. Busca suministros alternativos a través de la misión Carne Prohibida."
      },
      pt: {
        location: "Lanchonete do Dan",
        description: "Dono de uma lanchonete enfrentando escassez de carne. Busca suprimentos alternativos através da missão Carne Proibida."
      },
      ru: {
        location: "Закусочная Дэна",
        description: "Владелец закусочной, столкнувшийся с нехваткой мяса. Ищет альтернативные поставки через миссию «Запретное мясо»."
      },
      ar: {
        location: "مطعم دان",
        description: "صاحب مطعم يواجه نقصاً في اللحوم. يبحث عن إمدادات بديلة من خلال مهمة اللحم الممنوع."
      },
      tr: {
        location: "Dan'ın Lokantası",
        description: "Et sıkıntısı çeken lokanta sahibi. Yasak Et görevi aracılığıyla alternatif tedarik yolları arıyor."
      },
      zh: {
        location: "丹的餐馆",
        description: "面临肉类短缺的餐馆老板。通过“禁肉”任务寻求替代供应。"
      }
    },
    location: "Dans Diner",
    description: "Diner owner facing meat shortages. Seeks alternative supplies through the Forbidden Meat mission."
  },
  {
    name: "Sir.B",
    showMoreButton: true,
    team: "CRIMINAL",
    translations: {
      en: {
        location: "Syndicate Headquarters",
        description: "Syndicate leader directing operations against law enforcement and specializing in black market dealing.",
        dialogue: {
      "[Join/Leave The Syndicate]": [
        { dialogue: "We've been expecting you Username [joining]" },
        { dialogue: "So it shall be [leaving]" }
      ],
      "[See Missions]": [
        { dialogue: "See available missions" }
      ],
      "I'd like to sell my loot": [
        { dialogue: "You don't have anything to sell right now" },
        { dialogue: "For everything, I can get you $[Cash]. It'll take me 4 hours to smuggle and resell things. After that, you'll get paid" }
      ],
      "Nevermind": [
        { dialogue: "See you again [Exit Dialogue]" }
      ]
    }
      },
      fr: {
        location: "QG du Syndicat",
        description: "Chef du Syndicat dirigeant les opérations contre les forces de l'ordre et spécialisé dans le marché noir.",
        dialogue: {
          "[Rejoindre/Quitter le Syndicat]": [{ dialogue: "Nous vous attendions Username [rejoindre]" }, { dialogue: "Qu'il en soit ainsi [quitter]" }],
          "[Voir les Missions]": [{ dialogue: "Voir les missions disponibles" }],
          "Je voudrais vendre mon butin": [{ dialogue: "Vous n'avez rien à vendre pour l'instant" }, { dialogue: "Pour le tout, je peux vous donner $[Cash]. Il me faudra 4 heures pour tout revendre en douce. Après ça, vous serez payé" }],
          "Laisse tomber": [{ dialogue: "À la prochaine [Quitter le dialogue]" }]
        }
      },
      de: {
        location: "Syndikat-Hauptquartier",
        description: "Anführer des Syndikats, der Operationen gegen die Strafverfolgung leitet und auf Schwarzmarktgeschäfte spezialisiert ist.",
        dialogue: {
          "[Dem Syndikat beitreten/verlassen]": [{ dialogue: "Wir haben dich bereits erwartet Username [beitreten]" }, { dialogue: "So soll es sein [verlassen]" }],
          "[Missionen ansehen]": [{ dialogue: "Verfügbare Missionen ansehen" }],
          "Ich möchte meine Beute verkaufen": [{ dialogue: "Du hast gerade nichts zu verkaufen" }, { dialogue: "Für alles kann ich dir $[Cash] geben. Es wird 4 Stunden dauern, die Sachen zu schmuggeln und weiterzuverkaufen. Danach wirst du bezahlt" }],
          "Egal": [{ dialogue: "Wir sehen uns wieder [Dialog verlassen]" }]
        }
      },
      es: {
        location: "Cuartel general del Sindicato",
        description: "Líder del Sindicato que dirige las operaciones contra las fuerzas del orden y se spécializa en el mercado negro.",
        dialogue: {
          "[Unirse/Dejar el Sindicato]": [{ dialogue: "Te estábamos esperando Username [unirse]" }, { dialogue: "Que así sea [dejar]" }],
          "[Ver misiones]": [{ dialogue: "Ver misiones disponibles" }],
          "Me gustaría vender mi botín": [{ dialogue: "No tienes nada que vender en este momento" }, { dialogue: "Por todo, puedo darte $[Cash]. Me tomará 4 horas contrabandear y revender las cosas. Después de eso, se te pagará" }],
          "No importa": [{ dialogue: "Hasta la vista [Salir del diálogo]" }]
        }
      },
        pt: {
        location: "Sede do Sindicato",
        description: "Líder do Sindicato que dirige as operações contra as forças da ordem e é especializado em negociações no mercado negro.",
        dialogue: {
          "[Entrar/Sair do Sindicato]": [{ dialogue: "Estávamos esperando você Username [entrar]" }, { dialogue: "Que assim seja [sair]" }],
          "[Ver Missões]": [{ dialogue: "Ver missões disponíveis" }],
          "Eu gostaria de vender meu saque": [{ dialogue: "Você não tem nada para vender agora" }, { dialogue: "Por tudo, posso conseguir para você $[Cash]. Vou levar 4 horas para contrabandear e revender as coisas. Depois disso, você será pago" }],
          "Esquece": [{ dialogue: "Até a próxima [Sair do Diálogo]" }]
        }
      },
      ru: {
        location: "Штаб-квартира Синдиката",
        description: "Лидер Синдиката, руководящий операциями против правоохранительных органов и специализирующийся на операциях на черном рынке.",
        dialogue: {
          "[Вступить/Выйти из Синдиката]": [{ dialogue: "Мы ждали тебя, Username [вступление]" }, { dialogue: "Да будет так [выход]" }],
          "[Посмотреть миссии]": [{ dialogue: "Посмотреть доступные миссии" }],
          "Я хочу продать добычу": [{ dialogue: "Тебе сейчас нечего продавать" }, { dialogue: "За всё я могу предложить $[Cash]. Мне понадобится 4 часа на контрабанду и перепродажу. После этого ты получишь деньги" }],
          "Неважно": [{ dialogue: "Еще увидимся [Выход из диалога]" }]
        }
      },
      ar: {
        location: "مقر المنظمة",
        description: "زعيم المنظمة الذي يدير العمليات ضد جهات إنفاذ القانون والمتخصص في التعامل في السوق السوداء.",
        dialogue: {
          "[انضمام/مغادرة المنظمة]": [{ dialogue: "لقد كنا بانتظارك Username [انضمام]" }, { dialogue: "ليكن الأمر كذلك [مغادرة]" }],
          "[مشاهدة المهام]": [{ dialogue: "مشاهدة المهام المتاحة" }],
          "أرغب في بيع غنائمي": [{ dialogue: "ليس لديك أي شيء لتببيعه الآن" }, { dialogue: "مقابل كل شيء، يمكنني أن أعطيك $[Cash]. سيستغرق الأمر مني 4 ساعات لتهريب الأشياء وإعادة بيعها. بعد ذلك، ستتقاضى أجرك" }],
          "لا يهم": [{ dialogue: "أراك مرة أخرى [خروج من الحوار]" }]
        }
      },
      tr: {
        location: "Sendika Karargahı",
        description: "Kolluk kuvvetlerine karşı operasyonları yöneten ve karaborsa ticareti konusunda uzmanlaşmış Sendika lideri.",
        dialogue: {
          "[Sendikaya Katıl/Ayrıl]": [{ dialogue: "Seni bekliyorduk Username [katılma]" }, { dialogue: "Öyle olsun [ayrılma]" }],
          "[Görevleri Gör]": [{ dialogue: "Müsait görevleri gör" }],
          "Ganimetimi satmak istiyorum": [{ dialogue: "Şu an satacak bir şeyin yok" }, { dialogue: "Her şey için sana $[Cash] verebilirim. Eşyaları kaçırıp yeniden satmam 4 saatimi alacak. Ondan sonra ödemeni alacaksın" }],
          "Boşver": [{ dialogue: "Tekrar görüşmek üzere [Diyalogdan Çık]" }]
        }
      },
      zh: {
        location: "辛迪加总部",
        description: "辛迪加领导人，负责指挥针对执法部门的行动，并专门从事黑市交易。",
        dialogue: {
          "[加入/离开辛迪加]": [{ dialogue: "我们一直在等你，Username [加入]" }, { dialogue: "那就这样吧 [离开]" }],
          "[查看任务]": [{ dialogue: "查看可用任务" }],
          "我想出售我的战利品": [{ dialogue: "你现在没有任何东西可以出售" }, { dialogue: "所有的东西我可以给你 $[Cash]。我需要 4 小时来走私和转售。之后你会拿到报酬。" }],
          "算了": [{ dialogue: "再见 [退出对话]" }]
        }
      }
    },
    location: "Syndicate Headquarters",
    description: "Syndicate leader directing operations against law enforcement and specializing in black market dealing.",
    dialogue: {
      "[Join/Leave The Syndicate]": [
        { dialogue: "We've been expecting you Username [joining]" },
        { dialogue: "So it shall be [leaving]" }
      ],
      "[See Missions]": [
        { dialogue: "See available missions" }
      ],
      "I'd like to sell my loot": [
        { dialogue: "You don't have anything to sell right now" },
        { dialogue: "For everything, I can get you $[Cash]. It'll take me 4 hours to smuggle and resell things. After that, you'll get paid" }
      ],
      "Nevermind": [
        { dialogue: "See you again [Exit Dialogue]" }
      ]
    }
  },
  {
    name: "Bert",
    showMoreButton: true,
    team: "POLICE",
    translations: {
      en: {
        location: "Oasis City Police Station",
        description: "Officer recruiting undercover agents from criminal ranks via the Loyalty Test mission."
      },
      fr: {
        location: "Commissariat d'Oasis City",
        description: "Officier recrutant des agents infiltrés parmi les criminels via la mission Test de Loyauté."
      },
      de: {
        location: "Polizeistation von Oasis City",
        description: "Offizier, der über die Mission „Loyalitätstest“ verdeckte Ermittler aus kriminellen Kreisen rekrutiert."
      },
      es: {
        location: "Estación de policía de Oasis City",
        description: "Oficial que recluta agentes encubiertos de las filas criminales a través de la misión Prueba de Lealtad."
      },
      pt: {
        location: "Estação de Polícia de Oasis City",
        description: "Oficial recrutando agentes infiltrados de fileiras criminosas através da missão Teste de Lealdade."
      },
      ru: {
        location: "Полицейский участок Оазис-Сити",
        description: "Офицер, вербующий секретных агентов из криминальных кругов через миссию «Тест на лояльность»."
      },
      ar: {
        location: "مركز شرطة مدينة الواحة",
        description: "ضابط يقوم بتجنيد عملاء سريين من الصفوف الإجرامية عبر مهمة اختبار الولاء."
      },
      tr: {
        location: "Oasis Şehri Polis Karakolu",
        description: "Sadakat Testi görevi aracılığıyla suç saflarından gizli ajanlar devşiren memur."
      },
      zh: {
        location: "绿洲城警察局",
        description: "这位警官通过“忠诚测试”任务，从犯罪分子中招募卧底探员。"
      }
    },
    location: "Oasis City Police Station",
    description: "Officer recruiting undercover agents from criminal ranks via the Loyalty Test mission."
  },
  {
    name: "Softy",
    showMoreButton: true,
    team: "NEUTRAL",
    translations: {
      en: {
        location: "Crystal Club & Resort",
        description: "Crystal Club & Resort employee currently assigned to the Daily Wheel Spin, available after 15 minutes of playtime."
      },
      fr: {
        location: "Crystal Club & Resort",
        description: "Employé du Crystal Club & Resort actuellement affecté au Daily Wheel Spin, disponible après 15 minutes de jeu."
      },
      de: {
        location: "Crystal Club & Resort",
        description: "Mitarbeiter des Crystal Club & Resort, der derzeit dem Daily Wheel Spin zugewiesen ist, verfügbar nach 15 Minuten Spielzeit."
      },
      es: {
        location: "Crystal Club & Resort",
        description: "Empleado de Crystal Club & Resort actualmente asignado a Daily Wheel Spin, disponible después de 15 minutos de juego."
      },
      pt: {
        location: "Crystal Club & Resort",
        description: "Funcionário do Crystal Club & Resort atualmente designado para o Daily Wheel Spin, disponível após 15 minutos de jogo."
      },
      ru: {
        location: "Crystal Club & Resort",
        description: "Сотрудник Crystal Club & Resort, в данный момент назначенный на ежедневную рулетку, доступен после 15 минут игры."
      },
      ar: {
        location: "Crystal Club & Resort",
        description: "موظف في Crystal Club & Resort مكلف حالياً بعجلة الحظ اليومية، متاح بعد 15 دقيقة من اللعب."
      },
      tr: {
        location: "Crystal Club & Resort",
        description: "Şu anda Günlük Çarkıfelek'te görevli olan Crystal Club & Resort çalışanı, 15 dakikalık oyun süresinden sonra kullanılabilir."
      },
      zh: {
        location: "水晶俱乐部度假村",
        description: "水晶俱乐部度假村的员工，目前负责每日幸运大转盘，游戏 15 分钟后即可使用。"
      }
    },
    location: "Crystal Club & Resort",
    description: "Crystal Club & Resort employee currently assigned to the Daily Wheel Spin, available after 15 minutes of playtime."
  },
  {
    name: "Justin",
    showMoreButton: true,
    team: "NEUTRAL",
    translations: {
      en: {
        location: "Lock n' Load Armory",
        description: "Owner of Lock n’ Load Armory, specializing in the sale and modification of weapons."
      },
      fr: {
        location: "Armurerie Lock n' Load",
        description: "Propriétaire de l'armurerie Lock n’ Load, spécialisé dans la vente et la modification d'armes."
      },
      de: {
        location: "Lock n' Load Armory",
        description: "Inhaber der Lock n’ Load Armory, spezialisiert auf den Verkauf und die Modifikation von Waffen."
      },
      es: {
        location: "Armería Lock n' Load",
        description: "Propietario de Lock n’ Load Armory, especializado en la venta y modificación de armas."
      },
      pt: {
        location: "Arsenal Lock n' Load",
        description: "Proprietário do Lock n’ Load Armory, especializado na venda e modificação de armas."
      },
      ru: {
        location: "Оружейная Lock n' Load",
        description: "Владелец оружейной лавки Lock n’ Load, специализирующийся на продаже и модификации оружия."
      },
      ar: {
        location: "متجر Lock n' Load للأسلحة",
        description: "صاحب متجر Lock n’ Load للأسلحة، متخصص في بيع وتعديل الأسلحة."
      },
      tr: {
        location: "Lock n' Load Silah Deposu",
        description: "Silah satışı ve modifikasyonu konusunda uzmanlaşmış Lock n' Load Silah Deposu'nun sahibi."
      },
      zh: {
        location: "锁定和加载军火库",
        description: "锁定和加载军火库的老板，专门从事武器的销售和改装。"
      }
    },
    location: "Lock n' Load Armory",
    description: "Owner of Lock n’ Load Armory, specializing in the sale and modification of weapons."
  },
  {
    name: "Cody",
    showMoreButton: true,
    team: "NEUTRAL",
    translations: {
      en: {
        location: "Bayview Motors",
        description: "The owner of Bayview Motors, offering car sales and custom modifications."
      },
      fr: {
        location: "Bayview Motors",
        description: "Le propriétaire de Bayview Motors, proposant la vente de voitures et des modifications personnalisées."
      },
      de: {
        location: "Bayview Motors",
        description: "Der Besitzer von Bayview Motors, der Autoverkäufe und individuelle Modifikationen anbietet."
      },
      es: {
        location: "Bayview Motors",
        description: "El propietario de Bayview Motors, que ofrece venta de coches y modificaciones personalizadas."
      },
      pt: {
        location: "Bayview Motors",
        description: "O proprietário da Bayview Motors, que oferece venda de carros e modificações personalizadas."
      },
      ru: {
        location: "Bayview Motors",
        description: "Владелец Bayview Motors, предлагающий продажу автомобилей и индивидуальную модификацию."
      },
      ar: {
        location: "باي فيو موتورز",
        description: "صاحب شركة باي فيو موتورز، التي تقدم خدمات بيع السيارات والتعديلات المخصصة."
      },
      tr: {
        location: "Bayview Motors",
        description: "Araba satışı ve özel modifikasyonlar sunan Bayview Motors'un sahibi."
      },
      zh: {
        location: "湾景车行",
        description: "湾景车行的老板，提供汽车销售和个性化改装。"
      }
    },
    location: "Bayview Motors",
    description: "The owner of Bayview Motors, offering car sales and custom modifications."
  },
  {
    name: "Davy",
    showMoreButton: true,
    team: "NEUTRAL",
    translations: {
      en: {
        location: "Davis Heliport",
        description: "The owner of Davis Heliport, offering helicopters and other flying vehicles for sale."
      },
      fr: {
        location: "Héliport Davis",
        description: "Le propriétaire de l'héliport Davis, proposant des hélicoptères et d'autres véhicules volants à la vente."
      },
      de: {
        location: "Davis Heliport",
        description: "Der Besitzer des Davis Heliports, der Hubschrauber und andere Flugzeuge zum Verkauf anbietet."
      },
      es: {
        location: "Helipuerto Davis",
        description: "El propietario del helipuerto Davis, que ofrece helicópteros y otros vehículos voladores a la venta."
      },
      pt: {
        location: "Heliporto Davis",
        description: "O proprietário do Davis Heliport, que oferece helicópteros e outros veículos voadores à venda."
      },
      ru: {
        location: "Вертолетный порт Дэвис",
        description: "Владелец вертолетного порта Дэвис, предлагающий на продажу вертолеты и другие летательные аппараты."
      },
      ar: {
        location: "مهبط طائرات ديفيس",
        description: "صاحب مهبط طائرات ديفيس، الذي يقدم طائرات مروحية ومركبات طائرة أخرى للبيع."
      },
      tr: {
        location: "Davis Helikopter Pisti",
        description: "Helikopter ve diğer uçan araçların satışını sunan Davis Helikopter Pisti'nin sahibi."
      },
      zh: {
        location: "戴维斯直升机场",
        description: "戴维斯直升机场的老板，提供直升机和其他飞行器销售。"
      }
    },
    location: "Davis Heliport",
    description: "The owner of Davis Heliport, offering helicopters and other flying vehicles for sale."
  },
  {
    name: "Rod",
    showMoreButton: true,
    team: "CRIMINAL",
    translations: {
      en: {
        location: "Oasis City Port",
        description: "The current manager of Oasis City Port, specializing in across the sea trading. You can sell guns to him for 35% of the guns re-buy price, get info on loot crates, and buy the vault crackers from him.",
        dialogue: {
      "[Browser Shop]": [
        { dialogue: "Buy Vault Cracker [$10,000]" }
      ],
      "Any valuable crates today? [$200]": [
        { dialogue: "Theres a weird crate that hardly weighs anything [2 Bitcoin]" },
        { dialogue: "Theres a strange order on the manifest. Looks to be Government [2 Secret Files and Flash Drive]" },
        { dialogue: "There's a shipment of diamonds on the manifest today [2 Diamonds]" },
        { dialogue: "Some illicit cargo came in today [1 Money Printer]" },
        { dialogue: "Big shipment of gems just came in [4 Gems Total (Diamonds, Amethyst, Emeralds, Rubies, Sapphires)]" },
        { dialogue: "An order from the bank came in - big cash shipment [+10K Cash]" },
        { dialogue: "Saw an order from Oasis Jewelry [5 Jewelry Total (Rollie, Amethyst/Diamond/Emerald/Ruby/Sapphire Rings, Pearl Necklace, Gold Chain)]" },
        { dialogue: "Theres an order here for some expensive tech parts [PearPods, HDDs, PearWatches, PSU, GPU]" },
        { dialogue: "There's some real heavy weapons [AWM, RPG, M60, M4A1]" },
        { dialogue: "I saw a shipment of some military-grade weapons [AWM, ARX, SPAS, RPG, AK47]" },
        { dialogue: "Looks like a shipment of gold pear tech [2 Goldbooks, 2 Goldphones, 2 Gold Pods, 2 Gold Watches]" }
      ],
      "I want to sell a gun": [
        { dialogue: "You need to equip a gun first" },
        { dialogue: "I can get you $[Cash] for your [Gun Name]" }
      ],
      "Who are you?": [
        { dialogue: "I am the foreman here. This is my operation. Everything that comes in and out of this city comes through me first" }
      ],
      "Nevermind": [
        { dialogue: "Back to work [Exit Dialogue]" }
      ]
    }
      },
      fr: {
        location: "Port d'Oasis City",
        description: "L'actuel gestionnaire du port d'Oasis City, spécialisé dans le commerce maritime. Vous pouvez lui vendre des armes pour 35% de leur prix de rachat, obtenir des infos sur les caisses de butin et lui acheter des perceurs de coffre.",
        dialogue: {
          "[Boutique Navigateur]": [{ dialogue: "Acheter un perceur de coffre [10 000 $]" }],
          "Des caisses de valeur aujourd'hui ? [200 $]": [
            { dialogue: "Il y a une caisse bizarre qui ne pèse presque rien [2 Bitcoin]" },
            { dialogue: "Il y a une commande étrange sur le manifeste. Ça a l'air d'être Gouvernemental [2 Dossiers Secrets et Clé USB]" },
            { dialogue: "Il y a une cargaison de diamants sur le manifeste aujourd'hui [2 Diamants]" },
            { dialogue: "Une cargaison illicite est arrivée aujourd'hui [1 Imprimante de Billets]" },
            { dialogue: "Une grosse livraison de gemmes vient d'arriver [4 Gemmes au total (Diamants, Améthyste, Émeraudes, Rubis, Saphirs)]" },
            { dialogue: "Une commande de la banque est arrivée - grosse livraison de cash [+10K Cash]" },
            { dialogue: "J'ai vu une commande d'Oasis Jewelry [5 Bijoux au total (Rollie, Bagues d'Améthyste/Diamant/Émeraude/Rubis/Saphir, Collier de Perles, Chaîne en Or)]" },
            { dialogue: "Il y a une commande ici pour des composants technologiques coûteux [PearPods, Disques Durs, PearWatches, PSU, GPU]" },
            { dialogue: "Il y a des armes vraiment lourdes [AWM, RPG, M60, M4A1]" },
            { dialogue: "J'ai vu une livraison d'armes de qualité militaire [AWM, ARX, SPAS, RPG, AK47]" },
            { dialogue: "On dirait une livraison de matos 'Gold Pear' [2 Goldbooks, 2 Goldphones, 2 Gold Pods, 2 Gold Watches]" }
          ],
          "Je veux vendre une arme": [
            { dialogue: "Vous devez d'abord équiper une arme" },
            { dialogue: "Je peux vous donner $[Cash] pour votre [Gun Name]" }
          ],
          "Qui êtes-vous ?": [{ dialogue: "Je suis le contremaître ici. C'est mon opération. Tout ce qui entre et part de cette ville passe d'abord par moi." }],
          "Laisse tomber": [{ dialogue: "Retour au travail [Quitter le dialogue]" }]
        }
      },
      de: {
        location: "Hafen von Oasis City",
        description: "Der derzeitige Manager des Hafens von Oasis City, spezialisiert auf den Seehandel. Du kannst ihm Waffen für 35 % des Rückkaufpreises verkaufen, Informationen über Beutekisten erhalten und Tresorknacker bei ihm kaufen.",
        dialogue: {
          "[Browser-Shop]": [{ dialogue: "Tresorknacker kaufen [10.000 $]" }],
          "Gibt es heute wertvolle Kisten? [200 $]": [
            { dialogue: "Da ist eine seltsame Kiste, die fast nichts wiegt [2 Bitcoin]" },
            { dialogue: "Es gibt eine seltsame Bestellung auf dem Manifest. Sieht nach Regierung aus [2 Geheimakten und USB-Stick]" },
            { dialogue: "Heute steht eine Ladung Diamanten auf dem Manifest [2 Diamanten]" },
            { dialogue: "Heute ist eine illegale Ladung eingetroffen [1 Gelddrucker]" },
            { dialogue: "Eine große Ladung Edelsteine ist gerade eingetroffen [Insgesamt 4 Edelsteine (Diamanten, Amethyst, Smaragde, Rubine, Saphire)]" },
            { dialogue: "Eine Bestellung von der Bank ist eingetroffen – eine große Bargeldsendung [+10K Bargeld]" },
            { dialogue: "Ich habe eine Bestellung von Oasis Jewelry gesehen [Insgesamt 5 Schmuckstücke (Rollie, Amethyst-/Diamant-/Smaragd-/Rubin-/Saphirringe, Perlenhalskette, Goldkette)]" },
            { dialogue: "Hier gibt es eine Bestellung für einige teure Tech-Teile [PearPods, HDDs, PearWatches, Netzteil, GPU]" },
            { dialogue: "Hier gibt es einige wirklich schwere Waffen [AWM, RPG, M60, M4A1]" },
            { dialogue: "Ich habe eine Lieferung mit militärischen Waffen gesehen [AWM, ARX, SPAS, RPG, AK47]" },
            { dialogue: "Sieht aus wie eine Lieferung von Gold-Pear-Technik [2 Goldbooks, 2 Goldphones, 2 Gold Pods, 2 Gold Watches]" }
          ],
          "Ich möchte eine Waffe verkaufen": [
            { dialogue: "Du musst zuerst eine Waffe ausrüsten" },
            { dialogue: "Ich kann dir $[Cash] für deine [Gun Name] geben" }
          ],
          "Wer bist du?": [{ dialogue: "Ich bin der Vorarbeiter hier. Das ist mein Betrieb. Alles, was in diese Stadt hinein- und herauskommt, geht zuerst über mich." }],
          "Egal": [{ dialogue: "Zurück an die Arbeit [Dialog verlassen]" }]
        }
      },
      es: {
        location: "Puerto de Oasis City",
        description: "El actual gerente del puerto de Oasis City, especializado en el comercio marítimo. Puedes venderle armas por el 35% del precio de recompra, obtener información sobre cajas de botín y comprarle abridores de cajas fuertes.",
        dialogue: {
          "[Tienda del navegador]": [{ dialogue: "Comprar abridor de cajas fuertes [$10,000]" }],
          "¿Alguna caja valiosa hoy? [$200]": [
            { dialogue: "Hay una caja extraña que apenas pesa nada [2 Bitcoin]" },
            { dialogue: "Hay un pedido extraño en el manifiesto. Parece ser del Gobierno [2 Archivos Secretos y unidad USB]" },
            { dialogue: "Hay un envío de diamantes hoy en el manifiesto [2 Diamantes]" },
            { dialogue: "Hoy ha llegado un cargamento ilícito [1 Impresora de dinero]" },
            { dialogue: "Acaba de llegar un gran cargamento de gemas [4 gemas en total (diamantes, amatista, esmeraldas, rubíes, zafiros)]" },
            { dialogue: "Llegó un pedido del banco: un gran envío de efectivo [+10K en efectivo]" },
            { dialogue: "Vi un pedido de Oasis Jewelry [5 joyas en total (Rollie, anillos de amatista/diamante/esmeralda/rubí/zafiro, collar de perlas, cadena de oro)]" },
            { dialogue: "Hay un pedido aquí de algunas piezas tecnológicas caras [PearPods, discos duros, PearWatches, PSU, GPU]" },
            { dialogue: "Hay algunas armas realmente pesadas [AWM, RPG, M60, M4A1]" },
            { dialogue: "Vi un envío de algunas armas de grado militar [AWM, ARX, SPAS, RPG, AK47]" },
            { dialogue: "Parece un envío de tecnología gold pear [2 Goldbooks, 2 Goldphones, 2 Gold Pods, 2 Gold Watches]" }
          ],
          "Quiero vender un arma": [
            { dialogue: "Primero debes equipar un arma" },
            { dialogue: "Puedo darte $[Cash] por tu [Gun Name]" }
          ],
          "¿Quién eres?": [{ dialogue: "Soy el capataz aquí. Esta es mi operación. Todo lo que entra y sale de esta ciudad pasa primero por mí." }],
          "No importa": [{ dialogue: "De vuelta al trabajo [Salir del diálogo]" }]
        }
      },
      pt: {
        location: "Porto de Oasis City",
        description: "O atual gerente do Porto de Oasis City, especializado em comércio marítimo. Você pode vender armas para ele por 35% do preço de recompra, obter informações sobre caixas de saque e comprar abridores de cofres com ele.",
        dialogue: {
          "[Loja do Navegador]": [{ dialogue: "Comprar Vault Cracker [$10.000]" }],
          "Alguma caixa valiosa hoje? [$200]": [
            { dialogue: "Tem uma caixa estranha que quase não pesa nada [2 Bitcoin]" },
            { dialogue: "Há um pedido estranho no manifesto. Parece ser do Governo [2 Arquivos Secretos e Flash Drive]" },
            { dialogue: "Há um carregamento de diamantes no manifesto hoje [2 Diamantes]" },
            { dialogue: "Alguma carga ilícita chegou hoje [1 Impressora de Dinheiro]" },
            { dialogue: "Uma grande remessa de joias acabou de chegar [4 Gemas no Total (Diamantes, Ametista, Esmeraldas, Rubis, Safiras)]" },
            { dialogue: "Chegou um pedido do banco – remessa de dinheiro vivo [+10K Cash]" },
            { dialogue: "Vi um pedido da Oasis Jewelry [5 Joias no Total (Rollie, Anéis de Ametista/Diamante/Esmeralda/Rubi/Safira, Colar de Pérolas, Corrente de Ouro)]" },
            { dialogue: "Tem um pedido aqui para algumas peças de tecnologia caras [PearPods, HDDs, PearWatches, PSU, GPU]" },
            { dialogue: "Existem algumas armas realmente pesadas [AWM, RPG, M60, M4A1]" },
            { dialogue: "Vi um carregamento de algumas armas de nível militar [AWM, ARX, SPAS, RPG, AK47]" },
            { dialogue: "Parece uma remessa de tecnologia gold pear [2 Goldbooks, 2 Goldphones, 2 Gold Pods, 2 Gold Watches]" }
          ],
          "Eu quero vender uma arma": [
            { dialogue: "Você precisa equipar uma arma primeiro" },
            { dialogue: "Eu posso conseguir $[Cash] pela sua [Gun Name]" }
          ],
          "Quem é você?": [{ dialogue: "Eu sou o capataz aqui. Esta é a minha operação. Tudo o que entra e sai desta cidade passa primeiro por mim" }],
          "Esquece": [{ dialogue: "De volta ao trabalho [Sair do Diálogo]" }]
        }
      },
      ru: {
        location: "Порт Оазис-Сити",
        description: "Действующий менеджер порта Оазис-Сити, специализирующийся на заморской торговле. Вы можете продать ему оружие за 35% от цены выкупа, получить информацию о ящиках с добычей и купить у него взломщики хранилищ.",
        dialogue: {
          "[Браузерный магазин]": [{ dialogue: "Купить взломщик хранилищ [$10 000]" }],
          "Есть ценные грузы сегодня? [$200]": [
            { dialogue: "Тут есть странный ящик, который почти ничего не весит [2 биткоина]" },
            { dialogue: "В манифесте странный заказ. Похоже на правительственный [2 секретных файла и флеш-накопитель]" },
            { dialogue: "Сегодня в манифесте партия алмазов [2 алмаза]" },
            { dialogue: "Сегодня прибыл незаконный груз [1 денежный принтер]" },
            { dialogue: "Прибыла большая партия драгоценных камней [всего 4 камня (алмазы, аметист, изумруды, рубины, сапфиры)]" },
            { dialogue: "Пришел заказ из банка — крупная партия налички [+10 тыс. кэша]" },
            { dialogue: "Видел заказ от Oasis Jewelry [всего 5 украшений (Rollie, кольца с аметистом/бриллиантом/изумрудом/рубином/сапфиром, жемчужное ожерелье, золотая цепочка)]" },
            { dialogue: "Тут заказ на дорогие запчасти [PearPods, жесткие диски, PearWatches, БП, видеокарты]" },
            { dialogue: "Тут есть действительно тяжелое вооружение [AWM, RPG, M60, M4A1]" },
            { dialogue: "Видел партию оружия военного назначения [AWM, ARX, SPAS, RPG, AK47]" },
            { dialogue: "Похоже на партию техники Gold Pear [2 Goldbook, 2 Goldphone, 2 Gold Pods, 2 Gold Watch]" }
          ],
          "Я хочу продать пушку": [
            { dialogue: "Сначала нужно экипировать оружие" },
            { dialogue: "Я дам тебе $[Cash] за твой [Gun Name]" }
          ],
          "Ты кто такой?": [{ dialogue: "Я здесь прораб. Это мое хозяйство. Всё, что ввозится и вывозится из этого города, сначала проходит через меня." }],
          "Неважно": [{ dialogue: "За работу [Выход из диалога]" }]
        }
      },
      ar: {
        location: "ميناء مدينة الواحة",
        description: "المدير الحالي لميناء مدينة الواحة، متخصص في التجارة عبر البحار. يمكنك بيع الأسلحة له مقابل 35% من سعر إعادة الشراء، والحصول على معلومات حول صناديق الغنائم، وشراء أدوات فتح الخزائن منه.",
        dialogue: {
          "[متجر المتصفح]": [{ dialogue: "شراء أداة فتح الخزنة [10,000 دولار]" }],
          "هل توجد أي صناديق قيمة اليوم؟ [200 دولار]": [
            { dialogue: "هناك صندوق غريب لا يزن شيئاً تقريباً [2 بيتكوين]" },
            { dialogue: "هناك طلب غريب في البيان. يبدو أنه حكومي [ملفان سريان ووحدة ذاكرة فلاش]" },
            { dialogue: "هناك شحنة من الألماس في البيان اليوم [ألماستان]" },
            { dialogue: "وصلت بعض الشحنات غير المشروعة اليوم [طابعة أموال واحدة]" },
            { dialogue: "وصلت شحنة كبيرة من الأحجار الكريمة للتو [4 أحجار كريمة إجمالاً (ألماس، جمشت، زمرد، ياقوت أحمر، ياقوت أزرق)]" },
            { dialogue: "وصل طلب من البنك - شحنة نقدية كبيرة [+10 آلاف نقداً]" },
            { dialogue: "رأيت طلباً من مجوهرات الواحة [5 مجوهرات إجمالاً (رولي، خواتم جمشت/ألماس/زمرد/ياقوت أحمر/ياقوت أزرق، عقد لؤلؤ، سلسلة ذهبية)]" },
            { dialogue: "يوجد طلب هنا لبعض القطع التقنية الباهظة [PearPods، أقراص صلبة، PearWatches، وحدة إمداد طاقة، وحدة معالجة رسومات]" },
            { dialogue: "هناك بعض الأسلحة الثقيلة حقاً [AWM, RPG, M60, M4A1]" },
            { dialogue: "رأيت شحنة من بعض الأسلحة العسكرية [AWM, ARX, SPAS, RPG, AK47]" },
            { dialogue: "تبدو وكأنها شحنة من أجهزة 'جولد بير' التقنية [2 Goldbooks، 2 Goldphones، 2 Gold Pods، 2 Gold Watches]" }
          ],
          "أريد بيع سلاح": [
            { dialogue: "يجب عليك تجهيز السلاح أولاً" },
            { dialogue: "يمكنني أن أعطيك $[Cash] مقابل [Gun Name] الخاص بك" }
          ],
          "من أنت؟": [{ dialogue: "أنا المشرف هنا. هذه عمليتي. كل ما يدخل ويخرج من هذه المدينة يمر عبري أولاً" }],
          "لا يهم": [{ dialogue: "عد إلى العمل [خروج من الحوار]" }]
        }
      },
      tr: {
        location: "Oasis Şehri Limanı",
        description: "Denizaşırı ticaret konusunda uzmanlaşmış Oasis Şehri Limanı'nın mevcut müdürü. Ona silahlarını geri alım fiyatının %35'i karşılığında satabilir, ganimet kasaları hakkında bilgi alabilir ve kasa kırıcıları ondan satın alabilirsin.",
        dialogue: {
          "[Tarayıcı Mağazası]": [{ dialogue: "Kasa Kırıcı Satın Al [10.000 $]" }],
          "Bugün değerli kasa var mı? [200 $]": [
            { dialogue: "Neredeyse hiç ağırlığı olmayan tuhaf bir kasa var [2 Bitcoin]" },
            { dialogue: "Manifestoda garip bir sipariş var. Hükümete ait gibi görünüyor [2 Gizli Dosya ve Flash Bellek]" },
            { dialogue: "Bugün manifestoda bir elmas sevkiyatı var [2 Elmas]" },
            { dialogue: "Bugün bazı yasadışı kargolar geldi [1 Para Basma Makinesi]" },
            { dialogue: "Büyük bir mücevher sevkiyatı yeni geldi [Toplam 4 Mücevher (Elmas, Ametist, Zümrüt, Yakut, Safir)]" },
            { dialogue: "Bankadan bir sipariş geldi; büyük bir nakit sevkiyatı [+10 bin Nakit]" },
            { dialogue: "Oasis Kuyumcusu'ndan bir sipariş gördüm [Toplam 5 Takı (Rollie, Ametist/Elmas/Zümrüt/Yakut/Safir Yüzükler, İnci Kolye, Altın Zincir)]" },
            { dialogue: "Burada bazı pahalı teknoloji parçaları için bir sipariş var [PearPods, HDD'ler, PearWatches, PSU, GPU]" },
            { dialogue: "Gerçekten ağır silahlar var [AWM, RPG, M60, M4A1]" },
            { dialogue: "Askeri düzeyde bazı silahların sevkiyatını gördüm [AWM, ARX, SPAS, RPG, AK47]" },
            { dialogue: "Altın armut teknolojisi sevkiyatı gibi görünüyor [2 Goldbook, 2 Goldphone, 2 Gold Pods, 2 Gold Watch]" }
          ],
          "Bir silah satmak istiyorum": [
            { dialogue: "Önce bir silah kuşanmalısın" },
            { dialogue: "Senin [Gun Name] silahın için sana $[Cash] verebilirim" }
          ],
          "Sen kimsin?": [{ dialogue: "Buradaki ustabaşı benim. Bu operasyon benden sorulur. Bu şehre giren ve çıkan her şey önce benim üzerimden geçer." }],
          "Boşver": [{ dialogue: "İşinin başına dön [Diyalogdan Çık]" }]
        }
      },
      zh: {
        location: "绿洲城港口",
        description: "绿洲城港口的现任经理，专门从事海外贸易。你可以按枪支回购价格的 35% 将其卖给该经理，获取有关战利品箱的信息，并从其处购买金库破解器。",
        dialogue: {
          "[浏览器商店]": [{ dialogue: "购买金库破解器 [$10,000]" }],
          "今天由值钱的板箱吗？ [$200]": [
            { dialogue: "有一个奇怪的板箱，几乎没有任何重量 [2 个比特币]" },
            { dialogue: "货单上有一个奇怪的订单。看起来是政府的 [2 份秘密档案和闪存盘]" },
            { dialogue: "今天的货单上有一批钻石 [2 颗钻石]" },
            { dialogue: "今天到了一些非法货物 [1 台印钞机]" },
            { dialogue: "刚到了一大批宝石 [共 4 颗宝石（钻石、紫水晶、祖母绿、红宝石、蓝宝石）]" },
            { dialogue: "银行的一个订单到了——大额现金运输 [+10K 现金]" },
            { dialogue: "看到了绿洲珠宝店的一个订单 [共 5 件珠宝（Rollie、紫水晶/钻石/祖母绿/红宝石/蓝宝石戒指、珍珠项链、金链子）]" },
            { dialogue: "这里有一个购买昂贵科技零件的订单 [PearPods、硬盘、PearWatches、电源、显卡]" },
            { dialogue: "这里有一些真正的重型武器 [AWM、RPG、M60、M4A1]" },
            { dialogue: "我看到了一批军用级武器 [AWM、ARX、SPAS、RPG、AK47]" },
            { dialogue: "看起来是一批金梨科技产品 [2 台 Goldbook、2 部 Goldphone、2 个 Gold Pods、2 块金表]" }
          ],
          "我想卖掉一把枪": [
            { dialogue: "你得先装备一把枪" },
            { dialogue: "我可以为你的 [Gun Name] 支付 $[Cash]" }
          ],
          "你谁啊？": [{ dialogue: "我是这里的领班。这是我的地盘。进出这座城的所有东西都要先经过我。" }],
          "算了": [{ dialogue: "回位子上干活去 [退出对话]" }]
        }
      }
    },
    location: "Oasis City Port",
    description: "The current manager of Oasis City Port, specializing in across the sea trading. You can sell guns to him for 35% of the guns re-buy price, get info on loot crates, and buy the vault crackers from him.",
    dialogue: {
      "[Browser Shop]": [
        { dialogue: "Buy Vault Cracker [$10,000]" }
      ],
      "Any valuable crates today? [$200]": [
        { dialogue: "Theres a weird crate that hardly weighs anything [2 Bitcoin]" },
        { dialogue: "Theres a strange order on the manifest. Looks to be Government [2 Secret Files and Flash Drive]" },
        { dialogue: "There's a shipment of diamonds on the manifest today [2 Diamonds]" },
        { dialogue: "Some illicit cargo came in today [1 Money Printer]" },
        { dialogue: "Big shipment of gems just came in [4 Gems Total (Diamonds, Amethyst, Emeralds, Rubies, Sapphires)]" },
        { dialogue: "An order from the bank came in - big cash shipment [+10K Cash]" },
        { dialogue: "Saw an order from Oasis Jewelry [5 Jewelry Total (Rollie, Amethyst/Diamond/Emerald/Ruby/Sapphire Rings, Pearl Necklace, Gold Chain)]" },
        { dialogue: "Theres an order here for some expensive tech parts [PearPods, HDDs, PearWatches, PSU, GPU]" },
        { dialogue: "There's some real heavy weapons [AWM, RPG, M60, M4A1]" },
        { dialogue: "I saw a shipment of some military-grade weapons [AWM, ARX, SPAS, RPG, AK47]" },
        { dialogue: "Looks like a shipment of gold pear tech [2 Goldbooks, 2 Goldphones, 2 Gold Pods, 2 Gold Watches]" }
      ],
      "I want to sell a gun": [
        { dialogue: "You need to equip a gun first" },
        { dialogue: "I can get you $[Cash] for your [Gun Name]" }
      ],
      "Who are you?": [
        { dialogue: "I am the foreman here. This is my operation. Everything that comes in and out of this city comes through me first" }
      ],
      "Nevermind": [
        { dialogue: "Back to work [Exit Dialogue]" }
      ]
    }
  },
  {
    name: "Ofy",
    showMoreButton: true,
    team: "CRIMINAL",
    translations: {
      en: {
        location: "Ofys Value Pawn",
        description: "Ofy is the main guy where you can sell your hard earned (stolen) loot. He gives cash instantly but at a lower price point than Sir.B."
      },
      fr: {
        location: "Prêteur sur gages d'Ofy",
        description: "Ofy est le gars principal à qui vous pouvez vendre votre butin durement gagné (volé). Il donne de l'argent instantanément mais à un prix inférieur à celui de Sir.B."
      },
      de: {
        location: "Ofys Value Pawn",
        description: "Ofy ist der Hauptansprechpartner, bei dem du deine hart verdiente (gestohlene) Beute verkaufen kannst. Er zahlt sofort bar, aber zu einem niedrigeren Preis als Sir. B."
      },
      es: {
        location: "Casa de empeños de Ofy",
        description: "Ofy es el tipo principal al que puedes vender tu botín ganado con esfuerzo (robado). Da dinero en efectivo al instante pero a un precio más bajo que Sir.B."
      },
      pt: {
        location: "Loja de Penhores do Ofy",
        description: "Ofy é o cara principal onde você pode vender seu saque arduamente ganho (roubado). Ele dá dinheiro instantaneamente, mas a um preço inferior ao de Sir.B."
      },
      ru: {
        location: "Ломбард Офи",
        description: "Офи — главный парень, которому можно продать честно заработанную (украденную) добычу. Он выдает наличные мгновенно, но по более низкой цене, чем Сир Б."
      },
      ar: {
        location: "محل رهونات أوفي",
        description: "أوفي هو الرجل الأساسي الذي يمكنك بيع غنائمك التي كسبتها بجهدك (المسروقة) له. إنه يعطي نقوداً فورية ولكن بسعر أقل من السير ب."
      },
      tr: {
        location: "Ofy'nin Rehin Dükkanı",
        description: "Ofy, binbir güçlükle kazandığın (çaldığın) ganimetlerini satabileceğin asıl adamdır. Parayı anında verir ama Sir. B'den daha düşük bir fiyata."
      },
      zh: {
        location: "Ofy 的典当行",
        description: "Ofy 是你可以出售辛苦得来（偷来）的战利品的主要对象。他立即支付现金，但价格比 Sir.B 低。"
      }
    },
    location: "Ofys Value Pawn",
    description: "Ofy is the main guy where you can sell your hard earned (stolen) loot. He gives cash instantly but at a lower price point than Sir.B."
  }
];