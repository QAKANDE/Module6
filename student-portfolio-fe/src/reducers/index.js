export const mainReducer = (state ={} , action)=>{
    switch(action.type){
        case "hide_spinner":
            return{
                ...state,
                loading:  !state.loading
            }
        default:
            return state
    }
}