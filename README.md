# 🎮 React Native Expo - Tetris

Un projet de jeu Tetris développé avec **React Native** et **Expo**.

---

## 🚀 Installation & Configuration

### 1️⃣ **Prérequis**
Avant de commencer, assure-toi d'avoir installé :
- [Node.js](https://nodejs.org/) (Dernière version recommandée)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/downloads)

### 2️⃣ **Cloner le projet**
Exécute la commande suivante pour récupérer le code source :

```sh
git clone https://github.com/Eltariels/React-native-expo---Tetris.git
cd React-native-expo---Tetris
```

### 3️⃣ **Installer les dépendances**
Avant de lancer l’application, installe toutes les dépendances :

```sh
npm install
```

ou si tu utilises **Yarn** :

```sh
yarn install
```

Si tu rencontres des erreurs, vérifie que les modules sont bien installés avec :

```sh
npm list --depth=0
```

Si certains packages manquent, utilise :

```sh
npm install nom_du_package
```

ou

```sh
yarn add nom_du_package
```

### 4️⃣ **Lancer l’application**
Une fois les dépendances installées, lance Expo :

```sh
npx expo start
```

ou avec Yarn :

```sh
yarn expo start
```

Cela ouvrira l’interface Expo et te permettra de lancer l’application sur un émulateur ou un appareil physique.

---

## 📦 **Dépendances principales**
Voici les principales bibliothèques utilisées dans ce projet :

```json
{
  "expo": "latest",
  "react": "18.x",
  "react-native": "0.72.x",
  "react-navigation": "^6.x",
  "react-native-gesture-handler": "^2.x"
}
```

Si des packages sont manquants ou obsolètes, mets-les à jour avec :

```sh
npm update
```

ou

```sh
yarn upgrade
```

---

## 🛠 **Problèmes fréquents et solutions**
### ❌ **Problème avec Expo**
Si `npx expo start` ne fonctionne pas, essaye de réinstaller Expo CLI :

```sh
npm install -g expo-cli
```

ou

```sh
yarn global add expo-cli
```

Puis redémarre ton terminal et relance l’application.

### ❌ **Erreur de dépendance**
Si un package pose problème, supprime le dossier `node_modules` et le fichier `package-lock.json` :

```sh
rm -rf node_modules package-lock.json
npm install
```

ou avec Yarn :

```sh
rm -rf node_modules yarn.lock
yarn install
```

---

## 📜 **Licence**
Ce projet est sous licence MIT.

---

🚀 **Copyright @2025 - BORELLA Théo** 🎮
