export const conversionReducer=(state={},action)=>{

    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.payload.target]:action.payload.value

            }
    
        // case 'delete':
        //     return state.filter( todo =>todo.id !== action.payload);
    
        // case 'toggle-o':
        //     return state.map(todo=>{
        //         if(todo.id===action.payload){
        //             return {
        //                 ...todo,
        //                 done:!todo.done
        //             }
        //         }else {
        //             return todo;
        //         }
        //     })
        // case 'toggle':
        //     return state.map(todo=>
        //         (todo.id===action.payload)?{...todo, done:!todo.done}:todo
                
        //         );
    
        default:
            return state;
    }
    
    }