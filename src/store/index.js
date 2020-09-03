import {createStore} from 'redux'

let _baseData = []
function reducer(state = {      
        todos:[
            {
                id:1,
                title:'测试任务一',
                isEdit:false,
                completed:false
            },
            {
                id:2,
                title:'测试任务二',
                isEdit:false,
                completed:false
            },
            {
                id:3,
                title:'测试任务三',
                isEdit:false,
                completed:false
            },
        ],
        completedNum:0,
        totalNum:0
    }
    ,action) {
    let {todos, totalNum,completedNum} = state
    if (_baseData.length === 0) {
        _baseData = [...todos]    
        totalNum = _baseData.length
        return {...state, totalNum}
    }
    switch (action.type) {
        case "ADDTODO":
            {
                let todo = {
                    id: _baseData.length+1,
                    title: action.title,
                    isEdit:false,
                    completed: false
                }
                todos.push(todo)
                _baseData.push(todo)
                totalNum = _baseData.length           
                return {...state, totalNum}
            }
            
        case "ALLTODO":
                {
                    [...todos] = _baseData
                    return {...state,todos}
                }
            
        case "ACTIVETODO":
                {
                    [...todos] = _baseData
                    todos = _baseData.filter(todo=>!todo.completed)
                    if (todos.length === 0) todos = []
                    return {...state,todos}
                }
            
        case "COMPLETETODO":
                {
                    [...todos] = _baseData
                    todos = _baseData.filter(todo=>todo.completed)
                    if (todos.length === 0) todos = []
                    return {...state,todos}
                }
            
        case "CHANGTODOESTATE":
            {
                completedNum = 0
                for (let index = 0; index < todos.length; index++) {
                    const todo = todos[index];
                    if (todo.id === action.id) {
                        todo.completed = !todo.completed
                    } 
                    if (todo.completed) {
                        completedNum += 1
                    }  
                }
                return {...state,completedNum}
            }
        case "DELETETODO":
            {
                for (let index = 0; index < _baseData.length; index++) {
                    if (action.id === _baseData[index].id) {
                        _baseData.splice(index,1)      
                        break
                    }
                }

                for (let index = 0; index < todos.length; index++) {
                    if (action.id === todos[index].id) {
                        todos.splice(index,1)
                        completedNum-=1  
                        totalNum-=1    
                        break
                    }
                }

                console.log(_baseData);
                
                totalNum = _baseData.length
                return {...state,completedNum,totalNum}
            }
        case "CHANGETODO":
            {
                let todo = action.todo
                todo.title = action.title
                todo.isEdit = !todo.isEdit
                return {...state,todos}
            }
        default:
            return {...state}
            
    }
}
const store = createStore(reducer)
export default store