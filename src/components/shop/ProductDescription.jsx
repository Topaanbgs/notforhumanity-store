const DescriptionText = ({ description }) => (
  <p className="text-gray-700 whitespace-pre-line mb-4">
    {description}
  </p>
);

const ProductSpecs = ({ material, weight, care }) => (
  <div className="mt-4">
    <div className="text-gray-700 space-y-1 grid grid-cols-[100px_1fr] gap-x-2">
      <span className="font-medium col-span-1">Material:</span>
      <span className="col-span-1">{material || "Unknown"}</span>
      
      <span className="font-medium col-span-1">Weight:</span>
      <span className="col-span-1">{weight || "N/A"}</span>
      
      <span className="font-medium col-span-1">Care:</span>
      <span className="col-span-1">{care || "Refer to label"}</span>
    </div>
  </div>
);

const ProductDescription = ({ product }) => {
  return (
    <div className="mt-8">
      <h3 className="font-semibold text-lg pt-2 mb-2">Product Description</h3>
      
      <DescriptionText description={product.description} />
      
      <ProductSpecs 
        material={product.material}
        weight={product.weight}
        care={product.care}
      />
    </div>
  );
};

export default ProductDescription;