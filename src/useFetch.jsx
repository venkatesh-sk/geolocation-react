import axios from "axios"
import { useReducer , useEffect } from "react"

const ACTIONS = {
    API_REQUEST :"api-request",
    API_FETCH_DATA:'fetch-data',
    API_ERROR:'error'
}
const initialState = {
    data:[],
    loading:false,
    error:null
}


function reducer(state , {type,payload}){
    switch (type) {
        case ACTIONS.API_REQUEST:
            return {
                ...state , 
                data:[],
                loading:true
            }
        case ACTIONS.API_FETCH_DATA:
            return {
                ...state , 
                data: payload.data,
                loading:false
            }
        case ACTIONS.API_ERROR: 
            return {
                ...state , 
                error:payload,
                data:[]
            }
        default : 
        return state
        }
}
function useFetch(url){
    const [state , dispatch] = useReducer(reducer , initialState)
    useEffect(() => {
        dispatch({type:ACTIONS.API_REQUEST});
        axios.get(url)
        .then(res=>{
            dispatch({type:ACTIONS.API_FETCH_DATA , payload:res.data})
        }).catch(error=>{
            dispatch({type:ACTIONS.API_ERROR , payload:error})
        })
       
    }, [url])
    return state

}
export default useFetch