# Next.js reason-react apollo production ready boilerplate 

This project is to confirm nextjs can do everything I need it to do.
This is still in active development but does contain some concepts worthy of consideration.
Feel free to push anything here you think would benefit the community.

RAN is my starting point and I recommended contributing to it if you can: https://www.rantoolkit.com
This project builds on it and I eventually will push things back that end up working/being a good idea.
Also read this: https://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

Install it and run:

```bash
npm install
npm run bsb-watch
(in another tab) npm run dev
```

Build and run:

```bash
npm run build
npm run start
```
(after running production build locally, make sure to unregister service worker in chrome dev tools)

## KNOWN ISSUES
* add .env to your .gitignore.  It is only there so you can have a local copy
* ant design elements need hard reload on development - it will all run fine on production
Next.js v7 has a critical bug with less/css right now: https://spectrum.chat/?t=2183fc55-236d-42cb-92b9-3ab10acc6303
The only workaround I could get going is not to load less/css files.  This impacts ant design hot reload because 
on development I normally would import antd.less globally only in dev mode to make hot deploy work.
* bs-moment warnings during build - known issue fixed waiting for next release

## This example features:

* Reason-React (https://github.com/zeit/next.js/tree/master/examples/with-reasonml)
* CI testing: CodeBuild files currently deploying to AWS Beanstalk (but could go anywhere)
* Deployment testing
  * Beanstalk - config files, sumologic logging 
  * Lambda - tested before antd made this dist file too big. Cold starts occasional issue even with warming enabled.
    Avg response ~150ms vs beanstalk ~40ms (not a big deal but not )
  * Now - recommended due to ease of deployments, superior compression (br), support for server push.
* Ant Design - designed for react.  Note it is so huge we really need rollup (or equivalent) working
* Font-Awesome - (no flicker) https://spectrum.chat/thread/56b0396d-8b7d-447d-9f46-24ba6192936e
* Sentry - kinda works but SSR has known issues https://github.com/zeit/next.js/issues/1852 
* next-less/next-css/next-styl only loading during dev/build.  See "phase" in next.config.js
* cors whitelist - necessary for service-worker preload to cache response correctly (see server.js)
* healthcheck - "express-healthcheck" 
* helmet - basic ssr security best practices enabled in server.js
* next-link - server push of critical assets for minimum "time to interactive" latency 
* offline support - next-offline. See server.js manifest prefix with assetPrefix hack 
* robots.txt - see server.js
* SEO - see next-seo
* multicore support - see PM2 and "start:multicore" in package.json
* optimal distribution size - using repack-zip-alt to create production zip until rollup is fixed 
* PWA Manifest - originally using next-manifest but found conflict with next-offline.  See static/manifest dir for placeholders.
* non-critical css loaded async - see loadCSS in _document.js (hacked this version to handle crossorigin)
* RUM (Real User Monitoring) via next-rum (see _app.js) or site24x7 (see end of _document.js) 
* Node Performance Monitoring via site24x7 (see top of server.js)
* br compression - you should disable this if your proxy already supports br (ie cloudflare)
* babel legacy decorators make antd theming work (https://github.com/zeit/next.js/pull/5263)
* bundle analyzer (npm run analyze)
* desktop/mobile conditional rendering based on device (react-useragent)
* localization - react-i18next https://react.i18next.com 
* next-routes - see routes.js.  Put every route in here to enable static assets added to link preload header


TODO: 
* reason-apollo - perhaps the next.js "with-apollo" examples working in reason-react
* health check hit critical stuff rather than just confirm ssr working (database, cdn, etc)
* push notification (next-offline seems to support that but hard to demo without actual server)
* best way to generate site map
* rollup - need dist file without the unused code bloat (see rollup.config.js for current issue)
* beanstalk server push (cloudflare cdn does server push automatically for same domain assets in link header)
* placeholder favicons so everything loads without console errors (i removed my corporate ones to make this boilerplate generic)
* dotenv only runs on local machine (but still during local production build and local prod testing)
* improve desktop/mobile example to switch between antd mobile/desktop rather than just different words
* next-stylus "nib" feature needs to only run during dev/build
* i18next scripts and dependencies should be loaded from some external package
* integrate with storybook or styleguide
* auth (likely with AWS Amplify)
* opengraph db (likely AWS AppSync)

What else does every production next.js app need?


## Tips for new users (things experienced users may take for granted)
- npm-check-updates is very helpful for keeping an eye on dependencies (ie "ncu")
