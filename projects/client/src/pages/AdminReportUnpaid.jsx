/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LineChart from './LineChart';
import { FaLink } from 'react-icons/fa'

const TransactionUnpaid = () => {
   const [transactions, setTransactions] = useState([]);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [showGraph, setShowGraph] = useState(false);
   const token = localStorage.getItem("token");
   const handleStartDateChange = (date) => {
      setStartDate(date);
   };

   const handleEndDateChange = (date) => {
      setEndDate(date);
   };

   const toggleView = () => {
      setShowGraph(!showGraph);
   };

   useEffect(() => {
      async function fetchTransactions() {
         try {
            const startDateParam = startDate ? startDate.toISOString() : transactions[0]?.createdAt;
            const endDateParam = endDate ? endDate.toISOString() : transactions[transactions.length - 1]?.createdAt;

            const response = await axios.get('http://localhost:8000/admin/unpaid', {
               headers: {
                 "Authorization": `Bearer ${token}`
               },
               params: {
                  startDate: startDateParam,
                  endDate: endDateParam,
               },
            });
            setTransactions(response.data.data);
         } catch (error) {
            console.error('Error fetching transactions:', error);
         }
      }

      fetchTransactions();
   }, [startDate, endDate]);

   return (
      <div>
         <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
         />
         <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
         />

         <button onClick={toggleView}>
            {showGraph ? 'Show Table' : 'Show Graph'}
         </button>

         {showGraph ? (
            <LineChart transactions={transactions} />
         ) : (
            <Table variant="striped" colorScheme="teal">
               <TableCaption>Unpaid Transaction List</TableCaption>
               <Thead>
                  <Tr>
                     <Th>Transaction ID</Th>
                     <Th>User ID</Th>
                     <Th>Total Price</Th>
                     <Th>Total Item</Th>
                    
                     <Th>Created At</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {transactions.map((transaction) => (
                        <Tr key={transaction.id}>
                           <Td>{transaction.id}</Td>
                           <Td>{transaction.userId}</Td>
                           <Td>${transaction.totalPrice}</Td>
                           <Td>{transaction.totalItem}</Td>
                           
                           <Td>{format(new Date(transaction.createdAt), 'yyyy-MM-dd HH:mm:ss')}</Td>
                           <Td>
      <button
          onClick={() => { window.location.href = transaction.id.toString() }}
          style={{ fontSize: '12px', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
        >
          <FaLink style={{ marginRight: '4px' }} />
        </button>
      </Td>
                        </Tr>
                     
                  ))}
               </Tbody>
            </Table>
         )}
      </div>
   );
};

export default TransactionUnpaid;
