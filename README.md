# Aplicação de Câmera com Geolocalização usando React-Native

## Arquitetura Adotada: MVVM (Model-View-ViewModel)

Para promover a **separação de responsabilidades**, facilitar a manutenção e garantir a escalabilidade do código, o projeto adota o padrão arquitetural **MVVM**.

Esta estrutura divide o projeto em três camadas principais, conectadas de forma clara:

# Estrutura do projeto

```
/src
  ├── model
  │   └── location.ts          
  ├── view
  │   ├── CameraScreen.tsx     
  │   ├── PhotoItem.tsx        
  │   └── PhotoListScreen.tsx  
  └── viewmodel
      └── photo.ts             
App.tsx                       
```

### Detalhamento das Camadas

A arquitetura **MVVM (Model-View-ViewModel)** garante uma separação robusta de responsabilidades:

* **Model (`/src/model`)**
    * Contém a **lógica de negócios pura** e os serviços de acesso a dados ou hardware.
    * O arquivo `location.ts` encapsula a complexidade de solicitar permissões e obter as coordenadas **GPS**, fornecendo dados limpos e prontos para o ViewModel.

* **View (`/src/view`)**
    * É a camada de **apresentação** com a qual o usuário interage.
    * As *Screens* e *Components* (como `PhotoItem` e `CameraScreen`) são **puramente visuais**, responsáveis apenas por renderizar a UI (usando **Gluestack UI**) e capturar eventos do usuário (cliques, toques).
    * **Não contêm regras de negócio ou lógica de estado**.

* **ViewModel (`/src/viewmodel`)**
    * Atua como o **intermediário** e cérebro de apresentação entre a View e o Model.
    * O arquivo `photo.ts` define a estrutura de dados (`type MyPhoto`) e exporta o **Custom Hook** (`usePhotoViewModel`) que gerencia o estado da galeria de fotos e as funções para manipulá-lo (adicionar, ordenar).
    * A View observa este ViewModel e se **atualiza automaticamente** quando o estado muda.

## Instalação de Dependências

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (versão LTS recomendada)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/)  

### 2. Clonar o repositório
```bash
git clone https://github.com/j-nilton/camera-app.git
cd camera-app
```

### 3. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 5. Executar o aplicativo
```bash
npx expo start
```
