# Account
###### tags: `TCprj`, `NTUE`
Save your receipts to track your spending.

## Guide
1.	Open the app "Accounting Book".
2.	Click "Account" on the left corner, and enter the accounting page.
    1. "Type" field: Choose "Income" or "Expense".
    2. "Date" field: Choose the accounting date.
    3. "Amount" field: Type numbers only.
    4. "Categrory" field: Choose detailed accounting category.
    5. "Memo" field: Memo whatever you want.
    6. Click "Submit" on the lower left corner to go back to homepage, and it will display the details of the accounting book.
        + If the "Date" field or "Amount" field is empty, it will trigger an alert message.
    7. Click "Cancel" on the lower right corner to go back to homepage, and it will display the original details of the accounting book.
3.	Click "Leave" on the lower right corner to close the app.
4.	Support three languages: Traditional Chinese(繁體中文), English, Japanese(日本語).

## Component and Technique
1. Component
    1. Text View
    2. Button
    3. Edit Text (Number)
    4. Spinner
    5. Edit Text (Plain)
    6. Date Picker
2. Technique
    1. Toast: alert message
    2. Array Adapter: The spinner of "Type" field will change as long as "Category" field changes.
    3. Intent
        + startActivityForResult() / onActivityResult(): Ensure accounting or not.
        + putXXXExtra(): Choose the field and content to send.
        + getXXXExtra(): Get the field and content to send.
    4. Database
        + cv.put(): Save the accounting content to database.
    5. Cursor
        + cv.getXXX(): Get the content of database, and amount the deposit.
