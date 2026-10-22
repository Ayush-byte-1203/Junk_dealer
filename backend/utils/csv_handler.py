import csv
import os
from django.conf import settings

DATA_DIR = os.path.join(settings.BASE_DIR, 'data')

def read_csv(filename):
    """
    Reads a CSV file and returns a list of dictionaries.
    """
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        return []

    with open(filepath, mode='r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        return list(reader)

def write_csv(filename, data, fieldnames):
    """
    Writes a list of dictionaries to a CSV file.
    Overwrites the file content.
    """
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, mode='w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

def append_csv(filename, row, fieldnames):
    """
    Appends a single dictionary row to a CSV file.
    """
    filepath = os.path.join(DATA_DIR, filename)
    file_exists = os.path.exists(filepath)
    
    with open(filepath, mode='a', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow(row)

def get_headers(filename):
    """
    Returns the headers of a CSV file.
    """
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        return []

    with open(filepath, mode='r', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        try:
            return next(reader)
        except StopIteration:
            return []

def get_next_id(filename):
    """
    Calculates the next ID for auto-incrementing.
    """
    data = read_csv(filename)
    if not data:
        return 1
    
    ids = []
    for row in data:
        try:
            ids.append(int(row.get('id', 0)))
        except (ValueError, TypeError):
            pass
    return max(ids) + 1 if ids else 1
