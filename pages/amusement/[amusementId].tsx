import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData, AmusementPermalinkData, JejeupData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { OriginalName } from '@/components/OriginalName';
import { formatDate } from '@/components/FormatDate';
import { formatDuration } from '@/components/FormatDuration';
import { vectors } from '@/components/vectors';
import Anchor from '@/components/Anchor';
import { rem } from '@/styles/designSystem';
import styles from '@/styles/Amusement.module.sass';

const BackButton = styled.i({
  display: 'block',
  background: `url(${vectors.backward}) no-repeat 50% 50%/contain`,
});

const ClipboardIcon = styled.i({
  background: `url(${vectors.share2}) no-repeat 50% 50%/contain`,
});

const AmazonOriginal = styled.i({
  width: rem(52),
  background: `url(${vectors.ott.amazon2}) no-repeat 50% 50%/contain`,
});

const AppleOriginal = styled.i({
  width: rem(42),
  background: `url(${vectors.ott.apple2}) no-repeat 50% 50%/contain`,
});

const DisneyOriginal = styled.i({
  width: rem(29),
  background: `url(${vectors.ott.disney2}) no-repeat 50% 50%/contain`,
});

const NetflixOriginal = styled.i({
  width: rem(59),
  background: `url(${vectors.ott.netflix}) no-repeat 50% 50%/contain`,
});

const TvingOriginal = styled.i({
  width: rem(105),
  background: `url(${vectors.ott.tvingOrigin}) no-repeat 50% 50%/contain`,
});

const TvingOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.tvingOnly}) no-repeat 50% 50%/contain`,
});

const WatchaOriginal = styled.i({
  width: rem(55),
  background: `url(${vectors.ott.watchaOrigin}) no-repeat 50% 50%/contain`,
});

const WatchaOnly = styled.i({
  width: rem(70),
  background: `url(${vectors.ott.watchaOnly}) no-repeat 50% 50%/contain`,
});

const WavveOriginal = styled.i({
  width: rem(72),
  background: `url(${vectors.ott.wavveOrigin}) no-repeat 50% 50%/contain`,
});

const WavveOnly = styled.i({
  width: rem(50),
  background: `url(${vectors.ott.wavveOnly}) no-repeat 50% 50%/contain`,
});

const Paramount = styled.i({
  width: rem(81),
  background: `url(${vectors.ott.paramount}) no-repeat 50% 50%/contain`,
});

const Ena = styled.i({
  width: rem(37),
  background: `url(${vectors.broadcast.ena2}) no-repeat 0 50%/contain`,
});

const Jtbc = styled.i({
  width: rem(27),
  background: `url(${vectors.broadcast.jtbc2}) no-repeat 0 50%/contain`,
});

const Kbs2tv = styled.i({
  width: rem(43),
  background: `url(${vectors.broadcast.kbs2tv2}) no-repeat 0 50%/contain`,
});

const Mbc = styled.i({
  width: rem(49),
  background: `url(${vectors.broadcast.mbc2}) no-repeat 0 50%/contain`,
});

const Ocn = styled.i({
  width: rem(42),
  background: `url(${vectors.broadcast.ocn2}) no-repeat 0 50%/contain`,
});

const Sbs = styled.i({
  width: rem(31),
  background: `url(${vectors.broadcast.sbs2}) no-repeat 0 50%/contain`,
});

const Tvn = styled.i({
  width: rem(34),
  background: `url(${vectors.broadcast.tvn2}) no-repeat 0 50%/contain`,
});

const Anibox = styled.i({
  width: rem(48),
  background: `url(${vectors.anime.anibox2}) no-repeat 0 50%/contain`,
});

const Animax = styled.i({
  width: rem(40),
  background: `url(${vectors.anime.animax2}) no-repeat 0 50%/contain`,
});

const Aniplus = styled.i({
  width: rem(93),
  background: `url(${vectors.anime.aniplus2}) no-repeat 0 50%/contain`,
});

const Atx = styled.i({
  width: rem(22),
  background: `url(${vectors.anime.atx2}) no-repeat 0 50%/contain`,
});

const Daewon = styled.i({
  width: rem(44),
  background: `url(${vectors.anime.daewon2}) no-repeat 0 50%/contain`,
});

const Fujitv = styled.i({
  width: rem(81),
  background: `url(${vectors.anime.fujitv2}) no-repeat 0 50%/contain`,
});

const Mbs = styled.i({
  width: rem(42),
  background: `url(${vectors.anime.mbs2}) no-repeat 0 50%/contain`,
});

const Nippontv = styled.i({
  width: rem(30),
  background: `url(${vectors.anime.nippontv2}) no-repeat 0 50%/contain`,
});

const Tbs = styled.i({
  width: rem(31),
  background: `url(${vectors.anime.tbs2}) no-repeat 0 50%/contain`,
});

const Tokyomx = styled.i({
  width: rem(108),
  background: `url(${vectors.anime.tokyomx2}) no-repeat 0 50%/contain`,
});

const Tooniverse = styled.i({
  width: rem(93),
  background: `url(${vectors.anime.tooniverse2}) no-repeat 0 50%/contain`,
});

const Tvtokyo = styled.i({
  width: rem(42),
  background: `url(${vectors.anime.tvtokyo2}) no-repeat 0 50%/contain`,
});

const Wowow = styled.i({
  width: rem(108),
  background: `url(${vectors.anime.wowow2}) no-repeat 0 50%/contain`,
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

export default function Amusement({
  amusementData,
  amusementId,
}: {
  amusementData: AmusementPermalinkData | null;
  amusementId: number;
}) {
  const router = useRouter();
  const timestamp = Date.now();
  const [data, setData] = useState<JejeupData | null>(null);
  const [isJejeupsLoading, setIsJejeupsLoading] = useState(false);
  const [isJejeupsError, setIsJejeupsError] = useState<null | string>(null);
  const currentPage = Number(router.query.page) || 1;
  const [isActive, setIsActive] = useState(true);
  const [relations, setRelations] = useState<AmusementData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRelation, setSelectedRelation] = useState<string>('');

  useEffect(() => {
    sessionStorage.setItem('location', router.asPath);
  }, [router.asPath]);

  const loadRelations = async () => {
    if (amusementData) {
      if (amusementData.attributes.relations) {
        setIsLoading(true);
        setError(null);
        setIsJejeupsLoading(true);
        setIsJejeupsError(null);
        try {
          const response = await fetch(`/api/relations?relations=${amusementData.attributes.relations}&type=amusement`);
          const relationsResponse = await response.json();
          setRelations(relationsResponse);
          const renewResponse =
            amusementData && (await fetch(`/api/renewAmusement?page=${currentPage}&amusementId=${amusementData.id}`));
          const renewData = renewResponse && (await renewResponse.json());
          const renewValue = renewData.renew;
          const cachedData = amusementData && localStorage.getItem(`amusementData${currentPage}${amusementData.id}`);
          let dataToUse;

          if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (parsedData.jejeups.length > 0 && parsedData.jejeups[0].createdAt) {
              if (parsedData.jejeups[0].createdAt === renewValue) {
                dataToUse = parsedData;
              }
            }
          }

          if (!dataToUse && amusementData) {
            const response = await fetch(`/api/jejeupAmusement?page=${currentPage}&amusementId=${amusementData.id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newData = await response.json();
            localStorage.setItem(`amusementData${currentPage}${amusementData.id}`, JSON.stringify(newData));
            dataToUse = newData;
          }
          setData(dataToUse);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
          setIsJejeupsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    loadRelations();
  }, [amusementData]);

  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('amusement');
    if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      if (amusementData) {
        if (
          amusementData.attributes.category === 'ott_drama' ||
          amusementData.attributes.category === 'ott_anime' ||
          amusementData.attributes.category === 'ott_anime_film' ||
          amusementData.attributes.category === 'ott_film'
        )
          router.push('/amusement?category=ott');
        else if (amusementData.attributes.category === 'anime' || amusementData.attributes.category === 'anime_film')
          router.push('/amusement?category=anime');
        else router.push(`/amusement?category=${amusementData.attributes.category}`);
      }
    }
  };

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
    alert(
      '대한민국에서 시청/심의등급이 없거나 대한민국에 정식 발매된 작품이 아닙니다.\n해당 시청/심의등급은 제제없 자체설정 시청/심의등급입니다.\n따라서 제제없 심의등급은 법적구속력이 없습니다.\n\n자세한 내용은 공지사항을 참고하세요.',
    );
  };

  useEffect(() => {
    if (Array.isArray(relations) && relations.length > 0) {
      const defaultRelation = relations.find((relation) => relation.idx !== amusementId);
      if (defaultRelation) {
        setSelectedRelation(`/amusement/${defaultRelation.idx}`);
      }
    }
  }, [relations, amusementId]);

  const handleRelationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRelation(event.target.value);
  };
  const handleRelationSubmit = () => {
    router.push({ pathname: selectedRelation });
  };

  const fetchData = async () => {
    setIsJejeupsLoading(true);
    setIsJejeupsError(null);
    try {
      const renewResponse =
        amusementData && (await fetch(`/api/renewAmusement?page=${currentPage}&amusementId=${amusementData.id}`));
      const renewData = renewResponse && (await renewResponse.json());
      const renewValue = renewData.renew;
      const cachedData = amusementData && localStorage.getItem(`amusementData${currentPage}${amusementData.id}`);
      let dataToUse;

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (parsedData.jejeups.length > 0 && parsedData.jejeups[0].createdAt) {
          if (parsedData.jejeups[0].createdAt === renewValue) {
            dataToUse = parsedData;
          }
        }
      }

      if (!dataToUse && amusementData) {
        const response = await fetch(`/api/jejeupAmusement?page=${currentPage}&amusementId=${amusementData.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newData = await response.json();
        localStorage.setItem(`amusementData${currentPage}${amusementData.id}`, JSON.stringify(newData));
        dataToUse = newData;
      }

      setData(dataToUse);
    } catch (err) {
      if (err instanceof Error) {
        setIsJejeupsError(err.message);
      } else {
        setIsJejeupsError('An unknown error occurred');
      }
    } finally {
      setIsJejeupsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!amusementData) {
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

  const togglePoster = () => {
    setIsActive(!isActive);
  };

  function RelationSelect() {
    if (
      Array.isArray(relations) &&
      relations.length > 1 &&
      amusementData &&
      amusementData.attributes.relations !== null &&
      !isLoading &&
      !error
    ) {
      return (
        <div className={styles.relation}>
          <dt>시리즈 선택</dt>
          <dd>
            <select value={selectedRelation} onChange={handleRelationChange}>
              <option value={router.asPath}>
                {amusementData.attributes.titleKorean
                  ? amusementData.attributes.titleKorean
                  : amusementData.attributes.title}
              </option>
              {relations
                .filter((relation) => relation.idx !== amusementId)
                .map((relation) => (
                  <option key={relation.idx} value={`/amusement/${relation.idx}`}>
                    {relation.titleKorean ? relation.titleKorean : relation.title}
                  </option>
                ))}
            </select>
            <button type="button" onClick={handleRelationSubmit}>
              이동
            </button>
          </dd>
        </div>
      );
    }
  }

  return (
    <main className={styles.amusement}>
      <Seo
        pageTitles={`${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title} - ${originTitle}`}
        pageTitle={`${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title}`}
        pageDescription={`'${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title}' 리뷰 영상을 모아서 한방에 즐기자!`}
        pageImg={`https://cdn.dev1stud.io/jejeup/_/${amusementData.id}-og.webp?ts=${timestamp}`}
        pageTwt={`https://cdn.dev1stud.io/jejeup/_/${amusementData.id}-twt.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.cover}>
        <div className={styles.background}>
          <div className={styles.images}>
            <Image
              src={amusementData.attributes.posterDefault}
              alt=""
              width={
                amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                  ? 460
                  : 390
              }
              height={
                amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                  ? 215
                  : 560
              }
              unoptimized
              className={`${isActive ? styles.active : ''}`}
            />
            {amusementData.attributes.posterOther && (
              <Image
                src={amusementData.attributes.posterOther}
                alt=""
                width={
                  amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                    ? 460
                    : 390
                }
                height={
                  amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                    ? 215
                    : 560
                }
                unoptimized
                className={`${!isActive ? styles.active : ''}`}
              />
            )}
          </div>
          <div className={styles.dummy} />
        </div>
        <div className={styles.info}>
          {amusementData.attributes.titleKorean !== null ? (
            amusementData.attributes.titleKorean.length >= 30 ? (
              <h1 className={styles.long}>{amusementData.attributes.titleKorean}</h1>
            ) : (
              <h1>{amusementData.attributes.titleKorean}</h1>
            )
          ) : amusementData.attributes.title.length >= 30 ? (
            <h1 className={styles.long}>{amusementData.attributes.title}</h1>
          ) : (
            <h1>{amusementData.attributes.title}</h1>
          )}
          <dl className={styles.title}>
            {amusementData.attributes.titleKorean !== null && (
              <div>
                <dt>원제</dt>
                <dd>
                  {amusementData.attributes.lang === 'chineseBeonche' && (
                    <span lang="zh-Hant">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'chineseGanche' && (
                    <span lang="zh-Hans">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'english' && (
                    <span lang="en">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'japanese' && (
                    <span lang="ja">{amusementData.attributes.title}</span>
                  )}
                  {amusementData.attributes.lang === 'thai' && <span lang="th">{amusementData.attributes.title}</span>}
                  {amusementData.attributes.lang === null && <span lang="ko">{amusementData.attributes.title}</span>}
                </dd>
              </div>
            )}
            {amusementData.attributes.titleOther && (
              <div>
                <dt>다른 제목</dt>
                <dd className="lang">{amusementData.attributes.titleOther}</dd>
              </div>
            )}
            {amusementData.attributes.etc && (
              <div>
                <dt>추가 제목 또는 제목 설명</dt>
                <dd className="lang">{amusementData.attributes.etc}</dd>
              </div>
            )}
            {amusementData.attributes.originalAuthor &&
              amusementData.attributes.original &&
              amusementData.attributes.originTitle && (
                <span>
                  &apos;{amusementData.attributes.originalAuthor}&apos;의{' '}
                  {OriginalName(amusementData.attributes.original)} &apos;
                  {amusementData.attributes.originTitle}&apos; 원작
                </span>
              )}
            {amusementData.attributes.original !== null &&
              amusementData.attributes.originTitle === null &&
              amusementData.attributes.originalAuthor !== null && (
                <div>
                  <dt>원작</dt>
                  <dd>동명의 {OriginalName(amusementData.attributes.original)} 원작</dd>
                </div>
              )}
          </dl>
          <div className={styles.function}>
            <dl className={styles.summary}>
              {amusementData.attributes.ott !== null && (
                <div className={styles.platform}>
                  <dt>플랫폼</dt>
                  <dd>
                    {amusementData.attributes.ott === 'amazonOriginal' && (
                      <>
                        <AmazonOriginal /> AMAZON ORIGINAL
                      </>
                    )}
                    {amusementData.attributes.ott === 'appleOriginal' && (
                      <>
                        <AppleOriginal /> An Apple Original
                      </>
                    )}
                    {amusementData.attributes.ott === 'appleFilm' && (
                      <>
                        <AppleOriginal /> An Apple Original Film
                      </>
                    )}
                    {amusementData.attributes.ott === 'disneyOriginal' && (
                      <>
                        <DisneyOriginal /> Disney+ Original
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixOriginal' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixFilm' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original Film
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixAnime' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original Animation
                      </>
                    )}
                    {amusementData.attributes.ott === 'netflixAnimeFilm' && (
                      <>
                        <NetflixOriginal /> NETFLIX Original Animation Film
                      </>
                    )}
                    {amusementData.attributes.ott === 'tvingOriginal' && (
                      <>
                        <TvingOriginal /> 티빙 오리지널
                      </>
                    )}
                    {amusementData.attributes.ott === 'tvingOnly' && (
                      <>
                        <TvingOnly /> 오직 티빙에서
                      </>
                    )}
                    {amusementData.attributes.ott === 'watchaOriginal' && (
                      <>
                        <WatchaOriginal /> 왓챠 오리지널
                      </>
                    )}
                    {amusementData.attributes.ott === 'watchaExclusive' && (
                      <>
                        <WatchaOnly /> 오직 왓챠에서
                      </>
                    )}
                    {amusementData.attributes.ott === 'wavveOriginal' && (
                      <>
                        <WavveOriginal /> 웨이브 오리지널
                      </>
                    )}
                    {amusementData.attributes.ott === 'wavveOnly' && (
                      <>
                        <WavveOnly /> 오직 웨이브에서
                      </>
                    )}
                    {amusementData.attributes.ott === 'paramount' && (
                      <>
                        <Paramount /> Paramount+에서 스트리밍 중
                      </>
                    )}
                  </dd>
                </div>
              )}
              {amusementData.attributes.ott !== null && amusementData.attributes.ottAddr !== null && (
                <div className={styles.link}>
                  <dt>OTT에서 보기</dt>
                  <dd>
                    <Anchor href={amusementData.attributes.ottAddr}>
                      {amusementData.attributes.ott === 'amazonOriginal' && 'Prime Video'}
                      {(amusementData.attributes.ott === 'appleOriginal' ||
                        amusementData.attributes.ott === 'appleFilm') &&
                        'Apple TV+'}
                      {amusementData.attributes.ott === 'disneyOriginal' && 'Disney+'}
                      {(amusementData.attributes.ott === 'netflixOriginal' ||
                        amusementData.attributes.ott === 'netflixFilm' ||
                        amusementData.attributes.ott === 'netflixAnime' ||
                        amusementData.attributes.ott === 'netflixAnimeFilm') &&
                        'NETFLIX'}
                      {(amusementData.attributes.ott === 'tvingOriginal' ||
                        amusementData.attributes.ott === 'tvingOnly') &&
                        'TVING'}
                      {(amusementData.attributes.ott === 'watchaOriginal' ||
                        amusementData.attributes.ott === 'watchaExclusive') &&
                        'WATCHA'}
                      {(amusementData.attributes.ott === 'wavveOriginal' ||
                        amusementData.attributes.ott === 'wavveOnly') &&
                        'Wavve'}
                      {amusementData.attributes.ott === 'paramount' && 'TVING'}
                      에서 시청하기
                    </Anchor>
                  </dd>
                </div>
              )}
              {amusementData.attributes.ott === null && amusementData.attributes.ottAddr !== null && (
                <div className={styles.link}>
                  <dt>단편영화 보기</dt>
                  <dd>
                    <Anchor href={amusementData.attributes.ottAddr}>
                      단편영화 &apos;
                      {amusementData.attributes.titleKorean
                        ? amusementData.attributes.titleKorean
                        : amusementData.attributes.title}
                      &apos; 보러가기
                    </Anchor>
                  </dd>
                </div>
              )}
              {isLoading && (
                <div className={styles.relation}>
                  <dt>다른 버전 보기</dt>
                  <dd>
                    <em>목록 불러오는 중...</em>
                  </dd>
                </div>
              )}
              <RelationSelect />
            </dl>
            <button onClick={copyToClipboard}>
              <ClipboardIcon /> <span>URL 복사</span>
            </button>
          </div>
          <dl className={styles.summary}>
            <div className={styles.item}>
              <div className={styles.category}>
                <dt>카테고리</dt>
                <dd>
                  {amusementData.attributes.category !== 'anime_film' && (
                    <em>
                      {amusementData.attributes.broadcast === 'ENA' && (
                        <>
                          <Ena /> <span>ENA</span>
                        </>
                      )}
                      {amusementData.attributes.broadcast === 'JTBC' && (
                        <>
                          <Jtbc /> <span>JTBC</span>
                        </>
                      )}
                      {amusementData.attributes.broadcast === 'KBS2' && (
                        <>
                          <Kbs2tv /> <span>KBS 2TV</span>
                        </>
                      )}
                      {amusementData.attributes.broadcast === 'MBC' && (
                        <>
                          <Mbc /> <span>MBC</span>
                        </>
                      )}
                      {amusementData.attributes.broadcast === 'OCN' && (
                        <>
                          <Ocn /> <span>OCN</span>
                        </>
                      )}
                      {amusementData.attributes.broadcast === 'SBS' && (
                        <>
                          <Sbs /> <span>SBS</span>
                        </>
                      )}
                      {amusementData.attributes.broadcast === 'tvN' && (
                        <>
                          <Tvn /> <span>tvN</span>
                        </>
                      )}
                      {(amusementData.attributes.animeBroadcast1 !== null ||
                        amusementData.attributes.animeBroadcast2 !== null) && (
                        <>
                          {amusementData.attributes.animeBroadcast1 === 'tokyomx' && (
                            <>
                              <Tokyomx /> <span>도쿄 MX</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast1 === 'tvtokyo' && (
                            <>
                              <Tvtokyo /> <span>테레비 도쿄</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast1 === 'fujitv' && (
                            <>
                              <Fujitv /> <span>후지 테레비</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast1 === 'mbs' && (
                            <>
                              <Mbs /> <span>MBS</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast1 === 'tbs' && (
                            <>
                              <Tbs /> <span>TBS</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast1 === 'atx' && (
                            <>
                              <Atx /> <span>AT-X</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast1 === 'nippontv' && (
                            <>
                              <Nippontv /> <span>닛폰 테레비</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast1 === 'wowow' && (
                            <>
                              <Wowow /> <span>WOWOW</span>
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast2 === 'aniplus' && (
                            <>
                              {amusementData.attributes.animeBroadcast1 !== null && '|'}
                              <Aniplus /> <span>애니플러스</span> 방영{' '}
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast2 === 'daewon' && (
                            <>
                              {amusementData.attributes.animeBroadcast1 !== null && '|'}
                              <Daewon /> <span>애니원</span> 방영{' '}
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast2 === 'anibox' && (
                            <>
                              {amusementData.attributes.animeBroadcast1 !== null && '|'}
                              <Anibox /> <span>애니박스</span> 방영{' '}
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast2 === 'tooniverse' && (
                            <>
                              {amusementData.attributes.animeBroadcast1 !== null && '|'}
                              <Tooniverse /> <span>투니버스</span> 방영{' '}
                            </>
                          )}
                          {amusementData.attributes.animeBroadcast2 === 'animax' && (
                            <>
                              {amusementData.attributes.animeBroadcast1 !== null && '|'}
                              <Animax /> <span>애니맥스</span> 방영{' '}
                            </>
                          )}
                        </>
                      )}
                      {(amusementData.attributes.category === 'game' ||
                        amusementData.attributes.category === 'game_fan') &&
                        amusementData.attributes.isMobile &&
                        '모바일 '}
                      {CategoryName(amusementData.attributes.category)}
                      {amusementData.attributes.category === 'game_fan' && '팬 게임'}
                    </em>
                  )}
                  {amusementData.attributes.ott === null && amusementData.attributes.ottAddr !== null && (
                    <em>단편영화</em>
                  )}
                  {amusementData.attributes.anime !== null && <em>{AnimeName(amusementData.attributes.anime)}</em>}
                </dd>
              </div>
              {amusementData.attributes.country !== '?' && (
                <div className={styles.country}>
                  <dt>제작국가</dt>
                  <dd>{amusementData.attributes.country}</dd>
                </div>
              )}
              {amusementData.attributes.release !== '?' && (
                <div className={styles.release}>
                  <dt>제작년도</dt>
                  <dd>{amusementData.attributes.release}년</dd>
                </div>
              )}
              <div className={styles.rating}>
                <dt>등급</dt>
                <dd>
                  {(amusementData.attributes.category === 'drama' ||
                    amusementData.attributes.category === 'ott_drama' ||
                    amusementData.attributes.category === 'ott_anime' ||
                    amusementData.attributes.anime === 'tva' ||
                    amusementData.attributes.anime === 'ova') && (
                    <>
                      {amusementData.attributes.rating === 'all' ? (
                        <>
                          <i className={`${styles.drama} ${styles.all} number`}>
                            {RatingsDrama(amusementData.attributes.rating)}
                          </i>
                          <span>전체 이용가</span>
                        </>
                      ) : (
                        <>
                          {amusementData.attributes.rating === 'd19' ? (
                            <>
                              <i className={`${styles.drama} ${styles.d19} number`}>
                                {RatingsDrama(amusementData.attributes.rating)}
                              </i>
                              <span>세 미만 이용불가</span>
                            </>
                          ) : (
                            <>
                              <i className={`${styles.drama} number`}>
                                {RatingsDrama(amusementData.attributes.rating)}
                              </i>
                              <span>세 이상 이용가</span>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {(amusementData.attributes.category === 'film' ||
                    amusementData.attributes.category === 'ott_anime_film' ||
                    amusementData.attributes.category === 'ott_film' ||
                    amusementData.attributes.anime === 'film') && (
                    <>
                      {amusementData.attributes.rating === 'all' && (
                        <>
                          <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                        </>
                      )}
                      {amusementData.attributes.rating === 'b12' && (
                        <>
                          <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                        </>
                      )}
                      {amusementData.attributes.rating === 'c15' && (
                        <>
                          <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                        </>
                      )}
                      {amusementData.attributes.rating === 'd19' && (
                        <>
                          <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                        </>
                      )}
                    </>
                  )}
                  {amusementData.attributes.category === 'game' ||
                    (amusementData.attributes.category === 'game_fan' && (
                      <>
                        {amusementData.attributes.rating === 'all' && (
                          <>
                            <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                          </>
                        )}
                        {amusementData.attributes.rating === 'b12' && (
                          <>
                            <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                          </>
                        )}
                        {amusementData.attributes.rating === 'c15' && (
                          <>
                            <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                          </>
                        )}
                        {amusementData.attributes.rating === 'd19' && (
                          <>
                            <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                          </>
                        )}
                      </>
                    ))}
                  {amusementData.attributes.ratingCustom && (
                    <div className={styles.custom}>
                      <button type="button" onClick={customRatingHandler}>
                        <i />
                        <span>제제없 자체설정 심의등급 안내</span>
                      </button>
                    </div>
                  )}
                </dd>
              </div>
            </div>
          </dl>
          <dl className={styles.staff}>
            {amusementData.attributes.original !== null &&
              amusementData.attributes.originTitle === null &&
              amusementData.attributes.originalAuthor !== null && (
                <div>
                  <dt>원작자</dt>
                  <dd>{amusementData.attributes.originalAuthor}</dd>
                </div>
              )}
            {amusementData.attributes.genre !== '?' && (
              <div>
                <dt>장르</dt>
                <dd>{amusementData.attributes.genre}</dd>
              </div>
            )}
            {amusementData.attributes.publisher !== '?' && (
              <div>
                <dt>
                  {amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                    ? '유통/배급'
                    : '퍼블리싱'}
                </dt>
                <dd>{amusementData.attributes.publisher}</dd>
              </div>
            )}
            {amusementData.attributes.creator !== '?' && (
              <div>
                <dt>
                  {amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                    ? '개발'
                    : '주요 제작자'}
                </dt>
                <dd>{amusementData.attributes.creator}</dd>
              </div>
            )}
            {amusementData.attributes.cast !== '?' && (
              <>
                {amusementData.attributes.cast !== null && (
                  <div>
                    {amusementData.attributes.category !== 'anime' &&
                    amusementData.attributes.category !== 'ott_anime' &&
                    amusementData.attributes.category !== 'ott_anime_film' &&
                    amusementData.attributes.category !== 'game' ? (
                      <dt>주요 출연자</dt>
                    ) : (
                      <dt>주요 성우</dt>
                    )}
                    <dd>{amusementData.attributes.cast}</dd>
                  </div>
                )}
              </>
            )}
            {amusementData.attributes.synopsys && (
              <div className={styles.synopsys}>
                <dt>시놉시스</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: amusementData.attributes.synopsys.replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            )}
          </dl>
        </div>
        <div
          className={`${styles.poster} ${amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan' ? styles['poster-game'] : ''}`}
        >
          <div className={styles.images}>
            <Image
              src={amusementData.attributes.posterDefault}
              alt=""
              width={
                amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                  ? 460
                  : 390
              }
              height={
                amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                  ? 215
                  : 560
              }
              unoptimized
              className={`${isActive ? styles.active : ''}`}
            />
            {amusementData.attributes.posterOther && (
              <Image
                src={amusementData.attributes.posterOther}
                alt=""
                width={
                  amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                    ? 460
                    : 390
                }
                height={
                  amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                    ? 215
                    : 560
                }
                unoptimized
                className={`${!isActive ? styles.active : ''}`}
              />
            )}
          </div>
          {amusementData.attributes.posterOther && (
            <button type="button" onClick={togglePoster}>
              <span>다른 이미지 보기</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="1">
                  <path
                    d="M4.58333 2.25006L2.25 4.58339L4.58333 6.91673V5.16673H8.66667C10.2846 5.16673 11.5833 6.46542 11.5833 8.0834C11.5833 9.70137 10.2846 11.0001 8.66667 11.0001H2.83333V12.1667H8.66667C10.915 12.1667 12.75 10.3318 12.75 8.0834C12.75 5.83503 10.915 4.00006 8.66667 4.00006H4.58333V2.25006Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
      {isJejeupsError && (
        <p className={styles['amusement-error']}>
          영상을 불러오지 못했습니다. 삭제된 영상이거나 인터넷 속도가 느립니다.{' '}
          <Anchor href="/jejeups">뒤로가기</Anchor>
        </p>
      )}
      {isJejeupsLoading && <p className={styles['amusement-loading']}>목록 불러오는 중...</p>}
      {data && !isJejeupsLoading && !isJejeupsError && (
        <div className={styles.list}>
          {Array.isArray(data.jejeups) &&
            data.jejeups.map((jejeup: JejeupData) => (
              <div className={styles.item} key={jejeup.id}>
                <Link key={jejeup.idx} href={`/jejeup/${jejeup.idx}`} scroll={false} shallow={true}>
                  {Object.keys(jejeup.jejeupMetaData).length > 0 ? (
                    <>
                      {jejeup.error === 'Failed to fetch data' || jejeup.ogTitle === ' - YouTube' ? (
                        <div className={`${styles.preview} preview`}>
                          <div className={styles['preview-container']}>
                            <div className={styles.thumbnail}>
                              <Image src="/missing.webp" width="1920" height="1080" alt="" unoptimized />
                            </div>
                            <div className={styles['preview-info']}>
                              <div className={styles.detail}>
                                {/* <Image src="/unknown.webp" width="36" height="36" alt="" unoptimized /> */}
                                <div className={`${styles['user-info']}`}>
                                  <strong>삭제된 영상</strong>
                                  <div className={styles.user}>
                                    <cite>관리자에게 제보해 주세요</cite>
                                    <time>알 수 없는 시간</time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`${styles.preview} preview`}>
                          <div className={styles['preview-container']}>
                            <div className={styles.thumbnail}>
                              <Image
                                src={jejeup.jejeupMetaData.ogImage}
                                width="1920"
                                height="1080"
                                alt=""
                                unoptimized
                              />
                              <em>{formatDuration(jejeup.jejeupMetaData.duration)}</em>
                            </div>
                            <div className={styles['preview-info']}>
                              <div className={styles.detail}>
                                <div className={`${styles['user-info']}`}>
                                  <strong>{jejeup.jejeupMetaData.ogTitle}</strong>
                                  <div className={styles.user}>
                                    <cite>{jejeup.jejeupMetaData.ownerName}</cite>
                                    <time dateTime={jejeup.jejeupMetaData.datePublished}>
                                      {formatDate(`${jejeup.jejeupMetaData.datePublished}`)}
                                    </time>
                                  </div>
                                  {jejeup.worst && (
                                    <div className={styles.worst}>
                                      <strong className="number">Worst</strong>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={`${styles.preview} preview`}>
                      <div className={styles['preview-container']}>
                        <div className={styles.thumbnail}>
                          <Image
                            src={`https://i.ytimg.com/vi/${jejeup.video}/mqdefault.jpg`}
                            width="1920"
                            height="1080"
                            alt=""
                            unoptimized
                          />
                        </div>
                        <div className={styles['preview-info']}>
                          <div className={styles.detail}>
                            <div className={`${styles['user-info']}`}>
                              <strong>{jejeup.subject}</strong>
                              {jejeup.worst && (
                                <div className={styles.worst}>
                                  <strong className="number">Worst</strong>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            ))}
        </div>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const amusementId = context.params?.amusementId;
  let amusementData = null;

  if (amusementId && typeof amusementId === 'string') {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/amusement?amusementId=${amusementId.substring(14)}`,
    );
    const amusementResponse = (await response.json()) as { data: AmusementPermalinkData };
    amusementData = amusementResponse.data;
  }

  if (!amusementData) {
    return {
      props: {
        amusementData: null,
      },
    };
  }

  return {
    props: {
      amusementData,
      amusementId,
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
