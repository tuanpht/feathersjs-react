import React from 'react';

const Profile = props => <h2>{props.user ? props.user.name : ''}</h2>;

export default Profile;
