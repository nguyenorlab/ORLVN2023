import React, { useState, useEffect } from 'react';
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

const ResetButton = styled(Button)`
  padding: 8px 15px;
  margin: 0px 10px 10px 0px;
`;

const DeleteButton = styled(Button)`
  background-color: #e80a0ac8;
  padding: 8px 15px;
  margin: 0px 10px 10px 0px;
`;

const StyledThumb = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px; 
`;


const DataTable = ({ data, fields, onEdit, onDelete, onCreate, onResetPassword, typeName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [paginatedData, setPaginatedData] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const tmpPaginatedData = data.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    if(tmpPaginatedData.length < 1) {
      setPaginatedData(data);
      setCurrentPage(1);
    } else {
      setPaginatedData(tmpPaginatedData);
    }
  },[currentPage, data, postsPerPage]);

  return (
    <>
      <CreateButtonContainer>
        {typeName !== 'Users' ? (
          <CreateButton onClick={() => onCreate(typeName)}>{typeName === 'Gallery' ? 'Upload' : 'Create'}</CreateButton>
        ) : ''}        
      </CreateButtonContainer>
      <Table>
        <thead>
          <tr>
            {Object.keys(fields).map((field, index) => (
              <Th key={`${'fields_' + index}`}>{fields[field]}</Th>
            ))}
            <Th>Action</Th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item, rowIndex) => (
            <tr key={`${'paginatedData_' + rowIndex}`}>
              {Object.keys(fields).map((field, columnIndex) => (
                <React.Fragment key={`${'field_' + columnIndex}`}>
                  {typeName === 'Gallery' ? (
                    field === 'displayId' ? (
                      <Td key={`${'displayId_' + columnIndex}`}>{item[field]}</Td>
                    ) : (
                      <Td key={`${'img_' + columnIndex}`}>
                        <StyledThumb src={item[field]} />
                      </Td>
                    )
                  ) : (
                    <Td key={`${'btn_' + columnIndex}`}>{item[field]}</Td>
                  )}
                </React.Fragment>
              ))}
              <Td>
                {typeName === 'Users' ? (
                  <ResetButton onClick={() => onResetPassword(item)}>Reset Password</ResetButton>
                ) : (
                  <>
                    {typeName === 'Gallery' ? (
                      <DeleteButton onClick={() => onDelete(item)}>Delete</DeleteButton>
                    ) : (
                      <>
                        <EditButton onClick={() => onEdit(item)}>Edit</EditButton>
                        <DeleteButton onClick={() => onDelete(item)}>Delete</DeleteButton>
                      </>
                    )}
                  </>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default DataTable;