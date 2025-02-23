# Kidshomeworkgen

## Description

Kidshomeworkgen is an api to generate homeworks for kids. At this moment only generates some basic maths operations.

Basic maths:

* Additions
* Substractions
* Multiplications
* Divisions

Fractions:

* Additions
* Substractions
* Multiplications

It uses Nestjs as backend framework, Open ai api and handlebars for templates.
For deployment uses Docker and Github Actions.

## Project setup

Clone the project from this repository.

Run the following command to install dependencies.

```bash
$ pnpm install
```

## Compile and run the project

Before run the project keep in mind that you need the following env variables.

* OPENAI_API_KEY
* PDF_API_URI: The pdf api generates the pdf. This api only generate the necessary data and template.
* ORIGIN: Optional
* PORT: Optional

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Deployment

This api uses Github Actions and Digitalocean Droplets.

The following variables are necessary on Github Actions:

* DOCKERHUB_USERNAME
* PDF_API_URI
* ORIGIN: Optional

The following secrets are necessary on Github Actions:

* DOCKERHUB_TOKEN
* OPENAI_API_KEY
* SERVER_IP
* SERVER_USER
* SSH_PASSPHRASE
* SSH_PRIVATE_KEY

## Resources

Check out a few resources that may come in handy when working with NestJS:

* Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
* Visite the [OpenAI api](https://platform.openai.com/) to learn more about the gpt api.
* Learn about [structured outputs](https://platform.openai.com/docs/guides/structured-outputs#structured-outputs-vs-json-mode)
* SHH for Github Actions from [Appleboy](https://github.com/appleboy/ssh-action)
* Visit [nginx](https://nginx.org/en/) and learn some [basic configuracions](https://medium.com/adrixus/beginners-guide-to-nginx-configuration-files-527fcd6d5efd)
* Learn about [Docker](https://www.docker.com/)

## Stay in touch with Nestjs

* Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
