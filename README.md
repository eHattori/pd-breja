[![Build Status](https://travis-ci.org/eHattori/pd-breja.svg?branch=master)](https://travis-ci.org/eHattori/pd-breja)
[![Coverage Status](https://coveralls.io/repos/github/eHattori/pd-breja/badge.svg?branch=master)](https://coveralls.io/github/eHattori/pd-breja?branch=master)


# PD-Breja

PD-Breja é uma API REST desenvolvida em Javascript com NodeJS, em que o usuário consegue realizar tarefas como cadastrar e encontrar PDVs de cerveja gelada mais próximo de forma simples e segura.

PDV = Ponto de Venda :)

# Instalação

O PD-Breja foi desenvolvido em NodeJs com o framework Express v4 e utiliza o banco de dados noSQL MongoDb, embora as instruções são voltadas para o Linux o NodeJS tem um ótimo suporte Cross-Plataform, sendo assim, você consegue rodar o PD-breja no Linux, Windows ou OSX com alguns ajustes.

## Pré-requisitos

* node v8
* npm v5
* docker v17 --dev
* docker-compose v1.16 --dev

## Instalando Dependências

Instale os pacotes necessários

```
npm install
```

Suba um container do MongodDB

```
sudo docker-compose up -d
```

## Iniciando a Aplicação

O PD-breja utliza um gerenciador de processos chamado PM2

Para iniciar uma intância do app:

```
npm start
```

## Executando os testes

Para executar os testes basta executar o comando 

```
npm test
```

## Deploy e CI

Assim que é feito um commit na branch master, o Travis CI executa os testes e faz o deploy no app do heroku:

https://pd-breja.herokuapp.com/

**Toda requisição necessita de um token de autenticação

## Migração de Dados

Para executar o migration de dados

```
npm run migrate
```

# Como funciona o PD-breja??

Os Pontos de Vendas são cadastrados com um POST

* Todos os campos são necessários
* O campo document é unico
* Os campos coverageArea e address seguem o padrão GeoJSON

## POST

Url: https://pd-breja.herokuapp.com/pdv/

```
Exemplo de corpo da requisição:

 { 
    "tradingName": "PDBreja - Franca",
    "ownerName": "Eduardo Hattori",
    "document": "36167948895",
    "coverageArea": { 
    "type": "MultiPolygon", 
        "coordinates": [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
        ]
    }, 
    "address": { 
        "type": "Point",
        "coordinates": [-46.57421, -21.785741]
    }
 }
 ```

Exemplo de Resposta com o StatusCode 201:

```
{
    "pdvs": [
        {
            "tradingName": "PDBreja - Franca",
            "ownerName": "Eduardo Hattori",
            "document": "36167948895",
            "id": "49"
        }
    ]
}
```

## GET por id

Url: https://pd-breja.herokuapp.com/pdv/:id

Exemplo de Resposta com o StatusCode 200:

```
{
    "pdvs": [
        {
            "id": "51",
            "tradingName": "Bar Legal",
            "ownerName": "Eduardo Pedroso",
            "document": "73.068.991/0001-18",
            "coverageArea": {
                "coordinates": [
                    [
                        [
                        ...
                        ]
                    ]
                ],
                "type": "MultiPolygon"
            },
            "address": {
                "coordinates": [
                    -46.772907,
                    -23.528173
                ],
                "type": "Point"
            }
        }
    ]
}
```

## GET por longitude e latitude

Url: https://pd-breja.herokuapp.com/pdv?lng=-46.772907&lat=-23.528173

Exemplo de Resposta com o StatusCode 200:

```
{
    "pdvs": [
        {
            "id": "51",
            "tradingName": "Bar Legal",
            "ownerName": "Eduardo Pedroso",
            "document": "73.068.991/0001-18",
            "coverageArea": {
                "coordinates": [
                    [
                        [
                        ...
                        ]
                    ]
                ],
                "type": "MultiPolygon"
            },
            "address": {
                "coordinates": [
                    -46.772907,
                    -23.528173
                ],
                "type": "Point"
            }
        }
    ]
}
```

## ERROR

Exemplo de erros com StatusCode 400, 404 ou 500:

```
{
    "pdvs": [],
    "error": [
        "document: "36167948895" already exist"
    ]
}
```

# To-DO

* Implementar Swagger
* Configurar Servidor para logs
* Implementar BDD

# Meta

Eduardo Hattori – [@eHattori]:https://github.com/eHattori
