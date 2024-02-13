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
  text-align: center;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size: 15px;
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

const LogTimeContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ request }) => request ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};
  gap: 8px;
`;

const LogTimeItem = styled.div`
  text-align: left;
  padding: 8px;
  border: 1px solid #ccc;
  margin: 2px;
  font-size: 15px;
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


  // Custom logic for rendering 'datetime' field
  const renderCellValue = (row, fieldName) => {
    const fieldValue = row[fieldName];

    if(fieldName === 'datetime') {
      if(Array.isArray(fieldValue)) {
        return fieldValue.map(entry => (
          <LogTimeContainer key={entry.date}>
            <LogTimeItem>{entry.date || 'null'}</LogTimeItem>
            <LogTimeItem>{`Check In: ${entry.checkin || 'null'}`}</LogTimeItem>
            <LogTimeItem>{`Check Out: ${entry.checkout || 'null'}`}</LogTimeItem>
          </LogTimeContainer>
        ));
      }
    }

    if(fieldName === 'requests') {
      if(Array.isArray(fieldValue)) {
        return fieldValue.map(entry => (
          <LogTimeContainer key={entry.createdAt} request>
            <LogTimeItem>{`Request Date: ${entry.createdAt || 'null'}`}</LogTimeItem>
            <LogTimeItem>{`Apply Date: ${entry.datetime || 'null'}`}</LogTimeItem>
            <LogTimeItem>{`Reason: ${entry.other_reason || 'null'}`}</LogTimeItem>
            <LogTimeItem>{`Request Type: ${entry.type || 'null'}`}</LogTimeItem>
          </LogTimeContainer>
        ))
      }
    }

    // Default rendering for other fields
    return row[fieldName];
  };


  return (
    <>
      <CreateButtonContainer>
        {typeName !== 'Users' && typeName !== 'Timekeeping' && typeName !== 'Request' ? (
          <CreateButton onClick={() => onCreate(typeName)}>{typeName === 'Gallery' ? 'Upload' : 'Create'}</CreateButton>
        ) : ''}        
      </CreateButtonContainer>
      <Table>
        <thead>
          <tr>
            {Object.keys(fields).map((field, index) => (
              <Th key={`${'fields_' + index}`}>{fields[field]}</Th>
            ))}
            {typeName !== 'Timekeeping' && typeName !== 'Request' && <Th>Action</Th>}
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
                    <Td key={`${'btn_' + columnIndex}`}>{renderCellValue(item, field)}</Td>   // for Timekeeping and Request
                    // <Td key={`${'btn_' + columnIndex}`}>{item[field]}</Td>
                  )}
                </React.Fragment>
              ))}

              {typeName !== 'Timekeeping' && typeName!== 'Request' && (
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
              )}
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