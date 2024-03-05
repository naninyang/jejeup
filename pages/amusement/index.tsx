import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData } from 'types';
import Seo from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { OriginalName } from '@/components/OriginalName';
import { FormatDate } from '@/components/FormatDate';
import { vectors } from '@/components/vectors';
import { Pagination } from '@/components/Pagination';
import Anchor from '@/components/Anchor';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Categories.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

const AmazonOriginal = styled.i({
  width: rem(52),
  background: `url(${vectors.ott.amazon}) no-repeat 50% 50%/contain`,
});

const AppleOriginal = styled.i({
  width: rem(42),
  background: `url(${vectors.ott.apple}) no-repeat 50% 50%/contain`,
});

const DisneyOriginal = styled.i({
  width: rem(29),
  background: `url(${vectors.ott.disney}) no-repeat 50% 50%/contain`,
});

const NetflixOriginal = styled.i({
  width: rem(59),
  background: `url(${vectors.ott.netflix}) no-repeat 50% 50%/contain`,
});

const TvingOriginal = styled.i({
  width: rem(63),
  background: `url(${vectors.ott.tving}) no-repeat 50% 50%/contain`,
});

const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${vectors.ott.watcha}) no-repeat 50% 50%/contain`,
});

const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${vectors.ott.wavve}) no-repeat 50% 50%/contain`,
});

const RatingFilmAll = styled.i({
  background: `url(${vectors.ratings.film.all}) no-repeat 50% 50%/contain`,
});

const RatingFilmB12 = styled.i({
  background: `url(${vectors.ratings.film.b12}) no-repeat 50% 50%/contain`,
});

const RatingFilmC15 = styled.i({
  background: `url(${vectors.ratings.film.c15}) no-repeat 50% 50%/contain`,
});

const RatingFilmD18 = styled.i({
  background: `url(${vectors.ratings.film.d18}) no-repeat 50% 50%/contain`,
});

const RatingGameAll = styled.i({
  background: `url(${vectors.ratings.game.all}) no-repeat 50% 50%/contain`,
});

const RatingGameB12 = styled.i({
  background: `url(${vectors.ratings.game.b12}) no-repeat 50% 50%/contain`,
});

const RatingGameC15 = styled.i({
  background: `url(${vectors.ratings.game.c15}) no-repeat 50% 50%/contain`,
});

const RatingGameD19 = styled.i({
  background: `url(${vectors.ratings.game.d19}) no-repeat 50% 50%/contain`,
});

