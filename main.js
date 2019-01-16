let date = new Date();
let locale = 'en-US';

let incs = [10, 30, 60];
let holidays = {
    // 1/1   New Year's Day (Tuesday)
    '1/1/2019' : '1/2/2019',        // Tue -> Wed

    // 5/27  Memorial Day (Monday)
    '5/26/2019' : '5/28/2019',      // Sun -> Tue
    '5/27/2019' : '5/28/2019',      // Mon -> Tue

    // 7/4   Independence Day (Thursday)
    '7/4/2019' : '7/3/2019',        // Thu -> Wed

    // 7/5   Day After Independence Day (Friday)
    '7/5/2019' : '7/3/2019',        // Fri -> Wed
    '7/6/2019' : '7/3/2019',        // Sat -> Wed

    // 9/2   Labor Day (Monday)
    '9/1/2019' : '9/3/2019',        // Sun -> Tue
    '9/2/2019' : '9/3/2019',        // Mon -> Tue

    // 11/28 Thanksgiving Day (Thursday)
    '11/28/2019' : '11/27/2019',    // Thu -> Wed

    // 11/29 Day after Thanksgiving Day (Friday)
    '11/29/2019' : '11/27/2019',    // Fri -> Wed
    '11/30/2019' : '11/27/2019',    // Sat -> Wed

    // 12/25 Christmas Day (Wednesday)
    '12/25/2019' : '12/24/2019'     // Wed -> Tue
};

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

    // Step 1: Add the days
    newDate.setDate(newDate.getDate() + x);

    // Step 2: If we landed on a date that's in the holiday
    //         list, just go where it tells us to go.
    let newDateString = newDate.toLocaleDateString(locale);
    if (newDateString in holidays) {
        let replacement = holidays[newDateString];
        newDate = new Date(Date.parse(replacement));
        newDateString = newDate.toLocaleDateString(locale);
    }

    // Step 3: If we didn't land on one of those but landed
    //         on a weekend, go to the nearest weekday.
    if (!(newDateString in holidays)) {
        // Move Sunday to Monday
        if (newDate.getDay() == 0) {
            newDate.setDate(newDate.getDate() + 1);
        }

        // Move Saturday to Friday
        if (newDate.getDay() == 6) {
            newDate.setDate(newDate.getDate() - 1);
        }
    }

    return newDate;
}

let getResults = () => {
    let daysResults = [],
        mooResults = [];

    incs.forEach(x => {
        let newDate = incX(x);
        daysResults.push(`+${x} days: ${newDate.toLocaleDateString(locale, { weekday: 'long' })}, ${newDate.toLocaleDateString(locale)}<br>`);
        
        let mooDate = mooIncX(x);
        mooResults.push(`+${x} days: ${mooDate.toLocaleDateString(locale, { weekday: 'long' })}, ${mooDate.toLocaleDateString(locale)}<br>`);
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
