//Here you can change translation, gradient colors and more

//Used as template
const abilities = ['taming', 'mining', 'woodcutting', 'repair', 'unarmed', 'herbalism', 'excavation', 'archery', 'swords', 'axes', 'acrobatics', 'fishing', 'alchemy']
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
const translation = {
    'default': {
        'pages_name':{
            'index': 'mcMMO Stats | Home',
            'user': 'mcMMO Stats | _USER_',
            'search-user': 'mcMMO Stats | Search user',
        },
        'access' : ['en-EN', 'en-GB'],
        'ab' : {
            'swords': 'swords',
            'axes': 'axes',
            'archery': "archery",
            'unarmed': 'unarmed',
            'taming': 'taming',
            'woodcutting': 'woodcutting',
            'excavation': 'excavation',
            'repair': 'repair',
            'fishing': 'fishing',
            'alchemy': 'alchemy',
            'herbalism': 'herbalism',
            'mining': 'mining',
            'acrobatics': 'acrobatics'
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
                }
            },
            'aside': {
                'header': {
                    'sc-h-1': "Server information's",
                    'sc-h-1-s': "Server offline",
                    'sc-h-2': 'Shortcuts',
                },
                'index': {
                    'sc-b-1': 'Leaderboard',
                    'sc-b-2': 'Chart by abilities',
                    'sc-b-3': 'Best cumulative abilities',
                    'sc-b-999': 'Back to top'
                },
                'user' : {
                    'sc-b-1': 'Player infos',
                    'sc-b-2': 'Abilities Level',
                    'sc-b-3': 'Abilities',
                    'sc-b-4': 'Comparison chart',
                    'sc-b-999': 'Back to top',
                }
            },
            'search': {
                'search_player_avt': 'Search a player',
                'search_abi_avt' : 'Search an ability',
                'no_result': 'No results found - try your search again'
            },
            'buttons': {
                'clear_player_avt': 'Clear',
                'sort_avt': 'Sort'
            },
            'select': {
                'select-before': 'Show',
                'select-after': 'entries',
            },
            'general': {
                'best_ab': 'Best ability',
                'label_ab': 'Best player for ability _AB_',
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
                'tabs-3': 'Contact',
                'tabs-dm': 'Dark mode',
            },
            'pages':{
                'search-user': {
                    'title': 'Search for a player',
                    'subtitle': 'Search for a player to access their user page',
                    'button': 'Search',
                },
                'contact': {
                    'title': 'Contact',
                    'subtitle': 'To contact us please email _EMAIL_',
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
    'user': {
        'active': false,
        'pages_name':{
            'index': 'mcMMO Stats | Accueil',
            'user': 'mcMMO Stats | _USER_',
            'search-user': 'mcMMO Stats | Rechercher un utilisateur',
        },
        'access' : ['fr-FR'],
        'ab' : {
            'taming': 'apprivoisement',
            'mining': 'minage',
            'woodcutting': 'bûcheronnage',
            'repair': 'réparation',
            'unarmed': 'poings',
            'herbalism': 'herboristerie',
            'excavation': 'excavation',
            'archery': "tir à l'arc",
            'swords': 'épées',
            'axes': 'haches',
            'acrobatics': 'acrobatie',
            'fishing': 'pêche',
            'alchemy': 'potions',
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
                }
            },
            'aside':{
                'header': {
                    'sc-h-1': "Informations sur le serveur",
                    'sc-h-1-s': "Serveur hors ligne",
                    'sc-h-2': 'Raccourcis',
                },
                'index': {
                    'sc-b-1': 'Classement',
                    'sc-b-2': 'Par capacités',
                    'sc-b-3': 'Meilleures capacités cumulées',
                    'sc-b-999': 'Retour en haut'
                },
                'user' : {
                    'sc-b-1': 'Informations du joueurs',
                    'sc-b-2': 'Niveau de capacités',
                    'sc-b-3': 'Capacités',
                    'sc-b-4': 'Graphique de comparaison',
                    'sc-b-999': 'Retour en haut',
                }
            },
            'search': {
                'search_player_avt' : 'Rechercher un joueur',
                'search_abi_avt' : 'Rechercher une abilité',
                'no_result': 'Aucun résultat trouvé - essayez à nouveau votre recherche'
            },
            'buttons': {
                'clear_player_avt': 'Supprimer',
                'sort_avt': 'Trier'
            },
            'select': {
                'select-before': 'Afficher',
                'select-after': 'entrées',
            },
            'general': {
                'best_ab': 'Meilleure capacité',
                'label_ab': 'Meilleur joueur pour la capacité _AB_'
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
                'tabs-3': 'Contact',
                'tabs-dm': 'Mode sombre',
            },
            'pages':{
                'search-user': {
                    'title': 'Rechercher un joueur',
                    'subtitle': 'Rechercher un joueur pour accéder à sa page utilisateur',
                    'button': 'Rechercher',
                },
                'contact': {
                    'title': 'Contact',
                    'subtitle': 'Pour nous contacter, envoyez un e-mail à _EMAIL_',
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
    }
}
//Change colors
const settings = {
    'colors': {
        'page': {
            'gradient': {
                'gradient_1': 'rgb(38,105,46)',
                'gradient_2': 'rgb(32,96,115)'
            }
        },
        'chart': {
            'background': 'rgba(54, 162, 235, 0.5)',
            'background_opacity': 'rgba(54, 162, 235, 0.25)'
        }
    }
}