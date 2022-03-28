# ronin-auto
![](logo.png)


[![Parallel Cypress Tests](https://github.com/ChaikaBogdan/ronin-auto/actions/workflows/main.yml/badge.svg)](https://github.com/ChaikaBogdan/ronin-auto/actions/workflows/main.yml)


# About

Cypress test automation assigment for Katana.

The GitHub Actions already configured for Cypress Dashboard parallel execution on every push

# How to run locally 
```
npm ci
npm test
```
**Please note:** local run is not utilizing Cypress Dashboard

# Where are the record and project cypress tokens?
They configured as GitHub prod enviroment secrets 

# How about Docker?
Not part of this assigment, but feel free to check my other [Playwright repo](https://github.com/ChaikaBogdan/starman-auto) for example 

# Insights
- I am using [cypress-localstorage-commands](https://www.npmjs.com/package/cypress-localstorage-commands) plugin to keep user signed in [between tests](https://github.com/ChaikaBogdan/ronin-auto/blob/main/cypress/support/index.js#L23). Its probably can be done better for example stripping token from redirect url after sign-in.
- Cypress free plan for Dashboard is a trash. I depleted 500 test results in few hours and there is no cheap personal plan...but its working in [nutshell](https://github.com/ChaikaBogdan/ronin-auto/actions/runs/2040090113)
