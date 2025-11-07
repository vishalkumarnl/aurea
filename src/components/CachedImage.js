import React, { useEffect, useState } from "react";

const CachedImage = ({ src, alt, ...props }) => {
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => setLoadedSrc(src);
  }, [src]);

  return (
    <img
      src={loadedSrc}
      alt={alt}
      loading="lazy"
      style={{"borderRadius": "10px"}}
      className="image"
      {...props}
    />
  );
};

export default CachedImage;
