import inquirer from "inquirer";
//Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdraw of $${amount} successful.Remaining balance:$${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    //Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful.Remaining balance :$${this.balance}`);
    }
    //check balance 
    checkBalance() {
        console.log(`Current Balance:$${this.balance}`);
    }
}
//customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank accounts
const accounts = [
    new BankAccount(1001, 300),
    new BankAccount(1002, 600),
    new BankAccount(1003, 900)
];
//create customer 
const customers = [
    new Customer("zain", "khan", "male", 30, 3125679601, accounts[0]),
    new Customer("kamran", "chandio", "male", 24, 3153772912, accounts[1]),
    new Customer("zoya", "khan", "female", 27, 3199932019, accounts[2])
];
//functions
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome,${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositamount.amount);
                    break;
                case "Withdraw":
                    const withdrawamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw :"
                    });
                    customer.account.withdraw(withdrawamount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services.Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. please try again");
        }
    } while (true);
}
service();
