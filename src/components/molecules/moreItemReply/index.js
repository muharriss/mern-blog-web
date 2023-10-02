import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';

const MoreItemreReply = (props) => {

    const [moreToggle, setMoreToggle] = useState(false)

    const confirmDelate = () => {
        confirmAlert({
            title: 'Confirm to Delate',
            message: 'Apakah Anda Yakin Ingin Menghapus Balasan ini?',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => {

                        const token = localStorage.getItem('token');
                            axios.delete(`https://mern-blog-api.cyclic.cloud/v1/blog/post/${props._id}/comment/${props.commentId}/reply/${props.replyId}`,
                                {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                })
                                .then(res => {
                                    console.log('delete success: ', res.data)
                                    window.location.reload()
                                })
                                .catch(err => {
                                    console.log('err: ', err)
                                    alert(err.response.data.message)
                                })
                    }
                },
                {
                    label: 'Tidak',
                    onClick: () => console.log('user tidak setuju')
                }
            ]
        });
    }

    return (
        <div className="more-co">
            <span className="material-symbols-outlined" onClick={() => setMoreToggle(!moreToggle)}>
                more_horiz
            </span>
            <p className={moreToggle ? "display-blok commentItem-delate" : 'display-none'} onClick={confirmDelate}>Delate</p>
        </div>
    )
}

export default MoreItemreReply