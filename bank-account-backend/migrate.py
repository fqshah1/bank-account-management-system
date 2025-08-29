import sqlite3

def migrate():
    conn = sqlite3.connect("bank.db")
    cursor = conn.cursor()

    # Create users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)

    # Create transactions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_number TEXT NOT NULL,
        type TEXT CHECK(type IN ('deposit', 'withdraw')) NOT NULL,
        amount REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_number) REFERENCES accounts(account_number)
    )
    """)

    conn.commit()
    conn.close()
    print("✅ Migration complete!")

if __name__ == "__main__":
    migrate()
