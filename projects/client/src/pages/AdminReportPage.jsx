import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { useLoaderData, useParams } from 'react-router-dom'


const TransactionList = () => {
    const {id} = useParams();
    const currTransaction = useLoaderData().data.Transaction_Products;
    console.log(currTransaction)


    return (
        <div>
            <Table variant="striped" colorScheme="teal">
                <TableCaption>Transaction List</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Product Name</Th>
                        <Th>Product Price</Th>
                        <Th>Quantity</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currTransaction.map(transaction => (
                        <Tr key={transaction.id}>
                            <Td>{transaction.Product.productName}</Td>
                            <Td>${transaction.Product.productPrice}</Td>
                            <Td>{transaction.quantity}</Td>
                        </Tr>
                     
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};
export default TransactionList;

export const currentTransactionLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(`http://localhost:8000/admin/transaction/${id}`)

    return res.json();
}

