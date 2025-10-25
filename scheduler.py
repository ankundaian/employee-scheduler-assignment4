import random

# Employee data with ranked shift preferences
employees = {
    "Ian": {"preferences": ["morning", "afternoon", "evening"], "days_worked": 0},
    "Racho": {"preferences": ["afternoon", "morning", "evening"], "days_worked": 0},
    "John": {"preferences": ["evening", "morning", "afternoon"], "days_worked": 0},
    "Mary": {"preferences": ["morning", "evening", "afternoon"], "days_worked": 0},
    "Sarah": {"preferences": ["afternoon", "morning", "evening"], "days_worked": 0},
    "Tom": {"preferences": ["evening", "morning", "afternoon"], "days_worked": 0},
    "Liam": {"preferences": ["morning", "afternoon", "evening"], "days_worked": 0},
}

days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
shifts = ["morning", "afternoon", "evening"]

# initialize schedule
schedule = {day: {s: [] for s in shifts} for day in days}

def can_work(emp):
    return employees[emp]["days_worked"] < 5

# Phase 1: Assign employees by preference priority
for day in days:
    for emp, info in employees.items():
        if not can_work(emp):
            continue
        for pref in info["preferences"]:
            if len(schedule[day][pref]) < 2:
                schedule[day][pref].append(emp)
                employees[emp]["days_worked"] += 1
                break  # once assigned, move to next employee

# Phase 2: Fill under-staffed shifts randomly
for day in days:
    for shift in shifts:
        while len(schedule[day][shift]) < 2:
            available = [e for e in employees if can_work(e) and e not in schedule[day][shift]]
            if not available:
                break
            pick = random.choice(available)
            schedule[day][shift].append(pick)
            employees[pick]["days_worked"] += 1

# Output
print("=== Final Schedule ===")
for day, shift_data in schedule.items():
    print(f"\n{day}")
    for s, emps in shift_data.items():
        print(f"  {s.capitalize()}: {', '.join(emps) if emps else 'No one assigned'}")
