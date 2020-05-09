import React from 'react'
import './ImageList.css'
import ImageCard from './ImageCard'

const ImageList = ({ images }) => {
    const list = images.map(image => <ImageCard key={image.id} image={image} />)

    return <div className="image-list">{list}</div>
}

export default ImageList