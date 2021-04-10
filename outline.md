## Git flow
- Features and Develop interact to each other
- Finally, Master is merged with Develop 
- **Must upload your local feature branch to Github just in case** and then delete your local branch
- https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html

## Brief Description 
- **Demo** application for Trading Bitcoin
- This app gets market info through Blockchain.com
- As it is a kind of demo app, it saves investment info to your db and through which you assume how much you earn from the investment
- I will launch this app on my github.io 
- This app could be used via Dockerfile. And you become a localhost if you use the dockerfile. 

## Structure
- Main(entry point), MainWindow(end point)
- Controllers: Auction, Sniper, Displayer
- Models: bitcoins, users
- Views: login, overall-bitcoin-prices, mybitcoin
- Communicator: States

## Status Flows
- Joining (Sniper is active once it purchased more than one item)
- Bidding (current price <= the price at which I purchased)
- Winning (current price > the price)
- Lost (Eventually, sniper reaches to the min price)
- Won (Eventually, sniper reaches to the max price)
- Joining -> Lost
- Joining -> Bidding -> Lost
- Joining -> Bidding -> Winning -> Won 

## Features
- ~~Display overall-bitcoin-prices~~
- ~~Refactor for MVC pattern~~ 
- ~~Connect to MongoDB~~
- ~~Display Sniper info~~
- ~~Create an Item~~
- ~~Register an Item~~
- ~~Unregister an Item~~
- Write e2e test (first step)
- ~~Handle errors globally~~
- ~~Authenticate and Authorize~~ 
- ~~Model data~~ 
- Render views 
- Change Status automatically 
- Sniper is used as an Announcer 
- Set interval request using Event Source 
- Display multiple mybitcoin
- Limit upper bound and lower bound
- ...
- Allow Authentication  

## Feedback
- Implement orderQty