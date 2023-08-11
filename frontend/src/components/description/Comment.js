import { Link } from "react-router-dom";

export const CommentSection = ({ comments, users }) => {
    console.log(comments, users);
    return (
        <>
            <section className="mx-auto w-75 mt-2 mb-4">
                <h4 className="text-center mb-0 pb-0">Comments Secion</h4>
                <div>
                    {
                        comments?.map((comment, index) => {
                            return (<>
                                <div className="row w-100">
                                    <div className="w-100">
                                        <div className="w-100">
                                            <img className="rounded-circle shadow-1-strong me-3 float-lg-left mr-3"
                                                alt={comment?.comment}
                                                {
                                                ...(users[index]?.img ?
                                                    { src: users[index]?.img } :
                                                    { src: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" })
                                                }
                                                height="65" />
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-1">
                                                        {users[index]?.name} <span className="small">- 2 hours ago</span>
                                                    </p>
                                                    <a href="#!"><i className="fas fa-reply fa-xs"></i><span class="small"> reply</span></a>
                                                </div>
                                                <p className="small mb-0">
                                                    {comment?.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        })
                    }
                </div>
            </section>
        </>
    );
};