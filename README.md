## Descrição do projeto

Esse é um projeto de um desafio técnico que consiste em ter um CRUD básico de uma tabela de despesas. Tecnologias usadas:

- NestJs
- Postgres
- Prisma ORM
- Docker
- Redis

Nesse projeto, é possível cadastrar uma nova despesa, listar despesas com a possibilidade de filtro, listar uma despesa passando um ID, atualizar uma despesa e por fim, deletar uma despesa. Todos os endpoints têm uma implementação de Guard, sendo necessário passar um header de authorization com o token JWT, lembrando de ter o prefixo `bearer`. As rotas de query possuem cache, que é sempre atualizado de acordo com os parâmetros. Porém quando há a exclusão, adição ou edição de algum dado, o cache é limpo, uma vez que pode trazer dados dasatualizados. O projeto também possui documentação.

O que foi implementado:

Funcionalidades básicas:
- [x] Usar NestJS com estrutura modular
- [x] Usar PrismaORM com banco PostgreSQL
- [x] Criar um schema.prisma funcional e migrar para o banco
- [x] Usar DTOs com validação
- [x] Usar Prisma Client para persistência
- [x] Expor rotas REST no padrão /expenses
- [x] Adicionar um filtro por data via query string

Funcionalidades adicionais:

- [x] Autenticação com JWT
- [x] Documentação com Swagger
- [x] Utilizar Redis para cache

## Instruções para rodar o projeto

Primeiramente faça a instalação dos pacotes através do npm

```bash
$ npm install
```

Após isso, adicione um arquivo `.env` com as seguintes variáveis de ambiente:

```
DATABASE_URL=postgresql://admin:root@localhost:5434/financial-planner-db

JWT_SECRET_KEY=baf35f1b6a15ede7b2dd0cc9b1b8db81e554cccec21fc4637913876f91484d8d
```

Recomendo que suba o docker contendo o container do postgres e do redis através do comando:

```bash
docker-compose up --build
```

Alternativamente você pode utilizar um postgres e um redis local, só não esqueça de alterar no `.env`. Por isso recomendo fortemente a utilização do docker aqui.

Por fim, conseguimos rodar o nosso projeto através do comando:

```bash
npm run start:dev
```

## Testando o projeto

Após rodar o projeto, eu recomendo que você acesse o mesmo pela porta 3000, sendo assim, o link é: `http://localhost:3000`. Para testar os endpoints, eu recomendo utilizar o próprio swagger que está configurado no projeto, lá está presente a documentação da API, bem como uma forma de testar. Caso contrário utilize alguma ferramenta para fazer requisições a sua escolha (ex: Insomnia, Postman, ThunderClient, etc).

Aqui vou utilizar o próprio swagger para demonstrar como testar.

Primeiramente, tente acessar qualquer rota (exceto a rota /auth/generateToken) sem um token de autenticação. Aqui o esperado é receber um erro do tipo "Unauthorized":

![image](https://github.com/user-attachments/assets/7bcdbaa8-8876-43cf-85a0-3bb8d5e5bd0d)

Agora vamos dar um post na rota `auth/generateToken`. Aqui o esperado é receber uma resposta contendo o JWT token:

![image](https://github.com/user-attachments/assets/e5fae673-7a97-426f-9ec3-2c89b7fb9991)

Agora estamos prontos para testar o restante da API. Copie o token retornado e lá em cima na parte da documentação tem um botão "Authorize" vamos clicar nele para setar o nosso token e poder acessar os demais endpoints:

![image](https://github.com/user-attachments/assets/fa0fad13-51c1-4240-8945-6d64bf09378d)

Colamos aqui e clicamos em "Authorize":

![image](https://github.com/user-attachments/assets/d752c063-2a70-4692-8a6d-9c36511dc33b)

Vamos criar nosso primeiro registro pela rota POST /expenses:

![image](https://github.com/user-attachments/assets/0ace3f75-e06f-4c05-bb5c-ab45d083b354)

![image](https://github.com/user-attachments/assets/27a8b638-3b61-45bf-b2e0-5493294fb037)

Agora podemos listar todas as despesas (caso queira adicionar mais registros, fique a vontade pois será util para testar os filtros):

![image](https://github.com/user-attachments/assets/52778935-1ce7-42e3-92ab-4fb4688b8ae5)

Perceba que há algumas queries de filtros, que podem ser usadas a vontade para o teste dessa funcionalidade.
Os filtros são:

- Filtro por nome
- Filtro por categoria
- Filtro por mês/ano
- Filtro por valor mínimo e máximo das despesas

Caso esteja usando um client como Insomnia ou Postman, é só colocar na query do endpoint GET /expenses?titulo=Contas&categoria=Lazer ou qualquer outro set de filtros que desejar. No meu caso vou fazer uma busca sem filtros para retornar todos os dados:

![image](https://github.com/user-attachments/assets/c042b3bc-dbea-4c68-9fe8-a0255cf85696)

Vou demonstrar brevemente a funcionalidade dos filtros utilizando minValue e maxValue. Como a conta é de 200, vou jogar um mínimo menor e o esperado é que ele continue retornando a despesa:

![image](https://github.com/user-attachments/assets/08e727d5-de3d-4fe1-945c-1f7a6379eca2)

Vou utilizar um mínimo MAIOR do que o meu registro que eu tenho e o comportamento esperado é que ele não retorne, já que eu não tenho nenhum registro que satisfaça a condição do filtro:

![image](https://github.com/user-attachments/assets/90e1252e-12eb-4e0d-addc-e29df4198509)

O mesmo vale para o maxAmount:

![image](https://github.com/user-attachments/assets/3bb1c344-11eb-4d4d-8fb5-8f27f45ee6ea)

![image](https://github.com/user-attachments/assets/9ede42e5-6dac-4b63-8b56-e2d5358b9615)

Fique a vontade para brincar com os demais filtros e combiná-los como desejar.

Passando para a rota GET /{id}, vamos passar um ID inexistente para ver se me retorna um 404:

![image](https://github.com/user-attachments/assets/25277bee-412c-4c44-aecf-37aab9efe643)

Agpra vamos passar o ID correto:

![image](https://github.com/user-attachments/assets/d77bc185-31cf-4ef7-9be9-5300d9f1e712)

O mesmo comportamento de retornar um erro do tipo 404 segue para as rotas que necessitam passar um id (edição e exclusão).

Agora vamos testar a edição pela rota PATCH /{id}, pois acredito que a despesa não está na categoria correta:

![image](https://github.com/user-attachments/assets/93551741-9de4-4d4d-a1a4-426f4042d94a)

![image](https://github.com/user-attachments/assets/d66e2f11-b77f-42e1-9cfd-6b451a6fe20d)

Agora sim ajustamos a categoria para a despesa com o título de "Contas".

Por fim, vamos testar a exclusão passando o ID:

![image](https://github.com/user-attachments/assets/941c86b8-841f-43e9-8c99-2492a74b2858)

Para testar a exclusão basta dar um GET, seja geral ou passando o ID que acabamos de excluir:

![image](https://github.com/user-attachments/assets/f4438f42-7157-4835-b6b3-c4b6663b4043)

![image](https://github.com/user-attachments/assets/2a3334cf-5927-4927-9aab-c64c4bb8b026)
