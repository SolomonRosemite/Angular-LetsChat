<p align="center">
  <img src="./letschat/Docs/Icon.png" width="120">
  <h1 align="center">Let's Chat</h1>
  <h4 align="center"><a href="https://angular-letschat.web.app"><code>Try it Now</code></a></h4>
  <p align="center">A Web based Chat App build with Angular</p>
  <p align="center">
    <img src="https://img.shields.io/badge/type-project-orange?style=flat-square" alt="Repo Type" />
    <img src="https://img.shields.io/badge/language-typescript-blue?style=flat-square" alt="Repo Main Language" />
    <img src="https://img.shields.io/badge/platform-web-yellow?style=flat-square" alt="Project Platform" />
  </p>

# About📖

- Let's Chat is a Project I made just out of enjoyment.💖
- It supports a few things like: Exchanging ✈️Messages, 🖼️Images, 📁Files and
  more!
- Feel free to use it as you want.😇

# Clone the repository for your machine💻

### Requirements

- Node Installed
- Yarn or Npm Installed
- A Firebase Project

### Installing

1. Clone the repository using the Github client of your choice, or download the
   repository Using the Github client via the command line:

```
git clone https://github.com/SolomonRosemite/Angular-LetsChat.git
```

2. Install the dependencies:

```
yarn install || npm install
```

3. Connect to Firebase:

- Create a Firebase Project <a href="https://firebase.google.com">here.</a>
- Create a file named "credentials.ts" in .\src\environments folder, then paste
  your firebase credentials which can be acquired by going into the project
  settings and creating a new web app.
  <a href="https://firebase.google.com/docs/web/setup">For more info here.</a>

```typescript
export const credentials = {
  firebase: {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "...",
  },
};
```

4. Launch app:

```
ng serve
```

5. Build app:

```
ng build
```

- Or build app for production

```
ng build --prod
```

# Built with⛏️

- Frontend Framework:
  <code><img height="20" align="top" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/angular/angular.png">
  Angular</code>
- Database & Storage:
<code><img height="20" align="top" src="https://raw.githubusercontent.com/github/explore/f3dc333811d46c39b8b0b1b903daf12da2ff18b3/topics/firebase/firebase.png">
Firebase</code>

  <h2 align="center">
    Open Source
  </h2>
  <p align="center">
    <sub>Copyright © 2020-present, Solomon Rosemite</sub>
  </p>
  <p align="center">Let's Chat <a href="https://github.com/SolomonRosemite/Angular-LetsChat/blob/master/LICENSE">is MIT licensed 💖</a>
  </p>
  <p align="center">
    <img src="./letschat/Docs/Icon.png" width="65">
</p>
