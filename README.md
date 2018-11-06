# Next.js reason-react apollo production ready boilerplate 

This project is an attempt to provide a production ready starting point for your reason-react project.
Feel free to propose anything in tickets or push anything you think would benefit the community.

This project builds on the amazing foundation of RAN Toolkit https://www.rantoolkit.com
If for some reason you don't want to use Next, consider https://github.com/ivan-aksamentov/reactlandia-bolerplate-lite

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

## Production Prep
* add .env to your .gitignore and remove from git: `git rm -r .env`.  It is only checked in to give you a starting point.

## KNOWN ISSUES
* ant design element pages need hard reload in development - it will all run fine on production
Next.js v7 has a critical bug with less/css right now: https://spectrum.chat/?t=2183fc55-236d-42cb-92b9-3ab10acc6303
The only workaround I could get going is not to load less/css files.  This impacts ant design hot reload because 
on development you would import antd.less globally only in dev mode to make hot deploy work.
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
* localization - react-intl (started with react-i18next which was a big mistake)
* next-routes - see routes.js.  Put every route in here to enable static assets added to link preload header
* styleguide - npm run storybook  ()Needed some less fixes in .storybook/webpack.config.js)
* reason-apollo - the reason-apollo example copied into a page and working


TODO: 
* auth (likely with AWS Amplify)
* opengraph db (likely AWS AppSync)
* health check hit critical stuff rather than just confirm ssr working (database, cdn, etc)
* push notification (next-offline seems to support that but hard to demo without actual server)
* best way to generate site map
* rollup - need dist file without the unused code bloat (see rollup.config.js for current issue)
* beanstalk server push (cloudflare cdn does server push automatically for same domain assets in link header)
* placeholder favicons so everything loads without console errors (i removed my corporate ones to make this boilerplate generic)
* dotenv only runs on local machine (but still during local production build and local prod testing)
* improve desktop/mobile example to switch between antd mobile/desktop rather than just different words
* next-stylus "nib" feature needs to only run during dev/build


What else does every production next.js app need?


## Tips for new users (things experienced users may take for granted)
- npm-check-updates is very helpful for keeping an eye on dependencies (ie "ncu")
