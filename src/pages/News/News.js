import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Container } from '../../globalStyles';


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
  height: auto;
  color: #707070;
  border: 3px solid #bdbdbd;
  font-size: 14px;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;

  input {
    display: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const JDSubtitle = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-decoration: underline;
  text-transform: uppercase;
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
  width: 40%;
`;

const NewsText = styled.div`
  width: 60%;
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



// sau thay = API
const allPostData = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Content 1',
    category: 'Company News',
    date: '2023-11-10',
    image: require('../../images/dev1.png'),
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content 2',
    category: 'Tech News',
    date: '2023-11-09',
    image: require('../../images/dev2.png'),
  },
  {
    id: 3,
    title: 'Post 3',
    content: 'Content 3',
    category: 'Company News',
    date: '2023-11-08',
    image: require('../../images/dev3.png'),
  },
  {
    id: 4,
    title: 'Post 4',
    content: 'Content 4',
    category: 'Tech News',
    date: '2023-11-07',
    image: require('../../images/dev1.png'),
  },
];

const News = () => {
  const uniqueCategories = [...new Set(allPostData.map(post => post.category))];
  const handleSelectCategory = useCallback(() => {

  },[]);


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
                    {allPostData.map((post, id) => (
                      <InfoColumnJob key={id}>
                        <TextWrapper>

                          <JDContainer>
                            <TitleContainer>
                              <JDSubtitle>{post.title}</JDSubtitle>
                                <PostInfoContainer>
                                  <PostInfo>{post.date}</PostInfo>
                                  <PostInfo>{post.category}</PostInfo>
                                </PostInfoContainer>
                            </TitleContainer>
                            <NewsContent>
                              <NewsImage src={post.image}/>
                              <NewsText>{post.content}</NewsText>
                            </NewsContent>
                          </JDContainer>
                        </TextWrapper>
                      </InfoColumnJob>
                    ))}
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