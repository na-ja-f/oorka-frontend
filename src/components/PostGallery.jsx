import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";




function PostGallery({ post }) {
    const images = post.imageUrl || [];
    const dispatch = useDispatch()
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser)
    const userId = user._id || ""

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        console.log('hello');
        const interValid = setInterval(() => {
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
            }, 500)
        }, 5000)
        return () => clearInterval(interValid)
    }, [images.length])

    return (
        <div className="relative">
            <img className='h-64 rounded-md cursor-pointer w-full ' src={images[currentImageIndex]} alt="images" />
        </div>
    )
}

export default PostGallery
