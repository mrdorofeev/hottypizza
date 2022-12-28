import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){ 
            const findItem = state.items.find(obj => (obj.id === action.payload.id) && (obj.type === action.payload.type) && (obj.size === action.payload.size))
            if (findItem){
                findItem.count++
            }
            else{
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if(findItem && findItem.count > 1){
                findItem.count--
                state.totalPrice = state.items.reduce((sum, obj) => {
                    return obj.price * obj.count + sum
                }, 0)
            }
            
        },
        removeItem(state, action){
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            if(state.items.length === 0){
                state.totalPrice = 0
            }
            else{
                state.totalPrice = state.items.reduce((sum, obj) => {
                    return obj.price * obj.count + sum
                }, 0)
            }
        },
        clearItems(state){
            state.items = []
            state.totalPrice = 0
        }
    },
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
