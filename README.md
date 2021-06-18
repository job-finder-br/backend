### Endpoints

<a href="https://insomnia.rest/run/?label=PDSI&uri=https%3A%2F%2Fgithub.com%2Fjob-finder-br%2Fbackend%2Fblob%2Fmain%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

### ER Model

![ER-model](ER.png)

### Docker-compose Dev

```sh
docker-compose -f docker-compose.dev.yaml up -d --build
```

### Database de testes

```sh
docker run --restart=always --name jobfinder-db -e POSTGRES_DB=jobfinder_db -e POSTGRES_PASSWORD=jobfinder_db -p 5435:5432 -d postgres
```

### Inicializando

```sh
$ yarn
$ docker-compose up -d --build
```

### Verificando instâncias geradas

```sh
$ docker-compose ps #Verifica os status dos containers levantados
$ docker logs jobfinder-api -f #Verifica logs da API no docker
$ docker logs jobfinder-db -f #Verifica logs do DB no docker
```

### Criando Migration

```sh
$ yarn typeorm migration:create -n nome_da_migration

```

### Gerando uma Migration baseada em entidade do TypeORM

```sh
$ yarn typeorm migration:generate -n nome_da_migration #Criar uma entidade baseada no typeORM antes

```

### Rodando Migration

```sh
$ yarn typeorm migration:run

```
