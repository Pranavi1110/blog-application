import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import loadingic from '../../assets/loadingic.json'

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [categories,setCategories]=useState(["programming","AI&ML","database"])
  const [category,setCategory]=useState("all")
  const [isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Fetch all articles
  async function getArticles() {
    setIsLoading(true)
    try {
      const token = await getToken();
      const cat=category
      const res = await axios.get(`http://localhost:3000/author-api/articles/${cat}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message === 'Articles') {
        setArticles(res.data.payload);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
    }
    finally{
      setTimeout(()=>{
        setIsLoading(false)
      },1000)
    }
  }

  // Navigate to specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }
  
  useEffect(() => {
    getArticles();
  }, [category]);

  return (
    <div className='container'>
      {error && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}
      <div className=' fil'>
        <label htmlFor="filter" className='form-label  text-light'>Filter by Category</label>
        <select name="" id="filter" className='form-select selfil' defaultValue="" onChange={(e)=>setCategory(e.target.value)}>
        <option value="" className='' disabled>Select Category</option>
                    <option value="all">All</option> 
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
        </select>
      </div>
      {
        isLoading?(
          <div>
              <Lottie animationData={loadingic} loop={true} className="load" />
              </div>
      ):(
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
        {articles.map((articleObj) => (
          <motion.div 
            className='col' 
            key={articleObj.articleId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className='card h-100 rounded-4 crd shadow-sm'>
              <div className='card-body'>
                <div className='author-details text-end'>
                  <img
                    src={articleObj.authorData.profileImageUrl}
                    width='40px'
                    alt='Author'
                    className='rounded-circle'
                  />
                  <p>
                    <small className='text-secondary name-hi'>{articleObj.authorData.nameOfAuthor}</small>
                  </p>
                </div>
                <h5 className='card-title '>{articleObj.title}</h5>
                <p className='card-text  '>{articleObj.content.substring(0, 80) + '...'}</p>
                <motion.button 
                  className='custom-btn' 
                  onClick={() => gotoArticleById(articleObj)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read more
                </motion.button>
              </div>
              <div className='card-footer'>
                <small className='text-body-secondary'>Last updated on {articleObj.dateOfModification}</small>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      )
      }
      
    </div>
  );
}

export default Articles;
