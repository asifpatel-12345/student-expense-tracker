// LocalStorage se Data Fetch karna (ya Default Initial values set karna)
let budget = localStorage.getItem('budget') ? Number(localStorage.getItem('budget')) : 0;
let expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

// DOM Elements
const totalBudgetEl = document.getElementById('total-budget');
const totalExpenseEl = document.getElementById('total-expense');
const remainingBalanceEl = document.getElementById('remaining-balance');

const budgetForm = document.getElementById('budget-form');
const budgetInput = document.getElementById('budget-input');

const expenseForm = document.getElementById('expense-form');
const expenseTitle = document.getElementById('expense-title');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');

// Initial Load Dashboard Update
updateDashboard();
renderExpenses();

// Set Budget Function
budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    budget = Number(budgetInput.value);
    localStorage.setItem('budget', budget);
    budgetInput.value = '';
    updateDashboard();
});

// Add Expense Function
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newExpense = {
        id: Date.now(),
        title: expenseTitle.value,
        amount: Number(expenseAmount.value),
        category: expenseCategory.value
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear Inputs
    expenseTitle.value = '';
    expenseAmount.value = '';

    updateDashboard();
    renderExpenses();
});

// Delete Expense Function
function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateDashboard();
    renderExpenses();
}

// Update Dashboard (Calculations)
function updateDashboard() {
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const remaining = budget - totalSpent;

    totalBudgetEl.innerText = budget;
    totalExpenseEl.innerText = totalSpent;
    remainingBalanceEl.innerText = remaining;
}

// Render Expense History List
function renderExpenses() {
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        expenseList.innerHTML = '<p style="color:#777;">No expenses added yet.</p>';
        return;
    }

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${expense.title}</strong> <small>(${expense.category})</small>
            </div>
            <div>
                <span>₹${expense.amount}</span>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
}