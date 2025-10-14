const employees = ["Ian", "Racho", "John", "Mary", "Sarah", "Tom", "Liam"];
const shifts = ["Morning", "Afternoon", "Evening"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let workedDays = {};
employees.forEach(e => workedDays[e] = 0);

let schedule = {};
days.forEach(day => {
  schedule[day] = {};
  shifts.forEach(shift => {
    // filter employees who worked < 5 days
    let available = employees.filter(e => workedDays[e] < 5);
    // shuffle array
    available.sort(() => Math.random() - 0.5);
    // pick 2 employees
    let assigned = available.slice(0, 2);
    assigned.forEach(e => workedDays[e]++);
    schedule[day][shift] = assigned;
  });
});

// Output schedule
console.log("\n--- Weekly Schedule ---");
for (const day of days) {
  console.log(`\n${day}:`);
  for (const shift of shifts) {
    console.log(`  ${shift}: ${schedule[day][shift].join(", ")}`);
  }
}
