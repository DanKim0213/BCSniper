## Feature
- ~~Write e2e cases~~ 
- Display one mybitcoin
- It might be better for Auction Page Controller and Item Page Controller to be included in pug templates. 

## Process 
- Sniper depends on Item. Therefore, you must update Sniper if Item is updated or changed.
- Adhere to Fat model/ Thin controller principle
- Sniper must be only one. 
- You must write e2e test if you want to test the whole page. 
- You must write unit test or integration test if you want to test logic.
- Sniper add Item 
  - create Item
  - get Item
  - Sniper push the item
- Add an Item to Sniper's item list