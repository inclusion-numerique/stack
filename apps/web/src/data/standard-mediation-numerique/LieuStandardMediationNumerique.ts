// See https://github.com/LaMednum/standard-mediation-num/blob/main/schema.json
export type LieuStandardMediationNumerique = {
  // Ce champ contient un identifiant unique local. Le producteur de données le génère librement selon sa méthode. Il peut par exemple s'agir d'une suite de lettres et/ou de chiffres, ou d'un UUID (universal unique identifier) produit aléatoirement : https://www.uuidgenerator.net/ Ce champ permet d'éviter localement les doublons, par exemple dans le cas où deux lieux auraient le même SIRET. Il est un pré-requis pour assurer la compatibilité avec le référentiel national sur l'offre d'insertion : https://www.data.inclusion.beta.gouv.fr/
  id: string

  // Ce champ contient une donnée pivot provenant d'une des deux bases de référence : le répertoire SIRENE des entreprises et de leurs établissements de l'Insee ou le Répertoire national des associations du ministère de l'intérieur (RNA). Pour chaque lieu, il faut indiquer soit le code SIRET (dont disposent la majorité des associations) récupérable via annuaire-entreprises.data.gouv.fr soit le numéro RNA (Répertoire National des Associations) du lieu récupérable via journal-officiel.gouv.fr/pages/associations-recherche/. Les associations disposant d'un SIRET doivent renseigner uniquement ce code. Le RNA n'est à renseigner que dans le cas où une association ne disposerait pas de SIRET. Dans la mesure du possible, les concepteurs du schéma mettrons à disposition des outils pour associer facilement les données au SIRET correspondant. Dans le cas où le SIRET concernerait plusieurs lieux (plusieurs bibliothèques rattachées à une même commune par exemple), l'identification unique permettra de les dédoublonner. Si votre lieu se situe en Polynésie française ou en Nouvelle-Calédonie, nous vous invitons à renseigner le numéro de Répertoire d'Identification Des Entreprises et des Établissements (RIDET)  Ce champ est un pré-requis pour assurer la compatibilité avec data.inclusion.
  pivot: string

  // Ce champ contient le nom du lieu.
  nom: string

  // Ce champ contient le nom de la commune rattachée à l'adresse du lieu. Le site national des adresses permet de rechercher une adresse (voie, lieu-dit, commune, code postal) : adresse.data.gouv.fr
  commune: string

  // Ce champ contient le code postal rattaché à l'adresse du lieu. Le site national des adresses permet de rechercher une adresse (voie, lieu-dit, commune, code postal) : adresse.data.gouv.fr
  code_postal: string

  // Ce champ contient le code officiel géographique de la commune rattachée à l'adresse du lieu.
  code_insee?: string | null

  // Ce champ contient les éléments de l'adresse du lieu relatifs à la voie. Typiquement, <numero_voie> <indice_de_repetition> <type_voie> <libelle_voie>. Le site national des adresses permet de rechercher une adresse (voie, lieu-dit, commune, code postal) : adresse.data.gouv.fr
  adresse: string

  // Ce champ contient des éléments permettant de préciser l'adresse et la situation exactes du lieu, afin d'en permettre l'accès aux usagers. Cela peut être un numéro d'appartement, un étage, un lieu-dit, etc.
  complement_adresse?: string | null

  // Ce champ contient la latitude du lieu, dans le système WGS84 (GPS), typiquement issue du géocodage de son adresse et pouvant servir à la localiser. Il est possible de copier les coordonnées GPS depuis le site : adresse.data.gouv.fr
  latitude?: number | null

  // Ce champ contient la longitude du lieu, dans le système WGS84 (GPS), typiquement issue du géocodage de son adresse et pouvant servir à la localiser. Il est possible de copier les coordonnées GPS depuis le site : adresse.data.gouv.fr
  longitude?: number | null

  // La valeur de ce champ indique le type du lieu : CCAS, ASSO, COMMUNE, etc. Les valeurs possibles (il est possible d'en renseigner plusieurs) sont restreintes au vocabulaire décrivant les types de structures : https://www.data.inclusion.beta.gouv.fr/schemas-de-donnees-de-loffre/schema-des-structures-dinsertion/typologies-de-structure
  typologie?: string | null

  // Ce champ contient un numéro de téléphone du lieu. Le format international doit être respecté : le premier zéro suivant l'indicatif pays (+33) est supprimé et il n'y a pas d'espaces.
  telephone?: string | null

  // Ce champ contient l'adresse email générique de contact du lieu. Si besoin, vous pouvez renseigner plusieurs courriels en les séparant par un `|`.
  courriels?: string | null

  // Ce champ contient une ou plusieurs URL vers le site internet du lieu et/ou les réseaux sociaux. Pour renseigner plusieurs URL, il est nécessaire de les séparer par un `|`.
  site_web?: string | null

  // Ce champ indique les jours et horaires d'ouverture du lieu, en respectant le format proposé par OpenStreetMap (https://wiki.openstreetmap.org/wiki/FR:Key:opening_hours). L'outil YoHours (https://projets.pavie.info/yohours/) permet de générer des horaires au bon format. Le format OSM permet d'indiquer des exceptions pendant certaines périodes (vacances, jours fériés…). Pour les générer au bon format en utilisant YoHours, il suffit de les renseigner en cliquant sur le bouton 'plus' vert, situé en haut à gauche.
  horaires?: string | null

  // Ce champ contient une courte description du lieu (280 caractères maximum).
  presentation_resume?: string | null

  // Ce champ contient une description plus détaillée du lieu. Il est par exemple possible de préciser si des aidants sont itinérants.
  presentation_detail?: string | null

  // La valeur de ce champ détaille la structure qui a collecté les données sur le lieu. Cela peut être la structure elle-même ou une structure tierce (une collectivité territoriale, un réseau de médiation numérique...)
  source?: string | null

  // Ce champ permet d'informer si c'est un lieu de médiation itinérant comme un bus numérique, une cyber-caravane ou un camion connecté. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante : 'Itinérant;Fixe'
  itinerance?: string | null

  // Ce champ permet de décrire le réseau/la structure auquel le lieu appartient. Pour le remplir, indiquer le nom de cette entité.
  structure_parente?: string | null

  // Ce champ contient la date à laquelle la donnée considérée a été mise à jour. Il respecte le format ISO 8601 : année-mois-jour (YYYY-MM-DD).
  date_maj: string

  // Ce champ permet de décrire les types d'accompagnement proposés dans l'offre du lieu. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante :  Aide aux démarches administratives;Maîtrise des outils numériques du quotidien;Insertion professionnelle via le numérique;Utilisation sécurisée du numérique;Parentalité et éducation avec le numérique;Loisirs et créations numériques;Comprehension du monde numérique;Accès internet et matériel informatique;Acquisition de matériel informatique à prix solidaire.
  services: string

  // Par défaut, un lieu d'inclusion numérique est inclusif et peut accueillir tout public. Malgré tout, certains lieux sont habilités à recevoir exclusivement certains publics précis ! Ce champ permet de spécifier si l'action du lieu est tournée vers un public spécifiquement adressé. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante : Jeunes;Étudiants;Familles et/ou enfants;Seniors;Femmes
  publics_specifiquement_adresses?: string | null

  // Ce champ permet d'informer si le lieu est en mesure d'accompagner et soutenir des publics ayant des besoins particuliers. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante :Surdité;Handicaps moteurs;Handicaps mentaux;Illettrisme;Langues étrangères (anglais);Langues étrangères (autres) sont tous des formes de déficience visuelle.
  prise_en_charge_specifique?: string | null

  // Ce champ indique les conditions financières d'accès au lieu. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante : Gratuit : Je peux accéder gratuitement au lieu et à ses services;Gratuit sous condition : La gratuité est conditionnée à des critères (adhésion, situation familiale, convention avec un organisme social, pass numériques…);Payant : L’accès au lieu et/ou à ses services est payant
  frais_a_charge?: string | null

  // Ce champ indique si le lieu appartient à un dispositif ou à un programme national. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante : Aidants Connect;Bibliothèques numérique de référence;Certification PIX; Conseillers numériques;Emmaüs Connect;France Services;Grande école du numérique;La Croix Rouge;Point d'accès numérique CAF;Promeneurs du net;Relais numérique (Emmaüs Connect)
  dispositif_programmes_nationaux?: string | null

  // Ce champ indique si le lieu a obtenu un(e) ou plusieurs formations et labels. Cette liste est évolutive, si vous ne trouvez pas ce que vous cherchez vous pouvez vous référer au champ 'Autres formations ou labels'. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante : Formé à « Mon Espace Santé »;Formé à « DUPLEX » (illettrisme);Arnia/MedNum BFC (Bourgogne-Franche-Comté);Collectif ressources et acteurs réemploi (Normandie);Fabriques de Territoire;Les Éclaireurs du numérique (Drôme);Mes Papiers (Métropole de Lyon) ;ORDI 3.0;SUD LABS (PACA)
  formations_labels?: string | null

  // Ce champ permet de préciser si le lieu a obtenu d’autres formations ou labels non proposés dans le champ 'Formations et labels'.
  autres_formations_labels?: string | null

  // Ce champ fournit des informations sur les différentes étapes ou démarches à suivre pour se rendre au lieu d'inclusion numérique et bénéficier de ses services. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante : Se présenter;Téléphoner;Contacter par mail;Prendre un RDV en ligne;Ce lieu n'accueille pas de public;Envoyer un mail avec une fiche de prescription
  modalites_acces?: string | null

  // Ce champ indique les types d'accompagnement proposés par le lieu. Sélectionner une ou plusieurs valeurs séparées par un `|` parmi la liste suivante : En autonomie;Accompagnement individuel; Dans un atelier collectif : j'apprends collectivement à utiliser le numérique;À distance (par téléphone ou en visioconférence)
  modalites_accompagnement?: string | null

  // Ce champ contient une url renvoyant vers le profil acceslibre du lieu : https://acceslibre.beta.gouv.fr/. Acceslibre est un service public porté par le Ministère de la Transition Écologique afin de collecter et de partager les données d'accessibilité des établissements recevant du public. Le remplissage d'une fiche prend moins de 5 minutes.
  fiche_acces_libre?: string | null

  // Ce champ contient une url renvoyant vers le site de prise de rendez-vous en ligne avec les aidants du lieu.
  prise_rdv?: string | null
}
