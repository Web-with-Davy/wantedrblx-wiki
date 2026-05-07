const GAME_MISSIONS = [
  {
    id: "bank-heist",
    showMoreButton: true,
    title: "Bank Heist",
    translations: {
      en: {
        title: "Bank Heist",
        location: "Tutorial",
        description: "We've been watching you. Don't know who we are? Good, let's keep it that way for now. If you want to be a real criminal, you're going to have to prove you're worthy by doing a big job. Hit the central bank downtown and that will get you our respect.",
        howToComplete: "Locate the Bank, use the elevator, rob the vault, and escape."
      },
      fr: {
        title: "Braquage de Banque",
        location: "Tutoriel",
        description: "On vous surveille. Vous ne savez pas qui on est ? Bien, gardons ça comme ça pour l'instant. Si vous voulez être un vrai criminel, vous allez devoir prouver votre valeur en faisant un gros coup. Frappez la banque centrale du centre-ville et vous gagnerez notre respect.",
        howToComplete: "Localisez la banque, utilisez l'ascenseur, braquez le coffre-fort et échappez-vous."
      },
      de: {
        title: "Banküberfall",
        location: "Tutorial",
        description: "Wir haben dich beobachtet. Du weißt nicht, wer wir sind? Gut, lassen wir das fürs Erste so. Wenn du ein richtiger Verbrecher sein willst, musst du deine Würdigkeit beweisen, indem du einen großen Job erledigst. Überfalle die Zentralbank in der Innenstadt, dann hast du unseren Respekt.",
        howToComplete: "Finde die Bank, benutze den Aufzug, raube den Tresor aus und entkomme."
      },
      es: {
        title: "Atraco al Banco",
        location: "Tutorial",
        description: "Te hemos estado observando. ¿No sabes quiénes somos? Bien, mantengámoslo así por ahora. Si quieres ser un verdadero criminal, vas a tener que demostrar que eres digno haciendo un trabajo importante. Atraca el banco central del centro y eso te ganará nuestro respeto.",
        howToComplete: "Localiza el banco, usa el ascensor, roba la bóveda y escapa."
      },
      pt: {
        title: "Assalto ao Banco",
        location: "Tutorial",
        description: "Estamos de olho em você. Não sabe quem somos? Ótimo, vamos manter assim por enquanto. Se quiser ser um criminoso de verdade, terá que provar seu valor fazendo um grande trabalho. Ataque o banco central no centro da cidade e isso nos fará respeitá-lo.",
        howToComplete: "Localize o banco, use o elevador, roube o cofre e escape."
      },
      ru: {
        title: "Ограбление банка",
        location: "Обучение",
        description: "Мы за тобой наблюдаем. Не знаешь, кто мы? Хорошо, давай пока так и оставим. Если хочешь стать настоящим преступником, тебе придется доказать свою состоятельность, провернув крупное дело. Ограбь центральный банк в центре города, и ты заслужишь наше уважение.",
        howToComplete: "Найдите банк, воспользуйтесь лифтом, ограбьте хранилище и скройтесь."
      },
      ar: {
        title: "سطو على البنك",
        location: "تعليمي",
        description: "لقد كنا نراقبك. لا تعرف من نحن؟ جيد، فلنترك الأمر هكذا في الوقت الحالي. إذا كنت تريد أن تصبح مجرمًا حقيقيًا، فسيتعين عليك إثبات جدارتك من خلال القيام بعمل كبير. اضرب البنك المركزي في وسط المدينة وسينال ذلك احترامنا.",
        howToComplete: "حدد موقع البنك، استخدم المصعد، اسرق الخزنة، واهرب."
      },
      tr: {
        title: "Banka Soygunu",
        location: "Eğitim",
        description: "Seni izliyoruz. Kim olduğumuzu bilmiyor musun? Güzel, şimdilik öyle kalsın. Gerçek bir suçlu olmak istiyorsan, büyük bir iş yaparak layık olduğunu kanıtlaman gerekecek. Şehir merkezindeki merkez bankasını vur; bu bizim saygımızı kazanmanı sağlayacak.",
        howToComplete: "Bankayı bul, asansörü kullan, kasayı soy ve kaç."
      },
      zh: {
        title: "银行大劫案",
        location: "教程",
        description: "我们一直在观察你。不知道 we 是谁？很好，暂时就这样吧。如果你想成为一名真正的罪犯，你必须通过干一桩大事来证明你的价值。袭击市中心的中央银行，那会赢得我们的尊重。",
        howToComplete: "定位银行，使用电梯，抢劫金库并逃脱。"
      }
    },
    location: "Tutorial",
    description: "We've been watching you. Don't know who we are? Good, let's keep it that way for now. If you want to be a real criminal, you're going to have to prove you're worthy by doing a big job. Hit the central bank downtown and that will get you our respect.",
    howToComplete: "Locate the Bank, use the elevator, rob the vault, and escape.",
    difficulty: "EASY",
    missionType: "Game",
    rewards: ["$5,000"]
  },
  {
    id: "get-rolling",
    showMoreButton: true,
    title: "Get Rolling",
    translations: {
      en: {
        title: "Get Rolling",
        location: "Tutorial",
        description: "Navigating the terrain of the Oasis is challenging, so let's get you a new set of wheels. Go to the Bayview Dealership and ask for Cody. He'll be expecting you.",
        howToComplete: "Locate the Dealership, talk to Cody, and purchase the Nomad for free."
      },
      fr: {
        title: "En Route",
        location: "Tutoriel",
        description: "Naviguer sur le terrain de l'Oasis est difficile, alors allons vous chercher un nouveau jeu de roues. Allez concessionnaire de Bayview et demandez Cody. Il vous attendra.",
        howToComplete: "Localisez le concessionnaire, parlez à Cody et achetez le Nomad gratuitement."
      },
      de: {
        title: "Roll Los",
        location: "Tutorial",
        description: "Das Gelände der Oasis zu befahren ist eine Herausforderung, also besorgen wir dir einen neuen fahrbaren Untersatz. Geh zum Autohaus in Bayview und frag nach Cody. Er wird dich erwarten.",
        howToComplete: "Finde das Autohaus, sprich mit Cody und kaufe den Nomad kostenlos."
      },
      es: {
        title: "En Marcha",
        location: "Tutorial",
        description: "Navegar por el terreno de Oasis es un desafío, así que vamos a conseguirte un nuevo par de ruedas. Ve al concesionario de Bayview y pregunta por Cody. Él te estará esperando.",
        howToComplete: "Localiza el concesionario, habla con Cody y compra el Nomad gratis."
      },
      pt: {
        title: "Pegando a Estrada",
        location: "Tutorial",
        description: "Navegar pelo terreno de Oasis é um desafio, então vamos conseguir um novo conjunto de rodas para você. Vá até a concessionária Bayview e procure pelo Cody. Ele estará esperando por você.",
        howToComplete: "Localize a concessionária, fale com o Cody e compre o Nomad gratuitamente."
      },
      ru: {
        title: "Поехали",
        location: "Обучение",
        description: "Перемещаться по Оазису непросто, так что давай раздобудем тебе колеса. Отправляйся в автосалон Бэйвью и спроси Коди. Он будет тебя ждать.",
        howToComplete: "Найдите автосалон, поговорите с Коди и бесплатно купите Nomad."
      },
      ar: {
        title: "انطلق",
        location: "تعليمي",
        description: "التنقل في تضاريس الواحة (Oasis) أمر صعب، لذا فلنحضر لك مجموعة عجلات جديدة. اذهب إلى وكالة Bayview واسأل عن Cody. سيكون في انتظارك.",
        howToComplete: "حدد موقع وكالة السيارات، وتحدث إلى Cody، واشترِ Nomad مجانًا."
      },
      tr: {
        title: "Yola Koyul",
        location: "Eğitim",
        description: "Oasis arazisinde gezinmek zordur, bu yüzden sana yeni bir araç alalım. Bayview Bayisi'ne git ve Cody'yi sor. Seni bekliyor olacak.",
        howToComplete: "Bayiyi bul, Cody ile konuş ve Nomad'ı ücretsiz satın al."
      },
      zh: {
        title: "启动",
        location: "教程",
        description: "在绿洲的地形中穿梭具有挑战性，所以让我们为你弄一套新轮子。前往湾景经销商处找 Cody。他会等你的。",
        howToComplete: "定位经销商，与 Cody 对话，并免费购买 Nomad。"
      }
    },
    location: "Tutorial",
    description: "Navigating the terrain of the Oasis is challenging, so let's get you a new set of wheels. Go to the Bayview Dealership and ask for Cody. He'll be expecting you.",
    howToComplete: "Locate the Dealership, talk to Cody, and purchase the Nomad for free.",
    difficulty: "EASY",
    missionType: "Game",
    rewards: ["$5,000"]
  }
];
