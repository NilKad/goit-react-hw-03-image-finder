import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchApi } from './API/fetchApi';
import React from 'react';
import { Button } from './Button/Button';

import css from './App.module.css';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export default class App extends React.Component {
  state = {
    gallery: [],
    searchString: '',
    page: 1,
    totalPage: 0,
    modalItem: null,
    isHaveLoadMore: false,
    isLoading: false,
  };

  searchSubmit = item => {
    item.preventDefault();
    this.setState({ searchString: item.currentTarget.search.value, page: 1 });
    window.scrollTo(0, 0);
  };

  addItemGallery = galleryList => {
    const { page } = this.state;
    console.log('update gallery');
    page === 1
      ? this.setState({ gallery: galleryList })
      : this.setState(prevState => ({
          gallery: [...prevState.gallery, ...galleryList],
        }));
    this.state.gallery.length === 0 && this.setState({ isLoading: false });
  };

  setTotalPage = total => this.setState({ totalPage: total });

  onClickButtonLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log('load more...');
  };

  modalSetItem = item => {
    // console.log('modalSetItem open!!!!!!');
    this.setState({ isLoading: true });
    this.setState({ modalItem: item });
  };

  modalClose = e => {
    this.setState({ modalItem: null });
  };

  loadingFinish = e => {
    console.log('!!!loadingFinish');
    this.setState({ isLoading: false });
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchString, page, totalPage } = this.state;
    if (prevState.searchString !== searchString || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchApi({
        searchString: searchString,
        page: page,
        setTotalPage: this.setTotalPage,
        addItemGallery: this.addItemGallery,
      });
    }
    if (prevState.page !== page || prevState.totalPage !== totalPage) {
      page === totalPage
        ? this.setState({ isHaveLoadMore: false })
        : this.setState({ isHaveLoadMore: true });
    }
    // if (isLoading) {
    //   this.setState({ isLoading: false });
    // }
  }
  render() {
    const { gallery, isHaveLoadMore, modalItem, isLoading } = this.state;
    return (
      <section className={css.App}>
        <Searchbar seacrhSubmit={this.searchSubmit} />
        <ImageGallery
          onLoadingFinish={this.loadingFinish}
          galleryList={gallery}
          modalOpen={this.modalSetItem}
        ></ImageGallery>

        <div className={css.pagination}>
          {gallery.length > 0 && isHaveLoadMore && (
            <Button
              text="Load more"
              onClickButton={this.onClickButtonLoadMore}
            />
          )}
        </div>
        {modalItem && (
          <Modal
            onLoadingFinish={this.loadingFinish}
            modalItem={this.state.modalItem}
            modalClose={this.modalClose}
          />
        )}
        {isLoading && <Loader />}
      </section>
    );
  }
}
