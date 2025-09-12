import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    list: [
      {
        id: 1,
        date: '2023-05-15',
        category: 'Office Supplies',
        referenceNo: 'REF-001',
        expenseFor: 'Printer Paper',
        amount: '45.50',
        account: 'Company Account',
        note: 'Monthly supplies',
        createdBy: 'John Doe'
      },
      {
        id: 2,
        date: '2023-05-10',
        category: 'Travel',
        referenceNo: 'REF-002',
        expenseFor: 'Client Meeting',
        amount: '120.75',
        account: 'Company Account',
        note: 'Transportation costs',
        createdBy: 'Jane Smith'
      },
      {
        id: 3,
        date: '2023-05-05',
        category: 'Software',
        referenceNo: 'REF-003',
        expenseFor: 'Project Management Tool',
        amount: '299.00',
        account: 'Operations Budget',
        note: 'Annual subscription',
        createdBy: 'IT Department'
      },
      {
        id: 4,
        date: '2023-04-28',
        category: 'Marketing',
        referenceNo: 'REF-004',
        expenseFor: 'Social Media Ads',
        amount: '500.00',
        account: 'Marketing Budget',
        note: 'Q2 campaign',
        createdBy: 'Marketing Team'
      },
      {
        id: 5,
        date: '2023-04-15',
        category: 'Utilities',
        referenceNo: 'REF-005',
        expenseFor: 'Internet Bill',
        amount: '89.99',
        account: 'Operations Budget',
        note: 'Monthly payment',
        createdBy: 'Admin'
      }
    ]
  },
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        ...action.payload,
        id: Date.now(),
        date: action.payload.date || new Date().toISOString().split('T')[0]
      };
      state.list.push(newExpense);
    },
    deleteExpense: (state, action) => {
      state.list = state.list.filter(expense => expense.id !== action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.list.findIndex(expense => expense.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    }
  }
});

export const { addExpense, deleteExpense, updateExpense } = expensesSlice.actions;
export default expensesSlice.reducer;