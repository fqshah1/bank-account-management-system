import sqlite3
#import getpass


def create_database_connection():
    """Establish a database connection and return the connection and cursor."""
    conn = sqlite3.connect('bank.db')
    return conn, conn.cursor()

def create_tables(conn, cursor):
    """Create the accounts table if it doesn't exist"""
    cursor.execute('''
        DROP TABLE IF EXISTS accounts
    ''')
    conn.commit()
    cursor.execute('''
        CREATE TABLE accounts (
            account_id INTEGER PRIMARY KEY,
            account_holder TEXT NOT NULL,
            account_number TEXT NOT NULL,
            balance REAL NOT NULL
        )
    ''')
    conn.commit()


def create_account(conn, cursor, account_holder, account_number, balance):
    """Create a new bank account."""
    cursor.execute('''
        INSERT INTO accounts (account_holder, account_number, balance)
        VALUES (?, ?, ?)
    ''', (account_holder, account_number, balance))
    conn.commit()
    return cursor.lastrowid


def deposit(conn, cursor, account_id, amount):
    """Deposit money into a bank account."""
    cursor.execute('''
        UPDATE accounts SET balance = balance + ? WHERE account_id = ?
    ''', (amount, account_id))
    conn.commit()


def withdraw(conn, cursor, account_id, amount):
    """Withdraw money from a bank account."""
    cursor.execute('''
        UPDATE accounts SET balance = balance - ? WHERE account_id = ?
    ''', (amount, account_id))
    conn.commit()


def check_balance(conn, cursor, account_id):
    """Check the balance of a bank account."""
    cursor.execute('''
        SELECT balance FROM accounts WHERE account_id = ?
    ''', (account_id,))
    return cursor.fetchone()[0]


def main():
    # Create a connection to the database
    conn, cursor = create_database_connection()
    create_tables(conn, cursor)

    while True:
        print("\nWelcome to the Bank Account Program!")
        print("1. Create a new bank account")
        print("2. Deposit money into a bank account")
        print("3. Withdraw money from a bank account")
        print("4. Check the balance of a bank account")
        print("5. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            account_holder = input("Enter the account holder's name: ")
            account_number = input("Enter the account number: ")
            balance = float(input("Enter the initial balance: "))
#            password = getpass.getpass("Enter the password: ")
            account_id = create_account(conn, cursor, account_holder, account_number, balance)
            print(f"Account created successfully! Account ID: {account_id}")
        elif choice == "2":
            account_id = int(input("Enter the account ID: "))
            amount = float(input("Enter the amount to deposit: "))
            deposit(conn, cursor, account_id, amount)
            print("Deposit successful!")
        elif choice == "3":
            account_id = int(input("Enter the account ID: "))
            amount = float(input("Enter the amount to withdraw: "))
            withdraw(conn, cursor, account_id, amount)
            print("Withdrawal successful!")
        elif choice == "4":
            account_id = int(input("Enter the account ID: "))
            balance = check_balance(conn, cursor, account_id)
            print(f"Account balance: {balance}")
        elif choice == "5":
            print("Exiting program. Goodbye!")
            conn.close()
            break
        else:
            print("Invalid choice. Please try again.")
            conn.close()


if __name__ == "__main__":
    main()
