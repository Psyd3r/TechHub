
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-gray-900/50 border-gray-800 overflow-hidden">
      <div className="relative">
        <img 
          src={`https://images.unsplash.com/${product.image}?w=400&h=300&fit=crop`}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Fora de Estoque</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</span>
          <span className="text-xs text-gray-500 ml-2">•</span>
          <span className="text-xs text-gray-400 ml-2">{product.category}</span>
        </div>
        
        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#4ADE80] transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`text-xs ${i < product.rating ? 'text-yellow-400' : 'text-gray-600'}`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.rating}/5)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#4ADE80]">
            R$ {product.price.toLocaleString('pt-BR')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              R$ {product.originalPrice.toLocaleString('pt-BR')}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <button 
          className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
            product.inStock 
              ? 'bg-[#4ADE80] text-black hover:bg-[#22C55E] hover:scale-105'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </CardFooter>
    </Card>
  );
};
