/**
  *
  * @api {get} /person Pesquisar pessoas
  * @apiName search
  * @apiGroup Pessoa
  * @apiDescription Retorna as pessoas cadastradas no sistema
  * @apiParam  {String} [id] id da pessoa
  * @apiParam  {String} [email] email da pessoa cadastrada
  * @apiSuccess (200) {String} [name]  Nome do pessoa
  * @apiSuccess (200) {String} email  E-mail.
  * @apiSuccess (200) {Date} createdAt  Data de criação do pessoa
  * @apiSuccess (200) {Date} updatedAt  Última data de atualização da pessoa
  * @apiSuccess (200) {String} id  Id público
  *
  * @apiSuccessExample {json} Success-Response:
  *   [{
        "name": "Johnys",
        "email": "jjohnys@gmail.com",
        "createdAt": "22/04/2018",
        "updatedAt": "22/04/2018",
        "id": "99852031-2893-4ad7-a31d-f4bb8e856351"
    }]
  *
  *
  */
/**
  *
  * @api {post} /person Cadastrar pessoa
  * @apiName create
  * @apiGroup Pessoa
  * @apiDescription Realiza a criação de um nova pessoa na base de dados
  *
  * @apiParam  {String} name Nome da pessoa
  * @apiParam  {String} email Email da pessoa
  *
  * @apiSuccess (200) {String} [name]  Nome do pessoa
  * @apiSuccess (200) {String} email  E-mail.
  * @apiSuccess (200) {Date} createdAt  Data de criação do pessoa
  * @apiSuccess (200) {Date} updatedAt  Última data de atualização da pessoa
  * @apiSuccess (200) {String} id  Id público
  * @apiSuccessExample {json} Success-Response:
  *   [{
        "name": "Johnys",
        "email": "jjohnys@gmail.com",
        "createdAt": "22/04/2018",
        "updatedAt": "22/04/2018",
        "id": "99852031-2893-4ad7-a31d-f4bb8e856351"
    }]
  * @apiErrorExample {json} Erro: Email já em uso
     {
      "error": true,
      "message": "Person validation failed: email: Email já em uso",
      "errors": {
          "email": {
              "message": "Email já em uso",
              "type": "user defined"
          }
      }
    }
  */

/**
  *
  * @api {put} /person/:id Atualizar pessoa
  * @apiName update
  * @apiGroup Pessoa
  * @apiDescription Realiza a alteração de uma pessoa cadastrada na base de dados
  * @apiParam  {String} id Id da pessoa
  * @apiParam  {String} [name] Nome da pessoa
  * @apiParam  {String} [email] Email da pessoa
  *
  * @apiSuccess (200) {String} [name]  Nome do pessoa
  * @apiSuccess (200) {String} email  E-mail.
  * @apiSuccess (200) {Date} createdAt  Data de criação do pessoa
  * @apiSuccess (200) {Date} updatedAt  Última data de atualização da pessoa
  * @apiSuccess (200) {String} id  Id público
  * @apiSuccessExample {json} Success-Response:
  *   [{
        "name": "Johnys",
        "email": "jjohnys@gmail.com",
        "createdAt": "22/04/2018",
        "updatedAt": "22/04/2018",
        "id": "99852031-2893-4ad7-a31d-f4bb8e856351"
    }]
  * @apiErrorExample {json} Erro: Email já em uso
     {
      "error": true,
      "message": "Person validation failed: email: Email já em uso",
      "errors": {
          "email": {
              "message": "Email já em uso",
              "type": "user defined"
          }
      }
    }
*/

/**
  *
  * @api {delete} /person/:id Remover pessoa
  * @apiName delete
  * @apiGroup Pessoa
  * @apiDescription Realiza a remoção de uma pessoa da base de dados
  * @apiParam  {String} id Id da pessoa
  * @apiSuccessExample {json} Success-Response:
  *     HTTP/1.1 200 OK
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 500
*/
