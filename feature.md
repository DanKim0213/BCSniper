## Feature
- Model data 
- Make status changes effect

## Process
- ~~Set View routes~~
- ~~User -> Sniper (Child Referencing) and Sniper -> Item (Parent Referencing)~~
- Make API concrete 
  - ~~CRUD~~
  - ~~getItemsWithin~~
  - Aggregate Item price e.g. show how many an item's price is increased via percentage
  - Top5 sorted by price and increase percentage in a descending order
  - getItemStats

## Process2
- ~~getItemsWithin~~
  - ~~change duration into Date~~
- ~~Set sniperId via AuthController~~
- ~~Restrict to User~~
- time.getTime() 
- Sniper is used as an Announcer 
- How to access User's Sniper? req.user.sniper