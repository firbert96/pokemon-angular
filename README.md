# PokemonAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Install

Node version 20 LTS -> 20.15.1
Angular/cli version 18 -> npm install -g @angular/cli@18

## Figma

See Figma -> <https://www.figma.com/design/CD2461Nsld5xxfoVorJcXw/Pokemon-Angular?node-id=0-1>

## Build Docker Image

`
docker build -f ci/Dockerfile -t pokemon-angular .
`

## Check Docker Image

`
docker images
`

## Set tag image for push docker hub

`
docker tag <existing-image-id> <username-docker>/pokemon-angular:latest
`

## Push docker hub

`
docker push <username-docker>/pokemon-angular:latest
`

## Pull docker hub

`
docker-compose pull
`
or

`
docker pull <username-docker>/pokemon-angular:latest
`

## Run Docker Compose

`
docker-compose up
`

## Run Docker Compose in background

`
docker-compose up -d
`

## Stop Docker Compose

`
docker-compose down
`

## Run Docker Container

`
docker run -d -p 4200:4200 --name pokemon-angular-instance-1 pokemon-angular
`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component <component-name> --skip-tests` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
