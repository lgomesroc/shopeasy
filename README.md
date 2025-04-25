# Shopeasy - Plataforma Modular de E-commerce
Shopeasy é uma solução modular e escalável para e-commerce, baseada em microsserviços, garantindo flexibilidade, 
desempenho e manutenção simplificada. O sistema é dividido em backend e frontend independentes, cada um operando 
dentro de contêineres Docker, facilitando o desenvolvimento e o deploy.

### Arquitetura do Projeto
Backend: Desenvolvido em PHP com Flight PHP, organizado em microsserviços (users, products, orders) que se comunicam 
via API REST e interagem com um banco de dados MySQL.

Frontend: Criado com Angular, também estruturado como microsserviços (core, shared, users, products, orders), 
garantindo modularidade e reutilização de componentes.

Docker: O sistema roda em contêineres isolados, permitindo fácil escalabilidade e deploy simplificado.

# Shopeasy Backend

Este repositório contém a implementação backend do projeto **Shopeasy**, utilizando **Flight PHP** para criar 
microsserviços independentes.

### 🛠️ Estrutura do Projeto

O backend é organizado em três microsserviços:
- **Users**: Gerenciamento de usuários.
- **Products**: Catálogo e informações de produtos.
- **Orders**: Processamento de pedidos.

### 📂 Estrutura de Diretórios
```
backend/
 ├── users/
 │   ├── index.php
 │   ├── composer.json
 │   ├── vendor/
 ├── products/
 │   ├── index.php
 │   ├── composer.json
 │   ├── vendor/
 ├── orders/
 │   ├── index.php
 │   ├── composer.json
 │   ├── vendor/
 ```
## 🚀 Configuração Inicial
### 1️⃣ Criar a pasta do backend
Executamos os seguintes comandos para organizar os microsserviços:

```
mkdir backend
cd backend
mkdir users products orders
```

### 2️⃣ Instalar Flight PHP em cada microsserviço
Dentro de cada pasta (users, products, orders), instalamos Flight PHP:

```
composer require mikecao/flight
```

### 3️⃣ Criar ponto de entrada index.php
Para cada microsserviço, adicionamos um index.php básico:

Exemplo: users/index.php
```
<?php

require 'vendor/autoload.php';

Flight::route('/', function() {
    echo json_encode(['message' => 'Users service is running']);
});

Flight::start();
```
Replicamos esse modelo em products/index.php e orders/index.php, alterando a mensagem conforme necessário.

### ✅ Próximos Passos
Definir conexões com banco de dados para cada serviço.

Criar endpoints específicos (GET, POST, PUT, DELETE) para cada microsserviço.

Integrar autenticação e controle de acesso.

## 🔗 Tecnologias Utilizadas

O backend foi desenvolvido utilizando as seguintes tecnologias:

- **PHP** - Linguagem de programação principal.
- **Flight PHP** - Framework minimalista para criação de microsserviços.
- **Composer** - Gerenciador de dependências para PHP.
- **MySQL** - Banco de dados relacional para armazenamento das informações.
- **JSON** - Formato de resposta padrão para comunicação entre microsserviços.
- **REST API** - Arquitetura utilizada para estruturar os endpoints.
- **Docker** - Contêinerização dos microsserviços para facilitar o deploy.
- **Microsserviços backend**

# Shopeasy Frontend

Este repositório contém o frontend do projeto **Shopeasy**, desenvolvido com **Angular** em uma abordagem baseada 
em microsserviços.

## 🛠️ Configuração Inicial

### 1️⃣ Criar a pasta do frontend
Executamos os seguintes comandos para organizar o projeto:

```
mkdir frontend
cd frontend
```
### 2️⃣ Inicializar o projeto Angular
Criamos o projeto Angular com as configurações básicas:
```
ng new frontend-app --directory . --routing --style=scss
```
- Routing: Habilitado para gerenciamento de rotas.
- SCSS: Definido como pré-processador CSS.

### 3️⃣ Criar módulos para microsserviços
Geramos módulos separados para cada microsserviço:
```
ng generate module core
ng generate module shared
ng generate module users
ng generate module products
ng generate module orders
ng generate component users/users
ng generate component products/products
ng generate component orders/orders
```

### 4️⃣ Configurar roteamento
Definimos as rotas no arquivo app-routing.module.ts para carregar cada módulo dinamicamente:
```
const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
```

### 5️⃣ Criar componentes principais
Para cada módulo, criamos um componente correspondente:
```
ng generate component users/users
ng generate component products/products
ng generate component orders/orders
```

### 🚀 Próximos Passos
Implementar serviços no CoreModule (exemplo: autenticação).

Criar componentes reutilizáveis dentro do SharedModule.

Desenvolver interfaces e estilos para os microsserviços.

Configurar comunicação com o backend.


### 🔗 Tecnologias Utilizadas
- Angular
- TypeScript
- SCSS
- Microsserviços frontend

### Estrutura das pastas
```
src
├── app
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app-routing.module.ts
│   ├── core
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   ├── config
│   │   │   └── config.module.ts
│   │   └── core.module.ts
│   ├── orders
│   │   ├── orders
│   │   │   ├── orders.component.html
│   │   │   ├── orders.component.scss
│   │   │   ├── orders.component.spec.ts
│   │   │   └── orders.component.ts
│   │   └── orders.module.ts
│   ├── products
│   │   ├── products
│   │   │   ├── products.component.html
│   │   │   ├── products.component.scss
│   │   │   ├── products.component.spec.ts
│   │   │   └── products.component.ts
│   │   └── products.module.ts
│   ├── shared
│   │   ├── button
│   │   │   ├── button.component.html
│   │   │   ├── button.component.scss
│   │   │   ├── button.component.spec.ts
│   │   │   └── button.component.ts
│   │   ├── capitalize.pipe.spec.ts
│   │   ├── capitalize.pipe.ts
│   │   └── shared.module.ts
│   └── users
│       ├── users
│       │   ├── users.component.html
│       │   ├── users.component.scss
│       │   ├── users.component.spec.ts
│       │   └── users.component.ts
│       └── users.module.ts
├── index.html
├── main.ts
└── styles.scss
```