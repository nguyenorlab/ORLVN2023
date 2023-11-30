import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PostsContext } from '../../api/api';
import { db } from '../../config/firebase';
import { collection, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';
// import NewsDetail from '../../pages/News/NewsDetail';
// import { BsCalendarCheck, BsBuildingCheck, BsTerminal } from 'react-icons/bs';
import { Button } from '../../globalStyles';



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

// const NewsDetailTitle = styled.p`
//   margin-bottom: 20px;
//   font-size: 24px;
//   line-height: 24px;
//   color: rgb(0, 94, 141);
//   font-weight: bold;
//   text-transform: capitalize;
// `;

const NewsDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 70px;
`;

// const PostInfo = styled.div`
//   color: rgb(140, 146, 151);
//   font-size: 12px;
//   line-height: 16px;
//   margin-right: 20px;
//   display: flex;
//   align-items: center;
  
//   @media screen and (max-width: 390px) {
//     margin-right: 8px;
//   }
// `;

// const CalendarIcon = styled(BsCalendarCheck)`
//   margin-right: 10px;
// `;

// const CompanyIcon = styled(BsBuildingCheck)`
//   margin-right: 10px;
// `;

// const TechIcon = styled(BsTerminal)`
//   margin-right: 10px;
// `;

// const NewsDetailHeader = styled.h3`
//   margin-bottom: 30px;
//   font-size: 22px;
//   line-height: 24px;
//   color: rgb(0, 94, 141);
//   font-weight: bold;
//   text-transform: capitalize;
// `;

// const NewsDetailText = styled.p`
//   width: 100%;
//   font-size: 17px;
//   color: rgb(140, 146, 151);
//   line-height: 1.5rem;
// `;

// const NewsDetailImg = styled.img`
//   display: block;
//   margin: auto;
//   width: 400px;
//   height: 400px;
//   object-fit: contain;

//   @media screen and (max-width: 768px) {
//     width: 300px;
//     height: 300px;
//   }
// `;


const EditPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;

  const allPostData = useContext(PostsContext);
  const { displayId } = useParams();
  const [documentId, setDocumentId] = useState(null);

  const postData = allPostData.find((post) => post.displayId === Number(displayId));

  // const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(postData.title);
  const [editedContent, setEditedContent] = useState(postData.content);
  const [editedCategory, setEditedCategory] = useState(postData.category);
  const [editedDate, setEditedDate] = useState(postData.date);

  // -- get document ID from displayId -- //
  useEffect(() => {
    const getDocumentId = async () => {
      const postsCollection = collection(db, 'posts');
      const q = query(postsCollection, where('displayId', '==', Number(displayId))); 
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setDocumentId(doc.id);
      });
    };

    getDocumentId();
  }, [displayId]);

  
  const handleEdit = (sectionIndex, itemIndex, newText) => {
    const newContent = [...editedContent];
    newContent[sectionIndex].data[itemIndex].text = newText;
    setEditedContent(newContent);
  };

  const handleSave = async () => {
    const postRef = doc(db, 'posts', documentId);  
    const updatedPost = {
      title: editedTitle,
      date: editedDate,
      category: editedCategory,
      content: editedContent,
    };
  
    await updateDoc(postRef, updatedPost)
      .then(() => {
        console.log('Document successfully written!');
        navigate('/admin/dashboard', { state: { username: username }});
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const handleCancel = () => {
    navigate('/admin/dashboard', { state: { username: username }});
  };


  return (
    <InfoColumnJob>
      <TextWrapper>
        <input
          type='text'
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
        />
        <NewsDetailInfoContainer>
          <input
            type='text'
            value={editedDate}
            onChange={(event) => setEditedDate(event.target.value)}
          />
          <input
            type='text'
            value={editedCategory}
            onChange={(event) => setEditedCategory(event.target.value)}
          />
        </NewsDetailInfoContainer>

        {editedContent.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.data.map((item, itemIndex) => {
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
                // case 'image':
                //   // return <UploadFile key={`${sectionIndex}-${itemIndex}`}/>;
                //   return (
                //     <input
                //       key={`${sectionIndex}-${itemIndex}`}
                //       type='file'
                //       accept='image/*'
                //       onChange={(event) => handleEdit(section.section, itemIndex, event.target.value)}
                //     />
                //   );
                default:
                  return null;
              }
            })}
          </div>
        ))}

        <Button onClick={handleSave}>Save Changes</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </TextWrapper>
    </InfoColumnJob>
  );
};

export default EditPost;