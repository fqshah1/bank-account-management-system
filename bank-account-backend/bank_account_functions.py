import sqlite3

#Function to create Bank Account
def create_account(conn, cursor, account_holder, account_number, balance):
    try:
        cursor.execute('''
            INSERT INTO accounts (account_holder, account_number, balance)
            VALUES (?, ?, ?)
        ''', (account_holder, account_number, balance))
        conn.commit()
        return cursor.lastrowid
    except sqlite3.Error as e:
        print(f"Error inserting data: {e}")

    return cursor.lastrowid

#Create a function to Deposit money
def deposit(account_id, amount):
    cursor.execute('''
        UPDATE accounts SET balance = balance + ? WHERE account_id = ?
    ''', (amount, account_id))
    conn.commit()

#creates a function to withdraw money
def withdraw(account_id, amount):
    cursor.execute('''
        UPDATE accounts SET balance = balance - ? WHERE account_id = ?
    ''', (amount, account_id))
    conn.commit()

#Create a function to Check Balance
def check_balance(account_id):
    cursor.execute('''
        SELECT balance FROM accounts WHERE account_id = ?
    ''', (account_id,))
    return cursor.fetchone()[0]
