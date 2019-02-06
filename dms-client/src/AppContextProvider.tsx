
import * as React from 'react'
import UserCtx from './UserContext';

type UserContext  = {
    userInfo : UserCtx;
    updateUserInfo(uInfo: UserCtx): UserCtx
}

export const AppContext = React.createContext<UserContext>({userInfo: new UserCtx(), updateUserInfo:(n) => {return new UserCtx()}});
export const AppcontextConsumer = AppContext.Consumer;

class AppContextProvider extends React.Component{
    
    constructor(props){
        super(props);
        this.updateUserInfo1 = this.updateUserInfo1.bind(this);
    }
   readonly state = {
        userContext:  new UserCtx(),
    }

    public updateUserInfo1(userCtx: UserCtx): UserCtx {
        if (this.state.userContext.loggedIn != userCtx.loggedIn){
            this.setState({userContext: userCtx});
        }
        return userCtx;
    }

    public render(){
        return <AppContext.Provider value={{userInfo: this.state.userContext, updateUserInfo: this.updateUserInfo1}}>
                {this.props.children}
        </AppContext.Provider>
    }
}
AppContextProvider.contextType

export default AppContextProvider;
