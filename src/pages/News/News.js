import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../globalStyles';
import Pagination from '../../components/Pagination/Pagination';
import { BsCalendarCheck, BsBuildingCheck } from 'react-icons/bs';

const InfoSec = styled.div`
    color: #fff;
    padding: 70px 0;
    background: ${({lightBg}) => (lightBg ? '#fff' : '#10152')};
`;

const InfoRow = styled.div`
    display: flex;
    /* margin: 0 -15px -15px -15px; */
    flex-wrap: wrap;
    /* align-items: center; */
    flex-direction: ${({imgStart}) => (imgStart ? 'row-reverse' : 'row')};
`;

const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    color: ${({lightText}) => (lightText ? '#f7f8fa' : '#1c2237')};    
`;

const TopLine = styled.div`
    color: ${({ligthTopLine}) => (ligthTopLine ? '#a9b3c1' : '#4b59f7')};
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
`;

const InfoColumnImg = styled.div`
    margin-top: 48px;
    /* max-width: 30%; */
    width: 100%;
    align-items: left;
    align-self: flex-start;
    height: auto;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const InfoColumnJob = styled.div`
    /* margin-bottom: 15px; */
    padding-left: 15px;
    flex: 1;
    /* max-width: 70%; */
    width: 100%;
    flex-basis: 50%;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
`;

const TextWrapper = styled.div`
    padding-top: 0;
    /* padding-bottom: 60px; */

    @media screen and (max-width: 768px) {
        padding-bottom: 65px;
    }
`;

const JDContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  /* height: auto; */
  height: 250px;
  color: #707070;
  border: 3px solid #bdbdbd;
  font-size: 14px;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  transition: all 0.5s ease-out;

  input {
    display: none;
  }

  &:hover {
    box-shadow: rgb(0, 94, 141) 10px 18px 15px 0px;
    transform: translateY(-20px);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const JDSubtitle = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostInfo = styled.div`
    color: rgb(140, 146, 151);
    font-size: 12px;
    line-height: 16px;
    margin-right: 20px;
    display: flex;
    align-items: center;
`;

const CalendarIcon = styled(BsCalendarCheck)`
  margin-right: 10px;
`;

const CompanyIcon = styled(BsBuildingCheck)`
  margin-right: 10px;
`;

// const JDText = styled.div`
//   font-size: 18px;
//   line-height: 24px;
//   color: rgb(140, 146, 151);
// `;

const OpenningContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const JobsOpeningList = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 24px;
  color: white;
  margin-right: 10px;
  width: 100%;
  background-color: rgb(0, 94, 141);
  padding: 10px;
  margin: 5px 0px;
  cursor: pointer;
  clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
  transition: all 0.5s ease-out;
  &:hover{
    background-color: rgb(28 150 212);
  }
`;

const JobListContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: auto;
  color: #707070;
  border: 3px solid #bdbdbd;
  font-size: 14px;
  border-radius: 10px;
  padding: 30px;

  input {
    display: none;
  }
`;

const JobListHeading = styled.h2`
    margin-bottom: 39px;
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;    
`;

const NewsContent = styled.div`
  width: 100%;
  display: flex;
`;

const NewsImage = styled.img`
  /* width: 40%; */
  width: 300px;
  height: 150px;
  object-fit: contain;
`;

const NewsText = styled.div`
  width: 100%;
  font-size: 17px;
  color: rgb(140, 146, 151);
  line-height: 1.5rem;
  /* display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical; */
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-top: 48px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledButton = styled.button`
    align-self: flex-end;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px;
    background: rgb(0, 94, 141);
    color: white;
    text-decoration: none;
    text-transform: capitalize;
    border: none;
    width: 110px;
    transition: all 0.5s ease-out;
    &:hover{
        cursor: pointer;
        background-color: rgb(28 150 212);
    }
`;


// sau thay = API
const allPostData = [
  {
    id: 1,
    title: 'Post 1 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    content: 'Content 1 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!Content 1 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    category: 'Company News',
    date: '2023-11-10',
    image: require('../../images/dev1.png'),
  },
  {
    id: 2,
    title: 'Post 2 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    content: 'Content 2 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    category: 'Tech News',
    date: '2023-11-09',
    image: require('../../images/dev2.png'),
  },
  {
    id: 3,
    title: 'Post 3 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    content: 'Content 3 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    category: 'Company News',
    date: '2023-11-08',
    image: require('../../images/dev3.png'),
  },
  {
    id: 4,
    title: 'Post 4 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    content: 'Content 4 --- Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorum cum nulla, vitae nam eius veritatis tenetur. Culpa magnam pariatur voluptate illo aliquam repellendus cumque, nulla fugiat? Laborum, unde atque!',
    category: 'Tech News',
    date: '2023-11-07',
    image: require('../../images/dev1.png'),
  },
];

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const maxLength = 200;

 // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPostData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const uniqueCategories = [...new Set(allPostData.map(post => post.category))];
  const handleSelectCategory = useCallback(() => {

  },[]);


  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    const subString = str.substr(0, num);
    return (subString.substr(0, subString.lastIndexOf('')) + '...');
  };


  return (
    <>
        <InfoSec>
          <Container>            
            <TopLine>News</TopLine>
            <Heading>All Posts</Heading>
            <InfoRow>

              <LeftContainer>
                <InfoColumnImg>
                  <TextWrapper>
                    <JobListHeading>News Category</JobListHeading>
                    <JobListContainer>
                      {uniqueCategories.map((item, id) => (
                        <OpenningContainer key={id}>
                          <JobsOpeningList onClick={() => handleSelectCategory(item.id)}>{item}</JobsOpeningList>
                        </OpenningContainer>
                      ))}
                    </JobListContainer>
                  </TextWrapper>
                </InfoColumnImg>

                <InfoColumnImg>
                  <TextWrapper>
                    <JobListHeading>Recent Posts</JobListHeading>
                    <JobListContainer>

                    </JobListContainer>
                  </TextWrapper>
                </InfoColumnImg>
              </LeftContainer>

              <RightContainer>
                {allPostData ? 
                  <>
                    {currentPosts.map((post, id) => (
                      <InfoColumnJob key={id}>
                        <TextWrapper>

                          <JDContainer>

                            <TitleContainer>
                              <JDSubtitle>{post.title}</JDSubtitle>
                                <PostInfoContainer>
                                  <PostInfo>
                                    <CalendarIcon />
                                    {post.date}
                                  </PostInfo>
                                  <PostInfo>
                                    <CompanyIcon />
                                    {post.category}
                                  </PostInfo>
                                </PostInfoContainer>
                            </TitleContainer>

                            <NewsContent>
                              <NewsImage src={post.image}/>
                              <ContentContainer>
                                <NewsText>{truncate(post.content, maxLength)}</NewsText>
                                <StyledButton>Read More</StyledButton>
                              </ContentContainer>
                            </NewsContent>

                          </JDContainer>
                        </TextWrapper>
                      </InfoColumnJob>
                    ))}
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={allPostData.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </>
                : 'No Post'
                }
              </RightContainer>

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default News