import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import Pagination from '../Pagination/Pagination';
import Modal from 'react-modal';


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
  color: rgb(0, 94, 141);
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 15px;
  color: rgb(140, 146, 151);
  font-weight: 400;
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
  margin: 0 auto;
  display: block;
`;

const ResetButton = styled(Button)`
  padding: 8px 15px;
  margin: 0 auto;
  display: block;
`;

const DeleteButton = styled(Button)`
  background-color: #e80a0ac8;
  padding: 8px 15px;
  margin: 5px auto;
  display: block;
`;

const StyledThumb = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px; 
`;

// const LogTimeContainer = styled.div`
//   display: grid;
//   grid-template-columns: ${({ request }) => request ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};
//   gap: 8px;
// `;

// const LogTimeItem = styled.div`
//   text-align: left;
//   padding: 8px;
//   border: 1px solid #ccc;
//   margin: 2px;
//   font-size: 15px;
// `;

const Title = styled.h4`
  font-size: 25px;
  line-height: 1.1;
  color: rgb(0, 94, 141);
  text-transform: uppercase;
  margin-top: 30px;
`;

const CloseButton = styled(Button)`
  padding: 0px 10px;
  height: 30px;
  margin: 10px auto;
  display: block;
`;

const ActionButton = styled(Button)`
  margin: 0 auto;
  display: block;
`;


Modal.setAppElement('#root')


const DataTable = ({ data, fields, onEdit, onDelete, onCreate, onResetPassword, typeName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [paginatedData, setPaginatedData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);


  const renderDateRange = (dates) => {
    if (Array.isArray(dates)) {  
      // Sort the dates
      const sortedDates = dates.sort();
    
      // Get the first and last date
      const firstDate = sortedDates[0];
      const lastDate = sortedDates[sortedDates.length - 1];
    
      // Return the date range
      return `${firstDate} ~ ${lastDate}`;
    } else {
      // If not an array, return the value
      return dates || 'null';
    }
  };


  const showMoreData = (row, fieldName) => {
    let content;
    switch(fieldName) {
      case 'datetime':
        content = (
          <Table>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Check In</Th>
                <Th>Check Out</Th>
              </tr>
            </thead>
            <tbody>
              {row[fieldName].map((entry, index) => (
                <tr key={index}>
                  <Td>{entry.date || 'null'}</Td>
                  <Td>{entry.checkin || 'null'}</Td>
                  <Td>{entry.checkout || 'null'}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
        break;

      case 'requests':
        content = (
          <Table>
            <thead>
              <tr>
                <Th>Request Date</Th>
                <Th>Apply Date</Th>
                <Th>Request Type</Th>
                <Th>Reason</Th>
              </tr>
            </thead>
            <tbody>
              {row[fieldName].map((entry, index) => (
                <tr key={index}>
                  <Td>{entry.createdAt || 'null'}</Td>
                  <Td>{renderDateRange(entry.datetime)}</Td>
                  <Td>{entry.type || 'null'}</Td>
                  <Td>{entry.other_reason || 'null'}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        );

        break;
      default:
        content = <Title>No data available</Title>;
    }
    setModalContent(content);
    setModalIsOpen(true);
  };


  const closeModal = () => {
    setModalIsOpen(false);
  };


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


  // Custom logic for rendering 'datetime' and 'requests' field (database's field)
  // const renderCellValue = (row, fieldName) => {
  //   const fieldValue = row[fieldName];

  //   if(fieldName === 'datetime') {
  //     if(Array.isArray(fieldValue)) {

  //       return fieldValue.map(entry => (
  //         <LogTimeContainer key={entry.date}>
  //           <LogTimeItem>{entry.date || 'null'}</LogTimeItem>
  //           <LogTimeItem>{`Check In: ${entry.checkin || 'null'}`}</LogTimeItem>
  //           <LogTimeItem>{`Check Out: ${entry.checkout || 'null'}`}</LogTimeItem>
  //         </LogTimeContainer>
  //       ));
  //     }
  //   }

  //   if(fieldName === 'requests') {
  //     if(Array.isArray(fieldValue)) {
  //       const limitedData = fieldValue.slice(0, 1);
  //       const hasMoreData = fieldValue.length > 1;

  //       return (
  //         <>
  //           {limitedData.map(entry => (
  //             <LogTimeContainer key={entry.createdAt} request>
  //               <LogTimeItem>{`Request Date: ${entry.createdAt || 'null'}`}</LogTimeItem>
  //               <LogTimeItem>{`Apply Date: ${entry.datetime || 'null'}`}</LogTimeItem>
  //               <LogTimeItem>{`Reason: ${entry.other_reason || 'null'}`}</LogTimeItem>
  //               <LogTimeItem>{`Request Type: ${entry.type || 'null'}`}</LogTimeItem>
  //             </LogTimeContainer>
  //           ))}
  //           {hasMoreData && <Button onClick={() => showMoreData(row, fieldName)}>Request Info</Button>}
  //         </>
  //       )
  //     }
  //   }

  //   // Default rendering for other fields
  //   return row[fieldName];
  // };


  return (
    <>
      <CreateButtonContainer>
        {typeName !== 'Users' && typeName !== 'Timekeeping' && typeName !== 'Request' ? (
          <CreateButton onClick={() => onCreate(typeName)}>{typeName === 'Gallery' ? 'Upload' : 'Create'}</CreateButton>
        ) : ''}        
      </CreateButtonContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Detail Data'
      >
        <Title>Detail Data</Title>
          {modalContent}
        <CloseButton onClick={closeModal}>Close</CloseButton>
      </Modal>


      <Table>
        <thead>
          <tr>
            {Object.keys(fields).map((field, index) => (
              <Th key={`${'fields_' + index}`}>{fields[field]}</Th>
            ))}
            {/* {typeName !== 'Timekeeping' && typeName !== 'Request' && <Th>Action</Th>} */}
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
                    // <Td key={`${'btn_' + columnIndex}`}>{renderCellValue(item, field)}</Td>   // for Timekeeping and Request
                    <Td key={`${'btn_' + columnIndex}`}>{item[field]}</Td>
                  )}
                </React.Fragment>
              ))}

              {/* {typeName !== 'Timekeeping' && typeName!== 'Request' && ( */}
              <Td>
                {typeName === 'Users' ? (
                  <ResetButton onClick={() => onResetPassword(item)}>Reset Password</ResetButton>
                ) : (
                  <>
                    {typeName === 'Gallery' ? (
                      <DeleteButton onClick={() => onDelete(item)}>Delete</DeleteButton>
                    ) : (                        
                      <>
                        {typeName === 'Request' ? (
                          <ActionButton onClick={() => showMoreData(item, 'requests')}>Request Info</ActionButton>
                        ) : (
                          <>
                            {typeName === 'Timekeeping' ? (
                              <ActionButton onClick={() => showMoreData(item, 'datetime')}>Log Time Sheet</ActionButton>
                            ) : (
                              <>
                                <EditButton onClick={() => onEdit(item)}>Edit</EditButton>
                                <DeleteButton onClick={() => onDelete(item)}>Delete</DeleteButton>
                              </>
                            )}
                          </>
                        )}
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