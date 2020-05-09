import Redux from 'redux'

// Action Creators
// Someone is dropping off a form
const createPolicy = (name, amount) => {
    return { // Action or Form
        type: 'CREATE_POLICY',
        payload: {
            name,   // Name of customer
            amount  // Amount of $
        }
    }
}

// Deleting a policy
const deletePolicy = name => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name    // Name of customer
        }
    }
}

// Creating a claim
const createClaim = (name, amount) => {
    return { 
        type: 'CREATE_CLAIM',
        payload: {
            name,  // Customers name
            amount // Money to give to a customer
        }
    }
}

// Reducers (Deparments)
// Change the list of claims
const claimsHistory = (oldClaims = [], action) => {
    return action.type === 'CREATE_CLAIM' ? [...oldClaims, action.payload] : oldClaims
}

// Change the amount of money
const accounting = (currentBalance = 100, action) => {
    if(action.type === 'CREATE_CLAIM')
        return currentBalance - action.payload.amount
    else if(action.type === 'CREATE_POLICY')
        return currentBalance + action.payload.amount
    else
        return currentBalance
}

// Changing list of policies
const policies = (listOfPolicies = [], action) => {
    if(action.type === 'CREATE_POLICY')
        return [...listOfPolicies, action.payload.name]
    else if(action.type === 'DELETE_POLICY')
        return listOfPolicies.filter(name => name !== action.payload.name)
    else
        return listOfPolicies
}

const { createStore, combineReducers } = Redux

const ourDepartments = combineReducers({
    accounting,
    claimsHistory,
    policies
})

const store = createStore(ourDepartments)

store.dispatch(createPolicy('Marcus', 20))
store.dispatch(createPolicy('Naomi', 50))
store.dispatch(createPolicy('Vina', 10))

store.dispatch(createClaim('Marcus', 100))
store.dispatch(createClaim('Vina', 50))

store.dispatch(deletePolicy('Naomi'))


console.log(store.getState())

