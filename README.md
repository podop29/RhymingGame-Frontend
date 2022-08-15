# Rhyme Time
Rhyme Time is a web app for practicing rhyming, and playing rhyming games against your friends.
### Deployed at
[rhymetime.online](http://www.rhymetime.online)

## Features
RhymeTime has many features, A user can sign up and make an account. Without an account all you can do is play practice games. After you make an account a user
gets accsess to quick games and multiplayer games. A user can add other players and look at their profiles and stats, and challange them to a One vs One rhyhming game.
A user can manage all his current games, recent games, and friend requests from their profile.
Quick games and practice games have three difficulty options ranging from easy to hard. Each option increases the compexity of the words you will have to rhyme.

## User Flow
The standered userflow for a new user first checking out the site would start at the homepage. at the homepage a user can read more about the project and 
get linked to my linkedIn, github, and email. After that they can head to the registration page, they can sign up using their email. From their they have a few options,
they can either add a friend and challange them to a game, or they could play some practice games to get the hang of it. When they feel ready they can start playing
quick games which will challange you more and your stats will be saved to your profile, Like your highscore, gamesplayed, and level.

Two apis were used for this project. First one was the [datamuse](https://www.datamuse.com/api/) Which is a external api i used to get all rhyming data
for the game.
The second api was an express api I made for the game to run on. It handles all user and authentication methods, as well as all game methods.
[rhymetime_backend](/../../../../podop29/RhymingGame-Backend)

### Stack
The frontend was built using React, React-router, Tailwind, and javascript. The Backend was built using Node.js With express.js and PostgreSql database

When it comes to testing i used jest to write tests for all backend methods and tested my api like that.
