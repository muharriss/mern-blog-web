import React, { useEffect, useState } from "react";

const UseBodyScrollLock = () => {
    const bodyStyle = document.body.style

    const [isLocked, setIsLocked] = useState(bodyStyle.overflow === 'hidden')

    useEffect(() => {
        bodyStyle.overflow = isLocked ? 'hidden' : 'auto'
    }, [isLocked, bodyStyle])

    const scrollToggle = () => {
        setIsLocked(!isLocked)
    }

    return [isLocked, scrollToggle]
}

export default UseBodyScrollLock