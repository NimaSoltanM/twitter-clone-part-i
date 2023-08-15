import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 5,
      text: 'ری‌اکت نسبت به انگولار سریعتر است و اکوسیستم بزرگتری دارد. همچنین ری‌اکت یک کتابخانه است در حالی که انگولار یک فریمورک کامل است.',
      likes: 5,
      dislikes: 2,
      spoiler: false,
      categories: ['برنامه‌نویسی', 'فناوری'],
    },
    {
      id: 6,
      text: 'آیفون ۱۴ پرو مکس دارای پردازنده A16 Bionic است که سریع‌ترین پردازنده برای یک گوشی هوشمند است. دوربین آن نیز با ۴۸ مگاپیکسل بسیار پیشرفته است.',
      likes: 12,
      dislikes: 3,
      spoiler: false,
      categories: ['تکنولوژی', 'عمومی'],
    },
    {
      id: 7,
      text: 'وقتی معلوم شد قاتل در فیلم برادر کارآگاه است تعجب کردم! پیش بینی این پایان رو نکرده بودم.',
      likes: 7,
      dislikes: 1,
      spoiler: true,
      categories: ['سینما', 'سرگرمی'],
    },
  ]);

  const [categories, setCategories] = useState([]);
  const [enteredText, setEnteredText] = useState('');
  const [enteredCategory, setEnteredCategory] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const postReducer = (id, action) => {
    switch (action.type) {
      case 'REMOVE':
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        break;
      case 'LIKE':
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            return post.id === id ? { ...post, likes: post.likes + 1 } : post;
          })
        );
        break;
      case 'DISLIKE':
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            return post.id === id
              ? { ...post, dislikes: post.dislikes + 1 }
              : post;
          })
        );
        break;
      case 'EDIT':
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            return post.id === id ? { ...post, text: action.payload } : post;
          })
        );
        break;
      default:
        break;
    }
  };

  const showPostHandler = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        return post.id === id ? { ...post, spoiler: !post.spoiler } : post;
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (enteredCategory.trim() !== '') {
        if (categories.includes(enteredCategory)) {
          alert('دسته بندی تکراری مجاز نیست');
        } else {
          setCategories((c) => [...c, enteredCategory]);
          setEnteredCategory('');
        }
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newPost = {
      id: Math.random(),
      text: enteredText,
      likes: 0,
      dislikes: 0,
      spoiler: isChecked,
      categories: [...categories],
    };

    setPosts((prevPosts) => [...prevPosts, newPost]);

    setEnteredText('');
    setCategories([]);
  };

  return (
    <div className='main'>
      <div className='form-wrapper'>
        <form onSubmit={submitHandler}>
          <textarea
            onChange={(e) => setEnteredText(e.target.value)}
            rows='5'
            placeholder='متن جدید را وارد کنید'
            value={enteredText}
            required
          />
          <input
            type='text'
            placeholder='دسته بندی های پست'
            value={enteredCategory}
            onChange={(e) => setEnteredCategory(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ul>
            {categories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
          <div>
            <input
              type='checkbox'
              id='checkbox'
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor='checkbox'>این پست دارای اسپویلر است ؟</label>
          </div>
          <button type='submit'>ثبت</button>
        </form>
      </div>
      {posts.map((post) => (
        <div key={post.id} className='posts-wrapper'>
          <div
            className={`post-content neutral-post-bg ${
              post.dislikes >= 20 && 'hated-post-bg'
            }`}
          >
            {post.spoiler ? (
              <div className='spoiler-content'>
                <small>این پست دارای اسپویلر است 🚫</small>
                <button onClick={() => showPostHandler(post.id)}>مشاهده</button>
              </div>
            ) : (
              <>
                <div className='post-text'>
                  <p>{post.text}</p>
                </div>
                <div className='post-categories'>
                  {post.categories.map((category) => (
                    <div key={category} className='badge'>
                      {category}
                    </div>
                  ))}
                </div>
                {post.dislikes >= 20 && (
                  <p className='post-status'>
                    کاربران این پست را نپسندیده اند 😡
                  </p>
                )}

                <div className='post-buttons-wrapper'>
                  <button
                    className='post-button'
                    onClick={() =>
                      postReducer(post.id, { type: 'REMOVE', payload: '' })
                    }
                  >
                    🗑️
                  </button>
                  <button
                    className='post-button'
                    onClick={() => {
                      const newText = prompt(
                        'متن جدید را وارد کنید',
                        post.text
                      );
                      if (newText) {
                        postReducer(post.id, {
                          type: 'EDIT',
                          payload: newText,
                        });
                      }
                    }}
                  >
                    ✍️
                  </button>
                  <div>
                    <button
                      className='post-button'
                      onClick={() =>
                        postReducer(post.id, { type: 'LIKE', payload: '' })
                      }
                    >
                      👍
                    </button>
                    <span>{post.likes}</span>
                  </div>
                  <div>
                    <button
                      className='post-button'
                      onClick={() =>
                        postReducer(post.id, { type: 'DISLIKE', payload: '' })
                      }
                    >
                      👎
                    </button>
                    <span>{post.dislikes}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
