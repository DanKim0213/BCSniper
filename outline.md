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
- ~~Handle errors globally~~
- ~~Authenticate and Authorize~~ 
- ~~Model data~~ 
- ~~Render views~~ 
- ~~Change Status automatically~~ 
- ~~Modify items and views~~ 
- ~~Register Item from '/sniper/unreg'~~
- ~~Sell Items when Sniper meets conditions~~
- ~~Log the history of sellItem and buyItem on Sniper Controller~~
- ~~View Signup, Sniper's state, and Home~~
- ~~Sniper is used as an Announcer~~ 
- ~~Add an alert that tells the user to create bitcoins~~ 
- ~~Upload images~~ 
- Translate into Korean

## TODO: complement 
- Write e2e test (first step)
- make password more complicated
- send password reset token, using email
- order how many bitcoins you want, not only one bitcoin
- change duration, max, min after creating Item
- set Interval to update All Items e.g. update Item every second
- Comply with 'Single Responsibility': Sniper-User on sniperController and Item-Sniper on itemController