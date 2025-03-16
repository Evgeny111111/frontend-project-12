import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalShow: false,
  modalType: null,
  modalChannel: null,
};

const modalsSlices = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeModalShow: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.modalShow = action.payload.modalShow;
      // eslint-disable-next-line no-param-reassign
      state.modalType = action.payload.modalType;
    },
    setModalChannel: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.modalChannel = action.payload;
    },
  },
});

const selectChangeModalShow = (state) => state.modals.modalShow;
const selectChangeModalType = (state) => state.modals.modalType;
const selectSetModalChannel = (state) => state.modals.modalChannel;

export const { changeModalShow, setModalChannel } = modalsSlices.actions;
export default modalsSlices.reducer;
export { selectChangeModalShow, selectChangeModalType, selectSetModalChannel };