import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';
import { JejeupPermalinkData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import YouTubeController from '@/components/YouTubeController';
import Anchor from '@/components/Anchor';
import { vectors } from '@/components/vectors';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { FormatDate } from '@/components/FormatDate';
import { OriginalName } from '@/components/OriginalName';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Jejeup.module.sass';

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
  background: `url(${vectors.ott.tvingOrigin2}) no-repeat 50% 50%/contain`,
});

const TvingOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.tvingOnly2}) no-repeat 50% 50%/contain`,
});

const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${vectors.ott.watchaOrigin2}) no-repeat 50% 50%/contain`,
});

const WatchaOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.watchaOnly2}) no-repeat 50% 50%/contain`,
});

const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${vectors.ott.wavveOrigin2}) no-repeat 50% 50%/contain`,
});

const WavveOnly = styled.i({
  width: rem(50),
  background: `url(${vectors.ott.wavveOnly2}) no-repeat 50% 50%/contain`,
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

const ClipboardIcon = styled.i({
  background: `url(${vectors.share}) no-repeat 50% 50%/contain`,
});

export default function JejeupDetail({ jejeupData }: { jejeupData: JejeupPermalinkData | null }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sessionStorage.setItem('location', url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('location');
    if (previousPage) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  function FormatDuration(duration: string) {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    const minutes = match[1] ? match[1].slice(0, -1) : '0';
    const seconds = match[2] ? match[2].slice(0, -1) : '0';
    return `${minutes}분 ${seconds.padStart(2, '0')}초`;
  }

  if (!jejeupData) {
    if (timeoutReached) {
      return (
        <main className={styles.jejeup}>
          <p className={styles.error}>
            영상을 불러오지 못했습니다. 삭제된 영상이거나 인터넷 속도가 느립니다.{' '}
            <Anchor href="/jejeups">뒤로가기</Anchor>
          </p>
        </main>
      );
    } else {
      return (
        <main className={styles.jejeup}>
          <p className={styles.loading}>영상 불러오는 중...</p>
        </main>
      );
    }
  }

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('URL 복사에 실패했습니다:', err);
      });
  };

  const customRatingHandler = () => {
    alert('한국에 정식 발매된 타이틀이 아닙니다. 해당 심의등급은 제제없 자체설정 심의등급입니다.');
  };

  return (
    <main className={styles.jejeup}>
      <Seo
        pageTitles={`${jejeupData.attributes.subject} - ${originTitle}`}
        pageTitle={`${jejeupData.attributes.subject}`}
        pageDescription={`${jejeupData.amusementData.title} (${jejeupData.amusementData.release})`}
        pageImg={jejeupData.jejeupMetaData.ogImage ? jejeupData.jejeupMetaData.ogImage : '/missing.webp'}
        pageOgType={'video.other'}
        pageImgWidth={1920}
        pageImgHeight={1080}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <article className={styles['article-jejeup']}>
        {jejeupData.jejeupMetaData && jejeupData.jejeupMetaData.ogTitle !== ' - YouTube' ? (
          <div className={`${styles.preview} preview`}>
            <div className={styles.video}>
              <YouTubeController videoId={jejeupData.attributes.video} videoImage={jejeupData.jejeupMetaData.ogImage} />
            </div>
            <div className={styles.youtube}>
              <h1>{jejeupData.jejeupMetaData.ogTitle}</h1>
              <div className={styles.detail}>
                <Image
                  src={`${jejeupData.jejeupMetaData.ownerAvatar === null ? jejeupData.attributes.ownerAvatar : jejeupData.jejeupMetaData.ownerAvatar}`}
                  width="36"
                  height="36"
                  alt=""
                  unoptimized
                />
                <div className={styles.user}>
                  <cite>{jejeupData.jejeupMetaData.ownerName}</cite>
                  <time dateTime={jejeupData.jejeupMetaData.datePublished}>
                    {FormatDate(`${jejeupData.jejeupMetaData.datePublished}`)}
                  </time>
                </div>
              </div>
              {jejeupData.jejeupMetaData.ogDescription ? (
                <p>
                  <em>{FormatDuration(jejeupData.jejeupMetaData.duration)}</em>{' '}
                  {jejeupData.jejeupMetaData.ogDescription}
                </p>
              ) : (
                <p>
                  <strong>유튜버가 더보기 정보를 등록하지 않았습니다.</strong>
                </p>
              )}
              {jejeupData.attributes.worst && (
                <div className={styles.worst}>
                  <button type="button" className="number">
                    Worst
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`${styles.preview} preview`}>
            <YouTubeController videoId={jejeupData.attributes.video} videoImage="/missing.webp" />
            <div className={styles.youtube}>
              <h1>유튜버가 삭제했거나 비공개 처리한 영상입니다 ㅠㅠ</h1>
              <div className={styles.detail}>
                <Image src="/unknown.webp" width="36" height="36" alt="" unoptimized />
                <div className={styles.user}>
                  <cite>관리자에게 제보해 주세요</cite>
                  <time>알 수 없는 시간</time>
                </div>
              </div>
              <p>
                <strong>유튜버가 영상을 삭제했거나 비공개 처리한 영상입니다. 관리자에게 제보해 주세요.</strong>
              </p>
            </div>
          </div>
        )}
        <div className={styles.figcaption}>
          {jejeupData.attributes.worst && (
            <dl className={styles.worst}>
              <dt>Worst 경고!</dt>
              <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
            </dl>
          )}
          {jejeupData.attributes.comment && (
            <div className={styles.comment}>
              <h2>큐레이터의 한줄평</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: jejeupData.attributes.comment.replace(/\n/g, '<br />'),
                }}
              />
            </div>
          )}
          <div className={styles.title}>
            <h2>타이틀 정보</h2>
            <div className={styles.function}>
              <button onClick={copyToClipboard}>
                <ClipboardIcon /> <span>URL 복사</span>
              </button>
            </div>
            <div className={styles['title-list']}>
              {jejeupData.attributes.title && (
                <div className={styles['title-info']}>
                  <dl className={styles.summary}>
                    <dt>
                      {jejeupData.amusementData.category !== 'ott' &&
                        jejeupData.amusementData.category !== 'ottFilm' && (
                          <em>{CategoryName(jejeupData.amusementData.category)}</em>
                        )}
                      {jejeupData.amusementData.category === 'animation' && (
                        <em>{AnimeName(jejeupData.amusementData.anime)}</em>
                      )}
                      {jejeupData.amusementData.ott === 'amazonOriginal' && (
                        <cite>
                          <AmazonOriginal /> Amazon Prime Video
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'appleOriginal' && (
                        <cite>
                          <AppleOriginal /> An Apple Original
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'appleFilm' && (
                        <cite>
                          <AppleOriginal /> An Apple Original Film
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'disneyOriginal' && (
                        <cite>
                          <DisneyOriginal /> Disney+ Original
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'netflixOriginal' && (
                        <cite>
                          <NetflixOriginal /> NETFLIX Original
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'netflixFilm' && (
                        <cite>
                          <NetflixOriginal /> NETFLIX Original Film
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'netflixAnime' && (
                        <cite>
                          <NetflixOriginal /> NETFLIX Original Animation
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'netflixAnimeFilm' && (
                        <cite>
                          <NetflixOriginal /> NETFLIX Original Animation Film
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'tvingOriginal' && (
                        <cite>
                          <TvingOriginal /> 티빙 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'tvingOnly' && (
                        <cite>
                          <TvingOnly /> 오직 티빙에서
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'watchaOriginal' && (
                        <cite>
                          <WatchaOriginal /> 왓챠 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'watchaExclusive' && (
                        <cite>
                          <WatchaOnly /> 오직 왓챠에서
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'wavveOriginal' && (
                        <cite>
                          <WavveOriginal /> 웨이브 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData.ott === 'wavveOnly' && (
                        <cite>
                          <WavveOnly /> 오직 웨이브에서
                        </cite>
                      )}
                      {(jejeupData.amusementData.category === 'drama' ||
                        jejeupData.amusementData.category === 'ott' ||
                        jejeupData.amusementData.anime === 'tva' ||
                        jejeupData.amusementData.anime === 'ova') &&
                        jejeupData.amusementData.rating !== 'd19' && (
                          <>
                            {jejeupData.amusementData.rating === 'all' ? (
                              <i className={`${styles.drama} ${styles.all} number`}>
                                {RatingsDrama(jejeupData.amusementData.rating)}
                              </i>
                            ) : (
                              <i className={`${styles.drama} number`}>
                                {RatingsDrama(jejeupData.amusementData.rating)}
                              </i>
                            )}
                          </>
                        )}
                      {(jejeupData.amusementData.category === 'drama' ||
                        jejeupData.amusementData.category === 'ott' ||
                        jejeupData.amusementData.anime === 'tva' ||
                        jejeupData.amusementData.anime === 'ova') &&
                        jejeupData.amusementData.rating === 'd19' && (
                          <i className={`${styles.drama} ${styles.d19} number`}>
                            {RatingsDrama(jejeupData.amusementData.rating)}
                          </i>
                        )}
                      {(jejeupData.amusementData.category === 'movie' ||
                        jejeupData.amusementData.category === 'ottFilm' ||
                        jejeupData.amusementData.anime === 'movie') &&
                        jejeupData.amusementData.rating === 'all' && (
                          <>
                            <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                          </>
                        )}
                      {(jejeupData.amusementData.category === 'movie' ||
                        jejeupData.amusementData.category === 'ottFilm' ||
                        jejeupData.amusementData.anime === 'movie') &&
                        jejeupData.amusementData.rating === 'b12' && (
                          <>
                            <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                          </>
                        )}
                      {(jejeupData.amusementData.category === 'movie' ||
                        jejeupData.amusementData.category === 'ottFilm' ||
                        jejeupData.amusementData.anime === 'movie') &&
                        jejeupData.amusementData.rating === 'c15' && (
                          <>
                            <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                          </>
                        )}
                      {(jejeupData.amusementData.category === 'movie' ||
                        jejeupData.amusementData.category === 'ottFilm' ||
                        jejeupData.amusementData.anime === 'movie') &&
                        jejeupData.amusementData.rating === 'd19' && (
                          <>
                            <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                          </>
                        )}
                      {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'all' && (
                        <>
                          <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                        </>
                      )}
                      {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'b12' && (
                        <>
                          <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                        </>
                      )}
                      {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'c15' && (
                        <>
                          <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                        </>
                      )}
                      {jejeupData.amusementData.category === 'game' && jejeupData.amusementData.rating === 'd19' && (
                        <>
                          <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                        </>
                      )}
                      {jejeupData.amusementData.ratingCustom && (
                        <div className={styles.custom}>
                          <button type="button" onClick={customRatingHandler}>
                            <i />
                            <span>제제없 자체설정 심의등급 안내</span>
                          </button>
                        </div>
                      )}
                      {jejeupData.amusementData.ottAddr && (
                        <Anchor href={jejeupData.amusementData.ottAddr}>
                          {jejeupData.amusementData.ott === 'amazonOriginal' && 'Amazon Prime Video'}
                          {(jejeupData.amusementData.ott === 'appleOriginal' ||
                            jejeupData.amusementData.ott === 'appleFilm') &&
                            'Apple TV+'}
                          {jejeupData.amusementData.ott === 'disneyOriginal' && 'Disney+'}
                          {(jejeupData.amusementData.ott === 'netflixOriginal' ||
                            jejeupData.amusementData.ott === 'netflixFilm' ||
                            jejeupData.amusementData.ott === 'netflixAnime' ||
                            jejeupData.amusementData.ott === 'netflixAnimeFilm') &&
                            'NETFLIX'}
                          {(jejeupData.amusementData.ott === 'tvingOriginal' ||
                            jejeupData.amusementData.ott === 'tvingOnly') &&
                            'TVING'}
                          {(jejeupData.amusementData.ott === 'watchaOriginal' ||
                            jejeupData.amusementData.ott === 'watchaExclusive') &&
                            'WATCHA'}
                          {(jejeupData.amusementData.ott === 'wavveOriginal' ||
                            jejeupData.amusementData.ott === 'wavveOnly') &&
                            'Wavve'}
                          에서 시청하기
                        </Anchor>
                      )}
                    </dt>
                    <dd>
                      <strong>
                        {jejeupData.amusementData.lang === 'chineseBeonche' && (
                          <span lang="zh-Hant">{jejeupData.amusementData.title} </span>
                        )}
                        {jejeupData.amusementData.lang === 'chineseGanche' && (
                          <span lang="zh-Hans">{jejeupData.amusementData.title} </span>
                        )}
                        {jejeupData.amusementData.lang === 'english' && (
                          <span lang="en">{jejeupData.amusementData.title}</span>
                        )}
                        {jejeupData.amusementData.lang === 'japanese' && (
                          <span lang="ja">{jejeupData.amusementData.title}</span>
                        )}
                        {jejeupData.amusementData.lang === 'thai' && (
                          <span lang="th">{jejeupData.amusementData.title}</span>
                        )}
                        {jejeupData.amusementData.lang === null && (
                          <span lang="ko">{jejeupData.amusementData.title}</span>
                        )}{' '}
                        {jejeupData.amusementData.originalAuthor &&
                          `('${jejeupData.amusementData.originalAuthor}'의 ${OriginalName(jejeupData.amusementData.original)} '${jejeupData.amusementData.originTitle}' 원작)`}
                        {(jejeupData.amusementData.titleKorean || jejeupData.amusementData.titleOther) && (
                          <>
                            ({jejeupData.amusementData.titleKorean && jejeupData.amusementData.titleKorean}
                            {jejeupData.amusementData.titleKorean && jejeupData.amusementData.titleOther && ' / '}
                            {jejeupData.amusementData.titleOther && jejeupData.amusementData.titleOther})
                          </>
                        )}{' '}
                        {jejeupData.amusementData.originalAuthor === null && jejeupData.amusementData.original && (
                          <span className={styles.origin}>
                            동명의 {OriginalName(jejeupData.amusementData.original)} 원작
                          </span>
                        )}
                        <time>{jejeupData.amusementData.release}</time>
                      </strong>
                      <em>{jejeupData.amusementData.etc && jejeupData.amusementData.etc}</em>
                    </dd>
                  </dl>
                  <dl className={styles.info}>
                    <div>
                      <dt>제작국가</dt>
                      <dd>{jejeupData.amusementData.country}</dd>
                    </div>
                    <div>
                      <dt>장르</dt>
                      <dd>{jejeupData.amusementData.genre}</dd>
                    </div>
                    <div>
                      <dt>퍼블리셔</dt>
                      <dd>{jejeupData.amusementData.publisher}</dd>
                    </div>
                    <div>
                      <dt>주요 제작자</dt>
                      <dd>{jejeupData.amusementData.creator}</dd>
                    </div>
                    {jejeupData.amusementData.category !== 'game' && (
                      <div>
                        <dt>주요 출연자</dt>
                        <dd>{jejeupData.amusementData.cast}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
              {jejeupData.attributes.title2 && (
                <div className={styles['title-info']}>
                  <dl className={styles.summary}>
                    <dt>
                      {jejeupData.amusementData2.ott === 'wavveOnly' && (
                        <cite>
                          <WavveOriginal /> 웨이브 독점 스트리밍
                        </cite>
                      )}
                      {jejeupData.amusementData2.category !== 'ott' &&
                        jejeupData.amusementData2.category !== 'ottFilm' && (
                          <em>{CategoryName(jejeupData.amusementData2.category)}</em>
                        )}
                      {jejeupData.amusementData2.category === 'animation' && (
                        <em>{AnimeName(jejeupData.amusementData2.anime)}</em>
                      )}
                      {jejeupData.amusementData2.ott === 'amazonOriginal' && (
                        <cite>
                          <AmazonOriginal /> 아마존 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'appleOriginal' && (
                        <cite>
                          <AppleOriginal /> 애플 티비+ 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'appleFilm' && (
                        <cite>
                          <AppleOriginal /> 애플 티비+ 오리지널 영화
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'disneyOriginal' && (
                        <cite>
                          <DisneyOriginal /> 디즈니+ 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'netflixOriginal' && (
                        <cite>
                          <NetflixOriginal /> 넷플릭스 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'netflixFilm' && (
                        <cite>
                          <NetflixOriginal /> 넷플릭스 오리지널 영화
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'netflixAnime' && (
                        <cite>
                          <NetflixOriginal /> 넷플릭스 오리지널 애니메이션
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'netflixAnimeFilm' && (
                        <cite>
                          <NetflixOriginal /> 넷플릭스 오리지널 애니메이션 영화
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'tvingOriginal' && (
                        <cite>
                          <TvingOriginal /> 티빙 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'watchaOriginal' && (
                        <cite>
                          <WatchaOriginal /> 왓챠 오리지널
                        </cite>
                      )}
                      {jejeupData.amusementData2.ott === 'wavveOriginal' && (
                        <cite>
                          <WavveOriginal /> 웨이브 오리지널
                        </cite>
                      )}
                      {(jejeupData.amusementData2.category === 'drama' ||
                        jejeupData.amusementData2.category === 'ott' ||
                        jejeupData.amusementData2.anime === 'tva' ||
                        jejeupData.amusementData2.anime === 'ova') &&
                        jejeupData.amusementData2.rating !== 'd19' && (
                          <>
                            {jejeupData.amusementData2.rating === 'all' ? (
                              <i className={`${styles.drama} ${styles.all} number`}>
                                {RatingsDrama(jejeupData.amusementData2.rating)}
                              </i>
                            ) : (
                              <i className={`${styles.drama} number`}>
                                {RatingsDrama(jejeupData.amusementData2.rating)}
                              </i>
                            )}
                          </>
                        )}
                      {(jejeupData.amusementData2.category === 'drama' ||
                        jejeupData.amusementData2.category === 'ott' ||
                        jejeupData.amusementData2.anime === 'tva' ||
                        jejeupData.amusementData2.anime === 'ova') &&
                        jejeupData.amusementData2.rating === 'd19' && (
                          <i className={`${styles.drama} ${styles.d19} number`}>
                            {RatingsDrama(jejeupData.amusementData2.rating)}
                          </i>
                        )}
                      {(jejeupData.amusementData2.category === 'movie' ||
                        jejeupData.amusementData2.category === 'ottFilm' ||
                        jejeupData.amusementData2.anime === 'movie') &&
                        jejeupData.amusementData2.rating === 'all' && (
                          <>
                            <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                          </>
                        )}
                      {(jejeupData.amusementData2.category === 'movie' ||
                        jejeupData.amusementData2.category === 'ottFilm' ||
                        jejeupData.amusementData2.anime === 'movie') &&
                        jejeupData.amusementData2.rating === 'b12' && (
                          <>
                            <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                          </>
                        )}
                      {(jejeupData.amusementData2.category === 'movie' ||
                        jejeupData.amusementData2.category === 'ottFilm' ||
                        jejeupData.amusementData2.anime === 'movie') &&
                        jejeupData.amusementData2.rating === 'c15' && (
                          <>
                            <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                          </>
                        )}
                      {(jejeupData.amusementData2.category === 'movie' ||
                        jejeupData.amusementData2.category === 'ottFilm' ||
                        jejeupData.amusementData2.anime === 'movie') &&
                        jejeupData.amusementData2.rating === 'd19' && (
                          <>
                            <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                          </>
                        )}
                      {jejeupData.amusementData2.category === 'game' && jejeupData.amusementData2.rating === 'all' && (
                        <>
                          <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                        </>
                      )}
                      {jejeupData.amusementData2.category === 'game' && jejeupData.amusementData2.rating === 'b12' && (
                        <>
                          <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                        </>
                      )}
                      {jejeupData.amusementData2.category === 'game' && jejeupData.amusementData2.rating === 'c15' && (
                        <>
                          <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                        </>
                      )}
                      {jejeupData.amusementData2.category === 'game' && jejeupData.amusementData2.rating === 'd19' && (
                        <>
                          <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                        </>
                      )}
                      {jejeupData.amusementData2.ratingCustom && (
                        <div className={styles.custom}>
                          <button type="button" onClick={customRatingHandler}>
                            <i />
                            <span>제제없 자체설정 심의등급 안내</span>
                          </button>
                        </div>
                      )}
                      {jejeupData.amusementData2.ottAddr && (
                        <Anchor href={jejeupData.amusementData2.ottAddr}>
                          {jejeupData.amusementData2.ott === 'amazonOriginal' && 'Amazon Prime Video'}
                          {(jejeupData.amusementData2.ott === 'appleOriginal' ||
                            jejeupData.amusementData2.ott === 'appleFilm') &&
                            'Apple TV+'}
                          {jejeupData.amusementData2.ott === 'disneyOriginal' && 'Disney+'}
                          {(jejeupData.amusementData2.ott === 'netflixOriginal' ||
                            jejeupData.amusementData2.ott === 'netflixFilm' ||
                            jejeupData.amusementData2.ott === 'netflixAnime' ||
                            jejeupData.amusementData2.ott === 'netflixAnimeFilm') &&
                            'NETFLIX'}
                          {(jejeupData.amusementData2.ott === 'tvingOriginal' ||
                            jejeupData.amusementData2.ott === 'tvingOnly') &&
                            'TVING'}
                          {(jejeupData.amusementData2.ott === 'watchaOriginal' ||
                            jejeupData.amusementData2.ott === 'watchaExclusive') &&
                            'WATCHA'}
                          {(jejeupData.amusementData2.ott === 'wavveOriginal' ||
                            jejeupData.amusementData2.ott === 'wavveOnly') &&
                            'Wavve'}
                          에서 시청하기
                        </Anchor>
                      )}
                    </dt>
                    <dd>
                      <strong>
                        {jejeupData.amusementData2.lang === 'chineseBeonche' && (
                          <span lang="zh-Hant">{jejeupData.amusementData2.title} </span>
                        )}
                        {jejeupData.amusementData2.lang === 'chineseGanche' && (
                          <span lang="zh-Hans">{jejeupData.amusementData2.title} </span>
                        )}
                        {jejeupData.amusementData2.lang === 'english' && (
                          <span lang="en">{jejeupData.amusementData2.title}</span>
                        )}
                        {jejeupData.amusementData2.lang === 'japanese' && (
                          <span lang="ja">{jejeupData.amusementData2.title}</span>
                        )}
                        {jejeupData.amusementData2.lang === 'thai' && (
                          <span lang="th">{jejeupData.amusementData2.title}</span>
                        )}
                        {jejeupData.amusementData2.lang === null && (
                          <span lang="ko">{jejeupData.amusementData2.title}</span>
                        )}{' '}
                        {jejeupData.amusementData2.originalAuthor &&
                          `('${jejeupData.amusementData2.originalAuthor}'의 ${OriginalName(jejeupData.amusementData2.original)} '${jejeupData.amusementData2.originTitle}' 원작)`}
                        {(jejeupData.amusementData.titleKorean || jejeupData.amusementData.titleOther) && (
                          <>
                            ({jejeupData.amusementData.titleKorean && jejeupData.amusementData.titleKorean}
                            {jejeupData.amusementData.titleKorean && jejeupData.amusementData.titleOther && ' / '}
                            {jejeupData.amusementData.titleOther && jejeupData.amusementData.titleOther})
                          </>
                        )}{' '}
                        {jejeupData.amusementData2.originalAuthor === null && jejeupData.amusementData2.original && (
                          <span className={styles.origin}>
                            동명의 {OriginalName(jejeupData.amusementData2.original)} 원작
                          </span>
                        )}
                        <time>{jejeupData.amusementData2.release}</time>
                      </strong>
                      <em>{jejeupData.amusementData2.etc && jejeupData.amusementData2.etc}</em>
                    </dd>
                  </dl>
                  <dl className={styles.info}>
                    <div>
                      <dt>제작국가</dt>
                      <dd>{jejeupData.amusementData2.country}</dd>
                    </div>
                    <div>
                      <dt>장르</dt>
                      <dd>{jejeupData.amusementData2.genre}</dd>
                    </div>
                    <div>
                      <dt>퍼블리셔</dt>
                      <dd>{jejeupData.amusementData2.publisher}</dd>
                    </div>
                    <div>
                      <dt>주요 제작자</dt>
                      <dd>{jejeupData.amusementData2.creator}</dd>
                    </div>
                    {jejeupData.amusementData2.category !== 'game' && (
                      <div>
                        <dt>주요 출연자</dt>
                        <dd>{jejeupData.amusementData2.cast}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
          {(jejeupData.amusementData.posterDefault || jejeupData.amusementData.posterOther) && (
            <div className={styles.posters}>
              <h2>{jejeupData.amusementData.category === 'game' ? '게임 공식 배너' : '포스터'}</h2>
              <div
                className={`${styles['poster-list']} ${jejeupData.amusementData.category === 'game' ? styles['posters-game'] : styles['posters-other']}`}
              >
                {jejeupData.amusementData.posterDefault && (
                  <div className={styles.poster}>
                    <Image
                      src={jejeupData.amusementData.posterDefault}
                      alt=""
                      width={jejeupData.amusementData.category === 'game' ? 460 : 390}
                      height={jejeupData.amusementData.category === 'game' ? 215 : 560}
                      unoptimized
                    />
                  </div>
                )}
                <div className={styles.poster}>
                  {jejeupData.attributes.title2 === null ? (
                    jejeupData.amusementData.posterOther && (
                      <Image
                        src={jejeupData.amusementData.posterOther}
                        alt=""
                        width={jejeupData.amusementData.category === 'game' ? 460 : 390}
                        height={jejeupData.amusementData.category === 'game' ? 215 : 560}
                        unoptimized
                      />
                    )
                  ) : (
                    <Image
                      src={jejeupData.amusementData2.posterDefault}
                      alt=""
                      width={jejeupData.amusementData.category === 'game' ? 460 : 390}
                      height={jejeupData.amusementData.category === 'game' ? 215 : 560}
                      unoptimized
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const jejeupId = context.params?.jejeupId;
  let jejeupData = null;

  if (jejeupId && typeof jejeupId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jejeups?id=${jejeupId.substring(14)}`);
    const jejeupResponse = (await response.json()) as { data: JejeupPermalinkData };
    jejeupData = jejeupResponse;
  }

  if (!jejeupData) {
    return {
      props: {
        jejeupData: null,
      },
    };
  }

  return {
    props: {
      jejeupData,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
