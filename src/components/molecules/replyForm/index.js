import React, { useState } from "react";
import "./replyForm.css"
import { Button } from "../../atoms";

const ReplyForm = (props) => {
    return (
        <div className="replyForm-co">
            <div className="replyForm-wrapper">
                <div className="replyForm-contain">
                    <div className="replyForm-title-wrapper">
                        <p>Balas Komentar</p>
                        <span onClick={props.hendleToggle} className="material-symbols-outlined">
                            close
                        </span>
                    </div>
                    <br />
                    <textarea placeholder="Ketik komentar" className="replyForm-textArea" onChange={props.onChange} value={props.value} defaultValue={props.defaultValue}/>
                    <div className={props.buttonDisable ? "replyForm-button2" : 'replyForm-button'}>
                        <Button title="Komen" onClick={props.onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReplyForm