// Employee list with shift preferences (1st = highest priority)
const employees = {
  Ian: ["Morning", "Afternoon", "Evening"],
  Racho: ["Afternoon", "Morning", "Evening"],
  John: ["Evening", "Morning", "Afternoon"],
  Mary: ["Morning", "Evening", "Afternoon"],
  Sarah: ["Afternoon", "Morning", "Evening"],
  Tom: ["Evening", "Morning", "Afternoon"],
  Liam: ["Morning", "Afternoon", "Evening"]
};

const shifts = ["Morning", "Afternoon", "Evening"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let workedDays = {};
Object.keys(employees).forEach(e => workedDays[e] = 0);

let schedule = {};
days.forEach(day => {
  schedule[day] = {};
  shifts.forEach(shift => schedule[day][shift] = []);
});

// Assign based on employee shift preferences
days.forEach(day => {
  for (const emp in employees) {
    if (workedDays[emp] >= 5) continue;
    for (const pref of employees[emp]) {
      if (schedule[day][pref].length < 2) {
        schedule[day][pref].push(emp);
        workedDays[emp]++;
        break; // stop once assigned
      }
    }
  }
});

// Fill missing slots randomly if needed
days.forEach(day => {
  shifts.forEach(shift => {
    while (schedule[day][shift].length < 2) {
      let available = Object.keys(employees).filter(
        e => workedDays[e] < 5 && !schedule[day][shift].includes(e)
      );
      if (!available.length) break;
      let pick = available[Math.floor(Math.random() * available.length)];
      schedule[day][shift].push(pick);
      workedDays[pick]++;
    }
  });
});

// Output
console.log("\n--- Weekly Schedule ---");
days.forEach(day => {
  console.log(`\n${day}:`);
  shifts.forEach(shift => {
    console.log(`  ${shift}: ${schedule[day][shift].join(", ")}`);
  });
});
