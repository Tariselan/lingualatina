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
    console.log("Inside retrievePerson function");
    console.log("Tense:", tense);
    console.log("Person index:", person);
    
    // Ensure tense is defined and person index is within the valid range
    if (tense && person >= 0 && person < tense.length) {
        console.log("Person index within range, returning:", tense[person]);
        return tense[person];
    } else {
        console.log("Error: Undefined tense or invalid person index");
        return ''; // Return an empty string or handle the error appropriately
    }
}
function randomInt(n) {
    return Math.round(Math.random()*n)
};
function chooseConj() {
    let moodIndex, tenseIndex, person;

    moodIndex = randomInt(1); // Mood index 0 for indicative, 1 for subjunctive
    const mood = retrieveMood(moodIndex);

    // Determine the maximum index based on the mood
    const maxTenseIndex = moodIndex ? 3 : 5;
    
    // If in inOrderMode, calculate person, tense, and mood based on the count
    if (inOrderMode) {
        const tenseCount = Math.floor(chooseConj.count / (6 * 3)); // Calculate tense count
        const personIndex = (chooseConj.count / 6) % 3; // Calculate person index
        person = personIndex;
        tenseIndex = tenseCount % maxTenseIndex; // Calculate tense index
    } else {
        // If not in inOrderMode, randomly select person and tense
        person = randomInt(3); // Randomly select person index
        tenseIndex = randomInt(maxTenseIndex); // Select tense index based on mood
    }

    // If all moods are covered, reset the mood count
    if (chooseConj.count !== undefined && chooseConj.count >= (6 * 3 * 2)) {
        chooseConj.count = 0;
    } else {
        chooseConj.count = (chooseConj.count || 0) + 1;
    }

    // Calculate the correct word based on the selected person, tense, and mood
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

    console.log(correctWord)
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
    chooseConj.count = 0;
    document.getElementById('wordInput').value = '';    // Here you can perform any other actions you want, such as validation, sending data to a server, etc.
});