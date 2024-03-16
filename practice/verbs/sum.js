let correct = 0;
let correctWord;
let inOrderMode = true;
const presentInd = ['sum', 'es', 'est', 'sumus', 'estis', 'sunt'];
const imperfectInd = ['eram', 'eras', 'erat', 'eramus', 'eratis', 'erant'];
const futureInd = ['ero', 'eris', 'erit', 'erimus', 'eritis', 'erunt'];
const perfectInd = ['fui', 'fuisti', 'fuit', 'fuimus', 'fuistis', 'fuerunt'];
const pluperfectInd = ['fueram', 'fueras', 'fuerat', 'fueramus', 'fueratis', 'fuerant'];
const futurePerfectInd = ['fuero', 'fueris', 'fuerit', 'fuerimus', 'fueritis', 'fuerint'];

const presentSub = ['sim', 'sis', 'sit', 'simus', 'sitis', 'sint'];
const imperfectSub = ['essem', 'esses', 'esset', 'essemus', 'essetis', 'essent'];
const perfectSub = ['fuerim', 'fueris', 'fuerit', 'fuerimus', 'fueritis', 'fuerint'];
const pluperfectSub = ['fuissem', 'fuisses', 'fuisset', 'fuissetmus', 'fuissetis', 'fuissent'];

const indicative = [presentInd, imperfectInd, futureInd, perfectInd, pluperfectInd, futurePerfectInd];
const subjunctive = [presentSub, imperfectSub, perfectSub, pluperfectSub];
const sum = [indicative, subjunctive];

function retrieveMood(mood) {
    return sum[mood];
};
function retrieveTense(mood, tense) {
    return mood[tense];
};
function retrievePerson(tense, person) {
    return tense[person];
};
function randomInt(n) {
    return Math.round(Math.random()*n)
};
function chooseConj() {
    let moodIndex, tenseIndex, person;
    moodIndex = randomInt(1); // Mood index 0 for indicative, 1 for subjunctive
    const mood = retrieveMood(moodIndex);
    
    // Determine the maximum index based on the mood
    const maxTenseIndex = moodIndex ? 3 : 5;
    
    // Select tense index based on mood
    tenseIndex = randomInt(maxTenseIndex); 

    // Calculate the person index based on the mode and current tense
    if (inOrderMode) {
        // Calculate the person index based on the count and current tense index
        person = (chooseConj.count || 0) % 6;
        
        // If all persons are covered, reset the count and move to the next tense
        if (chooseConj.count !== undefined && chooseConj.count % 6 === 0) {
            chooseConj.tenseCount = (chooseConj.tenseCount || 0) + 1;
            chooseConj.count = 0;
        }
        
        // If all tenses are covered, reset the tense count and move to the next mood
        if (chooseConj.tenseCount !== undefined && chooseConj.tenseCount >= maxTenseIndex) {
            chooseConj.tenseCount = 0;
            chooseConj.moodCount = (chooseConj.moodCount || 0) + 1;
        }
    } else {
        person = randomInt(5); // Randomly select person index
    }
    
    if (inOrderMode) {
        chooseConj.count = (chooseConj.count || 0) + 1;
    }
    
    // If all moods are covered, reset the mood count
    if (chooseConj.moodCount !== undefined && chooseConj.moodCount >= 2) {
        chooseConj.moodCount = 0;
    }
    console.log(correctWord)
    correctWord = retrievePerson(retrieveTense(mood, tenseIndex), person);
    return [moodIndex, tenseIndex, person];
}

function toggleMode() {
    inOrderMode = !inOrderMode;
    chooseConj.count = 0; // Reset count when switching modes
}
function compareEntry() {
    const entry = document.getElementById('wordInput').value;
    return entry === correctWord;
}
function editFormText() {
    if (compareEntry()) {
        correct++; 
        document.getElementById('correct').innerHTML = correct;
    }
    const chosenConj = chooseConj();
    const tense = chosenConj[0] ? ['Present', 'Imperfect', 'Perfect', 'Pluperfect'] : ['Present', 'Imperfect', 'Future', 'Perfect', 'Pluperfect', 'Future Perfect'];
    const person = ['First', 'Second', 'Third'];
    const number = ['Singular', 'Plural'];
    const mood = ['Indicative', 'Subjunctive'];
    document.getElementById('person').innerHTML = person[chosenConj[2] % 3];
    document.getElementById('number').innerHTML = number[((chosenConj[2] > 2) ? 1 : 0)]
    document.getElementById('tense').innerHTML = tense[chosenConj[1]];
    document.getElementById('mood').innerHTML = mood[chosenConj[0]];
}
document.addEventListener('DOMContentLoaded', function() {
    editFormText();
});
document.body.addEventListener('keydown', function(event) {
    if (event.key == '`') {
        alert(correctWord)
    }
    else if (event.key == '~') {
        toggleMode();
    }
});

// Add an event listener to the form submit event
document.getElementById('wordForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior (reloading the page)
    event.preventDefault();
    editFormText();
    document.getElementById('wordInput').value = '';    // Here you can perform any other actions you want, such as validation, sending data to a server, etc.
});