const quotes = [
  "\u201cMornings are for coffee and contemplation.\u201d - Chief Hopper",
  "\u201cShe\u2019s our friend and she\u2019s crazy.\u201d - Dustin",
  "\u201cYou shouldn\u2019t like things because people tell you you\u2019re supposed to.\u201d - Jonathan Byers",
  "\u201cFriends don\u2019t lie.\u201d - Eleven",
  "\u201cIf anyone asks where I am, I\u2019ve left the country.\u201d - Mike",
  "\u201cSometimes, your total obliviousness just blows my mind.\u201d - Dustin",
  "\u201cI\u2019m stealthy, like a ninja.\u201d - Steve Harrington",
  "\u201cWhy are you keeping this curiosity door locked?\u201d - Dustin",
  "\u201cThis is not yours to fix alone. You act like you\u2019re all alone out there in the world, but you\u2019re not. You\u2019re not alone.\u201d - Joyce",
  "\u201cI am on a curiosity voyage, and I need my paddles to travel. These books\u2026these books are my paddles.\u201d - Dustin",
  "\u201cBitchin\u2019.\u201d - Eleven",
  "\u201cDo you wanna be normal? Do you wanna be just like everyone else? Being a freak is the best. I\u2019m a freak!\u201d - Jonathan",
  "\u201cSon of a bitch. You know, you\u2019re really no help at all, you know that?\u201d - Dustin",
  "\u201cYou\u2019re gonna slay \u2019em dead.\u201d - Steve",
  "\u201cI asked if you wanted to be my friend. And you said yes. You said yes. It was the best thing I\u2019ve ever done.\u201d - Mike",
  "\u201cShe will not be able to resist these pearls.\u201d *Purrs* - Dustin",
  "\u201cIf we\u2019re both going crazy, then we\u2019ll go crazy together, right?\u201d - Mike",
  "\u201cIt\u2019s called code shut-your-mouth.\u201d - Erica Sinclair",
  "\u201cNobody normal ever accomplished anything meaningful in this world.\u201d - Jonathan",
  "\u201cYou tell anyone I just told you that and your ass is grass.\u201d - Steve",
  "\u201cYou can\u2019t spell America without Erica.\u201d - Erica",
  "\u201cThere\u2019s more to life than stupid boys, you know.\u201d - Max Mayfield"
];

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default quotes;
