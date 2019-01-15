let date = new Date();
let locale = 'en-US';
let year = date.getFullYear(),
    month = date.getMonth(),
    day = date.getDay();

let incs = [10, 30, 60];
let holidays = [
    '1/1/2019',
    '5/27/2019',
    '7/4/2019',
    '7/5/2019',
    '9/2/2019',
    '11/28/2019',
    '11/29/2019',
    '12/25/2019'
];

let weekday = () => date.toLocaleDateString(locale, { weekday: 'long' });
let dec = () => date.setDate(date.getDate() - 1);
let inc = () => date.setDate(date.getDate() + 1);

let incX = x => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + x);
    return newDate;
}

let mooIncX = x => {
    let newDate = new Date(date), valid = false;
    newDate.setDate(newDate.getDate() + x);
    
    while (!valid) {
        valid = true;

        let weekend = newDate.getDay() == 0 || newDate.getDay() == 6;
        let holiday = holidays.indexOf(newDate.toLocaleDateString(locale)) != -1;

        /*
TODO: Redo this whole thing. I did it wrong.

WEEKENDS
===============================================
Fall on Saturday => Fri
Fall on Sunday => Mon
Fall on Fri/Sat of Fri-Mon weekend => Thu
Fall on Sun/Mon of Fri-Mon weekend => Tue
Fall on Sat/Sun of Sat-Tue weekend => Fri
Fall on Mon/Tue of Sat-Tue weekend => Wed
Fall on Fri/Sat of Fri-Sun weekend => Thu
Fall on Sun of Fri-Sun weekend = Mon
Fall on Sat of Sat-Mon weekend => Fri
Fall on Sun/Mon of Sat-Mon weekend => Tue

HOLIDAYS
===============================================
Fall on Monday => ?
Fall on Tuesday => ?
Fall on Wednesday => ?
Fall on Thursday => ?
Fall on Friday => ?

WEEKENDS + HOLIDAYS
===============================================
Fall on Saturday with holiday Friday => ?
Fall on Saturday with holiday Monday => ?
Fall on Sunday with holiday Friday => ?
Fall on Sunday with holiday Monday => ?
Fall on Fri/Sat of Fri-Mon weekend with holiday Friday => ?
Fall on Fri/Sat of Fri-Mon weekend with holiday Monday => ?
Fall on Sun/Mon of Fri-Mon weekend with holiday Friday => ?
Fall on Sun/Mon of Fri-Mon weekend with holiday Monday => ?
Fall on Sat/Sun of Sat-Tue weekend with holiday Friday => ?
Fall on Sat/Sun of Sat-Tue weekend with holiday Monday => ?
Fall on Mon/Tue of Sat-Tue weekend with holiday Friday => ?
Fall on Mon/Tue of Sat-Tue weekend with holiday Monday  => ?
Fall on Fri/Sat of Fri-Sun weekend with holiday Friday => ?
Fall on Fri/Sat of Fri-Sun weekend with holiday Monday => ?
Fall on Sun of Fri-Sun weekend with holiday Friday = ?
Fall on Sun of Fri-Sun weekend with holiday Monday = ?
Fall on Sat of Sat-Mon weekend with holiday Friday => ?
Fall on Sat of Sat-Mon weekend with holiday Monday => ?
Fall on Sun/Mon of Sat-Mon weekend with holiday Friday => ?
Fall on Sun/Mon of Sat-Mon weekend with holiday Monday => ?
        */
        
        if (weekend) valid = false;
        if (holiday) valid = false;

        if (!valid) newDate.setDate(newDate.getDate() + 1);
    };

    return newDate;
}

let getResults = () => {
    let daysResults = [],
        mooResults = [];

    incs.forEach(x => {
        let newDate = incX(x);
        daysResults.push(`+${x} days: ${newDate.toLocaleDateString(locale, { weekday: 'long' })}, ${newDate.toLocaleDateString(locale)}<br>`);
        
        let moowDate = mooIncX(x);
        mooResults.push(`+${x} days: ${moowDate.toLocaleDateString(locale, { weekday: 'long' })}, ${moowDate.toLocaleDateString(locale)}<br>`);
    });

    document.getElementById('daysData').innerHTML = daysResults.join('');
    document.getElementById('mooData').innerHTML = mooResults.join('');
};

let updateText = () => {
    document.getElementById('selectedDate').textContent = `${date.toLocaleDateString(locale)} (${weekday()})`;
    getResults();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('prevDate').onclick = (e) => { e.preventDefault(); dec(); updateText(); };
    document.getElementById('nextDate').onclick = (e) => { e.preventDefault(); inc(); updateText(); };

    updateText();
});
