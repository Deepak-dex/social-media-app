import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Contaxts/AuthContext';
import { firestore } from '../Firebase/Fire';
import { InPost } from './InPost';




export const Posts = () => {
    const [feed, setfeed] = useState([])

    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        firestore.collection("posts").onSnapshot((snapshot) => {
            let allpost = (snapshot.docs.map(doc => ({
                id: doc.id, post: doc.data()
            })))
            console.log(allpost)

            allpost.sort((a, b) => { return a.post.timestamp - b.post.timestamp })

            setfeed(allpost)
        })


    }, []);
    console.log(feed)

    return (

        <div className="feed-main-container">
            {feed
                ? feed.map((data, index) => <div><InPost data={data} key={index} /> </div>)
                : 'nothing'}
        </div>
    )
}
