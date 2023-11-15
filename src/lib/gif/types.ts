/*
  These are not the complete types of the Giphy API response,
  but just the properties that are used or might be used in the near future.
*/

export type Gif = {
  id: string
  type: 'video' | 'gif' | 'text'
  title: string
  images: {
    downsized: {
      url: string
      height: string
      width: string
      size: string
    }
  }
}

export type GiphyResponse = {
  data: Gif[]
  pagination: {
    total_count: number
    count: number
    offset: number
  }
  meta: {
    status: number
    msg: string
  }
}
