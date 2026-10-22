import csv
import os

filepath = 'backend/data/users.csv'

new_dealers = [
    {
        "id": "21",
        "username": "parul_recyclers",
        "password": "dealer123",
        "role": "dealer",
        "name": "Parul Uni Recyclers",
        "email": "parulrec@example.com",
        "phone": "9825000006",
        "location": "Limda, Waghodia",
        "lat": "22.2890",
        "lng": "73.3640",
        "joined_date": "2026-02-01",
        "gst_number": "",
        "business_address": "Near Parul University Gate 1",
        "bank_account_no": "",
        "bank_ifsc": "",
        "bank_name": "",
        "opening_time": "09:00",
        "closing_time": "18:00",
        "closed_days": "Sunday",
        "notifications_enabled": "True"
    },
    {
        "id": "22",
        "username": "waghodia_scrap",
        "password": "dealer123",
        "role": "dealer",
        "name": "Waghodia Scrap Center",
        "email": "waghodia@example.com",
        "phone": "9825000007",
        "location": "Waghodia Road",
        "lat": "22.2850",
        "lng": "73.3600",
        "joined_date": "2026-02-01",
        "gst_number": "",
        "business_address": "Opposite Parul Sevashram",
        "bank_account_no": "",
        "bank_ifsc": "",
        "bank_name": "",
        "opening_time": "10:00",
        "closing_time": "20:00",
        "closed_days": "Sunday",
        "notifications_enabled": "True"
    },
    {
        "id": "23",
        "username": "campus_green",
        "password": "dealer123",
        "role": "dealer",
        "name": "Campus Green Waste",
        "email": "campus@example.com",
        "phone": "9825000008",
        "location": "Ishwarpura",
        "lat": "22.2920",
        "lng": "73.3680",
        "joined_date": "2026-02-01",
        "gst_number": "",
        "business_address": "Ishwarpura Village, Waghodia",
        "bank_account_no": "",
        "bank_ifsc": "",
        "bank_name": "",
        "opening_time": "08:00",
        "closing_time": "17:00",
        "closed_days": "Saturday",
        "notifications_enabled": "True"
    }
]

with open(filepath, 'a', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    for dealer in new_dealers:
        writer.writerow([
            dealer["id"], dealer["username"], dealer["password"], dealer["role"], dealer["name"],
            dealer["email"], dealer["phone"], dealer["location"], dealer["lat"], dealer["lng"],
            dealer["joined_date"], dealer["gst_number"], dealer["business_address"],
            dealer["bank_account_no"], dealer["bank_ifsc"], dealer["bank_name"],
            dealer["opening_time"], dealer["closing_time"], dealer["closed_days"],
            dealer["notifications_enabled"]
        ])

print("Dealers added successfully.")
