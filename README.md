Phaser 3 with Parcel
====================

This is a simple Phaser PWA game template using [Parcel](https://parceljs.org).
...forked from [https://github.com/samme/phaser-parcel](https://github.com/samme/phaser-parcel)


Features
========

- Phaser game-engine
- Parcel packaging
- MQTT client
- PWA: service-worker & manifest for offline/installable web-app


Use
---

```sh
## Open this repo: <https://github.com/fingerskier/phaser-boilerplate> and click "Use this template"
  - or clone it and reset the .git

## From the project directory, install:
npm install

## Auto-compile and run dev server:
npm run start

## Compile for production:
npm run build
```


You can edit these scripts in [package.json](./package.json) to suit your needs. See:

- [Parcel: Getting Started](https://parceljs.org/getting_started.html)
- [Parcel: Production](https://parceljs.org/production.html)
- [Parcel: CLI](https://parceljs.org/cli.html)


Game assets
-----------

Static assets used in your JavaScript must be imported:

```javascript
import space from './assets/space.png'); // -> './space.89e3a46b.png'
// OR
import images from './assets/*.png'; // -> { space: './space.89e3a46b.png', … }
```


In this project assets are only in the `/dist` folder.  If desired you could add a prebuild script to copy yours overs.


Offline Support
---------------

This project has PWA baked-in via the web-manifest and service-worker:
- `/src/manifest.webmanifest` contains the install info
- `/dist/service-worker.js` handles the offline caching and such.  For more on this see [The Service-Worker Cookbook](https://serviceworke.rs/)


Package aliasing
----------------

You can use [package.alias](https://parceljs.org/module_resolution.html#aliasing) to specify an alternative Phaser build, e.g.,

```json
{
  "name": "my-phaser-game",
  "alias": {
    "phaser": "./node_modules/phaser/src/phaser-arcade-physics.js"
  }
}
```

Custom Phaser
-------------

See the [imports branch](https://github.com/samme/phaser-parcel/tree/imports).


Hot reload
----------

When running the dev server the game is destroyed and then recreated after you save changes to your files. Rarely, this can fail. Just refresh the browser.

If you don't like [hot reload](https://parceljs.org/hmr.html) at all, you can turn it off:

```sh
parcel serve src/index.html --no-hmr
```
