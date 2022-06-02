import { createContext, useReducer } from "react"
import GithubReducer from "./GithubReducer"

const GithubContext = createContext()

// Assign Github API and token stored in .env file to local variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  //   Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    // const response = await fetch(`${GITHUB_URL}/users`, {
    //   headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`,
    //   },
    // })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`)

    const { items } = await response.json()

    dispatch({
      type: "GET_USERS",
      payload: items,
    })
  }

  // Clear users from state
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    })
  }

  //   Set loading
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
