Made the following assumptions
- There are only 5 types of transactions that can happen accross the entire system (check product column)
    - Card Transactions
    - Card Funding
    - Card Transactions (Credit)
    - Card Funding Debit
    - Card Issuance Fee

- The gateway_reference / transaction_reference column identifyies the user/card that perfomed the transaction

- The reference column is a unique identifier for a particular transaction.
    - There is a possibility that a single transaction entry might have individual entries that make up the whole transaction
    - The entries might be from different banks, or multiple from the same bank

- Currencies
    - USD : bank1, bank2, bank3
    - GBP : bank1
    - EUR : bank2

- Status
    - Failed : All Banks
    - Successful : All Banks

- No idea what response_code, response_message, and indicator columns are used for
    - My guess is response_* columns correspond to the responses returned by the API

- The transactions table containts a list of all the transactions from all the banks combined
    - The sql provided only had transaction references from bank 1


Answers
1. 
2. 
3. Creating views
    ```
    create view matched_transactions as (
        (
        select transactions.*, bank1.transaction_reference as card, 'bank1' as bank
        from transactions
        inner join bank1 on bank1.reference=transactions.reference
        )
        UNION
        (
        select transactions.*, bank2.transaction_reference as card, 'bank2' as bank
        from transactions
        inner join bank2 on bank2.reference=transactions.reference
        )
        UNION
        (
        select transactions.*, bank3.gateway_reference as card, 'bank3' as bank
        from transactions
        inner join bank3 on bank3.reference=transactions.reference
        )
    )
    ```

4. Summary Views
    - Total Amount per currency per week
    ```
    create view total_amount_per_currency_per_week as (
        select currency, sum(amount), week(created_at) as week 
        from matched_transactions
        group by currency, week
    )
    ```

    - Total Amount Processed Per Card per week
    ```
    create view total_amount_per_card_per_week as (
        select card, sum(amount), week(created_at) as week 
        from matched_transactions
        group by card, week
    )
    ```

    - Total Amount Processed Per Bank per week
    ```
    create view total_amount_per_bank_per_week as (
        select bank, sum(amount), week(created_at) as week 
        from matched_transactions
        group by bank, week
    )
    ```

    - Total transactions per card, per week
    ```
    create view total_transactions_per_card_per_week as (
        select card, week(created_at) as week, count(id) 
        from matched_transactions
        group by card, week
    )
    ```

