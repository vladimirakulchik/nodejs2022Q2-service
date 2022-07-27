# Home Library Service

Welcome to Home Library Service! 

`Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, also add them to `Favorites` in their own Home Library.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and `npm` package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/) and `docker-compose` for your OS.

## Downloading repository

```
git clone https://github.com/vladimirakulchik/nodejs2022Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Start application

Create `.env` file from `.env.example` file.

To start application run next command (not-daemon mode):
```
docker-compose up
```

It will build images for api and database on first run, so it may take some time.

If you want to run application in daemon mode, use:
```
docker-compose up -d
```

After starting the app on port (4000 as default): http://localhost:4000/

You can open in your browser OpenAPI documentation: http://localhost:4000/doc/

For more information about OpenAPI/Swagger please visit: https://swagger.io/

## Stop application

If you start application in not-daemon mode, just use combination `Ctrl + C`.

If you start application in daemon mode, run:
```
docker-compose down
```

## Build images

If you want to build images as separate step before run application:
```
docker-compose build
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization:
```
npm run test
```

To run only one of all test suites:
```
npm run test -- <path to suite>
```

<!-- To run all test with authorization:
```
npm run test:auth
```

To run only specific test suite with authorization:
```
npm run test:auth -- <path to suite>
``` -->

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

<!-- ### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging -->

### Vulnerabilities scanning

```
// for API
npm run scan:api

// for Database
npm run scan:db
```

### Database files and logs

Database files and logs are stored in docker volumes.

To see where docker volume lives, use next command:
```
docker volume inspect nodejs2022q2-service_db-data
```
Where `nodejs2022q2-service_db-data` is a volume name. 

Example output (for Ubuntu):
```
[
    {
        "CreatedAt": "2022-07-20T01:43:17+03:00",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "nodejs2022q2-service",
            "com.docker.compose.version": "1.25.0",
            "com.docker.compose.volume": "db-data"
        },
        "Mountpoint": "/var/lib/docker/volumes/nodejs2022q2-service_db-data/_data",
        "Name": "nodejs2022q2-service_db-data",
        "Options": null,
        "Scope": "local"
    }
]
```

You are looking for `Mountpoint` path. There is a folder, where database (PostgreSQL) will store all data and logs. 
You can find database logs in `log` subdirectory.

You can check all volumes using next command:
```
docker volume ls
```
