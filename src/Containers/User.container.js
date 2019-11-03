import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateInfo, resetUpdateInfoStatus, changePassword, noticeChangePasswordFail,resetChangePasswordStatus, changeAvatar } from '../Actions/Action';
import User from '../Components/User';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: (id,info) => {
      dispatch(updateInfo(id,info));
    },
    onResetUpdateInfoStatus: () => {
      dispatch(resetUpdateInfoStatus());
    },
    onChangePassword: (id, password) => {
      dispatch(changePassword(id, password));
    },
    onNoticeChangePasswordFail : message => {
      dispatch(noticeChangePasswordFail(message));
    },
    onResetChangePasswordStatus: () => {
      dispatch(resetChangePasswordStatus());
    },
    onChangeAvatar: (id,url,isUpdateAvatar) => {
      dispatch(changeAvatar(id,url,isUpdateAvatar));
    }
  };
}

const UserContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(User));


export default UserContainer;