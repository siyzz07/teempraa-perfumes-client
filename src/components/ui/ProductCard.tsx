
import ProductCardImage from './product-card/ProductCardImage';
import ProductCardInfo from './product-card/ProductCardInfo';
import ProductCardActions from './product-card/ProductCardActions';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  scentType: string;
  onClick?: () => void;
}

const ProductCard = (props: ProductCardProps) => {
  const { id, name, price, originalPrice, images, scentType, onClick } = props;

  const mainImage = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400';

  const handleDetails = () => {
    if (onClick) onClick();
  };

  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full"
    >
      <ProductCardImage image={mainImage} name={name} scentType={scentType} />

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <ProductCardInfo name={name} price={price} originalPrice={originalPrice} />
        <ProductCardActions onOrderNow={handleDetails} />
      </div>
    </div>
  );
};

export default ProductCard;
