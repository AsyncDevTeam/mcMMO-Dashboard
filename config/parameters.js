//Here you can change translation, gradient colors and more

//Used as template
const abilities = ['taming', 'mining', 'woodcutting', 'repair', 'unarmed', 'herbalism', 'excavation', 'archery', 'swords', 'axes', 'acrobatics', 'fishing', 'alchemy']
const families = {
    'Gathering': ['Mining', 'Woodcutting', 'Herbalism', 'Fishing'],
    'Crafting': ['Repair', 'Alchemy', 'Taming', 'Excavation'],
    'Combat': ['Unarmed', 'Swords', 'Axes', 'Archery'],
    'Adventuring': ['Acrobatics']
}
//If you have changed the default provided by mcMMO, change them here to
const abilities_cap = {
    'swords': 1250,
    'axes': 1250,
    'archery': 1000,
    'unarmed': 1000,
    'taming': 1500,
    'woodcutting': 1500,
    'excavation': 1500,
    'repair': 1500,
    'fishing': 1500,
    'alchemy': 1500,
    'herbalism': 1500,
    'mining': 1500,
    'acrobatics': 1500
}
//Change the translation here, by default English is used, set your own language in translation.user and set translation.user.active to true
//New translation mode
const translation = {
    'active': 'EN',
    'EN': {
        'title_header': 'mcMMO Dashboard',
        'pages_name':{
            'index': 'mcMMO Stats | Home',
            'user': 'mcMMO Stats | _USER_',
            'search-user': 'mcMMO Stats | Search user',
            'comparison': 'mcMMO Stats | Comparison',
        },
        'access' : ['en-EN', 'en-GB'],
        'ab' : {
            'taming': 'Taming',
            'mining': 'Mining',
            'woodcutting': "Woodcutting",
            'repair': 'Repair',
            'unarmed': 'Unarmed',
            'herbalism': 'Herbalism',
            'excavation': 'Excavation',
            'archery': 'Archery',
            'swords': 'Swords',
            'axes': 'Axes',
            'acrobatics': 'Acrobatics',
            'fishing': 'Fishing',
            'alchemy': 'Alchemy'
        },
        'family': {
            'Gathering': 'Gathering',
            'Crafting': 'Crafting',
            'Combat': 'Combat',
            'Adventuring': 'Adventuring'
        },
        'ab_labels': {
            'sum': 'Exp',
            'ab': 'Abilities'
        },
        'title': {
            'best_player_of_server': 'Best player of server',
            'worst_player_of_server': 'Worst player of server',
            'last_co_in_server': 'Most recent connection',
            'ten_years_ago_co_in_server': 'Oldest connection',
        },
        'content_page':{
            'section_names': {
                'index': {
                    'section-1': 'Best players of server',
                    'section-2': 'Leaderboard',
                    'section-3': 'By abilities',
                    'section-4': 'By abilities (min max)',
                    'section-5': 'Best abilities of server',
                },
                'user' : {
                    'section-1': 'Skills level',
                    'section-2': 'All abilities',
                    'section-3': 'Capacity Comparison',
                    'section-3-bis': 'The comparison is made between the best player of the server and the selected player.'
                },
                'comparison': {
                    'section-1': 'Skills comparison',
                    'section-2': 'Comparison chart',
                }
            },
            'aside': {
                'header': {
                    'sc-h-1': "Server information's",
                    'sc-h-1-s': "Server offline",
                    'sc-h-2': 'Shortcuts',
                    'sc-h-2-a': 'Sorting method',
                },
                'index': {
                    'sc-b-1': 'Leaderboard',
                    'sc-b-2': 'Chart by abilities',
                    'sc-b-3': 'Best cumulative abilities',
                },
                'user' : {
                    'sc-b-1': 'Player infos',
                    'sc-b-2': 'Abilities Level',
                    'sc-b-3': 'Abilities',
                    'sc-b-4': 'Comparison chart',
                },
                'comparison': {
                    'sc-b-1': 'Skills comparison',
                    'sc-b-2': 'Comparison chart',
                }
            },
            'search': {
                'search_player_avt': 'Search a player',
                'search_abi_avt' : 'Search an ability',
                'no_result': 'No results found - try your search again'
            },
            'buttons': {
                'clear_player_avt': 'Clear',
                'sort_avt': 'Sort',
                'sort_a':'Alphabetical sorting',
                'sort_n':'Numerical sorting',
                'back_to_top': 'Back to top'
            },
            'select': {
                'select-before': 'Show',
                'select-after': 'entries',
            },
            'general': {
                'best_ab': 'Best ability',
                'label_ab': 'Best player for ability _AB_',
                'table_player_label':'Player',
                'table_total_label':'Total'
            },
            'toast': {
                'IP_success' : 'IP sucessfully copied',
                'IP_error' : "Error copying IP address",
                'best_player': 'No comparison can be made with the best player on the server',
                'error_db': 'Data loading error'
            },
            'tabs': {
                'tabs-1': 'Home',
                'tabs-2': 'Find a player',
                'tabs-3': 'Comparison',
                'tabs-dm': 'Dark mode',
            },
            'pages':{
                'search-user': {
                    'title': 'Search for a player',
                    'subtitle': 'Search for a player to access their user page',
                    'button': 'Search',
                },
                'comparison': {
                    'explanation': {
                        'intro': '',
                        'in_chart': '_PERCENT_% of max _MAX_ reached'
                    },
                    'link': {
                        'see_profile': 'See profile'
                    }
                }
            },
            'quickView':{
                'qv-tag': 'Player',
                'qv-g-rank': 'General',
                'qv-rank': 'Current rank',
                'qv-seeSkills':'See skill levels'
            }
        },
        'dataTable': {
            "sProcessing":    "Processing...",
            "sLengthMenu":    "Show _MENU_ entries",
            "sZeroRecords":   "No matching records found",
            "sEmptyTable":    "No data available in table",
            "sInfo":          "Showing _START_ to _END_ of _TOTAL_ entries",
            "sInfoEmpty":     "Showing 0 to 0 of 0 entries",
            "sInfoFiltered":  "(filtered from _MAX_ total entries)",
            "oPaginate": {
                "sFirst":    "First",
                "sLast":    "Last",
                "sNext":    "Next",
                "sPrevious": "Previous"
            }
        },
        'refresh' : {
            'index': 'Refreshed at _HOUR_',
            'user': 'Last connection at _HOUR_h_MIN_, _DATE_'
        },
        'card': {
            'best_card_label_avt': 'Current level : _CURRENT_LVL_/_MAX_LEVEL_',
            'card_level_avt': 'Current level : _CURRENT_LVL_',
            'card_level_next_avt': '_EXP_PERCENT_ % left - _EXP_LEFT_ exp left'
        },
        'recommendation': {
            'title_recommendation_avt': 'Improve your experience gain based on our recommendations.',
            'info': 'Information on _ABI_',
            'info_array': 'Special abilities',
            'link': 'Link to Fandom website',
            'ab': {
                'swords': {
                    'def': "The Swords includes abilities which allow you to add Rupture effects to your attacks and counter the enemy's hits."
                },
                'axes': {
                    'def': "Axes is a skill based on using the axe tool as a weapon to fight mobs and other players. It adds more variety to gameplay by introducing a new type of weapon viable for many situations."
                },
                'archery': {
                    'def': "Archery is a skill focused on dealing damage to mobs and players using a bow and arrows."
                },
                'unarmed': {
                    'def': "Unarmed is a combat skill; it uses the player's empty hand as a weapon. It includes many perks, such as disarming, deflecting arrows, higher base unarmed attack, and more.",
                    'levels' : [
                        [0, 'Steel Arm Style (passive)'],
                        [0, 'Arrow Deflect (passive)'],
                        [0, 'Disarm (passive)'],
                        [0, 'Iron Grip (passive)'],
                        [0, 'Berserker'],
                    ]
                },
                'taming': {
                    'def': "Taming is a skill in McMMO. As your level increases, your wolves will get abilities that increase damage, defense and other things.",
                    'levels' : [
                        [100, 'Environmentally Aware'],
                        [150, 'Gore'],
                        [200, 'Pummel'],
                        [200, 'Fast Food Service'],
                        [250, 'Thick Fur'],
                        [350, 'Holy Hound'],
                        [500, 'Shock Proof'],
                        [750, 'Sharpened Claws'],
                    ]
                },
                'woodcutting': {
                    'def': "Woodcutting is a skill that is based around chopping trees down with an axe. Levelling the skill gives you increased chances of extra wood dropping from trees, as well as extra duration on the tree feller ability.",
                    'levels' : [
                        [0, 'Harvest Lumber (passive)'],
                        [0, 'Knock on Wood (passive)'],
                        [5, 'Tree Feller'],
                        [15, 'Leaf Blower'],
                    ]
                },
                'excavation': {
                    'def': "Excavation is the ability in McMMO related to using a shovel to dig anything on the soil chart, including exotic materials like Soul Sand. High-level Excavators can produce diamonds from dirt easily. "
                },
                'repair': {
                    'def': "Repair is the parent skill of both current child skills, Smelting and Salvage, paired with Mining and Fishing, respectively. It can be used to repair tools and armor on Blocks of Iron."
                },
                'fishing': {
                    'def': "Fishing increases the chance of finding catches, and can pull up useful loot. It also has the Shake ability, which pulls drops from mobs without having to kill them."
                },
                'alchemy': {
                    'def': "Alchemy is a miscellaneous skill based on brewing potions. It is leveled through the creation and modification of potions in a brewing stand. Additionally, some effects that are normally unobtainable through vanilla potions are given custom recipes."
                },
                'herbalism': {
                    'def': "Herbalism is a skill in McMMO that governs the ability to harvest plants and crops excluding trees and other more structural occurences of plants. It requires multiple tools to make the full use of its abilities.",
                    'levels' : [
                        [0, 'Green Thumb'],
                        [0, 'Shroom Thumb'],
                        [0, 'Hylian Luck'],
                        [0, 'Double Drops'],
                        [50, 'Green Terra'],
                        [200, "Farmer's Diet"],
                    ]
                },
                'mining':{
                    'def': "Mining is a skill focused around mining stone and ore. A notable perk of this skill is the higher potential yield from each ore, increased even further when using an active skill",
                    'levels' : [
                        [0, 'Double Drops'],
                        [50, 'Super Breaker'],
                        [125, 'Blast Mining'],
                        [375, 'Bigger Bombs'],
                        [500, 'Demolitions Expertise']
                    ]
                },
                'acrobatics': {
                    'def': "Acrobatics is a skill that allows Graceful Roll, as well as combat damage negation with the passive skill \"Dodge\"."
                }
            }
        },
        'offline': {
            'rule': 'Offline - check your internet connection and retry.',
            'email': 'Report a problem on _EMAIL_'
        },
        'labels_user': {
            'best_player_of_server': {'label' : 'Best player of server', 'method': 'max', 'infos': 'total'},
            'worst_player_of_server': {'label': 'Worst player of server', 'method': 'min', 'infos': 'total'},
            'last_co_in_server': {'label': 'Hard gamer', 'method': 'max', 'infos': 'last_connection'},
            'ten_years_ago_co_in_server': {'label': 'Professional sleeper', 'method': 'min', 'infos': 'last_connection'},
            'taming' : 'Animal lover',
            'mining' : "Gold digger",
            'woodcutting' : 'Chainsaw man',
            'repair' : 'Nothing is lost',
            'unarmed' : 'Badass',
            'herbalism' : 'Full time gardener',
            'excavation' : 'Did you lose something?',
            'archery' : "Sniper",
            'swords' : 'Outstanding Fighter',
            'axes' : 'Exotic fighter',
            'acrobatics' : "Circus art",
            'fishing' : 'AFK',
            'alchemy' : 'The Sorcerer'
        }
    },
    'FR': {
        'title_header': 'mcMMO Dashboard',
        'pages_name':{
            'index': 'mcMMO Stats | Accueil',
            'user': 'mcMMO Stats | _USER_',
            'search-user': 'mcMMO Stats | Rechercher un utilisateur',
            'comparison': 'mcMMO Stats | Comparaison',
        },
        'access' : ['fr-FR'],
        'ab' : {
            'taming': 'Apprivoisement',
            'mining': 'Minage',
            'woodcutting': 'Bûcheronnage',
            'repair': 'Réparation',
            'unarmed': 'Poings',
            'herbalism': 'Herboristerie',
            'excavation': 'Excavation',
            'archery': "Tir à l'arc",
            'swords': 'Épées',
            'axes': 'Haches',
            'acrobatics': 'Acrobatie',
            'fishing': 'Pêche',
            'alchemy': 'Potions',
        },
        'family': {
            'Gathering': 'Collecte',
            'Crafting': 'Artisanat',
            'Combat': 'Combat',
            'Adventuring': 'Aventure'
        },
        'ab_labels': {
            'sum': 'Exp',
            'ab': 'Capacités'
        },
        'title': {
            'best_player_of_server': 'Meilleur joueur du server',
            'worst_player_of_server': 'Pire joueur du server',
            'last_co_in_server': 'Connexion la plus récente',
            'ten_years_ago_co_in_server': 'Connexion la plus ancienne',
        },
        'content_page':{
            'section_names': {
                'index': {
                    'section-1': 'Meilleurs joueurs du serveur',
                    'section-2': 'Classement',
                    'section-3': 'Par capacités',
                    'section-4': 'Par capacités (min max)',
                    'section-5': 'Meilleurs capacités du serveur',
                },
                'user' : {
                    'section-1': 'Niveau de compétence',
                    'section-2': 'Toutes les capacités',
                    'section-3': 'Comparaison des capacités',
                    'section-3-bis': 'La comparaison est effectuée entre le meilleur joueur du serveur et le joueur sélectionné.'
                },
                'comparison': {
                    'section-1': 'Comparaison des compétences',
                    'section-2': 'Graphique de comparaison',
                }
            },
            'aside':{
                'header': {
                    'sc-h-1': "Informations sur le serveur",
                    'sc-h-1-s': "Serveur hors ligne",
                    'sc-h-2': 'Raccourcis',
                    'sc-h-2-a': 'Méthode de tri',
                },
                'index': {
                    'sc-b-1': 'Classement',
                    'sc-b-2': 'Par capacités',
                    'sc-b-3': 'Meilleures capacités cumulées',
                },
                'user' : {
                    'sc-b-1': 'Informations du joueur',
                    'sc-b-2': 'Niveau de capacités',
                    'sc-b-3': 'Capacités',
                    'sc-b-4': 'Graphique de comparaison',
                },
                'comparison': {
                    'sc-b-1': 'Comparaison des compétences',
                    'sc-b-2': 'Graphique de comparaison',
                }
            },
            'search': {
                'search_player_avt' : 'Rechercher un joueur',
                'search_abi_avt' : 'Rechercher une abilité',
                'no_result': 'Aucun résultat trouvé - essayez à nouveau votre recherche'
            },
            'buttons': {
                'clear_player_avt': 'Supprimer',
                'sort_avt': 'Trier',
                'sort_a':'Tri alphabétique',
                'sort_n':'Tri numérique',
                'back_to_top': 'Retour en haut'
            },
            'select': {
                'select-before': 'Afficher',
                'select-after': 'entrées',
            },
            'general': {
                'best_ab': 'Meilleure capacité',
                'label_ab': 'Meilleur joueur pour la capacité _AB_',
                'table_player_label':'Joueur',
                'table_total_label':'Total'
            },
            'toast': {
                'IP_success' : 'Adresse IP copiée',
                'IP_error' : "Erreur lors de la copie de l'adresse IP",
                'best_player': 'Aucune comparaison ne peut être effectuée avec le meilleur joueur du serveur - Graphique désactivé',
                'error_db': 'Erreur de chargement des données'
            },
            'tabs': {
                'tabs-1': 'Accueil',
                'tabs-2': 'Trouver un joueur',
                'tabs-3': 'Comparaison',
                'tabs-dm': 'Mode sombre',
            },
            'pages':{
                'search-user': {
                    'title': 'Rechercher un joueur',
                    'subtitle': 'Rechercher un joueur pour accéder à sa page utilisateur',
                    'button': 'Rechercher',
                },
                'comparison': {
                    'explanation': {
                        'intro': '',
                        'in_chart': '_PERCENT_% du max _MAX_ atteint'
                    },
                    'link': {
                        'see_profile': 'Voir le profil'
                    }
                }
            },
            'quickView':{
                'qv-tag': 'Joueur',
                'qv-g-rank': 'Général',
                'qv-rank': 'Rang actuel',
                'qv-seeSkills':'Voir les niveaux de compétence'
            }
        },
        'dataTable': {
            "sProcessing":    "Traitement...",
            "sLengthMenu":    "Afficher _MENU_ entrées",
            "sZeroRecords":   "Aucun enregistrement correspondant trouvé",
            "sEmptyTable":    "Aucune donnée disponible",
            "sInfo":          "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
            "sInfoEmpty":     "Affichage de 0 à 0 sur 0 entrées",
            "sInfoFiltered":  "(filtré à partir de _MAX_ entrées au total)",
            "oPaginate": {
                "sFirst":    "Premier",
                "sLast":    "Dernier",
                "sNext":    "Suivant",
                "sPrevious": "Précédent"
            }
        },
        'refresh' : {
            'index': 'Mise à jour à _HOUR_',
            'user': 'Dernière connexion à _HOUR_h_MIN_ le _DATE_'
        },
        'card': {
            'best_card_label_avt': 'Niveau actuel : _CURRENT_LVL_/_MAX_LEVEL_',
            'card_level_avt': 'Niveau actuel : _CURRENT_LVL_',
            'card_level_next_avt': '_EXP_PERCENT_ % restant - _EXP_LEFT_ exp restant'
        },
        'recommendation': {
            'title_recommendation_avt': "Améliorez votre gain d'expérience en fonction de nos recommandations.",
            'info': 'Informations sur _ABI_',
            'info_array': 'Capacités spéciales',
            'link': 'Lien vers la page Fandom',
            'ab': {
                'swords': {
                    'def': "Le Swords comprend des capacités qui vous permettent d'ajouter des effets de rupture à vos attaques et de contrer les coups de l'ennemi."
                },
                'axes': {
                    'def': "Haches est une compétence basée sur l'utilisation de l'outil hache comme arme pour combattre les foules et les autres joueurs. Il ajoute plus de variété au gameplay en introduisant un nouveau type d'arme viable dans de nombreuses situations."
                },
                'archery': {
                    'def': "Le tir à l'arc est une compétence axée sur les dégâts infligés aux foules et aux joueurs utilisant un arc et des flèches."
                },
                'unarmed': {
                    'def': "Poings est une compétence de combat ; il utilise la main vide du joueur comme arme. Il comprend de nombreux avantages, tels que le désarmement, la déviation des flèches, une attaque non armée de base plus élevée, etc.",
                    'levels' : [
                        [0, 'Steel Arm Style (passive)'],
                        [0, 'Arrow Deflect (passive)'],
                        [0, 'Disarm (passive)'],
                        [0, 'Iron Grip (passive)'],
                        [0, 'Berserker'],
                    ]
                },
                'taming': {
                    'def': "Au fur et à mesure que votre niveau augmente, vos loups obtiendront des capacités qui augmentent les dégâts, la défense et d'autres choses.",
                    'levels' : [
                        [100, 'Environmentally Aware'],
                        [150, 'Gore'],
                        [200, 'Pummel'],
                        [200, 'Fast Food Service'],
                        [250, 'Thick Fur'],
                        [350, 'Holy Hound'],
                        [500, 'Shock Proof'],
                        [750, 'Sharpened Claws'],
                    ]
                },
                'woodcutting': {
                    'def': "La coupe de bois est une compétence basée sur l'abattage d'arbres avec une hache. Le nivellement de la compétence vous donne plus de chances que du bois supplémentaire tombe des arbres, ainsi qu'une durée supplémentaire sur la capacité d'abattage d'arbres.",
                    'levels' : [
                        [0, 'Harvest Lumber (passive)'],
                        [0, 'Knock on Wood (passive)'],
                        [5, 'Tree Feller'],
                        [15, 'Leaf Blower'],
                    ]
                },
                'excavation': {
                    'def': "L'excavation est la capacité de McMMO liée à l'utilisation d'une pelle pour creuser n'importe quoi sur la carte du sol, y compris des matériaux exotiques comme Soul Sand. Les excavatrices de haut niveau peuvent facilement produire des diamants à partir de la terre."
                },
                'repair': {
                    'def': "La réparation est la compétence parente des deux compétences enfants actuelles, Fonte et Récupération, associées respectivement à l'exploitation minière et à la pêche. Il peut être utilisé pour réparer des outils et des armures sur des blocs de fer."
                },
                'fishing': {
                    'def': "La pêche augmente les chances de trouver des prises et peut rapporter un butin utile. Il a également la capacité Shake, qui récupère les drops des entités sans avoir à les tuer."
                },
                'alchemy': {
                    'def': "L'alchimie est une compétence basée sur la préparation de potions. Il est nivelé par la création et la modification de potions dans un alambic. De plus, certains effets normalement impossibles à obtenir (en Vanilla) reçoivent des recettes personnalisées."
                },
                'herbalism': {
                    'def': "L'herboristerie est une compétence qui correspond à la capacité de récolter des plantes et des cultures à l'exclusion des arbres et d'autres occurrences plus structurelles de plantes. Il nécessite plusieurs outils pour tirer pleinement parti de ses capacités.",
                    'levels' : [
                        [0, 'Green Thumb'],
                        [0, 'Shroom Thumb'],
                        [0, 'Hylian Luck'],
                        [0, 'Double Drops'],
                        [50, 'Green Terra'],
                        [200, "Farmer's Diet"],
                    ]
                },
                'mining':{
                    'def': "L'exploitation minière est une compétence axée sur l'extraction de pierre et de minerai. Un avantage notable de cette compétence est le rendement potentiel plus élevé de chaque minerai, augmenté encore plus lors de l'utilisation d'une compétence active.",
                    'levels' : [
                        [0, 'Double Drops'],
                        [50, 'Super Breaker'],
                        [125, 'Blast Mining'],
                        [375, 'Bigger Bombs'],
                        [500, 'Demolitions Expertise']
                    ]
                },
                'acrobatics': {
                    'def': "L'acrobatie est une compétence qui permet le roulement gracieux, ainsi que la négation des dégâts de combat avec la compétence passive \"Esquive\"."
                }
            }
        },
        'offline': {
            'rule': 'Hors ligne - vérifiez votre connexion et réessayez.',
            'email': 'Signaler un problème sur _EMAIL_'
        },
        'labels_user': {
            'best_player_of_server': {'label' : 'Meilleur joueur du server', 'method': 'max', 'infos': 'total'},
            'worst_player_of_server': {'label': 'Pire joueur du server', 'method': 'min', 'infos': 'total'},
            'last_co_in_server': {'label': 'Joueur acharné', 'method': 'max', 'infos': 'last_connection'},
            'ten_years_ago_co_in_server': {'label': 'Dormeur professionnel', 'method': 'min', 'infos': 'last_connection'},
            'taming' : 'Ami des bêtes',
            'mining' : "Chercheur d'or",
            'woodcutting' : 'La tronconneuse',
            'repair' : 'Rien ne se perd',
            'unarmed' : 'Dur à cuire',
            'herbalism' : 'Jardinier à temps plein',
            'excavation' : 'Tu as perdu quelque chose ?',
            'archery' : "Tireur d'élite",
            'swords' : 'Combattant hors pair',
            'axes' : 'Combattant exotique',
            'acrobatics' : "L'art du cirque",
            'fishing' : 'AFK',
            'alchemy' : 'Le sorcier'
        }
    },
    'DE': {
        'title_header': 'mcMMO Dashboard',
        'pages_name':{
            'index': 'mcMMO Stats | Willkommen',
            'user': 'mcMMO Stats | _USER_',
            'search-user': 'mcMMO Stats | Suchen Sie einen Benutzer',
            'comparison': 'mcMMO Stats | Vergleich',
        },
        'access' : ['de-DE', 'de-DE'],
        'ab' : {
            'taming': 'Zähmen',
            'mining': 'Bergbau',
            'woodcutting': "Holzfäller",
            'repair': 'Reparatur',
            'unarmed': 'Faustkampf',
            'herbalism': 'Kräuterkunde',
            'excavation': 'Graben',
            'archery': 'Bogenschießen',
            'swords': 'Schwert',
            'axes': 'Axtkampf',
            'acrobatics': 'Akrobatik',
            'fishing': 'Angeln',
            'alchemy': 'Alchemie'
        },
        'family': {
            'Gathering': 'Sammeln',
            'Crafting': 'Basteln',
            'Combat': 'Kampf',
            'Adventuring': 'Abenteuer'
        },
        'ab_labels': {
            'sum': 'Erfahrung',
            'ab': 'Fähigkeiten'
        },
        'title': {
            'best_player_of_server': 'Bester Spieler des Servers',
            'worst_player_of_server': 'Schlechtester Spieler des Servers',
            'last_co_in_server': 'Letzte Verbindung',
            'ten_years_ago_co_in_server': 'Älteste Verbindung',
        },
        'content_page':{
            'section_names': {
                'index': {
                    'section-1': 'Beste Spieler des Servers',
                    'section-2': 'Alle Spieler',
                    'section-3': 'Durch Fähigkeiten',
                    'section-4': 'Nach Fähigkeiten (min max)',
                    'section-5': 'Beste Fähigkeiten des Servers',
                },
                'user' : {
                    'section-1': 'Fähigkeitsniveau',
                    'section-2': 'Alle Fähigkeiten',
                    'section-3': 'Kapazitätsvergleich',
                    'section-3-bis': 'Der Vergleich erfolgt zwischen dem besten Spieler des Servers und dem ausgewählten Spieler.'
                }
                ,
                'comparison': {
                    'section-1': 'Kompetenzvergleich',
                    'section-2': 'Vergleichstabelle',
                }
            },
            'aside': {
                'header': {
                    'sc-h-1': "Server Informationen",
                    'sc-h-1-s': "Server Offline",
                    'sc-h-2': 'Schnellauswahl',
                    'sc-h-2-a': 'Sortiermethode',
                },
                'index': {
                    'sc-b-1': 'Alle Spieler',
                    'sc-b-2': 'Diagramm nach Fähigkeiten',
                    'sc-b-3': 'Beste kumulative Fähigkeiten',
                },
                'user' : {
                    'sc-b-1': 'Spieler Info',
                    'sc-b-2': 'Fähigkeitsstufe',
                    'sc-b-3': 'Fähigkeiten',
                    'sc-b-4': 'Vergleichstabelle',
                },
                'comparison': {
                    'sc-b-1': 'Kompetenzvergleich',
                    'sc-b-2': 'Vergleichstabelle',
                }
            },
            'search': {
                'search_player_avt': 'Suche nach einen Spieler',
                'search_abi_avt' : 'Suche nach einer Fähigkeit',
                'no_result': 'Keine Ergebnisse gefunden - versuche die Suche erneut'
            },
            'buttons': {
                'clear_player_avt': 'Leeren',
                'sort_avt': 'Sortieren',
                'sort_a':'Alphabetische Sortierung',
                'sort_n':'Numerische Sortierung',
                'back_to_top': 'Zurück nach oben'
            },
            'select': {
                'select-before': 'Zeige',
                'select-after': 'Einträge',
            },
            'general': {
                'best_ab': 'Beste Fähigkeit',
                'label_ab': 'Bester Spieler für Fähigkeiten _AB_',
                'table_player_label':'Spieler',
                'table_total_label':'Gesamt'
            },
            'toast': {
                'IP_success' : 'IP erfolgreich kopiert',
                'IP_error' : "Fehler beim Kopieren der IP-Adresse",
                'best_player': 'Es kann kein Vergleich mit dem besten Spieler auf dem Server angezeigt werden',
                'error_db': 'Fehler beim Laden der Daten'
            },
            'tabs': {
                'tabs-1': 'Startseite',
                'tabs-2': 'Spieler finden',
                'tabs-3': 'Vergleich',
                'tabs-dm': 'Darkmode',
            },
            'pages':{
                'search-user': {
                    'title': 'Suche nach einem Spieler',
                    'subtitle': 'Suche nach einem Spieler, um auf seine Benutzerseite zuzugreifen',
                    'button': 'Suchen',
                },
                'comparison': {
                    'explanation': {
                        'intro': '',
                        'in_chart': '_PERCENT_% von max _MAX_ erreicht'
                    },
                    'link': {
                        'see_profile': 'Siehe Profil'
                    }
                }
            },
            'quickView':{
                'qv-tag': 'Spieler',
                'qv-g-rank': 'Allgemein',
                'qv-rank': 'Aktueller Rang',
                'qv-seeSkills':'Siehe Fähigkeitsstufen'
            }
        },
        'dataTable': {
            "sProcessing":    "Wird bearbeitet...",
            "sLengthMenu":    "Zeige <b>_MENU_</b> Einträge",
            "sZeroRecords":   "Keine übereinstimmenden Aufzeichnungen gefunden",
            "sEmptyTable":    "Keine Daten in der Tabelle verfügbar",
            "sInfo":          "Zeige <b>_START_</b> bis <b>_END_</b> von <b>_TOTAL_</b> Einträgen",
            "sInfoEmpty":     "Zeige 0 bis 0 von 0 Einträgen",
            "sInfoFiltered":  "(filtere von _MAX_ insgesamten Einträgen)",
            "oPaginate": {
                "sFirst":    "Erste",
                "sLast":    "Zuletzt",
                "sNext":    "Nächste",
                "sPrevious": "Vorherige"
            }
        },
        'refresh' : {
            'index': 'Aktualisiert um _HOUR_',
            'user': 'Zuletzt online am _DATE_ _HOUR_:_MIN_'
        },
        'card': {
            'best_card_label_avt': 'Aktuelles Level: _CURRENT_LVL_/_MAX_LEVEL_',
            'card_level_avt': 'Aktuelles Level: _CURRENT_LVL_',
            'card_level_next_avt': '_EXP_PERCENT_ % verbleibend - _EXP_LEFT_ Exp verbleibend'
        },
        'recommendation': {
            'title_recommendation_avt': 'Verbessere dein Erfahrungsgewinn anhand unserer Empfehlungen.',
            'info': 'Information von _ABI_',
            'info_array': 'Spezielle Fähigkeiten',
            'link': 'Link zur Fandom-Website',
            'ab': {
                'swords': {
                    'def': "<b>Schwert</b> enthält Fähigkeiten, mit denen du deine Angriffe Brucheffekte hinzufügen und die Treffer des Feindes kontern kannst."
                },
                'axes': {
                    'def': "<b>Axtkampf</b> ist eine Fertigkeit, die darauf basiert, die Axt als Waffe zu verwenden, um Mobs und andere Spieler zu bekämpfen. Es fügt dem Gameplay mehr Abwechslung hinzu, indem es einen neuen Waffentyp einführt, der für viele Situationen geeignet ist."
                },
                'archery': {
                    'def': "<b>Bogenschießen</b> ist eine Fähigkeit, die sich darauf konzentriert, Mobs und Spielern mit Pfeil und Bogen Schaden zuzufügen."
                },
                'unarmed': {
                    'def': "<b>Faustkampf</b> ist eine Kampffertigkeit; es benutzt die leere Hand des Spielers als Waffe. Es enthält viele Vorteile, wie z. B. Entwaffnen, Ablenken von Pfeilen, unbewaffnete Angriffe mit höherer Basis und mehr.",
                    'levels' : [
                        [0, 'Stählerner Arm (Passiv)'],
                        [0, 'Pfeil-Ablenkung (Passiv)'],
                        [0, 'Entwaffnen (Passiv)'],
                        [0, 'Eiserner Griff (Passiv)'],
                        [0, 'Berserker'],
                    ]
                },
                'taming': {
                    'def': "<b>Zähmen</b> ist eine Fertigkeit in McMMO. Wenn dein Level steigt, erhalten deine Wölfe Fähigkeiten, die den Schaden, die Verteidigung und andere Dinge erhöhen.",
                    'levels' : [
                        [100, 'Umweltbewusst'],
                        [150, 'Aufschlitzen'],
                        [200, 'Pummel'],
                        [200, 'Schnell-Imbiss'],
                        [250, 'Dicker Pelz'],
                        [350, 'Heiliger Hund'],
                        [500, 'Schock-Sicher'],
                        [750, 'Geschärfte Krallen'],
                    ]
                },
                'woodcutting': {
                    'def': "<b>Holzfällen</b> ist eine Fähigkeit, die darauf basiert, Bäume mit einer Axt zu fällen. Das Leveln der Fertigkeit erhöht die Wahrscheinlichkeit, dass zusätzliches Holz von Bäumen fällt, sowie eine zusätzliche Dauer der Baumfäller-Fähigkeit.",
                    'levels' : [
                        [0, 'Doppeldrops (Passiv)'],
                        [0, 'Auf Holz geklopft (Passiv)'],
                        [5, 'Baumfäller'],
                        [15, 'Blättersturm'],
                    ]
                },
                'excavation': {
                    'def': "<b>Ausgrabung</b> ist die Fähigkeit in McMMO, die sich auf die Verwendung einer Schaufel bezieht, um alles auf der Bodenkarte zu graben, einschließlich exotischer Materialien wie Seelensand. Hochrangige Bagger können leicht Diamanten aus Schmutz herstellen. "
                },
                'repair': {
                    'def': "<b>Reparatur</b> ist die übergeordnete Fertigkeit der beiden aktuellen untergeordneten Fertigkeiten Schmelzen und Bergen, gepaart mit Bergbau bzw. Fischen. Es kann verwendet werden, um Werkzeuge und Rüstungen auf Eisenblöcken zu reparieren."
                },
                'fishing': {
                    'def': "<b>Angeln</b> erhöht die Chance auf Fänge und kann nützliche Beute hervorbringen. Es hat auch die Shake-Fähigkeit, die Drops von Mobs zieht, ohne sie töten zu müssen."
                },
                'alchemy': {
                    'def': "<b>Alchemie</b> ist eine sonstige Fertigkeit, die auf dem Brauen von Tränken basiert. Es wird durch die Herstellung und Modifikation von Tränken in einem Braustand geebnet. Darüber hinaus erhalten einige Effekte, die normalerweise mit Vanilletränken nicht erreichbar sind, benutzerdefinierte Rezepte."
                },
                'herbalism': {
                    'def': "<b>Kräuterkunde</b> ist eine Fähigkeit in McMMO, die die Fähigkeit regelt, Pflanzen und Nutzpflanzen zu ernten, mit Ausnahme von Bäumen und anderen eher strukturellen Vorkommen von Pflanzen. Es erfordert mehrere Werkzeuge, um seine Fähigkeiten voll auszuschöpfen.",
                    'levels' : [
                        [0, 'Grüner Daumen'],
                        [0, 'Pilz-Daumen'],
                        [0, 'Hylian Glück'],
                        [0, 'Doppeldrops'],
                        [50, 'Grünes Land'],
                        [200, "Bauernfrühstück"],
                    ]
                },
                'mining':{
                    'def': "<b>Bergbau</b> ist eine Fertigkeit, die sich auf den Abbau von Stein und Erz konzentriert. Ein bemerkenswerter Vorteil dieser Fertigkeit ist der höhere potenzielle Ertrag aus jedem Erz, der bei Verwendung einer aktiven Fertigkeit noch weiter erhöht wird.",
                    'levels' : [
                        [0, 'Doppeldrops'],
                        [50, 'Superbrecher'],
                        [125, 'Zündstoff'],
                        [375, 'Sprengmeister'],
                        [500, 'Explosions-Experte']
                    ]
                },
                'acrobatics': {
                    'def': "<b>Akrobatik</b> ist eine Fertigkeit, die Anmutige Rolle sowie Kampfschadensverneinung mit der Passivn Fertigkeit \"Ausweichen\" ermöglicht."
                }
            }
        },
        'offline': {
            'rule': 'Offline - überprüfe deine Internetverbindung und versuche es erneut.',
            'email': 'Melde ein Problem via _EMAIL_'
        },
        'labels_user': {
            'best_player_of_server': {'label' : 'Bester Spieler des Servers', 'method': 'max', 'infos': 'total'},
            'worst_player_of_server': {'label': 'Schlechtester Spieler des Servers', 'method': 'min', 'infos': 'total'},
            'last_co_in_server': {'label': 'Harter Gamer', 'method': 'max', 'infos': 'last_connection'},
            'ten_years_ago_co_in_server': {'label': 'Professioneller Schläfer', 'method': 'min', 'infos': 'last_connection'},
            'taming' : 'Tierliebhaber',
            'mining' : "Goldgräber",
            'woodcutting' : 'Kettensägenmann',
            'repair' : 'Nichts geht verloren',
            'unarmed' : 'Knallhart',
            'herbalism' : 'Gärtner in Vollzeit',
            'excavation' : 'Hast du etwas verloren?',
            'archery' : "Scharfschütze",
            'swords' : 'Hervorragender Kämpfer',
            'axes' : 'Exotischer Kämpfer',
            'acrobatics' : "Zirkuskunst",
            'fishing' : 'AFK',
            'alchemy' : 'Der Zauberer'
        }
    }
}
//Change colors
const settings = {
    //Set force_darkMode to true to enable dark mode by default
    'force_darkMode': false,
    'colors': {
        'page': {
            'gradient': {
                /**
                 * -------------
                 * Old method
                 * 'gradient_1': 'rgb(38,105,46)',
                 * 'gradient_2': 'rgb(32,96,115)'
                 * -------------
                 * New method
                 * 'gradient_1': '38 105 46',
                 * 'gradient_2': '32 96 115'
                 * -------------
                 */
                'gradient_1': '38 105 46',
                'gradient_2': '32 96 115'
            }
        }
    }
}