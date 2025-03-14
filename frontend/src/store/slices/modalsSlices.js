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
    changeModalShow: (state, action) => ({
      ...state, // создаем новый объект
      modalShow: action.payload.modalShow,
      modalType: action.payload.modalType,
    }),
    setModalChannel: (state, action) => ({
      ...state, // создаем новый объект
      modalChannel: action.payload,
    }),
  },
});

const selectChangeModalShow = (state) => state.modals.modalShow;
const selectChangeModalType = (state) => state.modals.modalType;
const selectSetModalChannel = (state) => state.modals.modalChannel;

export const { changeModalShow, setModalChannel } = modalsSlices.actions;
export default modalsSlices.reducer;
export { selectChangeModalShow, selectChangeModalType, selectSetModalChannel };
