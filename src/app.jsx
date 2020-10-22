import React from 'react';
import {useLocalStore, useObserver} from 'mobx-react';
import './index.css';

const StoreContext = React.createContext()

const StoreProvider = ({children}) => {
    const store = useLocalStore(() => ({
        commentOfUser :["Pupies so cute !!"],
        //action
        addComment: (comment) => store.commentOfUser.push(comment)
    }));
    return <>
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
        </>
}

const CommentList = () => {
    const store = React.useContext(StoreContext)
    //Reaction:
    return useObserver(
        () => <>
        <ui>
            <hr />
            {store.commentOfUser.map(commentOfUser => <ul key={commentOfUser}> Guest User : {commentOfUser}</ul> )}
            <hr />
        </ui>
   </>
    );
}

const InputComment = () => {
    const store = React.useContext(StoreContext)
    const [comment, setCommet] = React.useState("");
    return <>
        <form onSubmit={(e) => {
            e.preventDefault()
            store.addComment(comment)
            setCommet("")
        }}>
            <input type="text" value={comment} onChange={(e) => {
                setCommet(e.target.value)
            }}/>
            <button type="submit">Comment</button>
        </form>
    </>
}
export const App = () => {
    return<>
        <StoreProvider>
            <img src="https://cf.ltkcdn.net/dogs/images/orig/236742-1600x1030-cutest-puppy-videos.jpg" alt="husky" height="250px"/>
            <CommentList/>
            <InputComment />
        </StoreProvider>
        </>
}