import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionManager = {
    
    setUserSession(username: string, userId: number, userRoles: string[]) {
        AsyncStorage.setItem('userId', userId.toString())
        AsyncStorage.setItem('username', username)
        AsyncStorage.setItem('userRoles', JSON.stringify(userRoles))
    },

    removeUserSession() {
        AsyncStorage.removeItem('userId')
        AsyncStorage.removeItem('username')
        AsyncStorage.removeItem('userRoles')
    },

    async getUserSession() {
        const jsonRoles = await AsyncStorage.getItem('userRoles')
        if (jsonRoles === null){
            return null
        } else {
            const id = await AsyncStorage.getItem('userId')
            const username = await AsyncStorage.getItem('username') 
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