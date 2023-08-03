import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    return (
        <SimpleGrid columns={3} spacing={10}>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </SimpleGrid>
    );
};

export default ProductList;