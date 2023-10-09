import React, { useEffect, useState } from "react";
import "./commentItem.css"
import { Button, TextArea } from "../../atoms";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReplyForm from "../replyForm";
import { MoreItem, MoreItemreReply } from "../..";

const CommentItem = (props) => {
    const token = localStorage.getItem('token');
    const params = useParams()
    const [data, setData] = useState({})
    const [commentId, setCommentId] = useState("")
    useEffect(() => {
        const id = params['*']
        if (id != "") {
            axios.get(`https://mern-blog-api.cyclic.cloud/v1/blog/post/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log('success:', res)
                    setData(res.data.data)
                })
                .catch(err => {
                    console.log('err:', err)
                })
        }
    }, [params])

    const [text, setText] = useState('')
    const [isReply, setIsReply] = useState(false)
    const onSubmit = () => {
        setButtonDisable(true)
        const id = params['*']
        const data = {
            text: text
        }

        if (isReply) {
            axios.put(`https://mern-blog-api.cyclic.cloud/v1/blog/post/${id}/comment/${commentId}/reply`, data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log('reply success:', res)
                    alert('balas komentar berhasi')
                    window.location.reload()
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
                .finally(() => {
                    setButtonDisable(false)
                })
        } else {
            axios.put(`https://mern-blog-api.cyclic.cloud/v1/blog/post/${id}/comment`, data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log('comment success:', res)
                    alert('komentar berhasil')
                    window.location.reload()
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
                .finally(() => {
                    setButtonDisable(false)
                })
        }
    }

    const [toggle, setToggle] = useState(false)
    // const [commentAuthor, setCommentAuthor] = useState("")
    const [buttonDisable, setButtonDisable] = useState(false)

    const hendleToggle = () => {
        setToggle(!toggle)
        setIsReply(!isReply)
        setText("")
    }

    console.log('text:', text)


    if (!Array.isArray(data.comment)) {
        return <p>Data comments tidak valid</p>;
    }

    let totalCount = 0;
    for (const comment of data.comment) {
        totalCount++;
        if (comment.reply) {
            totalCount += comment.reply.length;
        }
    }

    if (data.author) {
        return (
            <div className="commentItem-co">
                <div className={toggle ? 'display-block' : "display-none"}>
                    <ReplyForm hendleToggle={hendleToggle} onSubmit={onSubmit} onChange={e => setText(e.target.value)} buttonDisable={buttonDisable} value={text} />
                </div>
                <div onClick={props.onClick} className="commentItem-left"/>
                <div className="commentItem-wrapper">
                    <div className="commentItem-title-wrapper">
                        <p className="commentItem-title">{data.title}</p>
                        <span onClick={props.onClick} className="material-symbols-outlined">
                            close
                        </span>
                    </div>
                    <div className="commentItem-scrollBox">
                        <p className="comment-count">{totalCount} komentar</p>
                        <div className="comment-form">
                            <textarea placeholder="Ketik komentar" className="comment-textArea" onChange={e => setText(e.target.value)} />
                            <div className={buttonDisable ? "comment-button2" : "comment-button"}>
                                <Button title="Komen" onClick={onSubmit} />
                            </div>
                        </div>
                        {data.comment.map(comment => {
                            return (
                                <div className="comment-content-co" key={comment._id}>
                                    <div className="comment-content" >
                                        <p className="comment-author">@{comment.author.name}</p>
                                        <p className="comment-text">
                                            {comment.text.split("\n").map((item, key) => {
                                                return (
                                                    <React.Fragment key={key}>
                                                        {item}
                                                        <br />
                                                    </React.Fragment>
                                                );
                                            })}
                                        </p>
                                        <div className="reply-wrapper">
                                            <button className="button-reply" onClick={() => {
                                                setCommentId(comment._id)
                                                setToggle(!toggle)
                                                setIsReply(!isReply)
                                                setText("")
                                                // setCommentAuthor("@" + comment.author + " ")
                                            }} >BALAS</button>
                                            <div className="more-wrapper">
                                                <MoreItem
                                                    _id={data._id}
                                                    commentId={comment._id}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {comment.reply.map(reply => {
                                        return (
                                            <div className="comment-reply-content" key={reply._id} >
                                                <p className="comment-author">@{reply.author.name}</p>
                                                <p className="comment-text">
                                                    {reply.text.split("\n").map((item, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                {item}
                                                                <br />
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </p>
                                                <div className="reply-wrapper">
                                                    <button className="button-reply" onClick={() => {
                                                        setCommentId(comment._id)
                                                        setToggle(!toggle)
                                                        setIsReply(!isReply)
                                                        setText("")
                                                        // setCommentAuthor("@" + reply.author + " ")
                                                    }}>BALAS</button>
                                                    <div className="more-wrapper">
                                                        <MoreItemreReply
                                                            _id={data._id}
                                                            commentId={comment._id}
                                                            replyId={reply._id}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )

    }
}

export default CommentItem;