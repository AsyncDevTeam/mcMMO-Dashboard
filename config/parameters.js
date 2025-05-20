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
        'footer_text': 'Made by <a href="https://github.com/Royalphax">@Royalphax</a> and <a href="https://github.com/NicolasVaillant">@NicolasVaillant</a> | Support us with a donation on <a target="_blank" href="https://paypal.me/roytreo28">Paypal</a>',
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
                    'section-3': 'Player Distribution by Level',
                    'section-4': 'Skill Distribution',
                },
                'user' : {
                    'section-1': 'Skills level',
                    'section-2': 'All abilities',
                    'section-3': 'Capacity Comparison',
                },
                'comparison': {
                    'section-1': 'Skills comparison',
                    'section-2': 'Comparison chart',
                }
            },
            'section_descriptions': {
                'index': {
                    'section-3-desc': 'This line graph illustrates the distribution of players based on their mcMMO level on the Minecraft server, showing the number of players for each interval. This allows you to get an overview and to situate yourself in relation to the average level of other players.',
                },
                'user' : {
                    'section-3-desc': 'The comparison is made between the best player of the server and the selected player.',
                },
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
                    'sc-b-2': 'Player distribution by level',
                    'sc-b-3': 'Skill distribution',
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
                'back_to_top': 'Back to top',
                'cp-c': 'Share link'
            },
            'select': {
                'select-before': 'Show',
                'select-after': 'entries',
            },
            'general': {
                'best_ab': 'Best ability',
                'label_ab': 'Best player for ability _AB_',
                'table_player_label': 'Player',
                'table_total_label': 'Total',
                'chart_players_title': 'players level distribution',
                'chart_players_count_y': 'number of players',
                'chart_players_level_x': 'level',
                'chart_point_desc': '_PLAYERS_ player(s)',
            },
            'toast': {
                'IP_success' : 'IP sucessfully copied',
                'IP_error' : "Error copying IP address",
                'best_player': 'No comparison can be made with the best player on the server',
                'error_db': 'Data loading error',
                'URL_success' : 'URL sucessfully copied',
                'URL_error' : "Error copying URL",
                'gToastSuccess' : '__RESULT__ copied',
                'gToastError' : 'Error while copying',
                'update': 'Update available! Go to GitHub to update your dashboard'
            },
            'tabs': {
                'tabs-1': 'Home',
                'tabs-2': 'Find a player',
                'tabs-3': 'Comparison',
                'tabs-4': 'Links',
                'tabs-dm': 'Dark mode',
                'tabs-more': 'More',
            },
            'dropdown_menu': {
                'drop-1-title': 'Links',
                'drop-1': 'Links',
                'drop-2-title': 'Dark mode',
                'drop-2': 'Dark mode',
                'drop-3-title': 'Animated Skin',
                'drop-3': 'Animation : __STATE__',
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
            "sSearch": "",
            "searchPlaceholder": "Search players by username",
            "oPaginate": {
                "sFirst":    "First",
                "sLast":    "Last",
                "sNext":    "Next",
                "sPrevious": "Previous"
            }
        },
        'refresh' : {
            'index': 'Refreshed at _HOUR_',
            'user': 'Last connection at _HOUR_h_MIN_, _DATE_',
            'skin': 'Last skin update at _HOUR_h_MIN_, _DATE_'
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
        'footer_text': 'Créé par <a href="https://github.com/Royalphax">@Royalphax</a> et <a href="https://github.com/NicolasVaillant">@NicolasVaillant</a> | Soutenez-nous avec un don sur <a target="_blank" href="https://paypal.me/roytreo28">Paypal</a>',
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
                    'section-3': 'Distribution des joueurs par niveau',
                    'section-4': 'Distribution des compétences',
                },
                'user' : {
                    'section-1': 'Niveau de compétence',
                    'section-2': 'Toutes les capacités',
                    'section-3': 'Comparaison des capacités',
                },
                'comparison': {
                    'section-1': 'Comparaison des compétences',
                    'section-2': 'Graphique de comparaison',
                }
            },
            'section_descriptions': {
                'index': {
                    'section-3-desc': 'Ce graphique illustre la distribution des joueurs selon leur niveau mcMMO sur le serveur, en affichant le nombre de joueurs pour chaque intervalle. Cela vous permet d\'avoir une vue d\'ensemble et de vous situer vis à vis du niveau moyen des autres joueurs.'
                },
                'user' : {
                    'section-3-desc': 'La comparaison est effectuée entre le meilleur joueur du serveur et le joueur sélectionné.',
                },
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
                    'sc-b-2': 'Distribution des joueurs par niveau',
                    'sc-b-3': 'Distribution des compétences',
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
                'back_to_top': 'Retour en haut',
                'cp-c': 'Lien de partage'
            },
            'select': {
                'select-before': 'Afficher',
                'select-after': 'entrées',
            },
            'general': {
                'best_ab': 'Meilleure capacité',
                'label_ab': 'Meilleur joueur pour la capacité _AB_',
                'table_player_label':'Joueur',
                'table_total_label':'Total',
                'chart_players_title': 'Répartition des niveaux des joueurs',
                'chart_players_count_y': 'nombre de joueurs',
                'chart_players_level_x': 'niveau',
                'chart_point_desc': '_PLAYERS_ joueur(s)'
            },
            'toast': {
                'IP_success' : 'Adresse IP copiée',
                'IP_error' : "Erreur lors de la copie de l'adresse IP",
                'best_player': 'Aucune comparaison ne peut être effectuée avec le meilleur joueur du serveur - Graphique désactivé',
                'error_db': 'Erreur de chargement des données',
                'URL_success' : 'URL copié',
                'URL_error' : "Erreur lors de la copie de l'URL",
                'gToastSuccess' : '__RESULT__ copié',
                'gToastError' : 'Erreur lors de la copie',
                'update': 'Mise à jour disponible ! Rendez-vous sur GitHub pour mettre à jour votre dashboard'
            },
            'tabs': {
                'tabs-1': 'Accueil',
                'tabs-2': 'Trouver un joueur',
                'tabs-3': 'Comparaison',
                'tabs-4': 'Liens',
                'tabs-dm': 'Mode sombre',
                'tabs-more': 'Plus',
            },
            'dropdown_menu': {
                'drop-1-title': 'Liens',
                'drop-1': 'Liens',
                'drop-2-title': 'Mode sombre',
                'drop-2': 'Mode sombre',
                'drop-3-title': 'Skin animé',
                'drop-3': 'Animation : __STATE__',
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
            "sSearch": "",
            "searchPlaceholder": "Rechercher des joueurs",
            "oPaginate": {
                "sFirst":    "Premier",
                "sLast":    "Dernier",
                "sNext":    "Suivant",
                "sPrevious": "Précédent"
            }
        },
        'refresh' : {
            'index': 'Mise à jour à _HOUR_',
            'user': 'Dernière connexion à _HOUR_h_MIN_ le _DATE_',
            'skin': 'Dernière mise à jour du skin à _HOUR_h_MIN_, _DATE_'
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
        'footer_text': 'Erstellt von <a href="https://github.com/Royalphax">@Royalphax</a> und <a href="https://github.com/NicolasVaillant">@NicolasVaillant</a> | Unterstützen Sie uns mit einer Spende auf <a target="_blank" href="https://paypal.me/roytreo28">Paypal</a>',
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
                    'section-4': 'Beste Fähigkeiten des Servers',
                },
                'user' : {
                    'section-1': 'Fähigkeitsniveau',
                    'section-2': 'Alle Fähigkeiten',
                    'section-3': 'Kapazitätsvergleich',
                }
                ,
                'comparison': {
                    'section-1': 'Kompetenzvergleich',
                    'section-2': 'Vergleichstabelle',
                }
            },
            'section_descriptions': {
                'index': {
                    'section-3-desc': 'Dieses Liniendiagramm veranschaulicht die Verteilung der Spieler basierend auf ihrem mcMMO-Level auf dem Minecraft-Server, indem es die Anzahl der Spieler für jedes Intervall zeigt. Dies ermöglicht es Ihnen, einen Überblick zu bekommen und sich im Vergleich zum durchschnittlichen Level der anderen Spieler zu positionieren.'
                },
                'user' : {
                    'section-3-desc': 'Der Vergleich erfolgt zwischen dem besten Spieler des Servers und dem ausgewählten Spieler.',
                },
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
                    'sc-b-2': 'Durch Fähigkeiten',
                    'sc-b-3': 'Beste Fähigkeiten des Servers',
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
                'back_to_top': 'Zurück nach oben',
                'cp-c': 'Einen Link teilen'
            },
            'select': {
                'select-before': 'Zeige',
                'select-after': 'Einträge',
            },
            'general': {
                'best_ab': 'Beste Fähigkeit',
                'label_ab': 'Bester Spieler für Fähigkeiten _AB_',
                'table_player_label':'Spieler',
                'table_total_label':'Gesamt',
                'chart_players_title': 'Verteilung der Spielerlevel',
                'chart_players_count_y': 'Anzahl der Spieler',
                'chart_players_level_x': 'Level',
                'chart_point_desc': '_PLAYERS_ Spieler'
            },
            'toast': {
                'IP_success' : 'IP erfolgreich kopiert',
                'IP_error' : "Fehler beim Kopieren der IP-Adresse",
                'best_player': 'Es kann kein Vergleich mit dem besten Spieler auf dem Server angezeigt werden',
                'error_db': 'Fehler beim Laden der Daten',
                'URL_success': 'URL erfolgreich kopiert',
                'URL_error': 'Fehler beim Kopieren der URL',
                'gToastSuccess' : '__RESULT__ kopiert',
                'gToastError' : 'Fehler beim Kopieren',
                'update': 'Update verfügbar! Gehe zu GitHub, um dein Dashboard zu aktualisieren'
            },
            'tabs': {
                'tabs-1': 'Startseite',
                'tabs-2': 'Spieler finden',
                'tabs-3': 'Vergleich',
                'tabs-4': 'Verbindungen',
                'tabs-dm': 'Darkmode',
                'tabs-more': 'Mehr',
            },
            'dropdown_menu': {
                'drop-1-title': 'Verbindungen',
                'drop-1': 'Verbindungen',
                'drop-2-title': 'Darkmode',
                'drop-2': 'Darkmode',
                'drop-3-title': 'Animierte Haut',
                'drop-3': 'Animation : __STATE__',
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
            "sSearch": "",
            "searchPlaceholder": "Suche nach Spielern",
            "oPaginate": {
                "sFirst":    "Erste",
                "sLast":    "Zuletzt",
                "sNext":    "Nächste",
                "sPrevious": "Vorherige"
            }
        },
        'refresh' : {
            'index': 'Aktualisiert um _HOUR_',
            'user': 'Zuletzt online am _DATE_ _HOUR_:_MIN_',
            'skin': 'Letztes Skin-Update um _HOUR_h_MIN_, _DATE_'
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
    },
    'KO': {
        'title_header': 'mcMMO 대시보드',
        'footer_text': '<a href="https://github.com/Royalphax">@Royalphax</a> 및 <a href="https://github.com/NicolasVaillant">@NicolasVaillant</a> 제작 | <a target="_blank" href="https://paypal.me/roytreo28">Paypal</a>을 통해 후원해주세요.',
        'pages_name': {
            'index': 'mcMMO 통계 | 홈',
            'user': 'mcMMO 통계 | _USER_',
            'search-user': 'mcMMO 통계 | 사용자 검색',
            'comparison': 'mcMMO 통계 | 비교',
        },
        'access': ['ko-KR'],
        'ab': {
            'taming': '길들이기',
            'mining': '채광',
            'woodcutting': "벌목",
            'repair': '수리',
            'unarmed': '맨손 격투',
            'herbalism': '약초학',
            'excavation': '발굴',
            'archery': '양궁',
            'swords': '검술',
            'axes': '도끼술',
            'acrobatics': '곡예',
            'fishing': '낚시',
            'alchemy': '연금술'
        },
        'family': {
            'Gathering': '채집',
            'Crafting': '제작',
            'Combat': '전투',
            'Adventuring': '모험'
        },
        'ab_labels': {
            'sum': '경험치',
            'ab': '능력'
        },
        'title': {
            'best_player_of_server': '서버 최고 레벨 플레이어',
            'worst_player_of_server': '서버 최저 레벨 플레이어',
            'last_co_in_server': '최근 접속',
            'ten_years_ago_co_in_server': '가장 오래된 접속',
        },
        'content_page': {
            'section_names': {
                'index': {
                    'section-1': '서버 최고 레벨 플레이어',
                    'section-2': '리더보드',
                    'section-3': '레벨별 플레이어 분포',
                    'section-4': '스킬 분포',
                },
                'user': {
                    'section-1': '스킬 레벨',
                    'section-2': '모든 능력',
                    'section-3': '능력치 비교',
                },
                'comparison': {
                    'section-1': '스킬 비교',
                    'section-2': '비교 차트',
                }
            },
            'section_descriptions': {
                'index': {
                    'section-3-desc': '이 꺾은선 그래프는 마인크래프트 서버에서 플레이어의 mcMMO 레벨 분포를 보여줍니다. 각 구간별 플레이어 수를 통해 전체적인 분포를 파악하고 다른 플레이어의 평균 레벨과 비교하여 자신의 위치를 확인할 수 있습니다.',
                },
                'user': {
                    'section-3-desc': '서버 최고 레벨 플레이어와 선택한 플레이어를 비교합니다.',
                },
            },
            'aside': {
                'header': {
                    'sc-h-1': "서버 정보",
                    'sc-h-1-s': "서버 오프라인",
                    'sc-h-2': '바로가기',
                    'sc-h-2-a': '정렬 방식',
                },
                'index': {
                    'sc-b-1': '리더보드',
                    'sc-b-2': '레벨별 플레이어 분포',
                    'sc-b-3': '스킬 분포',
                },
                'user': {
                    'sc-b-1': '플레이어 정보',
                    'sc-b-2': '능력 레벨',
                    'sc-b-3': '능력',
                    'sc-b-4': '비교 차트',
                },
                'comparison': {
                    'sc-b-1': '스킬 비교',
                    'sc-b-2': '비교 차트',
                }
            },
            'search': {
                'search_player_avt': '플레이어 검색',
                'search_abi_avt': '능력 검색',
                'no_result': '검색 결과 없음 - 다시 검색해보세요'
            },
            'buttons': {
                'clear_player_avt': '지우기',
                'sort_avt': '정렬',
                'sort_a': '알파벳순 정렬',
                'sort_n': '숫자순 정렬',
                'back_to_top': '맨 위로',
                'cp-c': '링크 공유'
            },
            'select': {
                'select-before': '표시',
                'select-after': '개',
            },
            'general': {
                'best_ab': '최고 능력',
                'label_ab': '_AB_ 최고 레벨 플레이어',
                'table_player_label': '플레이어',
                'table_total_label': '총합',
                'chart_players_title': '플레이어 레벨 분포',
                'chart_players_count_y': '플레이어 수',
                'chart_players_level_x': '레벨',
                'chart_point_desc': '_PLAYERS_ 명',
            },
            'toast': {
                'IP_success': 'IP 주소 복사 성공',
                'IP_error': "IP 주소 복사 오류",
                'best_player': '서버 최고 레벨 플레이어와는 비교할 수 없습니다.',
                'error_db': '데이터 로딩 오류',
                'URL_success': 'URL 복사 성공',
                'URL_error': "URL 복사 오류",
                'gToastSuccess': '__RESULT__ 복사됨',
                'gToastError': '복사 중 오류 발생',
                'update': '업데이트 가능! GitHub에서 대시보드를 업데이트하세요'
            },
            'tabs': {
                'tabs-1': '홈',
                'tabs-2': '플레이어 찾기',
                'tabs-3': '비교',
                'tabs-4': '링크',
                'tabs-dm': '다크 모드',
                'tabs-more': '더 보기',
            },
            'dropdown_menu': {
                'drop-1-title': '링크',
                'drop-1': '링크',
                'drop-2-title': '다크 모드',
                'drop-2': '다크 모드',
                'drop-3-title': '움직이는 스킨',
                'drop-3': '애니메이션 : __STATE__',
            },
            'pages': {
                'search-user': {
                    'title': '플레이어 검색',
                    'subtitle': '사용자 페이지에 접근할 플레이어를 검색하세요',
                    'button': '검색',
                },
                'comparison': {
                    'explanation': {
                        'intro': '',
                        'in_chart': '최대치 _MAX_ 중 _PERCENT_% 달성'
                    },
                    'link': {
                        'see_profile': '프로필 보기'
                    }
                }
            },
            'quickView': {
                'qv-tag': '플레이어',
                'qv-g-rank': '종합',
                'qv-rank': '현재 랭크',
                'qv-seeSkills': '스킬 레벨 보기'
            }
        },
        'dataTable': {
            "sProcessing": "처리 중...",
            "sLengthMenu": "_MENU_ 개씩 보기",
            "sZeroRecords": "검색 결과가 없습니다.",
            "sEmptyTable": "테이블에 데이터가 없습니다.",
            "sInfo": "_TOTAL_ 개 중 _START_ - _END_ 개 표시",
            "sInfoEmpty": "0 개 중 0 개 표시",
            "sInfoFiltered": "(_MAX_ 개에서 필터링됨)",
            "sSearch": "",
            "searchPlaceholder": "유저 이름으로 검색",
            "oPaginate": {
                "sFirst": "처음",
                "sLast": "마지막",
                "sNext": "다음",
                "sPrevious": "이전"
            }
        },
        'refresh': {
            'index': '_HOUR_ 시에 새로고침됨',
            'user': '_DATE_ _HOUR_ 시 _MIN_ 분에 마지막 접속',
            'skin': '_DATE_ _HOUR_ 시 _MIN_ 분에 마지막 스킨 업데이트',
        },
        'card': {
            'best_card_label_avt': '현재 레벨 : _CURRENT_LVL_/_MAX_LEVEL_',
            'card_level_avt': '현재 레벨 : _CURRENT_LVL_',
            'card_level_next_avt': '_EXP_PERCENT_% 남음 - _EXP_LEFT_ 경험치 필요'
        },
        'recommendation': {
            'title_recommendation_avt': '추천 사항을 기반으로 경험치 획득량을 향상시키세요.',
            'info': '_ABI_ 정보',
            'info_array': '특수 능력',
            'link': 'Fandom 웹사이트 링크',
            'ab': {
                'swords': {
                    'def': "검술은 공격에 파열 효과를 추가하고 적의 공격을 반격하는 능력을 포함합니다."
                },
                'axes': {
                    'def': "도끼술은 도끼 도구를 무기로 사용하여 몹과 다른 플레이어와 싸우는 스킬입니다. 다양한 상황에서 유용한 새로운 유형의 무기를 도입하여 게임 플레이에 더 많은 다양성을 제공합니다."
                },
                'archery': {
                    'def': "양궁은 활과 화살을 사용하여 몹과 플레이어에게 데미지를 입히는 데 중점을 둔 스킬입니다."
                },
                'unarmed': {
                    'def': "맨손 격투는 전투 스킬입니다. 플레이어의 빈손을 무기로 사용하며, 무장 해제, 화살 튕겨내기, 더 높은 기본 맨손 공격력 등 다양한 특전을 포함합니다.",
                    'levels': [
                        [0, '강철 팔 자세 (패시브)'],
                        [0, '화살 튕겨내기 (패시브)'],
                        [0, '무장 해제 (패시브)'],
                        [0, '강철 손아귀 (패시브)'],
                        [0, '광전사'],
                    ]
                },
                'taming': {
                    'def': "길들이기는 mcMMO의 스킬입니다. 레벨이 증가함에 따라 늑대는 공격력, 방어력 등을 증가시키는 능력을 얻습니다.",
                    'levels': [
                        [100, '환경 인식'],
                        [150, '꿰뚫기'],
                        [200, '강타'],
                        [200, '빠른 음식 서비스'],
                        [250, '두꺼운 털'],
                        [350, '신성한 사냥개'],
                        [500, '충격 방지'],
                        [750, '날카로운 발톱'],
                    ]
                },
                'woodcutting': {
                    'def': "벌목은 도끼로 나무를 베는 것을 중심으로 하는 스킬입니다. 스킬 레벨을 올리면 나무에서 추가 목재가 나올 확률이 증가하고 나무 벌채 능력의 지속 시간이 늘어납니다.",
                    'levels': [
                        [0, '벌목 (패시브)'],
                        [0, '두드리기 (패시브)'],
                        [5, '나무 벌채'],
                        [15, '나뭇잎 날리기'],
                    ]
                },
                'excavation': {
                    'def': "발굴은 모래, 흙, 영혼 모래와 같은 토양 관련 블록을 삽으로 파는 mcMMO 능력입니다. 높은 레벨의 발굴자는 흙에서 다이아몬드를 쉽게 얻을 수 있습니다."
                },
                'repair': {
                    'def': "수리는 현재 광질 및 낚시와 각각 연관된 제련 및 회수의 상위 스킬입니다. 철 블록에서 도구와 갑옷을 수리하는 데 사용할 수 있습니다."
                },
                'fishing': {
                    'def': "낚시는 물고기를 잡을 확률을 높이고 유용한 전리품을 낚아올릴 수 있습니다. 또한 몹을 죽이지 않고도 아이템을 떨어뜨리는 흔들기 능력이 있습니다."
                },
                'alchemy': {
                    'def': "연금술은 양조를 기반으로 하는 기타 스킬입니다. 양조기에서 포션을 만들고 수정하여 레벨을 올립니다. 또한 바닐라 포션으로는 얻을 수 없는 일부 효과에 사용자 지정 레시피가 제공됩니다."
                },
                'herbalism': {
                    'def': "약초학은 나무 및 기타 구조적인 식물 발생을 제외한 식물 및 작물을 수확하는 능력을 관리하는 mcMMO의 스킬입니다. 능력을 최대한 활용하려면 여러 도구가 필요합니다.",
                    'levels': [
                        [0, '초록 엄지'],
                        [0, '버섯 엄지'],
                        [0, '하일리안 행운'],
                        [0, '두 배 드롭'],
                        [50, '푸른 대지'],
                        [200, '농부의 식단'],
                    ]
                },
                'mining': {
                    'def': "채광은 돌과 광석을 채굴하는 데 중점을 둔 스킬입니다. 이 스킬의 주목할 만한 특전은 각 광석에서 더 높은 잠재적 수확량을 얻을 수 있다는 것이며, 활성 스킬을 사용하면 훨씬 더 증가합니다.",
                    'levels': [
                        [0, '두 배 드롭'],
                        [50, '슈퍼 브레이커'],
                        [125, '폭파 채광'],
                        [375, '더 큰 폭탄'],
                        [500, '폭파 전문가']
                    ]
                },
                'acrobatics': {
                    'def': "곡예는 우아한 구르기를 가능하게 하고, 패시브 스킬인 '회피'를 통해 전투 데미지를 무효화합니다."
                }
            }
        },
        'offline': {
            'rule': '오프라인 - 인터넷 연결을 확인하고 다시 시도하세요.',
            'email': '_EMAIL_로 문제 보고'
        },
        'labels_user': {
            'best_player_of_server': {'label': '서버 최고 레벨', 'method': 'max', 'infos': 'total'},
            'worst_player_of_server': {'label': '서버 최저 레벨', 'method': 'min', 'infos': 'total'},
            'last_co_in_server': {'label': '하드 게이머', 'method': 'max', 'infos': 'last_connection'},
            'ten_years_ago_co_in_server': {'label': '프로 잠꾸러기', 'method': 'min', 'infos': 'last_connection'},
            'taming': '동물 애호가',
            'mining': "황금 광부",
            'woodcutting': '벌목꾼',
            'repair': '버리는 것은 없다',
            'unarmed': '싸움꾼',
            'herbalism': '전업 정원사',
            'excavation': '뭐 잃어버리셨어요?',
            'archery': "저격수",
            'swords': '뛰어난 전사',
            'axes': '이색적인 전사',
            'acrobatics': "서커스 예술가",
            'fishing': '잠수함',
            'alchemy': '마법사'
        }
    }
}
//Change colors
const settings = {
    //Set force_darkMode to true to enable dark mode by default
    'force_darkMode': false,
    //Set animated_skins to true to enable skin animation in user page
    'animated_skins': false,
    //Set localStorage to true to enable data storage in your localStorage, false is sessionStorage
    //See https://developer.mozilla.org/fr/docs/Web/API/Window/sessionStorage  and
    // https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage for more information
    'localStorage': false,
    //If localStorage is true, set refreshStorage for min time before refresh
    //Supported value: h (hour), 6h (6 hours), 12h (12 hours) and d (day)
    'refreshStorage': 'h',
    //Version of mcMMO Dashboard
    'version': '1.30.1',
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
    },
    'links': {
        /**
         * You can add multiple link just by incrementing index of the key -> link_4, link_5...
         * Go to https://fontawesome.com/icons/ to get exclusive icons
         * 'i' format : copy and paste class
         * 'text' : define text to display
         * 'url' format : should start with https://
         */
        'link_1': {
            'i': 'fa-brands fa-discord',
            'text': 'Discord',
            'url': '#'
        },
        'link_2': {
            'i': 'fa-solid fa-map',
            'text': 'Dynmap',
            'url': '#'
        },
        'link_3': {
            'i': 'fa-solid fa-globe',
            'text': 'Website',
            'url': '#'
        }
    }
}