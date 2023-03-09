
const SessionManager = {
    
    setUserSession(username: string, userId: number, userRoles: string[]) {
        sessionStorage.setItem('userId', userId.toString())
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('userRoles', JSON.stringify(userRoles))
    },

    removeUserSession() {
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('userRoles')
    },

    getUserSession() {
        const jsonRoles = sessionStorage.getItem('userRoles')
        if (jsonRoles === null){
            return null
        } else {
            const id = sessionStorage.getItem('userId')
            const username = sessionStorage.getItem('username') 
            const roles = JSON.parse(jsonRoles) 
            
            const session = {
                id,
                username,
                roles
            }
            return session
        }        
    }
}

export default SessionManager