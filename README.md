## Aplicação

Link do Dockerhub: https://hub.docker.com/repository/docker/nayse/web-serv-img/

Criação de grupo/banda e cadastro dos integrantes.

Endpoints implementados: GET, POST, PUT, DELETE, PATCH, OPTIONS e HEAD

### Instalação

Necessário possuir Node.js, npm e Express.js instalados. (https://nodejs.org/en/)


### Para configurar o ambiente:

Dentro do arquivo diretórioo com o código instale as bibliotecas necessárias:

```
npm install 

npm install express

npm install body-parser
```

No projeto foi utilizado o Postman para realizar as requisições, para fazer isso utilizando o terminal use:

GET
```
curl http://localhost:3000/
```

POST
```
curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "nome": "Namjoon", "idade": 29, "funcao": "Vocalista"}' http://localhost:3000/id
```

PUT
```
curl -X PUT -H "Content-Type: application/json" -d '{"id": 1, "nome": "RM", "idade": 28, "funcao": "Vocalista"}' http://localhost:3000/id
```

PATCH
```
curl -X PATCH -H "Content-Type: application/json" -d '{"idade": 29}' http://localhost:3000/id

DELETE
```
curl -X DELETE http://localhost:3000/id
```

OPTIONS
```
http OPTIONS http://localhost:3000/id

```

HEAD
```
curl -I http://localhost:3000/

```


