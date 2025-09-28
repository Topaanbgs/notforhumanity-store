const ThumbnailButton = ({ image, isSelected, onClick, index }) => (
  <button 
    onClick={() => onClick(image)} 
    className={`w-24 h-24 p-1 rounded border ${
      isSelected ? "border-red-600" : "border-gray-200"
    }`}
  >
    <img 
      src={image} 
      alt={`thumbnail-${index}`} 
      className="w-full h-full object-cover rounded" 
    />
  </button>
);

const MainImage = ({ image, productName }) => (
  <div className="flex-1">
    <img 
      src={image} 
      alt={productName} 
      className="w-full h-[360px] object-contain mb-4" 
    />
  </div>
);

const ImageGallery = ({ 
  images, 
  selectedImage, 
  onImageSelect, 
  productName 
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <ThumbnailButton
            key={index}
            image={image}
            isSelected={selectedImage === image}
            onClick={onImageSelect}
            index={index}
          />
        ))}
      </div>
      <MainImage 
        image={selectedImage} 
        productName={productName} 
      />
    </div>
  );
};

export default ImageGallery;