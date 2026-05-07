const STORE_DATA = [
    {
        name: "Restore Lost Items",
        robuxPrice: 19,
        translations: {
            fr: { name: "Restaurer objets perdus", description: "Restaure les objets perdus après la mort." },
            de: { name: "Verlorene Items wiederherstellen", description: "Stellt nach dem Tod verlorene Gegenstände wieder her." },
            es: { name: "Restaurar objetos perdidos", description: "Restaura los objetos perdidos tras la muerte." },
            pt: { name: "Restaurar itens perdidos", description: "Restaura itens perdidos após a morte." },
            ru: { name: "Восстановить потерянные предметы", description: "Восстанавливает предметы, потерянные после смерти." },
            ar: { name: "استعادة العناصر المفقودة", description: "يستعيد العناصر المفقودة بعد الموت." },
            tr: { name: "Kayıp Eşyaları Geri Getir", description: "Ölümden sonra kaybolan eşyaları geri getirir." },
            zh: { name: "恢复丢失物品", description: "恢复死后丢失的物品。" }
        },
        description: "Restores items lost after death."
    },
    {
        name: "+30 Bag Boost: 12 Hours",
        robuxPrice: 999,
        translations: {
            fr: { name: "Boost Sac +30 : 12 h", description: "Augmente la capacité de votre sac de 30 pendant 12 heures. [Le temps s'écoule même hors-jeu]" },
            de: { name: "+30 Taschen-Boost: 12 Stunden", description: "Erhöht deine Taschenkapazität 12 Stunden lang um 30. [Die Zeit läuft auch weiter, wenn du nicht im Spiel bist]" },
            es: { name: "Mejora de bolsa +30: 12 horas", description: "Aumenta la capacidad de tu bolsa en 30 durante 12 horas. [El tiempo sigue corriendo incluso fuera del juego]" },
            pt: { name: "Boost de Mochila +30: 12 Horas", description: "Aumenta a capacidade da sua mochila em 30 por 12 horas. [O tempo diminui mesmo fora do jogo]" },
            ru: { name: "+30 к вместимости сумки: 12 часов", description: "Увеличивает вместимость сумки на 30 на 12 часов. [Время идет даже когда вы не в игре]" },
            ar: { name: "تعزيز الحقيبة +30: 12 ساعة", description: "يزيد من سعة حقيبتك بمقدار 30 لمدة 12 ساعة. [الوقت ينقص حتى عندما لا تكون في اللعبة]" },
            tr: { name: "+30 Çanta Takviyesi: 12 Saat", description: "Çanta kapasitenizi 12 saat boyunca 30 artırır. [Süre oyun dışında bile azalmaya devam eder]" },
            zh: { name: "+30 背包加成：12 小时", description: "增加 30 点背包容量，持续 12 小时。[即使不在游戏中，时间也会继续减少]" }
        },
        description: "Increases your bag capacity by 30 for 12 hours. [Time goes down even when not in-game]"
    },
    {
        name: "+20 Bag Boost: 12 Hours",
        robuxPrice: 699,
        translations: {
            fr: { name: "Boost Sac +20 : 12 h", description: "Augmente la capacité de votre sac de 20 pendant 12 heures. [Le temps s'écoule même hors-jeu]" },
            de: { name: "+20 Taschen-Boost: 12 Stunden", description: "Erhöht deine Taschenkapazität 12 Stunden lang um 20. [Die Zeit läuft auch weiter, wenn du nicht im Spiel bist]" },
            es: { name: "Mejora de bolsa +20: 12 horas", description: "Aumenta la capacidad de tu bolsa en 20 durante 12 horas. [El tiempo sigue corriendo incluso fuera del juego]" },
            pt: { name: "Boost de Mochila +20: 12 Horas", description: "Aumenta a capacidade da sua mochila em 20 por 12 horas. [O tempo diminui mesmo fora do jogo]" },
            ru: { name: "+20 к вместимости сумки: 12 часов", description: "Увеличивает вместимость сумки на 20 на 12 часов. [Время идет даже когда вы не в игре]" },
            ar: { name: "تعزيز الحقيبة +20: 12 ساعة", description: "يزيد من سعة حقيبتك بمقدار 20 لمدة 12 ساعة. [الوقت ينقص حتى عندما لا تكون في اللعبة]" },
            tr: { name: "+20 Çanta Takviyesi: 12 Saat", description: "Çanta kapasitenizi 12 saat boyunca 20 artırır. [Süre oyun dışında bile azalmaya devam eder]" },
            zh: { name: "+20 背包加成：12 小时", description: "增加 20 点背包容量，持续 12 小时。[即使不在游戏中，时间也会继续减少]" }
        },
        description: "Increases your bag capacity by 20 for 12 hours. [Time goes down even when not in-game]"
    },
    {
        name: "+15 Bag Boost: 12 Hours",
        robuxPrice: 399,
        translations: {
            fr: { name: "Boost Sac +15 : 12 h", description: "Augmente la capacité de votre sac de 15 pendant 12 heures. [Le temps s'écoule même hors-jeu]" },
            de: { name: "+15 Taschen-Boost: 12 Stunden", description: "Erhöht deine Taschenkapazität 12 Stunden lang um 15. [Die Zeit läuft auch weiter, wenn du nicht im Spiel bist]" },
            es: { name: "Mejora de bolsa +15: 12 horas", description: "Aumenta la capacidad de tu bolsa en 15 durante 12 horas. [El tiempo sigue corriendo incluso fuera del juego]" },
            pt: { name: "Boost de Mochila +15: 12 Horas", description: "Aumenta a capacidade da sua mochila em 15 por 12 horas. [O tempo diminui mesmo fora do jogo]" },
            ru: { name: "+15 к вместимости сумки: 12 часов", description: "Увеличивает вместимость сумки на 15 на 12 часов. [Время идет даже когда вы не в игре]" },
            ar: { name: "تعزيز الحقيبة +15: 12 ساعة", description: "يزيد من سعة حقيبتك بمقدار 15 لمدة 12 ساعة. [الوقت ينقص حتى عندما لا تكون في اللعبة]" },
            tr: { name: "+15 Çanta Takviyesi: 12 Saat", description: "Çanta kapasitenizi 12 saat boyunca 15 artırır. [Süre oyun dışında bile azalmaya devam eder]" },
            zh: { name: "+15 背包加成：12 小时", description: "增加 15 点背包容量，持续 12 小时。[即使不在游戏中，时间也会继续减少]" }
        },
        description: "Increases your bag capacity by 15 for 12 hours. [Time goes down even when not in-game]"
    },
    {
        name: "+5 Bag Boost: 12 Hours",
        robuxPrice: 19,
        translations: {
            fr: { name: "Boost Sac +5 : 12 h", description: "Augmente la capacité de votre sac de 5 pendant 12 heures. [Le temps s'écoule même hors-jeu]" },
            de: { name: "+5 Taschen-Boost: 12 Stunden", description: "Erhöht deine Taschenkapazität 12 Stunden lang um 5. [Die Zeit läuft auch weiter, wenn du nicht im Spiel bist]" },
            es: { name: "Mejora de bolsa +5: 12 horas", description: "Aumenta la capacidad de tu bolsa en 5 durante 12 horas. [El tiempo sigue corriendo incluso fuera del juego]" },
            pt: { name: "Boost de Mochila +5: 12 Horas", description: "Aumenta a capacidade da sua mochila em 5 por 12 horas. [O tempo diminui mesmo fora do jogo]" },
            ru: { name: "+5 к вместимости сумки: 12 часов", description: "Увеличивает вместимость сумки на 5 на 12 часов. [Время идет даже когда вы не в игре]" },
            ar: { name: "تعزيز الحقيبة +5: 12 ساعة", description: "يزيد من سعة حقيبتك بمقدار 5 لمدة 12 ساعة. [الوقت ينقص حتى عندما لا تكون في اللعبة]" },
            tr: { name: "+5 Çanta Takviyesi: 12 Saat", description: "Çanta kapasitenizi 12 saat boyunca 5 artırır. [Süre oyun dışında bile azalmaya devam eder]" },
            zh: { name: "+5 背包加成：12 小时", description: "增加 5 点背包容量，持续 12 小时。[即使不在游戏中，时间也会继续减少]" }
        },
        description: "Increases your bag capacity by 5 for 12 hours. [Time goes down even when not in-game]"
    },
    {
        name: "+10 Bag Boost: 12 Hours",
        robuxPrice: 99,
        translations: {
            fr: { name: "Boost Sac +10 : 12 h", description: "Augmente la capacité de votre sac de 10 pendant 12 heures. [Le temps s'écoule même hors-jeu]" },
            de: { name: "+10 Taschen-Boost: 12 Stunden", description: "Erhöht deine Taschenkapazität 12 Stunden lang um 10. [Die Zeit läuft auch weiter, wenn du nicht im Spiel bist]" },
            es: { name: "Mejora de bolsa +10: 12 horas", description: "Aumenta la capacidad de tu bolsa en 10 durante 12 horas. [El tiempo sigue corriendo incluso fuera del juego]" },
            pt: { name: "Boost de Mochila +10: 12 Horas", description: "Aumenta a capacidade da sua mochila em 10 por 12 horas. [O tempo diminui mesmo fora do jogo]" },
            ru: { name: "+10 к вместимости сумки: 12 часов", description: "Увеличивает вместимость сумки на 10 на 12 часов. [Время идет даже когда вы не в игре]" },
            ar: { name: "تعزيز الحقيبة +10: 12 ساعة", description: "يزيد من سعة حقيبتك بمقدار 10 لمدة 12 ساعة. [الوقت ينقص حتى عندما لا تكون في اللعبة]" },
            tr: { name: "+10 Çanta Takviyesi: 12 Saat", description: "Çanta kapasitenizi 12 saat boyunca 10 artırır. [Süre oyun dışında bile azalmaya devam eder]" },
            zh: { name: "+10 背包加成：12 小时", description: "增加 10 点背包容量，持续 12 小时。[即使不在游戏中，时间也会 continue 减少]" }
        },
        description: "Increases your bag capacity by 10 for 12 hours. [Time goes down even when not in-game]"
    },
    {
        name: "Zoro + Zorvello",
        robuxPrice: 2499,
        translations: {
            fr: { name: "Zoro + Zorvello", description: "Débloque la voiture Zoro & Zorvello." },
            de: { name: "Zoro + Zorvello", description: "Schaltet den Zoro & Zorvello Wagen frei." },
            es: { name: "Zoro + Zorvello", description: "Desbloquea el coche Zoro y Zorvello." },
            pt: { name: "Zoro + Zorvello", description: "Desbloqueia o carro Zoro & Zorvello." },
            ru: { name: "Zoro + Zorvello", description: "Разблокирует автомобиль Zoro & Zorvello." },
            ar: { name: "زورو + زورفيلو", description: "يفتح سيارة زورو زورفيلو." },
            tr: { name: "Zoro + Zorvello", description: "Zoro & Zorvello arabasının kilidini açar." },
            zh: { name: "Zoro + Zorvello", description: "解锁 Zoro 和 Zorvello 赛车。" }
        },
        description: "Unlocks the Zoro & Zorvello car."
    },
    {
        name: "Daily Printer",
        robuxPrice: 36,
        translations: {
            fr: { name: "Imprimante Quotidienne", description: "Donne x1 Imprimante de Billets à 50% du prix." },
            de: { name: "Tägliche Druckmaschine", description: "Gibt x1 Geld-Druckmaschine zum halben Preis." },
            es: { name: "Impresora diaria", description: "Otorga x1 impresora de dinero al 50% del precio." },
            pt: { name: "Impressora Diária", description: "Dá x1 Impressora de Dinheiro com 50% de desconto." },
            ru: { name: "Ежедневный принтер", description: "Дает 1 денежный принтер за полцены." },
            ar: { name: "طابعة يومية", description: "يعطي طابعة أموال واحدة بخصم 50%." },
            tr: { name: "Günlük Yazıcı", description: "Yarı fiyatına 1 adet Para Basma Makinesi verir." },
            zh: { name: "每日印钞机", description: "以 50% 的价格获得 1 台印钞机。" }
        },
        description: "Gives x1 Money Printera at 50% the price."
    },
    {
        name: "x11 Money Printer",
        robuxPrice: 675,
        translations: {
            fr: { name: "x11 Imprimantes de Billets", description: "Donne x11 Imprimantes de Billets et 2 supplémentaires pour le premier achat." },
            de: { name: "x11 Geld-Druckmaschinen", description: "Gibt x11 Geld-Druckmaschinen und 2 extra beim ersten Kauf." },
            es: { name: "x11 impresoras de dinero", description: "Otorga x11 impresoras de dinero y 2 adicionales por la primera compra." },
            pt: { name: "x11 Impressora de Dinheiro", description: "Dá x11 Impressoras de Dinheiro e mais 2 extras na primeira compra." },
            ru: { name: "11 денежных принтеров", description: "Дает 11 денежных принтеров и еще 2 дополнительных при первой покупке." },
            ar: { name: "11 طابعة أموال", description: "يعطي 11 طابعة أموال و2 إضافية عند الشراء الأول." },
            tr: { name: "x11 Para Basma Makinesi", description: "11 adet Para Basma Makinesi ve ilk satın alımda ekstra 2 adet verir." },
            zh: { name: "11 台印钞机", description: "获得 11 台印钞机，首次购买额外赠送 2 台。" }
        },
        description: "Gives x11 Money Printers and an extra 2 for first purchase."
    },
    {
        name: "Money Printer",
        robuxPrice: 75,
        translations: {
            fr: { name: "Imprimante de Billets", description: "Donne x1 Imprimante de Billets." },
            de: { name: "Geld-Druckmaschine", description: "Gibt x1 Geld-Druckmaschine." },
            es: { name: "Impresora de dinero", description: "Otorga x1 impresora de dinero." },
            pt: { name: "Impressora de Dinheiro", description: "Dá x1 Impressora de Dinheiro." },
            ru: { name: "Денежный принтер", description: "Дает 1 денежный принтер." },
            ar: { name: "طابعة أموال", description: "يعطي طابعة أموال واحدة." },
            tr: { name: "Para Basma Makinesi", description: "1 adet Para Basma Makinesi verir." },
            zh: { name: "印钞机", description: "获得 1 台印钞机。" }
        },
        description: "Gives x1 Money Printer."
    },
    {
        name: "Weapon Pack",
        robuxPrice: 199,
        translations: {
            fr: { name: "Pack d'Armes", description: "Un ensemble d'armes contenant le RPG, le Benelli M1014, l'UMP 45 et l'Uzi." },
            de: { name: "Waffenpaket", description: "Ein Waffenpaket mit RPG, Benelli M1014, UMP 45 und Uzi." },
            es: { name: "Paquete de armas", description: "Un paquete de armas que incluye el RPG, Benelli M1014, UMP 45 y Uzi." },
            pt: { name: "Pacote de Armas", description: "Um pacote de armas contendo a RPG, Benelli M1014, UMP 45 e Uzi." },
            ru: { name: "Набор оружия", description: "Набор оружия, содержащий РПГ, Benelli M1014, UMP 45 и Узи." },
            ar: { name: "حزمة الأسلحة", description: "حزمة من الأسلحة تحتوي على RPG وBenelli M1014 وUMP 45 وUzi." },
            tr: { name: "Silah Paketi", description: "RPG, Benelli M1014, UMP 45 ve Uzi içeren bir silah paketi." },
            zh: { name: "武器包", description: "包含 RPG、Benelli M1014、UMP 45 和 Uzi 的武器捆绑包。" }
        },
        description: "A bundle of weapons containing the RPG, Benelli M1014, UMP 45 and Uzi."
    },
    {
        name: "Mini-Vec Pack",
        robuxPrice: 649,
        translations: {
            fr: { name: "Pack Mini-Vec", description: "Comprend l'hélicoptère Mini Bird et le Kriss Vector." },
            de: { name: "Mini-Vec-Paket", description: "Enthält den Mini Bird Helikopter und die Kriss Vector." },
            es: { name: "Paquete Mini-Vec", description: "Incluye el helicóptero Mini Bird y el Kriss Vector." },
            pt: { name: "Pacote Mini-Vec", description: "Inclui o helicóptero Mini Bird e a Kriss Vector." },
            ru: { name: "Набор Mini-Vec", description: "Включает вертолет Mini Bird и Kriss Vector." },
            ar: { name: "حزمة ميني-فيك", description: "تتضمن مروحية ميني بيرد وكريس فيكتور." },
            tr: { name: "Mini-Vec Paketi", description: "Mini Bird helikopteri ve Kriss Vector içerir." },
            zh: { name: "Mini-Vec 包", description: "包含小鸟直升机和 Kriss Vector。" }
        },
        description: "Includes the Mini Bird helicopter and Kriss Vector "
    },
    {
        name: "Vanguard Pack",
        robuxPrice: 1899,
        translations: {
            fr: { name: "Pack Vanguard", description: "Comprend la voiture Vanguard, un SPAS-12 et x3 Imprimantes de Billets." },
            de: { name: "Vanguard-Paket", description: "Enthält den Vanguard Wagen, die SPAS-12 und 3 Geld-Druckmaschinen." },
            es: { name: "Paquete Vanguard", description: "Incluye el coche Vanguard, la SPAS-12 y x3 impresoras de dinero." },
            pt: { name: "Pacote Vanguard", description: "Inclui o carro Vanguard, SPAS-12 e 3 Impressoras de Dinheiro." },
            ru: { name: "Набор Vanguard", description: "Включает автомобиль Vanguard, SPAS-12 и 3 денежных принтера." },
            ar: { name: "حزمة فانغارد", description: "تتضمن سيارة فانغارد وسلاح SPAS-12 و3 طابعات أموال." },
            tr: { name: "Vanguard Paketi", description: "Vanguard arabası, SPAS-12 ve 3 adet Para Basma Makinesi içerir." },
            zh: { name: "先锋包", description: "包含先锋赛车、SPAS-12 和 3 台印钞机。" }
        },
        description: "Includes the Vanguard car, SPAS-12 and x3 Money Printers"
    },
    {
        name: "Get 2,500,000 Cash",
        robuxPrice: 3999,
        translations: {
            fr: { name: "Obtenir 2 500 000 cash", description: "Ajoute instantanément 2 500 000 cash à votre compte." },
            de: { name: "2.500.000 Bargeld erhalten", description: "Fügt deinem Konto sofort 2.500.000 Bargeld hinzu." },
            es: { name: "Obtener 2,500,000 en efectivo", description: "Añade instantáneamente 2,500,000 en efectivo a tu cuenta." },
            pt: { name: "Obter 2.500.000 em dinheiro", description: "Adiciona instantaneamente 2.500.000 em dinheiro à sua conta." },
            ru: { name: "Получить 2 500 000 наличных", description: "Мгновенно добавляет 2 500 000 наличных на ваш счет." },
            ar: { name: "الحصول على 2,500,000 نقداً", description: "يضيف فوراً 2,500,000 نقداً إلى حسابك." },
            tr: { name: "2.500.000 Nakit Al", description: "Hesabınıza anında 2.500.000 nakit ekler." },
            zh: { name: "获得 2,500,000 现金", description: "立即向您的账户添加 2,500,000 现金。" }
        },
        description: "Instantly adds 2,500,000 cash to your account."
    },
    {
        name: "Get 1,000,000 Cash",
        robuxPrice: 1749,
        translations: {
            fr: { name: "Obtenir 1 000 000 cash", description: "Ajoute instantanément 1 000 000 cash à votre compte." },
            de: { name: "1.000.000 Bargeld erhalten", description: "Fügt deinem Konto sofort 1.000.000 Bargeld hinzu." },
            es: { name: "Obtener 1,000,000 en efectivo", description: "Añade instantáneamente 1,000,000 en efectivo a tu cuenta." },
            pt: { name: "Obter 1.000.000 em dinheiro", description: "Adiciona instantaneamente 1.000.000 em dinheiro à sua conta." },
            ru: { name: "Получить 1 000 000 наличных", description: "Мгновенно добавляет 1 000 000 наличных на ваш счет." },
            ar: { name: "الحصول على 1,000,000 نقداً", description: "يضيف فوراً 1,000,000 نقداً إلى حسابك." },
            tr: { name: "1.000.000 Nakit Al", description: "Hesabınıza anında 1.000.000 nakit ekler." },
            zh: { name: "获得 1,000,000 现金", description: "立即向您的账户添加 1,000,000 现金。" }
        },
        description: "Instantly adds 1,000,000 cash to your account."
    },
    {
        name: "Get 400,000 Cash",
        robuxPrice: 749,
        translations: {
            fr: { name: "Obtenir 400 000 cash", description: "Ajoute instantanément 400 000 cash à votre compte." },
            de: { name: "400.000 Bargeld erhalten", description: "Fügt deinem Konto sofort 400.000 Bargeld hinzu." },
            es: { name: "Obtener 400,000 en efectivo", description: "Añade instantáneamente 400,000 en efectivo a tu cuenta." },
            pt: { name: "Obter 400.000 em dinheiro", description: "Adiciona instantaneamente 400.000 em dinheiro à sua conta." },
            ru: { name: "Получить 400 000 наличных", description: "Мгновенно добавляет 400 000 наличных на ваш счет." },
            ar: { name: "الحصول على 400,000 نقداً", description: "يضيف فوراً 400,000 نقداً إلى حسابك." },
            tr: { name: "400.000 Nakit Al", description: "Hesabınıza anında 400.000 nakit ekler." },
            zh: { name: "获得 400,000 现金", description: "立即向您的账户添加 400,000 现金。" }
        },
        description: "Instantly adds 400,000 cash to your account."
    },
    {
        name: "Get 200,000 Cash",
        robuxPrice: 379,
        translations: {
            fr: { name: "Obtenir 200 000 cash", description: "Ajoute instantanément 200 000 cash à votre compte." },
            de: { name: "200.000 Bargeld erhalten", description: "Fügt deinem Konto sofort 200.000 Bargeld hinzu." },
            es: { name: "Obtener 200,000 en efectivo", description: "Añade instantáneamente 200,000 en efectivo a tu cuenta." },
            pt: { name: "Obter 200.000 em dinheiro", description: "Adiciona instantaneamente 200.000 em dinheiro à sua conta." },
            ru: { name: "Получить 200 000 наличных", description: "Мгновенно добавляет 200 000 наличных на ваш счет." },
            ar: { name: "الحصول على 200,000 نقداً", description: "يضيف فوراً 200,000 نقداً إلى حسابك." },
            tr: { name: "200.000 Nakit Al", description: "Hesabınıza anında 200.000 nakit ekler." },
            zh: { name: "获得 200,000 现金", description: "立即向您的账户添加 200,000 现金。" }
        },
        description: "Instantly adds 200,000 cash to your account."
    },
    {
        name: "Get 50,000 Cash",
        robuxPrice: 99,
        translations: {
            fr: { name: "Obtenir 50 000 cash", description: "Ajoute instantanément 50 000 cash à votre compte." },
            de: { name: "50.000 Bargeld erhalten", description: "Fügt deinem Konto sofort 50.000 Bargeld hinzu." },
            es: { name: "Obtener 50,000 en efectivo", description: "Añade instantáneamente 50,000 en efectivo a tu cuenta." },
            pt: { name: "Obter 50.000 em dinheiro", description: "Adiciona instantaneamente 50.000 em dinheiro à sua conta." },
            ru: { name: "Получить 50 000 наличных", description: "Мгновенно добавляет 50 000 наличных на ваш счет." },
            ar: { name: "الحصول على 50,000 نقداً", description: "يضيف فوراً 50,000 نقداً إلى حسابك." },
            tr: { name: "50.000 Nakit Al", description: "Hesabınıza anında 50.000 nakit ekler." },
            zh: { name: "获得 50,000 现金", description: "立即向您的账户添加 50,000 现金。" }
        },
        description: "Instantly adds 50,000 cash to your account."
    }
];
