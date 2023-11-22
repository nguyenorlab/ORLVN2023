import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import Pagination from '../Pagination/Pagination';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* padding-left: 30px;
  padding-right: 30px; */
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CreateButton = styled(Button)`
  margin-bottom: 20px;
`;

const EditButton = styled(Button)`
  background-color: #ffc300;
  padding: 8px 15px;
  margin: 0px 10px 10px 0px;
`;

const DeleteButton = styled(Button)`
  background-color: #e80a0ac8;
  padding: 8px 15px;
  margin: 0px 10px 10px 0px;
`;



const DataTable = ({ data, fields, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);
  console.log(paginatedData);

  return (
    <>
      <CreateButtonContainer>
        <CreateButton onClick={() => alert('Create button clicked')}>Create</CreateButton>
      </CreateButtonContainer>
      <Table>
        <thead>
          <tr>
            {Object.values(fields).map((field, index) => (
              <Th key={index}>{field}</Th>
            ))}
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {Object.keys(fields).map((field, index) => (
                <Td key={index}>{item[field]}</Td>
              ))}
              <Td>
                <EditButton onClick={() => onEdit(item)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(item)}>Delete</DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={Math.ceil(data.length / postsPerPage)}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default DataTable;