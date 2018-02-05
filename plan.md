#ForSale Design
Designed by Shasha Zhu & Congcong Bao

##Entity Model

### House Card

| Property | Description | Example |
| :--- |:--- | :--- |
| building type | the form of architecture | apartment |
| city | the name of city | New York, Beijing |
| country | the name of country | United States, China |
| year | the year it was built | 1990 |
| market value | default price upon generation | $3000 |
| current price | the price of last sold to the highest bid | $3000 |
| rental probability | the chances of getting a renter offer | 0.8 |
| rental ratio | the ratio of home price to annual rental rate | 0.01 |

### Game Table

| Property | Description | Example |
| :--- |:--- | :--- |
| number of players | from 3 to 6 | 5 |
| owner | the player in charge of game set up | player2301 |
| min assets | the possession of assets the player required to join the table | $9999 |


##Building Type

+ house
+ apartment
+ townhouse
+ resort
+ skyscraper


##Gameplay

### Preparation
1. Player joins the table
2. Player elects fund for bidding
3. At his will, player can submit up to three of his properties for auction
3. Player clicks ready
4. Table owner starts the bidding phase

### Bidding Phase
This phase is where players bid on and buy properties.

1. Start each round by turning up a number of property cards equal to the number of players.
	+ The cards won't show prices to the player until he pays the certain card an appraisal fee.
	+ Player sold cards would look concealed to other players until they appraise. This is to give seller player chances of getting bids higher than that can be guessed from photo. Otherwise the seller player may still earn from appraisals should other players inquiry its actual price before they bid
2. The player who has the most fund in the first round, or who bid the most in the previous round gets the honor of starting bidding. He has the option of bidding any amount
3. Bidding then continues unless the next player wants to pass. If they pass, they buy the property with the lowest value still on the table. If a player makes a bid but later elects to pass in the same round, they are entitled to reclaim half of their money back(rounded down)
	+ The player can spend an appraisal fee to inquiry the market price of any card before placing his bid. The appraisal payment is made to the seller (bank or a seller player). If the player further decides to bid on the same property the appraisal fee will then be included in your bid.
	+ Minimum bid increments are required to making higher bid
	+ If the player elects to pass, he is forced to buy the lowest value property on the table in the appraised amount, and out of this round
4. The player that ultimately ends up bidding the most give all of the money they bid for the round to the bank
5. At any point of game, if a player force quit he will forfeit all his auctioned cards that are not sold, and no money back as a penalty. The remaining fund still belongs to him.

### Selling Phase
The player will sell each and every one of his property cards for the most money in this phase.

1. In each round, a number of currency cards equal to the amount of players are given on the table
2. Every player picks out one card to use to bid for the currency cards currently up on auction. They place them face down on the table until all players turn the card they bid over and compare properties.
3. The player with the highest valued property card gets to take the highest currency card, the second place player gets the second most valuable currency card, etc.

### Game End
Players add up the value of all of their currency cards and any remaining fund they have and the richest player wins the game. If two or more players are tied at the end of the game, the player with the most remaining fund wins the game. If two or more players are still tied, they become tied winners.

### Winner's Reward
In addition to substantial income earned by selling less worthy properties for more currencies, the game's winner (or tied winners) is entitled to draw a single property card from all properties (that includes the cards quitters bid successfully) As any card can only be picked once, in the tied-winning scenario each winner acts quick to draw the best card before it's taken by other winners.

## Property Management
As the player acquired his first property card or hopefully more cards through winning games, he gains other ways to earn cash: rent or sell his properties

### Rent
The player can put any of his properties for rent at arbitrary price and priod. Renting is suitable to earn steady cash income at short time intervals. However, the probability of rent varies between properties, plus a one time charge to the player for tenants search, which may extends to an exhaustive priod of time. The player some times makes compromise and re-adjust rental price and period to maximize chances of rent out.

Player cannot sell or submit this property for auction during its term of lease.

### Sell
The player can sell any of his properties immediately and directly at its market price.

Another option is to sell through an agent. Using an agent would cost a fee but allow chances of getting higher price offers (and lowers too). If the player declines the offer he will need to pay the agent fee again to find the next buyer.

### Maintenance Cost
At the end of each calendar year for every one of properties, the player is charged maintenance fee, which is a fixed amount depending on the property.

If the player can no longer afford the maintenance cost, the property is automatically sold at market price to compensate for such cost. The remainder goes back to the player.

