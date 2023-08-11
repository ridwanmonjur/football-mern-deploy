import { Link } from "react-router-dom";

export const CommentSection = ({ type, productName, productid }) => {
    return (
        <>

            <section>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12 col-lg-10 col-xl-8">
                        <div className="card-body p-4">
                            <h4 className="text-center mb-4 pb-2">Nested comments section</h4>

                            <div className="row">
                                <div className="col">
                                    <div className="d-flex flex-start">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width="65"
                                            height="65" />
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-1">
                                                        Maria Smantha <span className="small">- 2 hours ago</span>
                                                    </p>
                                                    <a href="#!"><i className="fas fa-reply fa-xs"></i><span class="small"> reply</span></a>
                                                </div>
                                                <p className="small mb-0">
                                                    It is a long established fact that a reader will be distracted by
                                                    the readable content of a page.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};