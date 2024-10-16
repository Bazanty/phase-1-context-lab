/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

// Create an employee record from an array of data
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

// Create multiple employee records from an array of employee data
let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row);
    });
};

// Log the time in for an employee
let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
};

// Log the time out for an employee
let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
};

// Calculate hours worked on a specific date
let hoursWorkedOnDate = function(soughtDate) {
    let inEvent = this.timeInEvents.find(function(e) {
        return e.date === soughtDate;
    });
    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === soughtDate;
    });
    return (outEvent.hour - inEvent.hour) / 100; // Dividing by 100 to convert hours
};

// Calculate wages earned on a specific date
let wagesEarnedOnDate = function(dateSought) {
    let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour;
    return parseFloat(rawWage.toString());
};

// Calculate total wages for an employee
let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date;
    });

    let payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // Using bind to maintain the context of 'this'

    return payable;
};

// Find an employee record by first name
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName;
    });
};

// Calculate the total payroll for an array of employee records
let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec);
    }, 0);
};
