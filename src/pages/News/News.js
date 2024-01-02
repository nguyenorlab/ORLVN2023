import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../globalStyles';
import Pagination from '../../components/Pagination/Pagination';
import { BsCalendarCheck, BsBuildingCheck, BsTerminal } from 'react-icons/bs';
import { PostsContext } from '../../api/api';
import { useTranslation } from 'react-i18next';



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
    font-size: 46px;
    line-height: 1.1;
    color: rgb(0, 94, 141);    
`;

const TopLine = styled.div`
    color: ${({ligthTopLine}) => (ligthTopLine ? '#a9b3c1' : '#4b59f7')};
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
`;

const InfoColumnImg = styled.div`
    /* margin-top: 48px; */
    margin-top: 30px;
    /* max-width: 30%; */
    width: 100%;
    align-items: left;
    align-self: flex-start;
    height: auto;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        margin-top: 30px;
        /* display: flex; */
        /* justify-content: center; */
    }
`;

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

const JDContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  height: 250px;
  color: #707070;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

// const JDText = styled.div`
//   font-size: 18px;
//   line-height: 24px;
//   color: rgb(140, 146, 151);
// `;

// const OpenningContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

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
  /* border: 3px solid #bdbdbd; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  border-radius: 10px;
  padding: 20px;

  input {
    display: none;
  }

  // 15/11/2023
  @media screen and (max-width: 768px) {
    flex-direction: ${({post}) => (post ? 'row' : 'column')};
    padding: 15px;
  }
`;

const JobListHeading = styled.h2`
    margin-bottom: ${({ bottom }) => bottom ? '10px' : 'unset'};
    font-size: 20px;
    line-height: 1.1;
    color: rgb(0, 94, 141);
    font-style: italic;
    
    @media screen and (max-width: 768px) {
      margin-bottom: 10px
    }
`;

const NewsContent = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 768px) {
    align-items: flex-end;
  }
`;

const NewsImage = styled.img`
  width: 30%;
  height: 150px;
  object-fit: contain;
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    width: 50%;
    margin-right: 10px;
  }
`;

const NewsText = styled.div`
  width: 100%;
  font-size: 17px;
  color: rgb(140, 146, 151);
  line-height: 1.5rem;
  margin-bottom: 15px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  // 15/11/2023
  @media screen and (max-width: 768px) {
    /* flex-direction: row; */
    width: 100%;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  /* margin-top: 48px; */
  margin-top: 50px;

  // 15/11/2023
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  /* @media screen and (max-width: 390px) {
    width: 50%;
  } */
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

const RecentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RecentImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: contain;
  border: 1px inset;
  margin: 0px 5px 10px 0px;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const RecentTitle = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 14px;
  color: rgb(0, 94, 141);
  font-weight: normal;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 18px;
  cursor: pointer;
`;

const RecentDate = styled.p`
  color: rgb(140, 146, 151);
  font-size: 12px;
  line-height: 16px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

const NewsDetailTitle = styled.p`
  margin-bottom: 20px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0, 94, 141);
  font-weight: bold;
  text-transform: capitalize;
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
  text-align: justify;
  hyphens: auto;
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

const NewsDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 70px;
`;




