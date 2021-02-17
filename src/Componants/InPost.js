import React from 'react'
import { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../Contaxts/AuthContext';
import { firestore, storage } from '../Firebase/Fire';
import { AddComment } from './AddComment';
import { Comments } from './Comments';
import { RiDeleteBin5Line } from 'react-icons/ri';
export const InPost = ({ data }) => {

    const [canDelete, setcanDelete] = useState(false)
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser.email === data.post.user) {
            setcanDelete(true)
        }
        else {
            setcanDelete(false)
        }
    }, [])


    const deletePost = () => {

        let imgRef = storage.refFromURL(data.post.postimgUrl)
        imgRef
            .delete()
            .then(function () {
                console.log("deletePost")
            })
            .catch(function (error) {
                console.log(error)

            });

        // delete from storage

        let storageRef = firestore.collection("posts").doc(data.id)

        storageRef.delete()
            .then(() => {
                console.log("deletePost from storage")
            })
            .catch((error) => {
                console.log(error)
            });



    }


    return (
        <div className="post-container">

            <p>{data.post.user.replace("@gmail.com", "")} {canDelete ? <button onClick={deletePost} className=" btn-promary dlt-btn" ><RiDeleteBin5Line className="dlt-icon" /></button> : ""} </p>
            <p>{data.post.caption}</p>
            <img src={data.post.postimgUrl} alt="img" style={{ height: "50px" }} />
            <AddComment id={data.id} comments={data.post.comments} />
            <Comments comments={data.post.comments} />
        </div>
    )
}
