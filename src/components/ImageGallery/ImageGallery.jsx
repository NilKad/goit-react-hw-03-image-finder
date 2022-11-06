// import { Component } from 'react';
import css from './ImageGallery.module.css';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ galleryList, modalOpen, onLoadingFinish }) => {
  return (
    galleryList.length > 0 && (
      <>
        <ul className={css.imageGallery} onLoad={onLoadingFinish}>
          {galleryList.map(item => {
            return (
              <ImageGalleryItem
                key={item.id}
                modalOpen={modalOpen}
                galleryItem={item}
              />
            );
          })}
        </ul>
      </>
    )
  );
};
