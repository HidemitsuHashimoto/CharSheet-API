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

### GET - Novo Personagem
Os atributos são opcionais

Os atributos não informados serão registrados com o valor 0

    http://localhost/char/save

#### Body
<hr>
<details>
	<summary>Exemplo</summary>

	{
		"name": "Busao",
		"gender": "F",
		"attributes": [
			{
			"attributeId": 1,
			"value": 150
			}
		]
	}

</details>
<hr>
#### Resposta Sucesso
<hr>
<details>
	<summary>Exemplo</summary>
</details>
<hr>
<br>

#### Resposta Erro
<hr>
<details>
	<summary>Exemplo</summary>
</details>
<hr>

## Atributos