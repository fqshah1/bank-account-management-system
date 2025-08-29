import sqlite3
import pandas as pd

# Define the database file and table name
DB_FILE = 'bank.db'
TABLE_NAME = 'accounts'

# Define the output Excel file name
OUTPUT_FILE = 'bank-db-export.xlsx'

# Connect to the SQLite3 database
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Retrieve the data
cursor.execute(f'SELECT * FROM {TABLE_NAME}')
data = cursor.fetchall()

# Get the column names
column_names = [description[0] for description in cursor.description]

# Convert the data to a Pandas DataFrame
df = pd.DataFrame(data, columns=column_names)

# Export the DataFrame to an Excel file
df.to_excel(OUTPUT_FILE, index=False)

# Close the database connection
conn.close()

print(f'Data exported to {OUTPUT_FILE}')