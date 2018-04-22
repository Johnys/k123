/**
  *
  * @api {get} /secretfriend Pesquisar sorteios de amigos secretos
  * @apiName search
  * @apiGroup Sorteios Amigos Secretos
  * @apiDescription Retorna os sorteios de amigo secreto cadastrastrados na base de dados
  * @apiParam  {String} [id] id do sorteio
  * @apiParam  {String} [name] Nome do sorteio
  * @apiParam  {Date} [revelation_date] Data de revelação do sorteio
  *
  * @apiSuccess (200) {String} name  Nome do sorteio
  * @apiSuccess (200) {Date} revelation_date Data de revelação do sorteio
  * @apiSuccess (200) {Date} createdAt  Data de criação do pessoa
  * @apiSuccess (200) {Date} updatedAt  Última data de atualização da pessoa
  * @apiSuccess (200) {String} id  Id público
  * @apiSuccess (200) {Integer} drawns Quantidade de participantes do sorteio
  * drawns
  *
  * @apiSuccessExample {json} Success-Response:
  *   [{
        "name": "Amigo secreto de teste",
        "revelation_date": "30/04/2018",
        "createdAt": "22/04/2018",
        "updatedAt": "22/04/2018",
        "id": "491c669b-1e27-40fb-954c-f7027df7ff8a",
        "drawns": 2
    }]
  *
  *
*/

/**
  *
  * @api {post} /secretfriend Cadastrar sorteio de amigo secreto
  * @apiName create
  * @apiGroup Sorteios Amigos Secretos
  * @apiDescription Realiza a geração de um novo sorteio
  * @apiParam  {String} name Nome do sorteio
  * @apiParam  {Date} revelation_date Data de revelação do sorteio
  * @apiParam  {Array} [people] Ids das pessoas que participarão do sorteio. Se não informado todas as pessoas cadastradas participarão.
  *
  * @apiSuccess (200) {String} name  Nome do sorteio
  * @apiSuccess (200) {Date} revelation_date Data de revelação do sorteio
  * @apiSuccess (200) {Date} createdAt  Data de criação do pessoa
  * @apiSuccess (200) {Date} updatedAt  Última data de atualização da pessoa
  * @apiSuccess (200) {String} id  Id público
  * @apiSuccess (200) {Integer} drawns Quantidade de participantes do sorteio
  * drawns
  *
  * @apiSuccessExample {json} Success-Response:
  *   [{
        "name": "Amigo secreto de teste",
        "revelation_date": "30/04/2018",
        "createdAt": "22/04/2018",
        "updatedAt": "22/04/2018",
        "id": "491c669b-1e27-40fb-954c-f7027df7ff8a",
        "drawns": 2
    }]
  *
  *
*/

/**
  *
  * @api {post} /secretfriend/:id/resend Reenvio de emails
  * @apiName resendEmail
  * @apiGroup Sorteios Amigos Secretos
  * @apiDescription Realiza o reenvio dos emails aos participantes do amigo secreto.
  * @apiParam  {String} id Id do sorteio do amigo secreto
  *
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500
  *
*/
