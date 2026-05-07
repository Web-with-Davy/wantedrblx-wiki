const SUPPORTED_LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
];

const TRANSLATIONS = {
    // ══════════════════════════════════════════════════════
    //  ENGLISH
    // ══════════════════════════════════════════════════════
    en: {

        //  Navigation 
        nav_home: 'HOME',
        nav_combat: 'COMBAT',
        nav_world: 'WORLD',
        nav_economy: 'ECONOMY',
        nav_weapons: 'WEAPONS',
        nav_vehicles: 'VEHICLES',
        nav_gun_crates: 'GUN CRATES',
        nav_locations: 'LOCATIONS',
        nav_npcs: 'NPCs',
        nav_missions: 'MISSIONS',
        nav_events: 'EVENTS',
        nav_atms: 'ATMs & VAULTS',
        nav_store: 'STORE',
        nav_valuables: 'VALUABLES',
        nav_promo_codes: 'PROMO CODES',
        nav_search: 'Search the archive...',

        //  Settings Panel 
        settings_title: 'SETTINGS',
        settings_music_volume: 'Music Volume',
        settings_custom_music: 'Custom Music (.mp3)',
        settings_upload: 'Upload',
        settings_reset: 'Reset',
        settings_card_size: 'Card Size',
        settings_low_end: 'Low-End Mode',
        settings_sidebar: 'Left Sidebar',
        settings_always_more: 'Always Show More',
        settings_intro: 'Intro',
        settings_language: 'Language',
        toggle_on: 'ON',
        toggle_off: 'OFF',

        //  Home Page 
        home_hero_title: 'WANTED WIKI',
        home_hero_text: 'Welcome to the ultimate <strong>Wanted Wiki</strong>.<br>Here we document all information about the Roblox game Wanted.',
        home_hero_disclaimer: '<em>Note: This wiki is community-managed and is not affiliated with Roblox, the game Wanted, or DevvGames.</em>',
        home_play_btn: 'PLAY HERE',
        home_recent_updates: 'RECENT UPDATES',
        home_next_update: 'NEXT UPDATE',
        home_calculating: 'Calculating...',
        home_admin_title: 'Administration & Management',
        home_admin_text: 'Information about the team behind the Wanted Wiki.',
        home_wiki_staff: 'WIKI STAFF',
        home_wiki_contributors: 'WIKI CONTRIBUTORS',
        home_no_staff: 'No staff listed.',
        home_no_contributors: 'No contributors listed.',
        home_viewers_title: 'VIEWER COUNTER',
        home_viewers_subtext: 'UNIQUE IDENTITIES RECORDED',
        home_featured_videos: 'FEATURED VIDEOS',
        home_combat_desc: 'Weapon stats, attachments and prices.',
        home_vehicles_desc: 'Vehicle stats, handling and modifications (coming soon).',
        home_gun_crates_desc: 'Gun crates and their locations.',
        home_locations_desc: 'The map of key locations.',
        home_npcs_desc: 'NPCs and their dialogues.',
        home_missions_desc: 'Info on missions and how to complete them.',
        home_events_desc: 'Info on festive game events.',
        home_atms_desc: 'Info on ATMs and Vaults.',
        home_store_desc: 'Info on the in-game store.',
        home_valuables_desc: 'Info on valuables and their prices.',
        home_promo_codes_desc: 'Active promo codes and rewards.',

        //  Weapons Page 
        page_weapons: 'WEAPONS',
        cat_guns: 'Guns',
        cat_explosives: 'Explosives',
        cat_tools: 'Tools',
        sort_expensive: 'Most expensive first',
        sort_cheap: 'Cheapest first',
        stat_obtaining: 'Obtaining',
        stat_location: 'Location',
        stat_rebuy: 'Rebuy',
        stat_sell: 'Sell Price',
        stat_ammo: 'Ammo',
        stat_ammo_cost: 'Ammo Cost',
        stat_damage: 'Damage',
        stat_rpm: 'RPM',
        stat_reload: 'Reload',
        stat_accuracy: 'Accuracy',

        //  Vehicles Page 
        page_vehicles: 'VEHICLES',
        cat_ground_vehicles: 'Ground Vehicles',
        cat_air_vehicles: 'Air Vehicles',
        stat_repair: 'Repair',
        stat_garage_repair: 'Garage Repair',
        stat_top_speed: 'Top Speed',
        stat_acceleration: 'Acceleration',
        stat_braking: 'Braking',
        stat_handling: 'Handling',
        stat_spool_time: 'Spool Time',
        stat_health: 'Health',
        stat_armor: 'Armor',

        //  Gun Crates Page 
        page_gun_crates: 'GUN CRATES',
        stat_cost: 'Cost',
        stat_content: 'Content',
        stat_cooldown: 'Cooldown',

        //  Locations Page 
        page_locations: 'LOCATIONS',
        stat_type: 'Type',
        stat_description: 'Description',

        //  NPCs Page 
        page_npcs: 'NPCs',
        sort_az: 'A-Z',
        sort_za: 'Z-A',
        card_dialogues: 'DIALOGUES',
        disclaimer_wip: 'This page is currently unfinished and being worked on',

        //  Missions Page 
        page_missions: 'MISSIONS',
        cat_game_missions: 'Game Missions',
        cat_erik_missions: 'Erik\'s Missions',
        cat_dan_missions: 'Dan\'s Missions',
        cat_sirb_missions: 'Sir. B\'s Missions',
        cat_bert_missions: 'Bert\'s Missions',
        cat_easter_missions: 'Easter Missions',
        cat_christmas_missions: 'Christmas Missions',
        sort_hardest: 'Hardest first',
        sort_easiest: 'Easiest first',
        stat_how: 'How',
        stat_reward: 'Reward',

        //  Events Page 
        page_events: 'EVENTS',

        //  ATMs & Vaults Page 
        page_atms: 'ATMs & VAULTS',
        stat_cash: 'Cash',

        //  Store Page 
        page_store: 'STORE',
        stat_price: 'Price',
        stat_category: 'Category',

        //  Valuables Page 
        page_valuables: 'VALUABLES',
        stat_value: 'Value',
        stat_rarity: 'Rarity',
        stat_weight: 'Weight',
        stat_common_location: 'Common Location',
        free: 'Free',
        attr_optics: 'Optics',
        attr_muzzle: 'Muzzle',
        attr_underbarrel: 'Underbarrel',
        attr_tactical: 'Tactical',
        attr_ammunition: 'Ammunition',
        attr_stock: 'Stock',

        //  Promo Codes Page 
        page_promo_codes: 'PROMO CODES',
        filter_all: 'All codes',
        filter_active: 'Active',
        filter_expired: 'Expired',
        promo_disclaimer: 'New codes are added periodically. Stay tuned!',
        status_active: 'ACTIVE',
        status_expired: 'EXPIRED',
        stat_status: 'Status',
        stat_code_reward: 'Reward',

        //  Generic 
        show_more: 'Show more...',
        show_less: 'Show less',
        card_attachments: 'ATTACHMENTS',
        label_free: 'Free',

    },

    // ══════════════════════════════════════════════════════
    //  FRENCH
    // ══════════════════════════════════════════════════════
    fr: {

        //  Navigation 
        nav_home: 'ACCUEIL',
        nav_combat: 'COMBAT',
        nav_world: 'MONDE',
        nav_economy: 'ÉCONOMIE',
        nav_weapons: 'ARMES',
        nav_vehicles: 'VÉHICULES',
        nav_gun_crates: 'CAISSES D\'ARMES',
        nav_locations: 'LIEUX',
        nav_npcs: 'PNJ',
        nav_missions: 'MISSIONS',
        nav_events: 'ÉVÉNEMENTS',
        nav_atms: 'DAB & COFFRES',
        nav_store: 'BOUTIQUE',
        nav_valuables: 'OBJETS DE VALEUR',
        nav_promo_codes: 'CODES PROMO',
        nav_search: 'Rechercher...',

        //  Settings Panel 
        settings_title: 'PARAMÈTRES',
        settings_music_volume: 'Volume de la musique',
        settings_custom_music: 'Musique personnalisée (.mp3)',
        settings_upload: 'Importer',
        settings_reset: 'Réinitialiser',
        settings_card_size: 'Taille des cartes',
        settings_low_end: 'Mode Faible Performance',
        settings_sidebar: 'Barre latérale gauche',
        settings_always_more: 'Toujours afficher plus',
        settings_intro: 'Introduction',
        settings_language: 'Langue',
        toggle_on: 'ON',
        toggle_off: 'OFF',

        //  Home Page 
        home_hero_title: 'WIKI WANTED',
        home_hero_text: 'Bienvenue sur le <strong>Wiki Wanted</strong> ultime.<br>Ici, nous consignons toutes les informations sur le jeu Roblox Wanted.',
        home_hero_disclaimer: '<em>Note : Ce wiki est géré par la communauté et n\'est pas affilié à Roblox, au jeu Wanted ou DevvGames.</em>',
        home_play_btn: 'JOUER ICI',
        home_recent_updates: 'MISES À JOUR RÉCENTES',
        home_next_update: 'MISE À JOUR SUIVANTE',
        home_calculating: 'Calcul en cours...',
        home_admin_title: 'Administration et Gestion',
        home_admin_text: 'Informations sur l\'équipe derrière le Wiki Wanted.',
        home_wiki_staff: 'STAFF DU WIKI',
        home_wiki_contributors: 'CONTRIBUTEURS DU WIKI',
        home_no_staff: 'Aucun staff répertorié.',
        home_no_contributors: 'Aucun contributeur répertorié.',
        home_viewers_title: 'COMPTEUR DE VISITEURS',
        home_viewers_subtext: 'IDENTITÉS UNIQUES ENREGISTRÉES',
        home_featured_videos: 'VIDÉOS EN VEDETTE',
        home_combat_desc: 'Stats des armes, accessoires et prix.',
        home_vehicles_desc: 'Stats des véhicules, maniabilité et modifications (à venir).',
        home_gun_crates_desc: "Caisses d'armes et leurs emplacements.",
        home_locations_desc: 'La carte des lieux clés.',
        home_npcs_desc: 'PNJ et leurs dialogues.',
        home_missions_desc: 'Infos sur les missions et comment les terminer.',
        home_events_desc: 'Infos sur les événements festifs du jeu.',
        home_atms_desc: 'Infos sur les DAB et les coffres-forts.',
        home_store_desc: 'Infos sur la boutique en jeu.',
        home_valuables_desc: 'Infos sur les objets de valeur et leurs prix.',
        home_promo_codes_desc: 'Codes promotionnels actifs et récompenses.',

        //  Weapons Page 
        page_weapons: 'ARMES',
        cat_guns: 'Fusils',
        cat_explosives: 'Explosifs',
        cat_tools: 'Outils',
        sort_expensive: 'Du plus cher au moins cher',
        sort_cheap: 'Du moins cher au plus cher',
        stat_obtaining: 'Obtention',
        stat_location: 'Lieu',
        stat_rebuy: 'Rachat',
        stat_sell: 'Prix de vente',
        stat_ammo: 'Munitions',
        stat_ammo_cost: 'Coût des munitions',
        stat_damage: 'Dégâts',
        stat_rpm: 'RPM',
        stat_reload: 'Rechargement',
        stat_accuracy: 'Précision',

        //  Vehicles Page 
        page_vehicles: 'VÉHICULES',
        cat_ground_vehicles: 'Véhicules terrestres',
        cat_air_vehicles: 'Véhicules aériens',
        stat_repair: 'Réparation',
        stat_garage_repair: 'Réparation en garage',
        stat_top_speed: 'Vitesse max',
        stat_acceleration: 'Accélération',
        stat_braking: 'Freinage',
        stat_handling: 'Maniabilité',
        stat_spool_time: 'Temps de bobinage',
        stat_health: 'Santé',
        stat_armor: 'Armure',

        //  Gun Crates Page 
        page_gun_crates: 'CAISSES D\'ARMES',
        stat_cost: 'Coût',
        stat_content: 'Contenu',
        stat_cooldown: 'Temps de recharge',

        //  Locations Page 
        page_locations: 'LIEUX',
        stat_type: 'Type',
        stat_description: 'Description',

        //  NPCs Page 
        page_npcs: 'PNJ',
        sort_az: 'A-Z',
        sort_za: 'Z-A',
        card_dialogues: 'DIALOGUES',
        disclaimer_wip: 'Cette page est en cours de construction',

        //  Missions Page 
        page_missions: 'MISSIONS',
        cat_game_missions: 'Missions du jeu',
        cat_erik_missions: 'Missions d\'Erik',
        cat_dan_missions: 'Missions de Dan',
        cat_sirb_missions: 'Missions de Sir. B',
        cat_bert_missions: 'Missions de Bert',
        cat_easter_missions: 'Missions de Pâques',
        cat_christmas_missions: 'Missions de Noël',
        sort_hardest: 'Les plus difficiles d\'abord',
        sort_easiest: 'Les plus faciles d\'abord',
        stat_how: 'Comment',
        stat_reward: 'Récompense',

        //  Events Page 
        page_events: 'ÉVÉNEMENTS',

        //  ATMs & Vaults Page 
        page_atms: 'DAB & COFFRES',
        stat_cash: 'Argent',

        //  Store Page 
        page_store: 'BOUTIQUE',
        stat_price: 'Prix',
        stat_category: 'Catégorie',

        //  Valuables Page 
        page_valuables: 'OBJETS DE VALEUR',
        stat_value: 'Valeur',
        stat_rarity: 'Rareté',
        stat_weight: 'Poids',
        stat_common_location: 'Emplacement Commun',
        free: 'Gratuit',
        attr_optics: 'Optiques',
        attr_muzzle: 'Bouche',
        attr_underbarrel: 'Accessoire canon',
        attr_tactical: 'Tactique',
        attr_ammunition: 'Munitions',
        attr_stock: 'Crosse',

        //  Promo Codes Page 
        page_promo_codes: 'CODES PROMO',
        filter_all: 'Tous les codes',
        filter_active: 'Actifs',
        filter_expired: 'Expirés',
        promo_disclaimer: 'De nouveaux codes sont ajoutés régulièrement. Restez à l\'affût !',
        status_active: 'ACTIF',
        status_expired: 'EXPIRÉ',
        stat_status: 'Statut',
        stat_code_reward: 'Récompense',

        //  Generic 
        show_more: 'Voir plus...',
        show_less: 'Voir moins',
        card_attachments: 'ACCESSOIRES',
        label_free: 'Gratuit',

    },

    // ══════════════════════════════════════════════════════
    //  GERMAN
    // ══════════════════════════════════════════════════════
    de: {

        //  Navigation 
        nav_home: 'START',
        nav_combat: 'KAMPF',
        nav_world: 'WELT',
        nav_economy: 'WIRTSCHAFT',
        nav_weapons: 'WAFFEN',
        nav_vehicles: 'FAHRZEUGE',
        nav_gun_crates: 'WAFFENKISTEN',
        nav_locations: 'ORTE',
        nav_npcs: 'NPCs',
        nav_missions: 'MISSIONEN',
        nav_events: 'EVENTS',
        nav_atms: 'ATMs & TRESORE',
        nav_store: 'LADEN',
        nav_valuables: 'WERTSACHEN',
        nav_promo_codes: 'PROMO-CODES',
        nav_search: 'Archiv durchsuchen...',

        //  Settings Panel 
        settings_title: 'EINSTELLUNGEN',
        settings_music_volume: 'Musiklautstärke',
        settings_custom_music: 'Eigene Musik (.mp3)',
        settings_upload: 'Hochladen',
        settings_reset: 'Zurücksetzen',
        settings_card_size: 'Kartengröße',
        settings_low_end: 'Leistungsmodus',
        settings_sidebar: 'Linke Seitenleiste',
        settings_always_more: 'Immer mehr anzeigen',
        settings_intro: 'Intro',
        settings_language: 'Sprache',
        toggle_on: 'AN',
        toggle_off: 'AUS',

        //  Home Page 
        home_hero_title: 'WANTED WIKI',
        home_hero_text: 'Willkommen im ultimativen <strong>Wanted Wiki</strong>.<br>Hier erfassen wir alle Informationen über das Roblox-Spiel Wanted.',
        home_hero_disclaimer: '<em>Hinweis: Dieses Wiki wird von der Community betrieben und ist nicht mit Roblox, dem Spiel Wanted oder DevvGames verbunden.</em>',
        home_play_btn: 'HIER SPIELEN',
        home_recent_updates: 'NEUESTE UPDATES',
        home_next_update: 'NÄCHSTES UPDATE',
        home_calculating: 'Berechnung...',
        home_admin_title: 'Verwaltung und Management',
        home_admin_text: 'Informationen über das Team hinter dem Wanted Wiki.',
        home_wiki_staff: 'WIKI-TEAM',
        home_wiki_contributors: 'WIKI-MITWIRKENDE',
        home_no_staff: 'Kein Team aufgelistet.',
        home_no_contributors: 'Keine Mitwirkenden aufgelistet.',
        home_viewers_title: 'ZUSCHAUERZAHL',
        home_viewers_subtext: 'ERFASSTE EINDEUTIGE IDENTITÄTEN',
        home_featured_videos: 'AUSGEWÄHLTE VIDEOS',
        home_combat_desc: 'Waffenstatistiken, Zubehör und Preise.',
        home_vehicles_desc: 'Fahrzeugstatistiken, Handling und Modifikationen (demnächst).',
        home_gun_crates_desc: 'Waffenkisten und ihre Standorte.',
        home_locations_desc: 'Die Karte der wichtigsten Orte.',
        home_npcs_desc: 'NPCs und ihre Dialoge.',
        home_missions_desc: 'Infos zu Missionen und wie man sie abschließt.',
        home_events_desc: 'Infos zu festlichen Spiele-Events.',
        home_atms_desc: 'Infos zu Geldautomaten und Tresoren.',
        home_store_desc: 'Infos über den In-Game-Shop.',
        home_valuables_desc: 'Infos über Wertsachen und ihre Preise.',
        home_promo_codes_desc: 'Aktive Promo-Codes und Belohnungen.',

        //  Weapons Page 
        page_weapons: 'WAFFEN',
        cat_guns: 'Schusswaffen',
        cat_explosives: 'Sprengstoff',
        cat_tools: 'Werkzeuge',
        sort_expensive: 'Teuerste zuerst',
        sort_cheap: 'Günstigste zuerst',
        stat_obtaining: 'Erhalt',
        stat_location: 'Ort',
        stat_rebuy: 'Nachkauf',
        stat_sell: 'Verkaufspreis',
        stat_ammo: 'Munition',
        stat_ammo_cost: 'Munitionskosten',
        stat_damage: 'Schaden',
        stat_rpm: 'RPM',
        stat_reload: 'Nachladen',
        stat_accuracy: 'Genauigkeit',

        //  Vehicles Page 
        page_vehicles: 'FAHRZEUGE',
        cat_ground_vehicles: 'Landfahrzeuge',
        cat_air_vehicles: 'Luftfahrzeuge',
        stat_repair: 'Reparatur',
        stat_garage_repair: 'Garagen-Reparatur',
        stat_top_speed: 'Höchstgeschwindigkeit',
        stat_acceleration: 'Beschleunigung',
        stat_braking: 'Bremsung',
        stat_handling: 'Handling',
        stat_spool_time: 'Spulzeit',
        stat_health: 'Gesundheit',
        stat_armor: 'Panzerung',

        //  Gun Crates Page 
        page_gun_crates: 'WAFFENKISTEN',
        stat_cost: 'Kosten',
        stat_content: 'Inhalt',
        stat_cooldown: 'Abklingzeit',

        //  Locations Page 
        page_locations: 'ORTE',
        stat_type: 'Typ',
        stat_description: 'Beschreibung',

        //  NPCs Page 
        page_npcs: 'NPCs',
        sort_az: 'A-Z',
        sort_za: 'Z-A',
        card_dialogues: 'DIALOGE',
        disclaimer_wip: 'Diese Seite ist noch nicht fertig und wird noch bearbeitet',

        //  Missions Page 
        page_missions: 'MISSIONEN',
        cat_game_missions: 'Spielmissionen',
        cat_erik_missions: 'Eriks Missionen',
        cat_dan_missions: 'Dans Missionen',
        cat_sirb_missions: 'Sir. Bs Missionen',
        cat_bert_missions: 'Berts Missionen',
        cat_easter_missions: 'Ostermissionen',
        cat_christmas_missions: 'Weihnachtsmissionen',
        sort_hardest: 'Schwerste zuerst',
        sort_easiest: 'Leichteste zuerst',
        stat_how: 'Wie',
        stat_reward: 'Belohnung',

        //  Events Page 
        page_events: 'EVENTS',

        //  ATMs & Vaults Page 
        page_atms: 'ATMs & TRESORE',
        stat_cash: 'Bargeld',

        //  Store Page 
        page_store: 'LADEN',
        stat_price: 'Preis',
        stat_category: 'Kategorie',

        //  Valuables Page 
        page_valuables: 'WERTSACHEN',
        stat_value: 'Wert',
        stat_rarity: 'Seltenheit',
        stat_weight: 'Gewicht',
        stat_common_location: 'Häufiger Fundort',
        free: 'Kostenlos',
        attr_optics: 'Optik',
        attr_muzzle: 'Mündung',
        attr_underbarrel: 'Unterlauf',
        attr_tactical: 'Taktisch',
        attr_ammunition: 'Munition',
        attr_stock: 'Schaft',

        //  Promo Codes Page 
        page_promo_codes: 'PROMO-CODES',
        filter_all: 'Alle Codes',
        filter_active: 'Aktiv',
        filter_expired: 'Abgelaufen',
        promo_disclaimer: 'Neue Codes werden regelmäßig hinzugefügt. Halte die Augen offen!',
        status_active: 'AKTIV',
        status_expired: 'ABGELAUFEN',
        stat_status: 'Status',
        stat_code_reward: 'Belohnung',

        //  Generic 
        show_more: 'Mehr anzeigen...',
        show_less: 'Weniger anzeigen',
        card_attachments: 'ZUBEHÖR',
        label_free: 'Kostenlos',

    },

    // ══════════════════════════════════════════════════════
    //  SPANISH
    // ══════════════════════════════════════════════════════
    es: {

        //  Navigation 
        nav_home: 'INICIO',
        nav_combat: 'COMBATE',
        nav_world: 'MUNDO',
        nav_economy: 'ECONOMÍA',
        nav_weapons: 'ARMAS',
        nav_vehicles: 'VEHÍCULOS',
        nav_gun_crates: 'CAJAS DE ARMAS',
        nav_locations: 'LUGARES',
        nav_npcs: 'NPCs',
        nav_missions: 'MISIONES',
        nav_events: 'EVENTOS',
        nav_atms: 'ATMs Y BÓVEDAS',
        nav_store: 'TIENDA',
        nav_valuables: 'OBJETOS VALIOSOS',
        nav_promo_codes: 'CÓDIGOS PROMO',
        nav_search: 'Buscar en el archivo...',

        //  Settings Panel 
        settings_title: 'CONFIGURACIÓN',
        settings_music_volume: 'Volumen de música',
        settings_custom_music: 'Música personalizada (.mp3)',
        settings_upload: 'Subir',
        settings_reset: 'Restablecer',
        settings_card_size: 'Tamaño de tarjeta',
        settings_low_end: 'Modo bajo rendimiento',
        settings_sidebar: 'Barra lateral izquierda',
        settings_always_more: 'Mostrar siempre más',
        settings_intro: 'Introducción',
        settings_language: 'Idioma',
        toggle_on: 'ON',
        toggle_off: 'OFF',

        //  Home Page 
        home_hero_title: 'WIKI WANTED',
        home_hero_text: 'Bienvenido al <strong>Wiki Wanted</strong> definitivo.<br>Aquí registramos toda la información sobre el juego de Roblox Wanted.',
        home_hero_disclaimer: '<em>Nota: Este wiki es gestionado por la comunidad y no está afiliado a Roblox, al juego Wanted ni a DevvGames.</em>',
        home_play_btn: 'JUGAR AQUÍ',
        home_recent_updates: 'ACTUALIZACIONES RECIENTES',
        home_next_update: 'PRÓXIMA ACTUALIZACIÓN',
        home_calculating: 'Calculando...',
        home_admin_title: 'Administración y Gestión',
        home_admin_text: 'Información sobre el equipo detrás del Wiki Wanted.',
        home_wiki_staff: 'STAFF DEL WIKI',
        home_wiki_contributors: 'COLABORADORES DEL WIKI',
        home_no_staff: 'No hay staff listado.',
        home_no_contributors: 'No hay colaboradores listados.',
        home_viewers_title: 'CONTADOR DE VISITANTES',
        home_viewers_subtext: 'IDENTIDADES ÚNICAS REGISTRADAS',
        home_featured_videos: 'VIDEOS DESTACADOS',
        home_combat_desc: 'Estadísticas de armas, accesorios y precios.',
        home_vehicles_desc: 'Estadísticas de vehículos, manejo y modificaciones (próximamente).',
        home_gun_crates_desc: 'Cajas de armas y sus ubicaciones.',
        home_locations_desc: 'El mapa de ubicaciones clave.',
        home_npcs_desc: 'NPCs y sus diálogos.',
        home_missions_desc: 'Información sobre misiones y cómo completarlas.',
        home_events_desc: 'Información sobre eventos festivos del juego.',
        home_atms_desc: 'Información sobre cajeros automáticos y cajas fuertes.',
        home_store_desc: 'Información sobre la tienda del juego.',
        home_valuables_desc: 'Información sobre objetos valiosos y sus precios.',
        home_promo_codes_desc: 'Códigos promocionales activos y recompensas.',

        //  Weapons Page 
        page_weapons: 'ARMAS',
        cat_guns: 'Armas de fuego',
        cat_explosives: 'Explosivos',
        cat_tools: 'Herramientas',
        sort_expensive: 'De más caro a más barato',
        sort_cheap: 'De más barato a más caro',
        stat_obtaining: 'Obtención',
        stat_location: 'Lugar',
        stat_rebuy: 'Recompra',
        stat_sell: 'Precio de venta',
        stat_ammo: 'Munición',
        stat_ammo_cost: 'Coste de munición',
        stat_damage: 'Daño',
        stat_rpm: 'RPM',
        stat_reload: 'Recarga',
        stat_accuracy: 'Precisión',

        //  Vehicles Page 
        page_vehicles: 'VEHÍCULOS',
        cat_ground_vehicles: 'Vehículos terrestres',
        cat_air_vehicles: 'Vehículos aéreos',
        stat_repair: 'Reparación',
        stat_garage_repair: 'Reparación en garaje',
        stat_top_speed: 'Velocidad máxima',
        stat_acceleration: 'Aceleración',
        stat_braking: 'Frenado',
        stat_handling: 'Manejo',
        stat_spool_time: 'Tiempo de bobinado',
        stat_health: 'Salud',
        stat_armor: 'Armadura',

        //  Gun Crates Page 
        page_gun_crates: 'CAJAS DE ARMAS',
        stat_cost: 'Coste',
        stat_content: 'Contenido',
        stat_cooldown: 'Tiempo de espera',

        //  Locations Page 
        page_locations: 'LUGARES',
        stat_type: 'Tipo',
        stat_description: 'Descripción',

        //  NPCs Page 
        page_npcs: 'NPCs',
        sort_az: 'A-Z',
        sort_za: 'Z-A',
        card_dialogues: 'DIÁLOGOS',
        disclaimer_wip: 'Esta página está actualmente sin terminar y en construcción',

        //  Missions Page 
        page_missions: 'MISIONES',
        cat_game_missions: 'Misiones del juego',
        cat_erik_missions: 'Misiones de Erik',
        cat_dan_missions: 'Misiones de Dan',
        cat_sirb_missions: 'Misiones de Sir. B',
        cat_bert_missions: 'Misiones de Bert',
        cat_easter_missions: 'Misiones de Pascua',
        cat_christmas_missions: 'Misiones de Navidad',
        sort_hardest: 'Más difíciles primero',
        sort_easiest: 'Más fáciles primero',
        stat_how: 'Cómo',
        stat_reward: 'Recompensa',

        //  Events Page 
        page_events: 'EVENTOS',

        //  ATMs & Vaults Page 
        page_atms: 'ATMs Y BÓVEDAS',
        stat_cash: 'Dinero',

        //  Store Page 
        page_store: 'TIENDA',
        stat_price: 'Precio',
        stat_category: 'Categoría',

        //  Valuables Page 
        page_valuables: 'OBJETOS VALIOSOS',
        stat_value: 'Valor',
        stat_rarity: 'Rareza',
        stat_weight: 'Peso',
        stat_common_location: 'Ubicación Común',
        free: 'Gratis',
        attr_optics: 'Óptica',
        attr_muzzle: 'Cañón',
        attr_underbarrel: 'Bajo cañón',
        attr_tactical: 'Táctico',
        attr_ammunition: 'Munición',
        attr_stock: 'Culata',

        //  Promo Codes Page 
        page_promo_codes: 'CÓDIGOS PROMO',
        filter_all: 'Todos los códigos',
        filter_active: 'Activos',
        filter_expired: 'Expirados',
        promo_disclaimer: '¡Se añaden nuevos códigos periódicamente. ¡Estate atento!',
        status_active: 'ACTIVO',
        status_expired: 'EXPIRADO',
        stat_status: 'Estado',
        stat_code_reward: 'Recompensa',

        //  Generic 
        show_more: 'Ver más...',
        show_less: 'Ver menos',
        card_attachments: 'ACCESORIOS',
        label_free: 'Gratis',

    },

    // ══════════════════════════════════════════════════════
    //  PORTUGUESE (Brazilian)
    // ══════════════════════════════════════════════════════
    pt: {

        //  Navigation 
        nav_home: 'INÍCIO',
        nav_combat: 'COMBATE',
        nav_world: 'MUNDO',
        nav_economy: 'ECONOMIA',
        nav_weapons: 'ARMAS',
        nav_vehicles: 'VEÍCULOS',
        nav_gun_crates: 'CAIXAS DE ARMAS',
        nav_locations: 'LOCAIS',
        nav_npcs: 'NPCs',
        nav_missions: 'MISSÕES',
        nav_events: 'EVENTOS',
        nav_atms: 'ATMs E COFRES',
        nav_store: 'LOJA',
        nav_valuables: 'OBJETOS VALIOSOS',
        nav_promo_codes: 'CÓDIGOS PROMO',
        nav_search: 'Pesquisar no arquivo...',

        //  Settings Panel 
        settings_title: 'CONFIGURAÇÕES',
        settings_music_volume: 'Volume da música',
        settings_custom_music: 'Música personalizada (.mp3)',
        settings_upload: 'Enviar',
        settings_reset: 'Redefinir',
        settings_card_size: 'Tamanho do card',
        settings_low_end: 'Modo de baixo desempenho',
        settings_sidebar: 'Barra lateral esquerda',
        settings_always_more: 'Sempre mostrar mais',
        settings_intro: 'Introdução',
        settings_language: 'Idioma',
        toggle_on: 'ON',
        toggle_off: 'OFF',

        //  Home Page 
        home_hero_title: 'WIKI WANTED',
        home_hero_text: 'Bem-vindo ao <strong>Wiki Wanted</strong> definitivo.<br>Aqui registramos todas as informações sobre o jogo Roblox Wanted.',
        home_hero_disclaimer: '<em>Nota: Este wiki é gerenciado pela comunidade e não é afiliado à Roblox, ao jogo Wanted ou à DevvGames.</em>',
        home_play_btn: 'JOGAR AQUI',
        home_recent_updates: 'ATUALIZAÇÕES RECENTES',
        home_next_update: 'PRÓXIMA ATUALIZAÇÃO',
        home_calculating: 'Calculando...',
        home_admin_title: 'Administração e Gestão',
        home_admin_text: 'Informações sobre a equipe por trás do Wiki Wanted.',
        home_wiki_staff: 'EQUIPE DO WIKI',
        home_wiki_contributors: 'CONTRIBUIDORES DO WIKI',
        home_no_staff: 'Nenhuma equipe listada.',
        home_no_contributors: 'Nenhum contribuidor listado.',
        home_viewers_title: 'CONTADOR DE VISITANTES',
        home_viewers_subtext: 'IDENTIDADES ÚNICAS REGISTRADAS',
        home_featured_videos: 'VÍDEOS EM DESTAQUE',
        home_combat_desc: 'Estatísticas de armas, acessórios e preços.',
        home_vehicles_desc: 'Estatísticas de veículos, dirigibilidade e modificações (em breve).',
        home_gun_crates_desc: 'Caixas de armas e suas localizações.',
        home_locations_desc: 'O mapa dos principais locais.',
        home_npcs_desc: 'NPCs e seus diálogos.',
        home_missions_desc: 'Informações sobre missões e como completá-las.',
        home_events_desc: 'Informações sobre eventos festivos do jogo.',
        home_atms_desc: 'Informações sobre ATMs e Cofres.',
        home_store_desc: 'Informações sobre a loja do jogo.',
        home_valuables_desc: 'Informações sobre objetos valiosos e seus preços.',
        home_promo_codes_desc: 'Códigos promocionais ativos e recompensas.',

        //  Weapons Page 
        page_weapons: 'ARMAS',
        cat_guns: 'Armas de fogo',
        cat_explosives: 'Explosivos',
        cat_tools: 'Ferramentas',
        sort_expensive: 'Mais caro ao mais barato',
        sort_cheap: 'Mais barato ao mais caro',
        stat_obtaining: 'Obtenção',
        stat_location: 'Local',
        stat_rebuy: 'Recompra',
        stat_sell: 'Preço de venda',
        stat_ammo: 'Munição',
        stat_ammo_cost: 'Custo de munição',
        stat_damage: 'Dano',
        stat_rpm: 'RPM',
        stat_reload: 'Recarga',
        stat_accuracy: 'Precisão',

        //  Vehicles Page 
        page_vehicles: 'VEÍCULOS',
        cat_ground_vehicles: 'Veículos terrestres',
        cat_air_vehicles: 'Veículos aéreos',
        stat_repair: 'Reparo',
        stat_garage_repair: 'Reparo na garagem',
        stat_top_speed: 'Velocidade máxima',
        stat_acceleration: 'Aceleração',
        stat_braking: 'Frenagem',
        stat_handling: 'Manuseio',
        stat_spool_time: 'Tempo de spool',
        stat_health: 'Saúde',
        stat_armor: 'Armadura',

        //  Gun Crates Page 
        page_gun_crates: 'CAIXAS DE ARMAS',
        stat_cost: 'Custo',
        stat_content: 'Conteúdo',
        stat_cooldown: 'Recarga',

        //  Locations Page 
        page_locations: 'LOCAIS',
        stat_type: 'Tipo',
        stat_description: 'Descrição',

        //  NPCs Page 
        page_npcs: 'NPCs',
        sort_az: 'A-Z',
        sort_za: 'Z-A',
        card_dialogues: 'DIÁLOGOS',
        disclaimer_wip: 'Esta página está atualmente inacabada e sendo trabalhada',

        //  Missions Page 
        page_missions: 'MISSÕES',
        cat_game_missions: 'Missões do jogo',
        cat_erik_missions: 'Missões do Erik',
        cat_dan_missions: 'Missões do Dan',
        cat_sirb_missions: 'Missões do Sir. B',
        cat_bert_missions: 'Missões do Bert',
        cat_easter_missions: 'Missões de Páscoa',
        cat_christmas_missions: 'Missões de Natal',
        sort_hardest: 'Mais difíceis primeiro',
        sort_easiest: 'Mais fáceis primeiro',
        stat_how: 'Como',
        stat_reward: 'Recompensa',

        //  Events Page 
        page_events: 'EVENTOS',

        //  ATMs & Vaults Page 
        page_atms: 'ATMs E COFRES',
        stat_cash: 'Dinheiro',

        //  Store Page 
        page_store: 'LOJA',
        stat_price: 'Preço',
        stat_category: 'Categoria',

        //  Valuables Page 
        page_valuables: 'OBJETOS VALIOSOS',
        stat_value: 'Valor',
        stat_rarity: 'Raridade',
        stat_weight: 'Peso',
        stat_common_location: 'Local Comum',
        free: 'Grátis',
        attr_optics: 'Óptica',
        attr_muzzle: 'Cano',
        attr_underbarrel: 'Sob o cano',
        attr_tactical: 'Tático',
        attr_ammunition: 'Munição',
        attr_stock: 'Coronha',

        //  Promo Codes Page 
        page_promo_codes: 'CÓDIGOS PROMO',
        filter_all: 'Todos os códigos',
        filter_active: 'Ativos',
        filter_expired: 'Expirados',
        promo_disclaimer: 'Novos códigos são adicionados periodicamente. Fique atento!',
        status_active: 'ATIVO',
        status_expired: 'EXPIRADO',
        stat_status: 'Status',
        stat_code_reward: 'Recompensa',

        //  Generic 
        show_more: 'Ver mais...',
        show_less: 'Ver menos',
        card_attachments: 'ACESSÓRIOS',
        label_free: 'Grátis',

    },

    // ══════════════════════════════════════════════════════
    //  RUSSIAN
    // ══════════════════════════════════════════════════════
    ru: {

        //  Navigation 
        nav_home: 'ГЛАВНАЯ',
        nav_combat: 'БОЙ',
        nav_world: 'МИР',
        nav_economy: 'ЭКОНОМИКА',
        nav_weapons: 'ОРУЖИЕ',
        nav_vehicles: 'ТРАНСПОРТ',
        nav_gun_crates: 'ЯЩИКИ С ОРУЖИЕМ',
        nav_locations: 'ЛОКАЦИИ',
        nav_npcs: 'НПС',
        nav_missions: 'МИССИИ',
        nav_events: 'СОБЫТИЯ',
        nav_atms: 'БАНКОМАТЫ И СЕЙФЫ',
        nav_store: 'МАГАЗИН',
        nav_valuables: 'ЦЕННОСТИ',
        nav_promo_codes: 'ПРОМОКОДЫ',
        nav_search: 'Поиск по архиву...',

        //  Settings Panel 
        settings_title: 'НАСТРОЙКИ',
        settings_music_volume: 'Громкость музыки',
        settings_custom_music: 'Своя музыка (.mp3)',
        settings_upload: 'Загрузить',
        settings_reset: 'Сбросить',
        settings_card_size: 'Размер карточек',
        settings_low_end: 'Режим слабого ПК',
        settings_sidebar: 'Левая боковая панель',
        settings_always_more: 'Всегда показывать больше',
        settings_intro: 'Интро',
        settings_language: 'Язык',
        toggle_on: 'ВКЛ',
        toggle_off: 'ВЫКЛ',

        //  Home Page 
        home_hero_title: 'WANTED WIKI',
        home_hero_text: 'Добро пожаловать на главную <strong>Wanted Wiki</strong>.<br>Здесь мы собираем всю информацию об игре Roblox Wanted.',
        home_hero_disclaimer: '<em>Примечание: этот вики управляется сообществом и не аффилирован с Roblox, игрой Wanted или DevvGames.</em>',
        home_play_btn: 'ИГРАТЬ',
        home_recent_updates: 'ПОСЛЕДНИЕ ОБНОВЛЕНИЯ',
        home_next_update: 'СЛЕДУЮЩЕЕ ОБНОВЛЕНИЕ',
        home_calculating: 'Вычисление...',
        home_admin_title: 'Администрация и управление',
        home_admin_text: 'Информация о команде Wanted Wiki.',
        home_wiki_staff: 'КОМАНДА ВИКИ',
        home_wiki_contributors: 'УЧАСТНИКИ ВИКИ',
        home_no_staff: 'Команда не указана.',
        home_no_contributors: 'Участники не указаны.',
        home_viewers_title: 'КОЛИЧЕСТВО ПОСЕТИТЕЛЕЙ',
        home_viewers_subtext: 'ЗАРЕГИСТРИРОВАННЫЕ УНИКАЛЬНЫЕ ЛИЧНОСТИ',
        home_featured_videos: 'РЕКОМЕНДУЕМЫЕ ВИДЕО',
        home_combat_desc: 'Характеристики оружия, модули и цены.',
        home_vehicles_desc: 'Характеристики транспорта, управление и модификации (скоро).',
        home_gun_crates_desc: 'Оружейные ящики и их местоположение.',
        home_locations_desc: 'Карта ключевых локаций.',
        home_npcs_desc: 'NPC и их диалоги.',
        home_missions_desc: 'Информация о миссиях и способах их прохождения.',
        home_events_desc: 'Информация о праздничных игровых событиях.',
        home_atms_desc: 'Информация о банкоматах и хранилищах.',
        home_store_desc: 'Информация о внутриигровом магазине.',
        home_valuables_desc: 'Информация о ценностях и их ценах.',
        home_promo_codes_desc: 'Активные промокоды и награды.',

        //  Weapons Page 
        page_weapons: 'ОРУЖИЕ',
        cat_guns: 'Огнестрельное',
        cat_explosives: 'Взрывчатка',
        cat_tools: 'Инструменты',
        sort_expensive: 'Сначала дорогие',
        sort_cheap: 'Сначала дешёвые',
        stat_obtaining: 'Получение',
        stat_location: 'Локация',
        stat_rebuy: 'Цена покупки',
        stat_sell: 'Цена продажи',
        stat_ammo: 'Патроны',
        stat_ammo_cost: 'Стоимость патронов',
        stat_damage: 'Урон',
        stat_rpm: 'RPM',
        stat_reload: 'Перезарядка',
        stat_accuracy: 'Точность',

        //  Vehicles Page 
        page_vehicles: 'ТРАНСПОРТ',
        cat_ground_vehicles: 'Наземный транспорт',
        cat_air_vehicles: 'Воздушный транспорт',
        stat_repair: 'Ремонт',
        stat_garage_repair: 'Ремонт в гараже',
        stat_top_speed: 'Макс. скорость',
        stat_acceleration: 'Разгон',
        stat_braking: 'Торможение',
        stat_handling: 'Управляемость',
        stat_spool_time: 'Время раскрутки',
        stat_health: 'Здоровье',
        stat_armor: 'Броня',

        //  Gun Crates Page 
        page_gun_crates: 'ЯЩИКИ С ОРУЖИЕМ',
        stat_cost: 'Стоимость',
        stat_content: 'Содержимое',
        stat_cooldown: 'Перезарядка',

        //  Locations Page 
        page_locations: 'ЛОКАЦИИ',
        stat_type: 'Тип',
        stat_description: 'Описание',

        //  NPCs Page 
        page_npcs: 'НПС',
        sort_az: 'А-Я',
        sort_za: 'Я-А',
        card_dialogues: 'ДИАЛОГИ',
        disclaimer_wip: 'Эта страница ещё не завершена и находится в разработке',

        //  Missions Page 
        page_missions: 'МИССИИ',
        cat_game_missions: 'Игровые миссии',
        cat_erik_missions: 'Миссии Эрика',
        cat_dan_missions: 'Миссии Дэна',
        cat_sirb_missions: 'Миссии сэра Б',
        cat_bert_missions: 'Миссии Берта',
        cat_easter_missions: 'Пасхальные миссии',
        cat_christmas_missions: 'Рождественские миссии',
        sort_hardest: 'Сначала сложные',
        sort_easiest: 'Сначала лёгкие',
        stat_how: 'Как',
        stat_reward: 'Награда',

        //  Events Page 
        page_events: 'СОБЫТИЯ',

        //  ATMs & Vaults Page 
        page_atms: 'БАНКОМАТЫ И СЕЙФЫ',
        stat_cash: 'Наличные',

        //  Store Page 
        page_store: 'МАГАЗИН',
        stat_price: 'Цена',
        stat_category: 'Категория',

        //  Valuables Page 
        page_valuables: 'ЦЕННОСТИ',
        stat_value: 'Ценность',
        stat_rarity: 'Редкость',
        stat_weight: 'Вес',
        stat_common_location: 'Обычное Местоположение',
        free: 'Бесплатно',
        attr_optics: 'Оптика',
        attr_muzzle: 'Дуло',
        attr_underbarrel: 'Подствольный',
        attr_tactical: 'Тактический',
        attr_ammunition: 'Боеприпасы',
        attr_stock: 'Приклад',

        //  Promo Codes Page 
        page_promo_codes: 'ПРОМОКОДЫ',
        filter_all: 'Все коды',
        filter_active: 'Активные',
        filter_expired: 'Истёкшие',
        promo_disclaimer: 'Новые коды добавляются периодически. Следите за обновлениями!',
        status_active: 'АКТИВЕН',
        status_expired: 'ИСТЁК',
        stat_status: 'Статус',
        stat_code_reward: 'Награда',

        //  Generic 
        show_more: 'Показать больше...',
        show_less: 'Показать меньше',
        card_attachments: 'ОБВЕСЫ',
        label_free: 'Бесплатно',

    },

    // ══════════════════════════════════════════════════════
    //  ARABIC
    // ══════════════════════════════════════════════════════
    ar: {

        //  Navigation 
        nav_home: 'الرئيسية',
        nav_combat: 'القتال',
        nav_world: 'العالم',
        nav_economy: 'الاقتصاد',
        nav_weapons: 'الأسلحة',
        nav_vehicles: 'المركبات',
        nav_gun_crates: 'صناديق الأسلحة',
        nav_locations: 'المواقع',
        nav_npcs: 'الشخصيات',
        nav_missions: 'المهام',
        nav_events: 'الأحداث',
        nav_atms: 'الصرافات والخزائن',
        nav_store: 'المتجر',
        nav_valuables: 'الأشياء الثمينة',
        nav_promo_codes: 'رموز العروض',
        nav_search: 'ابحث في الأرشيف...',

        //  Settings Panel 
        settings_title: 'الإعدادات',
        settings_music_volume: 'مستوى الصوت',
        settings_custom_music: 'موسيقى مخصصة (.mp3)',
        settings_upload: 'رفع',
        settings_reset: 'إعادة تعيين',
        settings_card_size: 'حجم البطاقة',
        settings_low_end: 'وضع الأداء المنخفض',
        settings_sidebar: 'الشريط الجانبي الأيسر',
        settings_always_more: 'إظهار المزيد دائمًا',
        settings_intro: 'المقدمة',
        settings_language: 'اللغة',
        toggle_on: 'مفعّل',
        toggle_off: 'معطّل',

        //  Home Page 
        home_hero_title: 'ويكي وانتد',
        home_hero_text: 'مرحبًا بك في <strong>ويكي وانتد</strong> الشامل.<br>هنا نسجّل كل المعلومات عن لعبة Roblox Wanted.',
        home_hero_disclaimer: '<em>ملاحظة: هذا الويكي مُدار من قِبل المجتمع وغير تابع لـ Roblox أو لعبة Wanted أو DevvGames.</em>',
        home_play_btn: 'العب هنا',
        home_recent_updates: 'آخر التحديثات',
        home_next_update: 'التحديث القادم',
        home_calculating: 'جارٍ الحساب...',
        home_admin_title: 'الإدارة والإشراف',
        home_admin_text: 'معلومات عن الفريق خلف ويكي وانتد.',
        home_wiki_staff: 'فريق الويكي',
        home_wiki_contributors: 'مساهمو الويكي',
        home_no_staff: 'لا يوجد فريق مسجّل.',
        home_no_contributors: 'لا يوجد مساهمون مسجّلون.',
        home_viewers_title: 'عدد المشاهدين',
        home_viewers_subtext: 'الهويات الفريدة المسجلة',
        home_featured_videos: 'فيديوهات مميزة',
        home_combat_desc: 'إحصائيات الأسلحة والمرفقات والأسعار.',
        home_vehicles_desc: 'إحصائيات المركبات والتعامل معها والتعديلات (قريباً).',
        home_gun_crates_desc: 'صناديق الأسلحة ومواقعها.',
        home_locations_desc: 'خريطة المواقع الرئيسية.',
        home_npcs_desc: 'الشخصيات غير اللاعبة وحواراتهم.',
        home_missions_desc: 'معلومات حول المهمات وكيفية إكمالها.',
        home_events_desc: 'معلومات حول فعاليات اللعبة الاحتفالية.',
        home_atms_desc: 'معلومات حول أجهزة الصراف الآلي والخزائن.',
        home_store_desc: 'معلومات حول المتجر داخل اللعبة.',
        home_valuables_desc: 'معلومات حول الأشياء الثمينة وأسعارها.',
        home_promo_codes_desc: 'أكواد ترويجية نشطة ومكافآت.',

        //  Weapons Page 
        page_weapons: 'الأسلحة',
        cat_guns: 'البنادق',
        cat_explosives: 'المتفجرات',
        cat_tools: 'الأدوات',
        sort_expensive: 'من الأغلى إلى الأرخص',
        sort_cheap: 'من الأرخص إلى الأغلى',
        stat_obtaining: 'طريقة الحصول',
        stat_location: 'الموقع',
        stat_rebuy: 'إعادة الشراء',
        stat_sell: 'سعر البيع',
        stat_ammo: 'الذخيرة',
        stat_ammo_cost: 'تكلفة الذخيرة',
        stat_damage: 'الضرر',
        stat_rpm: 'دورة/دقيقة',
        stat_reload: 'إعادة التحميل',
        stat_accuracy: 'الدقة',

        //  Vehicles Page 
        page_vehicles: 'المركبات',
        cat_ground_vehicles: 'المركبات البرية',
        cat_air_vehicles: 'المركبات الجوية',
        stat_repair: 'الإصلاح',
        stat_garage_repair: 'إصلاح الجراج',
        stat_top_speed: 'السرعة القصوى',
        stat_acceleration: 'التسارع',
        stat_braking: 'الكبح',
        stat_handling: 'التحكم',
        stat_spool_time: 'وقت الدوران',
        stat_health: 'الصحة',
        stat_armor: 'الدرع',

        //  Gun Crates Page 
        page_gun_crates: 'صناديق الأسلحة',
        stat_cost: 'التكلفة',
        stat_content: 'المحتوى',
        stat_cooldown: 'وقت الانتظار',

        //  Locations Page 
        page_locations: 'المواقع',
        stat_type: 'النوع',
        stat_description: 'الوصف',

        //  NPCs Page 
        page_npcs: 'الشخصيات',
        sort_az: 'أ-ي',
        sort_za: 'ي-أ',
        card_dialogues: 'الحوارات',
        disclaimer_wip: 'هذه الصفحة غير مكتملة وقيد العمل',

        //  Missions Page 
        page_missions: 'المهام',
        cat_game_missions: 'مهام اللعبة',
        cat_erik_missions: 'مهام إريك',
        cat_dan_missions: 'مهام دان',
        cat_sirb_missions: 'مهام السير. ب',
        cat_bert_missions: 'مهام بيرت',
        cat_easter_missions: 'مهام عيد الفصح',
        cat_christmas_missions: 'مهام عيد الميلاد',
        sort_hardest: 'الأصعب أولًا',
        sort_easiest: 'الأسهل أولًا',
        stat_how: 'كيفية',
        stat_reward: 'المكافأة',

        //  Events Page 
        page_events: 'الأحداث',

        //  ATMs & Vaults Page 
        page_atms: 'الصرافات والخزائن',
        stat_cash: 'النقد',

        //  Store Page 
        page_store: 'المتجر',
        stat_price: 'السعر',
        stat_category: 'الفئة',

        //  Valuables Page 
        page_valuables: 'الأشياء الثمينة',
        stat_value: 'القيمة',
        stat_rarity: 'الندرة',
        stat_weight: 'الوزن',
        stat_common_location: 'الموقع المشترك',
        free: 'مجاني',
        attr_optics: 'البصريات',
        attr_muzzle: 'الفوهة',
        attr_underbarrel: 'تحت السبطانة',
        attr_tactical: 'تكتيكي',
        attr_ammunition: 'الذخيرة',
        attr_stock: 'الأخمص',

        //  Promo Codes Page 
        page_promo_codes: 'رموز العروض',
        filter_all: 'جميع الرموز',
        filter_active: 'النشطة',
        filter_expired: 'المنتهية',
        promo_disclaimer: 'تُضاف رموز جديدة بشكل دوري. ترقّب التحديثات!',
        status_active: 'نشط',
        status_expired: 'منتهي',
        stat_status: 'الحالة',
        stat_code_reward: 'المكافأة',

        //  Generic 
        show_more: 'عرض المزيد...',
        show_less: 'عرض أقل',
        card_attachments: 'الملحقات',
        label_free: 'مجاني',

    },

    // ══════════════════════════════════════════════════════
    //  TURKISH
    // ══════════════════════════════════════════════════════
    tr: {

        //  Navigation 
        nav_home: 'ANA SAYFA',
        nav_combat: 'SAVAŞ',
        nav_world: 'DÜNYA',
        nav_economy: 'EKONOMİ',
        nav_weapons: 'SİLAHLAR',
        nav_vehicles: 'ARAÇLAR',
        nav_gun_crates: 'SANDIKLAR',
        nav_locations: 'KONUMLAR',
        nav_npcs: 'NPCler',
        nav_missions: 'GÖREVLER',
        nav_events: 'ETKINLIKLER',
        nav_atms: 'ATM\'ler VE KASALAR',
        nav_store: 'MAĞAZA',
        nav_valuables: 'DEĞERLİ EŞYALAR',
        nav_promo_codes: 'PROMO KODLAR',
        nav_search: 'Arşivde ara...',

        //  Settings Panel 
        settings_title: 'AYARLAR',
        settings_music_volume: 'Müzik Ses Düzeyi',
        settings_custom_music: 'Özel Müzik (.mp3)',
        settings_upload: 'Yükle',
        settings_reset: 'Sıfırla',
        settings_card_size: 'Kart Boyutu',
        settings_low_end: 'Düşük Performans Modu',
        settings_sidebar: 'Sol Kenar Çubuğu',
        settings_always_more: 'Her Zaman Daha Fazla Göster',
        settings_intro: 'Giriş',
        settings_language: 'Dil',
        toggle_on: 'AÇIK',
        toggle_off: 'KAPALI',

        //  Home Page 
        home_hero_title: 'WANTED WİKİ',
        home_hero_text: 'Nihai <strong>Wanted Wiki</strong>\'ye hoş geldiniz.<br>Burada Roblox oyunu Wanted hakkında tüm bilgileri kayıt altına alıyoruz.',
        home_hero_disclaimer: '<em>Not: Bu wiki topluluk tarafından yönetilmektedir ve Roblox, Wanted oyunu veya DevvGames ile bağlantısı yoktur.</em>',
        home_play_btn: 'BURADA OYNA',
        home_recent_updates: 'SON GÜNCELLEMELER',
        home_next_update: 'SONRAKİ GÜNCELLEME',
        home_calculating: 'Hesaplanıyor...',
        home_admin_title: 'Yönetim ve Denetim',
        home_admin_text: 'Wanted Wiki\'nin arkasındaki ekip hakkında bilgi.',
        home_wiki_staff: 'WİKİ PERSONELİ',
        home_wiki_contributors: 'WİKİ KATILIMCILARI',
        home_no_staff: 'Personel listesi yok.',
        home_no_contributors: 'Katılımcı listesi yok.',
        home_viewers_title: 'İZLEYİCİ SAYISI',
        home_viewers_subtext: 'KAYDEDİLEN BENZERSİZ KİMLİKLER',
        home_featured_videos: 'ÖNE ÇIKAN VİDEOLAR',
        home_combat_desc: 'Silah istatistikleri, eklentiler ve fiyatlar.',
        home_vehicles_desc: 'Araç istatistikleri, yol tutuşu ve modifikasyonlar (yakında).',
        home_gun_crates_desc: 'Silah sandıkları ve konumları.',
        home_locations_desc: 'Önemli konumların haritası.',
        home_npcs_desc: "NPC'ler ve diyalogları.",
        home_missions_desc: 'Görevler ve nasıl tamamlanacakları hakkında bilgi.',
        home_events_desc: 'Oyun festivalleri hakkında bilgi.',
        home_atms_desc: 'ATM\'ler ve Kasalar hakkında bilgi.',
        home_store_desc: 'Oyun içi mağaza hakkında bilgi.',
        home_valuables_desc: 'Değerli eşyalar ve fiyatları hakkında bilgi.',
        home_promo_codes_desc: 'Aktif promosyon kodları ve ödüller.',

        //  Weapons Page 
        page_weapons: 'SİLAHLAR',
        cat_guns: 'Silahlar',
        cat_explosives: 'Patlayıcılar',
        cat_tools: 'Aletler',
        sort_expensive: 'En Pahalıdan En Ucuza',
        sort_cheap: 'En Ucuzdan En Pahalıya',
        stat_obtaining: 'Edinim',
        stat_location: 'Konum',
        stat_rebuy: 'Yeniden Satın Alma',
        stat_sell: 'Satış Fiyatı',
        stat_ammo: 'Mermi',
        stat_ammo_cost: 'Mermi Maliyeti',
        stat_damage: 'Hasar',
        stat_rpm: 'RPM',
        stat_reload: 'Şarjör Değiştirme',
        stat_accuracy: 'İsabet',

        //  Vehicles Page 
        page_vehicles: 'ARAÇLAR',
        cat_ground_vehicles: 'Kara Araçları',
        cat_air_vehicles: 'Hava Araçları',
        stat_repair: 'Tamir',
        stat_garage_repair: 'Garaj Tamiri',
        stat_top_speed: 'Azami Hız',
        stat_acceleration: 'İvme',
        stat_braking: 'Fren',
        stat_handling: 'Kullanım',
        stat_spool_time: 'Spool Süresi',
        stat_health: 'Sağlık',
        stat_armor: 'Zırh',

        //  Gun Crates Page 
        page_gun_crates: 'SANDIKLAR',
        stat_cost: 'Maliyet',
        stat_content: 'İçerik',
        stat_cooldown: 'Bekleme Süresi',

        //  Locations Page 
        page_locations: 'KONUMLAR',
        stat_type: 'Tür',
        stat_description: 'Açıklama',

        //  NPCs Page 
        page_npcs: 'NPCler',
        sort_az: 'A-Z',
        sort_za: 'Z-A',
        card_dialogues: 'DIYALOGLAR',
        disclaimer_wip: 'Bu sayfa henüz tamamlanmamış ve üzerinde çalışılmaktadır',

        //  Missions Page 
        page_missions: 'GÖREVLER',
        cat_game_missions: 'Oyun Görevleri',
        cat_erik_missions: 'Erik\'in Görevleri',
        cat_dan_missions: 'Dan\'ın Görevleri',
        cat_sirb_missions: 'Sir. B\'nin Görevleri',
        cat_bert_missions: 'Bert\'in Görevleri',
        cat_easter_missions: 'Paskalya Görevleri',
        cat_christmas_missions: 'Noel Görevleri',
        sort_hardest: 'En Zor Önce',
        sort_easiest: 'En Kolay Önce',
        stat_how: 'Nasıl',
        stat_reward: 'Ödül',

        //  Events Page 
        page_events: 'ETKİNLİKLER',

        //  ATMs & Vaults Page 
        page_atms: 'ATM\'ler VE KASALAR',
        stat_cash: 'Nakit',

        //  Store Page 
        page_store: 'MAĞAZA',
        stat_price: 'Fiyat',
        stat_category: 'Kategori',

        //  Valuables Page 
        page_valuables: 'DEĞERLİ EŞYALAR',
        stat_value: 'Değer',
        stat_rarity: 'Nadirlik',
        stat_weight: 'Ağırlık',
        stat_common_location: 'Yaygın Konum',
        free: 'Ücretsiz',
        attr_optics: 'Optik',
        attr_muzzle: 'Namlu',
        attr_underbarrel: 'Namlu Altı',
        attr_tactical: 'Taktik',
        attr_ammunition: 'Mühimmat',
        attr_stock: 'Dipçik',

        //  Promo Codes Page 
        page_promo_codes: 'PROMO KODLAR',
        filter_all: 'Tüm Kodlar',
        filter_active: 'Aktif',
        filter_expired: 'Süresi Dolmuş',
        promo_disclaimer: 'Yeni kodlar periyodik olarak eklenmektedir. Güncellemeleri takip edin!',
        status_active: 'AKTİF',
        status_expired: 'SÜRESİ DOLDU',
        stat_status: 'Durum',
        stat_code_reward: 'Ödül',

        //  Generic 
        show_more: 'Daha fazla göster...',
        show_less: 'Daha az göster',
        card_attachments: 'AKSESUARLAR',
        label_free: 'Ücretsiz',

    },

    // ══════════════════════════════════════════════════════
    //  CHINESE-SIMPLIFIED
    // ══════════════════════════════════════════════════════
    zh: {

        //  Navigation 
        nav_home: '主页',
        nav_combat: '战斗',
        nav_world: '世界',
        nav_economy: '经济',
        nav_weapons: '武器',
        nav_vehicles: '载具',
        nav_gun_crates: '武器箱',
        nav_locations: '重要地点',
        nav_npcs: 'NPC',
        nav_missions: '任务',
        nav_events: '活动',
        nav_atms: 'ATM&金库',
        nav_store: '商店',
        nav_valuables: '高价值物品',
        nav_promo_codes: '兑换码',
        nav_search: '搜索档案库……',

        //  Settings Panel 
        settings_title: '设置',
        settings_music_volume: '音乐音量',
        settings_custom_music: '自定义音乐(.mp3)',
        settings_upload: '上传',
        settings_reset: '重置',
        settings_card_size: '卡片大小',
        settings_low_end: '低端设备支持',
        settings_sidebar: '使用左侧边栏',
        settings_always_more: '始终开启“显示更多”',
        settings_intro: '开场',
        settings_language: '语言（Language）',
        toggle_on: '开启',
        toggle_off: '关闭',

        //  Home Page 
        home_hero_title: 'WANTED 维基',
        home_hero_text: '欢迎来到 <strong>Wanted 维基</strong>.<br>我们在此收录Roblox游戏Wanted的所有内容，包括武器细节、载具，以及更多内容',
        home_hero_disclaimer: '<em>请注意：该维基由玩家社区运营，并且与Roblox、Wanted游戏、DevvGames开发组无关</em>',
        home_play_btn: '跳转到游戏页面',
        home_recent_updates: '近期更新',
        home_next_update: '下一次版本更新',
        home_calculating: '计算中...',
        home_admin_title: '管理组',
        home_admin_text: 'WANTED 维基团队成员',
        home_wiki_staff: '维基人员',
        home_wiki_contributors: '维基贡献者',
        home_no_staff: 'No staff listed.',
        home_no_contributors: 'No contributors listed.',
        home_viewers_title: '观看人数',
        home_viewers_subtext: '已记录的唯一身份',
        home_featured_videos: '推荐视频',
        home_combat_desc: '武器属性、配件和价格。',
        home_vehicles_desc: '车辆属性、操控和改装（即将推出）。',
        home_gun_crates_desc: '武器箱及其位置。',
        home_locations_desc: '关键地点地图。',
        home_npcs_desc: 'NPC 及其对话。',
        home_missions_desc: '关于任务及如何完成它们的信息。',
        home_events_desc: '关于游戏节日活动的信息。',
        home_atms_desc: '关于 ATM 和金库的信息。',
        home_store_desc: '关于游戏内商店的信息。',
        home_valuables_desc: '关于高价值物品及其价格的信息。',
        home_promo_codes_desc: '有效的兑换码和奖励。',

        //  Weapons Page 
        page_weapons: '武器',
        cat_guns: '枪械',
        cat_explosives: '爆炸物',
        cat_tools: '工具',
        sort_expensive: '价格：由高到低',
        sort_cheap: '价格：由低到高',
        stat_obtaining: '获取方式',
        stat_location: '获取位置',
        stat_rebuy: '单价',
        stat_sell: '贩卖价值',
        stat_ammo: '备弹',
        stat_ammo_cost: '弹药价格',
        stat_damage: '伤害',
        stat_rpm: '射速（每分钟/发）',
        stat_reload: '换弹时间',
        stat_accuracy: '精准度',

        //  Vehicles Page 
        page_vehicles: '载具',
        cat_ground_vehicles: '车辆',
        cat_air_vehicles: '飞行器',
        stat_repair: '维修价格（手机）',
        stat_garage_repair: '维修价格（汽修店）',
        stat_top_speed: '最高时速',
        stat_acceleration: '加速',
        stat_braking: '刹车',
        stat_handling: '操控',
        stat_spool_time: '起飞耗时',
        stat_health: '生命值',
        stat_armor: '装甲',

        //  Gun Crates Page 
        page_gun_crates: '武器箱',
        stat_cost: 'Cost',
        stat_content: '包含',
        stat_cooldown: '冷却时间',

        //  Locations Page 
        page_locations: '重要地点',
        stat_type: '类型',
        stat_description: '描述',

        //  NPCs Page 
        page_npcs: 'NPC',
        sort_az: 'A-Z',
        sort_za: 'Z-A',
        card_dialogues: '对话',
        disclaimer_wip: '仍在施工ing',

        //  Missions Page 
        page_missions: '任务',
        cat_game_missions: '系统任务线',
        cat_erik_missions: '埃里克任务线',
        cat_dan_missions: '丹任务线',
        cat_sirb_missions: 'B先生任务线',
        cat_bert_missions: '博特任务线',
        cat_easter_missions: '复活节活动任务线',
        cat_christmas_missions: '圣诞节活动任务线',
        sort_hardest: '由难至简',
        sort_easiest: '由简至难',
        stat_how: '如何完成',
        stat_reward: '奖励',

        //  Events Page 
        page_events: '活动',

        //  ATMs & Vaults Page 
        page_atms: 'ATM&金库',
        stat_cash: '现金',

        //  Store Page 
        page_store: '商店',
        stat_price: '价格',
        stat_category: '类型',

        //  Valuables Page 
        page_valuables: '高价值物品',
        stat_value: '价格',
        stat_rarity: '稀有程度',
        stat_weight: '重量',
        stat_common_location: '常见位置',
        free: '免费',
        attr_optics: '光学镜',
        attr_muzzle: '枪口',
        attr_underbarrel: '下挂配件',
        attr_tactical: '战术配件',
        attr_ammunition: '弹药',
        attr_stock: '枪托',

        //  Promo Codes Page 
        page_promo_codes: '兑换码',
        filter_all: '所有兑换码',
        filter_active: '有效',
        filter_expired: '已过期',
        promo_disclaimer: '新的兑换码会定期推出，敬请留意新的更新！',
        status_active: '有效',
        status_expired: '已过期',
        stat_status: '状态',
        stat_code_reward: '奖励',

        //  Generic 
        show_more: '显示更多',
        show_less: '关闭',
        card_attachments: '可用配件',
        label_free: '免费',

    },
};