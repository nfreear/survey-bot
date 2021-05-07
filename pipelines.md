# default

## main
nlp.train
console.say "Hi, I'm a Survey Bot"
console.say "To start the survey, say 'Go'"

## console.hear
// compiler=javascript
if (message === 'quit') {
  console.say('Goodbye!');
  return console.exit();
}
nlp.process();
this.say();

## onIntent(joke.chucknorris)
// compiler=javascript
const something = request.get('http://api.icndb.com/jokes/random');
if (something && something.value && something.value.joke) {
  input.answer = something.value.joke;
}

## onIntent(survey.start)
surveyBot
->output.text

## onIntent(survey.end.early)
surveyBot
->output.text

## onIntent(survey.repeat.question)
surveyBot
->output.text

## onIntent(survey.answer)
surveyBot
->output.text

## onIntent(None)
surveyBot
->output.text