const NewsDetail = ({ post }) => {
  const { t } = useTranslation('News');

  return (
    <InfoColumnJob>
      <TextWrapper>
        <NewsDetailTitle>{t(`${post.title}`)}</NewsDetailTitle>
        <NewsDetailInfoContainer>
          <PostInfo><CalendarIcon />{post.date.split(' ')[0]}</PostInfo>
          <PostInfo>{post.category === 'Company News' ? <CompanyIcon /> : <TechIcon />}{t(`${post.category}`)}</PostInfo>
        </NewsDetailInfoContainer>
        {post.content.map((section, index) => (
          <div key={index}>
            {section.data.map((item, index) => {
              switch (item.type) {
                case 'header':
                  // Render header
                  return <NewsDetailHeader key={index}>{t(`${item.text}`)}</NewsDetailHeader>;
                case 'paragraph':
                  // Render paragraph
                  return <NewsDetailText key={index}>{t(`${item.text}`)}</NewsDetailText>;
                case 'image':
                  // Render image
                  return <NewsDetailImg key={index} src={t(`${item.text}`)} alt='no-img' />;
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </TextWrapper>
    </InfoColumnJob>
  );
};



const News = () => {
  const { t } = useTranslation('News');

  const allPostData = useContext(PostsContext);
  const navigate = useNavigate();
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [titleCategory, setTitleCategory] = useState('All Posts');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentReadMorePost, setCurrentReadMorePost] = useState(null);
  const [postsPerPage] = useState(3);
  const maxLengthContent = 200;
  const maxLengthTitleRecent = 50;

  // id match with Route path in App.js
  // handle direct access from URL
  const { id } = useParams();
  useEffect(() => {
    if(id) {
      const postFromUrl = allPostData.find(job => job.id === Number(id));
      setCurrentReadMorePost(postFromUrl);
    }
  },[allPostData, id]);


  // Change page
  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  },[]);


  const uniqueCategories = [...new Set(allPostData.map(post => post.category))];
  const handleSelectCategory = useCallback((category) => {
    const newPosts = allPostData.filter(post => post.category === category);
    const newCategory = [...new Set(newPosts.map((item) => item.category))];
    setFilteredCategory(newPosts);
    setTitleCategory(newCategory);
    setCurrentPage(1);
  },[allPostData]);


  const handleSelectAllPosts = useCallback(() => {
    setFilteredCategory(null);
    setTitleCategory('All Posts');
    setCurrentPage(1);
  },[]);

  const postsToShow = filteredCategory || allPostData;

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const [currentPosts, setCurrentPost] = useState(postsToShow.slice(indexOfFirstPost, indexOfLastPost));
  const currentPosts = postsToShow.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(currentPosts);

  // shorten text content 
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    const subString = str.substr(0, num);
    return (subString.substr(0, subString.lastIndexOf('')) + '...');
  };

  // get 3 latest posts
  const recentPosts = allPostData
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);


  const [tmpPost, setTmpPost] = useState(null);
  const handleReadMore = useCallback((post) => {
    setTmpPost(post);
  },[]);  
  
  // hearing if tmpPost is changed setCurrentReadMorePost to new value
  useEffect(() => {
    if(tmpPost) {
      setCurrentReadMorePost(tmpPost);
      navigate(`/news/${tmpPost.category?.toLowerCase().replace(' ', '-')}/${tmpPost.displayId}/${tmpPost.title?.toLowerCase().replace(' ', '-')}`);    }
  },[navigate, tmpPost]);
  // ----- //


  // to handle click category from NewsDetail
  const handleSelectCategoryFromDetail = useCallback((category) => {
    setTmpPost(null);
    setCurrentReadMorePost(null);
    handleSelectCategory(category);
    navigate(`/news/${category.toLowerCase().replace(' ', '-')}`);
  },[handleSelectCategory, navigate]);


  const handleSelectAllPostsFromDetail = useCallback(() => {
    setTmpPost(null);
    setCurrentReadMorePost(null);
    handleSelectAllPosts();
    navigate(`/news`);    
  },[handleSelectAllPosts, navigate]);



  return (
    <>
        <InfoSec>
          <Container>            
            <TopLine>{t('News')}</TopLine>
            <Heading>{t(`${titleCategory}`)}</Heading>
            <InfoRow>

              <LeftContainer>
                <JobListHeading>{t('News Category')}</JobListHeading>
                <InfoColumnImg>
                  <TextWrapper>
                    <JobListContainer post={true}>
                      {uniqueCategories.map((item, id) => (
                        <JobsOpeningList key={id} onClick={() => handleSelectCategoryFromDetail(item)}>{t(`${item}`)}</JobsOpeningList>
                      ))}
                      <JobsOpeningList onClick={handleSelectAllPostsFromDetail}>{t('All Posts')}</JobsOpeningList>
                    </JobListContainer>
                  </TextWrapper>
                </InfoColumnImg>

                <InfoColumnImg>
                  <TextWrapper>
                    <JobListHeading bottom>{t('Recent Posts')}</JobListHeading>
                    <JobListContainer>
                      {recentPosts.map((recent, id) => (
                          <RecentContainer key={id}>
                            <RecentImg src={recent.image} />
                            <RecentTitle>                              
                              <RecentTitle onClick={() => handleReadMore(recent)}>{truncate(t(`${recent.title}`), maxLengthTitleRecent)}</RecentTitle>
                              <RecentDate>{recent.date.split(' ')[0]}</RecentDate>                              
                            </RecentTitle>
                          </RecentContainer>
                      ))}
                    </JobListContainer>
                  </TextWrapper>
                </InfoColumnImg>
              </LeftContainer>

              <RightContainer>
                {currentReadMorePost ? (
                  <NewsDetail post={currentReadMorePost} />
                ) : (
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
                                    {post.category === 'Company News' ? <CompanyIcon /> : <TechIcon />}
                                    {t(`${post.category}`)}
                                  </PostInfo>
                                </PostInfoContainer>
                            </TitleContainer>
    
                            <NewsContent>
                              <NewsImage src={post.image}/>
                              <ContentContainer>
                                <NewsText>{post.content[0].data[0].text === undefined ? '' : truncate(post.content[0].data[0].text, maxLengthContent)}</NewsText>
                                <StyledButton onClick={() => handleReadMore(post)}>{t('Read More')}</StyledButton>
                              </ContentContainer>
                            </NewsContent>
                          </JDContainer>
                        </TextWrapper>
                      </InfoColumnJob>
                    ))}                  
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={postsToShow.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />                
                  </>
                )}
              </RightContainer>

            </InfoRow>
          </Container>
        </InfoSec>
    </>
  )
}

export default News