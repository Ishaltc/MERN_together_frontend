export default function AddFriendSmallCard({ item }) {
  return (
    <div className="addFriendCard">
      <div className="addFriend_imgSmall">
        <img src={item.profile_picture} alt="" />
        <div className="addFriend_infos">
          <div className="addFriend_name">
            {item.profile_name.length > 11
              ? `${ item.profile_name.substring(0, 11)}...`
              : item.profile_name}
          </div>
          <div className="light_orange_btn">
            <img src="../../../icons/addFriend.png" alt="" />
            Add Friends
          </div>
        </div>
      </div>
    </div>
  );
}
