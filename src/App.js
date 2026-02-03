import { useState } from "react";

const initialMembers = [
  { name: "Scarlett", id: 1, image_url: "https://i.pravatar.cc", balance: 5 },
  { name: "Eugene", id: 2, image_url: "https://i.pravatar.cc", balance: 5 },
  { name: "Frozen", id: 3, image_url: "https://i.pravatar.cc", balance: -15 },
  { name: "Chris", id: 4, image_url: "https://i.pravatar.cc", balance: 0 },
];

export default function App() {
  const [members, setMembers] = useState(() => initialMembers);
  const [select, setSelect] = useState(null);
  const [addMembers, setAddMembers] = useState(false);
  const [bill, setBill] = useState(0);
  const [userBill, setUserBill] = useState(0);
  const [payer, setPayer] = useState("user");

  function handleSelect(id, name) {
    setSelect((prev) => (prev?.id === id ? null : { id, name }));
    setAddMembers(false);
    console.log(select);
  }

  function handleAddMem(e) {
    console.log(e);
    setMembers((prev) => [...prev, e]);
    console.log(members);
    setAddMembers(false);
  }

  function addMemToggle() {
    setAddMembers((prev) => !prev);
    setSelect(null);
  }

  function handleBillSubmit(bill, userBill, FriendsBill, payer) {
    let updatedBill;
    if (payer === "user") {
      updatedBill = members.map((e) =>
        e.id === select.id ? { ...e, balance: e.balance + FriendsBill } : e,
      );
      setMembers(updatedBill);
      console.log(updatedBill);
      setSelect(null);
    } else {
      updatedBill = members.map((e) =>
        e.id === select.id ? { ...e, balance: e.balance - userBill } : e,
      );
      setMembers(updatedBill);
      console.log(updatedBill);
      setSelect(null);
    }
  }
  return (
    <section>
      <main>
        <h1>Eat-N-Split</h1>
        <Usercard
          members={members}
          handleSelect={handleSelect}
          select={select}
        />

        {select && (
          <BillCard
            bill={bill}
            userBill={userBill}
            members={members}
            select={select}
            setBill={setBill}
            setUserBill={setUserBill}
            handleBillSubmit={handleBillSubmit}
            payer={payer}
            setPayer={setPayer}
          />
        )}

        <Addbutton toggleAdd={addMemToggle} />
        {addMembers && <AddFriend addMem={handleAddMem} members={members} />}
      </main>
    </section>
  );
}

function Usercard({ members, handleSelect, select }) {
  return (
    <ul>
      {members.map((e) => (
        <Profile
          name={e.name}
          id={e.id}
          image_url={e.image_url}
          key={e.id}
          select={select?.id === e.id}
          balance={e.balance}
          handleSelect={handleSelect}
        />
      ))}
    </ul>
  );
}

function Profile({ name, image_url, balance, handleSelect, id, select }) {
  return (
    <article className="user-card">
      <aside className="profile-info">
        <span>
          <img src={image_url + "/150?u=" + id} alt={name} />
        </span>
        <span className="content-box">
          <p>{name}</p>
          <p className={balance > 0 ? "mine" : undefined}>
            {balance > 0 && `${name} owes you ${balance}`}
          </p>
          <p className={balance < 0 ? "owe" : undefined}>
            {balance < 0 && `You owe ${name} ${Math.abs(balance)}`}
          </p>
          <p className={balance === 0 ? `even` : undefined}>
            {balance === 0 && `You and ${name} are Even`}
          </p>
        </span>
      </aside>

      <aside>
        <button onClick={() => handleSelect(id, name)}>
          {select ? "Close" : "Select"}
        </button>
      </aside>
    </article>
  );
}

function BillCard({
  bill,
  userBill,
  members,
  select,
  setBill,
  setUserBill,
  handleBillSubmit,
  payer,
  setPayer,
}) {
  let selectedFriendId = members.find((e) => e.id === select.id);
  let activeFrd = selectedFriendId.name;

  let FriendsBill = bill - userBill;
  return (
    <div className="card-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleBillSubmit(bill, userBill, FriendsBill, payer);
        }}
      >
        <ul className="bill-inputs">
          <legend>Split With {activeFrd} </legend>
          <li>
            <span>💰 Bill value</span>
            <span>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </span>
          </li>
          <li>
            <span>🙋🏻‍♂️ Your expense</span>
            <span>
              <input
                type="number"
                value={userBill}
                onChange={(e) =>
                  setUserBill(e.target.value > bill ? userBill : e.target.value)
                }
              />
            </span>
          </li>
          <li>
            <span>🫂 {activeFrd} Expense</span>
            <span>
              <input type="number" disabled value={FriendsBill} />
            </span>
          </li>
          <li>
            <span>💲 Who is paying the bill ?</span>
            <span>
              <select value={payer} onChange={(e) => setPayer(e.target.value)}>
                <option value="user">You</option>
                <option value={activeFrd}>{activeFrd}</option>
              </select>
            </span>
          </li>
          <li>
            <button type="submit">Split Bill</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

function Addbutton({ toggleAdd }) {
  return (
    <button className="add-frnd" onClick={toggleAdd}>
      Add Friend
    </button>
  );
}

function AddFriend({ members, addMem }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const newFriend = {
    name,
    id: members.length + 1,
    image_url: image,
    balance: 0,
  };
  return (
    <div className="friend-card-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMem(newFriend);
        }}
      >
        <ul className="bill-inputs">
          <li>
            <span>🕺 Friend Name</span>
            <span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </span>
          </li>
          <li>
            <span>🏞️ Image URL</span>
            <span>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </span>
          </li>
          <li>
            <button type="submit">Add Friend</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
