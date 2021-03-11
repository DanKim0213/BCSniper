## Git flow
- Features and Develop interact to each other
- Finally, Master is merged with Develop 
- **Must upload your local feature branch to Github just in case** and then delete your local branch
- https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html

## Brief Description 
- **Demo** application for Trading Bitcoin
- This app gets market info through Blockchain.com
- As it is a kind of demo app, it saves investment info to your db and through which you assume how much you earn from the investment

## To Do 
- 환경 설정 및 닥커파일 만들기 
- e2e 테스트 케이스 만들기
- Docker file is necessary??
- Create a DB on Atlas 
- Connect to DB
- DB for my current investment and through which I can view my historical investment info

## Structure
- Main(entry point), MainWindow(end point)
- Controllers: Auction, Sniper, Displayer
- Models: bitcoins, users
- Views: login, overall-bitcoin-prices, mybitcoin
- Communicator: States

## Features
- ~~Display overall-bitcoin-prices~~
- Display one mybitcoin
- Display multiple mybitcoin
- Limit upper bound and lower bound
- ...
- Allow Authentication  