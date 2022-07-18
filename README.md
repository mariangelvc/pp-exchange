<h1 align="center">
  <br>
  <a href="http://github.com/mariangelvc"><img src="https://www.portfoliopersonal.com/Content/Images/logo-pp-inversiones.png" alt="PPI Challenge" width="250"></a>
  <br>
Exchange PPI Challenge
  <br>
</h1>
<div align="center">
  :rocket:
</div>
<div align="center">
  A <code>coding</code> challenge
</div>

<br />

<div align="center">
  <sub>Made with love by
  <a href="https://github.com/mariangelvc">
  Mariangel Villasana
  </a>
</div>

## Table of Contents

- [Installation](#installation)
- [Architecture](#architecture)
- [TODOs](#todos)

## Installation
Make sure you have `node v16.16.0` installed, and `yarn v1.22.19`.
Duplicate .env.example file and rename it as .env, use these vars:
```
REACT_APP_API_URL=https://api.vatcomply.com
```

Run the following to install dependencies:
```
yarn
```

## Architecture

All assets and components for each view are found on its own folder at `./source/views`

```
├── README.md
├── package.json
├── public                            // Public assets folder
├── src                               // App source
│   ├── App.js                  // App entrypoint
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── views                   // Views folder
│       └── principal           // Principal view and its assets
│           ├── Index.css
│           ├── assets
│           └── index.jsx
└── yarn.lock

```

## TODOs

* Fix some CSS from mobile version
* Align interchange icon correctly

## License

[MIT](https://tldrlegal.com/license/mit-license)
