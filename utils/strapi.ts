import { AmusementData, JejeupData, NoticeData } from 'types';

const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export async function getJejeupData(page?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/jejeup-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=24`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const jejeupResponse = await response.json();
  const jejeupsData = jejeupResponse.data;
  const rowsData: JejeupData[] = jejeupsData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    subject: data.attributes.subject,
    video: data.attributes.video,
    ownerAvatar: data.attributes.ownerAvatar,
    comment: data.attributes.comment,
    title: data.attributes.title,
    worst: data.attributes.worst,
  }));
  const pageCount = jejeupResponse.meta.pagination.pageCount;
  const jejeups = await Promise.all(
    rowsData.map(async (preview) => {
      const jejeupMetaData = await fetchPreviewMetadata(`https://youtu.be/${preview.video}`);
      const amusementData = await getAmusementData(preview.title);
      return {
        ...preview,
        jejeupMetaData,
        amusementData,
      };
    }),
  );
  return { jejeups, pageCount: pageCount };
}

export async function getNoticeData() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/notice-nol2trs?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const noticeResponse = await response.json();
  const noticesData = noticeResponse.data;
  const notices: NoticeData[] = noticesData.map((data: any) => ({
    id: data.id,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    platform: data.attributes.platform,
    subject: data.attributes.subject,
    description: data.attributes.description,
    created: data.attributes.created,
  }));

  return notices;
}

async function fetchPreviewMetadata(url: string) {
  try {
    const response = await fetch(`${process.env.PREVIEW_API_URL}?url=${encodeURIComponent(url)}`);
    const previewResponse = await response.json();
    return previewResponse;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}

export async function getAmusementData(amusement: string) {
  const response = await fetch(`${process.env.STRAPI_URL}/api/amusement-jejeups/${amusement}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  const amusementData = data.data;
  const rowsData: AmusementData = {
    title: amusementData.attributes.title,
    lang: amusementData.attributes.lang,
    titleOther: amusementData.attributes.titleOther,
    etc: amusementData.attributes.etc,
    release: amusementData.attributes.release,
    original: amusementData.attributes.original,
    originalAuthor: amusementData.attributes.originalAuthor,
    originTitle: amusementData.attributes.originTitle,
    rating: amusementData.attributes.rating,
    country: amusementData.attributes.country,
    category: amusementData.attributes.category,
    genre: amusementData.attributes.genre,
    anime: amusementData.attributes.anime,
    ott: amusementData.attributes.ott,
    publisher: amusementData.attributes.publisher,
    creator: amusementData.attributes.creator,
    cast: amusementData.attributes.cast,
    posterDefault: amusementData.attributes.posterDefault,
    posterOther: amusementData.attributes.posterOther,
  };

  return rowsData;
}
