import React, { useEffect, useRef, useState } from "react";

function ImageMagnifier(props) {
    const zoomPreview = useRef(null)
    const gfgImg = useRef(null)
    
    const [ofsX, setofsX] = useState()
    const [ofsY, setofsY] = useState()
    useEffect(() => {
        if (zoomPreview.current) {
            setofsX(zoomPreview.current.offsetWidth / 100)
            setofsY(zoomPreview.current.offsetHeight / 100)
        }
        zoomPreview.current.style.display = "none";
    }, [])

    function mouseMove(e){
        if (gfgImg.current && zoomPreview.current) {
            const rect = gfgImg.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            const imgWidth = gfgImg.current.offsetWidth;
            const imgHeight = gfgImg.current.offsetHeight;
    
            const bgSizeX = imgWidth * 2; // Example: 2x zoom
            const bgSizeY = imgHeight * 2; // Example: 2x zoom
    
            console.log('Background Size:', bgSizeX, bgSizeY);
    
            zoomPreview.current.style.display = "block";
            zoomPreview.current.style.backgroundImage = `url(${props.imgsrc})`; 
            zoomPreview.current.style.backgroundSize = `${bgSizeX}px ${bgSizeY}px`;
            zoomPreview.current.style.backgroundPosition = `-${x}px -${y}px`; // Adjust based on actual size
        }
    }

    function mouseOut(){
        zoomPreview.current.style.backgroundImage = "none";
        zoomPreview.current.style.display = "none";
    }
  return (
    <div className="magnify-main">
      <img src={props.imgsrc} onMouseMove={(e) => mouseMove(e)} onMouseOut={(e) => mouseOut(e)} ref={gfgImg} />
      <div className="zoom-preview" ref={zoomPreview} ></div>
    </div>
  );
}

export default ImageMagnifier;