function Amusement() {
  const timestamp = Date.now();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryData, setCategoryData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const handleCategorySubmit = () => {
    if (!selectedCategory) {
      alert('카테고리를 선택해 주세요');
    } else {
      router.push(`/amusement?category=${selectedCategory}`);
    }
  };

  useEffect(() => {
    const { category } = router.query;
    if (!category) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/category?page=1&pageSize=50&categoryName=${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setCategoryData(responseData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router.query]);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitle="제목에 제목이 없어서 짜증나서 만든 사이트"
        pageDescription="클릭하지 않아도 제목과 정보를 알 수 있게 도와드려요"
        pageImg={`https://jejeup.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <Anchor href="/">
          <BackButton />
          <span>뒤로가기</span>
        </Anchor>
      </div>
      {isLoading && <div className={styles.loading}>이것저것 불러오는 중</div>}
      {error && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {!router.query.category && (
        <div className={styles.selecting}>
          <div>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">카테고리 선택</option>
              <option value="drama">Drama</option>
              <option value="movie">Movie</option>
              <option value="game">Game</option>
              <option value="animation">Animation</option>
              <option value="ott">OTT</option>
            </select>
            <button onClick={handleCategorySubmit}>선택완료</button>
          </div>
          <p>선택한 카테고리가 없습니다. 카테고리를 선택해 주세요!</p>
        </div>
      )}

      {categoryData && !isLoading && !error && (
        <div className={styles.content}>
          <div className={styles.headline}>
            <h1>
              {categoryData[0].category === 'drama' && '개가 짖어도 드라마는 정주행 할 수밖에 없다!'}
              {categoryData[0].category === 'movie' && '영화 사회에서는 영원한 우방도, 영원한 적도 없다!'}
              {categoryData[0].category === 'game' && '게임은 끝날 때까지 끝난 게 아니다!'}
              {categoryData[0].category === 'animation' && '애니입니다만, 문제라도?'}
              {categoryData[0].category === 'ott' ||
                (categoryData[0].category === 'ottFilm' && 'OTT 오리지널이 이렇게 재밌을 리가 없어')}
            </h1>
            <div className={styles.select}>
              <select onChange={handleCategoryChange} defaultValue={selectedCategory}>
                <option value="">카테고리 선택</option>
                <option value={'drama'}>드라마</option>
                <option value={'movie'}>영화</option>
                <option value={'game'}>게임</option>
                <option value={'animation'}>애니메이션</option>
                <option value={'ott'}>OTT</option>
              </select>
              <button onClick={handleCategorySubmit}>선택</button>
            </div>
          </div>
          <section>
            {Array.isArray(categoryData) &&
              categoryData.map((amusement: AmusementData, index) => (
                <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                  <div className={styles.thumbnail}>
                    <Image src={amusement.posterDefault} width="390" height="560" alt="" unoptimized />
                    <dl>
                      <div>
                        <dt>시청등급</dt>
                        <dd>
                          {(amusement.category === 'drama' ||
                            amusement.category === 'ott' ||
                            amusement.anime === 'tva' ||
                            amusement.anime === 'ova') &&
                            amusement.rating !== 'd19' && (
                              <>
                                {amusement.rating === 'all' ? (
                                  <i className={`${styles.drama} ${styles.all} number`}>
                                    {RatingsDrama(amusement.rating)}
                                  </i>
                                ) : (
                                  <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                )}
                              </>
                            )}
                          {(amusement.category === 'drama' ||
                            amusement.category === 'ott' ||
                            amusement.anime === 'tva' ||
                            amusement.anime === 'ova') &&
                            amusement.rating === 'd19' && (
                              <i className={`${styles.drama} ${styles.d19} number`}>{RatingsDrama(amusement.rating)}</i>
                            )}
                          {(amusement.category === 'movie' ||
                            amusement.category === 'ottFilm' ||
                            amusement.anime === 'movie') &&
                            amusement.rating === 'all' && (
                              <>
                                <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                              </>
                            )}
                          {(amusement.category === 'movie' ||
                            amusement.category === 'ottFilm' ||
                            amusement.anime === 'movie') &&
                            amusement.rating === 'b12' && (
                              <>
                                <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                              </>
                            )}
                          {(amusement.category === 'movie' ||
                            amusement.category === 'ottFilm' ||
                            amusement.anime === 'movie') &&
                            amusement.rating === 'c15' && (
                              <>
                                <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                              </>
                            )}
                          {(amusement.category === 'movie' ||
                            amusement.category === 'ottFilm' ||
                            amusement.anime === 'movie') &&
                            amusement.rating === 'd19' && (
                              <>
                                <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                              </>
                            )}
                          {amusement.category === 'game' && amusement.rating === 'all' && (
                            <>
                              <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                            </>
                          )}
                          {amusement.category === 'game' && amusement.rating === 'b12' && (
                            <>
                              <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                            </>
                          )}
                          {amusement.category === 'game' && amusement.rating === 'c15' && (
                            <>
                              <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                            </>
                          )}
                          {amusement.category === 'game' && amusement.rating === 'd19' && (
                            <>
                              <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                            </>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <strong>
                    {amusement.titleKorean != null ? (
                      amusement.titleKorean
                    ) : (
                      <>
                        {amusement.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusement.title} </span>}
                        {amusement.lang === 'chineseGanche' && <span lang="zh-Hans">{amusement.title} </span>}
                        {amusement.lang === 'english' && <span lang="en">{amusement.title}</span>}
                        {amusement.lang === 'japanese' && <span lang="ja">{amusement.title}</span>}
                        {amusement.lang === 'thai' && <span lang="th">{amusement.title}</span>}
                        {amusement.lang === null && <span lang="ko">{amusement.title}</span>}
                      </>
                    )}
                  </strong>
                </Link>
              ))}
          </section>
        </div>
      )}
    </main>
  );
}

export default Amusement;