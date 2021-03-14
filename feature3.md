## Feature
- ~~Write e2e cases~~ 
- Display one mybitcoin

## Process 
- Delete auctionController. Use sniperController instead of auctionController. 
- Sniper depends on Item. Therefore, you must update Sniper if Item is updated or changed.
- Adhere to Fat model/ Thin controller principle
- How do we test Sniper??
- Sniper must be only one. 
- You must write e2e test if you want to test the whole page. 
- You must write unit test or integration test if you want to test logic.