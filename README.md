# Documentação CharSheet API

## Requisitos mínimos
- SQL Server
- NodeJS
- Nodemon

Faça o download da aplicação através do link:
\
`git clone https://github.com/HidemitsuHashimoto/CharSheet-API.git`

## Antes de iniciar a aplicação

### Instale as dependêcias do projeto
No prompt de comando navegue até a pasta do projeto e execute o comando:
- `npm i` ou `yarn`

### Configure o banco de dados
- Faça uma cópia do arquivo **.env.sample** na mesma pasta
- Renomeie a cópia de **.env**
- Preencha os campos do **.env** com os dados do seu banco
- No prompt de comando execute `knex migrate:latest --env dev`
- Agora execute o comando `npm run start` ou `yarn start`

# Endpoints

## Personagens
<br>

### GET - Lista de personagens
    http://localhost/char
<br>

#### Resposta Sucesso
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"data": [
			{
				"id": 1,
				"name": "Busao",
				"gender": "F",
				"attributes": [
					{
						"id": 1,
						"attributeId": 1,
						"value": 150,
						"title": "Força"
					},
					{
						"id": 2,
						"attributeId": 2,
						"value": 0,
						"title": "Inteligência"
					}
				]
			},
			{
				"id": 2,
				"name": "Busao",
				"gender": "F",
				"attributes": [
					{
						"id": 3,
						"attributeId": 1,
						"value": 150,
						"title": "Força"
					},
					{
						"id": 4,
						"attributeId": 2,
						"value": 0,
						"title": "Inteligência"
					}
				]
			}
		],
		"success": true,
		"message": "Consulta realizada com sucesso."
	}

</details>
<hr>
<br>

#### Resposta Erro
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"data": [],
		"success": false,
		"message": error
	}

</details>
<hr>
<br>

### GET - Um Personagem
#### ID = Chave primária do personagem
    http://localhost/char/id
#### Resposta Sucesso
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"data": {
			"id": 1,
			"name": "Busao",
			"gender": "F",
			"attributes": [
				{
					"id": 1,
					"attributeId": 1,
					"value": 150,
					"title": "Força"
				},
				{
					"id": 2,
					"attributeId": 2,
					"value": 0,
					"title": "Inteligência"
				}
			]
		},
		"success": true,
		"message": "Personagem encontrado com sucesso."
	}

</details>
<hr>
<br>

#### Resposta Erro
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"data": {},
		"success": false,
		"message": error
	}

</details>
<hr>
<br>

### POST - Novo Personagem
*Os atributos são opcionais*

*Os atributos não informados serão registrados com o valor 0*

    http://localhost/char/save

#### Body
<hr>
<details>
	<summary>Corpo da requisição</summary>

	{
		"name": NOME DO PERSONAGEM (STRING),
		"gender": ENUM("M", "F", "O"),
		"attributes": [
			{
				"attributeId": NÚMERO DO ATRIBUTO (NUMBER),
				"value": VALOR DO ATRIBUTO (NUMBER)
			}
		]
	}

</details>
<hr>
<br>

#### Resposta Sucesso
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"success": true,
		"message": "Mensagem de sucesso",
		"attributeResponse": {
			"success": true,
			"message": "Mensagem de sucesso",
			"sample": ""
		}
	}

</details>
<hr>
<br>

#### Resposta Erro
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"success": false,
		"message": "Mensagem de erro",
		"attributeResponse": {
			"success": false,
			"message": "Mensagem de erro",
			"sample": "Exemplo do formato que deve ser enviado"
		}
	}

</details>
<hr>
<br>

### PUT - Editar Personagem
*Os atributos são opcionais*

*Os atributos não informados serão registrados com o valor 0*

	http://localhost/char/edit

#### Body
<hr>
<details>
	<summary>Corpo da requisição</summary>

	{
		"id": ID DO PERSONAGEM (NUMBER),
		"name": NOME DO PERSONAGEM (STRING),
		"gender": ENUM("M", "F", "O"),
		"attributes": [
			{
				"id": ID DO ATRIBUTO (NUMBER),
				"attributeId": NÚMERO DO ATRIBUTO (NUMBER),
				"value": VALOR DO ATRIBUTO (NUMBER)
			}
		]
	}

</details>
<hr>
<br>

#### Resposta Sucesso
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"success": true,
		"mensagem": "Mensagem de sucesso",
		"attributeResponse": {
			"success": true,
			"mensagem": "Mensagem de sucesso",
			"sample": ""
		}
	}

</details>
<hr>
<br>

#### Resposta Erro
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"success": false,
		"mensagem": "Mensagem de erro",
		"attributeResponse": {
			"success": false,
			"mensagem": "Mensagem de erro",
			"sample": "Exemplo do formato que deve ser enviado"
		}
	}

</details>
<hr>
<br>

## Atributos
<br>

### GET - Lista de atributos
	http://localhost/attribute

#### Resposta Sucesso
<hr>
<details>
	<summary>Exemplo</summary>
	
	{
		"data": [
			{
				"id": 1,
				"title": "Força"
			},
			{
				"id": 2,
				"title": "Inteligência"
			}
		],
		"success": true,
		"message": ""
	}

</details>
<hr>
<br>

#### Resposta Erro
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"data": [],
		"success": false,
		"message": "Mensagem de erro"
	}

</details>
<hr>
<br>

### POST - Editar Personagem
	http://localhost/attribute/save

#### Body
<hr>
<details>
	<summary>Corpo da requisição</summary>

	{
		"title": NOME DA ATRIBUIÇÃO (STRING)
	}

</details>
<hr>
<br>

#### Resposta Sucesso
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"success": true,
		"message": "Mensagem de sucesso"
	}

</details>
<hr>
<br>

#### Resposta Erro
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"success": false,
		"message": "Mensagem de erro"
	}

</details>
<hr>
<br>