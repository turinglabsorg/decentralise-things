const quotes = [
  '"Mornings are for coffee and contemplation." - Chief Hopper',
  '"She\'s our friend and she\'s crazy." - Dustin',
  '"You shouldn\'t like things because people tell you you\'re supposed to." - Jonathan Byers',
  '"Friends don\'t lie." - Eleven',
  '"If anyone asks where I am, I\'ve left the country." - Mike',
  '"Sometimes, your total obliviousness just blows my mind." - Dustin',
  '"I\'m stealthy, like a ninja." - Steve Harrington',
  '"Why are you keeping this curiosity door locked?" - Dustin',
  '"This is not yours to fix alone. You act like you\'re all alone out there in the world, but you\'re not. You\'re not alone." - Joyce',
  '"I am on a curiosity voyage, and I need my paddles to travel. These books…these books are my paddles." - Dustin',
  '"Bitchin\'." - Eleven',
  '"Do you wanna be normal? Do you wanna be just like everyone else? Being a freak is the best. I\'m a freak!" - Jonathan',
  '"Son of a bitch. You know, you\'re really no help at all, you know that?" - Dustin',
  '"You\'re gonna slay \'em dead." - Steve',
  '"I asked if you wanted to be my friend. And you said yes. You said yes. It was the best thing I\'ve ever done." - Mike',
  '"She will not be able to resist these pearls." *Purrs* - Dustin',
  '"If we\'re both going crazy, then we\'ll go crazy together, right?" - Mike',
  '"It\'s called code shut-your-mouth." - Erica Sinclair',
  '"Nobody normal ever accomplished anything meaningful in this world." - Jonathan',
  '"You tell anyone I just told you that and your ass is grass." - Steve',
  '"You can\'t spell America without Erica." - Erica',
  '"There\'s more to life than stupid boys, you know." - Max Mayfield',
]

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

export default quotes
