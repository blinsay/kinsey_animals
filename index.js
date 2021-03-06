// jshint esnext: true
var Twit = require('twit');

const pick = (xs) =>
    xs[Math.floor(Math.random()*xs.length)];

const shortEnough = (tweetText) =>
  (tweetText.length) <= 135;

const envClient = () =>
  new Twit({
    consumer_key:        process.env.KA_CONSUMER_KEY,
    consumer_secret:     process.env.KA_CONSUMER_SECRET,
    access_token:        process.env.KA_ACCESS_TOKEN,
    access_token_secret: process.env.KA_ACCESS_TOKEN_SECRET,
  });

const kinsey = [
  {score: "0", description: "Exclusively heterosexual"},
  {score: "1", description: "Predominantly heterosexual, only incidentally homosexual"},
  {score: "2", description: "Predominantly heterosexual, but more than incidentally homosexual"},
  {score: "3", description: "Equally heterosexual and homosexual"},
  {score: "4", description: "Predominantly homosexual, but more than incidentally heterosexual"},
  {score: "5", description: "Predominantly homosexual, only incidentally heterosexual"},
  {score: "6", description: "Exclusively homosexual"},
  {score: "X", description: "No socio-sexual contacts or reactions"}
];

const animals = require('./animals');

const kinseyAnimal = () => {
  const score = pick(kinsey);
  const animal = pick(animals);
  return `${animal}\n\n${score.score}: ${score.description}`;
};

exports.handler = (_, __, ___) => {
  const twitter = envClient();

  let status = kinseyAnimal();
  while (!shortEnough(status)) {
    status = kinseyAnimal();
  }

  twitter.post('statuses/update', {status: status})
    .catch((err) => console.log(error.stack))
    .then((result) => console.log(result));
};


