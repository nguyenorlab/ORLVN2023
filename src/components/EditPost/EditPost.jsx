import React, { useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import NewsDetail from '../../pages/News/NewsDetail';
import { BsCalendarCheck, BsBuildingCheck, BsTerminal } from 'react-icons/bs';
import { Button } from '../../globalStyles';
import UploadFile from '../../components/UploadFile/UploadFile';
import { EditPostContext } from '../../api/api';


const InfoColumnJob = styled.div`
    padding-left: 30px;
    width: 100%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        padding-left: unset;
    }
`;

const TextWrapper = styled.div`
    padding-top: 0;

    @media screen and (max-width: 768px) {

    }
`;

const NewsDetailTitle = styled.p`
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-transform: capitalize;
`;

const NewsDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 70px;
`;

const PostInfo = styled.div`
  color: rgb(140, 146, 151);
  font-size: 12px;
  line-height: 16px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  
  @media screen and (max-width: 390px) {
    margin-right: 8px;
  }
`;

const CalendarIcon = styled(BsCalendarCheck)`
  margin-right: 10px;
`;

const CompanyIcon = styled(BsBuildingCheck)`
  margin-right: 10px;
`;

const TechIcon = styled(BsTerminal)`
  margin-right: 10px;
`;

const NewsDetailHeader = styled.h3`
  margin-bottom: 30px;
  font-size: 22px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-transform: capitalize;
`;

const NewsDetailText = styled.p`
  width: 100%;
  font-size: 17px;
  color: rgb(140, 146, 151);
  line-height: 1.5rem;
`;

const NewsDetailImg = styled.img`
  display: block;
  margin: auto;
  width: 400px;
  height: 400px;
  object-fit: contain;

  @media screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;


const EditPost = () => {
  // const allPostData = useContext(PostsContext);
  // const { id } = useParams();

  // const postData = allPostData.find((post) => post.id === Number(id));
  // console.log(postData);



  const [isEditing, setIsEditing] = useState(false);
  const { editedContent, editedTitle, editedCategory, editedDate, setEditedTitle, setEditedCategory, setEditedDate, handleEdit } = useContext(EditPostContext);
  console.log(editedTitle);

  // const [editedContent, setEditedContent] = useState(post.content);
  // const [editedTitle, setEditedTitle] = useState(post.title);
  // const [editedCategory, setEditedCategory] = useState(post.category);
  // const [editedDate, setEditedDate] = useState(post.date);

  
  // const handleEdit = (sectionIndex, itemIndex, newText) => {
  //   const newContent = [...editedContent];
  //   newContent[sectionIndex].data[itemIndex].text = newText;
  //   setEditedContent(newContent);
  // };

  const handleSave = async () => {

  };

  

  return (
    <InfoColumnJob>
      <TextWrapper>

        {isEditing ? (
          <input
            type='text'
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
        ) : (
          <NewsDetailTitle>{editedTitle}</NewsDetailTitle>
        )}
        <NewsDetailInfoContainer>
          {isEditing ? (
            <input
                type='text'
                value={editedDate}
                onChange={(event) => setEditedDate(event.target.value)}
              />
          ) : (          
            <PostInfo><CalendarIcon />{editedDate.split(' ')[0]}</PostInfo>
          )}
          {isEditing ? (
            <input
                type='text'
                value={editedCategory}
                onChange={(event) => setEditedCategory(event.target.value)}
              />
          ) : (          
            <PostInfo>{editedCategory === 'Company News' ? <CompanyIcon /> : <TechIcon />}{editedCategory}</PostInfo>
          )}
        </NewsDetailInfoContainer>

        {editedContent.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.data.map((item, itemIndex) => {   
              if(isEditing) {
                switch (item.type) {
                  case 'header':
                    return (
                      <input
                        key={`${sectionIndex}-${itemIndex}`}
                        type='text'
                        value={item.text}
                        onChange={(event) => handleEdit(sectionIndex, itemIndex, event.target.value)}
                      />
                    );
                  case 'paragraph':
                    return (
                      <input
                        key={`${sectionIndex}-${itemIndex}`}
                        type='text'
                        value={item.text}
                        onChange={(event) => handleEdit(sectionIndex, itemIndex, event.target.value)}
                      />
                    );
                  case 'image':
                    return <UploadFile key={`${sectionIndex}-${itemIndex}`}/>;
                  default:
                    return null;
                }
              } else {
                switch (item.type) {
                  case 'header':
                    // Render header
                    return <NewsDetailHeader key={`${sectionIndex}-${itemIndex}`}>{item.text}</NewsDetailHeader>;
                  case 'paragraph':
                    // Render paragraph
                    return <NewsDetailText key={`${sectionIndex}-${itemIndex}`}>{item.text}</NewsDetailText>;
                  case 'image':
                    // Render image
                    return <NewsDetailImg key={`${sectionIndex}-${itemIndex}`} src={item.src} alt='no-img' />;
                  default:
                    return null;
                }
              }
            })}
          </div>
        ))}
        {isEditing ? (
          <>
            <Button onClick={handleSave}>Save Changes</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>          
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </TextWrapper>
    </InfoColumnJob>
  );
};

export default EditPost;