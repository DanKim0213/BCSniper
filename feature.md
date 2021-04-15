## Feature
- Create Item from '/sniper/unreg'
- Sell Items when Sniper meets conditions

## Process
- ~~Render unregistered items~~
- ~~Modify items and views~~ 
- ~~sell Item now~~
- Refactor codes
  - AJAX blockchain.com to server-side 
  - Client-side only renders views and manipulates DOM
  - Send Item individually because I/O-intensive is better than cpu-intensive
- sell Item when due to the date
- sell Item when out of either max or min 

## Feedback
- what if the button 'SELL NOW!' ocurred error once deleting its item?
- order how many bitcoins you want, not only one bitcoin
- change duration, max, min after creating Item

## Thoughts: how to filter unreg Items
- Render all items and do some javascript work
- Make all items in advance on DB and query them whether they are 'joining' or not. e.g. $ne
  - Status must be one of the fields, not virtual
- **From client-side,** ask if there is the item, get axios blockchain.com if not. (O)