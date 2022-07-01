import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 20);
    delete newParams._page;
    const productList = await axiosClient.get('/products', { params: newParams });
    const count = await axiosClient.get('/products/count', { params: newParams });
    return {
      data: productList,
      pagination: {
        _page: params._page,
        _limit: params._limit,
        _total: count,
      },
    };
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/products`;
    return axiosClient.post(url, data);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
