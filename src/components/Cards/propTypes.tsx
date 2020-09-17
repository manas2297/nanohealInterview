export interface CardData {
  media: ImageLinks,
  title: string,
  description: string,
  occurred_at: number,
  updated_at: number,
  address: string,
};
interface ImageLinks {
  image_url_thumb: string,
}
