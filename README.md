# Projeto Amigo Secreto

## Getting Started

```powershell
  git clone https://github.com/Johnys/k123.git
```

Para subir a api do projeto, dentro da pasta backend executar:

```powershell
  npm install
  npm start
```

Para subir o front-end do projeto, dentro da pasta frontend executar:

```powershell
  npm install
  npm start
```

Para subir o projeto em modo desenvolvimento, dentro das pastas backend e frontend executar:
```powershell
  npm server
```

#Testes
Para executar os testes unitários, dentro das pastas backend e frontend executar:
```powershell
  set NODE_ENV=test
  npm test
```
Para executar o relatório dos testes de cobertura, dentro das pastas backend e frontend executar:
```powershell
  set NODE_ENV=test
  npm run coverage
```

#Qualidade de código
Para verificar se o projeto esta seguindo a padronização de código, dentro das pastas backend e frontend executar:
```powershell
  npm run lint
```