import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ galleryItem, modalOpen }) => {
  const { webformatURL, tags, largeImageURL } = galleryItem;

  // console.log(galleryItem);

  return (
    <li className={css.imageGalleryItem}>
      {
        <img
          onClick={() => modalOpen({ tags, largeImageURL })}
          src={webformatURL}
          alt={tags}
          className={css.imageGalleryItemImage}
        ></img>
      }
    </li>
  );
};
