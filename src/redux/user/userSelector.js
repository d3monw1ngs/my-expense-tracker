export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;
export const selectUserAvatar = (state) => state.user.userInfo?.avatar || null;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
