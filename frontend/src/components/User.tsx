interface UserProps {
  username: string;
  name: string;
  profilePic: string;
  link: string;
}

function User(props: UserProps): React.ReactElement {
  return (
    <>
      <a href={props.link} target="_blank">
        <img src={props.profilePic} alt={props.name} />
        <span className="username">{props.username}</span>
        <span className="name">{props.name}</span>
      </a>
    </>
  );
}

export default User;
