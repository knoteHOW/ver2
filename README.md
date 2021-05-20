# knotehow-main

## Getting Started

### Docker
```
$ docker-compose up --build
```

### Local
```
$ npm install
$ npm run test -- --coverage
$ npm run start
```

## Directory
```
react-base
├── .env
├── README.md     
├── public
│   └── index.html
└── src
    ├── actions       // dispatch
    ├── commons       // 공통 컴퍼넌트 (button, Input) (aka molecule)
    ├── components    // 컴퍼넌트 (Footer, Header, Block) (aka organisms)
    ├── pages         // 페이지 (Home, Creator, MyPage) (aka Pages)
    ├── reducers      // reducer
    ├── router        // 페이지 라우팅
    ├── App.js
    └── index.js      // Entry point
```
