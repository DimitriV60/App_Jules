# Compte Rendu du Projet : Jules Adventure (Révision CM1)

Application pédagogique "Jules Adventure" — quiz immersif Minecraft pour réviser le programme CM1.

---

## Objectif du Projet

PWA interactive fusionnant le programme scolaire CM1 et l'univers Minecraft. L'élève progresse par paliers (Pierre, Fer, Or, Diamant, Obsidienne, Nether, End), affronte des Boss, accumule des gemmes et achète des pouvoirs.

---

## Historique du Développement

### Phase 1 — Fondations (V1–V2)
- Quiz simple avec paliers et questions Boss toutes les 10 questions
- Contenu : fractions, imparfait, passé composé, Charlemagne
- Système de vies + nourriture pour passer une question

### Phase 2 — Gamification (V3–V5)
- Monnaie : Émeraudes (diamants) en récompense Boss uniquement
- Boutique : 10 items de pouvoir (Potion, Bouclier, Totem, Étoile du Nether, etc.)
- Collection de blocs rares (40 items)
- Boucle de répétition : questions ratées remises en pioche
- Notifications in-game (toasts animés, plus de alert() bloquants)
- Vérification souple des réponses (accents, articles, casse ignorés)
- Clavier amélioré avec touches accentuées (É, È, À, Ç, Ê, Î) + ESPACE

### Phase 3 — Immersion Minecraft (V6–V8)
- Panorama Minecraft en fond d'écran (image réelle, visible à travers la carte)
- Sprites Minecraft authentiques (textures Java 1.20.4) : épée, diamant, poulet, livre enchanté, coffre, émeraude, totem, étoile, bouclier, lingot d'or, etc.
- Icônes MC partout : menu, boutique, boutons de jeu, titres d'écrans, catégories stats
- Avatar 120px centré à gauche du menu (layout flex)
- Titre "JULES ADVENTURE" avec badge de niveau dynamique
- Écran de mort : visage de Creeper + 14 phrases de défaite humoristiques Minecraft
- 2 nouvelles catégories : Problèmes mathématiques (10) et Casse-têtes logiques (10)
- Fond semi-transparent (glass 0.72) + blur léger (8px) pour panorama visible

### Phase 4 — PWA & Déploiement
- Service Worker v6 (cache-first, offline complet, invalidation forcée)
- manifest.json (icône pioche, display standalone, orientation portrait)
- Déploiement auto GitHub → Netlify
- URL renommée : jules-cm1.netlify.app

---

## Contenu Pédagogique — 224 Questions

| Catégorie | Nb | Détail |
|---|---|---|
| Mathématiques | 61 | Fractions, calcul mental, périmètres, multiplications |
| Français | 63 | Imparfait, passé composé, homophones, COD, nature des mots |
| Histoire | 30 | Clovis, Charlemagne, Moyen Âge, châteaux forts |
| Géo & Sciences | 30 | Paysages, énergies, rotation Terre, oxygène |
| Boss Minecraft | 20 | Obsidienne, Nether, Ender Dragon, minerais |
| Problèmes | 10 | Problèmes mathématiques thématisés Minecraft |
| Casse-têtes | 10 | Logique et réflexion, thème Minecraft |

Types de réponses : saisie texte libre + QCM (choix multiples).

---

## Mécanique de Jeu

- 3 vies (coeurs) + 3 nourritures (poulet = passer une question)
- 7 paliers : Pierre → Fer → Or → Diamant → Obsidienne → Nether → End
- Boss à chaque fin de palier (10 questions), rapporte des gemmes
- Boutique avec 10 pouvoirs : Potion (+1 vie), Bouclier (bloque 1 erreur), Pilon Poulet (passe), Totem (résurrection auto), Pomme d'Or (+3 vies), Loupe (indice gratuit), Fiole d'XP (saute 2), Aimant (gemmes x2), Livre du Savoir (révèle réponse), Étoile du Nether (bat le Boss auto)
- Système de sauvegardes : 1 auto + 3 slots manuels (localStorage)
- Stats détaillées par catégorie avec niveaux de maîtrise (Débutant → Expert)

---

## Fichiers du Projet

| Fichier | Rôle |
|---|---|
| `App_Jules_Tablette.html` | Source principale (standalone, avatar + sprites en base64) |
| `App_Jules.html` | Ancienne version (non maintenue) |
| `avatar.jpg` | Photo de Jules (encodée en base64 dans l'app) |
| `manifest.json` | Config PWA |
| `sw.js` | Service Worker v6 — cache-first, offline |
| `ecole.md` | Programme scolaire CM1 complet (référence) |
| `mat_minecraft.md` | Liste items/blocs Minecraft (référence) |
| `Compte-Rendu.md` | Ce document |
| `.deploy_config` | Tokens GitHub + Netlify (NE PAS SUPPRIMER) |

---

## Déploiement

### GitHub
- Repo : https://github.com/DimitriV60/app-jules
- Branche : `main`

### Netlify
- URL : https://jules-cm1.netlify.app/
- Déploiement auto à chaque push sur `main`

### Workflow de mise à jour
1. Modifier `App_Jules_Tablette.html`
2. Copier vers le dossier deploy (`index.html`)
3. Incrémenter `CACHE_NAME` dans `sw.js` (actuellement v6)
4. `git add . && git commit && git push`
5. Netlify redéploie (~30s)
6. Jules recharge la tablette → mise à jour reçue

### Installation PWA (tablette Jules)
1. Ouvrir https://jules-cm1.netlify.app/ dans Chrome
2. Cliquer "Installer" dans la barre d'adresse
3. L'app apparaît sur l'écran d'accueil (plein écran, sans barre navigateur)
