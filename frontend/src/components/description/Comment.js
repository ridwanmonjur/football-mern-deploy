import { useSelector } from "react-redux";
import { selectProfileDetails } from "../../redux/slices/ProfileSlice";
import { useState } from "react";
import { AddComment, DeleteCommentById, EditComment } from "../../api/product";
import { toast } from 'react-toastify';
import { MDBBtn } from "mdbreact";
import { hostNameWithoutAPI } from "../../api/env";
export const CommentSection = ({ comments, users, productId }) => {
    let user = useSelector(selectProfileDetails)
    const [currentCommentIndex, setCurrentCommentIndex] = useState(-1)
    const [commentState, setCommentState] = useState(comments)
    const [ userState, setUserState] = useState(users)
    const addToComment = async () => {
        const textAreaComment = document.getElementById('textAreaComment')
        const textAreaCommentValue = textAreaComment?.value
        if (String(textAreaCommentValue).trim() === "") {
            toast.warn("Comment cannot be empty");
            return;
        }
        if ((user === null || typeof 'user' === 'undefined') || !('_id' in user) || user?.role !== 'customer') {
            toast.warn("Please login to comment as a customer!");
            return;
        }
        console.log({ textAreaCommentValue })
        const newComment = await AddComment(productId, { userId: user?._id, comment: textAreaCommentValue });
        setCommentState((oldList) => ([...oldList, newComment]));
        setUserState((oldList) => ([...oldList, user]))
        textAreaComment.value = ""
    }
    const editComment = async (productId, commentId) => {
        const textAreaComment = document.getElementById('textAreaComment')
        const textAreaCommentValue = textAreaComment?.value
        console.log({ textAreaCommentValue })
        if (String(textAreaCommentValue).trim() === "") {
            toast.warn("Comment cannot be empty");
            return;
        }
        if ((user === null || typeof 'user' === 'undefined') || !('_id' in user) || user?.role !== 'customer'   ) {
            toast.warn("Please login to comment as a customer!");
            return;
        }
        const newComment = await EditComment(productId, commentId, { comment: textAreaCommentValue });
        setCommentState((oldList) => {
            return oldList.map(value => {
                return value._id !== commentId ? value : newComment
            })
        })
    }
    const deleteComment = async (productId, commentId) => {
        await DeleteCommentById(productId, commentId);
        setCommentState((oldList) => {
            return oldList.filter(value => value._id !== commentId)
        })
    }
    console.log({ user, comments, commentState, userState })
    return (
        <>
            <section className="mx-auto w-75 mt-2 mb-4">
                <h4 className="text-center mb-0 pb-0">Comments Section</h4>
                <div>
                    {
                        commentState?.map((comment, index) => {
                            const dateObject = new Date(comment?.createdAt);
                            const date = dateObject.toLocaleDateString()
                            const time = dateObject.toLocaleTimeString()
                            // get current date time
                            const currentDateTime = new Date();
                            // subtract time from current date time
                            const diff = currentDateTime - dateObject;
                            let text = ''
                            switch (diff) {
                                case diff < 1000 * 60 * 60 * 24:
                                    text = `Today ${time}`
                                    break;
                                case diff < 1000 * 60 * 60 * 24 * 2:
                                    text = `Yesterday ${time}`
                                    break;
                                default:
                                    text = `${date} ${time}`
                            }
                            return (<>
                                <div className="row w-100">
                                    <div className="w-100">
                                        <div className="w-100">
                                            <img className="rounded-circle shadow-1-strong me-3 float-lg-left mr-3"
                                                alt={comment?.comment}
                                                {
                                                ...(userState[index]?.image ?
                                                    { src: `${hostNameWithoutAPI}${userState[index]?.image}` } :
                                                    { src: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" })
                                                }
                                                height="65"
                                                width="65"
                                            />
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-1">
                                                        {userState[index]?.name} <span className="small"> {text} </span>
                                                    </p>
                                                    <div>
                                                        {user?._id === comment?.userId &&
                                                            <>
                                                                <p
                                                                    className="edit-delete"
                                                                    onClick={() => {
                                                                        const textAreaComment = document.getElementById('textAreaComment')
                                                                        textAreaComment.value = comment?.comment
                                                                        setCurrentCommentIndex(index)
                                                                    }}><i className="fas fa-edit fa-xs"></i><span class="small"> edit</span>
                                                                </p>
                                                                <p
                                                                    className="edit-delete"
                                                                    onClick={() => {
                                                                        deleteComment(productId, comment?._id)
                                                                    }}><i className="fas fa-trash fa-xs"></i><span class="small"> delete</span>
                                                                </p>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                <p className="mb-0">
                                                    {comment?.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        })
                    }
                    <div className="row w-100 mb-5">
                        <div className="w-100">
                            <div className="w-100 d-lg-flex justify-content-start align-items-center">
                                {user?._id ?
                                    <img className="rounded-circle shadow-1-strong mr-3"
                                        src={`${hostNameWithoutAPI}${user?.image}`} alt="avatar" width="65"
                                        height="65"
                                         />
                                    :
                                    <img className="rounded-circle shadow-1-strong mr-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="65"
                                        height="65"
                                         />
                                }
                                <div className="d-flex flex-column">
                                    <textarea className="form-control mt-5 w-700px" style={{
                                        fontSize: '17px',
                                    }} id="textAreaComment" rows="4"></textarea>
                                    {currentCommentIndex === -1 ?
                                        <MDBBtn color="amber" outline className="add-edit-button" onClick={() => { addToComment() }}> Add a comment </MDBBtn>
                                        :
                                        <div>
                                            <MDBBtn color="amber" outline className="add-edit-button" onClick={() => { editComment(productId, commentState[currentCommentIndex]._id) }}> Edit comment </MDBBtn>
                                            <MDBBtn color="amber" outline className="add-edit-button" onClick={() => {
                                                const textAreaComment = document.getElementById('textAreaComment')
                                                textAreaComment.value = ''
                                                setCurrentCommentIndex(-1)
                                                
                                            }}> Add comment </MDBBtn>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};