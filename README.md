nfp_api
=======
NFP backend API for the frontend mythril


Installation & Run
------------

```bash
npm install
node --harmony index.js

### Alts for running in production mode
# node --harmoney index.js --production
# NODE_ENV=production node --harmony index.js
```

Running in dev mode will make nfp_api automatically scan the postgresql for required tables and/or create them if any are missing/outdated. This behavior can be overriden by adding `--skip-db` as command argument (see below).


Config
------

Every time nfp_api is run, it will generate a copy of the whole current runtime configuration into `config/config.json.current`. Any of these values can be overridden by creating a `config/config.json` and adding values you want to override.


Arguments
---------

NFP api supports number of handy command arguments:

`--production` Runs nfp_api in production mode. This disables database integrity scan as well as enables other optimisations.

`--scan-db` Force scan the database for integrity even in production mode.

`--skip-db` Skips scanning the database in dev mode.


License
-------
NFP API code and all code within this project is licensed under the terms of the WTFPL, see the included LICENSE file.
