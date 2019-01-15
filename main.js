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
    let newDate = new Date(date);

    Array(x).fill().map((_, i) => {
        let valid = false;
        while (!valid) {
            valid = true;

            newDate.setDate(newDate.getDate() + 1);

            if (newDate.getDay() == 0 || newDate.getDay() == 6) {
                valid = false; // weekend
                //console.log(`${newDate} is a weekend, going again`);
            }
            if (holidays.indexOf(newDate.toLocaleDateString(locale)) != -1) {
                valid = false; // matches holiday
                //console.log(`${newDate} is a holiday, going again`);
            }
        }
    });

    console.log(`${date} + ${x} = ${newDate}`);
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
