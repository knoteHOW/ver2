import React, {useState, useEffect} from 'react';
import axios from "axios";

const Favorite = ({onFavoriteClicked}) => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    axios.get('/favorites').then(res => {
      setFavorites(res.data.favorites);
    });
  }, []);

  return (
      (favorites && favorites.length > 0) ?
          <div className="favorite-wrapper sections">
            <div className="section-title">
              우리 학과 인기 검색자료
            </div>

            <ul className="section-list">
              {
                favorites.map(favorite =>
                    <li className="item" onClick={onFavoriteClicked} data-favorite={favorite.query}>
                      {favorite.query}
                    </li>
                )
              }
            </ul>
          </div>
          :
          <></>
  );
};

export default Favorite;
