import random

# Employee data
employees = ["Ian", "Racho", "John", "Mary", "Sarah", "Tom", "Liam"]
shifts = ["Morning", "Afternoon", "Evening"]
days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

# Track how many days each employee worked
worked_days = {name: 0 for name in employees}

# Store final schedule
schedule = {day: {s: [] for s in shifts} for day in days}

# Fill schedule
for day in days:
    for shift in shifts:
        available = [e for e in employees if worked_days[e] < 5]
        random.shuffle(available)

        # pick 2 employees per shift
        assigned = available[:2]
        for e in assigned:
            worked_days[e] += 1
        schedule[day][shift] = assigned

# Output final schedule
print("\n--- Weekly Schedule ---")
for day, data in schedule.items():
    print(f"\n{day}:")
    for shift, emps in data.items():
        print(f"  {shift}: {', '.join(emps)}")
